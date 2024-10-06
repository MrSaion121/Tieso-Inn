import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

const router = Router();

router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.post('/reservations', reservationController.createReservation);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

export default router;
