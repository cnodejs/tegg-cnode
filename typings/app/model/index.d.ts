// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMessage from '../../../app/model/Message';
import ExportReply from '../../../app/model/Reply';
import ExportTopic from '../../../app/model/Topic';
import ExportTopicCollection from '../../../app/model/TopicCollection';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Message: ReturnType<typeof ExportMessage>;
    Reply: ReturnType<typeof ExportReply>;
    Topic: ReturnType<typeof ExportTopic>;
    TopicCollection: ReturnType<typeof ExportTopicCollection>;
    User: ReturnType<typeof ExportUser>;
  }
}
