import { Router } from "express"
import usersController from "../controller/users.controller";

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

router.get('/', usersController.getAllUsers);

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

router.get('/:email', usersController.getUserByEmail);

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

router.post('/', usersController.createUser);

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

router.put('/:email', usersController.updateUser);

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

router.delete('/:email', usersController.deleteUser);

export default router;