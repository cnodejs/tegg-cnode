import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  Middleware,
} from '@eggjs/tegg';
import { AbstractController } from '../AbstractController';
import { IsAdmin as IsAdminMiddleware } from '../../middleware/IsAdmin';
import { pickUserField } from '@/app/common/UserUtil';

@HTTPController({
  path: '/api/v2/user',
})
export class UserController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/:loginname',
  })
  async read(@Context() ctx: EggContext, @HTTPParam() loginname: string) {
    if (!loginname) {
      ctx.throw('loginname is required', 422);
    }

    const user = await this.userService.getByLoginName(loginname);

    if (!user) {
      ctx.throw('user is not existed', 400);
    }

    ctx.body = {
      data: {
        user: pickUserField(user, [
          'score',
          'topic_count',
          'reply_count',
          'follower_count',
          'following_count',
          'update_at',
          'create_at',
          'name',
          'signature',
          'url',
          'weibo',
        ]),
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.PUT,
    path: '/:loginname/block',
  })
  @Middleware(IsAdminMiddleware)
  async block(@Context() ctx: EggContext, @HTTPParam() loginname: string) {
    if (!loginname) {
      ctx.throw('loginname is required', 422);
    }

    const user = await this.userService.getByLoginName(loginname);

    if (!user) {
      ctx.throw('user is not existed', 400);
    }

    const result = await this.userService.update(user._id, {
      is_block: true,
    });

    ctx.body = {
      data: {
        result,
      },
    };
  }
}
