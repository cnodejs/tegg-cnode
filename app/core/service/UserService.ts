import * as uuid from 'uuid';

import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { User } from '@/app/model/User';
import { UserRepository } from '@/app/repository/UserRepository';
import { FilterQuery, QueryOptions } from 'mongoose';

const defaltProjection = [
  '-pass',
  '-email',
  '-githubId',
  '-githubAccessToken',
  '-accessToken',
];

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService extends AbstractService {
  @Inject()
  private readonly userRepository: UserRepository;

  async getByEmail(email: string, projection?: any) {
    return this.userRepository.getByEmail(email, projection || defaltProjection);
  }

  async getByLoginName(name: string, projection?: any) {
    return this.userRepository.getByLoginName(name, projection || defaltProjection);
  }

  async getByGithubId(githubId: string, projection?: any) {
    return this.userRepository.getByGithubId(githubId, projection || defaltProjection);
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

  async query(query: FilterQuery<User>, projection?: any, options?: QueryOptions) {
    return this.userRepository.query(query, projection || defaltProjection, options);
  }
}
