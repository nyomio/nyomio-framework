FROM adoptopenjdk/openjdk11-openj9:alpine-jre
COPY admin-*-all.jar admin.jar
EXPOSE 8080
CMD java -Dcom.sun.management.jmxremote -noverify ${JAVA_OPTS} \
    -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000 \
    -jar admin.jar
