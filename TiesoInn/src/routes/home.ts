import { Router } from "express";
import path from "path";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

//Ruta raiz
router.get('/', authenticateToken,(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

export default router;