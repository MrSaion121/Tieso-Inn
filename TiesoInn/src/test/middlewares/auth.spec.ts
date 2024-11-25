import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import jwt from 'jsonwebtoken';
import app from '../../index';
import mongoose from 'mongoose';

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();



describe('Pruebas del middleware - auth', () => {
    // Limpiar Mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });

    describe('', () => {

    })

});