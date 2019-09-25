#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
cd .. || exit
./gradlew admin:build || exit
cd admin || exit
docker build -t "admin:v1" -f Dockerfile build/libs
