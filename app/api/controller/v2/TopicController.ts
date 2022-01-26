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

import { ObjectId } from 'mongoose';
import { AbstractController } from '../AbstractController';
import { Pagination as PaginationMiddleware } from '../../middleware/Pagination';
import { pickUserField } from '@/app/common/UserUtil';
import { replyValidate, topicValidate } from '@/app/common/AjvUtil';

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
      deleted: false,
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
        author: pickUserField(topicAuthor),
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
    method: HTTPMethodEnum.DELETE,
    path: '/:topicid',
  })
  async delete(@Context() ctx: EggContext, @HTTPParam() topicid: string) {
    const { id, is_admin } = ctx.state.user;

    if (!is_admin) {
      const topic = await this.topicService.getById(topicid);
      if (topic?.author_id.toString() !== id) {
        ctx.throw('no permission', 403);
      }
    }

    const result = await this.topicService.update(topicid, {
      deleted: true,
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
  async read(@Context() ctx: EggContext, @HTTPParam() topicid: string) {
    const topic = await this.topicService.getById(topicid);

    if (topic.lock) {
      ctx.throw('topic has been locked', 403);
    }

    if (topic.deleted) {
      ctx.throw('topic has been deleted', 403);
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
        author: pickUserField(replyAuthor),
      };
    }));

    ctx.body = {
      data: {
        topic: topic.toObject(),
        author: pickUserField(author),
        replies: repliesWithAuthor,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/:topicid/reply',
  })
  async createReply(@Context() ctx: EggContext, @HTTPParam() topicid: string, @HTTPBody() data: any) {
    const { id } = ctx.state.user;

    const valid = replyValidate(data);

    if (!valid) {
      ctx.throw(JSON.stringify(replyValidate.errors), 422);
    }

    const reply = await this.replyService.create({
      ...data,
      author_id: id as unknown as ObjectId,
      topic_id: topicid as unknown as ObjectId,
    });

    ctx.body = {
      data: {
        reply: reply.toObject(),
      },
    };
  }
}
