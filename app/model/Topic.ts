import { Application } from 'egg';
import { Schema, ObjectId } from 'mongoose';
import type { Model } from 'mongoose';

export interface Topic {
  title: string;
  content: string;
  content_is_html: boolean;

  tab: string;
  author_id: ObjectId;
  create_at: Date;
  update_at: Date
  deleted: boolean;

  top: boolean;
  good: boolean;
  lock: boolean;

  reply_count: number;
  visit_count: number;
  collect_count: number;

  last_reply: ObjectId;
  last_reply_at: Date;
}

export interface TopicModel extends Model<Topic> {
}

export default (app: Application) => {
  const TopicSchema = new Schema<Topic, TopicModel>({
    title: { type: String },
    content: { type: String },
    content_is_html: { type: Boolean },

    tab: { type: String },
    author_id: { type: Schema.Types.ObjectId },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },

    top: { type: Boolean, default: false }, // 置顶帖
    good: { type: Boolean, default: false }, // 精华帖
    lock: { type: Boolean, default: false }, // 被锁定主题

    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },

    last_reply: { type: Schema.Types.ObjectId },
    last_reply_at: { type: Date, default: Date.now },
  });

  TopicSchema.index({ create_at: -1 });
  TopicSchema.index({ top: -1, last_reply_at: -1 });
  TopicSchema.index({ author_id: 1, create_at: -1 });

  return app.mongoose.model<Topic, TopicModel>('Topic', TopicSchema);
};
