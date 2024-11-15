import { Router } from "express";
import path from "path";

const router = Router();

//Ruta raiz
router.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

export default router;