/* eslint-disable max-len */
import { TelegramInlineKeyboardMarkup } from './markup';

/** This object represents a point on the map. */
export interface TelegramLocation {
  /** Longitude as defined by sender */
  longitude: number;
  /** Latitude as defined by sender */
  latitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: number;
  /** Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
  live_period?: number;
  /** Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  heading?: number;
  /** Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  proximity_alert_radius?: number;
  /** Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
  reply_markup?: TelegramInlineKeyboardMarkup;
}
