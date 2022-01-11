import { Application } from 'egg';
import { Schema, ObjectId } from 'mongoose';
import type { Model } from 'mongoose';

export interface Reply {
  content: string;
  content_is_html: boolean;
  create_at: Date;
  update_at: Date;
  deleted: boolean;

  topic_id: ObjectId;
  author_id: ObjectId;
  reply_id: ObjectId;

  ups: ObjectId[];
}

export interface ReplyModel extends Model<Reply> {}

export default (app: Application) => {
  const ReplySchema = new Schema<Reply, ReplyModel>(
    {
      content: { type: String },
      topic_id: { type: Schema.Types.ObjectId },
      author_id: { type: Schema.Types.ObjectId },
      reply_id: { type: Schema.Types.ObjectId },
      create_at: { type: Date, default: Date.now },
      update_at: { type: Date, default: Date.now },
      content_is_html: { type: Boolean },
      ups: [Schema.Types.ObjectId],
      deleted: { type: Boolean, default: false },
    },
    {
      usePushEach: true,
    },
  );

  ReplySchema.index({ topic_id: 1 });
  ReplySchema.index({ author_id: 1, create_at: -1 });

  return app.mongoose.model<Reply, ReplyModel>('Reply', ReplySchema);
};
