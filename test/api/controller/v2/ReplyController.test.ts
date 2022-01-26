import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

const defaultTopic = {
  title: 'CNodejs.org',
  content: 'Powered By CNodejs.org',
  tab: 'dev',
};

describe('test/app/api/controller/v2/ReplyController.test.ts', () => {
  let ctx: Context;
  let user: any;
  let replyId: any;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    user = await createUser(ctx);

    const topicResult = await app
      .httpRequest()
      .post('/api/v2/topic')
      .set('Authorization', `Bearer ${user.token}`)
      .send(defaultTopic);

    const topicId = topicResult.body.data.topic._id;
    const content = 'Replied By CNodejs.org';

    const replyResult = await app
      .httpRequest()
      .post(`/api/v2/topic/${topicId}/reply`)
      .send({
        content,
      })
      .set('Authorization', `Bearer ${user.token}`);

    replyId = replyResult.body.data.reply._id;
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[PUT /api/v2/reply/:replyid]', () => {
    it('should get update info', async () => {
      const content = 'Modified By CNodejs.org';
      const result = await app
        .httpRequest()
        .put(`/api/v2/reply/${replyId}`)
        .send({
          content,
        })
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(result.body.data.result.n === 1);
    });
  });

  describe('[DELETE /api/v2/reply/:replyid]', () => {
    it('should get delete info', async () => {
      const result = await app
        .httpRequest()
        .delete(`/api/v2/reply/${replyId}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(result.body.data.result.n === 1);
    });
  });

  describe('[PUT /api/v2/reply/:replyid/ups]', () => {
    it('should get ups info', async () => {
      const upResult = await app
        .httpRequest()
        .put(`/api/v2/reply/${replyId}/ups`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(upResult.body.data.action === 'up');

      const downResult = await app
        .httpRequest()
        .put(`/api/v2/reply/${replyId}/ups`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(downResult.body.data.action === 'down');
    });
  });
});
