#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
./gradlew build || exit
cp ../certs/rootCA.crt build/libs || exit
docker build -t "auth:0.1" -f Dockerfile build/libs

