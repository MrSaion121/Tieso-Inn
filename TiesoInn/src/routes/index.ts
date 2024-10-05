import { Router } from "express";
import userRoutes from './user'

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.send('API Raiz funcionando');
});

// /users
router.use('/users', userRoutes);

export default router;