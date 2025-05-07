import request from 'supertest';
import app from '../../src/index';
import User from '../../src/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import mongoose from 'mongoose';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

jest.mock('../../src/models/user'); // Mock the User model
jest.mock('bcryptjs');          // Mock bcrypt
jest.mock('jsonwebtoken');      // Mock jwt

describe('Tests for the /login endpoint', () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Close resources after tests
    afterAll(async() => {
        await mongoose.connection.close(); // Close the MongoDB connection
    });

    // Test 1: Successful login with token returned (Pending to verify the token)
    it('Should successfully log in and return a token', async() => {
        const mockUser = {
            user_id: new mongoose.Types.ObjectId().toString(),
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashedPassword123',
            status: 'Active',
        };

        // Mock configurations
        // Mocking User.findOne
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        // Mocking bcrypt.compare
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        // Mocking jwt.sign
        (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

        // Make request
        const response = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
        expect(response.body).toHaveProperty('token', 'mockedToken');       // Validate that the token is returned
        expect(response.body).toHaveProperty('user_id', mockUser.user_id);  // Validate the user ID
        expect(response.body).toHaveProperty('name', mockUser.name);        // Validate the user name
    });

    // Test 2: Return error if the email does not exist
    it('Should return an error if the email does not exist', async() => {
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

    // Test 3: User enters incorrect password or none
    it('Should return an error if the password is incorrect', async() => {
        const mockUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Active',
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

    // Test 4: User account is enabled (Active)
    it('Should return success if the account status is active', async() => {
        const mockUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Active',
            user_id: '67435bfbd9d05121f51cfd45',
            name: 'John Doe',
            role: 'Client',
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

    // Test 5: User account is blocked or deleted (Pending to verify)
    it('Should return an error if the user is blocked or deleted', async() => {
        // Case 1: Blocked User
        const blockedUser = {
            email: 'johndoe@example.com',
            password: 'hashedPassword',
            status: 'Bloqueado', // Updated to match the controller logic
            user_id: '67435bfbd9d05121f51cfd45',
            name: 'John Doe',
            role: 'Client',
        };

        // Mocking User.findOne to return a blocked user
        (User.findOne as jest.Mock).mockResolvedValue(blockedUser);

        const responseBlocked = await request(app)
            .post('/login')
            .send({
                email: 'johndoe@example.com',
                password: 'securePassword123',
            });

        expect(responseBlocked.statusCode).toBe(HTTP_STATUS_CODES.UNATHORIZED);
        expect(responseBlocked.body).toHaveProperty('error', 'El usuario esta bloqueado o eliminado');

        // Case 2: Deleted User
        const deletedUser = { ...blockedUser, status: 'Eliminado' }; // Updated to match the controller logic

        // Mocking User.findOne to return a deleted user
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
