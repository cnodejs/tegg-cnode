import * as path from 'path';
import * as dotenv from 'dotenv';

import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  dotenv.config();

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '1641440353690_2883';

  // add your egg config in here
  config.middleware = [];

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: false,
  };

  config.jwt = {
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
  };

  // config.mongoose = {
  //   url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/egg_cnode',
  //   options: {
  //     reconnectTries: 10,
  //     reconnectInterval: 500,
  //   },
  // };

  // config.redis = {
  //   client: {
  //     host: process.env.EGG_REDIS_HOST || '127.0.0.1',
  //     port: parseInt(process.env.EGG_REDIS_PORT || '6379'),
  //     db: parseInt(process.env.EGG_REDIS_DB || '0'),
  //     password: process.env.EGG_REDIS_PASSWORD || '',
  //   },
  // };

  // add your special config in here
  const bizConfig = {
    jwtAlgorithm: process.env.JWT_ALGORITHM || 'HS256',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
