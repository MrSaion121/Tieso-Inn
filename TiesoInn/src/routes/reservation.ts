import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

/**
 * @swagger
 * /reservations:
 *  get:
 *      tags: [Reservations]
 *      description: get all reservations
 *      responses:
 *          200:
 *              description: array of reservations
 *          500:
 *              description: server error
 */

//Obtener todas las reservaciones | Permisos [Recepcionista]
router.get('/', authenticateToken, authorizaRole(['Recepcionista', 'Gerente']), reservationController.getAllReservations);

/**
 * @swagger
 * /reservations{reservation_num}:
 *  get:
 *      tags: [Reservations]
 *      description: get one reservation by Id
 *      responses:
 *          200:
 *              description: reservation
 *          404:
 *              description: reservation not found
 *          500: 
 *              description: server error
 */

//Obtener la reservacion por ID | Permisos [Cliente, Recepcionista]
router.get('/:id', authenticateToken, authorizaRole(['Cliente', 'Recepcionista']), reservationController.getReservationById);

/**
 * @swagger
 * /reservations:
 *  post:
 *      tags: [Reservations]
 *      description: create new reservation
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reservation'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: reservation created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reservation'
 *          500: 
 *              description: server error
 */

//Crear una reservacion | Permisos [Cliente]
router.post('/',  authenticateToken, authorizaRole(['Cliente', 'Recepcionista']),  reservationController.createReservation);

/**
 * @swagger
 * /reservations{reservation_num}:
 *  put:
 *      tags: [Reservations]
 *      description: update reservation
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reservation'
 *      responses:
 *          200:
 *              description: reservation updated
 *          404:
 *              description: reservation not found
 *          500:
 *              description: server error
 */

//Actualizar una reservacion | Permisos [Recepcionista]
router.put('/:id',  authenticateToken, authorizaRole(['Cliente','Recepcionista']),  reservationController.updateReservation);

/**
 * @swagger
 * /reservations{reservation_num}:
 *  delete:
 *      tags: [Reservations]
 *      description: delete reservation
 *      responses:
 *          200:
 *              description: reservation deleted
 *          404:
 *              description: reservation not found
 *          500:
 *              description: server error
 */

//Eliminar una reservacion | Permisos [Recepcionista]
router.delete('/:id',  authenticateToken, authorizaRole(['Cliente','Recepcionista']), reservationController.deleteReservation);

export default router;
