import { Request, Response } from 'express';
import ChatController from '../../src/controller/chat.controller';
import SupportChat from '../../src/models/support_chat';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

jest.mock('../../src/models/support_chat');

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('ChatController', () => {
    let req: Partial<Request>;
    let res: Response;

    beforeEach(() => {
        req = {};
        res = mockResponse();
        jest.clearAllMocks();
    });

    describe('getChats', () => {
        it('should return all chats', async () => {
            (SupportChat.find as jest.Mock).mockResolvedValue([{ _id: 'chat1' }]);
            await ChatController.getChats(req as Request, res);
            expect(SupportChat.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
            expect(res.json).toHaveBeenCalledWith([{ _id: 'chat1' }]);
        });

        it('should handle errors', async () => {
            (SupportChat.find as jest.Mock).mockRejectedValue(new Error('fail'));
            await ChatController.getChats(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener el chat' });
        });
    });

    describe('getChat', () => {
        it('should return specific chat', async () => {
            req.params = { id: 'user123' };
            (SupportChat.findOne as jest.Mock).mockResolvedValue({ _id: 'chat1' });
            await ChatController.getChat(req as Request, res);
            expect(SupportChat.findOne).toHaveBeenCalledWith({ customer_id: 'user123' });
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
            expect(res.json).toHaveBeenCalledWith({ _id: 'chat1' });
        });

        it('should return 404 if chat not found', async () => {
            req.params = { id: 'user123' };
            (SupportChat.findOne as jest.Mock).mockResolvedValue(null);
            await ChatController.getChat(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({ message: 'Chat no encontrado' });
        });
    });

    describe('createChat', () => {
        it('should create new chat if not exists', async () => {
            req.params = { id: 'user123' };
            process.env.HOTEL_HELP_ID = 'admin1';
            (SupportChat.findOne as jest.Mock).mockResolvedValue(null);
            (SupportChat.create as jest.Mock) = jest.fn().mockResolvedValue({ customer_id: 'user123' });
            await ChatController.cretateChat(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.CREATED);
            expect(res.json).toHaveBeenCalledWith({ chatlog: [], customer_id: 'user123', hotel_help_id: 'admin1' });
            expect(SupportChat.create).toHaveBeenCalledWith({ chatlog: [], customer_id: 'user123', hotel_help_id: 'admin1' });
        });

        it('should return 400 if chat exists', async () => {
            req.params = { id: 'user123' };
            (SupportChat.findOne as jest.Mock).mockResolvedValue({});
            await ChatController.cretateChat(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ message: 'El chat ya existe' });
        });
    });

    describe('deleteChat', () => {
        it('should delete existing chat', async () => {
            req.params = { id: 'user123' };
            (SupportChat.findOneAndDelete as jest.Mock).mockResolvedValue({});
            await ChatController.deleteChat(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
            expect(res.json).toHaveBeenCalledWith({ message: 'El chat ha sido eliminado' });
        });

        it('should return 400 if chat not found', async () => {
            req.params = { id: 'user123' };
            (SupportChat.findOneAndDelete as jest.Mock).mockResolvedValue(null);
            await ChatController.deleteChat(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ message: 'Chat no encontrado' });
        });
    });

    describe('addMessage', () => {
        it('should add message to existing chat', async () => {
            req.params = { id: 'user123' };
            req.body = { sender: 'user123', text: 'Hola' };
            const updatedChat = {
                customer_id: 'user123',
                chatlog: [{ sender: 'user123', text: 'Hola', timestamp: expect.any(String) }]
            };
            (SupportChat.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedChat);
            await ChatController.addMessage(req as Request, res);
            expect(SupportChat.findOneAndUpdate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.SUCCESS);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Mensaje añadido correctamente',
                chat: updatedChat
            });
        });

        it('should return 404 if chat not found when adding message', async () => {
            req.params = { id: 'user123' };
            req.body = { sender: 'user123', text: 'Hola' };
            (SupportChat.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
            await ChatController.addMessage(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({ message: 'Chat no encontrado' });
        });
    });
});
