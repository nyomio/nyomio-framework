# framework-demo
Demo for our API and webapp framework based on micronaut, kotlin, keycloak, grpc and traefik. Ready for kubernetes.

# About the app
The app we build is a simple demo app for company and device management. 
Here is a link that describes the architecture, the components, and the motivation and reasoning behind each 
technical decision:
 [here](https://medium.com/@istvan.szoboszlai/micronaut-with-kotlin-keycloak-grpc-traefik-on-kubernetes-a9861041cc52)

# Getting started (local)
## Prerequisites
 - running local kubernetes cluster (instructions are for [docker desktop](https://www.docker.com/products/docker-desktop)).
  Kubernetes should be switched on: *preferences/kubernetes/enable*. 
 - [helm installed](https://helm.sh/docs/using_helm/#installing-helm)
 
 ## Create and install SSL certs
 
