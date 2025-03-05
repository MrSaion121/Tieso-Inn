import request from 'supertest';
import app from '../../index';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import mongoose from 'mongoose';

//Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

jest.mock('../../models/user'); // Mockear el modelo de User
jest.mock('bcryptjs');          // Mockear bcrypt
jest.mock('jsonwebtoken');      // Mockear jwt

describe('Pruebas del endpoint /login', () => {
    //Limpiar todos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async() => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });

    //Prueba 1: usuario autenticado con token devuelto (Pendiente por ver el token)
    it('Debería de hacer un login exitoso y devolver un token', async() => {
        const mockUser = {
            user_id: new mongoose.Types.ObjectId().toString(),
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashedPassword123',
            status: 'Activo',
        };

        //Configuracion de los mocks
        // Mockeando User.findOne
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        // Mockeando bcrypt.compare
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        // Mockeando jwt.sign
        (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

        //Realizar peticion
        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
        expect(response.body).toHaveProperty('token', 'mockedToken');       // Validar que regresa el token
        expect(response.body).toHaveProperty('user_id', mockUser.user_id);  // Validar el ID de usuario
        expect(response.body).toHaveProperty('name', mockUser.name);        // Validar el nombre del usuario
    });

    //Prueba 2: Retornar el error si no existe el correo
    it('Debería retornar error si el correo no existe', async() => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post('/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'securePassword123',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        expect(response.body).toHaveProperty('error', 'El correo no existe');
    });

    //Prueba 3: El usuario escribe contraseña incorrecta, o no hay
    it('Debería retornar error si la contraseña es incorrecta', async() => {
        const mockUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Activo',
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'wrongPassword',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        expect(response.body).toHaveProperty('error', 'Contraseña incorrecta');
    });

    //Prueba 4: usuario tiene la cuenta habilitada (Activa)
    it('Debería retornar exito si el estado de la cuenta esta activa', async() => {
        const mockUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Activo',
            user_id: '67435bfbd9d05121f51cfd45',
            name: 'John Doe',
            role: 'Cliente',
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
    });

    //Prueba 5: usuario tiene la cuenta bloqueada o anda elimianda (Pendiente por ver)
    it('Debería retornar error si el usuario está bloqueado o eliminado', async() => {
        //Caso 1: Usuario Bloqueado
        const blockedUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Bloqueado',
            user_id: '67435bfbd9d05121f51cfd45',
            name: 'John Doe',
            role: 'Cliente',
        };

        // Mockeando User.findOne para retornar un usuario bloqueado
        (User.findOne as jest.Mock).mockResolvedValue(blockedUser);

        const responseBlocked = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(responseBlocked.statusCode).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        expect(responseBlocked.body).toHaveProperty('error', 'El usuario esta bloqueado o eliminado');

        //Caso 2: Usuario Eliminado
        const deletedUser = { ...blockedUser, status: 'Eliminado' };

        // Mockeando User.findOne para retornar un usuario eliminado
        (User.findOne as jest.Mock).mockResolvedValue(deletedUser);

        const responseDeleted = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(responseDeleted.statusCode).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        expect(responseDeleted.body).toHaveProperty('error', 'El usuario esta bloqueado o eliminado');
    });
});
