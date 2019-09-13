#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
cd ..
./gradlew auth:build
cd auth
cp ../certs/rootCA.crt build/libs
docker build -t "auth:v1" -f Dockerfile build/libs

