import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/api/controller/v2/RankController.test.ts', () => {
  let ctx: Context;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[POST /api/v2/rank/user]', () => {
    it('should get user list', async () => {
      const result = await app
        .httpRequest()
        .get('/api/v2/rank/user')
        .expect(200);
      assert(Array.isArray(result.body.data.tops));
    });
  });

  describe('[POST /api/v2/rank/no_reply_topics]', () => {
    it('should get topic list', async () => {
      const result = await app
        .httpRequest()
        .get('/api/v2/rank/no_reply_topics')
        .expect(200);
      assert(Array.isArray(result.body.data.no_reply_topics));
    });
  });
});
