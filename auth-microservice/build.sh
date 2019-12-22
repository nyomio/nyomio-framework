#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
./gradlew build || exit
cp ../certs/rootCA.crt build/libs || exit
docker build -t "nyomio-auth-mircoservice:0.1.0" -f Dockerfile build/libs

