# ---------- STAGE 1: Build the application ----------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and src code
COPY pom.xml .
COPY src ./src

# Package the application as a fat JAR
RUN mvn clean package -DskipTests

# ---------- STAGE 2: Run the application ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy fat JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
