import { Router } from "express";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.send(' Interfaz de login ');
});

//Ruta register POST
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    res.send('Interfaz register POST');
});

export default router;