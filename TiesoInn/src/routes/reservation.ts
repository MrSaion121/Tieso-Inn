import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

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

router.get('/', reservationController.getAllReservations);

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

router.get('/:id', reservationController.getReservationById);

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

router.post('/', reservationController.createReservation);

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

router.put('/:id', reservationController.updateReservation);

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

router.delete('/:id', reservationController.deleteReservation);

export default router;
