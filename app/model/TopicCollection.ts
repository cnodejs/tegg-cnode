import { Application } from 'egg';
import { Schema } from 'mongoose';
import type { Model } from 'mongoose';

export interface TopicCollect {
  user_id: string;
  topic_id: string;
  create_at: Date;
}

export interface TopicCollectModel extends Model<TopicCollect> {
}

export default (app: Application) => {
  const TopicCollectSchema = new Schema<TopicCollect, TopicCollectModel>({
    user_id: { type: Schema.Types.ObjectId },
    topic_id: { type: Schema.Types.ObjectId },
    create_at: { type: Date, default: Date.now },
  });

  TopicCollectSchema.index({ user_id: 1, topic_id: 1 }, { unique: true });

  return app.mongoose.model<TopicCollect, TopicCollectModel>('TopicCollect', TopicCollectSchema);
};
