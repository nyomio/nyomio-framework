#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

kubectl create namespace framework-demo

kubectl -n framework-demo create secret generic postgres-user \
        --from-literal=password=$(openssl rand -base64 16)

kubectl -n framework-demo create secret generic keycloak-initial-admin \
        --from-literal=password=$(openssl rand -base64 16)

kubectl -n framework-demo create secret generic nyom-app \
        --from-literal=jwt-secret=$(openssl rand  -base64 64 | tr -d '\n')

kubectl config set-context --current --namespace=framework-demo


cd ..

if [[ "$*" == "buildAuth" ]]; then
  # Build auth microservice
  printf "\n%s\n" "***** Building and starting auth microservice..."
  auth/build-docker.sh
fi

if [[ "$*" == "buildAdmin" ]]; then
  # Build admin microservice
  printf "\n%s\n" "***** Building and starting admin microservice..."
  admin/build-docker.sh
fi

if [[ "$*" == "buildWeb" ]]; then
  # Build angular webapp
  printf "\n%s\n" "***** Building and starting admin microservice..."
  nyom-app/build-docker.sh
fi

