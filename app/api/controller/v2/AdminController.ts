import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  Middleware,
} from '@eggjs/tegg';

import { AbstractController } from '../AbstractController';
import { IsAdmin as IsAdminMiddleware } from '../../middleware/IsAdmin';

@HTTPController({
  path: '/api/v2/admin',
})
@Middleware(IsAdminMiddleware)
export class AdminController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.PUT,
    path: '/blockUser',
  })
  async blockUser(@Context() ctx: EggContext, @HTTPBody() data: { loginname: string }) {

    const { loginname } = data;

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
        user: {
          loginname: data.loginname,
        },
        result,
      },
    };
  }
}
