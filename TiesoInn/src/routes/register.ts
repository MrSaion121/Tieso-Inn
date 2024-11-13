import { Router } from "express";
import path from "path";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'))
});

//Ruta register POST
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    res.send('Interfaz register POST');
});

export default router;