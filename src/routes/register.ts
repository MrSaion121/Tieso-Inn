import { Router } from 'express';
import UserController from '../controller/users.controller';

const router = Router();

//Ruta register | GET
router.get('/', (req, res) => {
    res.render('register');
});

/**
 * @swagger
 * /register:
 *  post:
 *      tags: [Auth]
 *      description: Crea un nuevo usuario.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre del usuario.
 *                              example: 'Juan Pérez'
 *                          email:
 *                              type: string
 *                              description: Correo electrónico del usuario.
 *                              example: 'juan.perez@example.com'
 *                          password:
 *                              type: string
 *                              description: Contraseña del usuario.
 *                              example: 'contraseña123'
 *                          cellphone:
 *                              type: string
 *                              description: Número de celular del usuario.
 *                              example: '5551234567'
 *      responses:
 *          201:
 *              description: Usuario creado con éxito.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Usuario Registrado con exito'
 *          400:
 *              description: Error en la solicitud (correo ya en uso o falta algún campo).
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: 'La contraseña es requerida.'
 *          500:
 *              description: Error interno del servidor.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Error al crear el usuario'
 */
//Ruta register | POST | Crear usuario
router.post('/', UserController.register);

export default router;
