import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import jwt from 'jsonwebtoken';
import Category from '../../src/models/category';
import { app } from '../../src/app';
import mongoose from 'mongoose';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Mock Category Template
const mockCategory = {
    category_id: '62f4bf80b5872c0018c9eb07',
    name: 'Estándar',
    num_of_beds: 2,
    capacity: 4,
};

// Mock User Tokens
// const adminToken = jwt.sign(
//     { email: 'admin@example.com', role: 'Admin' },
//     process.env.SECRET_KEY!,
//     { expiresIn: '1h' }
// );

const clientToken = jwt.sign(
    { email: 'client@example.com', role: 'Cliente' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

jest.mock('../../src/models/category');

describe('Tests for the /categories endpoint', () => {
    // Clear mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Close resources after tests
    afterAll(async () => {
        await mongoose.connection.close(); // Close MongoDB connection
    });

    // GET | /categories - Get all categories
    describe('GET /categories', () => {
        it('Should return all categories for authenticated users', async () => {
            (Category.find as jest.Mock).mockResolvedValue([mockCategory]);

            const response = await request(app)
                .get('/categories')
                .set('Authorization', `Bearer ${clientToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toEqual([mockCategory]); // Expect an array of all categories
        });

        it('Should handle server errors', async () => {
            (Category.find as jest.Mock).mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .get('/categories')
                .set('Authorization', `Bearer ${clientToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al conseguir las categorías'); // Expect error message
        });
    });

    // GET | /categories/:category_id - Get a category by ID
    describe('GET /categories/:category_id', () => {
        it('Should return a category by its ID for authenticated users', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(mockCategory);

            const response = await request(app)
                .get(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${clientToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toEqual(mockCategory); // Expect the category object
        });

        it('Should return 404 if the category does not exist', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(null); // Force category to not exist

            const response = await request(app)
                .get('/categories/invalid_category_id')
                .set('Authorization', `Bearer ${clientToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
            expect(response.text).toBe('Categoría no encontrada'); // Expect not found message
        });

        it('Should handle server errors', async () => {
            (Category.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .get(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${clientToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al obtener la categoría'); // Expect error message
        });
    });

//     // POST | /categories - Create a category
//     describe('POST /categories', () => {
//         it('Should create a new category for Admin users', async () => {
//             (Category.findOne as jest.Mock).mockResolvedValue(null); // Ensure the category does not exist
//             (Category.prototype.save as jest.Mock).mockResolvedValue(mockCategory);

//             const response = await request(app)
//                 .post('/categories')
//                 .set('Authorization', `Bearer ${adminToken}`)
//                 .send(mockCategory); // Send the new category request

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.CREATED);
//             expect(response.body).toEqual(mockCategory); // Expect the created category object
//         });

//         it('Should return 400 if the category already exists', async () => {
//             (Category.findOne as jest.Mock).mockResolvedValue(mockCategory); // Find the category

//             const response = await request(app) // Send the request
//                 .post('/categories')
//                 .set('Authorization', `Bearer ${adminToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
//             expect(response.text).toBe('Esta categoria ya existe'); // Expect error message
//         });

//         it('Should handle server errors', async () => {
//             (Category.findOne as jest.Mock).mockResolvedValue(null); // Ensure the category does not exist
//             (Category.prototype.save as jest.Mock).mockRejectedValue(new Error('Server error'));

//             const response = await request(app)
//                 .post('/categories')
//                 .set('Authorization', `Bearer ${adminToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
//             expect(response.text).toBe('Error al crear la categoría'); // Expect server error message
//         });

//         it('Should return 403 for non-Admin users', async () => {
//             const response = await request(app)
//                 .post('/categories')
//                 .set('Authorization', `Bearer ${clientToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.FORBIDDEN);
//             expect(response.body.message).toBe('Permiso denegado'); // Expect permission denied message
//         });
//     });

//     // PUT | /categories/:category_id - Update a category
//     describe('PUT /categories/:category_id', () => {
//         it('Should update a category for Admin users', async () => {
//             (Category.findOneAndUpdate as jest.Mock).mockResolvedValue(mockCategory);

//             const response = await request(app)
//                 .put(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${adminToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
//             expect(response.text).toBe('Categoría actualizada correctamente'); // Expect success message
//         });

//         it('Should handle server errors', async () => {
//             (Category.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error('Server error'));

//             const response = await request(app)
//                 .put(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${adminToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
//             expect(response.text).toBe('Error al actualizar la categoría'); // Expect error message
//         });

//         it('Should return 403 for non-Admin users', async () => {
//             const response = await request(app)
//                 .put(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${clientToken}`)
//                 .send(mockCategory);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.FORBIDDEN);
//             expect(response.body.message).toBe('Permiso denegado'); // Expect permission denied message
//         });
//     });

//     // DELETE | /categories/:category_id - Delete a category
//     describe('DELETE /categories/:category_id', () => {
//         it('Should delete a category for Admin users', async () => {
//             (Category.findOneAndDelete as jest.Mock).mockResolvedValue(mockCategory); // Use the mock category

//             const response = await request(app)
//                 .delete(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${adminToken}`);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
//             expect(response.text).toBe('Categoría eliminada correctamente'); // Expect success message
//         });

//         it('Should return 404 if the category is not found', async () => {
//             (Category.findOneAndDelete as jest.Mock).mockResolvedValue(null); // Force no category

//             const response = await request(app)
//                 .delete(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${adminToken}`);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
//             expect(response.text).toBe('Categoría no encontrada'); // Expect not found message
//         });

//         it('Should handle server errors', async () => {
//             (Category.findOneAndDelete as jest.Mock).mockRejectedValue(new Error('Server error'));

//             const response = await request(app)
//                 .delete(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${adminToken}`);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
//             expect(response.text).toBe('Error al eliminar la categoría'); // Expect error message
//         });

//         it('Should return 403 for non-Admin users', async () => {
//             const response = await request(app)
//                 .delete(`/categories/${mockCategory.category_id}`)
//                 .set('Authorization', `Bearer ${clientToken}`);

//             expect(response.statusCode).toBe(HTTP_STATUS_CODES.FORBIDDEN);
//             expect(response.body.message).toBe('Permiso denegado'); // Expect permission denied message
//         });
//     });
});
