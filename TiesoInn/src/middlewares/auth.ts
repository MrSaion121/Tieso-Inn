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

//Funcion para validar el token del usuario
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Intentar Obtener el token desde el header de autorizacion
    const token = req.headers['authorization']?.split(' ')[1];

    //Verifica si no se proporciono el token
    if (!token) {
        return res.status(HTTP_STATUS_CODES.UNATHORIZED).json({ message: 'Token no proporcionado' });
    }

    try {
        //Verifica y decodifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as AuthUserPayload;

        // Guardamos la info del usuario en req.user
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(HTTP_STATUS_CODES.UNATHORIZED).json({ message: 'Token inválido' });
    }
};