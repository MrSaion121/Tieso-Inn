import request from 'supertest';
import { app } from '../src/app';
import { HTTP_STATUS_CODES } from '../src/types/http-status-codes';
// Load environment variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// Test creation
describe('Basic Server Startup', () => {

    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Close resources after tests
    afterAll(async() => {
        await mongoose.connection.close(); // Close the connection to MongoDB
    });

    // Test case 1: Verify unknown routes
    it('Should start and respond with a 404 status for unknown routes', async() => {
        const response = await request(app).get('/unknown-route'); // Make the request to a random route

        // Expected result
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND); // Validate the status
        expect(response.body).toEqual({}); // If there is no body CODE : 404 | NOT Found
    });

    // Test case 2: Verify HTML response
    it('Should respond with the login HTML', async() => {
        const response = await request(app).get('/login'); // Make the request to the main route
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS); // Verify that it responds successfully
        expect(response.text).toContain('<html'); // Ensure it contains HTML
    });
});
