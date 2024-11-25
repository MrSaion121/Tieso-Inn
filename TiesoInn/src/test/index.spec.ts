import request from 'supertest';
import app from '../index';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
//Cargar variables de entorno
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

//Creacion prueba
describe('Arranque de Servidor basico', () => {

    //Limpiar todos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });

    //Caso 1: verificar rutas desconocidas
    it('Debe iniciar y responder con un estatus 404 para rutas desconocidas', async () => {
        const response = await request(app).get('/ruta-desconocida'); //Realiza la solicitud a una ruta random

        //Expectativa de resultado
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND); //Validar el estatus
        expect(response.body).toEqual({}); //Si no hay body CODE : 404 | NOT Found
    });

    //Caso 2: Verificar respuesta HTML
    it('Debe Responder con el HTML de login', async () => {
        const response = await request(app).get('/login'); //Realiza la solicitud a ruta main
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS); // Verificar que responda exitosamente
        expect(response.text).toContain('<html'); //Asegurarse que contenga HTML
    })
});