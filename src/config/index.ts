import { isStr } from '@utils/types';

export type ConfigLogLevel = 'err' | 'warn' | 'info' | 'debug';

export const isConfigLogLevel = (val: unknown): val is ConfigLogLevel =>
  isStr(val) && ['err', 'warn', 'info', 'debug'].includes(val);

export const config = {
  log: {
    level: isConfigLogLevel(process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'info',
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
  },
};
