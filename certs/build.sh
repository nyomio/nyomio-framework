#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

if [[ ! -a helm/templates/certsecret.yml ]]; then
  printf "Generating root CA and cert\n"
    ./createRootCA.sh
    ./createcert.sh
else
  printf "Found CA and cert in helm/templates/certsecret.yml. Skip generation.\n"
fi
