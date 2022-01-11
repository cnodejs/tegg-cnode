import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/api/controller/OAuthController.test.ts', () => {
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[GET /oauth]', () => {
    it('should get auth info', async () => {
      const callbackUrl = 'http://127.0.0.1:7001';
      const githubOAuthUrl = 'https://github.com/login/oauth/authorize?client_id=04675579503deb3524e5&redirect_uri=http://127.0.0.1:7001/oauth/github?callbackUrl=http%3A%2F%2F127.0.0.1%3A7001';

      const result = await app.httpRequest().get(`/oauth?callbackUrl=${callbackUrl}`).expect(200);
      assert(result.body.data.githubOAuthUrl, githubOAuthUrl);
    });
  });

  describe('[GET /oauth/github]', () => {
    it('should redirect to callback url', async () => {
      const code = 'code';
      const callbackUrl = 'http%3A%2F%2F127.0.0.1%3A7001';

      app.mockHttpclient('https://github.com/login/oauth/access_token', 'POST', {
        data: {
          access_token: 'access_token',
        },
        status: 200,
      });

      app.mockHttpclient('https://api.github.com/user', 'GET', {
        data: {
          name: 'cnode',
          email: 'cnode@cnodejs.org',
          avatar_url: 'https://avatars.githubusercontent.com/u/958063?v=4',
          id: 10001,
          login: 'cnode',
        },
        status: 200,
      });

      await app.httpRequest().get(`/oauth/github?code=${code}&callbackUrl=${callbackUrl}`).expect(302);
    });
  });
});
