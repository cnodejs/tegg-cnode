import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { TopicCollect } from 'app/model/TopicCollection';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class TopicCollectionRepository extends AbstractRepository<TopicCollect> {
  constructor() {
    super('TopicCollection');
  }
}
