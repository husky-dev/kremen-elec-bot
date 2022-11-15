/* eslint-disable no-console */
import { config, ConfigLogLevel } from '@config';
import { UnknownDict } from '@utils';

// import { captureSentryMessage, SentrySeverity, addSentryBreadcumb } from './sentry';

const levelToNum = (val?: string) => {
  switch (val) {
    case 'err':
      return 0;
    case 'warn':
      return 1;
    case 'info':
      return 2;
    case 'debug':
      return 3;
    default:
      return -1;
  }
};

const levelToPrefix = (val: ConfigLogLevel): string => {
  switch (val) {
    case 'err':
      return 'x';
    case 'warn':
      return '!';
    case 'info':
      return '+';
    case 'debug':
      return '-';
  }
};

export const Log = (m?: string) => {
  const { level } = config.log;
  const allowedLevel = levelToNum(level);

  const getLogStr = (prefix: string, msg: string) => (m ? `[${prefix}][${m}]: ${msg}` : `[${prefix}]: ${msg}`);

  const logWithLevel = (curLevel: ConfigLogLevel, msg: string, meta?: UnknownDict) => {
    if (levelToNum(curLevel) > allowedLevel) return;
    const prefix = levelToPrefix(curLevel);
    const str = getLogStr(prefix, msg);
    switch (curLevel) {
      case 'err':
        return meta ? console.error(str, JSON.stringify(meta)) : console.error(str);
      case 'warn':
        return meta ? console.warn(str, JSON.stringify(meta)) : console.warn(str);
      case 'info':
        return meta ? console.info(str, JSON.stringify(meta)) : console.info(str);
      case 'debug':
        return meta ? console.log(str, JSON.stringify(meta)) : console.debug(str);
    }
  };

  return {
    err: (msg: string, meta?: UnknownDict) => {
      // captureSentryMessage(msg, SentrySeverity.Error, meta);
      logWithLevel('err', msg, meta);
    },
    warn: (msg: string, meta?: UnknownDict) => {
      // captureSentryMessage(msg, SentrySeverity.Warning, meta);
      logWithLevel('warn', msg, meta);
    },
    info: (msg: string, meta?: UnknownDict) => {
      // addSentryBreadcumb(msg, SentrySeverity.Info, meta);
      logWithLevel('info', msg, meta);
    },
    debug: (msg: string, meta?: UnknownDict) => {
      // addSentryBreadcumb(msg, SentrySeverity.Debug, meta);
      logWithLevel('debug', msg, meta);
    },
    errAndExit: (msg: string, meta?: UnknownDict) => {
      logWithLevel('err', msg, meta);
      process.exit(1);
    },
    simple: (...args: unknown[]) => console.log(...args),
    simpleAndExit: (...args: unknown[]) => {
      console.log(...args);
      process.exit(0);
    },
  };
};

export const log = Log();
