import { Log } from '@core/log';
import { getTelegramApi, isBotCmd, isTelegramUpdate, TelegramMessage } from '@core/telegram';

const log = Log('core.bot');

/*
/start - Почати роботу
/help - Допомога
*/

const startText = `
Привіт 👋
`;
const helpText = `
Привіт 👋
`;

interface BotOpt {
  token: string;
}

export const getBot = (botOpt: BotOpt) => {
  const telegram = getTelegramApi({ token: botOpt.token });

  const processUpdate = async (data: unknown) => {
    if (!isTelegramUpdate(data)) return log.err('unknown update data', { data });
    if (data.message) {
      if (data.message.chat.id !== 1801040) return;
      await processTextMsg(data.message);
    }
    // if (data.callback_query) {
    //   if (data.callback_query.from.id !== 1801040) return;
    //   await processCallbackQuery(data.callback_query);
    // }
  };

  const processTextMsg = async (msg: TelegramMessage): Promise<void> => {
    const {
      text,
      chat: { id: chat_id },
    } = msg;
    if (!text) return;
    log.debug(`processing text msg`, { chat_id, text, msg });
    if (isBotCmd(text, 'start')) {
      log.debug('sending start msg', { chat_id });
      return sendTextMsg(chat_id, startText);
    }
    if (isBotCmd(text, 'help')) {
      log.debug('sending help msg', { chat_id });
      return sendTextMsg(chat_id, helpText);
    }
    if (isBotCmd(text)) {
      return sendTextMsg(chat_id, `Невідома команда "${text}" 😕`);
    }
  };

  const sendTextMsg = async (chatId: number | string, val: string) => telegram.sendTextMessage(chatId, val);

  return { processUpdate };
};
