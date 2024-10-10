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
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error getting categories')
        }
    }

    async getCategoryByID(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const category = await Category.findOne({ category_id });
            if (!category) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Category not found');
            }
            res.status(HTTP_STATUS_CODES.SUCCESS).send(category);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error getting category');
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const { category_id, name, num_of_beds, capacity } = req.body;
            const categoryExists = await Category.findOne({ category_id });
            
            if (categoryExists) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Category already exists');
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
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error creating category');
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const updatedCategory = await Category.findOneAndUpdate({ category_id }, req.body, { new: true });
            res.status(HTTP_STATUS_CODES.SUCCESS).send('Category ' + updatedCategory + ' updated');
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error updating category');
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const category_id = req.params['category_id'];
            const deletedCategory = await Category.findOneAndDelete({ category_id });
            if (!deletedCategory) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Category not found');
            }
            return res.status(HTTP_STATUS_CODES.SUCCESS).send('Category deleted succesfully');
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error deleting category');
        }
    }
}

export default new CategoriesController();