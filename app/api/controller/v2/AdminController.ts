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
    method: HTTPMethodEnum.POST,
    path: '/blockUser',
  })
  async blockUser(@Context() ctx: EggContext, @HTTPBody() data: { loginname: string }) {
    // TODO
    ctx.body = {
      data: {
        user: {
          loginname: data.loginname,
        },
      },
    };
  }
}
