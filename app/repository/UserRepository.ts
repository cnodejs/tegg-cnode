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

  async getByLoginname(loginname: string) {
    const user = await this.__model.findOne({
      loginname,
    });

    return user;
  }
}
