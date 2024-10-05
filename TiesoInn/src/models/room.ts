import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
    room_id: string;
    category_id: mongoose.Schema.Types.ObjectId;
    price_per_night: number;
    description: string;
    image_url: string;
    status: string;
}

const roomSchema: Schema = new Schema({
    room_id: { type: String, required: true, unique: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price_per_night: { type: Number, required: true },
    description: { type: String},
    image_url: { type: String },
    status: {type: String, default: 'avaliable'}
});

export default mongoose.model<IRoom>('Room', roomSchema);
