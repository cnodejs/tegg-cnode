import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

describe('test/app/api/controller/v2/UserController.test.ts', () => {
  let user: any;
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    user = await createUser(ctx);
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[GET /api/v2/user/:loginname]', () => {
    it('should get user info', async () => {
      const result = await app
        .httpRequest()
        .get(`/api/v2/user/${user.info.loginname}`)
        .expect(200);
      assert(result.body.data.user.loginname === user.info.loginname);
    });
  });
});
