import { Router } from "express";
import path from "path";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

//Ruta Login POST
router.post('/', (req, res) => {
    const { username, password } = req.body;
    res.send(' Interfaz post login')
});

export default router;