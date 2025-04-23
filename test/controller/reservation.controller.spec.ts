import { reservationController } from '../../src/controller/reservation.controller';
import User from '../../src/models/user';
import Room from '../../src/models/room';
import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import reservation from '../../src/models/reservation';

jest.mock('../../src/models/reservation');
jest.mock('../../src/models/user');
jest.mock('../../src/models/room');

describe('ReservationController - createReservation', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        user_id: 'user123',
        room_id: 'room456',
        arrival_date: '2025-04-20',
        checkout_date: '2025-04-22',
        num_of_guest: 2,
        status: 'pending'
      }
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock
    };
  });

  it('should throw error if user not exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    await reservationController.createReservation(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuario no válido' });
  });

  it('should throw error if room not exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ user_id: 'user123' });
    (Room.findOne as jest.Mock).mockResolvedValue(null);
    await reservationController.createReservation(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Habitación no válida' });
  });

  it('should catch error and return status code 500', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await reservationController.createReservation(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Error al crear la reserva' });
  });
});

describe('ReservationController - getAllReservations', () => {
  it('should return reservations with status 200', async () => {
    const req = {
      body: {
        user_id: 'user123',
        room_id: 'room456',
        arrival_date: '2025-04-20',
        checkout_date: '2025-04-22',
        num_of_guest: 2,
        status: 'pending'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const mockReservations = [
      {
        user: { user_id: 'user1', name: 'John Doe' },
        room: { room_id: 'room1', name: 'Room A' },
      },
      {
        user: { user_id: 'user2', name: 'Jane Smith' },
        room: { room_id: 'room2', name: 'Room B' },
      },
    ];
    (reservation.aggregate as jest.Mock).mockResolvedValue(mockReservations);
    await reservationController.getAllReservations(req as unknown as Request, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
    expect(res.json).toHaveBeenCalledWith(mockReservations);
  });
});
