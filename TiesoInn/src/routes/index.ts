import { Router } from "express";
import reservationRoutes from './reservation'
import userRoutes from './user'
import categoryRoutes from './categories';
import roomRoutes from './rooms';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          requires:
 *              - name
 *              - role
 *              - email
 *              - password
 *              - cellphone
 *              - status
 *          properties:
 *              name:
 *                  type: string
 *              role:
 *                  type: string
 *                  enum:
 *                      - Cliente
 *                      - Recepcionista
 *                      - Gerente
 *                      - Admin
 *                  default: Cliente
 *              email:
 *                  type: string
 *                  uniqueItems: true
 *              password:
 *                  type: string
 *              cellphone:
 *                  type: string
 *              status:
 *                  type: string
 *                  enum:
 *                      - Activo
 *                      - Eliminado
 *                      - Bloqueado
 *                  default: Activo
 *      Category:
 *          requires:
 *              - category_id
 *              - name
 *              - num_of_beds
 *              - capacity
 *          properties:
 *              category_id:
 *                  type: string
 *                  format: objectId
 *                  uniqueItems: true
 *              name:
 *                  type: string
 *              num_of_beds:
 *                  type: number
 *              capacity:
 *                  type: number 
 *      Room:
 *          requires:
 *              - room_id
 *              - category_id
 *              - price_per_night
 *              - description
 *              - image_url
 *              - status
 *          properties:
 *              room_id:
 *                  type: string
 *                  format: objectId
 *                  uniqueItems: true
 *              category_id:
 *                  type: string
 *                  format: objectId
 *              price_per_night:
 *                  type: number
 *              description:
 *                  type: string
 *              image_url:
 *                  type: string
 *              status:
 *                  type: string
 *                  enum:
 *                      - Ocupado
 *                      - Disponible
 *      Reservation:
 *          requires:
 *              - reservation_num
 *              - email
 *              - room_id
 *              - arrival_date
 *              - checkout_date
 *              - num_of_guest
 *              - status
 *          properties:
 *              reservation_num:
 *                  type: string
 *                  format: objectId
 *                  uniqueItems: true
 *              email:
 *                  type: string
 *              room_id:
 *                  type: string
 *                  format: objectId
 *              arrival_date:
 *                  type: date
 *              checkout_date:
 *                  type: date
 *              num_of_guest:
 *                  type: number
 *              status:
 *                  type: string
 *                  enum:
 *                      - Pagado
 *                      - Pendiente
 *                      - Cancelado
 *                      - Confirmado
 * 
 */

//Ruta raiz
router.get('/', (req, res) => {
    res.send('API Raiz funcionando');
});

/**
 * @swagger
 * /:
 *  get:
 *      tags: [Default]
 *      description: api home endpoint
 *      responses:
 *          200:
 *              description: api success
 */

// /users
router.use('/users', userRoutes);

// /reservations
router.use('/reservations', reservationRoutes);

// /categories

//categories
router.use('/categories', categoryRoutes);

//rooms
router.use('/rooms', roomRoutes);

export default router;