import axios, { AxiosRequestConfig } from 'axios';

import { TelegramAnswerCallbackQuery, TelegramChatId, TelegramSendMessage } from './types';

interface TelegramBotOpt {
  token: string;
}

interface TelegramBotApiReqOpt<D = unknown> {
  path: string;
  method?: AxiosRequestConfig['method'];
  data?: D;
}

export const getTelegramApi = (opt: TelegramBotOpt) => {
  // API

  const apiReq = async ({ path, data, method = 'GET' }: TelegramBotApiReqOpt) => {
    const url = `https://api.telegram.org/bot${opt.token}/${path}`;
    const config: AxiosRequestConfig = {
      method,
      url,
    };
    if (data) {
      config.data = JSON.stringify(data);
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    const { data: respData } = await axios(config);
    return respData;
  };

  // User

  const getMe = () => apiReq({ path: 'getMe' });

  // Messages

  const sendTextMessage = (chat_id: TelegramChatId, text: string, opt?: Omit<TelegramSendMessage, 'chat_id' | 'text'>) => {
    const data: TelegramSendMessage = opt ? { chat_id, text, ...opt } : { chat_id, text };
    return sendMessage(data);
  };

  const sendMessage = (data: TelegramSendMessage) => apiReq({ path: 'sendMessage', method: 'POST', data });

  // Callback Query

  const answerCallbackQuery = (data: TelegramAnswerCallbackQuery) =>
    apiReq({ path: 'answerCallbackQuery', method: 'POST', data });

  return { getMe, sendTextMessage, sendMessage, answerCallbackQuery };
};

export type TelegramApi = ReturnType<typeof getTelegramApi>;
export * from './types';
export * from './utils';
