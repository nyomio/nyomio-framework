#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
protoc --gotemplate_out=./ proto/*.proto
