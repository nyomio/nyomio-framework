#!/usr/bin/env bash
cd "$(dirname "$0")" || exit

if [[ $# -eq 0 && ! $1 == "dev" && ! $1 == "prod" ]]
  then
    printf "You have to spceify 'dev' or 'prod' as first and only argument. \n"
    printf "  - dev: starts nyomio-framework and assumes the usage of 'skaffold dev' \n"
    printf "  - prod: starts nyomio-framework, builds angular frontend with 'ng build --prod' and deploys an nginx server \n"
    exit 0
fi

printf "Checking if nyomio-auth-micorsevice image already exists... "
if [[ -n $(docker images -q nyomio-auth-mircoservice:0.1.0) ]]; then
  printf "NO -- starting build.\n"
  ../ci/build-all.sh
else
  printf "YES.\n"
fi


kubectl delete configmaps --namespace=kube-system coredns
cd helm || exit
if [[ $1 == "dev" ]]
  then
    helm dependencies update .
    helm install nyomio-framework-demo .
    printf "You can start the nyomio-demo-ui angular serrver in livereload mode with 'skaffold dev' \n"
  else
   [[ -n $(docker images -q nyomio-demo-ui:0.1.0) ]] || ../build.sh
   helm install nyomio-framework-demo . --set global.frontendDevMode=false
fi

