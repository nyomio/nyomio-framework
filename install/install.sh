#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

printf "\n%s\n" "***** Initilaizing helm..."
helm init --wait

kubectl apply -f ../k8s/coredns-rewrite.yml

## Traefik
#printf "\n%s\n" "***** Installing Treafik from helm chart"
kubectl apply -f traefikcertsecret.yml
kubectl apply -f traefikv2.yml

# Postgres
printf "\n%s\n" "***** Installing postgres from helm chart"
helm install --name nyom-db stable/postgresql

printf "\n%s\n" "***** Waiting for postgres server to be ready..."
kubectl wait --for=condition=ready --timeout=450s pod/nyom-db-postgresql-0
kubectl apply -f ../k8s/postgres-ingresstcp.yml

# Keycloak
printf "\n%s\n"  "***** Installing Keycloak from helm chart"
helm repo add codecentric https://codecentric.github.io/helm-charts
helm repo update
helm install --name nyom-sso codecentric/keycloak
export KEYCLOAK_PASS
KEYCLOAK_PASS=$(kubectl get secret --namespace default nyom-sso-keycloak-http -o jsonpath="{.data.password}" | base64 --decode; echo)
printf "Keycloak password: %s\n" "$KEYCLOAK_PASS"

printf "\n%s\n" "***** Adding ingress for keycloak..."
kubectl apply -f ../k8s/keycloak-ingress.yml

printf "\n%s\n" "***** Waiting for keycloak server to be ready..."
kubectl wait --for=condition=ready --timeout=450s pod/nyom-sso-keycloak-0

printf "\n%s\n" "***** Logging in for kcadm.sh ..."
kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user keycloak --password $KEYCLOAK_PASS"

printf "\n%s\n" "***** Creating realm nyomio ..."
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh create realms --set realm=nyomio --set enabled=true'

printf "\n%s\n" "***** Creating client nyom-app ..."
export CLID
CLID=$(kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh create clients -r nyomio -s clientId=nyom-app -s publicClient=true -s redirectUris=\[\"\*\"\] -i')

printf "\n%s\n" "***** Creating user. u: user, p: user ..."
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh create users -r nyomio -s username=user -s enabled=true -o --fields id,username'
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh set-password -r nyomio --username user --new-password user'

printf "\n%s\n" "***** Creating admin user. u: admin, p: admin ..."
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh create users -r nyomio -s username=admin -s enabled=true -o --fields id,username'
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh set-password -r nyomio --username admin --new-password admin'

printf "\n%s\n" "***** Adding admin role and assigning to admin user..."
kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh create clients/$CLID/roles  -r nyomio -s name=admin"
kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh add-roles -r nyomio --uusername admin --cid $CLID --rolename admin"

printf "\n%s\n" "***** Setting up clinets-scope for mapping roles from client roles to access token ..."
export CLIENT_SCOPE_ID
CLIENT_SCOPE_ID=$(kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh get client-scopes -r nyomio | jq -r '.[]  | select(.name == \"roles\") | .id'")
export MAPPER_ID
MAPPER_ID=$(kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh get client-scopes/$CLIENT_SCOPE_ID/protocol-mappers/models -r nyomio | jq -r '.[]  | select(.name == \"client roles\") | .id'")
kubectl exec nyom-sso-keycloak-0 -- bash -c "/opt/jboss/keycloak/bin/kcadm.sh update client-scopes/$CLIENT_SCOPE_ID/protocol-mappers/models/$MAPPER_ID -s 'config.\"id.token.claim\"=\"true\"' -s 'config.\"usermodel.clientRoleMapping.clientId\"=\"nyom-app\"' -r nyomio"

printf "\n%s\n" "***** Cereating kubernetes secret from keycloak nyom-app client secret..."
export CLIENT_SECRET
CLIENT_SECRET=$(kubectl exec nyom-sso-keycloak-0 -- \
      bash -c "/opt/jboss/keycloak/bin/kcadm.sh get -r nyomio clients/$CLID/installation/providers/keycloak-oidc-keycloak-json | jq -r '.credentials.secret'")
kubectl create secret generic nyom-app-oauth-client --from-literal="secret=$CLIENT_SECRET"

printf "\n%s\n" "***** Generating kubernetes secret to use as JWT symmetric key for microservices..."
kubectl create secret generic nyom-apps --from-literal="jwtsecret=$(openssl rand -base64 32)"

# Build and start auth microservice
printf "\n%s\n" "***** Building and starting auth microservice..."
cd ..
auth/build-docker.sh
kubectl apply -f k8s/auth.yml

# Build and start admin microservice
printf "\n%s\n" "***** Building and starting admin microservice..."
admin/build-docker.sh
kubectl apply -f k8s/admin.yml

# Build and start angular webapp
nyom-app/build-docker.sh
kubectl apply -f k8s/webapp.yml
