import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
} from '@eggjs/tegg';
import { AbstractController } from '../AbstractController';

@HTTPController({
  path: '/api/v2/auth',
})
export class AuthController extends AbstractController {

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/signin',
  })
  async signin(@Context() ctx: EggContext, @HTTPBody() data: any) {
    ctx.body = data;
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/signup',
  })
  async signup(@Context() ctx: EggContext, @HTTPBody() data: any) {
    ctx.body = data;
  }
}
