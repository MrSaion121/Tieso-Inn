import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import SupportChat from '../../models/support_chat';
import app from '../../index';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

//Mockear el modelo del chat
jest.mock('../../models/support_chat');

//Plantilla Mock Token
const mockToken = jwt.sign(
    { email: 'admin@example.com', role: 'Admin' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

describe('Pruebas de endpoint de chat de soporte', () => {
    // Limpiar mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar conexión MongoDB
    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Pruebas del controlador de chat de soporte', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        // Pruebas para getChat
        describe('', () => {
            it('', async () => {

            });
        });
    });
});