import { AccessLevel, ContextProto, Inject } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { Topic } from '@/app/model/Topic';
import { TopicRepository } from '../../repository/TopicRepository';
import { FilterQuery, QueryOptions } from 'mongoose';

const defaltProjection = [];

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class TopicService extends AbstractService {
  @Inject()
  private readonly topicRepository: TopicRepository;

  async getById(id: string, projection?: any) {
    return this.topicRepository.read(id, projection || defaltProjection);
  }

  async create(model: Partial<Topic>) {
    return this.topicRepository.create(model);
  }

  async update(id: string, model: Partial<Topic>, filter?: any) {
    return this.topicRepository.update(id, model, filter);
  }

  async query(query: FilterQuery<Topic>, projection?: any, options?: QueryOptions) {
    return this.topicRepository.query(query, projection || defaltProjection, options);
  }
}
