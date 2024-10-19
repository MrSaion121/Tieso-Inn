import { Router } from "express";
import reservationRoutes from './reservation'
import userRoutes from './user'

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.send('API Raiz funcionando');
});

// /users
router.use('/users', userRoutes);

// /reservation
router.use('/reservation', reservationRoutes);

export default router;