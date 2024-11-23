import { Router } from "express";
import path from "path";
import UserController from "../controller/users.controller";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.render('login');
});

//Ruta Login POST
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
router.post('/', UserController.login);

export default router;