#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

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



