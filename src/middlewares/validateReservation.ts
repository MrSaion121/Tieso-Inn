import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

export const validateReservation = (req: Request, res: Response, next: NextFunction): void => {
    const { arrival_date, checkout_date, num_of_guest } = req.body;

    if (new Date(arrival_date) > new Date(checkout_date)) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'La fecha de llegada no puede ser posterior a la de salida' });
        return;
    }

    if (num_of_guest <= 0) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'El número de huéspedes debe ser mayor que 0' });
        return;
    }

    next();
};
