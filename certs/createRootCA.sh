#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt \
        -subj "/C=NA/ST=LocalnOnly/L=LocalOnly/O=LocalOnly/CN=*nyomio.local"

