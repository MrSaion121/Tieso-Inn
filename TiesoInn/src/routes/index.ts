import { Router } from 'express';
import categoryRoutes from './categories';
import roomRoutes from './rooms';

const router = Router();

router.get('', (req, res) => {
    res.send('La api funciona!');
})

router.use('/categories', categoryRoutes);
router.use('/rooms', roomRoutes);

export default router;