import { Router } from 'express';
import roomsController from '../controller/rooms.controller';

const router = Router();

/**
 * @swagger
 * /rooms:
 *  get:
 *      tags: [Rooms]
 *      description: get all rooms
 *      responses:
 *          200:
 *              description: array of rooms
 *          500:
 *              description: server error
 */

router.get('', roomsController.getAll);

/**
 * @swagger
 * /rooms{room_id}:
 *  get:
 *      tags: [Rooms]
 *      description: get one room by id
 *      responses:
 *          200:
 *              description: room
 *          404:
 *              description: room not found
 *          500: 
 *              description: server error
 */

router.get('/:room_id', roomsController.getRoomByID);

/**
 * @swagger
 * /rooms:
 *  post:
 *      tags: [Rooms]
 *      description: create new room
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Room'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: room created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
 *          500: 
 *              description: server error
 */

router.post('', roomsController.createRoom);

/**
 * @swagger
 * /rooms{room_id}:
 *  put:
 *      tags: [Rooms]
 *      description: update room
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Room'
 *      responses:
 *          200:
 *              description: room updated
 *          404:
 *              description: room not found
 *          500:
 *              description: server error
 */

router.put('/:room_id', roomsController.updateRoom);

/**
 * @swagger
 * /room{room_id}:
 *  delete:
 *      tags: [Rooms]
 *      description: delete room
 *      responses:
 *          200:
 *              description: room deleted
 *          404:
 *              description: room not found
 *          500:
 *              description: server error
 */

router.delete('/:room_id', roomsController.deteleRoom);

export default router;