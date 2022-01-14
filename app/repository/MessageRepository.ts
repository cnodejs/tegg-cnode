import { AccessLevel, ContextProto } from '@eggjs/tegg';
import { AbstractRepository } from './AbstractRepository';
import { Message } from '../model/Message';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class MessageRepository extends AbstractRepository<Message> {
  constructor() {
    super('Message');
  }
}
