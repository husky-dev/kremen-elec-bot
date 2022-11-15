/* eslint-disable max-len */
import { TelegramLocation } from './location';
import { TelegramUser } from './user';

/** This object represents a chat. */
export interface TelegramChat {
  /** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  id: number;
  /** Type of chat, can be either `private`, `group`, `supergroup` or `channel` */
  type: 'private' | 'group' | 'supergroup' | 'channel';
  /** Optional. Title, for supergroups, channels and group chats */
  title?: string;
  /** Optional. Username, for private chats, supergroups and channels if available */
  username?: string;
  /** Optional. First name of the other party in a private chat */
  first_name?: string;
  /** Optional. Last name of the other party in a private chat */
  last_name?: string;
  /** Optional. Chat photo. Returned only in getChat. */
  photo?: TelegramChatPhoto;
  /** Optional. Bio of the other party in a private chat. Returned only in getChat. */
  bio?: string;
  /** Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user. Returned only in getChat. */
  has_private_forwards?: boolean;
  /** Optional. True, if users need to join the supergroup before they can send messages. Returned only in getChat. */
  join_to_send_messages?: boolean;
  /** Optional. True, if all users directly joining the supergroup need to be approved by supergroup administrators. Returned only in getChat. */
  join_by_request?: boolean;
  /** Optional. Description, for groups, supergroups and channel chats. Returned only in getChat. */
  description?: string;
  /** Optional. Primary invite link, for groups, supergroups and channel chats. Returned only in getChat. */
  invite_link?: string;
  /** Optional. The most recent pinned message (by sending date). Returned only in getChat. */
  pinned_message?: TelegramMessage;
  /** Optional. Default chat member permissions, for groups and supergroups. Returned only in getChat. */
  permissions?: TelegramChatPermissions;
  /** Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds. Returned only in getChat. */
  slow_mode_delay?: number;
  /** Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat. */
  message_auto_delete_time?: number;
  /** Optional. True, if messages from the chat can't be forwarded to other chats. Returned only in getChat. */
  has_protected_content?: boolean;
  /** Optional. For supergroups, name of group sticker set. Returned only in getChat. */
  sticker_set_name?: string;
  /** Optional. True, if the bot can change the group sticker set. Returned only in getChat. */
  can_set_sticker_set?: boolean;
  /** Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat. */
  linked_chat_id?: number;
  /** Optional. For supergroups, the location to which the supergroup is connected. Returned only in getChat. */
  location?: TelegramChatLocation;
}

/** This object represents a chat photo. */
export interface TelegramChatPhoto {
  /** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  small_file_id: string;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file */
  small_file_unique_id: string;
  /** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  big_file_id: string;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  big_file_unique_id: string;
}

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface TelegramChatPermissions {
  /** Optional. True, if the user is allowed to send text messages, contacts, locations and venues */
  can_send_messages?: boolean;
  /** Optional. True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes, implies can_send_messages */
  can_send_media_messages?: boolean;
  /** Optional. True, if the user is allowed to send polls, implies can_send_messages */
  can_send_polls?: boolean;
  /** Optional. True, if the user is allowed to send animations, games, stickers and use inline bots, implies can_send_media_messages */
  can_send_other_messages?: boolean;
  /** Optional. True, if the user is allowed to add web page previews to their messages, implies can_send_media_messages */
  can_add_web_page_previews?: boolean;
  /** Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
  can_change_info?: boolean;
  /** Optional. True, if the user is allowed to invite new users to the chat */
  can_invite_users?: boolean;
  /** Optional. True, if the user is allowed to pin messages. Ignored in public supergroups */
  can_pin_messages?: boolean;
}

/** Represents a location to which a chat is connected. */
export interface TelegramChatLocation {
  /** The location to which the supergroup is connected. Can't be a live location. */
  location: TelegramLocation;
  /** Location address; 1-64 characters, as defined by the chat owner */
  address: string;
}

export interface TelegramMessage {
  /** Unique message identifier inside this chat */
  message_id: number;
  /** Optional. Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
  from?: TelegramUser;
  /** Optional. Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field from contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
  sender_chat?: TelegramChat;
  /** Date the message was sent in Unix time */
  date: number;
  /** Conversation the message belongs to */
  chat: TelegramChat;
  /** Optional. For forwarded messages, sender of the original message */
  forward_from?: TelegramUser;
  /** Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat */
  forward_from_chat?: TelegramChat;
  /** Optional. For messages forwarded from channels, identifier of the original message in the channel */
  forward_from_message_id?: number;
  /** Optional. For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present */
  forward_signature?: string;
  /** Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
  forward_sender_name?: string;
  /** Optional. For forwarded messages, date the original message was sent in Unix time */
  forward_date?: number;
  /** Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group */
  is_automatic_forward?: boolean;
  /** Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
  reply_to_message?: TelegramMessage;
  /** Optional. Bot through which the message was sent */
  via_bot?: TelegramUser;
  /** Optional. Date the message was last edited in Unix time */
  edit_date?: number;
  /** Optional. True, if the message can't be forwarded */
  has_protected_content?: boolean;
  /** Optional. The unique identifier of a media message group this message belongs to */
  media_group_id?: string;
  /** Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
  author_signature?: string;
  /** Optional. For text messages, the actual UTF-8 text of the message */
  text?: string;
}

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export interface TelegramMessageEntity {
  /** Type of the entity. Currently, can be "mention" (@username), "hashtag" (#hashtag), "cashtag" ($USD), "bot_command" (/start@jobs_bot), "url" (https://telegram.org), "email" (do-not-reply@telegram.org), "phone_number" (+1-212-555-0123), "bold" (bold text), "italic" (italic text), "underline" (underlined text), "strikethrough" (strikethrough text), "spoiler" (spoiler message), "code" (monowidth string), "pre" (monowidth block), "text_link" (for clickable text URLs), "text_mention" (for users without usernames) */
  type: string;
  /** Offset in UTF-16 code units to the start of the entity */
  offset: number;
  /** Length of the entity in UTF-16 code units */
  length: number;
  /** Optional. For "text_link" only, URL that will be opened after user taps on the text */
  url?: string;
  /** Optional. For "text_mention" only, the mentioned user */
  user?: TelegramUser;
  /** Optional. For "pre" only, the programming language of the entity text */
  language?: string;
}
