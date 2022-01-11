import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/api/controller/v2/UserController.test.ts', () => {
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[GET /api/v2/user/:loginname]', () => {
    it('should get user info', async () => {
      const result = await app
        .httpRequest()
        .get('/api/v2/user/cnode')
        .expect(200);
      assert(result.body.data.user.name, 'cnode');
    });
  });
});
