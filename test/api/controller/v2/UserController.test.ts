import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

const id = Date.now();

describe('test/app/api/controller/v2/UserController.test.ts', () => {
  let ctx: Context;

  let user: any;
  let blockUser: any;
  let administrator: any;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();

    user = await createUser(ctx);

    administrator = await createUser(ctx, {
      isAdmin: true,
    });

    blockUser = await createUser(ctx, {
      user: {
        loginname: `cnodejs_${id}`,
        email: `cnodejs_${id}@cnodejs.org`,
        pass: 'cnodejs',
      },
    });
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

  describe('[PUT /api/v2/user/:loginname/block]', () => {
    it('should return 403', async () => {
      await app
        .httpRequest()
        .put(`/api/v2/user/${user.info.loginname}/block`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(403);
    });

    it('should get action info', async () => {
      const result = await app
        .httpRequest()
        .put(`/api/v2/user/${blockUser.info.loginname}/block`)
        .set('Authorization', `Bearer ${administrator.token}`)
        .expect(200);
      assert(result.body.data.result.ok === 1);
    });
  });
});
