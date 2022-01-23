import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
} from '@eggjs/tegg';
import { AbstractController } from '../AbstractController';
import { filterUser } from '@/app/common/UserUtil';

@HTTPController({
  path: '/api/v2/rank',
})
export class RankController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/users',
  })
  async showTopUsers(@Context() ctx: EggContext, @HTTPQuery() limit: string) {

    let tops = await this.cacheService.get('tops');

    if (!tops) {
      const query = { is_block: false };

      const options = {
        limit: parseInt(limit) > 100 ? 100 : parseInt(limit),
        sort: '-score',
      };

      const topsUsers = await this.userService.query(
        query,
        null,
        options,
      );

      tops = topsUsers.map(user => {
        return filterUser(user, [
          'score',
          'topic_count',
          'reply_count',
          'follower_count',
          'following_count',
          'update_at',
          'create_at',
          'name',
          'signature',
          'url',
          'weibo',
        ]);
      });
      await this.cacheService.setex('tops', tops, 60);
    }

    ctx.body = {
      data: {
        tops,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/no_reply_topics',
  })
  async showNoReplyTopic(@Context() ctx: EggContext) {
    let no_reply_topics = await this.cacheService.get('no_reply_topics');

    if (!no_reply_topics) {
      const query = {
        reply_count: 0,
        tab: {
          $nin: [
            'job',
            'dev',
          ],
        },
      };

      const options = {
        limit: 10,
        sort: '-create_at',
      };

      no_reply_topics = await this.topicService.query(
        query,
        null,
        options,
      );

      await this.cacheService.setex('no_reply_topics', no_reply_topics, 60);
    }

    ctx.body = {
      data: {
        no_reply_topics,
      },
    };
  }
}
