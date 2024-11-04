
# SPA Reservation Web Application

Este proyecto es una aplicación web para un SPA donde los clientes pueden registrarse y reservar servicios de masajes. Los administradores pueden gestionar y ver todas las reservas, mientras que los usuarios regulares pueden realizar sus propias reservas.

## Planteamiento del Problema

El sistema está diseñado para resolver las necesidades de un SPA que desea gestionar citas de manera eficiente, permitiendo a los usuarios reservar servicios disponibles y dando a los administradores la capacidad de ver todas las citas registradas. Esta solución facilita la organización de citas y mejora la experiencia del usuario al permitir que la reserva se haga en línea.

## Tecnologías y Herramientas

- **Node.js**: Entorno de ejecución para el backend, utilizado para construir la API del servidor.
- **Express.js**: Framework para Node.js que facilita el manejo de rutas y la creación de API REST.
- **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar usuarios, citas y servicios.
- **Sequelize**: ORM para Node.js que simplifica las consultas y la gestión de la base de datos.
- **React**: Librería de JavaScript utilizada para crear interfaces de usuario interactivas.
- **React Router v6.4**: Biblioteca de enrutamiento para React que facilita la creación de rutas y la navegación en la aplicación.
- **JavaScript (ES6+)**: Lenguaje de programación utilizado en el frontend y backend para implementar la lógica del proyecto.

## Estructura de Carpetas

La estructura de carpetas está diseñada para seguir el modelo MVC (Modelo-Vista-Controlador), lo que facilita la organización del código y mejora la mantenibilidad del proyecto.

```
├── server/
│   ├── controllers/      # Lógica de los controladores de cada recurso
│   ├── models/           # Definición de los modelos y sus relaciones
│   ├── routes/           # Definición de las rutas del backend
│   └── server.js         # Configuración principal del servidor
├── client/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables de React
│   │   ├── pages/        # Páginas principales del frontend
│   │   ├── api/          # Configuración de los endpoints del frontend
│   │   └── App.js        # Configuración de enrutamiento principal
└── README.md             # Documentación del proyecto
```

### Descripción de Carpetas Clave

- **controllers/**: Contiene la lógica de cada recurso del backend. Se separan los controladores según su funcionalidad (como citas, servicios).
- **models/**: Define los modelos de datos y sus relaciones en Sequelize.
- **routes/**: Define las rutas de la API que se comunican con los controladores.
- **components/** y **pages/**: En el frontend, los componentes reutilizables están en `components`, mientras que las vistas principales están en `pages`.

## Endpoints

### Backend API

- **POST /api/auth/login**: Inicia sesión de un usuario y devuelve su información.
- **GET /api/appointments**: Obtiene todas las citas registradas (solo accesible para administradores).
- **POST /api/appointments**: Crea una nueva cita con el servicio y usuario especificados.
- **GET /api/services**: Obtiene la lista de servicios de masajes disponibles.

### Frontend

- **/**: Página de inicio de sesión.
- **/register**: Página de registro de usuario.
- **/admin**: Panel de administrador donde se visualizan todas las citas (solo para administradores).
- **/user**: Panel de usuario para reservar un servicio.
- **/reserva**: Página de reserva de servicio.

## Modelos

### User
- **id**: Identificador único del usuario.
- **nombre**: Nombre del usuario.
- **apellido**: Apellido del usuario.
- **email**: Correo electrónico del usuario.
- **role**: Rol del usuario (`admin` o `user`).

### Service
- **id**: Identificador único del servicio.
- **nombre**: Nombre del servicio.

### Appointment
- **id**: Identificador único de la cita.
- **fecha**: Fecha de la cita.
- **hora**: Hora de la cita.
- **userId**: Referencia al usuario que reservó la cita.
- **serviceId**: Referencia al servicio de masaje reservado.

## Controladores

### authController
- **loginUsuario**: Verifica las credenciales y devuelve la información del usuario con su rol.

### appointmentController
- **crearCita**: Crea una nueva cita.
- **obtenerCitas**: Obtiene todas las citas registradas (solo accesible por administradores).

### serviceController
- **obtenerServicios**: Obtiene todos los servicios de masajes disponibles.

## Script de la Base de Datos

Aquí tienes el script SQL para crear las tablas necesarias, junto con datos de prueba para cada tabla.

```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE Appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    hora TIME,
    userId INT,
    serviceId INT,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (serviceId) REFERENCES Services(id)
);

-- Datos de prueba
INSERT INTO Users (nombre, apellido, email, role) VALUES 
('Juan', 'Pérez', 'juan@example.com', 'admin'),
('Maria', 'Gómez', 'maria@example.com', 'user');

INSERT INTO Services (nombre) VALUES 
('Masaje Relajante'),
('Masaje Terapéutico'),
('Masaje Deportivo');

INSERT INTO Appointments (fecha, hora, userId, serviceId) VALUES 
('2024-11-05', '10:00:00', 2, 1),
('2024-11-06', '15:30:00', 2, 2);
```

## Instrucciones para Ejecutar el Proyecto

1. **Clona el repositorio**: 
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Configura el backend**:
   - Navega a la carpeta del servidor:
     ```bash
     cd server
     ```
   - Instala las dependencias:
     ```bash
     npm install
     ```
   - Configura la base de datos en el archivo de conexión (`server.js`).
   - Inicia el servidor:
     ```bash
     npm start
     ```

3. **Configura el frontend**:
   - Navega a la carpeta del cliente:
     ```bash
     cd client
     ```
   - Instala las dependencias:
     ```bash
     npm install
     ```
   - Inicia el servidor de desarrollo:
     ```bash
     npm start
     ```

4. **Accede a la aplicación**:
   - Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación.

5. **Roles y Acceso**:
   - Inicia sesión con `admin` para acceder al panel de administración en `/admin`.
   - Los usuarios regulares pueden acceder a la página de reserva en `/reserva` o `/user`.

Con esta configuración y documentación, el proyecto queda listo para uso y desarrollo adicional.
