import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

const id = Date.now();

describe('test/app/api/controller/v2/AdminController.test.ts', () => {
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

  describe('[POST /api/v2/admin/blockUser]', () => {
    it('should return 403', async () => {
      await app
        .httpRequest()
        .put('/api/v2/admin/blockUser')
        .set('Authorization', `Bearer ${user.token}`)
        .expect(403);
    });

    it('should get action info', async () => {
      const result = await app
        .httpRequest()
        .put('/api/v2/admin/blockUser')
        .set('Authorization', `Bearer ${administrator.token}`)
        .send({
          loginname: blockUser.info.loginname,
        })
        .expect(200);
      assert(result.body.data.user.loginname === blockUser.info.loginname);
      assert(result.body.data.result.ok === 1);
    });
  });
});
