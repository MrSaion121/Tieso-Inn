import mongoose, { Schema, model, SchemaTypes, Document } from 'mongoose';

interface IRoom extends Document {
    room_id: Schema.Types.ObjectId;
    category_id: Schema.Types.ObjectId;
    price_per_night: number;
    description: string;
    image_url: string;
    status: string;
}

const roomSchema = new Schema ({
    room_id: { type: Schema.Types.ObjectId, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    price_per_night: { type: Number, required: true }, 
    description: { type: String, required: true },
    image_url: { type: String, required: true},
    status: { type: String, enum: ['Ocupado', 'Disponible'], default: 'Disponible'}
})

const room = model('room', roomSchema);
export default room;