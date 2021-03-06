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
    secret: process.env.EGG_JWT_SECRET || 'JWT_SECRET',
    match: ctx => {

      const ProtectedMethods = [
        'POST',
        'PUT',
        'DELETE',
      ];

      if (!ctx.path.startsWith('/api/v2')) {
        return false;
      }

      if (ProtectedMethods.includes(ctx.method)) {
        return true;
      }

      return false;
    },
  };

  config.mongoose = {
    url:
      process.env.EGG_MONGODB_URL ||
      'mongodb://cnode:cnode@127.0.0.1:27017/cnode',
    options: {
      useUnifiedTopology: true,
      family: 4,
    },
  };

  config.redis = {
    client: {
      host: process.env.EGG_REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.EGG_REDIS_PORT || '6379'),
      db: parseInt(process.env.EGG_REDIS_DB || '0'),
      password: process.env.EGG_REDIS_PASSWORD || '',
    },
  };

  config.github = {
    client_id: process.env.GITHUB_CLIENT_ID || '04675579503deb3524e5',
    client_secret: process.env.GITHUB_CLIENT_SECRET || 'client_secret',
    redirect_uri:
      process.env.GITHUB_REDIRECT_URI || 'http://127.0.0.1:7001/oauth/github',
  };

  const cnodejs = {
    allowPublicRegistration: Boolean(process.env.EGG_ALLOW_PUBLIC_REGISTRATION) || false,
    jwtAlgorithm: process.env.EGG_JWT_ALGORITHM || 'HS256',
    administrators: (process.env.EGG_ADMINISTRATORS || '').split(',') || [],
  };

  return {
    ...config,
    ...cnodejs,
  };
};
