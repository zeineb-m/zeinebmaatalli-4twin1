FROM openjdk:17
EXPOSE 8081
ADD http://192.168.188.128:8081/repository/maven-releases/tn/esprit/spring/kaddem/0.0.1/kaddem-0.0.1.jar kaddem-0.0.1.jar
ENTRYPOINT ["java","-jar","/kaddem-0.0.1-SNAPSHOT.jar"]
