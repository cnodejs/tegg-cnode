import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { createUser } from '@/test/TestUtil';

const defaultTopic = {
  title: 'CNodejs.org',
  content: 'Powered By CNodejs.org',
  tab: 'dev',
};

describe('test/app/api/controller/v2/TopicController.test.ts', () => {
  let user: any;
  let ctx: Context;
  let topicId: string;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    user = await createUser(ctx);
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('[GET /api/v2/topic]', () => {
    it('should get topic list', async () => {
      const result = await app
        .httpRequest()
        .get('/api/v2/topic?limit=20')
        .expect(200);

      assert(Array.isArray(result.body.data.topics));
      assert(result.body.data.pagination.page === 0);
      assert(result.body.data.pagination.limit === 20);
    });
  });

  describe('[POST /api/v2/topic]', () => {
    it('should get topic info', async () => {
      const result = await app
        .httpRequest()
        .post('/api/v2/topic')
        .set('Authorization', `Bearer ${user.token}`)
        .send(defaultTopic)
        .expect(200);
      assert(result.body.data.topic.title === defaultTopic.title);
      topicId = result.body.data.topic._id;
    });
  });

  describe('[GET /api/v2/topic/:topicid]', () => {
    it('should get topic info', async () => {
      const result = await app
        .httpRequest()
        .get(`/api/v2/topic/${topicId}`)
        .expect(200);
      assert(result.body.data.topic.title === defaultTopic.title);
    });
  });

  describe('[PUT /api/v2/topic/:topicid]', () => {
    it('should get update info', async () => {
      const content = 'Modified By CNodejs.org';
      const result = await app
        .httpRequest()
        .put(`/api/v2/topic/${topicId}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          ...defaultTopic,
          content,
        })
        .expect(200);
      assert(result.body.data.result.n === 1);
    });
  });

  describe('[DELETE /api/v2/topic/:topicid]', () => {
    it('should get delete info', async () => {
      const result = await app
        .httpRequest()
        .delete(`/api/v2/topic/${topicId}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(result.body.data.result.n === 1);
    });
  });

  describe('[POST /api/v2/topic/:topicid/reply]', () => {
    it('should get reply info', async () => {
      const content = 'Replied By CNodejs.org';
      const result = await app
        .httpRequest()
        .post(`/api/v2/topic/${topicId}/reply`)
        .send({
          content,
        })
        .set('Authorization', `Bearer ${user.token}`)
        .expect(200);
      assert(result.body.data.reply.content === content);
    });
  });
});
