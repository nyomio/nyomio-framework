FROM adoptopenjdk/openjdk11-openj9:jdk-11.0.1.13-alpine-slim
COPY auth/build/libs/auth-*-all.jar auth.jar
COPY scripts/rootCA.crt /tmp/
RUN keytool -import -noprompt -v -trustcacerts -file /tmp/rootCA.crt -cacerts -storepass changeit -alias nyomio
EXPOSE 8080
CMD java -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Dcom.sun.management.jmxremote -noverify ${JAVA_OPTS} -jar auth.jar
