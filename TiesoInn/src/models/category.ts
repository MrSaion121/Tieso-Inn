import { Schema, model, SchemaTypes, Document } from 'mongoose';

interface ICategory extends Document {
    category_id: Schema.Types.ObjectId;
    name: string;
    num_of_beds: number;
    capacity: number;
}

const categorySchema = new Schema<ICategory>({
    category_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: true },
    num_of_beds: { type: Number, required: true },
    capacity: { type: Number, required: true }
});

const category = model('category', categorySchema);
export default category;
