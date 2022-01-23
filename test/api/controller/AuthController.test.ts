import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

const id = Date.now();

const defaultUser = {
  loginname: `cnodejs_${id}`,
  email: `cnodejs_${id}@cnodejs.org`,
  pass: 'cnodejs',
};

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
      const result = await app
        .httpRequest()
        .post('/api/auth/signup')
        .send({
          ...defaultUser,
          rePass: defaultUser.pass,
        })
        .expect(200);

      assert(result.body.data.user.loginname === defaultUser.loginname);
    });
  });

  describe('[POST /api/auth/signin]', () => {
    it('should get user info', async () => {
      const result = await app
        .httpRequest()
        .post('/api/auth/signin')
        .send({
          ...defaultUser,
        })
        .expect(200);

      assert(result.body.data.user.active === false);
    });
  });
});
