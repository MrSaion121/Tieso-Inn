// import { Router } from 'express';
// import { googleCallback } from '../controller/authGoogle.controller';
// import passport from 'passport';

// const router = Router();

// // Ruta para iniciar sesión con Google
// router.get(
//     '/login',
//     passport.authenticate('google', {
//         scope: ['profile', 'email'], //Solicita permisos
//     })
// );

// // Ruta de callback de Google
// router.get(
//     '/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     googleCallback
// );

// export default router;
