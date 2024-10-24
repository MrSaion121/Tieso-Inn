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

//Ruta para Obtener todos los usuarios | Permisos [Admin, Gerente]
router.get('/', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.getAllUsers);

/**
 * @swagger
 * /users{email}:
 *  get:
 *      tags: [Users]
 *      description: get one user by email
 *      responses:
 *          200:
 *              description: user
 *          404:
 *              description: user not found
 *          500: 
 *              description: server error
 */

//Ruta para Obtener un usuario por el email | Permisos [ everyone ]
router.get('/:id', authenticateToken, usersController.getUserById);

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

/**
 * @swagger
 * /login:
 *  post:
 *      tags: [Auth]
 *      description: login and obtain jwt token
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses: 
 *          200:
 *              description: token generated succesfully
 *          401:
 *              description: authentication failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          500: 
 *              description: server error
 */


//Ruta para el inicio de sesion | Permisos [ everyone ]
router.post('/login', usersController.login);

export default router;