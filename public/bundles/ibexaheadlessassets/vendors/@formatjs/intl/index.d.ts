import { FormatError, FormatXMLElementFn, Formats, Formatters as Formatters$1, IntlMessageFormat, Options, PrimitiveType } from "intl-messageformat";
import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
//#region packages/ecma402-abstract/types/number.d.ts
type NumberFormatNotation = "standard" | "scientific" | "engineering" | "compact";
type RoundingPriorityType = "auto" | "morePrecision" | "lessPrecision";
type RoundingModeType = "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven";
type UseGroupingType = "min2" | "auto" | "always" | boolean;
interface NumberFormatDigitOptions {
  minimumIntegerDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  roundingPriority?: RoundingPriorityType;
  roundingIncrement?: number;
  roundingMode?: RoundingModeType;
  trailingZeroDisplay?: TrailingZeroDisplay;
}
type NumberFormatOptionsLocaleMatcher = "lookup" | "best fit";
type NumberFormatOptionsStyle = "decimal" | "percent" | "currency" | "unit";
type NumberFormatOptionsCompactDisplay = "short" | "long";
type NumberFormatOptionsCurrencyDisplay = "symbol" | "code" | "name" | "narrowSymbol";
type NumberFormatOptionsCurrencySign = "standard" | "accounting";
type NumberFormatOptionsNotation = NumberFormatNotation;
type NumberFormatOptionsSignDisplay = "auto" | "always" | "never" | "exceptZero" | "negative";
type NumberFormatOptionsUnitDisplay = "long" | "short" | "narrow";
type TrailingZeroDisplay = "auto" | "stripIfInteger";
type NumberFormatOptions = Omit<Intl.NumberFormatOptions, "signDisplay" | "useGrouping"> & NumberFormatDigitOptions & {
  localeMatcher?: NumberFormatOptionsLocaleMatcher;
  style?: NumberFormatOptionsStyle;
  compactDisplay?: NumberFormatOptionsCompactDisplay;
  currencyDisplay?: NumberFormatOptionsCurrencyDisplay;
  currencySign?: NumberFormatOptionsCurrencySign;
  notation?: NumberFormatOptionsNotation;
  signDisplay?: NumberFormatOptionsSignDisplay;
  unit?: string;
  unitDisplay?: NumberFormatOptionsUnitDisplay;
  numberingSystem?: string;
  trailingZeroDisplay?: TrailingZeroDisplay;
  roundingPriority?: RoundingPriorityType;
  roundingIncrement?: number;
  roundingMode?: RoundingModeType;
  useGrouping?: UseGroupingType;
};
//#endregion
//#region packages/intl/error.d.ts
declare enum IntlErrorCode {
  FORMAT_ERROR = "FORMAT_ERROR",
  UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER",
  INVALID_CONFIG = "INVALID_CONFIG",
  MISSING_DATA = "MISSING_DATA",
  MISSING_TRANSLATION = "MISSING_TRANSLATION"
}
declare class IntlError<T extends IntlErrorCode = IntlErrorCode.FORMAT_ERROR> extends Error {
  readonly code: T;
  constructor(code: T, message: string, exception?: Error | unknown);
}
declare class UnsupportedFormatterError extends IntlError<IntlErrorCode.UNSUPPORTED_FORMATTER> {
  constructor(message: string, exception?: Error | unknown);
}
declare class InvalidConfigError extends IntlError<IntlErrorCode.INVALID_CONFIG> {
  constructor(message: string, exception?: Error | unknown);
}
declare class MissingDataError extends IntlError<IntlErrorCode.MISSING_DATA> {
  constructor(message: string, exception?: Error | unknown);
}
declare class IntlFormatError extends IntlError<IntlErrorCode.FORMAT_ERROR> {
  readonly descriptor?: MessageDescriptor;
  readonly locale: string;
  constructor(message: string, locale: string, exception?: Error | unknown);
}
declare class MessageFormatError extends IntlFormatError {
  readonly descriptor?: MessageDescriptor;
  readonly locale: string;
  constructor(message: string, locale: string, descriptor?: MessageDescriptor, exception?: Error | unknown);
}
declare class MissingTranslationError extends IntlError<IntlErrorCode.MISSING_TRANSLATION> {
  readonly descriptor?: MessageDescriptor;
  constructor(descriptor: MessageDescriptor, locale: string);
}
//#endregion
//#region packages/intl/utils.d.ts
declare function filterProps<T extends Record<string, any>, K extends string>(props: T, allowlist: Array<K>, defaults?: Partial<T>): Pick<T, K>;
declare const DEFAULT_INTL_CONFIG: Pick<ResolvedIntlConfig<any>, "fallbackOnEmptyString" | "formats" | "messages" | "timeZone" | "defaultLocale" | "defaultFormats" | "onError" | "onWarn">;
declare function createIntlCache(): IntlCache;
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
declare function createFormatters(cache?: IntlCache): Formatters;
declare function getNamedFormat<T extends keyof CustomFormats>(formats: CustomFormats, type: T, name: string, onError: OnErrorFn): NumberFormatOptions | Intl.DateTimeFormatOptions | Intl.RelativeTimeFormatOptions | undefined;
//#endregion
//#region packages/intl/types.d.ts
interface Part<T = string> {
  type: "element" | "literal";
  value: T;
}
declare global {
  namespace FormatjsIntl {
    interface Message {}
    interface IntlConfig {}
    interface Formats {}
  }
}
type MessageIds = FormatjsIntl.Message extends {
  ids: infer T;
} ? T extends string ? T : string : string;
type Locale = FormatjsIntl.IntlConfig extends {
  locale: infer T;
} ? T extends string ? T : string : string;
type OnErrorFn = (err: MissingTranslationError | MessageFormatError | MissingDataError | InvalidConfigError | UnsupportedFormatterError | FormatError) => void;
type OnWarnFn = (warning: string) => void;
/**
 * Config for intl object.
 * Generic type T is the type of potential rich text element. For example:
 * With React, T would be React.ReactNode
 */
interface ResolvedIntlConfig<T = string> {
  locale: Locale;
  timeZone?: string;
  fallbackOnEmptyString?: boolean;
  formats: CustomFormats;
  messages: Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>;
  defaultLocale: string;
  defaultFormats: CustomFormats;
  defaultRichTextElements?: Record<string, FormatXMLElementFn<T>>;
  onError: OnErrorFn;
  onWarn?: OnWarnFn;
}
interface CustomFormats extends Partial<Formats> {
  relative?: Record<string, Intl.RelativeTimeFormatOptions>;
  dateTimeRange?: Record<string, Intl.DateTimeFormatOptions>;
}
interface CustomFormatConfig<Source = string> {
  format?: Source extends keyof FormatjsIntl.Formats ? FormatjsIntl.Formats[Source] : string;
}
type FormatDateTimeRangeOptions = Omit<Intl.DateTimeFormatOptions, "localeMatcher"> & CustomFormatConfig<"dateTimeRange">;
type FormatDateOptions = Omit<Intl.DateTimeFormatOptions, "localeMatcher"> & CustomFormatConfig<"date">;
type FormatTimeOptions = Omit<Intl.DateTimeFormatOptions, "localeMatcher"> & CustomFormatConfig<"time">;
type FormatNumberOptions = Omit<NumberFormatOptions, "localeMatcher"> & CustomFormatConfig<"number">;
type FormatRelativeTimeOptions = Omit<Intl.RelativeTimeFormatOptions, "localeMatcher"> & CustomFormatConfig<"time">;
type FormatPluralOptions = Omit<Intl.PluralRulesOptions, "localeMatcher"> & CustomFormatConfig;
type FormatListOptions = Omit<Intl.ListFormatOptions, "localeMatcher">;
type FormatDisplayNameOptions = Omit<Intl.DisplayNamesOptions, "localeMatcher">;
/**
 * `TBase` is the type constraints of the rich text element in the formatted output.
 * For example, with React, `TBase` should be `React.ReactNode`.
 */
interface IntlFormatters<TBase = unknown> {
  formatDateTimeRange(this: void, from: Parameters<Intl.DateTimeFormat["formatRange"]>[0] | string, to: Parameters<Intl.DateTimeFormat["formatRange"]>[1] | string, opts?: FormatDateTimeRangeOptions): string;
  formatDate(this: void, value: Parameters<Intl.DateTimeFormat["format"]>[0] | string, opts?: FormatDateOptions): string;
  formatTime(this: void, value: Parameters<Intl.DateTimeFormat["format"]>[0] | string, opts?: FormatTimeOptions): string;
  formatDateToParts(this: void, value: Parameters<Intl.DateTimeFormat["format"]>[0] | string, opts?: FormatDateOptions): Intl.DateTimeFormatPart[];
  formatTimeToParts(this: void, value: Parameters<Intl.DateTimeFormat["format"]>[0] | string, opts?: FormatDateOptions): Intl.DateTimeFormatPart[];
  formatRelativeTime(this: void, value: Parameters<Intl.RelativeTimeFormat["format"]>[0], unit?: Parameters<Intl.RelativeTimeFormat["format"]>[1], opts?: FormatRelativeTimeOptions): string;
  formatNumber(this: void, value: Parameters<Intl.NumberFormat["format"]>[0], opts?: FormatNumberOptions): string;
  formatNumberToParts(this: void, value: Parameters<Intl.NumberFormat["format"]>[0], opts?: FormatNumberOptions): Intl.NumberFormatPart[];
  formatPlural(this: void, value: Parameters<Intl.PluralRules["select"]>[0], opts?: FormatPluralOptions): ReturnType<Intl.PluralRules["select"]>;
  formatMessage(this: void, descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>, opts?: Options): string;
  formatMessage<T extends TBase, TValue extends T | FormatXMLElementFn<T>>(this: void, descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | TValue>, opts?: Options): string | T | Array<string | T>;
  $t(this: void, descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>, opts?: Options): string;
  $t<T extends TBase>(this: void, descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T>>, opts?: Options): string | T | (T | string)[];
  formatList(this: void, values: Iterable<string>, opts?: FormatListOptions): string;
  formatList<T extends TBase>(this: void, values: Iterable<string | T>, opts?: FormatListOptions): T | string | (string | T)[];
  formatListToParts<T extends TBase>(this: void, values: Iterable<string | T>, opts?: FormatListOptions): Part[];
  formatDisplayName(this: void, value: Parameters<Intl.DisplayNames["of"]>[0], opts: FormatDisplayNameOptions): string | undefined;
}
interface Formatters {
  getDateTimeFormat(this: void, ...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat;
  getNumberFormat(this: void, locales?: string | string[], opts?: NumberFormatOptions): Intl.NumberFormat;
  getMessageFormat(this: void, ...args: ConstructorParameters<typeof IntlMessageFormat>): IntlMessageFormat;
  getRelativeTimeFormat(this: void, ...args: ConstructorParameters<typeof Intl.RelativeTimeFormat>): Intl.RelativeTimeFormat;
  getPluralRules(this: void, ...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
  getListFormat(this: void, ...args: ConstructorParameters<typeof Intl.ListFormat>): Intl.ListFormat;
  getDisplayNames(this: void, ...args: ConstructorParameters<typeof Intl.DisplayNames>): Intl.DisplayNames;
}
interface IntlShape<T = string> extends ResolvedIntlConfig<T>, IntlFormatters<T> {
  formatters: Formatters;
}
interface IntlCache {
  dateTime: Record<string, Intl.DateTimeFormat>;
  number: Record<string, Intl.NumberFormat>;
  message: Record<string, IntlMessageFormat>;
  relativeTime: Record<string, Intl.RelativeTimeFormat>;
  pluralRules: Record<string, Intl.PluralRules>;
  list: Record<string, Intl.ListFormat>;
  displayNames: Record<string, Intl.DisplayNames>;
}
interface MessageDescriptor {
  id?: MessageIds;
  description?: string | object;
  defaultMessage?: string | MessageFormatElement[];
}
type IntlConfig<T = string> = Omit<ResolvedIntlConfig<T>, keyof typeof DEFAULT_INTL_CONFIG> & Partial<typeof DEFAULT_INTL_CONFIG>;
//#endregion
//#region packages/intl/message.d.ts
type FormatMessageFn<T> = ({ locale, formats, messages, defaultLocale, defaultFormats, fallbackOnEmptyString, onError, timeZone, defaultRichTextElements }: {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  defaultLocale: string;
  defaultFormats: CustomFormats;
  defaultRichTextElements?: Record<string, FormatXMLElementFn<T>>;
  fallbackOnEmptyString?: boolean;
  onError: OnErrorFn;
}, state: Formatters$1 & Pick<Formatters, "getMessageFormat">, messageDescriptor: MessageDescriptor, values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T>>, opts?: Options) => T extends string ? string : Array<T | string> | string | T;
declare const formatMessage: FormatMessageFn<any>;
//#endregion
//#region packages/intl/dateTime.d.ts
declare function formatDate(config: {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getDateTimeFormat: Formatters["getDateTimeFormat"], value: Parameters<IntlFormatters["formatDate"]>[0], options?: Parameters<IntlFormatters["formatDate"]>[1]): string;
declare function formatTime(config: {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getDateTimeFormat: Formatters["getDateTimeFormat"], value: Parameters<IntlFormatters["formatTime"]>[0], options?: Parameters<IntlFormatters["formatTime"]>[1]): string;
declare function formatDateToParts(config: {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getDateTimeFormat: Formatters["getDateTimeFormat"], value: Parameters<IntlFormatters["formatDate"]>[0], options?: Parameters<IntlFormatters["formatDate"]>[1]): Intl.DateTimeFormatPart[];
declare function formatTimeToParts(config: {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getDateTimeFormat: Formatters["getDateTimeFormat"], value: Parameters<IntlFormatters["formatTimeToParts"]>[0], options?: Parameters<IntlFormatters["formatTimeToParts"]>[1]): Intl.DateTimeFormatPart[];
//#endregion
//#region packages/intl/displayName.d.ts
declare function formatDisplayName({ locale, onError }: {
  locale: string;
  onError: OnErrorFn;
}, getDisplayNames: Formatters["getDisplayNames"], value: Parameters<IntlFormatters["formatDisplayName"]>[0], options: Parameters<IntlFormatters["formatDisplayName"]>[1]): string | undefined;
//#endregion
//#region packages/intl/list.d.ts
declare function formatList(opts: {
  locale: string;
  onError: OnErrorFn;
}, getListFormat: Formatters["getListFormat"], values: Iterable<string>, options: Parameters<IntlFormatters["formatList"]>[1]): string;
//#endregion
//#region packages/intl/plural.d.ts
declare function formatPlural({ locale, onError }: {
  locale: string;
  onError: OnErrorFn;
}, getPluralRules: Formatters["getPluralRules"], value: Parameters<IntlFormatters["formatPlural"]>[0], options?: Parameters<IntlFormatters["formatPlural"]>[1]): Intl.LDMLPluralRule;
//#endregion
//#region packages/intl/relativeTime.d.ts
declare function formatRelativeTime(config: {
  locale: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getRelativeTimeFormat: Formatters["getRelativeTimeFormat"], value: Parameters<IntlFormatters["formatRelativeTime"]>[0], unit?: Parameters<IntlFormatters["formatRelativeTime"]>[1], options?: Parameters<IntlFormatters["formatRelativeTime"]>[2]): string;
//#endregion
//#region packages/intl/number.d.ts
declare function formatNumber(config: {
  locale: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getNumberFormat: Formatters["getNumberFormat"], value: Parameters<IntlFormatters["formatNumber"]>[0], options?: Parameters<IntlFormatters["formatNumber"]>[1]): string;
declare function formatNumberToParts(config: {
  locale: string;
  formats: CustomFormats;
  onError: OnErrorFn;
}, getNumberFormat: Formatters["getNumberFormat"], value: Parameters<IntlFormatters["formatNumber"]>[0], options?: Parameters<IntlFormatters["formatNumber"]>[1]): Intl.NumberFormatPart[];
//#endregion
//#region packages/intl/create-intl.d.ts
interface CreateIntlFn<T = string, C extends IntlConfig<T> = IntlConfig<T>, S extends IntlShape<T> = IntlShape<T>> {
  (config: C, cache?: IntlCache): S;
}
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
declare function createIntl<T = string>(config: IntlConfig<T>, cache?: IntlCache): IntlShape<T>;
//#endregion
//#region packages/intl/index.d.ts
declare function defineMessages<K extends keyof any, T = MessageDescriptor, U extends Record<K, T> = Record<K, T>>(msgs: U): U;
declare function defineMessage<T>(msg: T): T;
//#endregion
export { type CreateIntlFn, CustomFormatConfig, CustomFormats, DEFAULT_INTL_CONFIG, FormatDateOptions, FormatDateTimeRangeOptions, FormatDisplayNameOptions, FormatListOptions, type FormatMessageFn, FormatNumberOptions, FormatPluralOptions, FormatRelativeTimeOptions, FormatTimeOptions, Formatters, IntlCache, IntlConfig, IntlError, IntlErrorCode, IntlFormatError, IntlFormatters, IntlShape, InvalidConfigError, MessageDescriptor, MessageFormatError, MissingDataError, MissingTranslationError, OnErrorFn, OnWarnFn, Part, ResolvedIntlConfig, UnsupportedFormatterError, createFormatters, createIntl, createIntlCache, defineMessage, defineMessages, filterProps, formatDate, formatDateToParts, formatDisplayName, formatList, formatMessage, formatNumber, formatNumberToParts, formatPlural, formatRelativeTime, formatTime, formatTimeToParts, getNamedFormat };
//# sourceMappingURL=index.d.ts.map