import { config } from '@config';
import { getBot } from '@core/bot';
import { Log } from '@core/log';
import { errToStr, httpNotFoundErrResp, httpOkResp } from '@utils';
import { APIGatewayProxyHandler } from 'aws-lambda';

const log = Log('functions.webhook');
const bot = getBot({ token: config.telegram.token });

export const handler: APIGatewayProxyHandler = async event => {
  const { httpMethod, path, body } = event;
  try {
    if (httpMethod === 'POST' && path === '/webhook') {
      const data = JSON.parse(body);
      await bot.processUpdate(data);
      return httpOkResp();
    }
    return httpNotFoundErrResp();
  } catch (err: unknown) {
    log.err('webhook error', { msg: errToStr(err) });
    return httpOkResp();
  }
};
