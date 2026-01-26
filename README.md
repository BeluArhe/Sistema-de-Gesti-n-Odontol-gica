# 🦷 DentalSoft - Sistema de Gestión Odontológica

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring)
![Java](https://img.shields.io/badge/Language-Java-ED8B00?style=for-the-badge&logo=java)
![CSS3](https://img.shields.io/badge/Style-CSS3-1572B6?style=for-the-badge&logo=css3)

**DentalSoft** es una aplicación web integral diseñada para clínicas dentales. Permite la gestión eficiente de pacientes, historiales médicos y cuenta con un **Odontograma Digital Interactivo** que permite a los doctores registrar visualmente el estado de la salud bucal de sus pacientes.

---

## 📸 Capturas de Pantalla

| Login | Gestión de Pacientes |
|:---:|:---:|
| <img src="public/img/logo.png" width="200" alt="Login Screenshot" /> | *Agrega aquí una captura de tu lista de pacientes* |

| Historial Clínico | Odontograma Interactivo |
|:---:|:---:|
| *Agrega aquí una captura de las fichas* | *Agrega aquí una captura del odontograma* |

---

## 🚀 Características Principales

### 1. Gestión de Pacientes
- Registro de nuevos pacientes (Cédula, Nombres, Apellidos).
- Listado con búsqueda y avatares personalizados.
- Navegación fluida entre lista y detalles.

### 2. Historial Clínico (Fichas)
- Creación de fichas médicas por visita.
- Registro de **Motivo de Consulta**, **Diagnóstico**, **Intensidad de Dolor** y **Examen Físico**.
- Historial ordenado cronológicamente.

### 3. ⭐ Odontograma Digital Interactivo
- **Visualización Completa:** Representación gráfica de los 32 dientes (Arcos Superior e Inferior).
- **Interactividad:** Clic en cada diente para editar su estado.
- **Estados Visuales:**
  - 🟢 **Sano:** Color verde.
  - 🔴 **Caries:** Color rojo.
  - ⚫ **Extraído:** Color gris/ausente.
  - 🔵 **En Tratamiento:** Indicador visual específico.
- **Persistencia:** Los cambios se guardan automáticamente en la base de datos.

### 4. Seguridad y Acceso
- Pantalla de Login (Autenticación simulada para demo).
- Sesión persistente mediante `localStorage`.

---

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)
- **React.js (Hooks):** Manejo de estado (`useState`, `useEffect`) y ciclos de vida.
- **Axios:** Comunicación HTTP con el servidor REST.
- **CSS3 Puro:** Diseño responsivo, Flexbox, Grid Layout y variables CSS para tematización.
- **Recursos:** Iconos e imágenes personalizadas.

### Backend (Servidor)
- **Java Spring Boot:** Creación de API RESTful.
- **JPA / Hibernate:** Mapeo Objeto-Relacional.
- **Base de Datos:** (MySQL / H2 / PostgreSQL - *Especifica la que estés usando*).
- **CORS Configuration:** Para permitir peticiones desde el cliente React.

---

## 📦 Instalación y Despliegue

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos
- Node.js y npm instalados.
- JDK 17 o superior.
- Maven.

### 1. Configuración del Backend (Spring Boot)
```bash
# Clona el repositorio
git clone [https://github.com/tu-usuario/dentalsoft.git](https://github.com/tu-usuario/dentalsoft.git)

# Ve a la carpeta del backend
cd backend

# Ejecuta el proyecto
./mvnw spring-boot:run