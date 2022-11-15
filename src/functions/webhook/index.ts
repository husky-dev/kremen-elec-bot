import { handlerPath } from '@utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  timeout: 30,
  events: [
    {
      http: {
        method: 'post',
        path: 'webhook',
      },
    },
  ],
};
