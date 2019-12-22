#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

printf "\n%s\n" "***** Building and publishing nyomio-commons locally..."
cd ../commons || exit
./gradlew build publishToMavenLocal || exit

# Build auth microservice
printf "\n%s\n" "***** Building nyomio-auth-microservice..."
../auth-microservice/build.sh



