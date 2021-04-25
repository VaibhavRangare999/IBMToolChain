FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
RUN mkdir -p /tmp
RUN mkdir -p /tmp/WlpApp
WORKDIR /tmp
COPY WlpApp/pom.xml /tmp/WlpApp
COPY WlpApp/src /tmp/WlpApp/src
#COPY --from=node /app/dist/WebApp /tmp/WlpApp/src/main/resource/public
#COPY --from=node /app/dist/WebApp /tmp/WlpApp/src/main/webapp
#RUN cat /tmp/WlpApp/src/main/resorces/public/index.html
WORKDIR /tmp/WlpApp
RUN mvn clean install


FROM open-liberty AS OPEN_LIBERTY
ARG VERSION=1.0
#ARG VERSION=20.0.0.11
ARG REVISION=SNAPSHOT
COPY --chown=1001:0 liberty/config /config/
COPY --chown=1001:0 --from=MAVEN_TOOL_CHAIN /tmp/WlpApp/target/*.war /config/apps/
#COPY --chown=1001:0 --from=MAVEN_TOOL_CHAIN /tmp/WlpApp/src/main/resorces/public /config/apps
EXPOSE 3000
ARG VERBOSE=false
RUN configure.sh
