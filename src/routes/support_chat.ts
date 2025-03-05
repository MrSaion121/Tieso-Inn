import { Router } from "express";
import ChatController from "../controller/chat.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get('/:id', (req, res) => {
    res.render('support_chat')
});

/**
 * @swagger
 * /support:
 *  get:
 *      tags: [Support]
 *      description: Get all support chats
 *      responses:
 *          200:
 *              description: chats
 *          500:
 *              description: server error
 */
router.get('', authenticateToken, ChatController.getChats)

/**
 * @swagger
 * /support/chat{id}:
 *  get:
 *      tags: [Support]
 *      description: Get all support chats
 *      responses:
 *          200:
 *              description: chat
 *          404:
 *              description: chat not found
 *          500:
 *              description: server error
 */
router.get('/chat/:id', authenticateToken, ChatController.getChat)

/**
 * @swagger
 * /support{id}:
 *  post:
 *      tags: [Support]
 *      description: Create new support chat
 *      responses:
 *          201:
 *              description: chat created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SupportChat'
 *          401:
 *              description: chat already exists
 *          500:
 *              description: server error
 */
router.post('/:id', authenticateToken, ChatController.cretateChat);

/**
 * @swagger
 * /support{reservation_num}:
 *  delete:
 *      tags: [Support]
 *      description: delete chat
 *      responses:
 *          200:
 *              description: chat deleted
 *          404:
 *              description: chat not found
 *          500:
 *              description: server error
 */

router.delete('/:id', authenticateToken, ChatController.deleteChat);

/**
 * @swagger
 * /support{id}:
 *  put:
 *      tags: [Support]
 *      description: add message to chat
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          sender:
 *                              type: string
 *                              description: the id of the user who sent the message
 *                          text:
 *                              type: string
 *                              description: the message content
 *      responses:
 *          200:
 *              description: message added
 *          404:
 *              description: chat not found
 *          500:
 *              description: server error
 */
router.put('/:id', authenticateToken, ChatController.addMessage)

export default router;