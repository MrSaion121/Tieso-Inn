import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    category_id: string;
    name: string;
    num_of_beds: number;
    capacity: number;
}

const categorySchema: Schema = new Schema({
    category_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    num_of_beds: { type: Number, required: true },
    capacity: { type: Number, required: true }
});

export default mongoose.model<ICategory>('Category', categorySchema);
