import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Obtener todas las reservaciones | Permisos [Recepcionista]
router.get('/', authenticateToken, authorizaRole(['Recepcionista', 'Gerente']), reservationController.getAllReservations);

//Obtener la reservacion por ID | Permisos [Cliente, Recepcionista]
router.get('/:id', authenticateToken, authorizaRole(['Cliente', 'Recepcionista']), reservationController.getReservationById);

//Crear una reservacion | Permisos [Cliente]
router.post('/',  authenticateToken, authorizaRole(['Cliente', 'Recepcionista']),  reservationController.createReservation);

//Actualizar una reservacion | Permisos [Recepcionista]
router.put('/:id',  authenticateToken, authorizaRole(['Cliente','Recepcionista']),  reservationController.updateReservation);

//Eliminar una reservacion | Permisos [Recepcionista]
router.delete('/:id',  authenticateToken, authorizaRole(['Cliente','Recepcionista']), reservationController.deleteReservation);

export default router;
