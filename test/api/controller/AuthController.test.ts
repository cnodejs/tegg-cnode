import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/api/controller/AuthController.test.ts', () => {
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[POST /api/auth/signup]', () => {
    it('should get user info', async () => {

      const user = {
        loginname: 'cnodejs',
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
        rePass: 'cnodejs',
      };

      const result = await app
        .httpRequest()
        .post('/api/auth/signup')
        .send(user)
        .expect(200);

      assert(result.body.data.user.loginname, 'cnodejs');
    });
  });

  describe('[POST /api/auth/signin]', () => {
    it('should get user info', async () => {

      const user = {
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
      };

      const result = await app
        .httpRequest()
        .post('/api/auth/signin')
        .send(user)
        .expect(200);

      assert(result.body.data.user.active === false);
    });


  });

  describe('[POST /api/auth/signin]', () => {
    it('should get user info', async () => {

      const user = {
        loginname: 'cnodejs',
        pass: 'cnodejs',
      };

      const result = await app
        .httpRequest()
        .post('/api/auth/signin')
        .send(user)
        .expect(200);

      assert(result.body.data.user.active === false);
    });
  });
});
