import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
} from '@eggjs/tegg';
import { AbstractController } from '../AbstractController';
import { topicValidate } from '@/app/common/AjvUtil';
import { filterUser } from '@/app/common/UserUtil';

@HTTPController({
  path: '/api/v2/topic',
})
export class TopicController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/',
  })
  async create(@Context() ctx: EggContext, @HTTPBody() data: any) {
    const { id } = ctx.state.user;
    const valid = topicValidate(data);

    if (!valid) {
      ctx.throw(JSON.stringify(topicValidate.errors), 422);
    }

    const topic = await this.topicService.create({
      ...data,
      author_id: id,
    });

    ctx.body = {
      data: {
        topic: topic.toObject(),
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.PUT,
    path: '/:topicid',
  })
  async update(@Context() ctx: EggContext, @HTTPParam() topicid: string, @HTTPBody() data: any) {
    const { id } = ctx.state.user;
    const valid = topicValidate(data);

    if (!valid) {
      ctx.throw(JSON.stringify(topicValidate.errors), 422);
    }

    const result = await this.topicService.update(topicid, data, {
      author_id: id,
    });

    ctx.body = {
      data: {
        result,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/:topicid',
  })
  async show(@Context() ctx: EggContext, @HTTPParam() topicid: string) {
    const topic = await this.topicService.getById(topicid);

    if (topic.lock) {
      ctx.throw('topic has been locked.', 403);
    }

    if (topic.deleted) {
      ctx.throw('topic has been deleted.', 403);
    }

    const topic_id = topic._id;
    const author_id = topic.author_id;

    const author = await this.userService.getById(author_id, []);

    const replies = await this.replyService.query({
      topic_id,
    });

    const repliesWithAuthor = await Promise.all(replies.map(async reply => {
      const replyAuthor = await this.userService.getById(reply.author_id, []);
      return {
        ...reply.toObject(),
        author: filterUser(replyAuthor),
      };
    }));

    ctx.body = {
      data: {
        topic: topic.toObject(),
        author: filterUser(author),
        replies: repliesWithAuthor,
      },
    };
  }
}
