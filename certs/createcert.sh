#!/usr/bin/env bash
cd "$(dirname "$0")" || exit
rm java_keystore.jks
openssl req -nodes -new -keyout nyomio.local.pem -out nyomio.local.csr -config cert.cfg
openssl x509 -req -in nyomio.local.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out nyomio.local.crt -days 730 -sha256 -extfile cert.cfg -extensions v3_req
openssl pkcs8 -topk8 -nocrypt -in nyomio.local.pem -out nyomio.local.pkcs8
keytool -import -noprompt -v -trustcacerts -file rootCA.crt -keystore java_keystore.jks -storepass developer
NYOMIO_SAN_CERT_BASE64="$(base64 nyomio.local.crt)"
NYOMIO_SAN_KEY_BASE64="$(base64 nyomio.local.pem)"
NYOMIO_SAN_KEY_PKCS8_BASE64="$(base64 nyomio.local.pkcs8)"
NYOMIO_SAN_CA_BASE64="$(base64 rootCA.crt)"
JAVA_KEYSTORE_BASE64="$(base64 java_keystore.jks)"
sed -e "s/NYOMIO_SAN_CERT_BASE64/${NYOMIO_SAN_CERT_BASE64//$'\n'/}/g" ./certsecret.template.yaml \
  | sed "s/NYOMIO_SAN_KEY_BASE64/${NYOMIO_SAN_KEY_BASE64//$'\n'/}/g" \
  | sed "s/NYOMIO_SAN_KEY_PKCS8_BASE64/${NYOMIO_SAN_KEY_PKCS8_BASE64//$'\n'/}/g" \
  | sed "s/NYOMIO_SAN_CA_BASE64/${NYOMIO_SAN_CA_BASE64//$'\n'/}/g" \
  | sed "s#JAVA_KEYSTORE_BASE64#${JAVA_KEYSTORE_BASE64//$'\n'/}#g" > ./certsecret.yaml

