#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
helm delete nyom-router --purge
helm install --name nyom-router --namespace kube-system --values traefikvalues.yml stable/traefik
