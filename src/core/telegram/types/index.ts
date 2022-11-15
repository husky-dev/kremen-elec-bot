/* eslint-disable max-len */
import { isNum, isUnknownDict } from '@utils';

import { TelegramMessage, TelegramMessageEntity } from './chat';
import {
  TelegramForceReply,
  TelegramInlineKeyboardMarkup,
  TelegramReplyKeyboardMarkup,
  TelegramReplyKeyboardRemove,
} from './markup';
import { TelegramUser } from './user';

export type TelegramChatId = string | number;

/**
 * This object represents an incoming update. At most one of the optional parameters can be present in any given update.
 */
export interface TelegramUpdate {
  /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
  update_id: number;
  /** Optional. New incoming message of any kind - text, photo, sticker, etc. */
  message?: TelegramMessage;
  /** Optional. New version of a message that is known to the bot and was edited */
  edited_message?: TelegramMessage;
  /** Optional. New incoming channel post of any kind - text, photo, sticker, etc. */
  channel_post?: TelegramMessage;
  /** Optional. New version of a channel post that is known to the bot and was edited */
  edited_channel_post?: TelegramMessage;
  /** Optional. New incoming callback query */
  callback_query?: TelegramCallbackQuery;
}

export const isTelegramUpdate = (val: unknown): val is TelegramUpdate => isUnknownDict(val) && isNum(val.update_id);

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.
 *
 * NOTE: After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery. It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed (e.g., without specifying any of the optional parameters).
 */
export interface TelegramCallbackQuery {
  /** Unique identifier for this query */
  id: string;
  /** Sender */
  from: TelegramUser;
  /** Optional. Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old */
  message?: TelegramMessage;
  /** Optional. Identifier of the message sent via the bot in inline mode, that originated the query. */
  inline_message_id?: string;
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
  chat_instance: string;
  /** Optional. Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
  data?: string;
  /** Optional. Short name of a Game to be returned, serves as the unique identifier for the game */
  game_short_name?: string;
}

export interface TelegramSendMessage {
  /** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
  chat_id: TelegramChatId;
  /** Text of the message to be sent, 1-4096 characters after entities parsing */
  text: string;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'HTML';
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  entities?: TelegramMessageEntity[];
  /** Disables link previews for links in this message */
  disable_web_page_preview?: boolean;
  /** Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Pass True, if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
  reply_markup?: TelegramInlineKeyboardMarkup | TelegramReplyKeyboardMarkup | TelegramReplyKeyboardRemove | TelegramForceReply;
}

export interface TelegramAnswerCallbackQuery {
  /** Unique identifier for the query to be answered */
  callback_query_id: string;
  /** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
  text?: string;
  /** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
  show_alert?: boolean;
  /**
   * URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.
   *
   * Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   */
  url?: string;
  /** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
  cache_time?: number;
}

export * from './callbackGame';
export * from './chat';
export * from './location';
export * from './loginUrl';
export * from './markup';
export * from './user';
export * from './webapp';
