import mongoose from 'mongoose';

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

//Mockear el modelo del chat
jest.mock('../../models/support_chat');

describe('Pruebas de endpoint de chat de soporte', () => {
    // Limpiar mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar conexión MongoDB
    afterAll(async() => {
        await mongoose.connection.close();
    });

    describe('Pruebas del controlador de chat de soporte', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterAll(async() => {
            await mongoose.connection.close();
        });
    });
});
