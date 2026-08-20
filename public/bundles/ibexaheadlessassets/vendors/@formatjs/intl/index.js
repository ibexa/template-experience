import { memoize, strategies } from "@formatjs/fast-memoize";
import { ErrorCode, FormatError, IntlMessageFormat } from "intl-messageformat";
import { TYPE } from "@formatjs/icu-messageformat-parser";
//#region packages/intl/error.ts
let IntlErrorCode = /* @__PURE__ */ function(IntlErrorCode) {
	IntlErrorCode["FORMAT_ERROR"] = "FORMAT_ERROR";
	IntlErrorCode["UNSUPPORTED_FORMATTER"] = "UNSUPPORTED_FORMATTER";
	IntlErrorCode["INVALID_CONFIG"] = "INVALID_CONFIG";
	IntlErrorCode["MISSING_DATA"] = "MISSING_DATA";
	IntlErrorCode["MISSING_TRANSLATION"] = "MISSING_TRANSLATION";
	return IntlErrorCode;
}({});
var IntlError = class IntlError extends Error {
	constructor(code, message, exception) {
		const err = exception ? exception instanceof Error ? exception : new Error(String(exception)) : void 0;
		super(`[@formatjs/intl Error ${code}] ${message}
${err ? `\n${err.message}\n${err.stack}` : ""}`);
		this.code = code;
		if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, IntlError);
	}
};
var UnsupportedFormatterError = class extends IntlError {
	constructor(message, exception) {
		super("UNSUPPORTED_FORMATTER", message, exception);
	}
};
var InvalidConfigError = class extends IntlError {
	constructor(message, exception) {
		super("INVALID_CONFIG", message, exception);
	}
};
var MissingDataError = class extends IntlError {
	constructor(message, exception) {
		super("MISSING_DATA", message, exception);
	}
};
var IntlFormatError = class extends IntlError {
	constructor(message, locale, exception) {
		super("FORMAT_ERROR", `${message}
Locale: ${locale}
`, exception);
		this.locale = locale;
	}
};
var MessageFormatError = class extends IntlFormatError {
	constructor(message, locale, descriptor, exception) {
		super(`${message}
MessageID: ${descriptor?.id}
Default Message: ${descriptor?.defaultMessage}
Description: ${descriptor?.description}
`, locale, exception);
		this.descriptor = descriptor;
		this.locale = locale;
	}
};
var MissingTranslationError = class extends IntlError {
	constructor(descriptor, locale) {
		super("MISSING_TRANSLATION", `Missing message: "${descriptor.id}" for locale "${locale}", using ${descriptor.defaultMessage ? `default message (${typeof descriptor.defaultMessage === "string" ? descriptor.defaultMessage : descriptor.defaultMessage.map((e) => e.value ?? JSON.stringify(e)).join()})` : "id"} as fallback.`);
		this.descriptor = descriptor;
	}
};
//#endregion
//#region packages/intl/utils.ts
function invariant(condition, message, Err = Error) {
	if (!condition) throw new Err(message);
}
function filterProps(props, allowlist, defaults = {}) {
	return allowlist.reduce((filtered, name) => {
		if (name in props) filtered[name] = props[name];
		else if (name in defaults) filtered[name] = defaults[name];
		return filtered;
	}, {});
}
const defaultErrorHandler = (error) => {
	if (process.env.NODE_ENV !== "production") console.error(error);
};
const defaultWarnHandler = (warning) => {
	if (process.env.NODE_ENV !== "production") console.warn(warning);
};
const DEFAULT_INTL_CONFIG = {
	formats: {},
	messages: {},
	timeZone: void 0,
	defaultLocale: "en",
	defaultFormats: {},
	fallbackOnEmptyString: true,
	onError: defaultErrorHandler,
	onWarn: defaultWarnHandler
};
function createIntlCache() {
	return {
		dateTime: {},
		number: {},
		message: {},
		relativeTime: {},
		pluralRules: {},
		list: {},
		displayNames: {}
	};
}
function createFastMemoizeCache(store) {
	return { create() {
		return {
			get(key) {
				return store[key];
			},
			set(key, value) {
				store[key] = value;
			}
		};
	} };
}
/**
* Create intl formatters and populate cache
* @param cache explicit cache to prevent leaking memory
*/
function createFormatters(cache = createIntlCache()) {
	const RelativeTimeFormat = Intl.RelativeTimeFormat;
	const ListFormat = Intl.ListFormat;
	const DisplayNames = Intl.DisplayNames;
	const getDateTimeFormat = memoize((...args) => new Intl.DateTimeFormat(...args), {
		cache: createFastMemoizeCache(cache.dateTime),
		strategy: strategies.variadic
	});
	const getNumberFormat = memoize((...args) => new Intl.NumberFormat(...args), {
		cache: createFastMemoizeCache(cache.number),
		strategy: strategies.variadic
	});
	const getPluralRules = memoize((...args) => new Intl.PluralRules(...args), {
		cache: createFastMemoizeCache(cache.pluralRules),
		strategy: strategies.variadic
	});
	return {
		getDateTimeFormat,
		getNumberFormat,
		getMessageFormat: memoize((message, locales, overrideFormats, opts) => new IntlMessageFormat(message, locales, overrideFormats, {
			formatters: {
				getNumberFormat,
				getDateTimeFormat,
				getPluralRules
			},
			...opts
		}), {
			cache: createFastMemoizeCache(cache.message),
			strategy: strategies.variadic
		}),
		getRelativeTimeFormat: memoize((...args) => new RelativeTimeFormat(...args), {
			cache: createFastMemoizeCache(cache.relativeTime),
			strategy: strategies.variadic
		}),
		getPluralRules,
		getListFormat: memoize((...args) => new ListFormat(...args), {
			cache: createFastMemoizeCache(cache.list),
			strategy: strategies.variadic
		}),
		getDisplayNames: memoize((...args) => new DisplayNames(...args), {
			cache: createFastMemoizeCache(cache.displayNames),
			strategy: strategies.variadic
		})
	};
}
function getNamedFormat(formats, type, name, onError) {
	const formatType = formats && formats[type];
	let format;
	if (formatType) format = formatType[name];
	if (format) return format;
	onError(new UnsupportedFormatterError(`No ${type} format named: ${name}`));
}
//#endregion
//#region packages/intl/message.ts
function setTimeZoneInOptions(opts, timeZone) {
	return Object.keys(opts).reduce((all, k) => {
		all[k] = {
			timeZone,
			...opts[k]
		};
		return all;
	}, {});
}
function deepMergeOptions(opts1, opts2) {
	return Object.keys({
		...opts1,
		...opts2
	}).reduce((all, k) => {
		all[k] = {
			...opts1[k],
			...opts2[k]
		};
		return all;
	}, {});
}
function deepMergeFormatsAndSetTimeZone(f1, timeZone) {
	if (!timeZone) return f1;
	const mfFormats = IntlMessageFormat.formats;
	return {
		...mfFormats,
		...f1,
		date: deepMergeOptions(setTimeZoneInOptions(mfFormats.date, timeZone), setTimeZoneInOptions(f1.date || {}, timeZone)),
		time: deepMergeOptions(setTimeZoneInOptions(mfFormats.time, timeZone), setTimeZoneInOptions(f1.time || {}, timeZone))
	};
}
function getMessageDescriptorContext(messageDescriptor) {
	const { defaultMessage } = messageDescriptor;
	try {
		return defaultMessage !== void 0 ? `\nDefault Message: ${typeof defaultMessage === "string" ? defaultMessage : JSON.stringify(defaultMessage)}` : `\nMessage Descriptor: ${JSON.stringify(messageDescriptor)}`;
	} catch {
		return "";
	}
}
const formatMessage = ({ locale, formats, messages, defaultLocale, defaultFormats, fallbackOnEmptyString, onError, timeZone, defaultRichTextElements }, state, messageDescriptor = { id: "" }, values, opts) => {
	const { id: msgId, defaultMessage } = messageDescriptor;
	if (!msgId) invariant(false, `[@formatjs/intl] An \`id\` must be provided to format a message. You can either:
1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.github.io/docs/tooling/babel-plugin)
or [@formatjs/ts-transformer](https://formatjs.github.io/docs/tooling/ts-transformer) OR
2. Configure your \`eslint\` config to include [eslint-plugin-formatjs](https://formatjs.github.io/docs/tooling/linter#enforce-id)
to autofix this issue${getMessageDescriptorContext(messageDescriptor)}`);
	const id = String(msgId);
	const message = messages && Object.prototype.hasOwnProperty.call(messages, id) && messages[id];
	if (Array.isArray(message) && message.length === 1 && message[0].type === TYPE.literal) return message[0].value;
	values = {
		...defaultRichTextElements,
		...values
	};
	formats = deepMergeFormatsAndSetTimeZone(formats, timeZone);
	defaultFormats = deepMergeFormatsAndSetTimeZone(defaultFormats, timeZone);
	if (!message) {
		if (fallbackOnEmptyString === false && message === "") return message;
		if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) onError(new MissingTranslationError(messageDescriptor, locale));
		if (defaultMessage) try {
			return state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts).format(values);
		} catch (e) {
			onError(new MessageFormatError(`Error formatting default message for: "${id}", rendering default message verbatim`, locale, messageDescriptor, e));
			return typeof defaultMessage === "string" ? defaultMessage : id;
		}
		return id;
	}
	try {
		return state.getMessageFormat(message, locale, formats, {
			formatters: state,
			...opts
		}).format(values);
	} catch (e) {
		onError(new MessageFormatError(`Error formatting message: "${id}", using ${defaultMessage ? "default message" : "id"} as fallback.`, locale, messageDescriptor, e));
	}
	if (defaultMessage) try {
		return state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts).format(values);
	} catch (e) {
		onError(new MessageFormatError(`Error formatting the default message for: "${id}", rendering message verbatim`, locale, messageDescriptor, e));
	}
	if (typeof message === "string") return message;
	if (typeof defaultMessage === "string") return defaultMessage;
	return id;
};
//#endregion
//#region packages/intl/dateTime.ts
const DATE_TIME_FORMAT_OPTIONS = [
	"formatMatcher",
	"timeZone",
	"hour12",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"hourCycle",
	"dateStyle",
	"timeStyle",
	"calendar",
	"numberingSystem",
	"fractionalSecondDigits"
];
function getFormatter$2({ locale, formats, onError, timeZone }, type, getDateTimeFormat, options = {}) {
	const { format } = options;
	const defaults = {
		...timeZone && { timeZone },
		...format && getNamedFormat(formats, type, format, onError)
	};
	let filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
	if (type === "time" && !filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second && !filteredOptions.timeStyle && !filteredOptions.dateStyle) filteredOptions = {
		...filteredOptions,
		hour: "numeric",
		minute: "numeric"
	};
	return getDateTimeFormat(locale, filteredOptions);
}
function formatDate(config, getDateTimeFormat, value, options = {}) {
	const date = typeof value === "string" ? new Date(value || 0) : value;
	try {
		return getFormatter$2(config, "date", getDateTimeFormat, options).format(date);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting date.", config.locale, e));
	}
	return String(date);
}
function formatTime(config, getDateTimeFormat, value, options = {}) {
	const date = typeof value === "string" ? new Date(value || 0) : value;
	try {
		return getFormatter$2(config, "time", getDateTimeFormat, options).format(date);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting time.", config.locale, e));
	}
	return String(date);
}
function formatDateTimeRange(config, getDateTimeFormat, from, to, options = {}) {
	const fromDate = typeof from === "string" ? new Date(from || 0) : from;
	const toDate = typeof to === "string" ? new Date(to || 0) : to;
	try {
		return getFormatter$2(config, "dateTimeRange", getDateTimeFormat, options).formatRange(fromDate, toDate);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting date time range.", config.locale, e));
	}
	return String(fromDate);
}
function formatDateToParts(config, getDateTimeFormat, value, options = {}) {
	const date = typeof value === "string" ? new Date(value || 0) : value;
	try {
		return getFormatter$2(config, "date", getDateTimeFormat, options).formatToParts(date);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting date.", config.locale, e));
	}
	return [];
}
function formatTimeToParts(config, getDateTimeFormat, value, options = {}) {
	const date = typeof value === "string" ? new Date(value || 0) : value;
	try {
		return getFormatter$2(config, "time", getDateTimeFormat, options).formatToParts(date);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting time.", config.locale, e));
	}
	return [];
}
//#endregion
//#region packages/intl/displayName.ts
const DISPLAY_NAMES_OPTONS = [
	"style",
	"type",
	"fallback",
	"languageDisplay"
];
function formatDisplayName({ locale, onError }, getDisplayNames, value, options) {
	if (!Intl.DisplayNames) onError(new FormatError(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`, ErrorCode.MISSING_INTL_API));
	const filteredOptions = filterProps(options, DISPLAY_NAMES_OPTONS);
	try {
		return getDisplayNames(locale, filteredOptions).of(value);
	} catch (e) {
		onError(new IntlFormatError("Error formatting display name.", locale, e));
	}
}
//#endregion
//#region packages/intl/list.ts
const LIST_FORMAT_OPTIONS = ["type", "style"];
const now = Date.now();
function generateToken(i) {
	return `${now}_${i}_${now}`;
}
function formatList(opts, getListFormat, values, options = {}) {
	const results = formatListToParts(opts, getListFormat, values, options).reduce((all, el) => {
		const val = el.value;
		if (typeof val !== "string") all.push(val);
		else if (typeof all[all.length - 1] === "string") all[all.length - 1] += val;
		else all.push(val);
		return all;
	}, []);
	return results.length === 1 ? results[0] : results.length === 0 ? "" : results;
}
function formatListToParts({ locale, onError }, getListFormat, values, options = {}) {
	if (!Intl.ListFormat) onError(new FormatError(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`, ErrorCode.MISSING_INTL_API));
	const filteredOptions = filterProps(options, LIST_FORMAT_OPTIONS);
	try {
		const richValues = {};
		const serializedValues = Array.from(values).map((v, i) => {
			if (typeof v === "object" && v !== null) {
				const id = generateToken(i);
				richValues[id] = v;
				return id;
			}
			return String(v);
		});
		return getListFormat(locale, filteredOptions).formatToParts(serializedValues).map((part) => part.type === "literal" ? part : {
			...part,
			value: richValues[part.value] || part.value
		});
	} catch (e) {
		onError(new IntlFormatError("Error formatting list.", locale, e));
	}
	return values;
}
//#endregion
//#region packages/intl/plural.ts
const PLURAL_FORMAT_OPTIONS = ["type"];
function formatPlural({ locale, onError }, getPluralRules, value, options = {}) {
	if (!Intl.PluralRules) onError(new FormatError(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, ErrorCode.MISSING_INTL_API));
	const filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
	try {
		return getPluralRules(locale, filteredOptions).select(value);
	} catch (e) {
		onError(new IntlFormatError("Error formatting plural.", locale, e));
	}
	return "other";
}
//#endregion
//#region packages/intl/relativeTime.ts
const RELATIVE_TIME_FORMAT_OPTIONS = ["numeric", "style"];
function getFormatter$1({ locale, formats, onError }, getRelativeTimeFormat, options = {}) {
	const { format } = options;
	const defaults = !!format && getNamedFormat(formats, "relative", format, onError) || {};
	return getRelativeTimeFormat(locale, filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults));
}
function formatRelativeTime(config, getRelativeTimeFormat, value, unit, options = {}) {
	if (!unit) unit = "second";
	if (!Intl.RelativeTimeFormat) config.onError(new FormatError(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`, ErrorCode.MISSING_INTL_API));
	try {
		return getFormatter$1(config, getRelativeTimeFormat, options).format(value, unit);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting relative time.", config.locale, e));
	}
	return String(value);
}
//#endregion
//#region packages/intl/number.ts
const NUMBER_FORMAT_OPTIONS = [
	"style",
	"currency",
	"unit",
	"unitDisplay",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"currencyDisplay",
	"currencySign",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"numberingSystem",
	"trailingZeroDisplay",
	"roundingPriority",
	"roundingIncrement",
	"roundingMode"
];
function getFormatter({ locale, formats, onError }, getNumberFormat, options = {}) {
	const { format } = options;
	const defaults = format && getNamedFormat(formats, "number", format, onError) || {};
	return getNumberFormat(locale, filterProps(options, NUMBER_FORMAT_OPTIONS, defaults));
}
function formatNumber(config, getNumberFormat, value, options = {}) {
	try {
		return getFormatter(config, getNumberFormat, options).format(value);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting number.", config.locale, e));
	}
	return String(value);
}
function formatNumberToParts(config, getNumberFormat, value, options = {}) {
	try {
		return getFormatter(config, getNumberFormat, options).formatToParts(value);
	} catch (e) {
		config.onError(new IntlFormatError("Error formatting number.", config.locale, e));
	}
	return [];
}
//#endregion
//#region packages/intl/create-intl.ts
function messagesContainString(messages) {
	return typeof (messages ? messages[Object.keys(messages)[0]] : void 0) === "string";
}
function verifyConfigMessages(config) {
	if (config.onWarn && config.defaultRichTextElements && messagesContainString(config.messages || {})) config.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.github.io/docs/getting-started/message-distribution`);
}
/**
* Create intl object
* @param config intl config
* @param cache cache for formatter instances to prevent memory leak
*/
function createIntl(config, cache) {
	const formatters = createFormatters(cache);
	const resolvedConfig = {
		...DEFAULT_INTL_CONFIG,
		...config
	};
	const { locale, defaultLocale, onError } = resolvedConfig;
	if (!locale) {
		if (onError) onError(new InvalidConfigError(`"locale" was not configured, using "${defaultLocale}" as fallback. See https://formatjs.github.io/docs/react-intl/api#intlshape for more details`));
		resolvedConfig.locale = resolvedConfig.defaultLocale || "en";
	} else if (!Intl.NumberFormat.supportedLocalesOf(locale).length && onError) onError(new MissingDataError(`Missing locale data for locale: "${locale}" in Intl.NumberFormat. Using default locale: "${defaultLocale}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`));
	else if (!Intl.DateTimeFormat.supportedLocalesOf(locale).length && onError) onError(new MissingDataError(`Missing locale data for locale: "${locale}" in Intl.DateTimeFormat. Using default locale: "${defaultLocale}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`));
	verifyConfigMessages(resolvedConfig);
	return {
		...resolvedConfig,
		formatters,
		formatNumber: formatNumber.bind(null, resolvedConfig, formatters.getNumberFormat),
		formatNumberToParts: formatNumberToParts.bind(null, resolvedConfig, formatters.getNumberFormat),
		formatRelativeTime: formatRelativeTime.bind(null, resolvedConfig, formatters.getRelativeTimeFormat),
		formatDate: formatDate.bind(null, resolvedConfig, formatters.getDateTimeFormat),
		formatDateToParts: formatDateToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat),
		formatTime: formatTime.bind(null, resolvedConfig, formatters.getDateTimeFormat),
		formatDateTimeRange: formatDateTimeRange.bind(null, resolvedConfig, formatters.getDateTimeFormat),
		formatTimeToParts: formatTimeToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat),
		formatPlural: formatPlural.bind(null, resolvedConfig, formatters.getPluralRules),
		formatMessage: formatMessage.bind(null, resolvedConfig, formatters),
		$t: formatMessage.bind(null, resolvedConfig, formatters),
		formatList: formatList.bind(null, resolvedConfig, formatters.getListFormat),
		formatListToParts: formatListToParts.bind(null, resolvedConfig, formatters.getListFormat),
		formatDisplayName: formatDisplayName.bind(null, resolvedConfig, formatters.getDisplayNames)
	};
}
//#endregion
//#region packages/intl/index.ts
function defineMessages(msgs) {
	return msgs;
}
function defineMessage(msg) {
	return msg;
}
//#endregion
export { DEFAULT_INTL_CONFIG, IntlError, IntlErrorCode, IntlFormatError, InvalidConfigError, MessageFormatError, MissingDataError, MissingTranslationError, UnsupportedFormatterError, createFormatters, createIntl, createIntlCache, defineMessage, defineMessages, filterProps, formatDate, formatDateToParts, formatDisplayName, formatList, formatMessage, formatNumber, formatNumberToParts, formatPlural, formatRelativeTime, formatTime, formatTimeToParts, getNamedFormat };

//# sourceMappingURL=index.js.map