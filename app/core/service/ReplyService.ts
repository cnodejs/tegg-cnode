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

  async getById(id: string, projection?: any) {
    return this.replyRepository.read(id, projection || defaltProjection);
  }

  async create(model: Partial<Reply>) {
    return this.replyRepository.create(model);
  }

  async update(id: string, model: Partial<Reply>, filter?: any) {
    return this.replyRepository.update(id, model, filter);
  }

  async query(query: FilterQuery<Reply>, projection?: any, options?: QueryOptions) {
    return this.replyRepository.query(query, projection || defaltProjection, options);
  }
}
