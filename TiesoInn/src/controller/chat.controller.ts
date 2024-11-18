import { Request, Response } from 'express';
import SupportChat from '../models/support_chat';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class ChatController {
    async getChat(req: Request, res: Response) {
        try {
            const chat_id = req.params['id']
            const chat = await SupportChat.findOne({ customer_id: chat_id })
            if(!chat) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({message: 'Chat no encontrado'})
            }
            res.status(HTTP_STATUS_CODES.SUCCESS).json(chat)
        } catch(error){
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({message: 'Error al obtener el chat'})
        }
    }

    async cretateChat(req: Request, res: Response) {
        const {customer_id, hotel_help_id} = req.body
        try {
            const chatExits = await SupportChat.findOne({ customer_id });
            if (chatExits) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'El chat ya existe' })
            }

            const newChat = new SupportChat({
                customer_id,
                hotel_help_id,
                chatlog: []
            })

            await newChat.save();

            res.status(HTTP_STATUS_CODES.CREATED).json(newChat)
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({message: 'Error al crear el chat'})
        }
    }

    async deleteChat(req: Request, res: Response) {
        const customer_id = req.params['id'];
        try {
            const deletedChat = await SupportChat.findOneAndDelete({ customer_id })
            if(!deletedChat) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'Chat no encontrado'})
            }
            return res.status(HTTP_STATUS_CODES.SUCCESS).json({message: 'El chat ha sido eliminado'})
        } catch (error) {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({message: 'Error al eliminar el chat'})
        }
    }

    async addMessage(req: Request, res: Response){
        const customer_id = req.params['id'];
        try {
            
        } catch (error) {
            
        }
    }
}

const supportChat = new ChatController();
export default supportChat; 