import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import User from "../models/user";


//Funcion para validar el role, del usuario
export const authorizaRole = (role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Obtén el nombre de usuario de los parámetros de la query
            const user_id = req.query.userId;

            // Si no se proporciona un nombre de usuario, retorna error
            if (!user_id) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Falta el nombre de usuario' });
            }

            // Busca al usuario en la base de datos
            const user = await User.findOne({ user_id });

            // Si no se encuentra el usuario, retorna error
            if (!user) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Usuario no encontrado' });
            }

            // Verifica si el rol del usuario está permitido
            if (!role.includes(user.role)) {
                return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Permiso denegado' });
            }

            // Si todo es válido, almacena el usuario en `req.user` y continúa
            req.user = user;
            next();
        } catch (error) {
            // Manejo de errores generales
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error interno del servidor', error });
        }
    };
};