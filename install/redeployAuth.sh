#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
cd ..
./gradlew auth:build
auth/build-docker.sh
kubectl rollout restart deployment auth-deployment
