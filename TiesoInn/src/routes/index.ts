import { Router } from "express";
import reservationRoutes from './reservation'
import userRoutes from './user'
import categoryRoutes from './categories';
import roomRoutes from './rooms';

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.send('API Raiz funcionando');
});

// /users
router.use('/users', userRoutes);

//reservations
router.use('/reservations', reservationRoutes);

//categories
router.use('/categories', categoryRoutes);

//rooms
router.use('/rooms', roomRoutes);

export default router;