import { Inject } from '@eggjs/tegg';
import { EggLogger, EggAppConfig } from 'egg';

import { MiddlewareController } from '../middleware';

import { JwtService } from 'app/core/service/JwtService';
import { UserService } from '@/app/core/service/UserService';
import { CacheService } from '@/app/core/service/CacheService';
import { TopicService } from '@/app/core/service/TopicService';
import { GithubService } from 'app/core/service/GithubService';

export abstract class AbstractController extends MiddlewareController {
  @Inject()
  protected logger: EggLogger;

  @Inject()
  protected config: EggAppConfig;

  @Inject()
  protected userService: UserService;

  @Inject()
  protected githubService: GithubService;

  @Inject()
  protected jwtService: JwtService;

  @Inject()
  protected cacheService: CacheService;

  @Inject()
  protected topicService: TopicService;
}
