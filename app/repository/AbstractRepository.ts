import { Inject } from '@eggjs/tegg';
import { EggLogger } from 'egg';

import { Model } from 'mongoose';

export abstract class AbstractRepository<T> {
  private modelName: string;

  @Inject()
  protected logger: EggLogger;

  @Inject()
  model: { [index: string]: Model<any, any> };

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  protected get __model(): Model<T, any, any> {
    const modelName = this.modelName;
    return this.model[modelName];
  }

  async create(model: Partial<T>) {
    this.logger.debug('create', model);
    const _model = new this.__model(model);
    const res = await _model.save();
    return res;
  }

  async update(id: string, model: Partial<T>) {
    this.logger.debug('update', id, model);
    const query = {
      _id: id,
    };
    const res = await this.__model.updateOne(query as any, model as any).exec();
    return res;
  }

  async read(id: string, projection?: any) {
    this.logger.debug('read', id);
    const query = {
      _id: id,
    };
    const res = await this.__model.findOne(query as any, projection).exec();
    return res;
  }

  async delete(id: string) {
    this.logger.debug('delete', id);
    const query = {
      _id: id,
    };
    const res = await this.__model.deleteOne(query as any).exec();
    return res;
  }
}
