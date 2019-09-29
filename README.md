# framework-demo
Demo for our API and webapp framework based on micronaut, kotlin, keycloak, grpc and traefik. Ready for kubernetes.

# About the app
The app we build is a simple demo app for company and device management. 
Here is a link that describes the architecture, the components, and the motivation and reasoning
 behind each technical decision:
 [here](https://medium.com/@istvan.szoboszlai/micronaut-with-kotlin-keycloak-grpc-traefik-on-kubernetes-a9861041cc52)

## Frontend
Angular frontend, but even more opinionated. See docs [here](nyom-app/README.md)

# Getting started (local)
## Prerequisites
 - running local kubernetes cluster (instructions tested with 
 [docker desktop](https://www.docker.com/products/docker-desktop)).
  Kubernetes should be switched on: *preferences/kubernetes/enable*. 
 - [helm installed](https://helm.sh/docs/using_helm/#installing-helm)
 
## Setting up and install SSL certificates
### Create rootCA key and cert
 ```bash
cd certs
./createRootCA.sh
```
this will create 2 files: `rootCA.key` and `rootCA.crt`

**_IMPORTANT:_** You should install `rootCA.crt` as a trusted certificate into your OS / 
Browser if you would like browsers to trust your certs signed by this self signed root certificate. 
You can find  [instructions here](https://www.bounca.org/tutorials/install_root_certificate.html) 
for multiple OS-es. 

Notes on browsers: Most browsers respect the OS certs. Firefox, however, 
is an example that manages its own trusted certificates.

### Create SSL certificates for the domains we use for development
We generate a SAN (Subject Alternative Names) certificate for our local domains under nyomio.local.
To do that run 
 ```bash
cd certs
./createcert.sh
```
This will use the file `certs/cert.cfg` where you can include more domains in the SAN list if needed.
This will also create a configuration for traefik by replacing the palceholders with the base64 
converted certificate and private key in traefikvalues.template.yml and creating traefikvalues.yml.

# Install everything into kubernetes
Simply run
```bash
install/install.sh
```
**_IMPORTANT:_** Having rootCA and leaf SSL certificates created is a prerequisite for installing.
This will do the following:
- init helm
- install Traefik
- install Keycloak
- auth microservice: build, create docker image and install to kubernetes
- nyom-app angular webapp: build, create docker image and install to kubernetes
- set up all ingress rules

Now you can access the angular app at [https://app.nyomio.local/](https://app.nyomio.local/)

# Development
