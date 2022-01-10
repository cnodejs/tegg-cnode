import * as dotenv from 'dotenv';

import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  dotenv.config();

  config.keys = appInfo.name + '1641440353690_2883';

  config.middleware = [];

  config.security = {
    csrf: false,
  };

  config.jwt = {
    enable: true,
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    match: ctx => {
      if (ctx.path.startsWith('/api/v2') && (ctx.method === 'PUT' || ctx.method === 'POST')) {
        return true;
      }
      return false;
    },
  };

  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://cnode:cnode@127.0.0.1:27017/cnode',
    options: {
      reconnectTries: 10,
      reconnectInterval: 500,
    },
  };

  config.redis = {
    client: {
      host: process.env.EGG_REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.EGG_REDIS_PORT || '6379'),
      db: parseInt(process.env.EGG_REDIS_DB || '0'),
      password: process.env.EGG_REDIS_PASSWORD || 'cnode',
    },
  };

  config.github = {
    client_id: process.env.GITHUB_CLIENT_ID || 'clientId',
    client_secret: process.env.GITHUB_CLIENT_SECRET || 'clientId',
    redirect_uri: process.env.GITHUB_REDIRECT_URI || '',
  };

  const bizConfig = {
    jwtAlgorithm: process.env.JWT_ALGORITHM || 'HS256',
  };

  return {
    ...config,
    ...bizConfig,
  };
};
