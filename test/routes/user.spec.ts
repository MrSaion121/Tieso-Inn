import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../../src/models/user';
import { app } from '../../src/app';
import mongoose from 'mongoose';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Mock Token Template
const mockToken = jwt.sign(
    { email: 'admin@example.com', role: 'Admin' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

// Mock data for tests
const mockUser = {
    user_id: new mongoose.Types.ObjectId(),
    name: 'Test User',
    role: 'Cliente',
    email: 'testuser@example.com',
    password: 'hashedpassword',
    cellphone: '1234567890',
    status: 'Activo',
};

describe('Tests for the /users endpoint', () => {
    // Clear mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Close MongoDB connection
    afterAll(async() => {
        await mongoose.connection.close();
    });

    // GET: Retrieve all users
    describe('GET /users', () => {
        // it('Should return all users with status 200', async() => {
        //     jest.spyOn(User, 'find').mockResolvedValue([mockUser]);

        //     const response = await request(app)
        //         .get('/users')
        //         .set('Authorization', `Bearer ${mockToken}`);

        //     expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
        //     expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ email: mockUser.email })]));
        // });

        it('Should return status 401 if no token is provided', async() => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        });
    });

    // GET: Retrieve a user by ID
    describe('GET /users/:id', () => {
        it('Should return a user with status 200', async() => {
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const response = await request(app)
                .get(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toEqual(expect.objectContaining({ email: mockUser.email }));
        });

        it('Should return status 404 if the user does not exist', async() => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);

            const response = await request(app)
                .get(`/users/${mockUser.user_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
        });
    });

    // POST: Create a new user
    describe('POST /users', () => {
        it('Should create a user with status 201', async() => {
            jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/users')
                .send({ ...mockUser, password: 'plaintextpassword' })
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
            expect(response.body).toHaveProperty('message', 'Usuario creado con exito');
        });

        it('Should return status 400 if the email already exists', async() => {
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/users')
                .send(mockUser)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
        });
    });

    // PUT: Update a user
    // describe('PUT /users/:id', () => {
    //     it('Should update a user with status 200', async() => {
    //         jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue({
    //             ...mockUser,
    //             name: 'Updated Name',
    //         });

    //         const response = await request(app)
    //             .put(`/users/${mockUser.user_id}`)
    //             .send({ name: 'Updated Name' })
    //             .set('Authorization', `Bearer ${mockToken}`);

    //         expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
    //         expect(response.body.updatedUser).toHaveProperty('name', 'Updated Name');
    //     });

    //     it('Should return status 404 if the user does not exist', async() => {
    //         jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(null);

    //         const response = await request(app)
    //             .put(`/users/${mockUser.user_id}`)
    //             .send({ name: 'Updated Name' })
    //             .set('Authorization', `Bearer ${mockToken}`);

    //         expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    //     });
    // });

    // DELETE: Delete a user
    // describe('DELETE /users/:id', () => {
    //     it('Should delete a user with status 200', async() => {
    //         jest.spyOn(User, 'findOneAndDelete').mockResolvedValue(mockUser);

    //         const response = await request(app)
    //             .delete(`/users/${mockUser.user_id}`)
    //             .set('Authorization', `Bearer ${mockToken}`);

    //         expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
    //     });

    //     it('Should return status 404 if the user does not exist', async() => {
    //         jest.spyOn(User, 'findOneAndDelete').mockResolvedValue(null);

    //         const response = await request(app)
    //             .delete(`/users/${mockUser.user_id}`)
    //             .set('Authorization', `Bearer ${mockToken}`);

    //         expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    //     });
    // });
});
