import mongoose, { Schema, Document } from 'mongoose';

//Model/Interfaz para Usuarios
export interface IUser extends Document {
    user_id: string;
    name: string;
    is_admin: boolean;
    email: string;
    password: string;
    cellphone: string;
    status: string;
}

//Schema de Usuario
const userSchema: Schema = new Schema({
    user_id: {type : String, required: true, unique: true},
    name: {type: String, required: true},
    is_admin: {type: Boolean, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cellphone: {type: String, required: true},
    status: {type: String, default:'active'}
});

export default mongoose.model<IUser>('User', userSchema);