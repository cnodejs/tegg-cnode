import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
} from '@eggjs/tegg';
import { AbstractController } from '../AbstractController';

@HTTPController({
  path: '/api/v2/user',
})
export class UserController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/:loginname',
  })
  async show(@Context() ctx: EggContext, @HTTPParam() loginname: string) {
    const user = await this.userService.getByLoginName(loginname);
    ctx.body = {
      data: {
        user: user.toObject(),
      },
    };
  }
}
