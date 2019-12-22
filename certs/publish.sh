#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

if [[ ! -a certsecret.yaml ]]; then
  ./createRootCA.sh
  ./createcert.sh
fi

kubectl apply -f certsecret.yaml
