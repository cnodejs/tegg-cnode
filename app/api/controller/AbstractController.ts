import {
  Inject,
} from '@eggjs/tegg';
import {
  EggLogger,
  EggAppConfig,
} from 'egg';

import { MiddlewareController } from '../middleware';
import { UserService } from '../../core/service/UserService';

export abstract class AbstractController extends MiddlewareController {
  @Inject()
  protected logger: EggLogger;

  @Inject()
  protected config: EggAppConfig;

  @Inject()
  protected userService: UserService;
}
