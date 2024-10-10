import { Request, Response } from 'express';
import Category from '../models/category';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class CategoriesController {

    async getAll(req: Request, res: Response) {
        try {
            const categories = await Category.find({});
            res.status(HTTP_STATUS_CODES.SUCCESS).send(categories);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al conseguir las categorías');
        }
    }

    async getCategoryByID(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const category = await Category.findOne({ category_id });
            if (!category) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Categoría no encontrada');
            }
            res.status(HTTP_STATUS_CODES.SUCCESS).send(category);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al obtener la categoría');
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const { category_id, name, num_of_beds, capacity } = req.body;
            const categoryExists = await Category.findOne({ category_id });
            
            if (categoryExists) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Esta categoria ya existe');
            }

            const newCategory = new Category ({
                category_id,
                name,
                num_of_beds,
                capacity
            });
    
            await newCategory.save();
            res.status(HTTP_STATUS_CODES.CREATED).send(newCategory);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al crear la categoría');
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const updatedCategory = await Category.findOneAndUpdate({ category_id }, req.body, { new: true });
            res.status(HTTP_STATUS_CODES.SUCCESS).send('Categoría ' + updatedCategory + ' actualizada correctamente');
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al actualizar la categoría');
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const deletedCategory = await Category.findOneAndDelete({ category_id });
            if (!deletedCategory) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Categoría no encontrada');
            }
            return res.status(HTTP_STATUS_CODES.SUCCESS).send('Categoría eliminada correctamente');
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al eliminar la categoría');
        }
    }
}

export default new CategoriesController();