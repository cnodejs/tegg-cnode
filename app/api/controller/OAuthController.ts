import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
} from '@eggjs/tegg';
import { AbstractController } from './AbstractController';

@HTTPController({
  path: '/oauth',
})
export class OAuthController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index(@Context() ctx: EggContext) {
    const { config } = this;
    const { client_id, redirect_uri } = config.github;

    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;

    ctx.body = {
      data: {
        githubOAuthUrl,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/github',
  })
  async github(@Context() ctx: EggContext, @HTTPQuery() code: string, @HTTPQuery() callbackUrl: string) {
    const authInfo = await this.githubService.exchange(code);

    if (!authInfo) {
      ctx.throw(400, 'invalid code');
    }

    const { access_token } = authInfo;
    const userInfo = await this.githubService.getUser(access_token);

    if (!userInfo) {
      ctx.throw(400, 'invalid token');
    }

    // TODO:
    // save or update user, sign jwt token with user

    const token = await this.jwtService.sign(userInfo);

    if (callbackUrl) {
      ctx.redirect(`${callbackUrl}?token=${token}`);
      return;
    }

    ctx.body = {
      data: {
        type: 'Github',
        data: userInfo,
      },
    };
  }
}
