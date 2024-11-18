import { Router } from "express";
import path from "path";
import ChatController from "../controller/chat.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

//Ruta register | GET
router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'support_chat.html'))
});

//Ruta register | POST
router.post('/', ChatController.cretateChat);

export default router;