import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { Topic } from 'app/model/Topic';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class TopicRepository extends AbstractRepository<Topic> {
  constructor() {
    super('Topic');
  }
}
