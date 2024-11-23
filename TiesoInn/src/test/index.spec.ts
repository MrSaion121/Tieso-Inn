import request from 'supertest';
import app from '../index';

describe('Base API Tests', () => {
    it('should return a 404 for undefined routes', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });
});