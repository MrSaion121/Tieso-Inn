import { Router } from 'express';
import categoriesController from '../controller/categories.controller';

const router = Router();

router.get('', categoriesController.getAll);
router.get('/:category_id', categoriesController.getCategoryByID);
router.post('', categoriesController.createCategory);
router.put('/:category_id', categoriesController.updateCategory);
router.delete('/:category_id', categoriesController.deleteCategory);

export default router;