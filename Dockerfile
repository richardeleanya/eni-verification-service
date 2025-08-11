# ---- Build stage ----
FROM openjdk:17-jdk-slim AS builder

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN ./mvnw -B package -DskipTests || mvn -B package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]