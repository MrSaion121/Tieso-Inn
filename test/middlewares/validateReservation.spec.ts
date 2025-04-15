import { Request, Response, NextFunction } from 'express';
import { validateReservation } from '../../src/middlewares/validateReservation';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

describe('validateReservation middleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it('should return 400 if arrival_date is after checkout_date', () => {
        mockReq = {
            body: {
                arrival_date: '2025-04-20',
                checkout_date: '2025-04-18',
                num_of_guest: 2,
            },
        };
        validateReservation(mockReq as Request, mockRes as Response, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'La fecha de llegada no puede ser posterior a la de salida',
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 if number of guests is 0 or less', () => {
        mockReq = {
            body: {
                arrival_date: '2025-04-18',
                checkout_date: '2025-04-20',
                num_of_guest: 0,
            },
        };
        validateReservation(mockReq as Request, mockRes as Response, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'El número de huéspedes debe ser mayor que 0',
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next() when data is valid', () => {
        mockReq = {
            body: {
                arrival_date: '2025-04-18',
                checkout_date: '2025-04-20',
                num_of_guest: 3,
            },
        };
        validateReservation(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });
});
