import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { User } from 'app/model/User';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class TopicCollectionRepository extends AbstractRepository<User> {
  constructor() {
    super('TopicCollection');
  }
}
