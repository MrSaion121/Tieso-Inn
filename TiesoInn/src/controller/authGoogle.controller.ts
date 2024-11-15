import { Request, Response, NextFunction } from 'express';

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        // Si no hay usuario, redirige al login
        return res.redirect('/login');
    }

    // Si el usuario está autenticado, redirige a home
    res.redirect('/home');
};
