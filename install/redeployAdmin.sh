#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
../admin/build-docker.sh
kubectl rollout restart deployment admin-deployment
