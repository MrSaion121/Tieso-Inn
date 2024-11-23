import { Schema, model, SchemaTypes, Document } from 'mongoose';

interface IMessage {
  sender: Schema.Types.ObjectId;
  text: string;
  timestamp: Date;
}

interface IChat extends Document {
  customer_id: Schema.Types.ObjectId;
  hotel_help_id: Schema.Types.ObjectId;
  chatlog: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  text: { type: SchemaTypes.String, required: true },
  timestamp: { type: SchemaTypes.Date, default: Date.now}
});

const chatSchema = new Schema<IChat>({
  customer_id: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  hotel_help_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  chatlog: { type: [messageSchema], default: [] },
});

const Chat = model<IChat>('Chat', chatSchema);
export default Chat;
