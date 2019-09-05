#!/usr/bin/env bash
./gradlew auth:build
docker build -t "auth:v1" -f auth/Dockerfile .
kubectl rollout restart deployment auth-deployment
