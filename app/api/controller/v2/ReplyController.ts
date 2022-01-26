import { replyValidate } from '@/app/common/AjvUtil';
import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
} from '@eggjs/tegg';

import { ObjectId } from 'mongoose';
import { AbstractController } from '../AbstractController';

@HTTPController({
  path: '/api/v2/reply',
})
export class ReplyController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.PUT,
    path: '/:replyid',
  })
  async update(@Context() ctx: EggContext, @HTTPParam() replyid: string, @HTTPBody() data: any) {
    const { id } = ctx.state.user;

    const valid = replyValidate(data);

    if (!valid) {
      ctx.throw(JSON.stringify(replyValidate.errors), 422);
    }

    const result = await this.replyService.update(replyid, data, {
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
    path: '/:replyid',
  })
  async delete(@Context() ctx: EggContext, @HTTPParam() replyid: string) {
    const { id, is_admin } = ctx.state.user;

    if (!is_admin) {
      const reply = await this.replyService.getById(replyid);
      if (reply?.author_id.toString() !== id) {
        ctx.throw('no permission', 403);
      }
    }

    const result = await this.replyService.update(replyid, {
      deleted: true,
    });

    ctx.body = {
      data: {
        result,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.PUT,
    path: '/:replyid/ups',
  })
  async ups(@Context() ctx: EggContext, @HTTPParam() replyid: string) {
    const { id } = ctx.state.user;
    const reply = await this.replyService.getById(replyid);
    const ups: ObjectId[] = reply.ups;
    const index = ups.findIndex(upId => upId.toString() === id);
    const action = index === -1 ? 'up' : 'down';

    index === -1 ? ups.push(id) : ups.splice(index, 1);

    const result = await this.replyService.update(replyid, {
      ups,
    });

    ctx.body = {
      data: {
        result,
        action,
      },
    };
  }
}
