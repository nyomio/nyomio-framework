#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

kubectl create namespace framework-demo


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

