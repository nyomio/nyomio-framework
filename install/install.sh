#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

printf "\n%s\n" "***** Initilaizing helm..."
helm init --wait

kubectl apply -f ../k8s/coredns-rewrite.yml

# Traefik
printf "\n%s\n" "***** Installing Treafik from helm chart"
helm install --name nyom-router --namespace kube-system --values traefikvalues.yml stable/traefik

# Keycloak
printf "\n%s\n"  "***** Installing Keycloak from helm chart"
helm repo add codecentric https://codecentric.github.io/helm-charts
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

printf "\n%s\n" "***** Creating user. u: user1, p: user1 ..."
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh create users -r nyomio -s username=user1 -s enabled=true -o --fields id,username'
kubectl exec nyom-sso-keycloak-0 -- bash -c '/opt/jboss/keycloak/bin/kcadm.sh set-password -r nyomio --username user1 --new-password user1'

printf "\n%s\n" "***** Cereating kubernetes secret from keycloak nyom-app client secret..."
export CLIENT_SECRET
CLIENT_SECRET=$(kubectl exec nyom-sso-keycloak-0 -- \
      bash -c "/opt/jboss/keycloak/bin/kcadm.sh get -r nyomio clients/$CLID/installation/providers/keycloak-oidc-keycloak-json | jq -r '.credentials.secret'")
kubectl create secret generic nyom-app-oauth-client --from-literal="secret=$CLIENT_SECRET"

printf "\n%s\n" "***** Generating kubernetes secret to use as JWT symmetric key for microservices..."
kubectl create secret generic nyom-apps --from-literal="jwtsecret=$(openssl rand -base64 32)"

# Build and start auth microservice
printf "\n%s\n" "***** Generating kubernetes secret to use as JWT symmetric key for microservices..."
cd ..
auth/build-docker.sh
kubectl apply -f k8s/auth.yml

# Build and start angular webapp
nyom-app/build-docker.sh
kubectl apply -f k8s/webapp.yml
