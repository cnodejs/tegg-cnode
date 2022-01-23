import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { GithubService } from '@/app/core/service/GithubService';

describe('test/app/core/service/GithubServuce.test.ts', () => {
  let ctx: Context;
  let githubService: GithubService;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    githubService = await ctx.getEggObject(GithubService);
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('exchange', () => {
    it('should return null', async () => {

      app.mockHttpclient(
        'https://github.com/login/oauth/access_token',
        'POST',
        {
          data: {},
          status: 200,
        },
      );

      const data = await githubService.exchange('cache');
      assert(data === null);
    });
  });

  describe('getUser', () => {
    it('should return null', async () => {

      app.mockHttpclient(
        'https://api.github.com/user',
        'POST',
        {
          data: {},
          status: 200,
        },
      );

      const data = await githubService.getUser('cache');
      assert(data === null);
    });
  });
});
