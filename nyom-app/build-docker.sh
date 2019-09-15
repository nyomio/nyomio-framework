#!/usr/bin/env bash
cd "$(dirname "$0")" || exit # cd to the parent dir of this script
rm -rf dist
ng build --prod
docker build -t "webapp:v1" -f Dockerfile dist/nyom-app
