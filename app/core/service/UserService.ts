import {
  AccessLevel,
  ContextProto,
  Inject,
} from '@eggjs/tegg';

import { UserRepository } from '../../repository/UserRepository';
import { AbstractService } from './AbstractService';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService extends AbstractService {
  @Inject()
  private readonly userRepository: UserRepository;

  async show(loginname: string) {
    return this.userRepository.getByLoginname(loginname);
  }
}
