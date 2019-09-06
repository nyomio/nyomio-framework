#!/usr/bin/env bash
openssl req -nodes -new -keyout nyomio.local.pem -out nyomio.local.csr -config cert.cfg
openssl x509 -req -in nyomio.local.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out nyomio.local.crt -days 730 -sha256 -extfile cert.cfg -extensions v3_req
NYOMIO_SAN_CERT_BASE64="$(base64 nyomio.local.crt)"
NYOMIO_SAN_KEY_BASE64="$(base64 nyomio.local.pem)"
sed "s/NYOMIO_SAN_CERT_BASE64/$NYOMIO_SAN_CERT_BASE64/g" ../install/traefikvalues.template.yml | sed "s/NYOMIO_SAN_KEY_BASE64/$NYOMIO_SAN_KEY_BASE64/g" > ../install/traefikvalues.yml
