import { isBool, isErr, isNull, isNum, isStr, isUndef } from './types';

export const pad = (val: number | string, max: number): string => {
  const str = val.toString();
  return str.length < max ? pad(`0${str}`, max) : str;
};

export const errToStr = (val: unknown): string => {
  if (isErr(val)) {
    return val.message;
  }
  if (isStr(val) || isNum(val)) {
    return `${val}`;
  }
  if (isBool(val)) {
    return val ? 'true' : 'false';
  }
  if (isNull(val) || isUndef(val)) {
    return '';
  }
  return '';
};
