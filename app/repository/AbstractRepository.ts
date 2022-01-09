import {
  Inject,
} from '@eggjs/tegg';
import {
  EggLogger,
} from 'egg';

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

  async getById(id: string, projection?: any) {
    const query = {
      _id: id,
    };

    return await this.__model.findOne(query as any, projection).exec();
  }
}
