import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { User } from 'app/model/User';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserRepository extends AbstractRepository<User> {
  constructor() {
    super('User');
  }

  async getByLoginName(loginName: string, projection?: any) {
    const query = { loginname: new RegExp('^' + loginName + '$', 'i') };
    const user = await this.__model.findOne(query, projection).exec();
    return user.toObject();
  }

  async getByGithubId(githubId: string, projection?: any) {
    const user = await this.__model.findOne({ githubId }, projection).exec();
    return user.toObject();
  }
}
