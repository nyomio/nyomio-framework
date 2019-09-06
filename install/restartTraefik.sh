#!/usr/bin/env bash
helm delete nyom-router --purge
helm install --name nyom-router --namespace kube-system --values traefikvalues.yml stable/traefik
