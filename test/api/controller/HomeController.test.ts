import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/api/controller/HomeController.test.ts', () => {
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[GET /]', () => {
    it('should get api info', async () => {
      const result = await app
        .httpRequest()
        .get('/')
        .expect(200);

      assert(result.body.data.version === 'v2');
    });
  });
});
