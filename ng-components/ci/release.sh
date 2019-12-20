#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
cd ..
npm run build:nyomio-ng-components
cd dist/nyomio-ng-components
npm publish
