import { Schema, model, SchemaTypes, Document } from 'mongoose';
import Category from './category';

interface IRoom extends Document {
    room_id: string;
    category_id: string,
    price_per_night: number;
    description: string;
    image_url: string;
    status: string;
}

const roomSchema = new Schema ({
    room_id: { type: SchemaTypes.String, required: true },
    category_id: { type: SchemaTypes.String, ref: 'Category', required: true },
    price_per_night: { type: SchemaTypes.Number, required: true }, 
    description: { type: SchemaTypes.String, required: true },
    image_url: { type: SchemaTypes.String, required: true},
    status: { type: SchemaTypes.String, enum: ['occupied', 'available'], default: 'available'}
})

const room = model('room', roomSchema);
export default room;