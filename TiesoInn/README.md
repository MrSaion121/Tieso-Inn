# TIESO INN

Tieso Inn is a web page that emulates a hotel business.
It's main objective is to create a simple to use platform that allows the user to check for which rooms are available and to make reservations

# Team Members

- Victor Manuel Tellez Amezcua
- Jose Santiago Oseguera García
- Rodrigo López Coronado

# Instructions to execute the project

### 1. Clone the repository
Clone the GitHub repository in your local equipment or by downloading the zip directly
```bash
git clone https://github.com/MrSaion121/Tieso-Inn.git
```

### 2. Make sure to be in the main branch
Before doing anything else, make sure to be in the main branch

```bash
git checkout main
```

### 3. Install dependencies
Enter the project directory and execute the following commands to install all the required dependencies

```bash
cd TiesoInn
```
```bash
npm install
```

#### Dependencies

- bcryptjs 2.4.3
- dotenv 16.4.5
- express 4.21.0
- mongoose 8.7.1
- swagger-jsdoc 6.2.8
- swagger-ui-express 5.0.1

#### Dev dependencies

- @types/bcryptjs 2.4.6
- @types/express 4.17.21
- @types/mongoose 5.11.97
- @types/node 22.7.4
- @types/swagger-jsdoc 6.0.4
- @types/swagger-ui-express 4.1.6
- nodemon 3.1.7
- ts-node 10.9.2
- typescript 5.6.2

### 4. Compile the project
```bash
npm run scripts
```

### 5. Execute the project in production mode
```bash
npm start
```

### 6. Execute the project in dev mode
In order to execute the API in development mode with automatic reboots, use the following command
```bash
npm run dev
```

It should be running on port ***3000***

### Conventional Commits
Commits in the repository must follow the conventional commits specification, for more information click here https://www.conventionalcommits.org/en/v1.0.0/#specification 

### User CRUD Endpoints

### Tests
We recommend using **Postman** for API testing

#### 1. Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Returns a list of all the users, omitting the passwords for safety
- **Example Response**:
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

#### 2. Get User by Email

- **URL**: `/users/{email}`
- **Method**: `GET`
- **Description**: Returns all details of a specific user by their email, omitting their password
- **Parameters**:
    - `email` (in the URL) – The user's email
- **Example Response**:
    ```json
    {
      "name": "Juan Pérez",
      "role": "admin",
      "email": "juan.perez@example.com",
      "cellphone": "555-1234",
      "status": "active"
    }
    ```
- **Possible errors**:
    - `404`: User not found.
    - `500`: Error while fetching user.

#### 3. Create new User

- **URL**: `/users`
- **Method**: `POST`
- **Description**: Creates a new User with the given values.
- **Body**:
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
- **Example Response**:
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
- **Possible errors**:
    - `400`: The email is already in use.
    - `500`: Error while creating the user.

#### 4. Update a User

- **URL**: `/users/{email}`
- **Method**: `PUT`
- **Description**: Updates a user's information with the given email
- **Parameters**:
    - `email` (in the URL) – The updated user's email.
- **Body**:
    ```json
    {
      "name": "Carlos López Actualizado",
      "cellphone": "555-9876",
      "status": "inactive"
    }
    ```
- **Example Response**:
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
- **Possible errors**:
    - `404`: User not found.
    - `500`: Error while finding the user.

#### 5. Delete a user

- **URL**: `/users/{email}`
- **Method**: `DELETE`
- **Description**: Deletes a user with the given email
- **Parameters**:
    - `email` (in the URL) – The user's email.
- **Example Response**:
    ```json
    {
      "message": "User has been deleted successfully"
    }
    ```
- **Possible errors**:
    - `400`: User not found.
    - `500`: Error while deleting the user.

### Category CRUD Endpoints

#### 1. Get all Categories

- **URL**: `/categories`
- **Method**: `GET`
- **Description**: Returns a list of all categories.
- **Example Response**:
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

#### 2. Get a Category by ID

- **URL**: `/categories/{category_id}`
- **Method**: `GET`
- **Description**: Returns all details of a category with the given ID
- **Parameters**:
    - `category_id` (in the URL) – The ID of the category to be consulted.
- **Example Response**:
    ```json
    {
      "category_id": "101",
      "name": "Habitación Doble",
      "num_of_beds": 2,
      "capacity": 4
    }
    ```
- **Possible errors**:
    - `404`: Category not found.
    - `500`: Error while fetching the category.

#### 3. Create a new Category

- **URL**: `/categories`
- **Method**: `POST`
- **Description**: Create a new category with the given data.
- **Body**:
    ```json
    {
      "category_id": "103",
      "name": "Habitación Familiar",
      "num_of_beds": 3,
      "capacity": 6
    }
    ```
- **Example Response**:
    ```json
    {
      "_id": "643f1b7c1bce8c0012345679",
      "category_id": "103",
      "name": "Habitación Familiar",
      "num_of_beds": 3,
      "capacity": 6
    }
    ```
- **Possible errors**:
    - `400`: The category already exists.
    - `500`: Error while creating the category.

#### 4. Update a category

- **URL**: `/categories/{category_id}`
- **Method**: `PUT`
- **Description**: Updates the information of an existing category with the given ID.
- **Parameters**:
    - `category_id` (in the URL) – The ID of the category that will be updated.
- **Body**:
    ```json
    {
      "name": "Habitación Familiar Grande",
      "num_of_beds": 4,
      "capacity": 8
    }
    ```
- **Example Response**:
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
- **Possible errors**:
    - `404`: Category not found.
    - `500`: Error while updating the category.

#### 5. Delete a Category

- **URL**: `/categories/{category_id}`
- **Method**: `DELETE`
- **Description**: Deletes a category with the given ID
- **Parameters**:
    - `category_id` (in the URL) – The ID of the category that will be eliminated.
- **Example Response**:
    ```json
    {
      "message": "Categoría eliminada correctamente"
    }
    ```
- **Possible errors**:
    - `400`: Category not found
    - `500`: Error while deleting the category.

### Room CRUD Endpoints

#### 1. Get All Rooms

- **URL**: `/rooms`
- **Method**: `GET`
- **Description**: Returns a list of all the rooms.
- **Example Response**:
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

#### 2. Get Room by ID

- **URL**: `/rooms/{room_id}`
- **Method**: `GET`
- **Description**: Returns all the details of a room with the given ID.
- **Parameters**:
    - `room_id` (in the URL) – ID of the room.
- **Example Response**:
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
- **Possible errors**:
    - `404`: Room not found.
    - `500`: Error finding the room.

#### 3. Create a new Room

- **URL**: `/rooms`
- **Method**: `POST`
- **Description**: Create a new room with the specified parameters.
- **Body**:
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
- **Example Response**:
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
- **Possible errors**:
    - `400`: The room already exists or the category doesn't exists.
    - `500`: Error while creating the room.

#### 4. Update the Room

- **URL**: `/rooms/{room_id}`
- **Method**: `PUT`
- **Description**: Update.
- **Parameters**:
    - `room_id` (in the URL) – The ID of the room that will be updated.
- **Body**:
    ```json
    {
      "price_per_night": 1600,
      "description": "Habitación con vista al jardín",
      "status": "available"
    }
    ```
- **Example Response**:
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
- **Possible errors**:
    - `404`: Room not found.
    - `500`: Error while updating the room.

#### 5. Delete a Room

- **URL**: `/rooms/{room_id}`
- **Method**: `DELETE`
- **Description**: Deletes a room with the given ID.
- **Parameters**:
    - `room_id` (in the URL) – The ID of the room that will be deleted.
- **Example Response**:
    ```json
    {
      "message": "Habitación eliminada correctamente"
    }
    ```
- **Possible errors**:
    - `400`: Room not found.
    - `500`: Error while deleting the room.

### Reservation CRUD Endpoints

##### 1. Get all Reservations

- **URL**: `/reservations`
- **Method**: `GET`
- **Description**: Returns a list of all reservations.
- **Example Response**:
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

#### 2. Get a Reservation by ID

- **URL**: `/reservations/{id}`
- **Method**: `GET`
- **Description**: Get a reservation's details by it's ID
- **Parameters**:
    - `id` (in the URL) – The reservation's number.
- **Example Response**:
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
- **Possible errors**:
    - `404`: Reservation not found
    - `500`: Error while fetching the reservation
      
#### 3. Create a new Reservation

- **URL**: `/reservations`
- **Method**: `POST`
- **Description**: Creates a reservation with the given values
- **Body**:
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
- **Example Response**:
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
- **Possible errors**:
    - `404`: Not valid User or Room.
    - `500`: Error while creating the reservation.

#### 4. Update the Reservation 

- **URL**: `/reservations/{id}`
- **Method**: `PUT`
- **Description**: Updates the information of a reservatin with the given ID.
- **Parameters**:
    - `id` (in the URL) – The reservation's number.
- **Body**:
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
- **Example Response**:
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
- **Possible errors**:
    - `404`: Reservation not found.
    - `500`: Error while fetching the reservation.

#### 5. Delete a reservation

- **URL**: `/reservations/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a reservation with the given ID
- **Parameters**:
    - `id` (in the URL) – The reservation's number
- **Example Response**:
    ```json
    {
      "message": "Reserva eliminada correctamente"
    }
    ```
- **Possible errors**:
    - `404`: Reservation not found.
    - `500`: Error while deleting the reservation.

If everything works correctly, you should receive a code 200 with a success message and the corresponding content
