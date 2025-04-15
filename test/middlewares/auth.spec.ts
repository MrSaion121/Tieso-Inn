import { NextFunction, Request, Response } from 'express';
import { authenticateToken } from '../../src/middlewares/auth';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken middleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        } as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            redirect: jest.fn().mockReturnThis(),
        } as unknown as Response;
        next = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        req.headers['authorization'] = undefined;
        authenticateToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.UNATHORIZED);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if the token is invalid', () => {
        req.headers['authorization'] = 'Bearer invalidToken';
        (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error(); });
        authenticateToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.UNATHORIZED);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if the token is valid', () => {
        const mockDecodedToken = {
            email: 'user@example.com',
            role: 'admin',
        };
        req.headers['authorization'] = 'Bearer validToken';
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);
        authenticateToken(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual(mockDecodedToken);
    });

    it('should redirect to login if the token is not provided and accept header includes text/html', () => {
        req.headers['authorization'] = undefined;
        req.headers['accept'] = 'text/html';
        authenticateToken(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login');
        expect(next).not.toHaveBeenCalled();
    });

    it('should redirect to login if the token is invalid and accept header includes text/html', () => {
        req.headers['authorization'] = 'Bearer invalidToken';
        req.headers['accept'] = 'text/html';
        (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error(); });
        authenticateToken(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login');
        expect(next).not.toHaveBeenCalled();
    });
});
