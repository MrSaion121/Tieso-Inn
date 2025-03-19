import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import User from '../models/user';


//Funcion para validar el role, del usuario
export const authorizaRole = (role: string[]) => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Obtén el nombre de usuario de los parámetros de la query
            const user_id = req.query.userId;

            // Si no se proporciona un nombre de usuario, retorna error
            if (!user_id) {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Falta el nombre de usuario' });
                return;
            }

            // Busca al usuario en la base de datos
            const user = await User.findOne({ user_id });

            // Si no se encuentra el usuario, retorna error
            if (!user) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Usuario no encontrado' });
                return;
            }

            // Verifica si el rol del usuario está permitido
            if (!role.includes(user.role)) {
                res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Permiso denegado' });
                return;
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
