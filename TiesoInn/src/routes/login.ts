import { Router } from "express";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.send(' Interfaz de login ');
});

//Ruta Login POST
router.post('/', (req, res) => {
    const { username, password } = req.body;
    res.send(' Interfaz post login')
});

export default router;