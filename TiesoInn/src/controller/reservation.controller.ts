import { Request, Response } from "express";
import Reservation from '../models/reservation';
import User from '../models/user';
import Room from '../models/room';
import { HTTP_STATUS_CODES } from '../types/http-status-codes'


class ReservationController {
    private reservationCounter: number;

    constructor() {
        //Contador (reservation_num)
        this.reservationCounter = 1;
    }

    //GET | AllReservation
    async getAllReservations(req: Request, res: Response) {
        try {
            const reservations = await Reservation.find();
            res.status(HTTP_STATUS_CODES.SUCCESS).json(reservations);
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al obtener las reservas', error });
        }
    }

    //GET | ReservationById
    async getReservationById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const reservation = await Reservation.findOne({ reservation_num: id });
            if (!reservation) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Reserva no encontrada' });
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json(reservation);
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al obtener la reserva', error });
        }
    }

    //POST | createReservation
    async createReservation(req: Request, res: Response) {
        const { user_id, room_id, arrival_date, checkout_date, num_of_guest, status } = req.body;

        try {
            const userExists = await User.findById(user_id);
            const roomExists = await Room.findById(room_id);

            if (!userExists || !roomExists) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Usuario o habitacion no validos' });
            }

            const newReservation = new Reservation({
                reservation_num: this.reservationCounter++,
                user_id,
                room_id,
                arrival_date,
                checkout_date,
                num_of_guest,
                status
            });

            await newReservation.save();
            res.status(HTTP_STATUS_CODES.CREATED).json(newReservation);
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la reserva', error });
        }
    }


    //POST | UpdateReservation
    async updateReservation(req: Request, res: Response) {
        const { id } = req.params;
        const { user_id, room_id, arrival_date, checkout_date, num_of_guest, status } = req.body;

        try {
            const updatedReservation = await Reservation.findOneAndUpdate(
                { reservation_num: id },
                { user_id, room_id, arrival_date, checkout_date, num_of_guest, status },
                { new: true }
            );

            if (!updatedReservation) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Reserva no encontrada' });
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedReservation);

        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al actualizar la reservacion', error });
        }
    }

    //DELETE
    async deleteReservation(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const deletedReservation = await Reservation.findOneAndDelete({ reservation_num: id });

            if (!deletedReservation) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Reserva no encontrada' });
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'Reserva Eliminada Correctamente'});
        } catch(error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al eliminar la reserva', error });
        }
    }
}

export const reservationController = new ReservationController();