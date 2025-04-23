import { Request, Response, NextFunction } from 'express';
import { authorizaRole } from '../../src/middlewares/permissions';
import User from '../../src/models/user';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

jest.mock('../../src/models/user');
const mockUserModel = User as jest.Mocked<typeof User>;

describe('authorizaRole middleware', () => {
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const mockNext: NextFunction = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if userId is missing', async () => {
        const mockReq = {
            query: {},
        } as unknown as Request;
        const middleware = authorizaRole(['Admin']);
        await middleware(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Falta el nombre de usuario' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 404 if user not found', async () => {
        const mockReq = {
            query: { userId: '123' },
        } as unknown as Request;
        mockUserModel.findOne.mockResolvedValue(null);
        const middleware = authorizaRole(['Admin']);
        await middleware(mockReq, mockRes, mockNext);
        expect(mockUserModel.findOne).toHaveBeenCalledWith({ user_id: '123' });
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 403 if role is not authorized', async () => {
        const mockReq = {
            query: { userId: '123' },
        } as unknown as Request;
        const fakeUser = { role: 'Cliente' };
        mockUserModel.findOne.mockResolvedValue(fakeUser);
        const middleware = authorizaRole(['Admin']);
        await middleware(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.FORBIDDEN);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Permiso denegado' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next() if user is authorized', async () => {
        const mockReq = {
            query: { userId: '123' },
        } as unknown as Request;
        const fakeUser = { role: 'Admin' };
        mockUserModel.findOne.mockResolvedValue(fakeUser);
        const middleware = authorizaRole(['Admin', 'Gerente']);
        await middleware(mockReq, mockRes, mockNext);
        expect(mockReq.user).toEqual(fakeUser);
        expect(mockNext).toHaveBeenCalled();
    });

    it('should return 500 on internal error', async () => {
        const mockReq = {
            query: { userId: '123' },
        } as unknown as Request;
        mockUserModel.findOne.mockRejectedValue(new Error('DB error'));
        const middleware = authorizaRole(['Admin']);
        await middleware(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SERVER_ERROR);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error interno del servidor',
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });
});
