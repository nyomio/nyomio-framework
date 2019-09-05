#!/usr/bin/env bash
helm init
helm repo add codecentric https://codecentric.github.io/helm-charts
helm install --name nyom-sso codecentric/keycloak
helm install  --name nyom-router --namespace kube-system --values traefikvalues.yaml stable/traefik
echo "Keycloak password: $(kubectl get secret --namespace default nyom-sso-keycloak-http -o jsonpath="{.data.password}" | base64 --decode; echo)"
