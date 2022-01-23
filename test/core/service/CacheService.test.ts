
import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { CacheService } from '@/app/core/service/CacheService';


const defaultCache = {
  title: 'CNodejs.org',
  content: 'Powered By CNodejs.org',
  tab: 'dev',
};

describe('test/app/core/service/CacheServuce.test.ts', () => {
  let ctx: Context;
  let cacheService: CacheService;

  beforeEach(async () => {
    ctx = await app.mockModuleContext();
    cacheService = await ctx.getEggObject(CacheService);
  });

  afterEach(() => {
    app.destroyModuleContext(ctx);
  });

  describe('setex', () => {
    it('should work', async () => {
      await cacheService.setex('cache', defaultCache, 10);
    });
  });

  describe('incr', () => {
    it('should work', async () => {
      await cacheService.incr('cache', 100);
    });
  });

  describe('get', () => {
    it('should get cache info', async () => {
      const cache = await cacheService.get('cache');
      assert(cache?.title === defaultCache.title);
    });
  });
});
