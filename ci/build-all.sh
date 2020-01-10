#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

currentK8sContext=$(kubectl config current-context)

case "$currentK8sContext" in
  minikube)
    eval $(minikube docker-env)
    ;;
esac

printf "\n%s\n" "***** Generating certs (if they weren't already generated)"
cd ../certs
./build.sh

printf "\n%s\n" "***** Building and publishing nyomio-commons locally..."
cd ../commons || exit
./gradlew build publishToMavenLocal || exit

# Build auth microservice
printf "\n%s\n" "***** Building nyomio-auth-microservice..."
cd ..
auth-microservice/build.sh



