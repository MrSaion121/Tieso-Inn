import request from 'supertest';
import app from '../../index';
import User from '../../models/user';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import mongoose from 'mongoose';

//Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

jest.mock('../../models/user'); // Mockear el modelo de User para las pruebas

describe('Pruebas del endpoint /register', () => {
    //Limpiar todos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });

    //Prueba 1: Registro exitoso
    it('Debería registrar un usuario con éxito', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);        // Simula que el usuario no existe
        (User.prototype.save as jest.Mock).mockResolvedValue({});   // Simula que el usuario se guarda exitosamente

        const response = await request(app)
            .post('/register')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'securePassword123',
                cellphone: '1234567890',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.CREATED);
        expect(response.body).toHaveProperty('message', 'Usuario Registrado con exito');
    });

    //Prueba 2: Registro - Si ya esxiste el email = error
    it('Debería retornar error si el email ya está en uso', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({ email: 'johndoe@example.com' });

        const response = await request(app)
            .post('/register')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'securePassword123',
                cellphone: '1234567890',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);

        //Normalizar texto quitando comillas adicionales.
        const message = typeof response.body === "string" ? response.text.replace(/("|"$)/g, '') : response.body.message;
        expect(message).toBe("Este email ya se esta usando");

    });

    //Prueba 3: Registro - Falta el campo de contraseña = error
    it('Debería retornar error si falta la contraseña', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                cellphone: '1234567890',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
        // Normaliza el texto quitando comillas adicionales
        const message = typeof response.body === "string" ? response.text.replace(/(^"|"$)/g, '') : response.body.message;

        expect(message).toBe("La contraseña es requerida.");

    });
});
