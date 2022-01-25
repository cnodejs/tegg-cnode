import {
  Context,
  EggContext,
  Middleware,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  HTTPQuery,
} from '@eggjs/tegg';

import { AbstractController } from '../AbstractController';
import { Pagination as PaginationMiddleware } from '../../middleware/Pagination';
import { filterUser } from '@/app/common/UserUtil';
import { topicValidate } from '@/app/common/AjvUtil';

@HTTPController({
  path: '/api/v2/topic',
})
export class TopicController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  @Middleware(PaginationMiddleware)
  async index(@Context() ctx: EggContext, @HTTPQuery() tab: string) {
    const query: any = {
      tab,
    };

    if (!tab || tab === 'all') {
      query.tab = { $nin: [ 'job', 'dev' ] };
    }

    if (tab === 'good') {
      query.good = true;
    }

    const { page, limit } = ctx.pagination;

    const options = {
      limit,
      skip: page * limit,
      sort: '-top -last_reply_at',
    };

    const topics = await this.topicService.query(
      query,
      null,
      options,
    );

    const topicsWithAuthor = await Promise.all(topics.map(async topic => {
      const topicAuthor = await this.userService.getById(topic.author_id, []);
      return {
        topic: topic.toObject(),
        author: filterUser(topicAuthor),
      };
    }));

    ctx.body = {
      data: {
        topics: topicsWithAuthor,
        pagination: ctx.pagination,
      },
    };
  }

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
