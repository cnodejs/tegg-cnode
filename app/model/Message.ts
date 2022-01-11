import { Application } from 'egg';
import { Schema } from 'mongoose';
import type { Model } from 'mongoose';

export interface Message {
  type: string;

  master_id: string;
  author_id: string;
  topic_id: string;
  reply_id: string;

  has_read: boolean;
  create_at: Date;
}

export interface MessageModel extends Model<Message> {
}

export default (app: Application) => {
  const MessageSchema = new Schema<Message, MessageModel>({
    type: { type: String },
    master_id: { type: Schema.Types.ObjectId },
    author_id: { type: Schema.Types.ObjectId },
    topic_id: { type: Schema.Types.ObjectId },
    reply_id: { type: Schema.Types.ObjectId },
    has_read: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
  });

  MessageSchema.index({ master_id: 1, has_read: -1, create_at: -1 });

  return app.mongoose.model<Message, MessageModel>('Message', MessageSchema);
};
