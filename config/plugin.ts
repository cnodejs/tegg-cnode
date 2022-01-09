import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  tegg: {
    package: '@eggjs/tegg-plugin',
    enable: true,
  },

  teggController: {
    enable: true,
    package: '@eggjs/tegg-controller-plugin',
  },

  teggConfig: {
    enable: true,
    package: '@eggjs/tegg-config',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  typeboxValidate: {
    enable: true,
    package: 'egg-typebox-validate',
  },
};

export default plugin;
