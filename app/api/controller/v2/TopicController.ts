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
    ctx.body = {
      data: {
        topic: topic.toObject(),
      },
    };
  }
}
