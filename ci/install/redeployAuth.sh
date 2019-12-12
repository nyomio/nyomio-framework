#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
../auth/build-docker.sh
kubectl rollout restart deployment auth-deployment -n=framework-demo
