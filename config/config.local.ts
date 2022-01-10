import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    logger: {
      level: 'DEBUG',
      consoleLevel: 'DEBUG',
    },
  };
  return config;
};
