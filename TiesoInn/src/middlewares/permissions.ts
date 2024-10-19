import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

//Funcion para validar el role, del usuario
export const authorizaRole = (role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //Obtiene el rol de usuario desde Req.user
        const userRole = req.user?.role;

        //Verificar si el rol del usuario es valido
        if (!userRole || !role.includes(userRole)) {
            return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: "Permiso denegado" });
        }

        //Si el rol del usuario es valido, continua
        next();
    };
};