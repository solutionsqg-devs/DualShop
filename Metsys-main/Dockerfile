FROM openjdk:8-jdk-alpine
MAINTAINER baeldung.com
COPY target/springboot-0.0.1-SNAPSHOT.war sercice.war
ENTRYPOINT [ "java","-jar","/service.war" ]
