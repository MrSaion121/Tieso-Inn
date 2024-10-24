import { Request, Response } from 'express'
import User from '../models/user'
import { HTTP_STATUS_CODES } from '../types/http-status-codes'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

class UsersController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find({}, { password: 0 });
            res.status(HTTP_STATUS_CODES.SUCCESS).send(users)
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al conseguir los usuarios')
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user_id = req.params['id'];
            const user = await User.findOne({ user_id }, { password: 0, cellphone: 0 });
            if (!user) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Usuario no encontrado');
            }
            res.status(HTTP_STATUS_CODES.SUCCESS).send(user);
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al conseguir el usuario');
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, role, email, password, cellphone, status } = req.body
            const userExists = await User.findOne({ email })

            if (userExists) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Este email ya se esta usando')
            }

            const user_id = new mongoose.Types.ObjectId()
            const hashPassword = await bcrypt.hash(password, 11)

            const newUser = new User({
                user_id,
                name,
                role,
                email,
                password: hashPassword,
                cellphone,
                status
            })

            await newUser.save();
            res.status(HTTP_STATUS_CODES.CREATED).send(newUser);
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al crear el usuario')
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user_id = req.params['id']
            const updatedUser = await User.findOneAndUpdate({ user_id }, req.body, { new: true })
            res.status(HTTP_STATUS_CODES.SUCCESS).send('Usuario actualizado ' + updatedUser);
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al actualizar al usuario')
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user_id = req.params['id']
            const deletedUser = await User.findOneAndDelete({ user_id })
            if (!deletedUser) {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
            }
            return res.status(HTTP_STATUS_CODES.SUCCESS).send('Usuario eliminado con exito')
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al eliminar al usuario')
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(`El correo no existe`);
            }

            if (user.status === 'Eliminado' || user.status === 'Bloqueado') {
                throw new Error(`El usuario esta bloqueado o eliminado`);
            }

            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                throw new Error('Contraseña incorrecta');
            }

            const token = jwt.sign({ email: email, role: user.role }, process.env.SECRET_KEY!, {
                expiresIn: '1h'
            });
            res.status(HTTP_STATUS_CODES.SUCCESS).send('Token del usuario:' + token);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
                res.status(HTTP_STATUS_CODES.UNATHORIZED).json({ error: error.message });
            } else {
                console.error('Error inesperado', error)
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ error: 'Error inesperado' })
            }
        }
    }

}

export default new UsersController()