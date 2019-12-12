#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
cd ..
./gradlew auth:build || exit
cd auth || exit
cp ../certs/rootCA.crt build/libs || exit
docker build -t "auth:v1" -f Dockerfile build/libs

