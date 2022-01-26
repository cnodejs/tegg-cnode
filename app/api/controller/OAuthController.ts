import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
} from '@eggjs/tegg';
import { AbstractController } from './AbstractController';
import { pickUserField } from '@/app/common/UserUtil';

@HTTPController({
  path: '/oauth',
})
export class OAuthController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index(@Context() ctx: EggContext, @HTTPQuery() callbackUrl: string) {
    const { config } = this;
    const { client_id, redirect_uri } = config.github;

    const redirectUri = new URL(redirect_uri);

    if (callbackUrl) {
      // encode callback_url
      redirectUri.searchParams.set('callbackUrl', callbackUrl);
    }

    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri.toString()}`;

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
  async github(
    @Context() ctx: EggContext,
    @HTTPQuery() code: string,
    @HTTPQuery() callbackUrl: string,
  ) {
    const authInfo = await this.githubService.exchange(code);
    this.logger.debug('authInfo', authInfo);

    if (!authInfo) {
      ctx.throw(400, 'invalid code');
    }

    const { access_token } = authInfo;
    const userInfo = await this.githubService.getUser(access_token);
    this.logger.debug('userInfo', userInfo);

    if (!userInfo) {
      ctx.throw(400, 'invalid token');
    }

    // Sync User: create or update user with github userinfo.

    const { name, email, avatar_url, id: githubId, login: username } = userInfo;

    let user;

    user = await this.userService.getByGithubId(githubId);
    this.logger.debug('user.existed', user);

    if (!user) {
      user = await this.userService.create({
        email,
        githubId,
        active: true,
      });
      this.logger.debug('user.created', user);
    }

    await this.userService.update(user._id, {
      name,
      email,
      loginname: username,
      avatar: avatar_url,
      githubUsername: username,
      githubAccessToken: access_token,
    });

    user = await this.userService.getByGithubId(githubId);
    this.logger.debug('user.updated', user);

    const token = await this.jwtService.sign(user.toObject());
    this.logger.debug('token', token);

    if (callbackUrl) {
      // decode callback_url
      const _callbackUrl = decodeURIComponent(callbackUrl);
      const redirectUri = new URL(_callbackUrl);
      redirectUri.searchParams.set('token', token);
      ctx.redirect(redirectUri.toString());
      return;
    }

    ctx.body = {
      data: {
        type: 'github',
        user: pickUserField(user),
        token,
      },
    };
  }
}
