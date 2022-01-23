import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { Reply } from '@/app/model/Reply';
import { ReplyRepository } from '../../repository/ReplyRepository';
import { FilterQuery, QueryOptions } from 'mongoose';

const defaltProjection = [
];

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ReplyService extends AbstractService {
  @Inject()
  private readonly replyRepository: ReplyRepository;

  async create(model: Partial<Reply>) {
    return this.replyRepository.create(model);
  }

  async query(query: FilterQuery<Reply>, projection?: any, options?: QueryOptions) {
    return this.replyRepository.query(query, projection || defaltProjection, options);
  }
}
