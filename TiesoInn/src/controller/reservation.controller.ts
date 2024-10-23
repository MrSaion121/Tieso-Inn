import { Request, Response } from "express";
import Reservation from '../models/reservation';
import User from '../models/user';
import Room from '../models/room';
import { HTTP_STATUS_CODES } from '../types/http-status-codes'
import mongoose, { mongo } from "mongoose";


class ReservationController {
    /*
    private reservationCounter: number;

    constructor() {
        //Contador (reservation_num)
        this.reservationCounter = 1;
    }
        */

    //GET | AllReservation
    async getAllReservations(req: Request, res: Response) {
        try {
            const reservations = await Reservation.find().populate('room_id', 'category_id');
            res.status(HTTP_STATUS_CODES.SUCCESS).json(reservations);
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al obtener las reservas', error });
            console.log('Error:', error);
        }
    }

    //GET | ReservationById
    async getReservationById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findOne({ reservation_num: id }).populate('room_id', 'category_id');
        if (!reservation) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Reserva no encontrada' });
        }

        res.status(HTTP_STATUS_CODES.SUCCESS).json(reservation);
    } catch (error) {
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al obtener la reserva', error });
    }
}

    // POST | createReservation
    async createReservation(req: Request, res: Response) {
    const { user_id, room_id, arrival_date, checkout_date, num_of_guest, status } = req.body;

    try {
        console.log("Datos recibidos en el cuerpo:", req.body);

        const userExists = await User.findOne({ user_id });
        const roomObjectId = mongoose.Types.ObjectId.isValid(room_id) ? new mongoose.Types.ObjectId(room_id) : null;
        const roomExists = roomObjectId ? await Room.findById(roomObjectId) : null;

        // validacion si usuario o la habitación no existen = error
        if (!userExists || !roomExists) {
            console.log("Usuario o habitación no válidos");
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Usuario o habitación no válidos' });
        }

        // Buscamos todos los números de reservación y los almacenamos en un array
        const allReservationNumbers = await Reservation.find({}).select('reservation_num').lean();
        const usedReservationNumbers = allReservationNumbers.map(reservation => reservation.reservation_num);

        //Generacion del siguiente numero
        let reservationNumber = 1;
        while (usedReservationNumbers.includes(reservationNumber.toString())) {
            reservationNumber++;
        }

        console.log("Nuevo número de reservación:", reservationNumber);

        // Crea la nueva reservación
        const newReservation = new Reservation({
            reservation_num: reservationNumber.toString(), // Número de reserva auto-incremental
            user_id,
            room_id: roomObjectId,                      // ( _id de la habitacion)
            arrival_date,
            checkout_date,
            num_of_guest,
            status
        });

        console.log("Nueva reservación creada:", newReservation);

        // almacenamos la reservación en la base de datos
        await newReservation.save();
        console.log("Reservación guardada correctamente");
        res.status(HTTP_STATUS_CODES.CREATED).json(newReservation);

    } catch (error) {
        console.error('Error capturado al crear la reserva:', error);
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la reserva' });
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

        res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'Reserva Eliminada Correctamente' });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al eliminar la reserva', error });
    }
}
}

export const reservationController = new ReservationController();