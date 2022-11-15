import { APIGatewayProxyResult } from 'aws-lambda';

import { isArr } from './types';

export interface HttpQueryOptions {
  [key: string]: number | string | string[] | boolean | undefined;
}

export const httpQueryOptionsToStr = (opt: HttpQueryOptions): string => {
  const res: string[] = [];
  for (const key in opt) {
    const val = opt[key];
    if (val === undefined) continue;
    if (isArr(val)) {
      for (const itm of val) {
        res.push(`${key}[]=${encodeURI(itm)}`);
      }
    } else {
      res.push(`${key}=` + encodeURI(`${val}`));
    }
  }
  return res.join('&');
};

export const httpOkResp = (data: unknown = undefined): APIGatewayProxyResult => ({
  statusCode: 200,
  body: data !== undefined ? JSON.stringify(data) : '',
});

export const httpServerErrResp = (msg: string): APIGatewayProxyResult => ({
  statusCode: 503,
  body: msg,
});

export const httpNotFoundErrResp = (msg: string = 'Not found'): APIGatewayProxyResult => ({
  statusCode: 404,
  body: msg,
});

export const isStatus200 = (val: number) => val >= 200 && val < 299;
