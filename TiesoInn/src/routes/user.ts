import { Router } from "express"
import usersController from "../controller/users.controller";

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();
/**
 * @swagger
 * /users:
 *  get:
 *      tags: [Users]
 *      description: get all users
 *      responses:
 *          200:
 *              description: array of users
 *          500:
 *              description: server error
 */

//Ruta para Obtener todos los usuarios | Permisos [Admin]
router.get('/', authenticateToken, authorizaRole(['Admin']), usersController.getAllUsers);

/**
 * @swagger
 * /users{id}:
 *  get:
 *      tags: [Users]
 *      description: get one user by id
 *      responses:
 *          200:
 *              description: user
 *          404:
 *              description: user not found
 *          500: 
 *              description: server error
 */

//Ruta para Obtener un usuario por el id | Permisos [ everyone ]
router.get('/:id', authenticateToken, usersController.getUserById);


router.get('/profile/:id', usersController.getRenderUserById)

/**
 * @swagger
 * /users:
 *  post:
 *      tags: [Users]
 *      description: create new user
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: user created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500: 
 *              description: server error
 */

//Ruta para crear un nuevo usuario | Permisos [Todos]
router.post('/', authenticateToken, usersController.createUser);

/**
 * @swagger
 * /users{email}:
 *  put:
 *      tags: [Users]
 *      description: update user
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user updated
 *          404:
 *              description: user not found
 *          500:
 *              description: server error
 */

//Ruta para actualizar info del usuario | Permisos [Admin, Gerente]
router.put('/:id', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.updateUser);

/**
 * @swagger
 * /users{email}:
 *  delete:
 *      tags: [Users]
 *      description: delete user
 *      responses:
 *          200:
 *              description: user deleted
 *          404:
 *              description: user not found
 *          500:
 *              description: server error
 */

//Ruta para eliminar un usuario | Permisos [Admin]
router.delete('/:id', authenticateToken, authorizaRole(['Admin']), usersController.deleteUser);


export default router;