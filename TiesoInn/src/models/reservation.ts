import mongoose, { Schema, Document } from 'mongoose';

//Model/Interfaz para reservaciones
export interface IReservation extends Document {
    reservation_num: string;
    user_id: mongoose.Schema.Types.ObjectId;
    room_id: mongoose.Schema.Types.ObjectId;
    arrival_date: Date;
    checkout_date: Date;
    num_of_guest: number;
    status: string;
}

//Schema de reservaciones
const reservationSchema: Schema = new Schema({
    reservation_num: { type: String, required: true, unique: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    room_id: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    arrival_date: { type: Date, required: true },
    checkout_date: { type: Date, required: true },
    num_of_guest: { type: Number, required: true },
    status: { type: String, enum:  ['Pagado', 'Pendiente', 'Cancelado', 'Confirmado'], default: 'Pendiente' }
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);