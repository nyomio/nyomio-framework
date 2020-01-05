#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
rm -rf dist
npm install
ng build --prod || exit
docker build -t "nyomio-demo-ui:0.1.0" -f Dockerfile dist/nyom-app
