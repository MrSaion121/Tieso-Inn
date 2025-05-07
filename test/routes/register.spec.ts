import request from 'supertest';
import app from '../../src/index';
import User from '../../src/models/user';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import mongoose from 'mongoose';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

jest.mock('../../src/models/user'); // Mock the User model for testing

describe('Tests for the /register endpoint', () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Close resources after tests
    afterAll(async () => {
        await mongoose.connection.close(); // Close the MongoDB connection
    });

    // Test 1: Successful registration
    it('Should successfully register a user', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);        // Simulate that the user does not exist
        (User.prototype.save as jest.Mock).mockResolvedValue({});   // Simulate that the user is saved successfully

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

    // Test 2: Registration - If the email already exists = error
    it('Should return an error if the email is already in use', async () => {
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

        // Normalizes the text by removing double quotes if they exist
        const rawMessage = response.body?.message || response.text;
        const message = typeof rawMessage === 'string' ? rawMessage.replace(/"/g, '') : rawMessage;

        expect(message).toBe('Este email ya se esta usando');
    });

    // Test 3: Registration - Missing password field = error
    it('Should return an error if the password is missing', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                cellphone: '1234567890',
            });

        expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);

        // Normalizes the text by removing double quotes if they exist
        const rawMessage = response.body?.message || response.text;
        const message = typeof rawMessage === 'string' ? rawMessage.replace(/"/g, '') : rawMessage;

        expect(message).toBe('La contraseña es requerida.');
    });
});
