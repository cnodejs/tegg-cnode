import * as uuid from 'uuid';

import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { User } from '../../model/User';
import { UserRepository } from '../../repository/UserRepository';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService extends AbstractService {
  @Inject()
  private readonly userRepository: UserRepository;

  async getByLoginName(name: string) {
    return this.userRepository.getByLoginName(name, [
      '-pass',
      '-email',
      '-githubId',
      '-githubAccessToken',
      '-accessToken',
    ]);
  }

  async getByGithubId(githubId: string) {
    return this.userRepository.getByGithubId(githubId, [
      '-pass',
      '-email',
      '-githubId',
      '-githubAccessToken',
      '-accessToken',
    ]);
  }

  async create(model: Partial<User>) {
    const accessToken = uuid.v4();
    return this.userRepository.create({
      ...model,
      accessToken,
    });
  }

  async update(id: string, model: Partial<User>) {
    return this.userRepository.update(id, model);
  }
}
