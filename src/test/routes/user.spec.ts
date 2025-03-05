import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import app from '../../index';
import mongoose from 'mongoose';

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

//Plantilla Mock Token
const mockToken = jwt.sign(
    { email: 'admin@example.com', role: 'Admin' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

// Mock de datos para pruebas
const mockUser = {
    user_id: new mongoose.Types.ObjectId(),
    name: 'Test User',
    role: 'Cliente',
    email: 'testuser@example.com',
    password: 'hashedpassword',
    cellphone: '1234567890',
    status: 'Activo',
};

describe('Pruebas del endpoint /users', () => {
    // Limpiar mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

     // Cerrar conexión MongoDB
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // GET: Obtener todos los usuarios
    describe('GET /users', () => {
        it('Debería devolver todos los usuarios con estado 200', async () => {
            jest.spyOn(User, 'find').mockResolvedValue([mockUser]);

            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ email: mockUser.email })]));
        });

        it('Debería devolver estado 401 si no hay token', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        });
    });

    // GET: Obtener un usuario por ID
    describe('GET /users/:id', () => {
        it('Debería devolver un usuario con estado 200', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const response = await request(app)
                .get(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toEqual(expect.objectContaining({ email: mockUser.email }));
        });

        it('Debería devolver estado 404 si el usuario no existe', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);

            const response = await request(app)
                .get(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
        });
    });

    // POST: Crear un nuevo usuario
    describe('POST /users', () => {
        it('Debería crear un usuario con estado 201', async () => {
            jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/users')
                .send({ ...mockUser, password: 'plaintextpassword' })
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
            expect(response.body).toHaveProperty('message', 'Usuario Registrado con exito');
        });

        it('Debería devolver estado 400 si el email ya existe', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/users')
                .send(mockUser)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
        });
    });

    // PUT: Actualizar un usuario
    describe('PUT /users/:id', () => {
        it('Debería actualizar un usuario con estado 200', async () => {
            jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue({
                ...mockUser,
                name: 'Updated Name',
            });

            const response = await request(app)
                .put(`/users/${mockUser.user_id}`)
                .send({ name: 'Updated Name' })
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body.updatedUser).toHaveProperty('name', 'Updated Name');
        });

        it('Debería devolver estado 404 si el usuario no existe', async () => {
            jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(null);

            const response = await request(app)
                .put(`/users/${mockUser.user_id}`)
                .send({ name: 'Updated Name' })
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
        });
    });

    // DELETE: Eliminar un usuario
    describe('DELETE /users/:id', () => {
        it('Debería eliminar un usuario con estado 200', async () => {
            jest.spyOn(User, 'findOneAndDelete').mockResolvedValue(mockUser);

            const response = await request(app)
                .delete(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
        });

        it('Debería devolver estado 404 si el usuario no existe', async () => {
            jest.spyOn(User, 'findOneAndDelete').mockResolvedValue(null);

            const response = await request(app)
                .delete(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
        });
    });
});