#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
../nyom-app/build-docker.sh
kubectl rollout restart deployment webapp-deployment
