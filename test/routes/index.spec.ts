import request from 'supertest';
import app from '../../src/index';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

//Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

//Plantilla Mock User Admin
const mockTokenAdmin = jwt.sign(
    { email: 'admin@example.com', role: 'Admin' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

// Simulación de un ID válido de usuario
const mockUserId = new mongoose.Types.ObjectId().toString();

//Plantilla Mock User Admin
const mockTokenGerente = jwt.sign(
    { email: 'Gerente@example.com', role: 'Gerente' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

//Creacion prueba endpoint
describe('Prueba de edpoints de la API', () => {

    //Limpiar todos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async() => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });

    //Endpoint: /
    it('Debe responder correctamente en la ruta raiz /', async() => {
        const response = await request(app).get('/');             //Solicita la peticion en Raiz
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /login
    it('Debe responder correctamente en la ruta /login', async() => {
        const response = await request(app).get('/login');        //Solicita la peticion en login
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /register
    it('Debe responder correctamente en la ruta /register', async() => {
        const response = await request(app).get('/register');     //Solicita la peticion en register
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /rooms
    it('Debe responder correctamente en la ruta /rooms', async() => {
        const response = await request(app).get('/rooms');        //Solicita la peticion en /rooms
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Requieren permisos especiales (Roles, token)
    //Endpoint: /auth/google
    it('Debe responder correctamente en la ruta /auth/google/login', async() => {
        const response = await request(app).get('/auth/google/login');     //Solicita la peticion en /auth/google/login
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.REDIRECT);    //Se espera que responda con 302 Redirigir
    });

    //Endpoint: /users
    // it('Debe responder correctamente en la ruta /users', async() => {
    //     const response = await request(app)
    //         .get('/users')
    //         .set('Authorization', `Bearer ${mockTokenAdmin}`);

    //     expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    // });

    //Endpoint: /reservations
    // it('Debe responder correctamente en la ruta /reservations', async() => {
    //     const response = await request(app)
    //         .get('/reservations')
    //         .set('Authorization', `Bearer ${mockTokenGerente}`);

    //     expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    // });

    //Endpoint: /categories
    it('Debe responder correctamente en la ruta /categories', async() => {
        const response = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${mockTokenAdmin}`);          //Solicita la peticion en /categories

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Endpoint: /support
    it('Debe responder correctamente en la ruta /support', async() => {
        const response = await request(app)
            .get(`/support/${mockUserId}`)                         // Enviamos el ID del usuario en la URL
            .set('Authorization', `Bearer ${mockTokenGerente}`);        // Incluimos el token en los headers

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    // Esperamos un 200 si todo está correcto
    });
});
