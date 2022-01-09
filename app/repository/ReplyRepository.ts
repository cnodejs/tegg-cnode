import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { User } from 'app/model/User';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ReplyRepository extends AbstractRepository<User> {
  constructor() {
    super('Reply');
  }
}
