import { Router } from 'express';
import categoriesController from '../controller/categories.controller';

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Obtener todas las categorias | Permisos [Todos]
router.get('', authenticateToken, categoriesController.getAll);

//Obtener las categorias por ID | Permisos [Todos]
router.get('/:category_id', authenticateToken,  categoriesController.getCategoryByID);

//Crear nueva categoria | Permisos [Admin]
router.post('', authenticateToken, authorizaRole(['Admin']), categoriesController.createCategory);

//Actualizar categoria | Permisos [Admin]
router.put('/:category_id', authenticateToken, authorizaRole(['Admin']), categoriesController.updateCategory);

//Eliminar categoria | permiso [Admin]
router.delete('/:category_id', authenticateToken, authorizaRole(['Admin']), categoriesController.deleteCategory);

export default router;