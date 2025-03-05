import request from 'supertest';
import Room from '../../models/room';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';

//Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();
const SERVER_URL = process.env.SERVER_URL || '';
const PORT = process.env.PORT || 3000;
//url del servidor
const serverUrl = `${SERVER_URL}:${PORT}`;

jest.mock('../../models/room');

describe('Pruebas del endpoint /rooms', () => {
    const mockCategory = {
        _id: '74835bfbd9d05121f51cfd45',
        category_id: '',
        name: 'Estándar',
        num_of_beds: 3,
        capacity: 6,
    };

    const mockRoom = {
        room_id: '652548b7e94f1f12a53f9f3e',
        category_id: mockCategory,
        price_per_night: 100,
        description: 'Habitación estándar',
        image_url: 'https://example.com/room.jpg',
        status: 'Disponible',
    };

    //Limpiar los mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /rooms', () => {
        it('Debería devolver todas las habitaciones', async() => {
            (Room.find as jest.Mock).mockResolvedValue([
                {...mockRoom, category_id: mockCategory}]);

            const response = await request(serverUrl).get('/rooms');

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty('room_id', mockRoom.room_id);
        });

        it('Debería manejar errores del servidor', async() => {
            (Room.find as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(serverUrl).get('/rooms');

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error al conseguir las habitaciones');
        });
    });

    /*
    describe('GET /rooms/:room_id', () => {
        it('Debería devolver una habitación específica', async() => {
            (Room.findOne as jest.Mock).mockResolvedValue(mockRoom);

            const response = await request(serverUrl).get(`/rooms/${mockRoom.room_id}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.body).toHaveProperty('room_id', mockRoom.room_id);
        });

        it('Debería devolver error si la habitación no existe', async() => {
            (Room.findOne as jest.Mock).mockResolvedValue(null);

            const response = await request(serverUrl).get(`/rooms/${mockRoom.room_id}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
            expect(response.text).toBe('Habitación no encontrada');
        });
    });

    describe('POST /rooms', () => {
        it('Debería crear una nueva habitación si el usuario tiene el rol adecuado', async() => {
            (Room.findOne as jest.Mock).mockResolvedValue(null);
            (Room.prototype.save as jest.Mock).mockResolvedValue(mockRoom);

            const response = await request(serverUrl)
                .post('/rooms')
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockRoom);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.CREATED);
            expect(response.body).toHaveProperty('room_id', mockRoom.room_id);
        });

        it('Debería denegar acceso si el usuario no tiene el rol adecuado', async() => {
            const invalidToken = jwt.sign(
                { email: 'user@example.com', role: 'Cliente' },
                process.env.SECRET_KEY!,
                { expiresIn: '1h' }
            );

            const response = await request(serverUrl)
                .post('/rooms')
                .set('Authorization', `Bearer ${invalidToken}`)
                .send(mockRoom);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.FORBIDDEN);
            expect(response.body).toHaveProperty('message', 'Permiso denegado');
        });

        it('Debería manejar errores del servidor', async() => {
            (Room.prototype.save as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(serverUrl)
                .post('/rooms')
                .set('Authorization', `Bearer ${mockToken}`)
                .send(mockRoom);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error creando la habitación');
        });
    });

    describe('PUT /rooms/:room_id', () => {
        it('Debería actualizar una habitación existente', async() => {
            (Room.findOneAndUpdate as jest.Mock).mockResolvedValue(mockRoom);

            const response = await request(serverUrl)
                .put(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ description: 'Nueva descripción' });

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.text).toContain('actualizada correctamente');
        });

        it('Debería devolver error si la habitación no existe', async() => {
            (Room.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

            const response = await request(serverUrl)
                .put(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ description: 'Nueva descripción' });

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
            expect(response.text).toBe('Habitación no encontrada');
        });

        it('Debería manejar errores del servidor', async() => {
            (Room.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(serverUrl)
                .put(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ description: 'Nueva descripción' });

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error actualizando la habitación');
        });
    });

    describe('DELETE /rooms/:room_id', () => {
        it('Debería eliminar una habitación existente', async() => {
            (Room.findOneAndDelete as jest.Mock).mockResolvedValue(mockRoom);

            const response = await request(serverUrl)
                .delete(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SUCCESS);
            expect(response.text).toBe('Habitación eliminada correctamente');
        });

        it('Debería devolver error si la habitación no existe', async() => {
            (Room.findOneAndDelete as jest.Mock).mockResolvedValue(null);

            const response = await request(serverUrl)
                .delete(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
            expect(response.text).toBe('Habitación no encontrada');
        });

        it('Debería manejar errores del servidor', async() => {
            (Room.findOneAndDelete as jest.Mock).mockRejectedValue(new Error('Error del servidor'));

            const response = await request(serverUrl)
                .delete(`/rooms/${mockRoom.room_id}`)
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(response.text).toBe('Error eliminando la habitación');
        });
    });
    */
});
