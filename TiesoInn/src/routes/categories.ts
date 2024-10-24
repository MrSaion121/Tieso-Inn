import { Router } from 'express';
import categoriesController from '../controller/categories.controller';

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

/**
 * @swagger
 * /categories:
 *  get:
 *      tags: [Categories]
 *      description: get all categories
 *      responses:
 *          200: 
 *              description: array of categories
 *          500:
 *              description: server error
 */

//Obtener todas las categorias | Permisos [Todos]
router.get('', authenticateToken, categoriesController.getAll);

/**
 * @swagger
 * /categories{category_id}:
 *  get:
 *      tags: [Categories]
 *      description: get one category by id
 *      responses:
 *          200:
 *              description: category
 *          404:
 *              description: category not found
 *          500: 
 *              description: server error
 */

//Obtener las categorias por ID | Permisos [Todos]
router.get('/:category_id', authenticateToken,  categoriesController.getCategoryByID);

/**
 * @swagger
 * /categories:
 *  post:
 *      tags: [Categories]
 *      description: create new category
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: category created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          500: 
 *              description: server error
 */

//Crear nueva categoria | Permisos [Admin]
router.post('', authenticateToken, authorizaRole(['Admin']), categoriesController.createCategory);

/**
 * @swagger
 * /categories{category_id}:
 *  put:
 *      tags: [Categories]
 *      description: update category
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              description: category updated
 *          404:
 *              description: category not found
 *          500:
 *              description: server error
 */

//Actualizar categoria | Permisos [Admin]
router.put('/:category_id', authenticateToken, authorizaRole(['Admin']), categoriesController.updateCategory);

/**
 * @swagger
 * /categories{category_id}:
 *  delete:
 *      tags: [Categories]
 *      description: delete category
 *      responses:
 *          200:
 *              description: category deleted
 *          404:
 *              description: category not found
 *          500:
 *              description: server error
 */

//Eliminar categoria | permiso [Admin]
router.delete('/:category_id', authenticateToken, authorizaRole(['Admin']), categoriesController.deleteCategory);

export default router;