#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
../../auth-microservice/build-docker.sh
kubectl rollout restart deployment auth-deployment -n=framework-demo
