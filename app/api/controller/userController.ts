import {
  // Context,
  // EggContext,

  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  // HTTPBody,
  // HTTPParam,
} from '@eggjs/tegg';


@HTTPController({
  path: '/api/user',
})
export class UserController {

  // @HTTPMethod({
  //   method: HTTPMethodEnum.POST,
  //   path: '/',
  // })
  // async addMsg(@HTTPBody() msg: string) { }

  // @HTTPMethod({
  //   method: HTTPMethodEnum.GET,
  //   path: '/:id',
  // })
  // async getMsg(@HTTPParam() id: string) { }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async hello() {
  // async home(@Context() ctx: EggContext) {
    return 'mmm';
  }
}
