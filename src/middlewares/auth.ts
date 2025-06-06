import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

// Definir la carga util del usuario en el token
export interface AuthUserPayload extends JwtPayload {
    email: string;
    role: string;
}

// Extiende la interfaz Request directamente
declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUserPayload; // Añade la propiedad user
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        if (req.headers['accept']?.includes('text/html')) {
            res.redirect('/login');
            return;
        }
        res.status(HTTP_STATUS_CODES.UNATHORIZED).json({ message: 'Token no proporcionado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as AuthUserPayload;
        req.user = decoded;
        next();
    } catch {
        if (req.headers['accept']?.includes('text/html')) {
            res.redirect('/login');
            return;
        }
        res.status(HTTP_STATUS_CODES.UNATHORIZED).json({ message: 'Token inválido' });
    }
};
