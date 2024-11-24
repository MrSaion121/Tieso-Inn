import request from 'supertest';
//import app from '../../index';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
//Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();
//Leer el servidor corriendo
const SERVER_URL = process.env.SERVER_URL || '';
const PORT = process.env.PORT || 3000;
//url del servidor
const serverUrl = `${SERVER_URL}:${PORT}`

//Creacion prueba endpoint
describe('Prueba de edpoints de la API', () => {

    //Endpoint: /
    it('Debe de responder correctamente en la ruta raiz /', async () => {
        const response = await request(serverUrl).get('/');             //Solicita la peticion en Raiz
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /login
    it('Debe responder correctamente en la ruta /login', async () => {
        const response = await request(serverUrl).get('/login');        //Solicita la peticion en login
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /register
    it('Debe responder correctamente en la ruta /register', async () => {
        const response = await request(serverUrl).get('/register');     //Solicita la peticion en register
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
        expect(response.text).toContain('<html');                       //Se espera que contenga contenido HTML
    });

    //Endpoint: /rooms
    it('Debe responder correctamente en la ruta /rooms', async () => {
        const response = await request(serverUrl).get('/rooms');        //Solicita la peticion en /rooms
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Requieren permisos especiales (Roles, token)
    /*
    //Endpoint: /auth/google
    it('Debe responder correctamente en la ruta /auth/google', async () => {
        const response = await request(serverUrl).get('/auth/google');     //Solicita la peticion en /auth/google
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Endpoint: /users
    it('Debe responder correctamente en la ruta /users', async () => {
        const response = await request(serverUrl).get('/users');        //Solicita la peticion en /users
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Endpoint: /reservations
    it('Debe responder correctamente en la ruta /reservations', async () => {
        const response = await request(serverUrl).get('/reservations'); //Solicita la peticion en /reservations
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Endpoint: /categories
    it('Debe responder correctamente en la ruta /categories', async () => {
        const response = await request(serverUrl).get('/categories');   //Solicita la peticion en /categories
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });

    //Endpoint: /support
    it('Debe responder correctamente en la ruta /support', async () => {
        const response = await request(serverUrl).get('/support');      //Solicita la peticion en /support
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);    //Se espera que responda con 200
    });
    */

});