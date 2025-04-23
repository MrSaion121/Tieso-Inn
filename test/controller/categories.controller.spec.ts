import { Request, Response } from 'express';
import CategoriesController from '../../src/controller/categories.controller';
import Category from '../../src/models/category';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

jest.mock('../../src/models/category');

describe('CategoriesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: sendMock });
    req = {};
    res = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const fakeCategories = [{ name: 'A' }, { name: 'B' }];
      (Category.find as jest.Mock).mockResolvedValue(fakeCategories);
      await CategoriesController.getAll(req as Request, res as Response);
      expect(Category.find).toHaveBeenCalledWith({});
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
      expect(sendMock).toHaveBeenCalledWith(fakeCategories);
    });

    it('should handle error', async () => {
      (Category.find as jest.Mock).mockRejectedValue(new Error('fail'));
      await CategoriesController.getAll(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SERVER_ERROR);
      expect(sendMock).toHaveBeenCalledWith(expect.stringContaining('Error'));
    });
  });

  describe('getCategoryByID', () => {
    it('should return category by ID', async () => {
      const fakeCategory = { category_id: 'abc', name: 'Test' };
      (Category.findOne as jest.Mock).mockResolvedValue(fakeCategory);
      req.params = { category_id: 'abc' };
      await CategoriesController.getCategoryByID(req as Request, res as Response);
      expect(Category.findOne).toHaveBeenCalledWith({ category_id: 'abc' });
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
      expect(sendMock).toHaveBeenCalledWith(fakeCategory);
    });

    it('should return 404 if category not found', async () => {
      (Category.findOne as jest.Mock).mockResolvedValue(null);
      req.params = { category_id: 'abc' };
      await CategoriesController.getCategoryByID(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      req.body = { category_id: 'c1', name: 'New', num_of_beds: 2, capacity: 4 };
      (Category.findOne as jest.Mock).mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue(req.body);
      (Category as unknown as jest.Mock).mockImplementation((data) => ({
        ...data,
        save: saveMock
      }));
      await CategoriesController.createCategory(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.CREATED);
      expect(sendMock).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });

    it('should return 400 if category exists', async () => {
      (Category.findOne as jest.Mock).mockResolvedValue({ category_id: 'c1' });
      req.body = { category_id: 'c1' };
      await CategoriesController.createCategory(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      req.params = { category_id: 'c1' };
      req.body = { name: 'Updated' };
      (Category.findOneAndUpdate as jest.Mock).mockResolvedValue(req.body);
      await CategoriesController.updateCategory(req as Request, res as Response);
      expect(Category.findOneAndUpdate).toHaveBeenCalledWith({ category_id: 'c1' }, req.body, { new: true });
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
      expect(sendMock).toHaveBeenCalledWith(expect.stringContaining('actualizada'));
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      req.params = { category_id: 'c1' };
      (Category.findOneAndDelete as jest.Mock).mockResolvedValue({ category_id: 'c1' });
      await CategoriesController.deleteCategory(req as Request, res as Response);
      expect(Category.findOneAndDelete).toHaveBeenCalledWith({ category_id: 'c1' });
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
    });

    it('should return 404 if not found', async () => {
      req.params = { category_id: 'c1' };
      (Category.findOneAndDelete as jest.Mock).mockResolvedValue(null);
      await CategoriesController.deleteCategory(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
    });
  });
});
