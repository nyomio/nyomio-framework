# Nyomio Framework
A highly opinionated mash off technologies based on 
 - micronaut (on kotlin) - microservices backend
 - angular - frontend
 - keycloak - authentication provider
 - postgres - DB both for keycloak and domain data
 - Traefik - proxy 

The framework has specific ways augmented with code generation to make data travel from backend to frontend.

Ready for kubernetes with helm charts.

# Reasoning behind architectural choices
Here is a link that describes the architecture, the components, the motivation and the reasoning
 behind each technical decision:
 [here](https://medium.com/@istvan.szoboszlai/micronaut-with-kotlin-keycloak-grpc-traefik-on-kubernetes-a9861041cc52)

## Frontend
Angular frontend, but even more opinionated. _*TODO:*_ we need a reference for the documentation

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
k8s/setup.sh buildAuth buildAdmin buildWeb
kubectl apply -k
```
**_IMPORTANT:_** Having rootCA and leaf SSL certificates created is a prerequisite for installing.

To run on minikube you have to use minikube's docker command in the terminal which you will use to 
execute install.sh. Execute before install.sh:
```bash
eval $(minikube docker-env)
```

# Add DNS entries to the hosts file
```
10.109.10.97 traefik.nyomio.local app.nyomio.local sso.nyomio.local
```
Here you have to replace 10.109.10.97 with the external ip of traefik ingress service.

# Getting externalIp for traefik service on minikube
You have to execute ```minikube tunnel``` to make traefik accessible from the host. After that
you can see the ip in the result of ```k get services traefik-ingress```

# Development
