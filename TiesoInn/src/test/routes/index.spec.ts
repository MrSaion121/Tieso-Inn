import request from 'supertest';
import app from '../../index';
import path from 'path';

describe('Index Routes', () => {
    it('should return the home.html file for the root route', async () => {
        const response = await request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200);

        // Verifica que el contenido corresponda al archivo HTML esperado.
        const filePath = path.join(__dirname, '../../views/home.html');
        const expectedContent = require('fs').readFileSync(filePath, 'utf8');
        expect(response.text).toBe(expectedContent);
    });
});
