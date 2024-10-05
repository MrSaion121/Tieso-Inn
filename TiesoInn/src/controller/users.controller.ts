import { Request, Response } from 'express'
import User from '../models/user'
import { HTTP_STATUS_CODES } from '../types/http-status-codes'
import bcrypt from 'bcryptjs';
import user from '../models/user';

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

    async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params['email']
            const user = await User.findOne({ email });
            res.status(HTTP_STATUS_CODES.SUCCESS).send(user)
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al conseguir el usuario')
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, role, email, password, cellphone, status } = req.body
            const userExists = await User.findOne({ email })
            
            if(userExists){
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Este email ya se esta usando')
            }

            const hashPassword = await bcrypt.hash(password, 11)

            const newUser = new User({
                name,
                role,
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
            const email = req.params['email']
            const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true })
            res.status(HTTP_STATUS_CODES.SUCCESS).send('Usuario actualizado ' + updatedUser);
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al actualizar al usuario')
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const email = req.params['email']
            const deletedUser = await User.findOneAndDelete( { email } )
            if(!deletedUser){
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
            }
            return res.status(HTTP_STATUS_CODES.SUCCESS).send('Usuario eliminado con exito')
        } catch (error) {
            console.error(error)
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error al eliminar al usuario')
        }
    }
}

export default new UsersController()