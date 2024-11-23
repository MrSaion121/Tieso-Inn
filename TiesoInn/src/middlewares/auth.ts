import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

// Definir la carga util del usuario en el token
export interface AuthUserPayload extends JwtPayload {
    email: string;
    role: string;
}

// Extiende la interfaz Request
declare global {
    namespace Express {
        interface Request {
            user?: AuthUserPayload; // Añade la propiedad user
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        if (req.headers['accept']?.includes('text/html')) {
            console.log('Token no existe')
            return res.redirect('/login');
        }
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as AuthUserPayload;
        req.user = decoded;
        next();
    } catch (error) {
        console.log('ERROR DE TOKEN')
        if (req.headers['accept']?.includes('text/html')) {
            return res.redirect('/login');
        }
        res.status(401).json({ message: 'Token inválido' });
    }
};