import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

const router = Router();

router.get('/reservations', reservationController.getAllReservations.bind(reservationController));
router.get('/reservations/:id', reservationController.getReservationById.bind(reservationController));
router.post('/reservations', reservationController.createReservation.bind(reservationController));
router.put('/reservations/:id', reservationController.updateReservation.bind(reservationController));
router.delete('/reservations/:id', reservationController.deleteReservation.bind(reservationController));

export default router;
