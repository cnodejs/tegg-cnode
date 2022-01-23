import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
} from '@eggjs/tegg';
import { AbstractController } from './AbstractController';

@HTTPController({
  path: '/',
})
export class HomeController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index(@Context() ctx: EggContext) {
    ctx.body = {
      data: {
        description: 'api.cnodejs.org',
        version: 'v2',
      },
    };
  }
}
