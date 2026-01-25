# Odontograma Service

Microservicio para la gestión de odontogramas en el Sistema de Gestión Odontológica.

## Descripción

Este microservicio es responsable de:
- Crear y gestionar odontogramas para pacientes
- Registrar el estado de cada diente (sano, cariado, obturado, ausente, etc.)
- Mantener un historial de cambios en la dentición del paciente
- Proporcionar información detallada sobre la salud dental

## Estructura

```
odontograma-service/
├── src/
│   ├── main/
│   │   ├── java/com/epn/odontologia/odontograma/
│   │   │   ├── controllers/
│   │   │   │   └── OdontogramaController.java
│   │   │   ├── models/
│   │   │   │   ├── Odontograma.java
│   │   │   │   └── Diente.java
│   │   │   ├── repositories/
│   │   │   │   ├── OdontogramaRepository.java
│   │   │   │   └── DienteRepository.java
│   │   │   ├── services/
│   │   │   │   └── OdontogramaService.java
│   │   │   └── OdontogramaServiceApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/epn/odontologia/odontograma/
│           └── OdontogramaServiceApplicationTests.java
└── pom.xml
```

## Configuración

El servicio se ejecuta en el puerto **8083** y utiliza PostgreSQL con la base de datos `db_odontograma`.

### application.properties
```properties
server.port=8083
spring.application.name=odontograma-service
spring.datasource.url=jdbc:postgresql://localhost:5432/db_odontograma
spring.datasource.username=postgres
spring.datasource.password=admin
spring.jpa.hibernate.ddl-auto=update
```

## Endpoints

### Odontogramas

- **POST** `/api/odontogramas/crear` - Crear un nuevo odontograma
- **GET** `/api/odontogramas/paciente/{pacienteId}` - Obtener todos los odontogramas de un paciente
- **GET** `/api/odontogramas/{id}` - Obtener un odontograma específico
- **PUT** `/api/odontogramas/{id}` - Actualizar un odontograma
- **DELETE** `/api/odontogramas/{id}` - Eliminar un odontograma

### Dientes

- **GET** `/api/odontogramas/{odontogramaId}/dientes` - Obtener todos los dientes de un odontograma
- **PUT** `/api/odontogramas/dientes/{dienteId}` - Actualizar el estado de un diente

## Modelos

### Odontograma
- `id`: Identificador único
- `pacienteId`: Referencia al paciente
- `fechaCreacion`: Fecha de creación del odontograma
- `fechaActualizacion`: Fecha de última actualización
- `observacionesGenerales`: Observaciones generales del odontograma
- `dientes`: Lista de dientes asociados

### Diente
- `id`: Identificador único
- `numeroDiente`: Número del diente (1-32 según numeración FDI)
- `estado`: Estado del diente (Sano, Cariado, Obturado, Ausente, etc.)
- `observaciones`: Observaciones específicas del diente
- `odontogramaId`: Referencia al odontograma

## Dependencias

- Spring Boot 4.0.1
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- Spring Web MVC

## Compilación y Ejecución

```bash
# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

## Integración con otros microservicios

Este servicio se integra con:
- **pacientes-service** (puerto 8081): Para validar la existencia de pacientes
- **fichas-service** (puerto 8082): Para asociar odontogramas con fichas clínicas
