# TIESO INN

Tieso Inn es una página web que emula un negocio de hotelería.
El objetivo principal es crear una plataforma sencilla de utilizar para consultar la disponibilidad de habitaciones y realizar reservaciones.

# Miembros del equipo

- Victor Manuel Tellez Amezcua
- Jose Santiago Oseguera García
- Rodrigo López Coronado

# Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio
Clona el repositorio de GitHub en tu equipo local o descargando directamente el zip.
```bash
git clone https://github.com/victortelles/Tecn.Des.Servidores_Proyecto.git
```
```bash
https://codeload.github.com/victortelles/Tecn.Des.Servidores_Proyecto/zip/refs/heads/desarrollo?token=A5I7TOW6BE7QAGQMASLEJP3HBCHQO
```

### 2. Asegúrate de estar en la rama main
Antes de realizar cualquier cosa, asegúrate de encontrarte en la rama main

```bash
git checkout main
```

### 3. Instalar dependencias
Entra al directorio del proyecto y ejecuta los siguientes comandos para instalar todas las dependencias requeridas para el proyecto.

```bash
cd TiesoInn
```
```bash
npm install
```

#### Dependencias

- bcryptjs 2.4.3
- dotenv 16.4.5
- express 4.21.0
- mongoose 8.7.1
- swagger-jsdoc 6.2.8
- swagger-ui-express 5.0.1

#### Dependencias de desarrollador

- @types/bcryptjs 2.4.6
- @types/express 4.17.21
- @types/mongoose 5.11.97
- @types/node 22.7.4
- @types/swagger-jsdoc 6.0.4
- @types/swagger-ui-express 4.1.6
- nodemon 3.1.7
- ts-node 10.9.2
- typescript 5.6.2

### 4. Compilar el proyecto
```bash
npm run scripts
```

### 5. Ejecutar el proyecto en modo producción
```bash
npm start
```

### 6. Ejecutar el proyecto en modo desarrollo
Para ejecutar la API en modo de desarrollo con reinicios automáticos, usa el siguiente comando:
```bash
npm run dev
```

Deberá de estar corriendo en el puerto ***3000***

### Endpoints del CRUD de Usuarios

### Caso pruebas
Recomendamos utilizar **Postman** para realizar las pruebas

#### 1. Obtener todos los usuarios

- **URL**: `/users`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todos los usuarios, omitiendo las contraseñas por seguridad.
- **Respuesta de ejemplo**:
    ```json
    [
      {
        "name": "Juan Pérez",
        "role": "admin",
        "email": "juan.perez@example.com",
        "cellphone": "555-1234",
        "status": "active"
      },
      {
        "name": "Ana García",
        "role": "user",
        "email": "ana.garcia@example.com",
        "cellphone": "555-5678",
        "status": "inactive"
      }
    ]
    ```

#### 2. Obtener un usuario por correo electrónico

- **URL**: `/users/{email}`
- **Método**: `GET`
- **Descripción**: Obtiene los detalles de un usuario específico según su correo electrónico, omitiendo la contraseña.
- **Parámetros**:
    - `email` (en la URL) – El correo electrónico del usuario que se desea consultar.
- **Respuesta de ejemplo**:
    ```json
    {
      "name": "Juan Pérez",
      "role": "admin",
      "email": "juan.perez@example.com",
      "cellphone": "555-1234",
      "status": "active"
    }
    ```
- **Errores posibles**:
    - `404`: Usuario no encontrado.
    - `500`: Error al conseguir el usuario.

#### 3. Crear un nuevo usuario

- **URL**: `/users`
- **Método**: `POST`
- **Descripción**: Crea un nuevo usuario con los datos proporcionados.
- **Cuerpo de la solicitud**:
    ```json
    {
      "name": "Carlos López",
      "role": "user",
      "email": "carlos.lopez@example.com",
      "password": "miContrasenaSegura",
      "cellphone": "555-8765",
      "status": "active"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "_id": "643f1b7c1bce8c0012345678",
      "name": "Carlos López",
      "role": "user",
      "email": "carlos.lopez@example.com",
      "cellphone": "555-8765",
      "status": "active"
    }
    ```
- **Errores posibles**:
    - `400`: El correo ya está en uso.
    - `500`: Error al crear el usuario.

#### 4. Actualizar un usuario

- **URL**: `/users/{email}`
- **Método**: `PUT`
- **Descripción**: Actualiza la información de un usuario existente según su correo electrónico.
- **Parámetros**:
    - `email` (en la URL) – El correo electrónico del usuario a actualizar.
- **Cuerpo de la solicitud**:
    ```json
    {
      "name": "Carlos López Actualizado",
      "cellphone": "555-9876",
      "status": "inactive"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Usuario actualizado",
      "updatedUser": {
        "name": "Carlos López Actualizado",
        "role": "user",
        "email": "carlos.lopez@example.com",
        "cellphone": "555-9876",
        "status": "inactive"
      }
    }
    ```
- **Errores posibles**:
    - `404`: Usuario no encontrado.
    - `500`: Error al actualizar el usuario.

#### 5. Eliminar un usuario

- **URL**: `/users/{email}`
- **Método**: `DELETE`
- **Descripción**: Elimina un usuario del sistema según su correo electrónico.
- **Parámetros**:
    - `email` (en la URL) – El correo electrónico del usuario a eliminar.
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Usuario eliminado con éxito"
    }
    ```
- **Errores posibles**:
    - `400`: Usuario no encontrado.
    - `500`: Error al eliminar el usuario.

### Endpoints del CRUD de Categorías

#### 1. Obtener todas las categorías

- **URL**: `/categories`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las categorías.
- **Respuesta de ejemplo**:
    ```json
    [
      {
        "category_id": "101",
        "name": "Habitación Doble",
        "num_of_beds": 2,
        "capacity": 4
      },
      {
        "category_id": "102",
        "name": "Habitación Sencilla",
        "num_of_beds": 1,
        "capacity": 2
      }
    ]
    ```

#### 2. Obtener una categoría por ID

- **URL**: `/categories/{category_id}`
- **Método**: `GET`
- **Descripción**: Obtiene los detalles de una categoría específica según su ID.
- **Parámetros**:
    - `category_id` (en la URL) – El ID de la categoría que se desea consultar.
- **Respuesta de ejemplo**:
    ```json
    {
      "category_id": "101",
      "name": "Habitación Doble",
      "num_of_beds": 2,
      "capacity": 4
    }
    ```
- **Errores posibles**:
    - `404`: Categoría no encontrada.
    - `500`: Error al obtener la categoría.

#### 3. Crear una nueva categoría

- **URL**: `/categories`
- **Método**: `POST`
- **Descripción**: Crea una nueva categoría con los datos proporcionados.
- **Cuerpo de la solicitud**:
    ```json
    {
      "category_id": "103",
      "name": "Habitación Familiar",
      "num_of_beds": 3,
      "capacity": 6
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "_id": "643f1b7c1bce8c0012345679",
      "category_id": "103",
      "name": "Habitación Familiar",
      "num_of_beds": 3,
      "capacity": 6
    }
    ```
- **Errores posibles**:
    - `400`: La categoría ya existe.
    - `500`: Error al crear la categoría.

#### 4. Actualizar una categoría

- **URL**: `/categories/{category_id}`
- **Método**: `PUT`
- **Descripción**: Actualiza la información de una categoría existente según su ID.
- **Parámetros**:
    - `category_id` (en la URL) – El ID de la categoría a actualizar.
- **Cuerpo de la solicitud**:
    ```json
    {
      "name": "Habitación Familiar Grande",
      "num_of_beds": 4,
      "capacity": 8
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Categoría actualizada correctamente",
      "updatedCategory": {
        "category_id": "103",
        "name": "Habitación Familiar Grande",
        "num_of_beds": 4,
        "capacity": 8
      }
    }
    ```
- **Errores posibles**:
    - `404`: Categoría no encontrada.
    - `500`: Error al actualizar la categoría.

#### 5. Eliminar una categoría

- **URL**: `/categories/{category_id}`
- **Método**: `DELETE`
- **Descripción**: Elimina una categoría del sistema según su ID.
- **Parámetros**:
    - `category_id` (en la URL) – El ID de la categoría a eliminar.
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Categoría eliminada correctamente"
    }
    ```
- **Errores posibles**:
    - `400`: Categoría no encontrada.
    - `500`: Error al eliminar la categoría.

### Endpoints del CRUD de Habitaciones

#### 1. Obtener todas las habitaciones

- **URL**: `/rooms`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las habitaciones.
- **Respuesta de ejemplo**:
    ```json
    [
      {
        "room_id": "201",
        "category_id": "101",
        "price_per_night": 1500,
        "description": "Habitación con vista al mar",
        "image_url": "https://ejemplo.com/imagen.jpg",
        "status": "available"
      },
      {
        "room_id": "202",
        "category_id": "102",
        "price_per_night": 1200,
        "description": "Habitación estándar",
        "image_url": "https://ejemplo.com/imagen2.jpg",
        "status": "occupied"
      }
    ]
    ```

#### 2. Obtener una habitación por ID

- **URL**: `/rooms/{room_id}`
- **Método**: `GET`
- **Descripción**: Obtiene los detalles de una habitación específica según su ID.
- **Parámetros**:
    - `room_id` (en la URL) – El ID de la habitación que se desea consultar.
- **Respuesta de ejemplo**:
    ```json
    {
      "room_id": "201",
      "category_id": "101",
      "price_per_night": 1500,
      "description": "Habitación con vista al mar",
      "image_url": "https://ejemplo.com/imagen.jpg",
      "status": "available"
    }
    ```
- **Errores posibles**:
    - `404`: Habitación no encontrada.
    - `500`: Error al obtener la habitación.

#### 3. Crear una nueva habitación

- **URL**: `/rooms`
- **Método**: `POST`
- **Descripción**: Crea una nueva habitación con los datos proporcionados.
- **Cuerpo de la solicitud**:
    ```json
    {
      "room_id": "203",
      "category_id": "103",
      "price_per_night": 1800,
      "description": "Habitación de lujo",
      "image_url": "https://ejemplo.com/imagen3.jpg",
      "status": "available"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "_id": "643f1b7c1bce8c0012345680",
      "room_id": "203",
      "category_id": "103",
      "price_per_night": 1800,
      "description": "Habitación de lujo",
      "image_url": "https://ejemplo.com/imagen3.jpg",
      "status": "available"
    }
    ```
- **Errores posibles**:
    - `400`: La habitación ya existe o la categoría no existe.
    - `500`: Error al crear la habitación.

#### 4. Actualizar una habitación

- **URL**: `/rooms/{room_id}`
- **Método**: `PUT`
- **Descripción**: Actualiza la información de una habitación existente según su ID.
- **Parámetros**:
    - `room_id` (en la URL) – El ID de la habitación a actualizar.
- **Cuerpo de la solicitud**:
    ```json
    {
      "price_per_night": 1600,
      "description": "Habitación con vista al jardín",
      "status": "available"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Habitación actualizada correctamente",
      "updatedRoom": {
        "room_id": "201",
        "category_id": "101",
        "price_per_night": 1600,
        "description": "Habitación con vista al jardín",
        "image_url": "https://ejemplo.com/imagen.jpg",
        "status": "available"
      }
    }
    ```
- **Errores posibles**:
    - `404`: Habitación no encontrada.
    - `500`: Error al actualizar la habitación.

#### 5. Eliminar una habitación

- **URL**: `/rooms/{room_id}`
- **Método**: `DELETE`
- **Descripción**: Elimina una habitación del sistema según su ID.
- **Parámetros**:
    - `room_id` (en la URL) – El ID de la habitación a eliminar.
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Habitación eliminada correctamente"
    }
    ```
- **Errores posibles**:
    - `400`: Habitación no encontrada.
    - `500`: Error al eliminar la habitación.

### Endpoints del CRUD de Reservaciones

##### 1. Obtener todas las reservaciones

- **URL**: `/reservations`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las reservaciones.
- **Respuesta de ejemplo**:
    ```json
    [
      {
        "reservation_num": 1,
        "email": "usuario1@example.com",
        "room_id": "643f1b7c1bce8c0012345680",
        "arrival_date": "2024-12-01",
        "checkout_date": "2024-12-10",
        "num_of_guest": 2,
        "status": "confirmed"
      },
      {
        "reservation_num": 2,
        "email": "usuario2@example.com",
        "room_id": "643f1b7c1bce8c0012345681",
        "arrival_date": "2024-11-15",
        "checkout_date": "2024-11-18",
        "num_of_guest": 1,
        "status": "cancelled"
      }
    ]
    ```

#### 2. Obtener una reservación por ID

- **URL**: `/reservations/{id}`
- **Método**: `GET`
- **Descripción**: Obtiene los detalles de una reservación específica según su ID.
- **Parámetros**:
    - `id` (en la URL) – El número de reservación que se desea consultar.
- **Respuesta de ejemplo**:
    ```json
    {
      "reservation_num": 1,
      "email": "usuario1@example.com",
      "room_id": "643f1b7c1bce8c0012345680",
      "arrival_date": "2024-12-01",
      "checkout_date": "2024-12-10",
      "num_of_guest": 2,
      "status": "confirmed"
    }
    ```
- **Errores posibles**:
    - `404`: Reservación no encontrada.
    - `500`: Error al obtener la reservación.

#### 3. Crear una nueva reservación

- **URL**: `/reservations`
- **Método**: `POST`
- **Descripción**: Crea una nueva reservación con los datos proporcionados.
- **Cuerpo de la solicitud**:
    ```json
    {
      "email": "usuario@example.com",
      "room_id": "643f1b7c1bce8c0012345680",
      "arrival_date": "2024-12-01",
      "checkout_date": "2024-12-10",
      "num_of_guest": 2,
      "status": "confirmed"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "reservation_num": 3,
      "email": "usuario@example.com",
      "room_id": "643f1b7c1bce8c0012345680",
      "arrival_date": "2024-12-01",
      "checkout_date": "2024-12-10",
      "num_of_guest": 2,
      "status": "confirmed"
    }
    ```
- **Errores posibles**:
    - `404`: Usuario o habitación no válidos.
    - `500`: Error al crear la reservación.

#### 4. Actualizar una reservación

- **URL**: `/reservations/{id}`
- **Método**: `PUT`
- **Descripción**: Actualiza la información de una reservación existente según su ID.
- **Parámetros**:
    - `id` (en la URL) – El número de reservación a actualizar.
- **Cuerpo de la solicitud**:
    ```json
    {
      "email": "nuevo_email@example.com",
      "room_id": "643f1b7c1bce8c0012345682",
      "arrival_date": "2024-12-15",
      "checkout_date": "2024-12-20",
      "num_of_guest": 3,
      "status": "confirmed"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
      "reservation_num": 1,
      "email": "nuevo_email@example.com",
      "room_id": "643f1b7c1bce8c0012345682",
      "arrival_date": "2024-12-15",
      "checkout_date": "2024-12-20",
      "num_of_guest": 3,
      "status": "confirmed"
    }
    ```
- **Errores posibles**:
    - `404`: Reservación no encontrada.
    - `500`: Error al actualizar la reservación.

#### 5. Eliminar una reservación

- **URL**: `/reservations/{id}`
- **Método**: `DELETE`
- **Descripción**: Elimina una reservación del sistema según su ID.
- **Parámetros**:
    - `id` (en la URL) – El número de reservación a eliminar.
- **Respuesta de ejemplo**:
    ```json
    {
      "message": "Reserva eliminada correctamente"
    }
    ```
- **Errores posibles**:
    - `404`: Reservación no encontrada.
    - `500`: Error al eliminar la reservación.

Si todo salió correctamente, debe salir un código 200 y un mensaje de éxito y/o mostrar el contenido correspondiente. 