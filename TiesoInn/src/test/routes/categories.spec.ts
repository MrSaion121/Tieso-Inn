import request from 'supertest';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
import jwt from 'jsonwebtoken';
import Category from '../../models/category';
import app from '../../index';
import mongoose from 'mongoose';

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

//Plantilla Mock Category
const mockCategory = {
    category_id: '62f4bf80b5872c0018c9eb07',
    name: 'Estándar',
    num_of_beds: 2,
    capacity: 4,
};

//Plantilla Mock User
const mockToken = jwt.sign(
    { email: 'admin@example.com', role: 'Admin' },
    process.env.SECRET_KEY!,
    { expiresIn: '1h' }
);

jest.mock('../../models/category');

describe('Pruebas del endpoint /categories', () => {
    // Limpiar Mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Cerrar recursos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión a MongoDB
    });


    // GET | /categories - Obtener todas las categorías
    describe('GET /categories', () => {
        it('Debería devolver todas las categorías', async () => {
            (Category.find as jest.Mock).mockResolvedValue([mockCategory]);

            const response = await request(app)
                .get('/categories')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toBeInstanceOf(Array);                        //Se espera el arreglo de todas las categorias
        });

        it('Debería manejar errores del servidor', async () => {
            (Category.find as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(app)
                .get('/categories')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al conseguir las categorías');    //SE espera el mensaje de error
        });
    });

    // GET | /categories/:category_id - Obtener una categoría por ID
    describe('GET /categories/:category_id', () => {
        it('Debería devolver una categoría por su ID', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(mockCategory);

            const response = await request(app)
                .get(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toHaveProperty('category_id', mockCategory.category_id);      //Se espera devolver el id de la categoria
        });

        it('Debería devolver 404 si la categoría no existe', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(null);            //Forzar a que no exista la categoria

            const response = await request(app)
                .get(`/categories/invalid_category_id`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
            expect(response.text).toBe('Categoría no encontrada');              //Se espera el mensaje de respuesta.
        });

        it('Debería manejar errores del servidor', async () => {
            (Category.findOne as jest.Mock).mockRejectedValue(new Error('Error del servidor')); //Forza a rechazar la solicitud

            const response = await request(app)
                .get(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al obtener la categoría');        //Se espera Mensaje de error
        });
    });

    //POST | /categories - Crear una categoría
    describe('POST /categories', () => {
        it('Debería crear una nueva categoría', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(null);        // Asegurarse de que la categoría no exista
            (Category.prototype.save as jest.Mock).mockResolvedValue(mockCategory);

            const response = await request(app)
                .post('/categories')
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockCategory);                                            //Manda la peticion de la nueva categoria a guardar

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.CREATED);
            //expect(response.body).toHaveProperty('category_id', mockCategory.category_id);  //Se espera la respuesta del servidor de que se creo
        });

        it('Debería devolver 400 si la categoría ya existe', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(mockCategory);    //Busca la categoria

            const response = await request(app)                                 //Manda la peticion
                .post('/categories')
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockCategory);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
            expect(response.text).toBe('Esta categoria ya existe');             //Se espera a que mande error, por que ya existe.
        });

        it('Debería manejar errores del servidor', async () => {
            (Category.findOne as jest.Mock).mockResolvedValue(null); // Asegurarse de que la categoría no exista
            (Category.prototype.save as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(app)
                .post('/categories')
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockCategory);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al crear la categoría');          //Se espera error del servidor.
        });
    });

    // PUT | /categories/:category_id - Actualizar una categoría
    describe('PUT /categories/:category_id', () => {
        it('Debería actualizar una categoría', async () => {
            (Category.findOneAndUpdate as jest.Mock).mockResolvedValue(mockCategory);

            const response = await request(app)
                .put(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockCategory);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.text).toBe(`Categoría ${mockCategory} actualizada correctamente`);  //Se espera la respuesta exitosa
        });

        it('Debería manejar errores del servidor', async () => {
            (Category.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error('Error del servidor'));    //Forzar error

            const response = await request(app)
                .put(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockCategory);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al actualizar la categoría');     //Se espera la respuesta de error
        });
    });

    //DELETE | /categories/:category_id - Eliminar una categoría
    describe('DELETE /categories/:category_id', () => {
        it('Debería eliminar una categoría', async () => {
            (Category.findOneAndDelete as jest.Mock).mockResolvedValue(mockCategory);   //Toma el mock de categoria

            const response = await request(app)
                .delete(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.text).toBe('Categoría eliminada correctamente');            //Se espera la respuesta exitoso
        });

        it('Debería devolver 404 si la categoría no se encuentra', async () => {
            (Category.findOneAndDelete as jest.Mock).mockResolvedValue(null);           //Forzar a que no tenga

            const response = await request(app)
                .delete(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
            expect(response.text).toBe('Categoría no encontrada');                      //Se espera la respuesta no encontrada
        });

        it('Debería manejar errores del servidor', async () => {
            (Category.findOneAndDelete as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(app)
                .delete(`/categories/${mockCategory.category_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al eliminar la categoría');
        });
    });
});
