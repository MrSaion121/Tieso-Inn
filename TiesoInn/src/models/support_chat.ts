import { Schema, model, SchemaTypes, Document } from 'mongoose';

interface IMessage {
  sender: Schema.Types.ObjectId;
  text: string;
}

interface IChat extends Document {
  customer_id: Schema.Types.ObjectId;
  hotel_help_id: Schema.Types.ObjectId;
  chatlog: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: SchemaTypes.String, required: true },
});

const chatSchema = new Schema<IChat>({
  customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  hotel_help_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatlog: { type: [messageSchema], default: [] },
});

const Chat = model<IChat>('Chat', chatSchema);
export default Chat;
