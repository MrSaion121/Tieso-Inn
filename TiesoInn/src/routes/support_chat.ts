import { Router } from "express";
import ChatController from "../controller/chat.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get('/:id', (req, res) => {
    res.render('support_chat')
});

router.get('', authenticateToken, ChatController.getChats)

router.get('/chat/:id', authenticateToken, ChatController.getChat)

router.post('/:id', authenticateToken, ChatController.cretateChat);

router.delete('/:id', authenticateToken, ChatController.deleteChat);

router.put('/:id', authenticateToken, ChatController.addMessage)

export default router;