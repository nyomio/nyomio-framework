#!/usr/bin/env sh
cd "$(dirname "$0")" || exit

kubectl create namespace framework-demo
kubectl -n framework-demo create secret generic postgres-user \
        --from-literal=password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')
kubectl -n framework-demo create secret generic keycloak-initial-admin \
        --from-literal=password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')
kubectl -n framework-demo create secret generic nyom-app \
        --from-literal=jwt-secret=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64 ; echo '')
kubectl config set-context --current --namespace=framework-demo
