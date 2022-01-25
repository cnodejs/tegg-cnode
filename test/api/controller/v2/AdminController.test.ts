import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

describe('test/app/api/controller/v2/AdminController.test.ts', () => {
  let user: any;
  let admin: any;
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    user = await createUser(ctx);
    admin = await createUser(ctx, {
      isAdmin: true,
    });
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[POST /api/v2/admin/blockUser]', () => {

    it('should return 403', async () => {
      await app
        .httpRequest()
        .post('/api/v2/admin/blockUser')
        .set('Authorization', `Bearer ${user.token}`)
        .expect(403);
    });

    it('should get action info', async () => {
      const result = await app
        .httpRequest()
        .post('/api/v2/admin/blockUser')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
          loginname: 'xxx',
        })
        .expect(200);
      assert(result.body.data.user.loginname === 'xxx');
    });
  });
});
