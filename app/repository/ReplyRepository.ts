import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { Reply } from '../model/Reply';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ReplyRepository extends AbstractRepository<Reply> {
  constructor() {
    super('Reply');
  }
}
