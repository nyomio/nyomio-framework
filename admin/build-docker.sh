#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
cd ..
./gradlew admin:clean admin:build
cd admin
docker build -t "admin:v1" -f Dockerfile build/libs
