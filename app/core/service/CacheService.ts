import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import { Application } from 'egg';
import { AbstractService } from './AbstractService';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class CacheService extends AbstractService {
  @Inject()
  redis: Application['redis'];

  async get(key: string) {
    const { redis, logger } = this;
    const t = Date.now();
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    const duration = (Date.now() - t);
    logger.debug('Cache', 'get', key, (duration + 'ms'));
    return data;
  }

  async setex(key: string, value: any, seconds: number) {
    const { redis, logger } = this;
    const t = Date.now();
    value = JSON.stringify(value);
    await redis.set(key, value, 'EX', seconds);
    const duration = (Date.now() - t);
    logger.debug('Cache', 'set', key, (duration + 'ms'));
  }

  async incr(key: string, seconds: number) {
    const { redis, logger } = this;
    const t = Date.now();
    const result = await redis.multi().incr(key).expire(key, seconds)
      .exec();
    const duration = (Date.now() - t);
    logger.debug('Cache', 'set', key, (duration + 'ms'));
    return result[0][1];
  }
}
