import { Log } from '@core/log';
import { getTelegramApi, isBotCmd, isTelegramUpdate, TelegramCallbackQuery, TelegramMessage } from '@core/telegram';
import { pad } from '@utils';
import { ScheduleGroup, scheduleHigh } from './data';

const log = Log('core.bot');

/*
today - Графік на сьогодні
tomorrow - Графік на завтра
start - Почати роботу
help - Допомога
*/

const startText = `
Привіт 👋
Цей бот допоможе тобі швидко дізнатись графік відключень електроенергії на сьогодні.

/today - Графік на сьогодні
/tomorrow - Графік на завтра
/help - Допомога

[Дізнатись свою чергу](https://bit.ly/3DMEFUI)
[Графік відключень на листопад](https://bit.ly/3fmXBQL)
`;
const helpText = `
/today - Графік на сьогодні
/tomorrow - Графік на завтра

[Дізнатись свою чергу](https://bit.ly/3DMEFUI)
[Графік відключень на листопад](https://bit.ly/3fmXBQL)
`;

interface BotOpt {
  token: string;
}

export const getBot = (botOpt: BotOpt) => {
  const telegram = getTelegramApi({ token: botOpt.token });

  const processUpdate = async (data: unknown) => {
    if (!isTelegramUpdate(data)) return log.err('unknown update data', { data });
    if (data.message) {
      await processTextMsg(data.message);
    }
    if (data.callback_query) {
      await processCallbackQuery(data.callback_query);
    }
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
      return telegram.sendMessage({ chat_id, text: startText, parse_mode: 'Markdown' });
    }
    if (isBotCmd(text, 'today')) {
      return telegram.sendMessage({
        text: 'Оберіть групу:',
        chat_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '1а група',
                callback_data: 'today_group_1',
              },
              {
                text: '2а група',
                callback_data: 'today_group_2',
              },
              {
                text: '3я група',
                callback_data: 'today_group_3',
              },
              {
                text: 'Всі групи',
                callback_data: 'today_group_all',
              },
            ],
          ],
        },
      });
    }
    if (isBotCmd(text, 'tomorrow')) {
      return telegram.sendMessage({
        text: 'Оберіть групу:',
        chat_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '1а група',
                callback_data: 'tomorrow_group_1',
              },
              {
                text: '2а група',
                callback_data: 'tomorrow_group_2',
              },
              {
                text: '3я група',
                callback_data: 'tomorrow_group_3',
              },
              {
                text: 'Всі групи',
                callback_data: 'tomorrow_group_all',
              },
            ],
          ],
        },
      });
    }
    if (isBotCmd(text, 'schedule_group_1')) {
      return processScheduleCmd(chat_id, new Date(), 'group 1');
    }
    if (isBotCmd(text, 'schedule_group_2')) {
      return processScheduleCmd(chat_id, new Date(), 'group 2');
    }
    if (isBotCmd(text, 'schedule_group_3')) {
      return processScheduleCmd(chat_id, new Date(), 'group 3');
    }
    if (isBotCmd(text, 'help')) {
      log.debug('sending help msg', { chat_id });
      return telegram.sendMessage({ chat_id, text: helpText, parse_mode: 'Markdown' });
    }
    if (isBotCmd(text)) {
      return sendTextMsg(chat_id, `Невідома команда "${text}" 😕`);
    }
  };

  const processCallbackQuery = async (query: TelegramCallbackQuery) => {
    const { data } = query;
    if (!data) return;
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    if (data === 'today_group_1' || data === 'schedule_group_1') {
      await processScheduleCmd(query.from.id, today, 'group 1');
    }
    if (data === 'today_group_2' || data === 'schedule_group_2') {
      await processScheduleCmd(query.from.id, today, 'group 2');
    }
    if (data === 'today_group_3' || data === 'schedule_group_3') {
      await processScheduleCmd(query.from.id, today, 'group 3');
    }
    if (data === 'today_group_all') {
      await processScheduleCmd(query.from.id, today, 'group 1');
      await processScheduleCmd(query.from.id, today, 'group 2');
      await processScheduleCmd(query.from.id, today, 'group 3');
    }
    if (data === 'tomorrow_group_1') {
      await processScheduleCmd(query.from.id, tomorrow, 'group 1');
    }
    if (data === 'tomorrow_group_2') {
      await processScheduleCmd(query.from.id, tomorrow, 'group 2');
    }
    if (data === 'tomorrow_group_3') {
      await processScheduleCmd(query.from.id, tomorrow, 'group 3');
    }
    if (data === 'tomorrow_group_all') {
      await processScheduleCmd(query.from.id, tomorrow, 'group 1');
      await processScheduleCmd(query.from.id, tomorrow, 'group 2');
      await processScheduleCmd(query.from.id, tomorrow, 'group 3');
    }
    await telegram.answerCallbackQuery({ callback_query_id: query.id });
  };

  const processScheduleCmd = async (chat_id: number, date: Date, group: ScheduleGroup) => {
    const dateStr = getDateStr(date);
    const todayHighSchedule = scheduleHigh[dateStr];
    if (!todayHighSchedule) return sendTextMsg(chat_id, `Нажаль дані відсутні 😕`);
    const lines: string[] = [`🔴 *Графік відключень ${groupToText(group)} групи на ${getDateUrkStr(date)}:*`, ''];
    for (const scheduleItem of todayHighSchedule) {
      if (scheduleItem.group === group) {
        lines.push(`🕐 \`${scheduleItem.time}\``);
      }
    }
    return telegram.sendMessage({ chat_id, text: lines.join('\n'), parse_mode: 'Markdown' });
  };

  const groupToText = (group: ScheduleGroup) => {
    switch (group) {
      case 'group 1':
        return '1-ї';
      case 'group 2':
        return '2-ї';
      case 'group 3':
        return '3-ї';
    }
  };

  const sendTextMsg = async (chatId: number | string, val: string) => telegram.sendTextMessage(chatId, val);

  return { processUpdate };
};

const getDateStr = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}-${pad(month, 2)}-${pad(day, 2)}`;
};

const getDateUrkStr = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${pad(day, 2)}.${pad(month, 2)}.${year} (${getDateUkrDayOfTheWeek(d)})`;
};

const getDateUkrDayOfTheWeek = (d: Date) => {
  const day = d.getDay();
  switch (day) {
    case 0:
      return 'Неділя';
    case 1:
      return 'Понеділок';
    case 2:
      return 'Вівторок';
    case 3:
      return 'Середа';
    case 4:
      return 'Четвер';
    case 5:
      return `П'ятниця`;
    case 6:
      return 'Субота';
  }
};
