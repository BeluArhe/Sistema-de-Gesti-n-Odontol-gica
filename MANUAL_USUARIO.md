# Manual de Usuario y Despliegue

## Descripción General
Este sistema gestiona información odontológica, incluyendo autenticación de usuarios, fichas clínicas, odontogramas y pacientes. Cada módulo es un microservicio independiente basado en Spring Boot y PostgreSQL.

## Requisitos Previos
- Docker instalado
- Docker Compose instalado
- PostgreSQL instalado (opcional si usas Docker para la base de datos)
- Java 17+ (para desarrollo local)

## Estructura de la Aplicación
- **auth-service**: Servicio de autenticación y usuarios
- **fichas-service**: Gestión de fichas clínicas
- **odontograma-service**: Gestión de odontogramas
- **pacientes-service**: Gestión de pacientes

## Ejecución Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/BeluArhe/Sistema-de-Gesti-n-Odontol-gica.git
   ```
2. Configura las bases de datos PostgreSQL para cada servicio (ver archivos `application.properties`).
3. Compila y ejecuta cada servicio:
   ```bash
   cd <servicio>/<carpeta del servicio>
   ./mvnw spring-boot:run
   ```

## Despliegue con Docker
1. Crea los archivos `Dockerfile` para cada microservicio (ejemplo para Spring Boot):
   ```dockerfile
   FROM openjdk:17-jdk-alpine
   VOLUME /tmp
   COPY target/*.jar app.jar
   ENTRYPOINT ["java","-jar","/app.jar"]
   ```
2. Construye la imagen Docker:
   ```bash
   docker build -t <nombre-servicio> .
   ```
3. Ejecuta el contenedor:
   ```bash
   docker run -p <puerto-local>:<puerto-servicio> <nombre-servicio>
   ```
4. (Opcional) Usa Docker Compose para levantar todos los servicios y la base de datos:
   ```yaml
   version: '3.8'
   services:
     auth-service:
       build: ./auth-service/auth-service
       ports:
         - "8080:8080"
       environment:
         SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/db_usuarios
         SPRING_DATASOURCE_USERNAME: postgres
         SPRING_DATASOURCE_PASSWORD: admin
     pacientes-service:
       build: ./pacientes-service/demo
       ports:
         - "8081:8081"
       environment:
         SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/db_pacientes
         SPRING_DATASOURCE_USERNAME: postgres
         SPRING_DATASOURCE_PASSWORD: admin
     db:
       image: postgres:15
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: admin
         POSTGRES_DB: db_usuarios
       ports:
         - "5432:5432"
   ```
   Luego ejecuta:
   ```bash
   docker-compose up --build
   ```

## Uso de la Aplicación
- Accede a los servicios por sus puertos configurados (ejemplo: http://localhost:8080 para auth-service).
- Consulta la documentación de cada microservicio para los endpoints disponibles.

## Notas
- Modifica los archivos `application.properties` según tu entorno.
- Revisa los logs de los contenedores para solucionar errores.

---

Para más detalles, consulta la documentación interna de cada microservicio.