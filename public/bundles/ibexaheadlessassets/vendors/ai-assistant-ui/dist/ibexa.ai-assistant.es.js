import { Component as e, createContext as t, createElement as n, forwardRef as r, useCallback as i, useContext as a, useEffect as o, useImperativeHandle as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { IntlProvider as h, useIntl as g } from "react-intl";
import { Marked as _ } from "marked";
import { InView as v } from "react-intersection-observer";
import { createPortal as y } from "react-dom";
//#region \0rolldown/runtime.js
var b = Object.create, x = Object.defineProperty, S = Object.getOwnPropertyDescriptor, C = Object.getOwnPropertyNames, w = Object.getPrototypeOf, T = Object.prototype.hasOwnProperty, E = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), D = (e, t) => {
	let n = {};
	for (var r in e) x(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || x(n, Symbol.toStringTag, { value: "Module" }), n;
}, O = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = C(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !T.call(e, s) && s !== n && x(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = S(t, s)) || r.enumerable
	});
	return e;
}, k = (e, t, n) => (n = e == null ? {} : b(w(e)), O(t || !e || !e.__esModule || !T.call(e, "default") ? x(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), A = class {
	recognition;
	constructor(e = {}) {
		this.recognition = new (window.SpeechRecognition ?? window.webkitSpeechRecognition)(), this.recognition.continuous = !0, this.recognition.interimResults = !0, this.recognition.lang = e.lang ?? "en-US";
	}
	static isSupported() {
		return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
	}
	start() {
		this.recognition.start();
	}
	stop() {
		this.recognition.stop();
	}
	onEnd(e) {
		let t = new AbortController();
		return this.recognition.addEventListener("end", () => {
			e();
		}, { signal: t.signal }), () => {
			t.abort();
		};
	}
	onError(e) {
		let t = new AbortController();
		return this.recognition.addEventListener("error", (t) => {
			e(Error(t.error));
		}, { signal: t.signal }), () => {
			t.abort();
		};
	}
	onTranscript(e) {
		let t = new AbortController();
		return this.recognition.addEventListener("result", (t) => {
			let n = "";
			for (let e = 0; e < t.results.length; e++) n += t.results[e][0].transcript;
			e(n);
		}, { signal: t.signal }), () => {
			t.abort();
		};
	}
}, j = [
	"B",
	"KB",
	"MB",
	"GB"
], ee = (e, t, n = "B", r = 2) => {
	let i = j.indexOf(n), a = j.indexOf(t);
	if (!Number.isFinite(e)) throw Error(`size must be a finite number, got: ${e}`);
	if (i === -1) throw Error(`Invalid source unit: "${n}"`);
	if (a === -1) throw Error(`Invalid target unit: "${t}"`);
	if (!Number.isInteger(r) || r < 0) throw Error(`decimalPlaces must be a non-negative integer, got: ${r}`);
	let o = e / 1024 ** (a - i), s = 10 ** r;
	return Math.round(o * s) / s;
}, te = {
	modes: [
		"text",
		"file",
		"voice"
	],
	SpeechRecognitionClass: A,
	text: {
		maxLength: 5e3,
		growth: "growth"
	},
	file: {
		maxSize: ee(10, "B", "MB"),
		allowedTypes: ["*/*"]
	},
	voice: { lang: "en-US" }
}, ne = {
	...te,
	inputRef: {
		set: () => {},
		get: () => null
	}
}, re = t(ne), ie = (e, t) => {
	let n = { ...e };
	if (t) for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}, M = ({ config: e = {}, children: t }) => {
	let n = u(null), r = i((e) => {
		n.current = e;
	}, []), a = i(() => n.current, []), o = l(() => ({
		modes: e.modes ?? te.modes,
		SpeechRecognitionClass: te.SpeechRecognitionClass,
		text: ie(te.text, e.text),
		file: ie(te.file, e.file),
		voice: ie(te.voice, e.voice),
		inputRef: {
			set: r,
			get: a
		}
	}), [
		e,
		r,
		a
	]);
	return /* @__PURE__ */ p(re.Provider, {
		value: o,
		children: t
	});
}, ae = (e, { onConfirm: t }) => {
	window.confirm(e) && t();
}, N = t(ae), oe = class {
	type;
	message;
	originalError;
	constructor(e, t, n) {
		this.type = e, this.message = t, this.originalError = n;
	}
	getType() {
		return this.type;
	}
	getMessage() {
		return this.message;
	}
	getOriginalError() {
		return this.originalError;
	}
}, se = t(null), ce = {
	didCatch: !1,
	error: null
}, le = class extends e {
	constructor(e) {
		super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = ce;
	}
	static getDerivedStateFromError(e) {
		return {
			didCatch: !0,
			error: e
		};
	}
	resetErrorBoundary(...e) {
		let { error: t } = this.state;
		t !== null && (this.props.onReset?.({
			args: e,
			reason: "imperative-api"
		}), this.setState(ce));
	}
	componentDidCatch(e, t) {
		this.props.onError?.(e, t);
	}
	componentDidUpdate(e, t) {
		let { didCatch: n } = this.state, { resetKeys: r } = this.props;
		n && t.error !== null && P(e.resetKeys, r) && (this.props.onReset?.({
			next: r,
			prev: e.resetKeys,
			reason: "keys"
		}), this.setState(ce));
	}
	render() {
		let { children: e, fallbackRender: t, FallbackComponent: r, fallback: i } = this.props, { didCatch: a, error: o } = this.state, s = e;
		if (a) {
			let e = {
				error: o,
				resetErrorBoundary: this.resetErrorBoundary
			};
			if (typeof t == "function") s = t(e);
			else if (r) s = n(r, e);
			else if (i !== void 0) s = i;
			else throw o;
		}
		return n(se.Provider, { value: {
			didCatch: a,
			error: o,
			resetErrorBoundary: this.resetErrorBoundary
		} }, s);
	}
};
function P(e = [], t = []) {
	return e.length !== t.length || e.some((e, n) => !Object.is(e, t[n]));
}
//#endregion
//#region lib/types.ts
var ue = "floating", de = t({ name: "" }), F = t({
	id: "",
	name: ""
}), fe = t({ onError: () => {} }), I = () => crypto.randomUUID(), L = new class {
	addDefaultParameters(e) {
		return {
			...e,
			serverId: e.status === "done" ? e.id : null
		};
	}
	finalizeMessage(e, t, n) {
		return {
			...e,
			serverId: t,
			status: "done",
			...n
		};
	}
	createLoadingMessage(e, t) {
		return this.addDefaultParameters({
			id: e,
			type: "loading",
			role: t,
			status: "pending"
		});
	}
	createErrorMessage(e, t, n) {
		return this.addDefaultParameters({
			id: e,
			type: "error",
			role: t,
			text: n,
			status: "done"
		});
	}
	createTextMessage(e, t, n, r = "pending") {
		return this.addDefaultParameters({
			id: e,
			type: "text",
			role: t,
			text: n,
			status: r
		});
	}
	createStreamedTextMessage(e, t, n, r = "pending") {
		return this.addDefaultParameters({
			id: e,
			type: "streamed_text",
			role: t,
			stream: n,
			status: r
		});
	}
	createVideoMessage(e, t, n, r = "pending", i) {
		return this.addDefaultParameters({
			id: e,
			type: "video",
			role: t,
			url: n,
			fileType: i,
			status: r
		});
	}
	createWelcomeMessage(e, t) {
		return {
			id: "welcome",
			type: "welcome",
			text: e,
			suggestions: t,
			status: "done"
		};
	}
	createImageMessage(e, t, n, r = "pending") {
		return {
			id: e,
			type: "image",
			role: t,
			url: n,
			status: r
		};
	}
	createToolMessage(e, t, n = "pending") {
		return this.addDefaultParameters({
			id: e,
			type: "tool",
			role: "tool",
			text: t,
			status: n
		});
	}
	createCompoundMessage(e, t, n, r = "pending") {
		let i = n.map((e) => ({
			...e,
			id: I(),
			status: "done"
		}));
		return this.addDefaultParameters({
			id: e,
			type: "compound",
			role: t,
			messages: i,
			status: r
		});
	}
}(), R = class {
	static CAPABILITY_SEARCH_CONVERSATIONS = 1;
	static CAPABILITY_FETCH_AGENTS = 2;
	context = {};
	activeConversation = null;
	getContext() {
		return this.context;
	}
	setContext(e) {
		return this.context = e, this.activeConversation?.setContext?.(e);
	}
	setActiveConversation(e) {
		this.activeConversation = e;
	}
	supports(e) {
		return !1;
	}
}, pe = class {
	onChangeCallbacks = [];
	onChange(e) {
		return this.onChangeCallbacks.push(e), () => {
			this.removeOnChange(e);
		};
	}
	removeOnChange(e) {
		this.onChangeCallbacks = this.onChangeCallbacks.filter((t) => t !== e);
	}
	clearOnChangeCallbacks() {
		this.onChangeCallbacks = [];
	}
	emitChange() {
		this.onChangeCallbacks.forEach((e) => e());
	}
}, me = class {
	onMessageCallbacks = [];
	messageQueue = [];
	isEmitting = !1;
	enableMessageEmitting() {
		this.isEmitting = !0, this.flushMessageQueue();
	}
	onMessage(e) {
		return this.isEmitting = !0, this.onMessageCallbacks.push(e), () => {
			this.removeOnMessage(e);
		};
	}
	removeOnMessage(e) {
		this.onMessageCallbacks = this.onMessageCallbacks.filter((t) => t !== e), this.onMessageCallbacks.length === 0 && (this.isEmitting = !1);
	}
	clearOnMessageCallbacks() {
		this.isEmitting = !1, this.onMessageCallbacks = [];
	}
	emitMessage(e) {
		this.messageQueue.push(e), this.isEmitting && this.flushMessageQueue();
	}
	flushMessageQueue() {
		for (; this.messageQueue.length > 0;) {
			let e = this.messageQueue[0], t = this.messageQueue.length === 1;
			this.onMessageCallbacks.forEach((n) => n(e, t)), this.messageQueue.shift();
		}
	}
}, he = class {
	static DEFAULT_LOAD_LIMIT = 10;
	id;
	createdAt = /* @__PURE__ */ new Date();
	updatedAt = null;
	subject = "";
	conversationEmitter = new pe();
	messageEmitter = new me();
	constructor({ id: e, subject: t = "", createdAt: n = /* @__PURE__ */ new Date(), updatedAt: r = null }) {
		this.id = e, this.subject = t, this.createdAt = n, this.updatedAt = r;
	}
	getId() {
		return this.id;
	}
	getSubject() {
		return this.subject;
	}
	setSubject(e) {
		this.subject = e, this.conversationEmitter.emitChange();
	}
	getCreatedAt() {
		return this.createdAt;
	}
	getUpdatedAt() {
		return this.updatedAt || this.createdAt;
	}
	onChange(e) {
		return this.conversationEmitter.onChange(e);
	}
	onMessage(e) {
		let t = this.messageEmitter.onMessage(e);
		return this.messageEmitter.enableMessageEmitting(), t;
	}
	async transformFile(e) {
		return new Promise((t) => {
			let n = new FileReader();
			n.onloadend = function() {
				t(n.result);
			}, n.readAsDataURL(e);
		});
	}
	createPendingMessage(e) {
		return e.length === 1 ? e[0] : L.createCompoundMessage(e[0].id, e[0].role, e);
	}
	getRandomUniqueId() {
		return I();
	}
}, ge = class extends TransformStream {
	#e = "";
	constructor(e = { allowCR: !1 }) {
		super({
			transform: (t, n) => {
				for (t = this.#e + t;;) {
					let r = t.indexOf("\n"), i = e.allowCR ? t.indexOf("\r") : -1;
					if (i !== -1 && i !== t.length - 1 && (r === -1 || r - 1 > i)) {
						n.enqueue(t.slice(0, i)), t = t.slice(i + 1);
						continue;
					}
					if (r === -1) break;
					let a = t[r - 1] === "\r" ? r - 1 : r;
					n.enqueue(t.slice(0, a)), t = t.slice(r + 1);
				}
				this.#e = t;
			},
			flush: (t) => {
				if (this.#e === "") return;
				let n = e.allowCR && this.#e.endsWith("\r") ? this.#e.slice(0, -1) : this.#e;
				t.enqueue(n);
			}
		});
	}
};
//#endregion
//#region node_modules/fetch-event-stream/esm/utils.js
function _e(e) {
	let t = new TextDecoderStream(), n = new ge({ allowCR: !0 });
	return e.pipeThrough(t).pipeThrough(n);
}
function ve(e) {
	let t = /[:]\s*/.exec(e), n = t && t.index;
	if (n) return [e.substring(0, n), e.substring(n + t[0].length)];
}
function ye(e, t, n) {
	e.get(t) || e.set(t, n);
}
//#endregion
//#region node_modules/fetch-event-stream/esm/mod.js
async function* be(e, t) {
	if (!e.body) return;
	let n = _e(e.body), r, i = n.getReader(), a;
	for (;;) {
		if (t && t.aborted) return i.cancel();
		if (r = await i.read(), r.done) return;
		if (!r.value) {
			a && (yield a), a = void 0;
			continue;
		}
		let [e, n] = ve(r.value) || [];
		e === "data" ? (a ||= {}, a[e] = a[e] ? a[e] + "\n" + n : n) : e === "event" ? (a ||= {}, a[e] = n) : e === "id" ? (a ||= {}, a[e] = String(+n) === n ? +n : n) : e === "retry" && (a ||= {}, a[e] = +n || void 0);
	}
}
async function xe(e, t) {
	let n = new Request(e, t);
	ye(n.headers, "Accept", "text/event-stream"), ye(n.headers, "Content-Type", "application/json");
	let r = await fetch(n);
	if (!r.ok) throw r;
	return be(r, n.signal);
}
//#endregion
//#region lib/adapter/Ibexa/Client.ts
var Se = 401, Ce = 204, we = class {
	apiUrl;
	accessToken;
	refreshToken;
	constructor(e, t, n) {
		this.apiUrl = e, this.accessToken = t, this.refreshToken = n;
	}
	async refresh() {
		if (!this.refreshToken) throw Error("No refresh token available");
		let e = await this.doFetch("/api/v1/login/refresh-token", {
			method: "POST",
			body: JSON.stringify({ refresh_token: this.refreshToken })
		}, !1, !1);
		this.accessToken = e.access_token, this.refreshToken = e.refresh_token;
	}
	async createConversation(e, t, n) {
		let r = {};
		return e !== null && (r.agent_id = e), t && (r.subject = t), n && Object.keys(n).length > 0 && (r.context = n), await this.doFetch("/api/v1/conversations/", {
			method: "POST",
			body: JSON.stringify(r)
		});
	}
	async updateConversation(e, t) {
		return await this.doFetch(`/api/v1/conversations/${e}`, {
			method: "PATCH",
			body: JSON.stringify(t)
		});
	}
	async deleteConversation(e) {
		return await this.doFetch(`/api/v1/conversations/${e}`, { method: "DELETE" });
	}
	async getConversations(e = 0, t = 20, n, r) {
		let i = new URLSearchParams({
			skip: String(e),
			limit: String(t)
		});
		return n && i.set("search", n), r !== void 0 && i.set("agent", String(r)), await this.doFetch(`/api/v1/conversations?${i.toString()}`);
	}
	async getConversation(e) {
		return await this.doFetch(`/api/v1/conversations/${e}`);
	}
	async getMessages(e, t, n) {
		let r = new URLSearchParams();
		t && r.append("cursor", t), n && r.append("limit", n.toString());
		let i = `/api/v1/conversations/${e}/messages`;
		return r.size > 0 && (i += `?${r.toString()}`), await this.doFetch(i);
	}
	async uploadFile(e, t) {
		let n = new FormData();
		return n.append("file", t), await this.doFetch(`/api/v1/conversations/${e}/files/`, {
			method: "POST",
			body: n
		});
	}
	async getSubAgents(e) {
		return await this.doFetch(`/api/v1/agents/${e}/sub-agents`);
	}
	async deleteFile(e, t) {
		return await this.doFetch(`/api/v1/conversations/${e}/files/${t}`, { method: "DELETE" });
	}
	async sendMessage(e, t, n = []) {
		let r = { content: t };
		return n.length > 0 && (r.file_ids = n), await this.doFetch(`/api/v1/conversations/${e}/messages/`, {
			method: "POST",
			body: JSON.stringify(r)
		});
	}
	async *sendMessageStream(e, t, n = []) {
		let r = { content: t };
		n.length > 0 && (r.file_ids = n), yield* this.doFetchStream(`/api/v1/conversations/${e}/messages/stream`, {
			method: "POST",
			body: JSON.stringify(r)
		});
	}
	buildRequestUrl(e) {
		return `${this.apiUrl}${e}`;
	}
	buildRequestOptions(e = {}, t = !1) {
		let n = {};
		return !(e.body instanceof FormData) && (!e.headers || !("Content-Type" in e.headers)) && (n["Content-Type"] = "application/json"), t && this.accessToken && (n.Authorization = `Bearer ${this.accessToken}`), {
			...e,
			headers: {
				...n,
				...e.headers ?? {}
			}
		};
	}
	async doFetch(e, t, n = !0, r = !0) {
		let i = await fetch(this.buildRequestUrl(e), this.buildRequestOptions(t, n));
		if (r && i.status === Se) return await this.refresh(), await this.doFetch(e, t, n, !1);
		if (!i.ok) {
			let e = await i.text();
			throw Error(`API request failed: ${i.status} ${i.statusText} - ${e}`);
		}
		if (i.status !== Ce) return await i.json();
	}
	async *doFetchStream(e, t, n = !0, r = !0) {
		let i = await fetch(this.buildRequestUrl(e), this.buildRequestOptions(t, n));
		if (r && i.status === Se) {
			await this.refresh(), yield* this.doFetchStream(e, t, !0, !1);
			return;
		}
		if (!i.ok) {
			let e = await i.text();
			throw Error(`API request failed: ${i.status} ${i.statusText} - ${e}`);
		}
		for await (let e of be(i)) {
			let t = this.parseSSEEvent(e);
			t && (yield t);
		}
	}
	parseSSEEvent(e) {
		let { event: t = "", data: n } = e;
		if (!n || n === "{}") return null;
		let r;
		try {
			r = JSON.parse(n);
		} catch {
			return null;
		}
		switch (t) {
			case "token": return r.delta ? {
				type: "token",
				delta: r.delta
			} : null;
			case "message": return {
				type: "message",
				role: r.role,
				content: r.content,
				messageId: r.message_id
			};
			case "tool_call_start": return {
				type: "tool_call_start",
				toolName: r.tool_name,
				args: r.args ?? {},
				runId: r.run_id
			};
			case "tool_call_end": return {
				type: "tool_call_end",
				toolName: r.tool_name,
				runId: r.run_id,
				resultPreview: r.result_preview
			};
			case "done": return {
				type: "done",
				conversationId: r.conversation_id
			};
			default: return null;
		}
	}
}, Te = class {
	generator;
	endCallback;
	toolCallback;
	onReadyCallback;
	endCallbackFired = !1;
	readyFired = !1;
	streamDone = !1;
	endData = {};
	tokenBuffer = [];
	consumerCallback = null;
	constructor(e, t, n, r) {
		this.generator = e, this.endCallback = t ?? null, this.toolCallback = n ?? null, this.onReadyCallback = r ?? null, this.fetchNext();
	}
	consume(e) {
		this.consumerCallback = e;
		let t = this.tokenBuffer.splice(0);
		for (let n of t) e(n);
		this.streamDone && !this.endCallbackFired && (this.endCallbackFired = !0, Promise.resolve().then(() => {
			this.endCallback?.(this.endData);
		}));
	}
	onEnd(e) {
		let t = this.endCallback;
		this.endCallback = (n) => {
			t?.(n), e();
		};
	}
	fireReady() {
		this.readyFired || (this.readyFired = !0, this.onReadyCallback?.());
	}
	fetchNext() {
		this.generator.next().then((e) => {
			if (e.done) {
				this.streamDone = !0, this.fireReady(), this.consumerCallback && !this.endCallbackFired && (this.endCallbackFired = !0, this.endCallback?.(this.endData));
				return;
			}
			let t = e.value;
			if (t.type === "token") {
				this.fireReady();
				let e = {
					id: I(),
					type: "text",
					text: t.delta
				};
				this.consumerCallback ? this.consumerCallback(e) : this.tokenBuffer.push(e);
			} else t.type === "tool_call_start" || t.type === "tool_call_end" ? this.toolCallback?.(t) : t.type === "message" ? this.endData.messageId = t.messageId : t.type === "done" && (this.endData.conversationId = t.conversationId);
			this.fetchNext();
		});
	}
}, Ee = class extends he {
	client;
	agentId;
	subAgentsMap = null;
	constructor({ client: e, id: t, subject: n, agentId: r, createdAt: i = /* @__PURE__ */ new Date(), updatedAt: a }) {
		super({
			id: t.toString(),
			subject: n,
			createdAt: i,
			updatedAt: a
		}), this.client = e, this.agentId = r;
	}
	get numericId() {
		return parseInt(this.id, 10);
	}
	async uploadFile(e) {
		return (await this.client.uploadFile(this.numericId, e)).uuid;
	}
	async deleteFile(e) {
		await this.client.deleteFile(this.numericId, e);
	}
	async setContext(e) {
		let t = Object.keys(e).length === 0;
		await this.client.updateConversation(this.numericId, { context: t ? null : e });
	}
	async fetchSubAgentsMap() {
		if (this.subAgentsMap) return this.subAgentsMap;
		if (!this.agentId) return /* @__PURE__ */ new Map();
		try {
			let e = await this.client.getSubAgents(this.agentId);
			this.subAgentsMap = new Map(e.sub_agent_links.map((e) => [e.identifier, e.name]));
		} catch {
			this.subAgentsMap = /* @__PURE__ */ new Map();
		}
		return this.subAgentsMap;
	}
	resolveMessageContent(e, t) {
		return t.size === 0 ? e : e.replace(/@([\w-]+)/g, (e, n) => {
			let r = t.get(n);
			return r ? `[@${r}](${n})` : e;
		});
	}
	async getHistory(e, t) {
		let [n, r] = await Promise.all([this.client.getMessages(this.numericId, e, t), this.fetchSubAgentsMap()]);
		return {
			messages: n.messages.map((e) => {
				let t = this.resolveMessageContent(e.content, r);
				return e.role === "tool" ? L.createToolMessage(e.id, t, "done") : L.createTextMessage(e.id, e.role, t, "done");
			}).reverse(),
			nextCursor: n.next_cursor,
			hasMore: n.has_more
		};
	}
	async send(e, t, n = [], r) {
		let i = [];
		t.trim() && i.push(L.createTextMessage(e, "user", t));
		for (let t of n) if (t.type.startsWith("image/")) {
			let n = await this.transformFile(t);
			i.push(L.createImageMessage(e, "user", n));
		}
		i.length === 0 && i.push(L.createTextMessage(e, "user", t));
		let a = this.createPendingMessage(i);
		this.messageEmitter.emitMessage(a);
		let o = await Promise.all(n.map(async (e) => {
			let { uuid: t } = await this.client.uploadFile(this.numericId, e);
			return t;
		})), s = this.client.sendMessageStream(this.numericId, r ?? t, o), c = L.finalizeMessage(a, this.getRandomUniqueId()), l = this.getRandomUniqueId(), u = /* @__PURE__ */ new Map(), d = new Te(s, ({ messageId: e }) => {
			this.updatedAt = /* @__PURE__ */ new Date(), this.conversationEmitter.emitChange(), e && this.messageEmitter.emitMessage(L.finalizeMessage(f, e));
		}, (e) => {
			if (e.type === "tool_call_start") {
				let t = L.createToolMessage(e.runId, e.toolName);
				u.set(e.runId, t), this.messageEmitter.emitMessage(t);
			} else if (e.type === "tool_call_end") {
				let t = u.get(e.runId);
				t && (this.messageEmitter.emitMessage(L.finalizeMessage(t, t.id, { text: e.toolName })), u.delete(e.runId));
			}
		}, () => {
			this.messageEmitter.emitMessage(p);
		}), f = L.createStreamedTextMessage(l, "assistant", d), p = L.finalizeMessage(f, l);
		return this.messageEmitter.emitMessage(c), { result: !0 };
	}
}, De = class extends pe {
	client;
	agentId;
	context;
	temporaryId;
	subject;
	createdAt = /* @__PURE__ */ new Date();
	updatedAt = /* @__PURE__ */ new Date();
	conversation = null;
	messageEmitter = new me();
	constructor(e, t, n, r) {
		super(), this.client = e, this.agentId = t, this.subject = n ?? "", this.context = r, this.temporaryId = crypto.randomUUID();
	}
	getId() {
		return this.conversation?.getId() ?? this.temporaryId;
	}
	getSubject() {
		return this.conversation?.getSubject() ?? this.subject;
	}
	setSubject(e) {
		this.conversation && this.conversation.setSubject(e), this.subject = e, this.emitChange();
	}
	async setContext(e) {
		this.context = e, this.conversation && await this.conversation.setContext(e);
	}
	getCreatedAt() {
		return this.conversation?.getCreatedAt() ?? this.createdAt;
	}
	getUpdatedAt() {
		return this.conversation?.getUpdatedAt() ?? this.updatedAt;
	}
	async send(e, t, n, r) {
		return this.conversation ? this.conversation.send(e, t, n, r) : this.sendWithNewConversation(e, t, n, r);
	}
	async sendWithNewConversation(e, t, n, r) {
		let i = L.createTextMessage(e, "user", t);
		this.messageEmitter.emitMessage(i);
		let a = await this.client.createConversation(this.agentId, this.subject || void 0, this.context);
		return this.conversation = new Ee({
			client: this.client,
			id: a.id,
			subject: this.subject,
			agentId: this.agentId,
			createdAt: this.createdAt,
			updatedAt: /* @__PURE__ */ new Date()
		}), this.conversation.onMessage((e) => {
			this.messageEmitter.emitMessage(e);
		}), this.updatedAt = /* @__PURE__ */ new Date(), this.emitChange(), this.conversation.send(e, t, n, r);
	}
	onMessage(e) {
		let t = this.messageEmitter.onMessage(e);
		return this.messageEmitter.enableMessageEmitting(), t;
	}
	async getHistory(e, t) {
		return this.conversation ? this.conversation.getHistory(e, t) : {
			messages: [],
			nextCursor: null,
			hasMore: !1
		};
	}
}, Oe = class e extends R {
	client;
	agentId;
	agentsPromise;
	constructor(e, t, n = {}) {
		super(), this.client = e, this.agentId = t, this.setContext(n);
	}
	supports(t) {
		switch (t) {
			case e.CAPABILITY_SEARCH_CONVERSATIONS:
			case e.CAPABILITY_FETCH_AGENTS: return !0;
			default: return super.supports(t);
		}
	}
	async fetchAgents(e) {
		let t = await this.getAgents(), n = e.toLowerCase();
		return t.filter((e) => e.label.toLowerCase().includes(n));
	}
	getAgents() {
		return this.agentId === null ? Promise.resolve([]) : (this.agentsPromise ||= this.client.getSubAgents(this.agentId).then((e) => e.sub_agent_links.map((e) => ({
			id: String(e.sub_agent_id),
			label: e.name,
			link: e.identifier
		}))).catch((e) => {
			throw this.agentsPromise = void 0, e;
		}), this.agentsPromise);
	}
	async getConversations(e, t, n) {
		return (await this.client.getConversations(e, t, n, this.agentId ?? void 0)).conversations.map((e) => new Ee({
			client: this.client,
			id: e.id,
			subject: e.subject,
			agentId: e.agent_id,
			createdAt: new Date(e.created_at)
		}));
	}
	async getConversation(e) {
		let t = parseInt(e, 10);
		if (isNaN(t)) throw Error(`Invalid conversation ID: ${e}`);
		let n = await this.client.getConversation(t);
		return new Ee({
			client: this.client,
			id: n.id,
			subject: n.subject,
			agentId: n.agent_id,
			createdAt: new Date(n.created_at),
			updatedAt: new Date(n.updated_at)
		});
	}
	async createConversation(e) {
		return new De(this.client, this.agentId, e, this.getContext());
	}
	async deleteConversation(e) {
		let t = parseInt(e.getId(), 10);
		await this.client.deleteConversation(t);
	}
	static fromConfig(t) {
		return new e(new we(t.apiUrl, t.accessToken, t.refreshToken), t.agentId ?? null, t.context);
	}
}, ke = class extends he {
	messages = [];
	constructor({ id: e, subject: t = "", messages: n = [] }) {
		super({
			id: e,
			subject: t
		}), this.messages = n;
	}
	getSubject() {
		return this.subject === "" ? this.createdAt.toLocaleString() : this.subject;
	}
	async simulateRequestDelay(e = 10) {
		return new Promise((t) => setTimeout(t, e));
	}
	createAttachmentMessage(e, t, n) {
		return e.type.startsWith("image/") ? L.createImageMessage(n, "user", t) : L.createErrorMessage(n, "user", `Unsupported attachment type: ${e.type} for file ${e.name}`);
	}
	async getHistory(e, t) {
		let n = this.messages.length;
		if (n === 0) return {
			messages: [],
			nextCursor: null,
			hasMore: !1
		};
		let r = n;
		if (e !== void 0) {
			let t = this.messages.findIndex((t) => t.id === e);
			if (t === -1) throw Error(`Cursor with id ${e} not found in conversation history`);
			r = t;
		}
		let i = typeof t == "number" && t > 0 ? t : he.DEFAULT_LOAD_LIMIT, a = Math.max(0, r - i);
		return await this.simulateRequestDelay(), {
			messages: this.messages.slice(a, r),
			nextCursor: a > 0 ? this.messages[a].id : null,
			hasMore: a > 0
		};
	}
	async send(e, t, n = []) {
		let r = [];
		if (t.trim()) {
			let n = L.createTextMessage(e, "user", t);
			r.push(n);
		}
		for (let t of n) {
			let n = await this.transformFile(t), i = this.createAttachmentMessage(t, n, e);
			r.push(i);
		}
		let i = this.createPendingMessage(r), a = L.createTextMessage(this.getRandomUniqueId(), "assistant", "");
		this.messageEmitter.emitMessage(i), this.messageEmitter.emitMessage(a), await this.simulateRequestDelay();
		let o = L.finalizeMessage(i, this.getRandomUniqueId());
		this.messageEmitter.emitMessage(o), this.messages.push(o), await this.simulateRequestDelay(), r[0].type !== "text" && r.unshift(a), r.forEach((e) => {
			e.role = "assistant";
		}), r[0].id = a.id, r.length === 1 && r[0].type === "text" && r[0].text === "Hello there" ? r[0].text = "General Kenobi" : r[0].text = `Echo: ${r[0].text}`;
		let s = this.createPendingMessage(r), c = L.finalizeMessage(s, this.getRandomUniqueId());
		return this.messageEmitter.emitMessage(c), this.messages.push(c), { result: !0 };
	}
}, Ae = class e extends R {
	conversations = /* @__PURE__ */ new Map();
	constructor(e = {}) {
		super(), this.setContext(e);
	}
	supports(t) {
		switch (t) {
			case e.CAPABILITY_SEARCH_CONVERSATIONS:
			case e.CAPABILITY_FETCH_AGENTS: return !0;
			default: return super.supports(t);
		}
	}
	async getConversations(e = 0, t = 10, n) {
		let r = Array.from(this.conversations.values()).filter((e) => !n || e.getSubject().toLowerCase().includes(n.toLowerCase())).reverse().slice(e, e + t);
		return await new Promise((e) => setTimeout(e, 500)), r;
	}
	async getConversation(e) {
		if (this.conversations.has(e)) return this.conversations.get(e);
		throw await new Promise((e) => setTimeout(e, 500)), Error(`Conversation with id ${e} not found`);
	}
	async createConversation(e) {
		let t = I(), n = new ke({
			id: t,
			subject: e
		});
		return this.conversations.set(t, n), await new Promise((e) => setTimeout(e, 500)), n;
	}
	async deleteConversation(e) {
		this.conversations.has(e.getId()) && (this.conversations.delete(e.getId()), await new Promise((e) => setTimeout(e, 500)));
	}
	static DEMO_MENTIONS = [
		{
			id: "1",
			label: "Alice Johnson",
			link: "https://example.com/users/alice"
		},
		{
			id: "2",
			label: "Bob Smith",
			link: "https://example.com/users/bob"
		},
		{
			id: "3",
			label: "Carol White",
			link: "https://example.com/users/carol"
		}
	];
	fetchAgents(t) {
		return e.DEMO_MENTIONS.filter((e) => e.label.toLowerCase().includes(t.toLowerCase()));
	}
	static fromConfig(t) {
		let n = t.context ?? {}, r = new e(n);
		if (t.data) for (let e of t.data) {
			let t = new ke({
				id: e.id,
				subject: e.subject,
				messages: e.messages
			});
			r.conversations.set(t.getId(), t);
		}
		return r;
	}
}, je = "https://api.openai.com/v1/responses", Me = "https://api.openai.com/v1/conversations", Ne = "https://api.openai.com/v1/conversations/{conversation_id}", Pe = "https://api.openai.com/v1/conversations/{conversation_id}", Fe = "https://api.openai.com/v1/conversations/{conversation_id}/items", Ie = class {
	apiKey;
	model;
	constructor(e, t = "gpt-5-nano") {
		this.apiKey = e, this.model = t;
	}
	async createConversation() {
		let e = await fetch(Me, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			},
			body: JSON.stringify({})
		});
		if (!e.ok) throw Error(`OpenAI API error: ${e.status} ${e.statusText}`);
		return await e.json();
	}
	async deleteConversation(e) {
		let t = Ne.replace("{conversation_id}", e);
		await fetch(t, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			}
		});
	}
	async getConversation(e) {
		let t = Pe.replace("{conversation_id}", e);
		return await (await fetch(t, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			}
		})).json();
	}
	async getConversationItems(e, t, n) {
		return await (await fetch(this.buildConversationListEndpoint(e, t, n), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			}
		})).json();
	}
	async createConversationItem(e, t, n) {
		let r = {
			model: this.model,
			input: t,
			conversation: e,
			stream: !0,
			instructions: n
		}, i = await xe(je, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			},
			body: JSON.stringify(r)
		});
		return {
			conversation: { id: e },
			stream: this.processEvents(i)
		};
	}
	async *processEvents(e) {
		for await (let t of e) {
			if (!t.data) continue;
			let e = JSON.parse(t.data);
			if (e.type === "response.output_text.delta") {
				let t = e.delta ?? "";
				t && (yield {
					id: e.item_id,
					type: "text",
					content: t
				});
			}
		}
	}
	async generateSubject(e) {
		let t = {
			model: this.model,
			input: [...e, {
				content: "Generate a concise subject line for current conversation. Return empty text if conversation contains only initial greetings or no user messages.",
				role: "system"
			}],
			store: !1,
			text: { format: {
				name: "subject",
				strict: !0,
				type: "json_schema",
				schema: {
					type: "object",
					properties: { subject: {
						type: "string",
						description: "A concise subject line summarizing the conversation.",
						maxLength: 100
					} },
					required: ["subject"],
					additionalProperties: !1
				}
			} }
		}, n = await fetch(je, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`
			},
			body: JSON.stringify(t)
		});
		if (!n.ok) return console.warn("Failed to generate subject line:", n.status, n.statusText), "";
		let r = await n.json();
		for (let e of r.output) if (e.type === "message" && e.content && e.content.length > 0) return JSON.parse(e.content[0].text)?.subject || "";
		return "";
	}
	buildConversationListEndpoint(e, t, n) {
		let r = [];
		t && r.push(`after=${encodeURIComponent(t)}`), n && r.push(`limit=${n}`);
		let i = Fe.replace("{conversation_id}", e);
		return r.length > 0 && (i += `?${r.join("&")}`), i;
	}
}, Le = class {
	stream;
	onEndCallback = null;
	onEndCallbackFired = !1;
	chunksHistory = [];
	constructor(e, t) {
		this.stream = e, t && (this.onEndCallback = t);
	}
	getTextMessage() {
		return this.chunksHistory.map((e) => e.text).join("");
	}
	consume(e) {
		this.stream.next().then((t) => {
			if (t.done) {
				this.onEndCallback && !this.onEndCallbackFired && (this.onEndCallback(this.chunksHistory), this.onEndCallbackFired = !0);
				return;
			}
			let n = this.transform(t.value);
			this.chunksHistory.push(n), e(n), this.consume(e);
		});
	}
	onEnd(e) {
		this.onEndCallback = e;
	}
	transform(e) {
		return {
			id: e.id,
			type: "text",
			text: e.content ?? ""
		};
	}
}, Re = class extends he {
	client;
	instructions;
	conversationHistory = [];
	isCreatingSubject = !1;
	constructor({ client: e, id: t, createdAt: n, instructions: r }) {
		super({
			id: t,
			createdAt: n
		}), this.client = e, this.instructions = r;
	}
	async getHistory(e, t) {
		e ||= "", t ||= he.DEFAULT_LOAD_LIMIT;
		let n = await this.client.getConversationItems(this.getId(), e, t);
		return {
			messages: n.data.filter((e) => e.type === "message").map((e) => L.createTextMessage(e.id, e.role, e.content?.[0].text ?? "", "done")).reverse(),
			nextCursor: n.last_cursor ?? null,
			hasMore: n.has_more ?? !1
		};
	}
	async send(e, t) {
		let n = L.createTextMessage(e, "user", t);
		this.messageEmitter.emitMessage(n);
		let r = await this.client.createConversationItem(this.getId(), t, this.instructions), i = L.finalizeMessage(n, this.getRandomUniqueId()), a = L.createStreamedTextMessage(this.getRandomUniqueId(), "assistant", new Le(r.stream, () => {
			this.subject === "" && !this.isCreatingSubject && this.generateSubject();
		})), o = L.finalizeMessage(a, this.getRandomUniqueId());
		return this.conversationHistory.push(i, o), this.updatedAt = /* @__PURE__ */ new Date(), this.conversationEmitter.emitChange(), this.messageEmitter.emitMessage(i), this.messageEmitter.emitMessage(o), { result: !0 };
	}
	generateSubject() {
		let e = this.conversationHistory.length, t = this.conversationHistory.map((e) => {
			switch (e.type) {
				case "text": return {
					role: e.role,
					content: e.text
				};
				case "streamed_text": {
					let t = e.stream;
					return {
						role: e.role,
						content: t.getTextMessage()
					};
				}
				default: return null;
			}
		}).filter((e) => e !== null);
		this.isCreatingSubject = !0, this.client.generateSubject(t).then((t) => {
			if (this.isCreatingSubject = !1, t === "") {
				e !== this.conversationHistory.length && this.generateSubject();
				return;
			}
			this.subject = t, this.conversationEmitter.emitChange();
		});
	}
}, ze = class e extends R {
	client;
	instructions;
	conversations = /* @__PURE__ */ new Map();
	constructor(e, t) {
		super(), this.client = e, this.instructions = t;
	}
	async getConversations(e = 0, t = 10) {
		return Array.from(this.conversations.values()).reverse().slice(e, e + t);
	}
	async getConversation(e) {
		if (this.conversations.has(e)) return this.conversations.get(e);
		let t = await this.client.getConversation(e), n = /* @__PURE__ */ new Date(t.created_at * 1e3), r = new Re({
			client: this.client,
			id: t.id,
			createdAt: n,
			instructions: this.instructions
		});
		return this.conversations.set(r.getId(), r), r;
	}
	async createConversation(e) {
		let t = await this.client.createConversation(), n = /* @__PURE__ */ new Date(t.created_at * 1e3), r = new Re({
			client: this.client,
			id: t.id,
			createdAt: n,
			instructions: this.instructions
		});
		return r.setSubject(e || ""), this.conversations.set(r.getId(), r), r;
	}
	async deleteConversation(e) {
		await this.client.deleteConversation(e.getId()), this.conversations.delete(e.getId());
	}
	getInstructions() {
		return this.instructions;
	}
	static fromConfig(t) {
		return new e(new Ie(t.apiKey, t.model), t.instructions);
	}
}, Be = t({
	currentConversation: {
		id: "",
		subject: "",
		draft: !0
	},
	setCurrentConversation: () => {},
	newConversation: () => Promise.resolve({}),
	conversations: [],
	conversationsContextId: "",
	isLoadingConversations: !1,
	deleteConversation: () => Promise.resolve(),
	loadMoreConversations: () => Promise.resolve(),
	searchConversations: () => {},
	onResetSearch: () => {},
	resetSearch: () => {},
	searchConversationsEnabled: !1
}), Ve = (e, t) => {
	switch (e) {
		case "createConversation": return t.formatMessage({ id: "ibexa.ai_assistant.error.create_conversation" });
		case "deleteConversation": return t.formatMessage({ id: "ibexa.ai_assistant.error.delete_conversation" });
		case "initialize": return t.formatMessage({ id: "ibexa.ai_assistant.error.initialize" });
		case "loadMessages": return t.formatMessage({ id: "ibexa.ai_assistant.error.load_messages" });
		case "sendMessage": return t.formatMessage({ id: "ibexa.ai_assistant.error.send_message" });
		case "uploadFile": return t.formatMessage({ id: "ibexa.ai_assistant.error.upload_file" });
		default: return "";
	}
}, He = (e) => {
	let t = g(), { onError: n } = a(fe), r = i((r) => (i, a = Ve(r, t)) => {
		let o = new oe(r, a, i);
		n(o), e?.();
	}, [
		n,
		t,
		e
	]), o = i((t, r, i) => {
		let a = new oe(i, r, t);
		n(a), e?.();
	}, [n, e]);
	return l(() => ({
		onCreateConversationError: r("createConversation"),
		onDeleteConversationError: r("deleteConversation"),
		onInitializeError: r("initialize"),
		onLoadMessagesError: r("loadMessages"),
		onSendMessageError: r("sendMessage"),
		onUploadFileError: r("uploadFile"),
		onError: o
	}), [r, o]);
}, Ue = ({ id: e, adapter: t, onConversationChange: n, children: r }) => {
	let a = u(t), s = u(/* @__PURE__ */ new Map()), c = u(() => {}), f = u(!1), m = u(null), h = u(0), g = u(null), { onInitializeError: _ } = He(), [v, y] = d([]), [b, x] = d(void 0), [S, C] = d(!1), [w, T] = d(I()), E = ({ id: e = "", subject: t = "", serverId: n, service: r } = {}) => n === void 0 || r === void 0 ? {
		id: e || I(),
		subject: t,
		draft: !0
	} : {
		id: e,
		subject: t,
		draft: !1,
		serverId: n,
		service: r
	}, [D, O] = d(E()), k = i((e) => {
		if (e === null) {
			O(E());
			return;
		}
		O(e);
	}, []), A = l(() => v.some((e) => e.id === D.id) || b ? v : [D, ...v], [
		v,
		D,
		b
	]), j = i(() => {
		f.current = !1, h.current = 0, m.current?.abort(), m.current = new AbortController(), y([]), T(I());
	}, []), ee = i((e) => {
		c.current = e ?? (() => {});
	}, []), te = i(() => {
		b && (C(!0), j(), x(void 0), c.current());
	}, [j, b]), ne = i((e) => {
		y((t) => {
			let n = e.filter((e) => !t.some((t) => t.id === e.id));
			if (n.length === 0) return t;
			let r = [...t, ...n];
			return h.current = r.length, r;
		});
	}, []), re = i((e, n, r, i) => t.createConversation().then(async (t) => {
		e && (n || r && r.length > 0) && await t.send(e, n ?? "", r, i);
		let a = t.getId(), o = D.id, c = E({
			id: o,
			serverId: a,
			subject: t.getSubject(),
			service: t
		});
		return s.current.set(a, o), O(c), b ? te() : (h.current++, y((e) => [c, ...e])), c;
	}), [
		D.id,
		b,
		te
	]), ie = i(async (e) => {
		await t.deleteConversation(e.service), h.current--, y((t) => t.filter((t) => t.service.getId() !== e.service.getId())), O((t) => t.id === e.id ? (s.current.delete(e.serverId), E()) : t);
	}, []), M = i(async (e, n, r) => await t.getConversations(e, n, r).then((e) => e.map((e) => {
		let t = e.getId();
		s.current.has(t) || s.current.set(t, I());
		let n = s.current.get(t);
		return E({
			id: n,
			serverId: e.getId(),
			subject: e.getSubject(),
			service: e
		});
	})), []), ae = i(async (e) => {
		if (f.current) return;
		C(!0);
		let t = m.current?.signal;
		f.current = !0;
		let n = await M(h.current, e, b);
		if (t?.aborted) {
			C(!1);
			return;
		}
		return ne(n), C(!1), f.current = !1, n;
	}, [
		M,
		b,
		ne
	]), N = i(({ query: e }) => {
		if (e === b) return;
		g.current && clearTimeout(g.current);
		let t = () => {
			C(!0), j(), x(e);
		};
		if (!e) {
			t();
			return;
		}
		g.current = setTimeout(t, 300);
	}, [j, b]);
	o(() => {
		(async () => {
			let e = m.current?.signal, t = await M(h.current, void 0, b);
			e?.aborted || (ne(t), C(!1));
		})();
	}, [
		M,
		b,
		ne
	]), o(() => {
		if (a.current !== t) throw Error("Adapter instance cannot be changed after initialization");
	}, [t]), o(() => {
		let e = [];
		return A.forEach(({ draft: t, service: n }) => {
			if (t) return;
			let r = n.onChange(() => {
				let e = n.getId(), t = s.current.get(e);
				D.id === e && O((r) => r.subject === n.getSubject() ? r : E({
					id: t,
					serverId: e,
					subject: n.getSubject(),
					service: n
				})), y((r) => r.map((r) => r.service.getId() === e ? r.subject === n.getSubject() ? r : E({
					id: t,
					serverId: e,
					subject: n.getSubject(),
					service: n
				}) : r));
			});
			e.push(r);
		}), () => {
			e.forEach((e) => {
				e();
			});
		};
	}, [A, D.id]), o(() => {
		(e !== void 0 && e !== "" ? t.getConversation(e) : Promise.resolve()).then(async (e) => {
			C(!0);
			let t = await M();
			if (!f.current) {
				if (h.current = t.length, e) {
					let t = s.current.get(e.getId());
					O(E({
						id: t,
						serverId: e.getId(),
						subject: e.getSubject(),
						service: e
					}));
				}
				y(t), C(!1);
			}
		}).catch((e) => {
			C(!1), _(e);
		});
	}, [
		e,
		M,
		_
	]), o(() => {
		let e = D.draft ? null : D.serverId ?? null;
		n?.(e), t.setActiveConversation?.(D.draft ? null : D.service);
	}, [
		D,
		n,
		t
	]);
	let oe = l(() => ({
		currentConversation: D,
		setCurrentConversation: k,
		newConversation: re,
		deleteConversation: ie,
		conversations: A,
		conversationsContextId: w,
		isLoadingConversations: S,
		loadMoreConversations: ae,
		searchConversations: N,
		onResetSearch: ee,
		resetSearch: te,
		searchConversationsEnabled: t.supports(R.CAPABILITY_SEARCH_CONVERSATIONS)
	}), [
		t,
		D,
		k,
		re,
		ie,
		A,
		w,
		S,
		ae,
		N,
		ee,
		te
	]);
	return /* @__PURE__ */ p(Be.Provider, {
		value: oe,
		children: r
	});
}, We = {
	en: {
		"ibexa.ai_assistant.chatbox_toggle.label": "Ask AI",
		"ibexa.ai_assistant.voice_input.dictate": "Dictate",
		"ibexa.ai_assistant.chat_input.placeholder": "Ask me anything...",
		"ibexa.ai_assistant.send_button.title": "Send message",
		"ibexa.ai_assistant.file_input.title": "Attach file",
		"ibexa.ai_assistant.chat_input.actions_menu.open": "More actions",
		"ibexa.ai_assistant.chat_input.actions_menu.close": "Close actions",
		"ibexa.ai_assistant.close_button.title": "Close",
		"ibexa.ai_assistant.toggle_conversations_popup.no_conversations": "No past conversations available",
		"ibexa.ai_assistant.toggle_conversations_popup.title": "Show conversations",
		"ibexa.ai_assistant.search_conversations_field.placeholder": "Search...",
		"ibexa.ai_assistant.search_conversations_field.action": "Search",
		"ibexa.ai_assistant.new_conversation_button.title": "Start new",
		"ibexa.ai_assistant.fullscreen_button.title": "Enter fullscreen",
		"ibexa.ai_assistant.fullscreen_exit_button.title": "Exit fullscreen",
		"ibexa.ai_assistant.conversation_history.title": "History",
		"ibexa.ai_assistant.conversation_history.empty": "No conversations found.",
		"ibexa.ai_assistant.new_conversation_button.label": "Start new",
		"ibexa.ai_assistant.conversation_history.switch_conversation": "Switch to this conversation",
		"ibexa.ai_assistant.conversation_history.delete_conversation": "Delete this conversation",
		"ibexa.ai_assistant.conversation_history.delete_conversation.confirmation": "Are you sure you want to delete conversation \"{conversationSubject}\"?",
		"ibexa.ai_assistant.conversations.untitled_conversation": "Untitled Conversation",
		"ibexa.ai_assistant.conversation_history.end_of_results": "End of results",
		"ibexa.ai_assistant.sidebar_toggle.collapse": "Collapse sidebar",
		"ibexa.ai_assistant.sidebar_toggle.expand": "Expand sidebar",
		"ibexa.ai_assistant.error.message": "Error rendering message.",
		"ibexa.ai_assistant.error.create_conversation": "Error creating conversation.",
		"ibexa.ai_assistant.error.delete_conversation": "Error deleting conversation.",
		"ibexa.ai_assistant.error.initialize": "Error initializing conversation.",
		"ibexa.ai_assistant.error.load_messages": "Error loading messages.",
		"ibexa.ai_assistant.error.send_message": "Error sending message.",
		"ibexa.ai_assistant.error.upload_file": "Error uploading file.",
		"ibexa.ai_assistant.file_input.error.file_too_large": "The following files exceed the maximum size of {maxSize} MB: {fileNames}.",
		"ibexa.ai_assistant.message.video.not_supported": "Your browser cannot play this video.",
		"ibexa.ai_assistant.input_file_preview.image": "Image",
		"ibexa.ai_assistant.input_file_preview.video": "Video",
		"ibexa.ai_assistant.input_file_preview.spreadsheet": "Spreadsheet",
		"ibexa.ai_assistant.input_file_preview.document": "Document",
		"ibexa.ai_assistant.infinite_scroll_wrapper.beginning_of_conversation": "Beginning of conversation",
		"ibexa.ai_assistant.voice_input.confirm": "Confirm recording",
		"ibexa.ai_assistant.voice_input.discard": "Discard recording",
		"ibexa.ai_assistant.loading_text.thinking": "Thinking…",
		"ibexa.ai_assistant.loading_text.generating_response": "Generating response…",
		"ibexa.ai_assistant.loading_text.processing": "Processing…",
		"ibexa.ai_assistant.loading_text.working_on_it": "Working on it…",
		"ibexa.ai_assistant.loading_text.preparing_answer": "Preparing answer…",
		"ibexa.ai_assistant.loading_text.analyzing_request": "Analyzing request…",
		"ibexa.ai_assistant.loading_text.fetching_information": "Fetching information…",
		"ibexa.ai_assistant.loading_text.let_me_think": "Let me think…",
		"ibexa.ai_assistant.loading_text.checking_a_few_things": "Checking a few things…",
		"ibexa.ai_assistant.loading_text.building_your_answer": "Building your answer…",
		"ibexa.ai_assistant.loading_text.gathering_context": "Gathering context…"
	},
	de: {
		"ibexa.ai_assistant.chatbox_toggle.label": "KI fragen",
		"ibexa.ai_assistant.voice_input.dictate": "Diktieren",
		"ibexa.ai_assistant.chat_input.placeholder": "Frag mich alles...",
		"ibexa.ai_assistant.send_button.title": "Nachricht senden",
		"ibexa.ai_assistant.file_input.title": "Datei anhängen",
		"ibexa.ai_assistant.chat_input.actions_menu.open": "Weitere Aktionen",
		"ibexa.ai_assistant.chat_input.actions_menu.close": "Aktionen schließen",
		"ibexa.ai_assistant.close_button.title": "Schließen",
		"ibexa.ai_assistant.toggle_conversations_popup.no_conversations": "Keine vergangenen Gespräche verfügbar",
		"ibexa.ai_assistant.toggle_conversations_popup.title": "Gespräche anzeigen",
		"ibexa.ai_assistant.search_conversations_field.placeholder": "Suchen...",
		"ibexa.ai_assistant.search_conversations_field.action": "Suchen",
		"ibexa.ai_assistant.new_conversation_button.title": "Neues Gespräch",
		"ibexa.ai_assistant.fullscreen_button.title": "Vollbildmodus aktivieren",
		"ibexa.ai_assistant.fullscreen_exit_button.title": "Vollbildmodus verlassen",
		"ibexa.ai_assistant.conversation_history.title": "Verlauf",
		"ibexa.ai_assistant.conversation_history.empty": "Keine Gespräche gefunden.",
		"ibexa.ai_assistant.new_conversation_button.label": "Neues Gespräch",
		"ibexa.ai_assistant.conversation_history.switch_conversation": "Zu diesem Gespräch wechseln",
		"ibexa.ai_assistant.conversation_history.delete_conversation": "Dieses Gespräch löschen",
		"ibexa.ai_assistant.conversation_history.delete_conversation.confirmation": "Möchten Sie das Gespräch \"{conversationSubject}\" wirklich löschen?",
		"ibexa.ai_assistant.conversations.untitled_conversation": "Unbenanntes Gespräch",
		"ibexa.ai_assistant.conversation_history.end_of_results": "Ende der Ergebnisse",
		"ibexa.ai_assistant.sidebar_toggle.collapse": "Seitenleiste einklappen",
		"ibexa.ai_assistant.sidebar_toggle.expand": "Seitenleiste ausklappen",
		"ibexa.ai_assistant.error.message": "Fehler beim Darstellen der Nachricht",
		"ibexa.ai_assistant.error.create_conversation": "Fehler beim Erstellen des Gesprächs.",
		"ibexa.ai_assistant.error.delete_conversation": "Fehler beim Löschen des Gesprächs.",
		"ibexa.ai_assistant.error.initialize": "Fehler beim Initialisieren des Gesprächs.",
		"ibexa.ai_assistant.error.load_messages": "Fehler beim Laden der Nachrichten.",
		"ibexa.ai_assistant.error.send_message": "Fehler beim Senden der Nachricht.",
		"ibexa.ai_assistant.error.upload_file": "Fehler beim Hochladen der Datei.",
		"ibexa.ai_assistant.file_input.error.file_too_large": "Die folgenden Dateien überschreiten die maximale Größe von {maxSize} MB: {fileNames}.",
		"ibexa.ai_assistant.message.video.not_supported": "Ihr Browser kann dieses Video nicht abspielen.",
		"ibexa.ai_assistant.input_file_preview.image": "Bild",
		"ibexa.ai_assistant.input_file_preview.video": "Video",
		"ibexa.ai_assistant.input_file_preview.spreadsheet": "Tabelle",
		"ibexa.ai_assistant.input_file_preview.document": "Dokument",
		"ibexa.ai_assistant.infinite_scroll_wrapper.beginning_of_conversation": "Beginn der Unterhaltung",
		"ibexa.ai_assistant.voice_input.confirm": "Aufnahme bestätigen",
		"ibexa.ai_assistant.voice_input.discard": "Aufnahme verwerfen",
		"ibexa.ai_assistant.loading_text.thinking": "Nachdenken…",
		"ibexa.ai_assistant.loading_text.generating_response": "Antwort wird generiert…",
		"ibexa.ai_assistant.loading_text.processing": "Verarbeitung…",
		"ibexa.ai_assistant.loading_text.working_on_it": "Ich arbeite daran…",
		"ibexa.ai_assistant.loading_text.preparing_answer": "Antwort wird vorbereitet…",
		"ibexa.ai_assistant.loading_text.analyzing_request": "Anfrage wird analysiert…",
		"ibexa.ai_assistant.loading_text.fetching_information": "Informationen werden abgerufen…",
		"ibexa.ai_assistant.loading_text.let_me_think": "Einen Moment…",
		"ibexa.ai_assistant.loading_text.checking_a_few_things": "Ich überprüfe ein paar Dinge…",
		"ibexa.ai_assistant.loading_text.building_your_answer": "Ihre Antwort wird erstellt…",
		"ibexa.ai_assistant.loading_text.gathering_context": "Kontext wird gesammelt…"
	},
	es: {
		"ibexa.ai_assistant.chatbox_toggle.label": "Preguntar a la IA",
		"ibexa.ai_assistant.voice_input.dictate": "Dictar",
		"ibexa.ai_assistant.chat_input.placeholder": "Pregúntame lo que quieras...",
		"ibexa.ai_assistant.send_button.title": "Enviar mensaje",
		"ibexa.ai_assistant.file_input.title": "Adjuntar archivo",
		"ibexa.ai_assistant.chat_input.actions_menu.open": "Más acciones",
		"ibexa.ai_assistant.chat_input.actions_menu.close": "Cerrar acciones",
		"ibexa.ai_assistant.close_button.title": "Cerrar",
		"ibexa.ai_assistant.toggle_conversations_popup.no_conversations": "No hay conversaciones pasadas disponibles",
		"ibexa.ai_assistant.toggle_conversations_popup.title": "Mostrar conversaciones",
		"ibexa.ai_assistant.search_conversations_field.placeholder": "Buscar...",
		"ibexa.ai_assistant.search_conversations_field.action": "Buscar",
		"ibexa.ai_assistant.new_conversation_button.title": "Nueva conversación",
		"ibexa.ai_assistant.fullscreen_button.title": "Entrar en pantalla completa",
		"ibexa.ai_assistant.fullscreen_exit_button.title": "Salir de pantalla completa",
		"ibexa.ai_assistant.conversation_history.title": "Historial",
		"ibexa.ai_assistant.conversation_history.empty": "No se encontraron conversaciones.",
		"ibexa.ai_assistant.new_conversation_button.label": "Nueva Conversación",
		"ibexa.ai_assistant.conversation_history.switch_conversation": "Cambiar a esta conversación",
		"ibexa.ai_assistant.conversation_history.delete_conversation": "Eliminar esta conversación",
		"ibexa.ai_assistant.conversation_history.delete_conversation.confirmation": "¿Está seguro de que desea eliminar la conversación \"{conversationSubject}\"?",
		"ibexa.ai_assistant.conversations.untitled_conversation": "Conversación sin título",
		"ibexa.ai_assistant.conversation_history.end_of_results": "Fin de los resultados",
		"ibexa.ai_assistant.sidebar_toggle.collapse": "Contraer barra lateral",
		"ibexa.ai_assistant.sidebar_toggle.expand": "Expandir barra lateral",
		"ibexa.ai_assistant.error.message": "Error al renderizar el mensaje.",
		"ibexa.ai_assistant.error.create_conversation": "Error al crear la conversación.",
		"ibexa.ai_assistant.error.delete_conversation": "Error al eliminar la conversación.",
		"ibexa.ai_assistant.error.initialize": "Error al inicializar la conversación.",
		"ibexa.ai_assistant.error.load_messages": "Error al cargar los mensajes.",
		"ibexa.ai_assistant.error.send_message": "Error al enviar el mensaje.",
		"ibexa.ai_assistant.error.upload_file": "Error al subir el archivo.",
		"ibexa.ai_assistant.file_input.error.file_too_large": "Los siguientes archivos superan el tamaño máximo de {maxSize} MB: {fileNames}.",
		"ibexa.ai_assistant.message.video.not_supported": "Su navegador no puede reproducir este video.",
		"ibexa.ai_assistant.input_file_preview.image": "Imagen",
		"ibexa.ai_assistant.input_file_preview.video": "Vídeo",
		"ibexa.ai_assistant.input_file_preview.spreadsheet": "Hoja de cálculo",
		"ibexa.ai_assistant.input_file_preview.document": "Documento",
		"ibexa.ai_assistant.infinite_scroll_wrapper.beginning_of_conversation": "Inicio de la conversación",
		"ibexa.ai_assistant.voice_input.confirm": "Confirmar grabación",
		"ibexa.ai_assistant.voice_input.discard": "Descartar grabación",
		"ibexa.ai_assistant.loading_text.thinking": "Pensando…",
		"ibexa.ai_assistant.loading_text.generating_response": "Generando respuesta…",
		"ibexa.ai_assistant.loading_text.processing": "Procesando…",
		"ibexa.ai_assistant.loading_text.working_on_it": "Trabajando en ello…",
		"ibexa.ai_assistant.loading_text.preparing_answer": "Preparando respuesta…",
		"ibexa.ai_assistant.loading_text.analyzing_request": "Analizando solicitud…",
		"ibexa.ai_assistant.loading_text.fetching_information": "Obteniendo información…",
		"ibexa.ai_assistant.loading_text.let_me_think": "Déjame pensar…",
		"ibexa.ai_assistant.loading_text.checking_a_few_things": "Verificando algunas cosas…",
		"ibexa.ai_assistant.loading_text.building_your_answer": "Construyendo tu respuesta…",
		"ibexa.ai_assistant.loading_text.gathering_context": "Recopilando contexto…"
	},
	fr: {
		"ibexa.ai_assistant.chatbox_toggle.label": "Demander à l'IA",
		"ibexa.ai_assistant.voice_input.dictate": "Dicter",
		"ibexa.ai_assistant.chat_input.placeholder": "Demandez-moi n'importe quoi...",
		"ibexa.ai_assistant.send_button.title": "Envoyer le message",
		"ibexa.ai_assistant.file_input.title": "Joindre un fichier",
		"ibexa.ai_assistant.chat_input.actions_menu.open": "Plus d'actions",
		"ibexa.ai_assistant.chat_input.actions_menu.close": "Fermer les actions",
		"ibexa.ai_assistant.close_button.title": "Fermer",
		"ibexa.ai_assistant.toggle_conversations_popup.no_conversations": "Aucune conversation passée disponible",
		"ibexa.ai_assistant.toggle_conversations_popup.title": "Afficher les conversations",
		"ibexa.ai_assistant.search_conversations_field.placeholder": "Rechercher...",
		"ibexa.ai_assistant.search_conversations_field.action": "Rechercher",
		"ibexa.ai_assistant.new_conversation_button.title": "Nouvelle conversation",
		"ibexa.ai_assistant.fullscreen_button.title": "Passer en plein écran",
		"ibexa.ai_assistant.fullscreen_exit_button.title": "Quitter le plein écran",
		"ibexa.ai_assistant.conversation_history.title": "Historique",
		"ibexa.ai_assistant.conversation_history.empty": "Aucune conversation trouvée.",
		"ibexa.ai_assistant.new_conversation_button.label": "Nouvelle Conversation",
		"ibexa.ai_assistant.conversation_history.switch_conversation": "Basculer vers cette conversation",
		"ibexa.ai_assistant.conversation_history.delete_conversation": "Supprimer cette conversation",
		"ibexa.ai_assistant.conversation_history.delete_conversation.confirmation": "Êtes-vous sûr de vouloir supprimer la conversation \"{conversationSubject}\" ?",
		"ibexa.ai_assistant.conversations.untitled_conversation": "Conversation sans titre",
		"ibexa.ai_assistant.conversation_history.end_of_results": "Fin des résultats",
		"ibexa.ai_assistant.sidebar_toggle.collapse": "Réduire la barre latérale",
		"ibexa.ai_assistant.sidebar_toggle.expand": "Développer la barre latérale",
		"ibexa.ai_assistant.error.message": "Erreur lors du rendu du message.",
		"ibexa.ai_assistant.error.create_conversation": "Erreur lors de la création de la conversation.",
		"ibexa.ai_assistant.error.delete_conversation": "Erreur lors de la suppression de la conversation.",
		"ibexa.ai_assistant.error.initialize": "Erreur lors de l'initialisation de la conversation.",
		"ibexa.ai_assistant.error.load_messages": "Erreur lors du chargement des messages.",
		"ibexa.ai_assistant.error.send_message": "Erreur lors de l'envoi du message.",
		"ibexa.ai_assistant.error.upload_file": "Erreur lors du téléversement du fichier.",
		"ibexa.ai_assistant.file_input.error.file_too_large": "Les fichiers suivants dépassent la taille maximale de {maxSize} Mo : {fileNames}.",
		"ibexa.ai_assistant.message.video.not_supported": "Votre navigateur ne peut pas jouer cette vidéo.",
		"ibexa.ai_assistant.input_file_preview.image": "Image",
		"ibexa.ai_assistant.input_file_preview.video": "Vidéo",
		"ibexa.ai_assistant.input_file_preview.spreadsheet": "Tableur",
		"ibexa.ai_assistant.input_file_preview.document": "Document",
		"ibexa.ai_assistant.infinite_scroll_wrapper.beginning_of_conversation": "Début de la conversation",
		"ibexa.ai_assistant.voice_input.confirm": "Confirmer l'enregistrement",
		"ibexa.ai_assistant.voice_input.discard": "Annuler l'enregistrement",
		"ibexa.ai_assistant.loading_text.thinking": "Réflexion…",
		"ibexa.ai_assistant.loading_text.generating_response": "Génération de la réponse…",
		"ibexa.ai_assistant.loading_text.processing": "Traitement…",
		"ibexa.ai_assistant.loading_text.working_on_it": "Je m'en occupe…",
		"ibexa.ai_assistant.loading_text.preparing_answer": "Préparation de la réponse…",
		"ibexa.ai_assistant.loading_text.analyzing_request": "Analyse de la demande…",
		"ibexa.ai_assistant.loading_text.fetching_information": "Récupération des informations…",
		"ibexa.ai_assistant.loading_text.let_me_think": "Laissez-moi réfléchir…",
		"ibexa.ai_assistant.loading_text.checking_a_few_things": "Vérification de quelques éléments…",
		"ibexa.ai_assistant.loading_text.building_your_answer": "Construction de votre réponse…",
		"ibexa.ai_assistant.loading_text.gathering_context": "Collecte du contexte…"
	}
}, Ge = "en", Ke = ({ locale: e = Ge, messages: t = {}, children: n }) => {
	let r = {
		...We[e] ?? {},
		...t
	};
	return /* @__PURE__ */ p(h, {
		locale: e,
		messages: r,
		children: n
	});
}, qe = (e) => {
	let [t, n] = d("");
	return o(() => {
		if (!e?.type.startsWith("image/")) {
			n("");
			return;
		}
		let t = URL.createObjectURL(e);
		return n(t), () => {
			URL.revokeObjectURL(t);
		};
	}, [e]), t;
}, Je = (e) => Object.prototype.toString.call(e) === "[object Object]" ? Object.entries(e).reduce((e, [t, n]) => n ? `${e} ${t}` : e, "").trim() : "", Ye = ({ children: e, labelled: t = !1, onClick: n, title: r, size: i = "medium", className: a = "", disabled: o = !1, "data-testid": s, "aria-haspopup": c, "aria-expanded": l }) => {
	let u = Je({
		"ibexa-ai-assistant-button": !0,
		"ibexa-ai-assistant-button--disabled": o,
		"ibexa-ai-assistant-button--labelled": !!t,
		[`ibexa-ai-assistant-button--${i}`]: !0,
		[a]: !!a
	});
	return /* @__PURE__ */ p("button", {
		className: u,
		onClick: n,
		title: r,
		"aria-label": t ? void 0 : r,
		type: "button",
		disabled: o,
		"data-testid": s,
		"aria-haspopup": c,
		"aria-expanded": l,
		children: e
	});
}, Xe = () => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [/* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M18.3968 5.6013C18.1766 5.38216 17.8204 5.38301 17.6013 5.60321C17.0423 6.16493 16.2976 6.89951 15.5041 7.68235C14.1056 9.06185 12.5553 10.5912 11.6011 11.5886C11.39 11.8093 11.3934 12.158 11.6089 12.3743C12.5101 13.2797 13.7301 14.506 14.9128 15.6947C15.9056 16.6927 16.872 17.6641 17.6013 18.3968C17.8205 18.617 18.1766 18.6178 18.3968 18.3987C18.617 18.1795 18.6178 17.8234 18.3987 17.6032C17.6698 16.8709 16.703 15.8991 15.7099 14.9008C14.69 13.8757 13.6422 12.8225 12.7954 11.9717C13.7388 11.0039 15.055 9.70566 16.2693 8.50785C17.0682 7.71975 17.8231 6.97515 18.3987 6.39679C18.6178 6.1766 18.617 5.82044 18.3968 5.6013Z",
		fill: "currentColor"
	}), /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M6 5.4375C5.68934 5.4375 5.4375 5.68934 5.4375 6V18C5.4375 18.3107 5.68934 18.5625 6 18.5625C6.31066 18.5625 6.5625 18.3107 6.5625 18V6C6.5625 5.68934 6.31066 5.4375 6 5.4375Z",
		fill: "currentColor"
	})]
}), Ze = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: [/* @__PURE__ */ p("g", {
		clipPath: "url(#clip0_6701_103961)",
		children: /* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M24 4.58325C24.4142 4.58325 24.75 4.91904 24.75 5.33325C24.75 5.84158 24.9519 6.32909 25.3114 6.68854C25.6708 7.04798 26.1583 7.24992 26.6667 7.24992C27.0809 7.24992 27.4167 7.58571 27.4167 7.99992C27.4167 8.41413 27.0809 8.74992 26.6667 8.74992C26.1583 8.74992 25.6708 8.95185 25.3114 9.3113C24.9519 9.67074 24.75 10.1583 24.75 10.6666C24.75 11.0808 24.4142 11.4166 24 11.4166C23.5858 11.4166 23.25 11.0808 23.25 10.6666C23.25 10.1583 23.0481 9.67074 22.6886 9.3113C22.3292 8.95185 21.8417 8.74992 21.3333 8.74992C20.9191 8.74992 20.5833 8.41413 20.5833 7.99992C20.5833 7.58571 20.9191 7.24992 21.3333 7.24992C21.8417 7.24992 22.3292 7.04798 22.6886 6.68854C23.0481 6.3291 23.25 5.84158 23.25 5.33325C23.25 4.91904 23.5858 4.58325 24 4.58325ZM24 7.46927C23.922 7.56665 23.8384 7.66013 23.7493 7.7492C23.6602 7.83827 23.5667 7.92192 23.4693 7.99992C23.5667 8.07793 23.6602 8.16157 23.7493 8.25064C23.8384 8.33971 23.922 8.43319 24 8.53057C24.078 8.43319 24.1616 8.33971 24.2507 8.25064C24.3398 8.16157 24.4333 8.07793 24.5306 7.99992C24.4333 7.92192 24.3398 7.83827 24.2507 7.7492C24.1616 7.66013 24.078 7.56665 24 7.46927ZM12 7.24992C12.4142 7.24992 12.75 7.58571 12.75 7.99992C12.75 9.92274 13.5138 11.7668 14.8735 13.1264C16.2331 14.4861 18.0772 15.2499 20 15.2499C20.4142 15.2499 20.75 15.5857 20.75 15.9999C20.75 16.4141 20.4142 16.7499 20 16.7499C18.0772 16.7499 16.2331 17.5138 14.8735 18.8734C13.5138 20.233 12.75 22.0771 12.75 23.9999C12.75 24.4141 12.4142 24.7499 12 24.7499C11.5858 24.7499 11.25 24.4141 11.25 23.9999C11.25 22.0771 10.4862 20.233 9.12652 18.8734C7.76688 17.5138 5.92282 16.7499 4 16.7499C3.58579 16.7499 3.25 16.4141 3.25 15.9999C3.25 15.5857 3.58579 15.2499 4 15.2499C5.92282 15.2499 7.76688 14.4861 9.12652 13.1264C10.4862 11.7668 11.25 9.92274 11.25 7.99992C11.25 7.58571 11.5858 7.24992 12 7.24992ZM12 11.5443C11.5677 12.5201 10.9564 13.4178 10.1872 14.1871C9.41792 14.9564 8.52016 15.5676 7.54436 15.9999C8.52016 16.4322 9.41792 17.0435 10.1872 17.8127C10.9564 18.582 11.5677 19.4798 12 20.4556C12.4323 19.4798 13.0435 18.582 13.8128 17.8127C14.5821 17.0435 15.4798 16.4322 16.4556 15.9999C15.4798 15.5676 14.5821 14.9564 13.8128 14.1871C13.0435 13.4178 12.4323 12.5201 12 11.5443ZM24 20.5833C24.4142 20.5833 24.75 20.919 24.75 21.3333C24.75 21.8416 24.9519 22.3291 25.3114 22.6885C25.6708 23.048 26.1583 23.2499 26.6667 23.2499C27.0809 23.2499 27.4167 23.5857 27.4167 23.9999C27.4167 24.4141 27.0809 24.7499 26.6667 24.7499C26.1583 24.7499 25.6708 24.9519 25.3114 25.3113C24.9519 25.6707 24.75 26.1583 24.75 26.6666C24.75 27.0808 24.4142 27.4166 24 27.4166C23.5858 27.4166 23.25 27.0808 23.25 26.6666C23.25 26.1583 23.0481 25.6707 22.6886 25.3113C22.3292 24.9519 21.8417 24.7499 21.3333 24.7499C20.9191 24.7499 20.5833 24.4141 20.5833 23.9999C20.5833 23.5857 20.9191 23.2499 21.3333 23.2499C21.8417 23.2499 22.3292 23.048 22.6886 22.6885C23.0481 22.3291 23.25 21.8416 23.25 21.3333C23.25 20.919 23.5858 20.5833 24 20.5833ZM24 23.4693C23.922 23.5666 23.8384 23.6601 23.7493 23.7492C23.6602 23.8383 23.5667 23.9219 23.4693 23.9999C23.5667 24.0779 23.6602 24.1616 23.7493 24.2506C23.8384 24.3397 23.922 24.4332 24 24.5306C24.078 24.4332 24.1616 24.3397 24.2507 24.2506C24.3398 24.1616 24.4333 24.0779 24.5306 23.9999C24.4333 23.9219 24.3398 23.8383 24.2507 23.7492C24.1616 23.6601 24.078 23.5666 24 23.4693Z"
		})
	}), /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", {
		id: "clip0_6701_103961",
		children: /* @__PURE__ */ p("rect", {
			width: "32",
			height: "32"
		})
	}) })]
}), Qe = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "32",
	height: "32",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ p("path", { d: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" }),
		/* @__PURE__ */ p("circle", {
			cx: "9",
			cy: "10",
			r: "1"
		}),
		/* @__PURE__ */ p("circle", {
			cx: "15",
			cy: "10",
			r: "1"
		}),
		/* @__PURE__ */ p("path", { d: "M10 13h4" })
	]
}), $e = () => /* @__PURE__ */ p("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M4.66854 7.16854C4.8516 6.98549 5.1484 6.98549 5.33146 7.16854L10 11.8371L14.6685 7.16854C14.8516 6.98549 15.1484 6.98549 15.3315 7.16854C15.5145 7.3516 15.5145 7.6484 15.3315 7.83146L10.3315 12.8315C10.1484 13.0145 9.8516 13.0145 9.66854 12.8315L4.66854 7.83146C4.48549 7.6484 4.48549 7.3516 4.66854 7.16854Z",
		fill: "currentColor"
	})
}), et = () => /* @__PURE__ */ m("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ p("path", {
			d: "M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z",
			fill: "#D4D4D4"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M15.3314 4.6685C15.5145 4.8516 15.5145 5.1484 15.3314 5.3315L5.3315 15.3314C5.1484 15.5145 4.8516 15.5145 4.6685 15.3314C4.4854 15.1484 4.4854 14.8516 4.6685 14.6686L14.6686 4.6685C14.8516 4.4854 15.1484 4.4854 15.3314 4.6685Z",
			fill: "white"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M4.6685 4.6685C4.8516 4.4854 5.1484 4.4854 5.3315 4.6685L15.3314 14.6686C15.5145 14.8516 15.5145 15.1484 15.3314 15.3314C15.1484 15.5145 14.8516 15.5145 14.6686 15.3314L4.6685 5.3315C4.4854 5.1484 4.4854 4.8516 4.6685 4.6685Z",
			fill: "white"
		})
	]
}), tt = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: [/* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M24.5303 7.46967C24.8232 7.76256 24.8232 8.23744 24.5303 8.53033L8.53033 24.5303C8.23744 24.8232 7.76256 24.8232 7.46967 24.5303C7.17678 24.2374 7.17678 23.7626 7.46967 23.4697L23.4697 7.46967C23.7626 7.17678 24.2374 7.17678 24.5303 7.46967Z"
	}), /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M7.46967 7.46967C7.76256 7.17678 8.23744 7.17678 8.53033 7.46967L24.5303 23.4697C24.8232 23.7626 24.8232 24.2374 24.5303 24.5303C24.2374 24.8232 23.7626 24.8232 23.4697 24.5303L7.46967 8.53033C7.17678 8.23744 7.17678 7.76256 7.46967 7.46967Z"
	})]
}), nt = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: [
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M18.6667 7.25C19.0809 7.25 19.4167 7.58579 19.4167 8V12.5833H24C24.4142 12.5833 24.75 12.9191 24.75 13.3333C24.75 13.7475 24.4142 14.0833 24 14.0833H18.6667C18.2525 14.0833 17.9167 13.7475 17.9167 13.3333V8C17.9167 7.58579 18.2525 7.25 18.6667 7.25Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M27.197 4.80292C27.4899 5.09582 27.4899 5.57069 27.197 5.86358L19.197 13.8636C18.9041 14.1565 18.4292 14.1565 18.1363 13.8636C17.8434 13.5707 17.8434 13.0958 18.1363 12.8029L26.1363 4.80292C26.4292 4.51003 26.9041 4.51003 27.197 4.80292Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M7.25 18.6667C7.25 18.2525 7.58579 17.9167 8 17.9167H13.3333C13.7475 17.9167 14.0833 18.2525 14.0833 18.6667V24.0001C14.0833 24.4143 13.7475 24.7501 13.3333 24.7501C12.9191 24.7501 12.5833 24.4143 12.5833 24.0001V19.4167H8C7.58579 19.4167 7.25 19.081 7.25 18.6667Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M13.8637 18.1364C14.1566 18.4293 14.1566 18.9042 13.8637 19.1971L5.86366 27.1971C5.57077 27.49 5.0959 27.49 4.803 27.1971C4.51011 26.9042 4.51011 26.4293 4.803 26.1364L12.803 18.1364C13.0959 17.8435 13.5708 17.8435 13.8637 18.1364Z"
		})
	]
}), rt = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: [
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M20.5833 5.33325C20.5833 4.91904 20.9191 4.58325 21.3333 4.58325H26.6667C27.0809 4.58325 27.4167 4.91904 27.4167 5.33325V10.6666C27.4167 11.0808 27.0809 11.4166 26.6667 11.4166C26.2525 11.4166 25.9167 11.0808 25.9167 10.6666V6.08325H21.3333C20.9191 6.08325 20.5833 5.74747 20.5833 5.33325Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M27.197 4.80292C27.4899 5.09582 27.4899 5.57069 27.197 5.86358L19.197 13.8636C18.9041 14.1565 18.4292 14.1565 18.1363 13.8636C17.8434 13.5707 17.8434 13.0958 18.1363 12.8029L26.1363 4.80292C26.4292 4.51003 26.9041 4.51003 27.197 4.80292Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5.33334 20.5833C5.74755 20.5833 6.08334 20.919 6.08334 21.3333V25.9166H10.6667C11.0809 25.9166 11.4167 26.2524 11.4167 26.6666C11.4167 27.0808 11.0809 27.4166 10.6667 27.4166H5.33334C4.91912 27.4166 4.58334 27.0808 4.58334 26.6666V21.3333C4.58334 20.919 4.91912 20.5833 5.33334 20.5833Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M13.8637 18.1364C14.1566 18.4293 14.1566 18.9042 13.8637 19.1971L5.86367 27.1971C5.57077 27.49 5.0959 27.49 4.80301 27.1971C4.51011 26.9042 4.51011 26.4293 4.80301 26.1364L12.803 18.1364C13.0959 17.8435 13.5708 17.8435 13.8637 18.1364Z"
		})
	]
}), it = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: [
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 3.41669C15.138 3.41669 14.3114 3.7591 13.7019 4.36859C13.0924 4.97808 12.75 5.80473 12.75 6.66669V13.3334C12.75 14.1953 13.0924 15.022 13.7019 15.6315C14.3114 16.2409 15.138 16.5834 16 16.5834C16.862 16.5834 17.6886 16.2409 18.2981 15.6315C18.9076 15.022 19.25 14.1953 19.25 13.3334V6.66669C19.25 5.80473 18.9076 4.97808 18.2981 4.36859C17.6886 3.7591 16.862 3.41669 16 3.41669ZM12.6412 3.30793C13.532 2.41713 14.7402 1.91669 16 1.91669C17.2598 1.91669 18.468 2.41713 19.3588 3.30793C20.2496 4.19873 20.75 5.40691 20.75 6.66669V13.3334C20.75 14.5931 20.2496 15.8013 19.3588 16.6921C18.468 17.5829 17.2598 18.0834 16 18.0834C14.7402 18.0834 13.532 17.5829 12.6412 16.6921C11.7504 15.8013 11.25 14.5931 11.25 13.3334V6.66669C11.25 5.40691 11.7504 4.19873 12.6412 3.30793Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M6.66666 12.5833C7.08087 12.5833 7.41666 12.9191 7.41666 13.3333C7.41666 15.6098 8.32097 17.793 9.93066 19.4026C11.5403 21.0123 13.7235 21.9166 16 21.9166C18.2764 21.9166 20.4596 21.0123 22.0693 19.4026C23.679 17.793 24.5833 15.6098 24.5833 13.3333C24.5833 12.9191 24.9191 12.5833 25.3333 12.5833C25.7475 12.5833 26.0833 12.9191 26.0833 13.3333C26.0833 16.0076 25.021 18.5723 23.13 20.4633C21.239 22.3543 18.6743 23.4166 16 23.4166C13.3257 23.4166 10.761 22.3543 8.87 20.4633C6.979 18.5723 5.91666 16.0076 5.91666 13.3333C5.91666 12.9191 6.25244 12.5833 6.66666 12.5833Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M9.91666 28C9.91666 27.5858 10.2524 27.25 10.6667 27.25H21.3333C21.7475 27.25 22.0833 27.5858 22.0833 28C22.0833 28.4142 21.7475 28.75 21.3333 28.75H10.6667C10.2524 28.75 9.91666 28.4142 9.91666 28Z"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 21.9167C16.4142 21.9167 16.75 22.2525 16.75 22.6667V28C16.75 28.4142 16.4142 28.75 16 28.75C15.5858 28.75 15.25 28.4142 15.25 28V22.6667C15.25 22.2525 15.5858 21.9167 16 21.9167Z"
		})
	]
}), at = () => /* @__PURE__ */ m("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	children: [/* @__PURE__ */ m("g", {
		clipPath: "url(#clip0_10948_6818)",
		children: [
			/* @__PURE__ */ p("path", { d: "M13.3335 7.03092L13.3811 7.03337C13.6176 7.05732 13.8023 7.25693 13.8023 7.49967C13.8023 7.74242 13.6176 7.94203 13.3811 7.96598L13.3335 7.96842H6.66667C6.40778 7.96842 6.19792 7.75856 6.19792 7.49967C6.19792 7.24079 6.40778 7.03092 6.66667 7.03092H13.3335Z" }),
			/* @__PURE__ */ p("path", { d: "M11.6667 10.3643C11.9256 10.3643 12.1354 10.5741 12.1354 10.833C12.1354 11.0919 11.9256 11.3018 11.6667 11.3018H6.66667C6.40778 11.3018 6.19792 11.0919 6.19792 10.833C6.19792 10.5741 6.40778 10.3643 6.66667 10.3643H11.6667Z" }),
			/* @__PURE__ */ p("path", { d: "M17.0312 10.4161V5.83301C17.0312 5.29429 16.8171 4.77778 16.4362 4.39685C16.0552 4.01592 15.5387 3.80176 15 3.80176H5C4.46128 3.80176 3.94478 4.01592 3.56384 4.39685C3.18291 4.77778 2.96875 5.29429 2.96875 5.83301V12.4999C2.9688 13.0385 3.18296 13.5552 3.56384 13.936C3.94477 14.3169 4.46133 14.5311 5 14.5311H6.66687C6.92566 14.5312 7.13562 14.7411 7.13562 14.9999V16.6716L9.76746 15.0927C9.98941 14.9597 10.277 15.0319 10.4102 15.2538C10.5432 15.4757 10.4715 15.7633 10.2496 15.8965L6.90796 17.9015C6.76315 17.9884 6.5825 17.9908 6.43555 17.9076C6.28872 17.8244 6.19819 17.6686 6.19812 17.4999V15.4686H5C4.21269 15.4686 3.45774 15.1556 2.901 14.5989C2.3443 14.0422 2.0313 13.2872 2.03125 12.4999V5.83301C2.03125 5.04565 2.34425 4.29076 2.901 3.73401C3.45775 3.17726 4.21264 2.86426 5 2.86426H15C15.7874 2.86426 16.5423 3.17726 17.099 3.73401C17.6557 4.29076 17.9688 5.04565 17.9688 5.83301V10.4161C17.9688 10.675 17.7589 10.8849 17.5 10.8849C17.2411 10.8849 17.0312 10.675 17.0312 10.4161Z" }),
			/* @__PURE__ */ p("path", { d: "M18.3333 15.3643C18.5922 15.3643 18.8021 15.5741 18.8021 15.833C18.8021 16.0919 18.5922 16.3018 18.3333 16.3018H13.3333C13.0745 16.3018 12.8646 16.0919 12.8646 15.833C12.8646 15.5741 13.0745 15.3643 13.3333 15.3643H18.3333Z" }),
			/* @__PURE__ */ p("path", { d: "M15.3646 18.333V13.333C15.3646 13.0741 15.5745 12.8643 15.8333 12.8643C16.0922 12.8643 16.3021 13.0741 16.3021 13.333V18.333C16.3021 18.5919 16.0922 18.8018 15.8333 18.8018C15.5745 18.8018 15.3646 18.5919 15.3646 18.333Z" })
		]
	}), /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", {
		id: "clip0_10948_6818",
		children: /* @__PURE__ */ p("rect", {
			width: "20",
			height: "20",
			fill: "white"
		})
	}) })]
}), ot = () => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 32 32",
	fill: "currentColor",
	xmlns: "http://www.w3.org/2000/svg",
	children: [/* @__PURE__ */ p("g", {
		clipPath: "url(#clip0_16144_5705)",
		children: /* @__PURE__ */ p("path", { d: "M24.9066 9.3335C24.9066 8.0323 24.3901 6.78395 23.4701 5.86377C22.55 4.94365 21.3016 4.42637 20.0004 4.42627C18.699 4.42627 17.4509 4.94356 16.5306 5.86377L7.86365 14.5298C6.41307 15.9804 5.5981 17.9481 5.59802 19.9995C5.59802 22.051 6.41307 24.0186 7.86365 25.4692C9.31429 26.9199 11.2818 27.7349 13.3334 27.7349C15.3849 27.7348 17.3525 26.9199 18.8031 25.4692L27.4701 16.8032C27.763 16.5103 28.2378 16.5103 28.5306 16.8032C28.8231 17.0961 28.8234 17.571 28.5306 17.8638L19.8636 26.5298C18.1317 28.2617 15.7827 29.2348 13.3334 29.2349C10.884 29.2349 8.53505 28.2617 6.8031 26.5298C5.07121 24.7978 4.09802 22.4488 4.09802 19.9995C4.0981 17.5503 5.07121 15.2011 6.8031 13.4692L15.4701 4.80322C16.6716 3.60171 18.3012 2.92627 20.0004 2.92627C21.6994 2.92637 23.3292 3.6018 24.5306 4.80322C25.7319 6.0047 26.4066 7.63447 26.4066 9.3335C26.4065 11.0326 25.7321 12.6623 24.5306 13.8638L15.8636 22.5298C15.1926 23.2009 14.2824 23.5786 13.3334 23.5786C12.3843 23.5786 11.4742 23.2009 10.8031 22.5298C10.1321 21.8587 9.75525 20.9485 9.75525 19.9995C9.75532 19.0506 10.1321 18.1403 10.8031 17.4692L19.4701 8.80322C19.763 8.51034 20.2378 8.51033 20.5306 8.80322C20.8231 9.09614 20.8234 9.571 20.5306 9.86377L11.8636 18.5298C11.4739 18.9195 11.2553 19.4484 11.2552 19.9995C11.2552 20.5507 11.4739 21.0795 11.8636 21.4692C12.2534 21.859 12.7821 22.0786 13.3334 22.0786C13.8846 22.0786 14.4133 21.859 14.8031 21.4692L23.4701 12.8032C24.3902 11.8831 24.9065 10.6347 24.9066 9.3335Z" })
	}), /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", {
		id: "clip0_16144_5705",
		children: /* @__PURE__ */ p("rect", {
			width: "32",
			height: "32",
			fill: "white"
		})
	}) })]
}), st = () => /* @__PURE__ */ p("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 21 24",
	fill: "none",
	children: /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M0.961202 0.245937C1.55522 -0.0903891 2.28423 -0.0811919 2.86957 0.270014L19.7117 10.3753C20.2824 10.7177 20.6316 11.3344 20.6316 12C20.6316 12.6656 20.2824 13.2823 19.7117 13.6247L2.86957 23.73C2.28423 24.0812 1.55522 24.0904 0.961202 23.7541C0.367186 23.4177 0 22.7879 0 22.1053V1.89474C0 1.21212 0.367186 0.582264 0.961202 0.245937Z",
		fill: "currentColor"
	})
}), ct = () => /* @__PURE__ */ p("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32",
	fill: "currentColor",
	children: /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M16 6.25C16.4142 6.25 16.75 6.58579 16.75 7V15.25H25C25.4142 15.25 25.75 15.5858 25.75 16C25.75 16.4142 25.4142 16.75 25 16.75H16.75V25C16.75 25.4142 16.4142 25.75 16 25.75C15.5858 25.75 15.25 25.4142 15.25 25V16.75H7C6.58579 16.75 6.25 16.4142 6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H15.25V7C15.25 6.58579 15.5858 6.25 16 6.25Z"
	})
}), lt = () => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 32 32",
	xmlns: "http://www.w3.org/2000/svg",
	children: [/* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		fill: "currentColor",
		d: "M9.47461 4.01755C10.698 3.51081 12.0092 3.25 13.3333 3.25C14.6575 3.25 15.9687 3.51081 17.1921 4.01755C18.4154 4.52428 19.527 5.26702 20.4633 6.20334C21.3997 7.13966 22.1424 8.25124 22.6491 9.47461C23.1559 10.698 23.4167 12.0092 23.4167 13.3333C23.4167 14.6575 23.1559 15.9687 22.6491 17.1921C22.1424 18.4154 21.3997 19.527 20.4633 20.4633C19.527 21.3997 18.4154 22.1424 17.1921 22.6491C15.9687 23.1559 14.6575 23.4167 13.3333 23.4167C12.0092 23.4167 10.698 23.1559 9.47461 22.6491C8.25124 22.1424 7.13966 21.3997 6.20334 20.4633C5.26702 19.527 4.52428 18.4154 4.01755 17.1921C3.51081 15.9687 3.25 14.6575 3.25 13.3333C3.25 12.0092 3.51081 10.698 4.01755 9.47461C4.52428 8.25124 5.26702 7.13966 6.20334 6.20334C7.13966 5.26702 8.25124 4.52428 9.47461 4.01755ZM13.3333 4.75C12.2062 4.75 11.09 4.97201 10.0486 5.40337C9.00726 5.83472 8.06104 6.46696 7.264 7.264C6.46696 8.06104 5.83472 9.00726 5.40337 10.0486C4.97201 11.09 4.75 12.2062 4.75 13.3333C4.75 14.4605 4.97201 15.5767 5.40337 16.618C5.83472 17.6594 6.46696 18.6056 7.264 19.4027C8.06104 20.1997 9.00726 20.8319 10.0486 21.2633C11.09 21.6947 12.2062 21.9167 13.3333 21.9167C14.4605 21.9167 15.5767 21.6947 16.618 21.2633C17.6594 20.8319 18.6056 20.1997 19.4027 19.4027C20.1997 18.6056 20.8319 17.6594 21.2633 16.618C21.6947 15.5767 21.9167 14.4605 21.9167 13.3333C21.9167 12.2062 21.6947 11.09 21.2633 10.0486C20.8319 9.00726 20.1997 8.06104 19.4027 7.264C18.6056 6.46696 17.6594 5.83472 16.618 5.40337C15.5767 4.97201 14.4605 4.75 13.3333 4.75Z"
	}), /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		fill: "currentColor",
		d: "M19.4697 19.4697C19.7626 19.1768 20.2374 19.1768 20.5303 19.4697L28.5303 27.4697C28.8232 27.7626 28.8232 28.2374 28.5303 28.5303C28.2374 28.8232 27.7626 28.8232 27.4697 28.5303L19.4697 20.5303C19.1768 20.2374 19.1768 19.7626 19.4697 19.4697Z"
	})]
}), ut = () => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 20 20",
	xmlns: "http://www.w3.org/2000/svg",
	children: [/* @__PURE__ */ p("g", {
		clipPath: "url(#clip0_10997_16949)",
		children: /* @__PURE__ */ p("path", { d: "M3.67676 2.58691C3.84839 2.57403 4.0216 2.59988 4.18359 2.66211C4.20401 2.66996 4.22449 2.67888 4.24414 2.68848L17.8291 9.32617C18.0863 9.45188 18.2497 9.71372 18.25 10C18.25 10.2864 18.0863 10.548 17.8291 10.6738L4.24414 17.3125C4.22455 17.3221 4.20395 17.331 4.18359 17.3389C3.96752 17.4218 3.73159 17.4389 3.50586 17.3877C3.33629 17.3492 3.17761 17.2735 3.04199 17.167L2.91504 17.0508C2.76138 16.8884 2.6556 16.6865 2.60938 16.4678C2.564 16.2526 2.5786 16.029 2.65039 15.8213L4.55371 10.2061L4.375 10.7549L13.0146 9.99805L4.375 9.24707L4.53809 9.74609L2.64941 4.17969L2.65039 4.17871C2.57883 3.97121 2.56405 3.74812 2.60938 3.5332L2.65527 3.37207C2.71181 3.21553 2.79975 3.07091 2.91504 2.94922L2.91602 2.9502C3.07507 2.78225 3.28028 2.66451 3.50586 2.61328L3.67676 2.58691ZM4.62402 10L4.55371 10.2061L4.62109 10.001L4.53809 9.74609L4.62402 10Z" })
	}), /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", {
		id: "clip0_10997_16949",
		children: /* @__PURE__ */ p("rect", {
			width: "20",
			height: "20",
			fill: "white"
		})
	}) })]
}), dt = () => /* @__PURE__ */ p("svg", {
	viewBox: "0 0 32 32",
	xmlns: "http://www.w3.org/2000/svg",
	fill: "currentColor",
	children: /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M6.66667 4.75C6.15833 4.75 5.67082 4.95193 5.31138 5.31138C4.95193 5.67082 4.75 6.15833 4.75 6.66667V25.3333C4.75 25.8417 4.95193 26.3292 5.31138 26.6886C5.67082 27.0481 6.15834 27.25 6.66667 27.25H25.3333C25.8417 27.25 26.3292 27.0481 26.6886 26.6886C27.0481 26.3292 27.25 25.8417 27.25 25.3333V6.66667C27.25 6.15834 27.0481 5.67082 26.6886 5.31138C26.3292 4.95193 25.8417 4.75 25.3333 4.75H6.66667ZM4.25072 4.25072C4.89147 3.60997 5.76051 3.25 6.66667 3.25H25.3333C26.2395 3.25 27.1085 3.60997 27.7493 4.25072C28.39 4.89147 28.75 5.76051 28.75 6.66667V25.3333C28.75 26.2395 28.39 27.1085 27.7493 27.7493C27.1085 28.39 26.2395 28.75 25.3333 28.75H6.66667C5.76051 28.75 4.89147 28.39 4.25072 27.7493C3.60997 27.1085 3.25 26.2395 3.25 25.3333V6.66667C3.25 5.76051 3.60997 4.89147 4.25072 4.25072Z"
	})
}), ft = () => /* @__PURE__ */ m("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [/* @__PURE__ */ p("path", {
		d: "M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z",
		fill: "#2C9445"
	}), /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M15.5985 6.40085C15.745 6.5473 15.745 6.78473 15.5985 6.93118L8.93187 13.5978C8.78543 13.7443 8.54799 13.7443 8.40154 13.5978L5.06821 10.2645C4.92176 10.1181 4.92176 9.88063 5.06821 9.73418C5.21466 9.58774 5.45209 9.58774 5.59854 9.73418L8.66671 12.8024L15.0682 6.40085C15.2147 6.2544 15.4521 6.2544 15.5985 6.40085Z",
		fill: "white"
	})]
}), pt = {
	arrowCollapseLeft: Xe,
	assistant: Ze,
	chatBubble: Qe,
	chevronDown: $e,
	discard: tt,
	discardCircle: et,
	fullScreen: rt,
	fullScreenExit: nt,
	microphone: it,
	newConversation: at,
	paperclip: ot,
	play: st,
	plus: ct,
	search: lt,
	send: ut,
	stop: dt,
	tick: ft,
	trash: () => /* @__PURE__ */ m("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		children: [
			/* @__PURE__ */ p("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M4.58334 9.33325C4.58334 8.91904 4.91913 8.58325 5.33334 8.58325H26.6667C27.0809 8.58325 27.4167 8.91904 27.4167 9.33325C27.4167 9.74747 27.0809 10.0833 26.6667 10.0833H5.33334C4.91913 10.0833 4.58334 9.74747 4.58334 9.33325Z"
			}),
			/* @__PURE__ */ p("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M13.3333 13.9167C13.7476 13.9167 14.0833 14.2525 14.0833 14.6667V22.6667C14.0833 23.081 13.7476 23.4167 13.3333 23.4167C12.9191 23.4167 12.5833 23.081 12.5833 22.6667V14.6667C12.5833 14.2525 12.9191 13.9167 13.3333 13.9167Z"
			}),
			/* @__PURE__ */ p("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M18.6667 13.9167C19.0809 13.9167 19.4167 14.2525 19.4167 14.6667V22.6667C19.4167 23.081 19.0809 23.4167 18.6667 23.4167C18.2524 23.4167 17.9167 23.081 17.9167 22.6667V14.6667C17.9167 14.2525 18.2524 13.9167 18.6667 13.9167Z"
			}),
			/* @__PURE__ */ p("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M6.60438 8.58588C7.01717 8.55149 7.37968 8.85823 7.41408 9.27101L8.74741 25.271C8.74914 25.2917 8.75 25.3125 8.75 25.3333C8.75 25.8416 8.95193 26.3291 9.31138 26.6886C9.67082 27.048 10.1583 27.25 10.6667 27.25H21.3333C21.8417 27.25 22.3292 27.048 22.6886 26.6886C23.0481 26.3291 23.25 25.8416 23.25 25.3333C23.25 25.3125 23.2509 25.2917 23.2526 25.271L24.5859 9.27101C24.6203 8.85823 24.9828 8.55149 25.3956 8.58588C25.8084 8.62028 26.1151 8.9828 26.0807 9.39558L24.7498 25.3664C24.7412 26.2606 24.3822 27.1163 23.7493 27.7492C23.1085 28.39 22.2395 28.75 21.3333 28.75H10.6667C9.76051 28.75 8.89147 28.39 8.25072 27.7492C7.61778 27.1163 7.25882 26.2606 7.25016 25.3664L5.91926 9.39558C5.88486 8.9828 6.1916 8.62028 6.60438 8.58588Z"
			}),
			/* @__PURE__ */ p("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M13.3333 4.75C13.1786 4.75 13.0303 4.81146 12.9209 4.92085C12.8115 5.03025 12.75 5.17862 12.75 5.33333V9.33333C12.75 9.74755 12.4142 10.0833 12 10.0833C11.5858 10.0833 11.25 9.74755 11.25 9.33333V5.33333C11.25 4.7808 11.4695 4.25089 11.8602 3.86019C12.2509 3.46949 12.7808 3.25 13.3333 3.25H18.6667C19.2192 3.25 19.7491 3.46949 20.1398 3.86019C20.5305 4.25089 20.75 4.7808 20.75 5.33333V9.33333C20.75 9.74755 20.4142 10.0833 20 10.0833C19.5858 10.0833 19.25 9.74755 19.25 9.33333V5.33333C19.25 5.17862 19.1885 5.03025 19.0791 4.92085C18.9697 4.81146 18.8214 4.75 18.6667 4.75H13.3333Z"
			})
		]
	})
}, mt = ({ name: e, size: t = "small", type: n }) => {
	let r = pt[e];
	if (!r) return console.warn(`Icon with name "${e}" does not exist.`), null;
	let i = Je({
		"ibexa-ai-assistant-icon": !0,
		[`ibexa-ai-assistant-icon--${t}`]: !0,
		[`ibexa-ai-assistant-icon--${n}`]: !!n
	});
	return /* @__PURE__ */ p("span", {
		className: i,
		children: /* @__PURE__ */ p(r, {})
	});
}, ht = t({}), gt = (e) => e.trim().split(/\s+/).filter((e) => e.length > 0).slice(0, 2).map((e) => e.charAt(0)).join("").toUpperCase(), _t = (e) => e.replace(/[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)+/g, (e) => e.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")), vt = (e) => e.split("+").map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" + "), yt = (e) => e.split(",").map((e) => e.trim()).filter((e) => e.length > 0).map(vt).join(", "), bt = (e, t) => t ? `${e}  (${yt(t)})` : e, xt = ({ onClick: e, withBackground: t = !1 }) => {
	let n = g(), r = a(ht), i = bt(n.formatMessage({ id: "ibexa.ai_assistant.close_button.title" }), r.deactivate), o = Je({
		"ibexa-ai-assistant-close-button": !0,
		"ibexa-ai-assistant-close-button--with-background": t
	});
	return /* @__PURE__ */ p(Ye, {
		onClick: e,
		title: i,
		className: o,
		children: /* @__PURE__ */ p(mt, { name: "discard" })
	});
}, St = (e) => {
	o(() => {
		let t = () => {
			e.current && (e.current.scrollWidth > e.current.clientWidth ? e.current.setAttribute("title", e.current.textContent ?? "") : e.current.removeAttribute("title"));
		}, n = new MutationObserver(() => {
			t();
		}), r = new ResizeObserver(() => {
			t();
		});
		e.current && (n.observe(e.current, {
			childList: !0,
			characterData: !0,
			subtree: !0
		}), r.observe(e.current), t());
	}, [e]);
}, Ct = ({ icon: e, name: t, type: n, onDelete: r }) => {
	let i = u(null);
	return St(i), /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-input-file-preview",
		children: [
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-input-file-preview__preview",
				children: e
			}),
			/* @__PURE__ */ m("div", {
				className: "ibexa-ai-assistant-input-file-preview__info",
				children: [/* @__PURE__ */ p("div", {
					className: "ibexa-ai-assistant-input-file-preview__name",
					ref: i,
					children: t
				}), /* @__PURE__ */ p("div", {
					className: "ibexa-ai-assistant-input-file-preview__type",
					children: n
				})]
			}),
			r && /* @__PURE__ */ p(xt, {
				onClick: r,
				withBackground: !0
			})
		]
	});
}, wt = t({ delete: () => void 0 }), Tt = ({ attachment: e }) => {
	let t = g(), { delete: n } = a(wt), r = qe(e.file), i = () => {
		n(e.id);
	}, o = t.formatMessage({ id: "ibexa.ai_assistant.input_file_preview.image" });
	return r ? /* @__PURE__ */ p(Ct, {
		icon: r ? /* @__PURE__ */ p("img", {
			src: r,
			alt: e.file.name
		}) : null,
		name: e.file.name,
		type: o,
		onDelete: i
	}) : null;
}, Et = ({ imageUrl: e, onDelete: t }) => /* @__PURE__ */ m("div", {
	className: "ibexa-ai-assistant-input-image-preview",
	children: [/* @__PURE__ */ p("img", { src: e }), t && /* @__PURE__ */ p(xt, {
		onClick: t,
		withBackground: !0
	})]
}), Dt = ({ attachment: e }) => {
	let { delete: t } = a(wt), n = qe(e.file);
	return n ? /* @__PURE__ */ p(Et, {
		imageUrl: n,
		onDelete: () => {
			t(e.id);
		}
	}) : null;
}, Ot = .25, kt = 320;
async function At(e) {
	let t = document.createElement("video"), n = URL.createObjectURL(e);
	t.src = n, t.muted = !0, t.playsInline = !0, t.preload = "metadata", await new Promise((e) => t.addEventListener("loadeddata", () => e(), { once: !0 }));
	let r = Math.min(t.duration * Ot, t.duration);
	r > 0 && (t.currentTime = r, await new Promise((e) => t.addEventListener("seeked", () => e(), { once: !0 })));
	let i = Math.min(1, kt / t.videoWidth), a = document.createElement("canvas");
	a.width = t.videoWidth * i, a.height = t.videoHeight * i, a.getContext("2d")?.drawImage(t, 0, 0, a.width, a.height);
	let o = a.toDataURL("image/png");
	return URL.revokeObjectURL(n), o;
}
//#endregion
//#region lib/hooks/useVideoThumbnailFromFile.ts
var jt = (e) => {
	let [t, n] = d("");
	return o(() => {
		if (!e?.type.startsWith("video/")) {
			n("");
			return;
		}
		let t = !1;
		return At(e).then((e) => {
			t || n(e);
		}), () => {
			t = !0;
		};
	}, [e]), t;
}, Mt = ({ attachment: e }) => {
	let t = g(), { delete: n } = a(wt), r = jt(e.file), i = () => {
		n(e.id);
	}, o = t.formatMessage({ id: "ibexa.ai_assistant.input_file_preview.video" });
	return r ? /* @__PURE__ */ p(Ct, {
		icon: r ? /* @__PURE__ */ p("img", {
			src: r,
			alt: e.file.name
		}) : null,
		name: e.file.name,
		type: o,
		onDelete: i
	}) : null;
}, Nt = ({ imageUrl: e, onDelete: t }) => /* @__PURE__ */ m("div", {
	className: "ibexa-ai-assistant-input-video-preview",
	children: [/* @__PURE__ */ p(Et, {
		imageUrl: e,
		onDelete: t
	}), /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-input-video-preview__play-icon",
		children: /* @__PURE__ */ p(mt, { name: "play" })
	})]
}), Pt = ({ attachment: e }) => {
	let { delete: t } = a(wt), n = jt(e.file);
	return n ? /* @__PURE__ */ p(Nt, {
		imageUrl: n,
		onDelete: () => {
			t(e.id);
		}
	}) : null;
}, Ft = {
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
		icon: /* @__PURE__ */ p(() => /* @__PURE__ */ m("svg", {
			width: "44",
			height: "44",
			viewBox: "0 0 44 44",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ p("rect", {
					width: "44",
					height: "44",
					rx: "8",
					fill: "#378F19"
				}),
				/* @__PURE__ */ m("g", {
					clipPath: "url(#clip0_11264_15789)",
					children: [
						/* @__PURE__ */ p("path", {
							d: "M30.4375 15.0002C30.4375 14.619 30.2859 14.2532 30.0164 13.9836C29.7468 13.7141 29.381 13.5625 28.9998 13.5625H15.0002C14.619 13.5625 14.2532 13.7141 13.9836 13.9836C13.7141 14.2532 13.5625 14.619 13.5625 15.0002V28.9998C13.5625 29.381 13.7141 29.7468 13.9836 30.0164C14.2532 30.2859 14.619 30.4375 15.0002 30.4375H28.9998C29.381 30.4375 29.7468 30.2859 30.0164 30.0164C30.2859 29.7468 30.4375 29.381 30.4375 28.9998V15.0002ZM31.5625 28.9998C31.5625 29.6794 31.2923 30.3312 30.8118 30.8118C30.3312 31.2923 29.6794 31.5625 28.9998 31.5625H15.0002C14.3206 31.5625 13.6688 31.2923 13.1882 30.8118C12.7077 30.3312 12.4375 29.6794 12.4375 28.9998V15.0002C12.4375 14.3206 12.7077 13.6688 13.1882 13.1882C13.6688 12.7077 14.3206 12.4375 15.0002 12.4375H28.9998C29.6794 12.4375 30.3312 12.7077 30.8118 13.1882C31.2923 13.6688 31.5625 14.3206 31.5625 15.0002V28.9998Z",
							fill: "#EDF9EA"
						}),
						/* @__PURE__ */ p("path", {
							d: "M31 19.4375C31.3107 19.4375 31.5625 19.6893 31.5625 20C31.5625 20.3107 31.3107 20.5625 31 20.5625H13C12.6893 20.5625 12.4375 20.3107 12.4375 20C12.4375 19.6893 12.6893 19.4375 13 19.4375H31Z",
							fill: "#EDF9EA"
						}),
						/* @__PURE__ */ p("path", {
							d: "M19.4375 31V13C19.4375 12.6893 19.6893 12.4375 20 12.4375C20.3107 12.4375 20.5625 12.6893 20.5625 13V31C20.5625 31.3107 20.3107 31.5625 20 31.5625C19.6893 31.5625 19.4375 31.3107 19.4375 31Z",
							fill: "#EDF9EA"
						})
					]
				}),
				/* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", {
					id: "clip0_11264_15789",
					children: /* @__PURE__ */ p("rect", {
						width: "24",
						height: "24",
						fill: "white",
						transform: "translate(10 10)"
					})
				}) })
			]
		}), {}),
		label: "ibexa.ai_assistant.input_file_preview.spreadsheet"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
		icon: /* @__PURE__ */ p(() => /* @__PURE__ */ m("svg", {
			width: "44",
			height: "44",
			viewBox: "0 0 44 44",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ p("rect", {
					width: "44",
					height: "44",
					rx: "8",
					fill: "#3269CF"
				}),
				/* @__PURE__ */ p("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M24 12.4375C24.3107 12.4375 24.5625 12.6893 24.5625 13V17C24.5625 17.116 24.6086 17.2273 24.6906 17.3094C24.7727 17.3914 24.884 17.4375 25 17.4375H29C29.3107 17.4375 29.5625 17.6893 29.5625 18C29.5625 18.3107 29.3107 18.5625 29 18.5625H25C24.5856 18.5625 24.1882 18.3979 23.8951 18.1049C23.6021 17.8118 23.4375 17.4144 23.4375 17V13C23.4375 12.6893 23.6893 12.4375 24 12.4375Z",
					fill: "#CCDEFF"
				}),
				/* @__PURE__ */ p("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M17 13.5625C16.6188 13.5625 16.2531 13.714 15.9835 13.9835C15.714 14.2531 15.5625 14.6188 15.5625 15V29C15.5625 29.3812 15.714 29.7469 15.9835 30.0165C16.2531 30.2861 16.6188 30.4375 17 30.4375H27C27.3812 30.4375 27.7469 30.2861 28.0165 30.0165C28.286 29.7469 28.4375 29.3812 28.4375 29V18.233L23.767 13.5625H17ZM15.188 13.188C15.6686 12.7075 16.3204 12.4375 17 12.4375H24C24.1492 12.4375 24.2923 12.4968 24.3977 12.6023L29.3977 17.6023C29.5032 17.7077 29.5625 17.8508 29.5625 18L29.5625 29C29.5625 29.6796 29.2925 30.3314 28.812 30.812C28.3314 31.2925 27.6796 31.5625 27 31.5625H17C16.3204 31.5625 15.6686 31.2925 15.188 30.812C14.7075 30.3314 14.4375 29.6796 14.4375 29V15C14.4375 14.3204 14.7075 13.6686 15.188 13.188Z",
					fill: "#CCDEFF"
				}),
				/* @__PURE__ */ p("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M18.4375 19C18.4375 18.6893 18.6893 18.4375 19 18.4375H20C20.3107 18.4375 20.5625 18.6893 20.5625 19C20.5625 19.3107 20.3107 19.5625 20 19.5625H19C18.6893 19.5625 18.4375 19.3107 18.4375 19Z",
					fill: "#CCDEFF"
				}),
				/* @__PURE__ */ p("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M18.4375 23C18.4375 22.6893 18.6893 22.4375 19 22.4375H25C25.3107 22.4375 25.5625 22.6893 25.5625 23C25.5625 23.3107 25.3107 23.5625 25 23.5625H19C18.6893 23.5625 18.4375 23.3107 18.4375 23Z",
					fill: "#CCDEFF"
				}),
				/* @__PURE__ */ p("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M18.4375 27C18.4375 26.6893 18.6893 26.4375 19 26.4375H25C25.3107 26.4375 25.5625 26.6893 25.5625 27C25.5625 27.3107 25.3107 27.5625 25 27.5625H19C18.6893 27.5625 18.4375 27.3107 18.4375 27Z",
					fill: "#CCDEFF"
				})
			]
		}), {}),
		label: "ibexa.ai_assistant.input_file_preview.document"
	}
}, It = ({ attachment: e, fileTypeMap: t = {} }) => {
	let { delete: n } = a(wt), r = {
		...Ft,
		...t
	}, i = () => {
		n(e.id);
	}, o = (e) => {
		if (r[e]) return r[e];
		let t = e.split("/")[0];
		return r[t] ? r[t] : {
			icon: null,
			label: e
		};
	}, { name: s, type: c } = e.file, { icon: l, label: u } = o(c);
	return /* @__PURE__ */ p(Ct, {
		name: s,
		type: u,
		icon: l,
		onDelete: i
	});
}, Lt = class {
	renderers;
	constructor() {
		this.renderers = /* @__PURE__ */ new Map();
	}
	register(e, t) {
		this.renderers.set(e, t);
	}
	has(e) {
		return this.renderers.has(e);
	}
	get(e) {
		if (!this.renderers.has(e)) throw Error(`Renderer "${e}" is not registered.`);
		return this.renderers.get(e);
	}
}, Rt = class extends Lt {}, zt = t(new Rt());
//#endregion
//#region lib/providers/InputPreviewRendererRegistryProvider.tsx
function Bt(e) {
	let t = new Rt();
	return t.register("image", {
		fullPreview: (e) => /* @__PURE__ */ p(Dt, { attachment: e }),
		compactPreview: (e) => /* @__PURE__ */ p(Tt, { attachment: e })
	}), t.register("video", {
		fullPreview: (e) => /* @__PURE__ */ p(Pt, { attachment: e }),
		compactPreview: (e) => /* @__PURE__ */ p(Mt, { attachment: e })
	}), t.register("default", { compactPreview: (e) => /* @__PURE__ */ p(It, { attachment: e }) }), Object.entries(e).forEach(([e, n]) => {
		t.register(e, n);
	}), t;
}
function Vt({ renderers: e, children: t }) {
	let n = Bt(e);
	return /* @__PURE__ */ p(zt.Provider, {
		value: n,
		children: t
	});
}
//#endregion
//#region lib/components/Avatar/Avatar.tsx
var Ht = ({ imageUrl: e, name: t }) => t === "" ? null : e ? /* @__PURE__ */ p("div", {
	className: "ibexa-ai-assistant-avatar",
	children: /* @__PURE__ */ p("img", {
		src: e,
		alt: t,
		title: t
	})
}) : /* @__PURE__ */ p("div", {
	className: "ibexa-ai-assistant-avatar ibexa-ai-assistant-avatar--initials",
	title: t,
	children: gt(t)
}), Ut = [
	"ibexa.ai_assistant.loading_text.thinking",
	"ibexa.ai_assistant.loading_text.generating_response",
	"ibexa.ai_assistant.loading_text.processing",
	"ibexa.ai_assistant.loading_text.working_on_it",
	"ibexa.ai_assistant.loading_text.preparing_answer",
	"ibexa.ai_assistant.loading_text.analyzing_request",
	"ibexa.ai_assistant.loading_text.fetching_information",
	"ibexa.ai_assistant.loading_text.let_me_think",
	"ibexa.ai_assistant.loading_text.checking_a_few_things",
	"ibexa.ai_assistant.loading_text.building_your_answer",
	"ibexa.ai_assistant.loading_text.gathering_context"
], Wt = () => {
	let e = g(), t = Ut.map((t) => e.formatMessage({ id: t })), n = (e) => {
		let n = t.filter((t) => t !== e);
		return n[Math.floor(Math.random() * n.length)];
	}, [r, i] = d(() => n()), [a, s] = d([1, 1]);
	return o(() => {
		let e = setTimeout(() => {
			i((e) => n(e)), s(([e, t]) => [t, e + t]);
		}, a[0] * 1e3);
		return () => clearTimeout(e);
	}, [a]), r;
}, Gt = () => {
	let e = Wt();
	return /* @__PURE__ */ p("span", {
		className: "ibexa-ai-assistant-loading-text",
		children: e
	});
}, Kt = ({ actions: e, message: t }) => /* @__PURE__ */ p("div", {
	className: "ibexa-ai-assistant-message-actions-menu",
	children: e.map((e, n) => /* @__PURE__ */ p(Ye, {
		title: e.label,
		onClick: () => e.onClick(t),
		children: e.icon ?? e.label
	}, `${e.label}-${n}`))
}), qt = () => /* @__PURE__ */ p("div", { className: "ibexa-ai-assistant-spinner" }), Jt = (e) => {
	let t = a(de), n = a(F);
	return e === "assistant" || e === "tool" ? t.imageUrl ?? "" : n.imageUrl ?? "";
}, Yt = (e) => {
	let t = a(de), n = a(F);
	return e === "assistant" || e === "tool" ? t.name : n.name;
}, Xt = t(!1), Zt = t([]), Qt = ({ children: e, message: t, className: n = "", noPadding: r = !1, loaders: i = {} }) => {
	let o = a(Xt), s = a(Zt), c = Je({
		[`ibexa-ai-assistant-message ibexa-ai-assistant-message--${t.role} ibexa-ai-assistant-message--type-${t.type}`]: !0,
		"ibexa-ai-assistant-message--no-padding": r,
		[n]: !!n
	}), l = Jt(t.role), u = Yt(t.role), d = () => i.wrapper?.isVisible(t) ?? (t.status === "pending" && t.role === "assistant") ? i.wrapper?.render(t) ?? /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-message ibexa-ai-assistant-message--loading",
		children: [/* @__PURE__ */ p(qt, {}), /* @__PURE__ */ p(Gt, {})]
	}) : null, f = () => i.content?.isVisible(t) ?? (t.status === "pending" && t.role === "user") ? i.content?.render(t) ?? /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-message__loader",
		children: e
	}) : null, h = d(), g = () => f() || e;
	if (h) return h;
	if (o) {
		let e = `ibexa-ai-assistant-message--type-${t.type}`;
		return /* @__PURE__ */ p("div", {
			className: e,
			children: g()
		});
	}
	return /* @__PURE__ */ m("div", {
		className: c,
		children: [/* @__PURE__ */ p(Ht, {
			imageUrl: l,
			name: u
		}), /* @__PURE__ */ m("div", {
			className: "ibexa-ai-assistant-message__body",
			children: [/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-message__content",
				children: g()
			}), s.length > 0 && /* @__PURE__ */ p(Kt, {
				actions: s,
				message: t
			})]
		})]
	});
};
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function $t(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function en(e) {
	if (Array.isArray(e)) return e;
}
function tn(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t !== 0) for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function nn() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function rn(e, t) {
	return en(e) || tn(e, t) || an(e, t) || nn();
}
function an(e, t) {
	if (e) {
		if (typeof e == "string") return $t(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $t(e, t) : void 0;
	}
}
var on = Object.entries, sn = Object.setPrototypeOf, cn = Object.isFrozen, ln = Object.getPrototypeOf, un = Object.getOwnPropertyDescriptor, dn = Object.freeze, fn = Object.seal, pn = Object.create, mn = typeof Reflect < "u" && Reflect, hn = mn.apply, gn = mn.construct;
dn ||= function(e) {
	return e;
}, fn ||= function(e) {
	return e;
}, hn ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, gn ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var _n = Ln(Array.prototype.forEach), vn = Ln(Array.prototype.lastIndexOf), yn = Ln(Array.prototype.pop), bn = Ln(Array.prototype.push), xn = Ln(Array.prototype.splice), Sn = Array.isArray, Cn = Ln(String.prototype.toLowerCase), wn = Ln(String.prototype.toString), Tn = Ln(String.prototype.match), En = Ln(String.prototype.replace), Dn = Ln(String.prototype.indexOf), On = Ln(String.prototype.trim), kn = Ln(Number.prototype.toString), An = Ln(Boolean.prototype.toString), jn = typeof BigInt > "u" ? null : Ln(BigInt.prototype.toString), Mn = typeof Symbol > "u" ? null : Ln(Symbol.prototype.toString), Nn = Ln(Object.prototype.hasOwnProperty), Pn = Ln(Object.prototype.toString), Fn = Ln(RegExp.prototype.test), In = Rn(TypeError);
function Ln(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return hn(e, t, n);
	};
}
function Rn(e) {
	return function() {
		return gn(e, [...arguments]);
	};
}
function z(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Cn;
	if (sn && sn(e, null), !Sn(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (cn(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function zn(e) {
	for (let t = 0; t < e.length; t++) Nn(e, t) || (e[t] = null);
	return e;
}
function Bn(e) {
	let t = pn(null);
	for (let r of on(e)) {
		var n = rn(r, 2);
		let i = n[0], a = n[1];
		Nn(e, i) && (t[i] = Sn(a) ? zn(a) : a && typeof a == "object" && a.constructor === Object ? Bn(a) : a);
	}
	return t;
}
function Vn(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return kn(e);
		case "boolean": return An(e);
		case "bigint": return jn ? jn(e) : "0";
		case "symbol": return Mn ? Mn(e) : "Symbol()";
		case "undefined": return Pn(e);
		case "function":
		case "object": {
			if (e === null) return Pn(e);
			let t = e, n = Hn(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Pn(e);
			}
			return Pn(e);
		}
		default: return Pn(e);
	}
}
function Hn(e, t) {
	for (; e !== null;) {
		let n = un(e, t);
		if (n) {
			if (n.get) return Ln(n.get);
			if (typeof n.value == "function") return Ln(n.value);
		}
		e = ln(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Un(e) {
	try {
		return Fn(e, ""), !0;
	} catch {
		return !1;
	}
}
var Wn = dn(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Gn = dn(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), Kn = dn([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), qn = dn([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Jn = dn(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Yn = dn([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Xn = dn(["#text"]), Zn = dn(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), Qn = dn(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), $n = dn(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), er = dn([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), tr = fn(/{{[\w\W]*|^[\w\W]*}}/g), nr = fn(/<%[\w\W]*|^[\w\W]*%>/g), rr = fn(/\${[\w\W]*/g), ir = fn(/^data-[\-\w.\u00B7-\uFFFF]+$/), ar = fn(/^aria-[\-\w]+$/), or = fn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), sr = fn(/^(?:\w+script|data):/i), cr = fn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), lr = fn(/^html$/i), ur = fn(/^[a-z][.\w]*(-[.\w]+)+$/i), dr = fn(/<[/\w!]/g), fr = fn(/<[/\w]/g), pr = fn(/<\/no(script|embed|frames)/i), mr = fn(/\/>/i), hr = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, gr = function() {
	return typeof window > "u" ? null : window;
}, _r = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, vr = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, yr = function(e, t, n, r) {
	return Nn(e, t) && Sn(e[t]) ? z(r.base ? Bn(r.base) : {}, e[t], r.transform) : n;
};
function br() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : gr(), t = (e) => br(e);
	if (t.version = "3.4.13", t.removed = [], !e || !e.document || e.document.nodeType !== hr.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = Hn(d, "cloneNode"), p = Hn(d, "remove"), m = Hn(d, "nextSibling"), h = Hn(d, "childNodes"), g = Hn(d, "parentNode"), _ = Hn(d, "shadowRoot"), v = Hn(d, "attributes"), y = o && o.prototype ? Hn(o.prototype, "nodeType") : null, b = o && o.prototype ? Hn(o.prototype, "nodeName") : null, x = o && o.prototype ? Hn(o.prototype, "ownerDocument") : null;
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let S, C = "", w, T = !1, E = 0, D = function() {
		if (E > 0) throw In("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, O = function(e) {
		D(), E++;
		try {
			return S.createHTML(e);
		} finally {
			E--;
		}
	}, k = function(e) {
		D(), E++;
		try {
			return S.createScriptURL(e);
		} finally {
			E--;
		}
	}, A = function() {
		return T ||= (w = _r(u, i), !0), w;
	}, j = n, ee = j.implementation, te = j.createNodeIterator, ne = j.createDocumentFragment, re = j.getElementsByTagName, ie = r.importNode, M = vr();
	t.isSupported = typeof on == "function" && typeof g == "function" && ee && ee.createHTMLDocument !== void 0;
	let ae = tr, N = nr, oe = rr, se = ir, ce = ar, le = sr, P = cr, ue = ur, de = or, F = null, fe = z({}, [
		...Wn,
		...Gn,
		...Kn,
		...Jn,
		...Xn
	]), I = null, L = z({}, [
		...Zn,
		...Qn,
		...$n,
		...er
	]), R = Object.seal(pn(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), pe = null, me = null, he = Object.seal(pn(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), ge = !0, _e = !0, ve = !1, ye = !0, be = !1, xe = !0, Se = !1, Ce = !1, we = null, Te = null, Ee = !1, De = !1, Oe = !1, ke = !1, Ae = !0, je = !1, Me = "user-content-", Ne = !0, Pe = !1, Fe = {}, Ie = null, Le = z({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Re = null, ze = z({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Be = null, Ve = z({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), He = "http://www.w3.org/1998/Math/MathML", Ue = "http://www.w3.org/2000/svg", We = "http://www.w3.org/1999/xhtml", Ge = We, Ke = !1, qe = null, Je = z({}, [
		He,
		Ue,
		We
	], wn), Ye = dn([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), Xe = z({}, Ye), Ze = dn(["annotation-xml"]), Qe = z({}, Ze), $e = z({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), et = null, tt = ["application/xhtml+xml", "text/html"], nt = null, rt = null, it = n.createElement("form"), at = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, ot = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (rt && rt === e) return;
		(!e || typeof e != "object") && (e = {}), e = Bn(e), et = tt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, nt = et === "application/xhtml+xml" ? wn : Cn, F = yr(e, "ALLOWED_TAGS", fe, { transform: nt }), I = yr(e, "ALLOWED_ATTR", L, { transform: nt }), qe = yr(e, "ALLOWED_NAMESPACES", Je, { transform: wn }), Be = yr(e, "ADD_URI_SAFE_ATTR", Ve, {
			transform: nt,
			base: Ve
		}), Re = yr(e, "ADD_DATA_URI_TAGS", ze, {
			transform: nt,
			base: ze
		}), Ie = yr(e, "FORBID_CONTENTS", Le, { transform: nt }), pe = yr(e, "FORBID_TAGS", Bn({}), { transform: nt }), me = yr(e, "FORBID_ATTR", Bn({}), { transform: nt }), Fe = Nn(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? Bn(e.USE_PROFILES) : e.USE_PROFILES : !1, ge = e.ALLOW_ARIA_ATTR !== !1, _e = e.ALLOW_DATA_ATTR !== !1, ve = e.ALLOW_UNKNOWN_PROTOCOLS || !1, ye = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, be = e.SAFE_FOR_TEMPLATES || !1, xe = e.SAFE_FOR_XML !== !1, Se = e.WHOLE_DOCUMENT || !1, De = e.RETURN_DOM || !1, Oe = e.RETURN_DOM_FRAGMENT || !1, ke = e.RETURN_TRUSTED_TYPE || !1, Ee = e.FORCE_BODY || !1, Ae = e.SANITIZE_DOM !== !1, je = e.SANITIZE_NAMED_PROPS || !1, Ne = e.KEEP_CONTENT !== !1, Pe = e.IN_PLACE || !1, de = Un(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : or, Ge = typeof e.NAMESPACE == "string" ? e.NAMESPACE : We, Xe = Nn(e, "MATHML_TEXT_INTEGRATION_POINTS") && e.MATHML_TEXT_INTEGRATION_POINTS && typeof e.MATHML_TEXT_INTEGRATION_POINTS == "object" ? Bn(e.MATHML_TEXT_INTEGRATION_POINTS) : z({}, Ye), Qe = Nn(e, "HTML_INTEGRATION_POINTS") && e.HTML_INTEGRATION_POINTS && typeof e.HTML_INTEGRATION_POINTS == "object" ? Bn(e.HTML_INTEGRATION_POINTS) : z({}, Ze);
		let t = Nn(e, "CUSTOM_ELEMENT_HANDLING") && e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING == "object" ? Bn(e.CUSTOM_ELEMENT_HANDLING) : pn(null);
		if (R = pn(null), Nn(t, "tagNameCheck") && at(t.tagNameCheck) && (R.tagNameCheck = t.tagNameCheck), Nn(t, "attributeNameCheck") && at(t.attributeNameCheck) && (R.attributeNameCheck = t.attributeNameCheck), Nn(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (R.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), fn(R), be && (_e = !1), Oe && (De = !0), Fe && (F = z({}, Xn), I = pn(null), Fe.html === !0 && (z(F, Wn), z(I, Zn)), Fe.svg === !0 && (z(F, Gn), z(I, Qn), z(I, er)), Fe.svgFilters === !0 && (z(F, Kn), z(I, Qn), z(I, er)), Fe.mathMl === !0 && (z(F, Jn), z(I, $n), z(I, er))), he.tagCheck = null, he.attributeCheck = null, Nn(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? he.tagCheck = e.ADD_TAGS : Sn(e.ADD_TAGS) && (F === fe && (F = Bn(F)), z(F, e.ADD_TAGS, nt))), Nn(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? he.attributeCheck = e.ADD_ATTR : Sn(e.ADD_ATTR) && (I === L && (I = Bn(I)), z(I, e.ADD_ATTR, nt))), Nn(e, "ADD_URI_SAFE_ATTR") && Sn(e.ADD_URI_SAFE_ATTR) && z(Be, e.ADD_URI_SAFE_ATTR, nt), Nn(e, "FORBID_CONTENTS") && Sn(e.FORBID_CONTENTS) && (Ie === Le && (Ie = Bn(Ie)), z(Ie, e.FORBID_CONTENTS, nt)), Nn(e, "ADD_FORBID_CONTENTS") && Sn(e.ADD_FORBID_CONTENTS) && (Ie === Le && (Ie = Bn(Ie)), z(Ie, e.ADD_FORBID_CONTENTS, nt)), Ne && (F["#text"] = !0), Se && z(F, [
			"html",
			"head",
			"body"
		]), F.table && (z(F, ["tbody"]), delete pe.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw In("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw In("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = S;
			S = e.TRUSTED_TYPES_POLICY;
			try {
				C = O("");
			} catch (e) {
				throw S = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (S = void 0, C = "") : (S === void 0 && (S = A()), S && typeof C == "string" && (C = O("")));
		dn && dn(e), rt = e;
	}, st = z({}, [
		...Gn,
		...Kn,
		...qn
	]), ct = z({}, [...Jn, ...Yn]), lt = function(e, t, n) {
		return t.namespaceURI === We ? e === "svg" : t.namespaceURI === He ? e === "svg" && (n === "annotation-xml" || Xe[n]) : !!st[e];
	}, ut = function(e, t, n) {
		return t.namespaceURI === We ? e === "math" : t.namespaceURI === Ue ? e === "math" && Qe[n] : !!ct[e];
	}, dt = function(e, t, n) {
		return t.namespaceURI === Ue && !Qe[n] || t.namespaceURI === He && !Xe[n] ? !1 : !ct[e] && ($e[e] || !st[e]);
	}, ft = function(e) {
		let t = g(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ge,
			tagName: "template"
		});
		let n = Cn(e.tagName), r = Cn(t.tagName);
		return qe[e.namespaceURI] ? e.namespaceURI === Ue ? lt(n, t, r) : e.namespaceURI === He ? ut(n, t, r) : e.namespaceURI === We ? dt(n, t, r) : !!(et === "application/xhtml+xml" && qe[e.namespaceURI]) : !1;
	}, pt = function(e) {
		bn(t.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch {
			if (p(e), !g(e)) throw In("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, mt = function(e) {
		_t(e);
		let t = h(e);
		if (t) {
			let e = [];
			_n(t, (t) => {
				bn(e, t);
			}), _n(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = v(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			if (typeof i == "string") try {
				e.removeAttribute(i);
			} catch {}
		}
	}, ht = function(e, n) {
		try {
			bn(t.removed, {
				attribute: n.getAttributeNode(e),
				from: n
			});
		} catch {
			bn(t.removed, {
				attribute: null,
				from: n
			});
		}
		if (n.removeAttribute(e), e === "is") if (De || Oe) try {
			pt(n);
		} catch {}
		else try {
			n.setAttribute(e, "");
		} catch {}
	}, gt = function(e) {
		let t = v(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			if (!(typeof i != "string" || I[nt(i)])) try {
				e.removeAttribute(i);
			} catch {}
		}
	}, _t = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			(y ? y(e) : e.nodeType) === hr.element && gt(e);
			let n = h(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, vt = function(e) {
		if (!xe) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = y ? y(e) : e.nodeType;
			if (n === hr.processingInstruction || n === hr.comment && Fn(fr, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === hr.element) {
				let t = e, n = nt(b ? b(e) : e.nodeName);
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && n !== "label" && n !== "output" && t.removeAttribute("for");
				} catch {}
			}
			let r = h(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, yt = function(e) {
		let t = null, r = null;
		if (Ee) e = "<remove></remove>" + e;
		else {
			let t = Tn(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		et === "application/xhtml+xml" && Ge === We && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = S ? O(e) : e;
		if (Ge === We) try {
			t = new l().parseFromString(i, et);
		} catch {}
		if (!t || !t.documentElement) {
			t = ee.createDocument(Ge, "template", null);
			try {
				t.documentElement.innerHTML = Ke ? C : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ge === We ? re.call(t, Se ? "html" : "body")[0] : Se ? t.documentElement : a;
	}, bt = function(e) {
		let t = x ? x(e) : e.ownerDocument;
		return te.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, xt = function(e) {
		return e = En(e, ae, " "), e = En(e, N, " "), e = En(e, oe, " "), e;
	}, St = function(e) {
		e.normalize();
		let t = x ? x(e) : e.ownerDocument, n = te.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = xt(r.data), r = n.nextNode();
		let i = e.querySelectorAll?.call(e, "template");
		i && _n(i, (e) => {
			wt(e.content) && St(e.content);
		});
	}, Ct = function(e) {
		let t = b ? b(e) : null;
		return typeof t != "string" || nt(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== v(e) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== y(e) || e.childNodes !== h(e);
	}, wt = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return y(e) === hr.documentFragment;
		} catch {
			return !1;
		}
	}, Tt = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return typeof y(e) == "number";
		} catch {
			return !1;
		}
	};
	function Et(e, n, r) {
		e.length !== 0 && _n(e, (e) => {
			e.call(t, n, r, rt);
		});
	}
	let Dt = function(e, t) {
		return !!(xe && e.hasChildNodes() && !Tt(e.firstElementChild) && Fn(dr, e.textContent) && Fn(dr, e.innerHTML) || xe && e.namespaceURI === We && t === "style" && Tt(e.firstElementChild) || e.nodeType === hr.processingInstruction || xe && e.nodeType === hr.comment && Fn(fr, e.data));
	}, Ot = function(e, t, n) {
		if (!pe[t] && Nt(t) && (R.tagNameCheck instanceof RegExp && Fn(R.tagNameCheck, t) || R.tagNameCheck instanceof Function && R.tagNameCheck(t))) return !1;
		if (Ne && !Ie[t]) {
			let t = g(e), r = h(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, m(e));
				}
			}
		}
		return pt(e), !0;
	}, kt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? Bn(t) : t;
	}, At = function(e, n) {
		if (Et(M.beforeSanitizeElements, e, null), e !== n && g(e) === null) return Pe && _t(e), !0;
		if (Ct(e)) return pt(e), !0;
		let r = nt(b ? b(e) : e.nodeName);
		if (F = kt(M.uponSanitizeElement, F, fe, we), Et(M.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: F
		}), e !== n && g(e) === null) return Pe && _t(e), !0;
		if (Dt(e, r)) return pt(e), !0;
		if (pe[r] || !(he.tagCheck instanceof Function && he.tagCheck(r)) && !F[r]) {
			let t = Ot(e, r, n);
			return t === !1 && Et(M.afterSanitizeElements, e, null), t;
		}
		if ((y ? y(e) : e.nodeType) === hr.element && !ft(e) || (r === "noscript" || r === "noembed" || r === "noframes") && Fn(pr, e.innerHTML)) return pt(e), !0;
		if (be && e.nodeType === hr.text) {
			let n = xt(e.textContent);
			e.textContent !== n && (bn(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return Et(M.afterSanitizeElements, e, null), !1;
	}, jt = function(e, t, r) {
		if (me[t] || xe && t === "patchsrc" || xe && t === "for" && e !== "label" && e !== "output" || Ae && (t === "id" || t === "name") && (r in n || r in it)) return !1;
		let i = I[t] || he.attributeCheck instanceof Function && he.attributeCheck(t, e);
		if (!(_e && Fn(se, t)) && !(ge && Fn(ce, t))) {
			if (!i) {
				if (!(Nt(e) && (R.tagNameCheck instanceof RegExp && Fn(R.tagNameCheck, e) || R.tagNameCheck instanceof Function && R.tagNameCheck(e)) && (R.attributeNameCheck instanceof RegExp && Fn(R.attributeNameCheck, t) || R.attributeNameCheck instanceof Function && R.attributeNameCheck(t, e)) || t === "is" && R.allowCustomizedBuiltInElements && (R.tagNameCheck instanceof RegExp && Fn(R.tagNameCheck, r) || R.tagNameCheck instanceof Function && R.tagNameCheck(r)))) return !1;
			} else if (!Be[t] && !Fn(de, En(r, P, "")) && !((t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Dn(r, "data:") === 0 && Re[e]) && !(ve && !Fn(le, En(r, P, ""))) && r) return !1;
		}
		return !0;
	}, Mt = z({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Nt = function(e) {
		return !Mt[Cn(e)] && Fn(ue, e);
	}, Pt = function(e, t, n, r) {
		if (S && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return O(r);
			case "TrustedScriptURL": return k(r);
		}
		return r;
	}, Ft = function(e, n, r, i) {
		try {
			r ? e.setAttributeNS(r, n, i) : e.setAttribute(n, i), Ct(e) ? pt(e) : yn(t.removed);
		} catch {
			ht(n, e);
		}
	}, It = function(e) {
		Et(M.beforeSanitizeAttributes, e, null);
		let t = e.attributes;
		if (!t || Ct(e)) return;
		I = kt(M.uponSanitizeAttribute, I, L, Te);
		let n = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: I,
			forceKeepAttr: void 0
		}, r = t.length, i = nt(e.nodeName);
		for (; r--;) {
			let a = t[r], o = a.name, s = a.namespaceURI, c = a.value, l = nt(o), u = c, d = o === "value" ? u : On(u);
			if (n.attrName = l, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, Et(M.uponSanitizeAttribute, e, n), d = n.attrValue, je && (l === "id" || l === "name") && Dn(d, Me) !== 0 && (ht(o, e), d = Me + d), xe && Fn(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d)) {
				ht(o, e);
				continue;
			}
			if (l === "attributename" && Tn(d, "href")) {
				ht(o, e);
				continue;
			}
			if (!n.forceKeepAttr) {
				if (!n.keepAttr) {
					ht(o, e);
					continue;
				}
				if (!ye && Fn(mr, d)) {
					ht(o, e);
					continue;
				}
				if (be && (d = xt(d)), !jt(i, l, d)) {
					ht(o, e);
					continue;
				}
				d = Pt(i, l, s, d), d !== u && Ft(e, o, s, d);
			}
		}
		Et(M.afterSanitizeAttributes, e, null);
	}, Lt = function(e) {
		let t = null, n = bt(e);
		for (Et(M.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (Et(M.uponSanitizeShadowNode, t, null), At(t, e), It(t), wt(t.content) && Lt(t.content), (y ? y(t) : t.nodeType) === hr.element) {
			let e = _(t);
			wt(e) && (Rt(e), Lt(e));
		}
		Et(M.afterSanitizeShadowDOM, e, null);
	}, Rt = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				Lt(e.shadow);
				continue;
			}
			let n = e.node, r = (y ? y(n) : n.nodeType) === hr.element, i = h(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = b ? b(n) : null;
				if (typeof e == "string" && nt(e) === "template") {
					let e = n.content;
					wt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = _(n);
				wt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (Ke = !e, Ke && (e = "<!-->"), typeof e != "string" && !Tt(e) && (e = Vn(e), typeof e != "string")) throw In("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Ce ? (F = we, I = Te) : ot(n), (M.uponSanitizeElement.length > 0 || M.uponSanitizeAttribute.length > 0) && (F = Bn(F)), M.uponSanitizeAttribute.length > 0 && (I = Bn(I)), t.removed = [];
		let c = Pe && typeof e != "string" && Tt(e);
		if (c) {
			vt(e);
			let t = b ? b(e) : e.nodeName;
			if (typeof t == "string") {
				let n = nt(t);
				if (!F[n] || pe[n]) throw mt(e), In("root node is forbidden and cannot be sanitized in-place");
			}
			if (Ct(e)) throw mt(e), In("root node is clobbered and cannot be sanitized in-place");
			try {
				Rt(e);
			} catch (t) {
				throw mt(e), t;
			}
		} else if (Tt(e)) i = yt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === hr.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Rt(a);
		else {
			if (!De && !be && !Se && e.indexOf("<") === -1) return S && ke ? O(e) : e;
			if (i = yt(e), !i) return De ? null : ke ? C : "";
		}
		i && Ee && pt(i.firstChild);
		let l = c ? e : i;
		try {
			let e = bt(l);
			for (; o = e.nextNode();) At(o, l), It(o), wt(o.content) && Lt(o.content);
		} catch (n) {
			throw c && (mt(e), _n(t.removed, (e) => {
				e.element && _t(e.element);
			})), n;
		}
		if (c) return _n(t.removed, (e) => {
			e.element && _t(e.element);
		}), be && St(e), e;
		if (De) {
			if (be && St(i), Oe) for (s = ne.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (I.shadowroot || I.shadowrootmode) && (s = ie.call(r, s, !0)), s;
		}
		let u = Se ? i.outerHTML : i.innerHTML;
		return Se && F["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && Fn(lr, i.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u), be && (u = xt(u)), S && ke ? O(u) : u;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		ot(e), Ce = !0, we = F, Te = I;
	}, t.clearConfig = function() {
		rt = null, Ce = !1, we = null, Te = null, S = w, C = "";
	}, t.isValidAttribute = function(e, t, n) {
		rt || ot({});
		let r = nt(e), i = nt(t);
		return jt(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && Nn(M, e) && bn(M[e], t);
	}, t.removeHook = function(e, t) {
		if (Nn(M, e)) {
			if (t !== void 0) {
				let n = vn(M[e], t);
				return n === -1 ? void 0 : xn(M[e], n, 1)[0];
			}
			return yn(M[e]);
		}
	}, t.removeHooks = function(e) {
		Nn(M, e) && (M[e] = []);
	}, t.removeAllHooks = function() {
		M = vr();
	}, t;
}
var xr = br();
//#endregion
//#region lib/utils/markdown.ts
function Sr(e) {
	return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Cr = new _({ renderer: { link({ href: e, title: t, text: n }) {
	let r = n.startsWith("@"), i = t ? ` title="${Sr(t)}"` : "", a = e ?? "";
	if (r && !/^(https?:\/\/|mailto:|tel:|\/|#|\?)/i.test(a)) return `<span class="ibexa-ai-assistant-mention-link"${i}>${n}</span>`;
	let o = r ? " class=\"ibexa-ai-assistant-mention-link\"" : "";
	return `<a href="${Sr(a)}"${i} target="_blank" rel="noopener noreferrer"${o}>${n}</a>`;
} } });
function wr(e) {
	let t = Cr.parse(e);
	return xr.sanitize(t, { ADD_ATTR: ["target"] });
}
//#endregion
//#region lib/message/TextMessage/TextMessage.tsx
var Tr = ({ message: e }) => /* @__PURE__ */ p(Qt, {
	message: e,
	children: /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-message__markdown",
		dangerouslySetInnerHTML: { __html: wr(e.text) }
	})
}), Er = {
	SEND_MESSAGE: "send-message",
	VOICE_INPUT: "voice-input",
	INPUT: "input"
}, Dr = t({
	addLock: () => void 0,
	removeLock: () => void 0,
	toggleLock: () => void 0,
	hasLock: () => !1,
	isLocked: () => !1
}), Or = t(["", () => void 0]), kr = t([[], () => void 0]), Ar = ({ message: e }) => {
	let { removeLock: t } = a(Dr), [n, r] = d("");
	return o(() => {
		e.stream.consume((e) => {
			r((t) => t + e.text);
		}), e.stream.onEnd(() => {
			t(Er.SEND_MESSAGE);
		});
	}, [e, t]), n === "" ? /* @__PURE__ */ p(qt, {}) : /* @__PURE__ */ p(Qt, {
		message: e,
		children: /* @__PURE__ */ p("div", { dangerouslySetInnerHTML: { __html: wr(n) } })
	});
}, jr = ({ icon: e, onClick: t, title: n }) => /* @__PURE__ */ m("button", {
	className: "ibexa-ai-assistant-suggestion",
	onClick: t,
	title: n,
	children: [e && /* @__PURE__ */ p(mt, { name: e }), /* @__PURE__ */ p("span", {
		className: "ibexa-ai-assistant-suggestion__title",
		children: n
	})]
}), Mr = ({ items: e, onClick: t }) => /* @__PURE__ */ p("div", {
	className: "ibexa-ai-assistant-suggestion-list",
	children: e.map((e) => /* @__PURE__ */ p(jr, {
		icon: e.icon,
		onClick: (n) => t(e.id, n),
		title: e.title
	}, e.id))
}), Nr = ({ message: e }) => {
	let [, t] = a(Or), { inputRef: n } = a(re), r = L.createTextMessage(e.id, "assistant", e.text, "done"), i = L.finalizeMessage(r, e.id), o = e.suggestions?.map((e) => ({
		id: e.id,
		title: e.title,
		prompt: e.prompt
	})) ?? [];
	return /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-welcome-message",
		children: [/* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-welcome-message__content",
			children: /* @__PURE__ */ p(Tr, { message: i })
		}), e.suggestions?.length && /* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-welcome-message__suggestions",
			children: /* @__PURE__ */ p(Mr, {
				items: o,
				onClick: (e) => {
					let r = o.find((t) => t.id === e)?.prompt;
					r && (t(r), n.get()?.focus());
				}
			})
		})]
	});
}, Pr = ({ message: e }) => /* @__PURE__ */ p(Qt, {
	message: e,
	noPadding: !0,
	className: "ibexa-ai-assistant-image-message",
	children: /* @__PURE__ */ p("img", {
		src: e.url,
		className: "ibexa-ai-assistant-image-message__image"
	})
}), Fr = class extends Lt {}, Ir = t(new Fr()), Lr = ({ message: e, type: t }) => {
	let n = a(Ir);
	return n.has(t) ? n.get(t)(e) : (console.warn(`No message renderer registered for message type: ${t}`), null);
}, Rr = ({ message: e }) => {
	let { messages: t } = e;
	return /* @__PURE__ */ p(Qt, {
		message: e,
		className: "ibexa-ai-assistant-compound-message",
		children: /* @__PURE__ */ p(Xt.Provider, {
			value: !0,
			children: t.map((e) => /* @__PURE__ */ p(Lr, {
				type: e.type,
				message: e
			}, e.id))
		})
	});
}, zr = () => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 32 32",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 11.25C16.4142 11.25 16.75 11.5858 16.75 12V17.3333C16.75 17.7475 16.4142 18.0833 16 18.0833C15.5858 18.0833 15.25 17.7475 15.25 17.3333V12C15.25 11.5858 15.5858 11.25 16 11.25Z",
			fill: "currentColor"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M14.3793 3.23224C14.874 2.95355 15.4322 2.80713 16 2.80713C16.5678 2.80713 17.126 2.95355 17.6207 3.23224C18.1154 3.51094 18.5299 3.9125 18.8241 4.39813L18.8261 4.40142L29.6405 22.46C29.9283 22.9592 30.0805 23.5251 30.0819 24.1014C30.0833 24.6776 29.9339 25.2442 29.6486 25.7448C29.3632 26.2454 28.9518 26.6627 28.4552 26.955C27.9586 27.2474 27.3942 27.4047 26.818 27.4114L26.8093 27.4115L5.18225 27.4114C4.60579 27.4049 4.04107 27.2476 3.54425 26.9552C3.04744 26.6627 2.63586 26.2453 2.35044 25.7444C2.06502 25.2435 1.91571 24.6766 1.91736 24.1001C1.91901 23.5236 2.07156 22.9576 2.35985 22.4584L2.36584 22.448L13.158 4.42924C13.1637 4.41875 13.1697 4.40837 13.1759 4.39813C13.4701 3.9125 13.8846 3.51094 14.3793 3.23224ZM16 4.30713C15.6901 4.30713 15.3855 4.38703 15.1155 4.53913C14.8532 4.68692 14.6322 4.89804 14.4726 5.15304C14.4687 5.1599 14.4648 5.16671 14.4608 5.17346L3.65608 23.2132C3.50054 23.4845 3.41825 23.7917 3.41735 24.1044C3.41645 24.419 3.49793 24.7284 3.6537 25.0017C3.80946 25.2751 4.03407 25.5029 4.3052 25.6625C4.57521 25.8214 4.88198 25.9072 5.19522 25.9114H26.8048C27.1178 25.9071 27.4243 25.8213 27.6942 25.6624C27.9652 25.5029 28.1897 25.2752 28.3454 25.002C28.5012 24.7288 28.5827 24.4196 28.5819 24.1051C28.5811 23.7925 28.499 23.4855 28.3438 23.2143L17.5412 5.17538C17.5409 5.17487 17.5406 5.17435 17.5403 5.17384C17.3798 4.90951 17.1539 4.69092 16.8845 4.53913C16.6145 4.38703 16.3099 4.30713 16 4.30713Z",
			fill: "currentColor"
		}),
		/* @__PURE__ */ p("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M15.25 21.3333C15.25 20.919 15.5858 20.5833 16 20.5833H16.0133C16.4275 20.5833 16.7633 20.919 16.7633 21.3333C16.7633 21.7475 16.4275 22.0833 16.0133 22.0833H16C15.5858 22.0833 15.25 21.7475 15.25 21.3333Z",
			fill: "currentColor"
		})
	]
}), Br = ({ message: e }) => /* @__PURE__ */ m(Qt, {
	message: e,
	children: [/* @__PURE__ */ p(zr, {}), e.text]
}), Vr = ({ message: e }) => /* @__PURE__ */ p(Qt, {
	message: e,
	children: /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-loading-message",
		children: [/* @__PURE__ */ p(qt, {}), /* @__PURE__ */ p(Gt, {})]
	})
}), Hr = ({ message: e }) => {
	let t = _t(e.text), n = e.status === "pending";
	return /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-tool-message",
		children: [/* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-tool-message__spinner-wrapper",
			children: p(n ? qt : ft, {})
		}), /* @__PURE__ */ m("span", {
			className: "ibexa-ai-assistant-tool-message__text",
			children: [t, n ? "..." : ""]
		})]
	});
};
//#endregion
//#region lib/providers/MessageRendererRegistryProvider.tsx
function Ur(e) {
	let t = new Fr();
	return t.register("loading", (e) => /* @__PURE__ */ p(Vr, { message: e })), t.register("error", (e) => /* @__PURE__ */ p(Br, { message: e })), t.register("text", (e) => /* @__PURE__ */ p(Tr, { message: e })), t.register("streamed_text", (e) => /* @__PURE__ */ p(Ar, { message: e })), t.register("welcome", (e) => /* @__PURE__ */ p(Nr, { message: e })), t.register("image", (e) => /* @__PURE__ */ p(Pr, { message: e })), t.register("compound", (e) => /* @__PURE__ */ p(Rr, { message: e })), t.register("tool", (e) => /* @__PURE__ */ p(Hr, { message: e })), Object.entries(e).forEach(([e, n]) => {
		t.register(e, n);
	}), t;
}
function Wr({ renderers: e, children: t }) {
	let n = Ur(e);
	return /* @__PURE__ */ p(Ir.Provider, {
		value: n,
		children: t
	});
}
//#endregion
//#region lib/providers/HotkeyMapProvider.tsx
var Gr = {
	activate: "f2",
	deactivate: "escape",
	sendMessage: "enter",
	newConversation: "alt+n",
	attachFile: "ctrl+o",
	toggleMicrophone: "ctrl+shift+m",
	toggleFullscreen: "f11",
	toggleSidebar: "ctrl+b"
}, Kr = ({ hotkeys: e = {}, children: t }) => {
	let n = l(() => ({
		...Gr,
		...e
	}), [e]);
	return /* @__PURE__ */ p(ht.Provider, {
		value: n,
		children: t
	});
}, qr = ({ children: e }) => {
	let [t, n] = d(""), [r, a] = d([]), o = t.trim() !== "" || r.length > 0, [s, c] = d(o ? [] : [Er.INPUT]), u = l(() => [t, n], [t]), f = l(() => [r, a], [r]), m = i((e) => c((t) => t.includes(e) ? t : [...t, e]), []), h = i((e) => c((t) => t.includes(e) ? t.filter((t) => t !== e) : t), []), g = i((e, t) => {
		c((n) => t === !0 ? n.includes(e) ? n : [...n, e] : t === !1 ? n.includes(e) ? n.filter((t) => t !== e) : n : n.includes(e) ? n.filter((t) => t !== e) : [...n, e]);
	}, []), _ = l(() => ({
		addLock: m,
		removeLock: h,
		toggleLock: g,
		hasLock: (e) => s.includes(e),
		isLocked: () => s.length > 0
	}), [
		s,
		m,
		h,
		g
	]);
	return /* @__PURE__ */ p(Or.Provider, {
		value: u,
		children: /* @__PURE__ */ p(kr.Provider, {
			value: f,
			children: /* @__PURE__ */ p(Dr.Provider, {
				value: _,
				children: e
			})
		})
	});
}, Jr = ({ errorFallbackHandler: e, locale: t, translations: n, errorMemo: r, onConfirmation: i, avatarMemo: a, currentUser: o, hotkeys: s, messageComponents: c, inputPreviewComponents: l, adapterKey: u, adapter: d, initialConversationId: f, inputConfig: m, onConversationChange: h, children: g }) => /* @__PURE__ */ p(le, {
	fallback: null,
	onError: e,
	children: /* @__PURE__ */ p(Ke, {
		locale: t,
		messages: n,
		children: /* @__PURE__ */ p(fe.Provider, {
			value: r,
			children: /* @__PURE__ */ p(N.Provider, {
				value: i,
				children: /* @__PURE__ */ p(de.Provider, {
					value: a,
					children: /* @__PURE__ */ p(F.Provider, {
						value: o,
						children: /* @__PURE__ */ p(Kr, {
							hotkeys: s,
							children: /* @__PURE__ */ p(Wr, {
								renderers: c,
								children: /* @__PURE__ */ p(Vt, {
									renderers: l,
									children: /* @__PURE__ */ p(Ue, {
										adapter: d,
										id: f,
										onConversationChange: h,
										children: /* @__PURE__ */ p(M, {
											config: m,
											children: /* @__PURE__ */ p(qr, { children: g })
										})
									}, u)
								})
							})
						})
					})
				})
			})
		})
	})
}), Yr = [
	"shift",
	"alt",
	"meta",
	"mod",
	"ctrl",
	"control"
];
function Xr() {
	return typeof navigator > "u" ? !1 : /mac/i.test(navigator.userAgent) && !/iphone|ipad|ipod/i.test(navigator.userAgent);
}
var Zr = {
	esc: "escape",
	return: "enter",
	left: "arrowleft",
	right: "arrowright",
	up: "arrowup",
	down: "arrowdown",
	ShiftLeft: "shift",
	ShiftRight: "shift",
	AltLeft: "alt",
	AltRight: "alt",
	MetaLeft: "meta",
	MetaRight: "meta",
	OSLeft: "meta",
	OSRight: "meta",
	ControlLeft: "ctrl",
	ControlRight: "ctrl"
};
function Qr(e) {
	return (Zr[e.trim()] || e.trim()).toLowerCase().replace(/key|digit|numpad/, "");
}
function $r(e) {
	return Yr.includes(e);
}
function ei(e, t = ",") {
	return e.toLowerCase().split(t);
}
function ti(e, t = "+", n = ">", r = !1, i, a) {
	let o = [], s = !1;
	e = e.trim(), e.includes(n) ? (s = !0, o = e.toLocaleLowerCase().split(n).map((e) => Qr(e))) : o = e.toLocaleLowerCase().split(t).map((e) => Qr(e));
	let c = {
		alt: o.includes("alt"),
		ctrl: o.includes("ctrl") || o.includes("control"),
		shift: o.includes("shift"),
		meta: o.includes("meta"),
		mod: o.includes("mod"),
		useKey: r
	}, l = o.filter((e) => !Yr.includes(e));
	return {
		...c,
		keys: l,
		description: i,
		isSequence: s,
		hotkey: e,
		metadata: a
	};
}
typeof document < "u" && (document.addEventListener("keydown", (e) => {
	e.code !== void 0 && ai([Qr(e.code)]);
}), document.addEventListener("keyup", (e) => {
	e.code !== void 0 && oi([Qr(e.code)]);
})), typeof window < "u" && (window.addEventListener("blur", () => {
	ni.clear();
}), window.addEventListener("focus", () => {
	ni.clear();
}), window.addEventListener("contextmenu", () => {
	setTimeout(() => {
		ni.clear();
	}, 0);
})), typeof document < "u" && document.addEventListener("visibilitychange", () => {
	ni.clear();
});
var ni = /* @__PURE__ */ new Set();
function ri(e) {
	return Array.isArray(e);
}
function ii(e, t = ",") {
	return (ri(e) ? e : e.split(t)).every((e) => ni.has(e.trim().toLowerCase()));
}
function ai(e) {
	let t = Array.isArray(e) ? e : [e];
	ni.has("meta") && ni.forEach((e) => {
		$r(e) || ni.delete(e.toLowerCase());
	}), t.forEach((e) => {
		ni.add(e.toLowerCase());
	});
}
function oi(e) {
	e === "meta" ? ni.clear() : (Array.isArray(e) ? e : [e]).forEach((e) => {
		ni.delete(e.toLowerCase());
	});
}
function si(e, t, n) {
	(typeof n == "function" && n(e, t) || n === !0) && e.preventDefault();
}
function ci(e, t, n) {
	return typeof n == "function" ? n(e, t) : n === !0 || n === void 0;
}
var li = [
	"input",
	"textarea",
	"select",
	"searchbox",
	"slider",
	"spinbutton",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"textbox"
];
function ui(e) {
	return di(e, li);
}
function di(e, t = !1) {
	let { target: n, composed: r } = e, i, a;
	return fi(n) && r ? (i = e.composedPath()[0] && e.composedPath()[0].tagName, a = e.composedPath()[0] && e.composedPath()[0].role) : (i = n && n.tagName, a = n && n.role), ri(t) ? !!(i && t?.some((e) => e.toLowerCase() === i.toLowerCase() || e === a)) : !!(i && t && t);
}
function fi(e) {
	return !!e.tagName && !e.tagName.startsWith("-") && e.tagName.includes("-");
}
function pi(e, t) {
	return e.length === 0 && t ? !1 : !t || e.some((e) => t.includes(e)) || e.includes("*");
}
var mi = (e, t, n = !1) => {
	let { alt: r, meta: i, mod: a, shift: o, ctrl: s, keys: c, useKey: l } = t, { code: u, key: d, ctrlKey: f, metaKey: p, shiftKey: m, altKey: h } = e, g = Qr(u), _ = typeof e.getModifierState == "function" && e.getModifierState("AltGraph");
	if (!l && !c?.includes(g) && ![
		"ctrl",
		"control",
		"unknown",
		"meta",
		"alt",
		"shift",
		"os"
	].includes(g)) return !1;
	if (!n) {
		if (r !== h && g !== "alt" || o !== m && g !== "shift") return !1;
		if (a) {
			if (Xr() ? !p : !f) return !1;
		} else if (i !== p && g !== "meta" && g !== "os" || s !== f && g !== "ctrl" && g !== "control") return !1;
		if (_ && !r && !s && !a && ![
			"alt",
			"ctrl",
			"control"
		].includes(g)) return !1;
	}
	return l && c?.length === 1 && c.includes(d.toLowerCase()) || c && c.length === 1 && c.includes(g) ? !0 : c && c.length > 0 ? c.includes(g) ? ii(c) : !1 : !c || c.length === 0;
}, hi = t(void 0), gi = () => a(hi);
function _i(e, t) {
	return e && t && typeof e == "object" && typeof t == "object" ? Object.keys(e).length === Object.keys(t).length && Object.keys(e).reduce((n, r) => n && _i(e[r], t[r]), !0) : e === t;
}
var vi = t({
	hotkeys: [],
	activeScopes: [],
	toggleScope: () => {},
	enableScope: () => {},
	disableScope: () => {}
}), yi = () => a(vi);
function bi(e) {
	let t = u(void 0);
	return _i(t.current, e) || (t.current = e), t.current;
}
var xi = (e) => {
	e.stopPropagation(), e.preventDefault(), e.stopImmediatePropagation();
}, Si = typeof window < "u" ? c : o;
function Ci(e) {
	if (!e) return;
	let { enabled: t, preventDefault: n, ignoreEventWhen: r, ...i } = e;
	return typeof t == "function" ? i : {
		...i,
		enabled: t
	};
}
function wi(e, t, n, r) {
	let [a, o] = d(null), s = i((e) => (o(e), () => o(null)), []), c = u(!1), l = Array.isArray(n) ? Array.isArray(r) ? void 0 : r : n, f = ri(e) ? e.join(l?.delimiter) : e, p = Array.isArray(n) ? n : Array.isArray(r) ? r : void 0, m = i(t, p ?? []), h = u(m);
	h.current = p ? m : t;
	let g = bi(Ci(l)), _ = u(l?.enabled);
	_.current = l?.enabled;
	let v = u(l?.preventDefault);
	v.current = l?.preventDefault;
	let y = u(l?.ignoreEventWhen);
	y.current = l?.ignoreEventWhen;
	let { activeScopes: b } = yi(), x = gi();
	return Si(() => {
		if (_.current === !1 || !pi(b, g?.scopes)) return;
		let e = [], t, n = (n, r = !1) => {
			if (!(ui(n) && !di(n, g?.enableOnFormTags))) {
				if (a !== null) {
					let e = a.getRootNode();
					if ((e instanceof Document || e instanceof ShadowRoot) && e.activeElement !== a && !a.contains(e.activeElement)) {
						xi(n);
						return;
					}
				}
				n.target?.isContentEditable && !g?.enableOnContentEditable || ei(f, g?.delimiter).forEach((i) => {
					if (i.includes(g?.splitKey ?? "+") && i.includes(g?.sequenceSplitKey ?? ">")) {
						console.warn(`Hotkey ${i} contains both ${g?.splitKey ?? "+"} and ${g?.sequenceSplitKey ?? ">"} which is not supported.`);
						return;
					}
					let a = ti(i, g?.splitKey, g?.sequenceSplitKey, g?.useKey, g?.description, g?.metadata);
					if (a.isSequence) {
						t = setTimeout(() => {
							e = [];
						}, g?.sequenceTimeoutMs ?? 1e3);
						let r = a.useKey ? n.key : Qr(n.code);
						if ($r(r.toLowerCase())) return;
						if (e.push(r), r !== a.keys?.[e.length - 1]) {
							e = [], t && clearTimeout(t);
							return;
						}
						e.length === a.keys?.length && (h.current(n, a), t && clearTimeout(t), e = []);
					} else if (mi(n, a, g?.ignoreModifiers) || a.keys?.includes("*")) {
						if (y.current?.(n) || r && c.current || (si(n, a, v.current), !ci(n, a, _.current))) return;
						h.current(n, a), r || (c.current = !0);
					}
				});
			}
		}, r = (e) => {
			e.code !== void 0 && (ai(Qr(e.code)), (g?.keydown === void 0 && g?.keyup !== !0 || g?.keydown) && n(e));
		}, i = (e) => {
			e.code !== void 0 && (oi(Qr(e.code)), c.current = !1, g?.keyup && n(e, !0));
		}, o = a || l?.document || document;
		return o.addEventListener("keyup", i, l?.eventListenerOptions), o.addEventListener("keydown", r, l?.eventListenerOptions), x && ei(f, g?.delimiter).forEach((e) => {
			x.addHotkey(ti(e, g?.splitKey, g?.sequenceSplitKey, g?.useKey, g?.description, g?.metadata));
		}), () => {
			o.removeEventListener("keyup", i, l?.eventListenerOptions), o.removeEventListener("keydown", r, l?.eventListenerOptions), x && ei(f, g?.delimiter).forEach((e) => {
				x.removeHotkey(ti(e, g?.splitKey, g?.sequenceSplitKey, g?.useKey, g?.description, g?.metadata));
			}), e = [], t && clearTimeout(t);
		};
	}, [
		a,
		g,
		b,
		f
	]), s;
}
//#endregion
//#region lib/hooks/useNamedHotkey.ts
function Ti(e, t, n, r) {
	let i = a(ht)[e];
	return wi(i, t, n, r);
}
//#endregion
//#region lib/components/NewConversationButton/NewConversationButton.tsx
var Ei = ({ onClick: e, labelled: t }) => {
	let n = g(), r = a(ht), i = bt(n.formatMessage({ id: "ibexa.ai_assistant.new_conversation_button.title" }), r.newConversation);
	return Ti("newConversation", e, {
		enableOnFormTags: !0,
		preventDefault: !0
	}), /* @__PURE__ */ m(Ye, {
		labelled: t,
		onClick: e,
		title: i,
		children: [/* @__PURE__ */ p(mt, { name: "newConversation" }), t && /* @__PURE__ */ p("span", { children: n.formatMessage({ id: "ibexa.ai_assistant.new_conversation_button.label" }) })]
	});
}, Di = ({ fullScreen: e = !1, onClick: t }) => {
	let n = g(), r = a(ht), i = e ? n.formatMessage({ id: "ibexa.ai_assistant.fullscreen_exit_button.title" }) : n.formatMessage({ id: "ibexa.ai_assistant.fullscreen_button.title" });
	return Ti("toggleFullscreen", t, {
		enableOnFormTags: !0,
		preventDefault: !0
	}), /* @__PURE__ */ p(Ye, {
		title: bt(i, r.toggleFullscreen),
		onClick: t,
		children: /* @__PURE__ */ p(mt, { name: e ? "fullScreenExit" : "fullScreen" })
	});
}, Oi = 3, ki = 3, Ai = () => {
	let e = g(), { conversations: t, searchConversations: n, onResetSearch: r, searchConversationsEnabled: s } = a(Be), [c, l] = d(!1), [u, f] = d(""), h = i((e) => {
		if (f(e), l(!0), e === "") {
			n({ query: void 0 });
			return;
		}
		e.length < Oi || n({ query: e });
	}, [n]), _ = c || s && t.length >= ki;
	return o(() => {
		r(() => {
			f("");
		});
	}, [r]), _ ? /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-search-conversations-field",
		children: /* @__PURE__ */ m("div", {
			className: "ibexa-ai-assistant-search-conversations-field__input-wrapper",
			children: [/* @__PURE__ */ p("input", {
				type: "text",
				className: "ibexa-ai-assistant-search-conversations-field__input",
				placeholder: e.formatMessage({ id: "ibexa.ai_assistant.search_conversations_field.placeholder" }),
				value: u,
				onChange: (e) => h(e.target.value)
			}), /* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-search-conversations-field__input-actions",
				children: /* @__PURE__ */ p(Ye, {
					title: e.formatMessage({ id: "ibexa.ai_assistant.search_conversations_field.action" }),
					children: /* @__PURE__ */ p(mt, {
						name: "search",
						size: "tiny"
					})
				})
			})]
		})
	}) : null;
}, ji = (e) => {
	if (e) {
		if (e.offsetWidth >= e.scrollWidth) {
			e.removeAttribute("title");
			return;
		}
		e.setAttribute("title", e.innerText);
	}
}, Mi = (e) => {
	let t = g(), n = e ?? t.formatMessage({ id: "ibexa.ai_assistant.conversations.untitled_conversation" });
	return i((e) => e || /* @__PURE__ */ p("i", { children: n }), [n]);
}, Ni = ({ onClick: e }) => {
	let { conversations: t, currentConversation: n, isLoadingConversations: r } = a(Be), i = Mi();
	return /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-conversations-popup",
		children: [/* @__PURE__ */ p(Ai, {}), /* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-conversations-popup__items",
			children: r ? /* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-conversations-popup__loader",
				children: /* @__PURE__ */ p(qt, {})
			}) : t.map((t) => {
				let r = Je({
					"ibexa-ai-assistant-conversations-popup__item": !0,
					"ibexa-ai-assistant-conversations-popup__item--active": n?.id === t.id
				});
				return /* @__PURE__ */ p("div", {
					className: r,
					children: /* @__PURE__ */ p("button", {
						type: "button",
						className: "ibexa-ai-assistant-conversations-popup__item-btn",
						onClick: () => {
							e(t.id);
						},
						ref: (e) => {
							ji(e);
						},
						children: i(t.subject)
					})
				}, t.id);
			})
		})]
	});
}, Pi = ({ disabled: e = !1, expanded: t = !1, onClick: n }) => {
	let r = g(), i = Je({
		"ibexa-ai-assistant-toggle-conversations-popup-btn": !0,
		"ibexa-ai-assistant-toggle-conversations-popup-btn--expanded": t
	}), a = r.formatMessage({ id: "ibexa.ai_assistant.toggle_conversations_popup.no_conversations" }), o = r.formatMessage({ id: "ibexa.ai_assistant.toggle_conversations_popup.title" });
	return /* @__PURE__ */ p(Ye, {
		className: i,
		disabled: e,
		onClick: n,
		title: e ? a : o,
		children: /* @__PURE__ */ p("span", {
			className: "ibexa-ai-assistant-toggle-conversations-popup-btn__content",
			children: /* @__PURE__ */ p(mt, { name: "chevronDown" })
		})
	});
}, Fi = ({ newConversationVisible: e = !1, fullscreenVisible: t = !1, closeVisible: n = !0, fullscreen: r, onClose: o, onFullscreenChange: s, onNewConversation: c, title: h }) => {
	let { currentConversation: g, conversations: _, resetSearch: v, setCurrentConversation: y } = a(Be), [b, x] = d(0), [S, C] = d(!1), w = u(null), T = l(() => _.map((e) => ({
		id: e.id,
		label: e.subject
	})), [_]).length <= 1, E = i((e) => {
		let t = _.find((t) => t.id === e);
		t && (y(t), C(!1), v());
	}, [
		_,
		y,
		v
	]);
	return St(w), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ m("header", {
		className: "ibexa-ai-assistant-chatbot-header",
		children: [
			/* @__PURE__ */ p("span", {
				className: "ibexa-ai-assistant-chatbot-header__logo",
				children: /* @__PURE__ */ p(mt, {
					name: "assistant",
					size: "large",
					type: "primary"
				})
			}),
			/* @__PURE__ */ p("h2", {
				className: "ibexa-ai-assistant-chatbot-header__title",
				ref: w,
				children: g?.subject || h
			}),
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-chatbot-header__toggler",
				ref: (e) => {
					e && x(e.offsetTop + e.offsetHeight);
				},
				children: !r && /* @__PURE__ */ p(Pi, {
					disabled: T,
					expanded: S,
					onClick: () => C(!S)
				})
			}),
			/* @__PURE__ */ m("div", {
				className: "ibexa-ai-assistant-chatbot-header__toolbar",
				children: [
					e && /* @__PURE__ */ p(Ei, { onClick: c }),
					t && /* @__PURE__ */ p(Di, {
						fullScreen: r,
						onClick: s
					}),
					n && /* @__PURE__ */ p(xt, { onClick: o })
				]
			})
		]
	}), S && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-chatbot-header__overlay",
		onClick: () => {
			C(!1), v();
		}
	}), /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-chatbot-header__conversations-popup-wrapper",
		style: { "--offset": `${b}px` },
		children: /* @__PURE__ */ p(Ni, { onClick: E })
	})] })] });
}, Ii = /\[@([^\]]*)\]\(([^)]*)\)/g;
function Li(e) {
	return e.replace(Ii, (e, t, n) => `@${n}`);
}
//#endregion
//#region lib/defaultConfig.ts
var Ri = "Hello! How can I assist you today?", zi = [
	{
		id: "suggestion-1",
		title: "What is the weather like today?",
		prompt: "What is the weather like today?"
	},
	{
		id: "suggestion-2",
		title: "Can you tell me a joke?",
		prompt: "Can you tell me a joke?"
	},
	{
		id: "suggestion-3",
		title: "What can you do?",
		prompt: "What can you do?"
	}
], Bi = {
	INITIAL: "initial",
	MORE: "more"
}, Vi = ({ children: e, contentVersion: t, className: n = "", elementAs: r = "div", listAs: a = "div", endOfResults: s = !0, endOfResultsMessage: c, listRef: l, loadMore: h, triggerPosition: _ = "bottom", initialPosition: y = "top", isExternalLoading: b = !1, isLoadingInitially: x = !0 }) => {
	let S = g(), C = u(null), w = l || C, T = u(null), E = u(0), D = u(x), O = u(!1), k = u({
		offset: null,
		height: null
	}), [A, j] = d(x), [ee, te] = d(!1), [ne, re] = d(!1), ie = i((e) => {
		e && O.current && (re(!0), te(!0), h(Bi.MORE));
	}, [h]), M = i(({ currentTarget: e }) => {
		O.current = !0, re(!0), ee && (k.current = {
			offset: e.scrollTop,
			height: e.scrollHeight
		});
	}, [ee]), ae = Je({
		"ibexa-ai-assistant-infinite-scroll-wrapper": !0,
		[n]: !!n
	}), N = c ?? S.formatMessage({ id: "ibexa.ai_assistant.infinite_scroll_wrapper.beginning_of_conversation" }), oe = r, se = () => s ? null : /* @__PURE__ */ p(v, {
		as: r,
		onChange: ie,
		className: "ibexa-ai-assistant-infinite-scroll-wrapper__infinite-scroll-trigger",
		children: ee && /* @__PURE__ */ p(qt, {})
	}), ce = () => !ne || !s ? null : /* @__PURE__ */ p(oe, {
		className: "ibexa-ai-assistant-infinite-scroll-wrapper__end-of-results",
		children: N
	}), le = (e) => _ === e ? /* @__PURE__ */ m(f, { children: [
		e === "top" && ce(),
		se(),
		e === "bottom" && ce()
	] }) : null;
	return o(() => {
		if (b || !T.current) return;
		let e = !0, t = new ResizeObserver(([t]) => {
			if (e || t.contentRect.height === E.current) {
				e = !1;
				return;
			}
			E.current = t.contentRect.height, O.current = !1, j(!0), h(Bi.INITIAL).then(({ done: e }) => {
				D.current = !e, e && j(!1);
			});
		});
		return t.observe(T.current), () => {
			t.disconnect();
		};
	}, [
		b,
		j,
		h
	]), o(() => {
		if (!(!x || b || !w.current)) {
			if (w.current.scrollHeight > w.current.clientHeight || !D.current) {
				j(!1);
				return;
			}
			j(!0), h(Bi.INITIAL).then(({ done: e }) => {
				D.current = !e, e && j(!1);
			});
		}
	}, [
		b,
		t,
		h,
		w,
		x
	]), o(() => {
		b || A || !w.current || (y === "bottom" ? w.current.scrollTop = w.current.scrollHeight : w.current.scrollTop = 0);
	}, [
		b,
		A,
		y,
		w
	]), o(() => {
		b || !ee || !w.current || (k.current = {
			offset: w.current.scrollTop,
			height: w.current.scrollHeight
		});
	}, [
		b,
		ee,
		w
	]), o(() => {
		if (b || (te(!1), !w.current || k.current.height === null || k.current.offset === null || _ === "bottom")) return;
		let e = w.current.scrollHeight - k.current.height, t = k.current.offset + e;
		w.current.scrollTop = t;
	}, [
		b,
		t,
		te,
		w,
		_
	]), /* @__PURE__ */ m("div", {
		ref: T,
		className: ae,
		children: [(b || A) && /* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-infinite-scroll-wrapper__loader",
			children: /* @__PURE__ */ p(qt, {})
		}), /* @__PURE__ */ m(a, {
			ref: w,
			onScroll: M,
			className: "ibexa-ai-assistant-infinite-scroll-wrapper__list",
			children: [
				le("top"),
				e,
				le("bottom")
			]
		})]
	});
}, Hi = ({ active: e, conversation: t }) => {
	let n = g(), r = Mi(), { onDeleteConversationError: o } = He(), { setCurrentConversation: s, deleteConversation: c } = a(Be), l = a(N), u = Je({
		"ibexa-ai-assistant-conversation-history-item": !0,
		"ibexa-ai-assistant-conversation-history-item--active": e
	}), d = i((e) => {
		e.preventDefault(), s(t);
	}, [t, s]), f = i(() => {
		let e = n.formatMessage({ id: "ibexa.ai_assistant.conversation_history.delete_conversation.confirmation" }, { conversationSubject: t.subject });
		l(e, { onConfirm: () => {
			c(t).catch((e) => {
				o(e);
			});
		} });
	}, [
		t,
		c,
		o,
		n,
		l
	]);
	return /* @__PURE__ */ p("li", {
		className: u,
		children: /* @__PURE__ */ m("div", {
			className: "ibexa-ai-assistant-conversation-history-item__content",
			children: [/* @__PURE__ */ p(Ye, {
				title: n.formatMessage({ id: "ibexa.ai_assistant.conversation_history.switch_conversation" }),
				className: "ibexa-ai-assistant-conversation-history-item__switch-conversation",
				onClick: d,
				children: /* @__PURE__ */ p("span", {
					className: "ibexa-ai-assistant-conversation-history-item__subject",
					children: r(t.subject)
				})
			}), !e && /* @__PURE__ */ p(Ye, {
				title: n.formatMessage({ id: "ibexa.ai_assistant.conversation_history.delete_conversation" }),
				className: "ibexa-ai-assistant-conversation-history-item__delete",
				onClick: f,
				children: /* @__PURE__ */ p(mt, { name: "trash" })
			})]
		})
	});
}, Ui = 5, Wi = () => {
	let e = g(), t = u(null), { currentConversation: n, conversations: r, conversationsContextId: o, isLoadingConversations: s, loadMoreConversations: c } = a(Be), [l, h] = d(!1), _ = i((e) => {
		if (s) return Promise.resolve({ done: !1 });
		let n;
		if (e === "initial" && t.current) {
			let e = t.current.firstElementChild;
			if (e) {
				let i = e.clientHeight ?? 0, a = t.current.clientHeight;
				n = Math.ceil(a / i) + Ui - r.length;
			}
		}
		return c(n).then((t) => t?.length === 0 ? (e !== "initial" && h(!0), { done: !0 }) : { done: !1 });
	}, [
		c,
		h,
		s,
		r.length
	]);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Ai, {}), /* @__PURE__ */ m(Vi, {
		className: "ibexa-ai-assistant-conversation-history",
		contentVersion: r.length.toString(),
		loadMore: _,
		endOfResults: l,
		endOfResultsMessage: e.formatMessage({ id: "ibexa.ai_assistant.conversation_history.end_of_results" }),
		elementAs: "li",
		listAs: "ul",
		listRef: t,
		children: [r.length === 0 && /* @__PURE__ */ p("li", {
			className: "ibexa-ai-assistant-conversation-history-item ibexa-ai-assistant-conversation-history__empty",
			children: e.formatMessage({ id: "ibexa.ai_assistant.conversation_history.empty" })
		}), r.map((e) => /* @__PURE__ */ p(Hi, {
			conversation: e,
			active: e.id === n.id
		}, e.id))]
	}, o)] });
}, Gi = ({ toggled: e = !1, onClick: t }) => {
	let n = g(), r = a(ht), i = Je({
		"ibexa-ai-assistant-sidebar-toggle": !0,
		"ibexa-ai-assistant-sidebar-toggle--toggled": e
	}), o = e ? n.formatMessage({ id: "ibexa.ai_assistant.sidebar_toggle.expand" }) : n.formatMessage({ id: "ibexa.ai_assistant.sidebar_toggle.collapse" });
	return Ti("toggleSidebar", t, {
		enableOnFormTags: !1,
		preventDefault: !0
	}), /* @__PURE__ */ p(Ye, {
		className: i,
		title: bt(o, r.toggleSidebar),
		onClick: t,
		children: /* @__PURE__ */ p(mt, {
			name: "arrowCollapseLeft",
			size: "medium"
		})
	});
}, Ki = ({ onNewConversation: e }) => {
	let t = g(), [n, r] = d(!0), [i, a] = d(!0), o = Je({
		"ibexa-ai-assistant-chat-sidebar": !0,
		"ibexa-ai-assistant-chat-sidebar--expanded": n
	});
	return /* @__PURE__ */ m("aside", {
		className: o,
		onTransitionEnd: (e) => {
			e.propertyName === "max-width" && n && a(!0);
		},
		children: [
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-chat-sidebar__top",
				children: /* @__PURE__ */ p(Gi, {
					onClick: () => {
						n && a(!1), r((e) => !e);
					},
					toggled: !n
				})
			}),
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-chat-sidebar__new-conversation",
				children: /* @__PURE__ */ p(Ei, {
					onClick: e,
					labelled: i
				})
			}),
			i && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("header", {
				className: "ibexa-ai-assistant-chat-sidebar__header",
				children: /* @__PURE__ */ p("h3", { children: t.formatMessage({ id: "ibexa.ai_assistant.conversation_history.title" }) })
			}), /* @__PURE__ */ p(Wi, {})] })
		]
	});
}, qi = ({ onClick: e, disabled: t }) => {
	let n = g(), r = a(ht), i = bt(n.formatMessage({ id: "ibexa.ai_assistant.send_button.title" }), r.sendMessage), o = () => {
		t || e();
	};
	return Ti("sendMessage", o, { enableOnFormTags: !0 }), /* @__PURE__ */ p(Ye, {
		onClick: o,
		title: i,
		disabled: t,
		children: /* @__PURE__ */ p(mt, { name: "send" })
	});
}, Ji = (e = { lang: "en-US" }) => {
	let { SpeechRecognitionClass: t } = a(re), [n, r] = d(!1), [i, s] = d(""), c = u(null);
	return o(() => {
		let n = new t({ lang: e.lang }), i = n.onTranscript((e) => {
			s(e);
		}), a = n.onError((e) => {
			console.error("Speech recognition error:", e);
		}), o = n.onEnd(() => {
			r(!1), s("");
		});
		return c.current = n, () => {
			n.stop(), i(), a(), o();
		};
	}, [t, e.lang]), {
		isListening: n,
		startListening: () => {
			c.current && !n && (c.current.start(), r(!0));
		},
		stopListening: () => {
			c.current && n && (c.current.stop(), r(!1));
		},
		transcript: i
	};
}, Yi = 40, Xi = 2, Zi = 256, Qi = .6, $i = .4, ea = ({ disabled: e, onListeningChange: t, onConfirm: n, onDiscard: r }) => {
	let s = g(), c = a(ht), { voice: l } = a(re), [d, f] = a(Or), { isListening: h, startListening: _, stopListening: v, transcript: y } = Ji({ lang: l.lang }), b = u(""), x = u(!1), S = u(Array(Yi).fill(null)), C = u(null), w = u(null), T = u(null), E = u(null), D = i(() => {
		S.current.forEach((e) => {
			e && (e.style.height = `${Xi}px`);
		});
	}, []), O = i(() => {
		E.current !== null && (cancelAnimationFrame(E.current), E.current = null), T.current?.getTracks().forEach((e) => e.stop()), T.current = null, C.current && C.current.state !== "closed" && C.current.close(), C.current = null, w.current = null, D();
	}, [D]);
	o(() => {
		h || O();
	}, [h, O]), o(() => () => {
		O();
	}, [O]), o(() => {
		if (h) {
			let e = b.current.trim();
			f(e + (e ? " " : "") + y);
		} else x.current && t?.(!1);
		x.current = h;
	}, [
		y,
		h,
		f,
		t
	]);
	let k = i(async () => {
		if (e) return;
		b.current = d, _(), t?.(!0);
		let n = new AudioContext();
		C.current = n;
		try {
			let e = await navigator.mediaDevices.getUserMedia({ audio: !0 });
			if (C.current !== n) {
				e.getTracks().forEach((e) => e.stop()), n.state !== "closed" && n.close();
				return;
			}
			T.current = e, await n.resume();
			let t = n.createAnalyser();
			t.fftSize = Zi, w.current = t, n.createMediaStreamSource(e).connect(t);
			let r = new Uint8Array(t.frequencyBinCount), i = Math.floor(r.length / 2), a = Array(Yi).fill(Xi), o = () => {
				E.current = requestAnimationFrame(o), t.getByteFrequencyData(r);
				let e = S.current;
				for (let t = 0; t < Yi; t++) {
					let n = Math.floor(t * i / Yi), o = Math.floor((t + 1) * i / Yi), s = o - n || 1, c = 0;
					for (let e = n; e < o; e++) c += r[e];
					let l = Xi + c / s / 255 * 30;
					a[t] = a[t] * Qi + l * $i, e[t] && (e[t].style.height = `${a[t]}px`);
				}
			};
			o();
		} catch (e) {
			console.error("Voice visualizer: failed to access microphone", e);
		}
	}, [
		e,
		d,
		_,
		t
	]), A = i(() => {
		v(), n?.();
	}, [v, n]), j = i(() => {
		v(), f(b.current), r?.();
	}, [
		v,
		f,
		r
	]), ee = bt(s.formatMessage({ id: "ibexa.ai_assistant.voice_input.dictate" }), c.toggleMicrophone);
	return Ti("toggleMicrophone", h ? A : k, {
		enableOnFormTags: !0,
		preventDefault: !0
	}), h ? /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-voice-input__recording",
		children: [
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-voice-input__progress",
				children: Array.from({ length: Yi }, (e, t) => /* @__PURE__ */ p("span", {
					ref: (e) => {
						S.current[t] = e;
					},
					className: "ibexa-ai-assistant-voice-input__progress-bar",
					style: { height: `${Xi}px` }
				}, t))
			}),
			/* @__PURE__ */ p(Ye, {
				"data-testid": "voice-input-discard-button",
				title: s.formatMessage({ id: "ibexa.ai_assistant.voice_input.discard" }),
				onClick: j,
				children: /* @__PURE__ */ p(mt, { name: "discardCircle" })
			}),
			/* @__PURE__ */ p(Ye, {
				"data-testid": "voice-input-confirm-button",
				title: s.formatMessage({ id: "ibexa.ai_assistant.voice_input.confirm" }),
				onClick: A,
				children: /* @__PURE__ */ p(mt, { name: "tick" })
			})
		]
	}) : /* @__PURE__ */ p(Ye, {
		"data-testid": "voice-input-mic-button",
		onClick: k,
		title: ee,
		disabled: e,
		children: /* @__PURE__ */ p(mt, { name: "microphone" })
	});
}, ta = ({ onUpload: e, disabled: t }) => {
	let { onUploadFileError: n } = He(), r = g(), { file: i } = a(re), o = a(ht), s = u(null), c = () => {
		t || s.current?.click();
	};
	return Ti("attachFile", c, {
		enableOnFormTags: !0,
		preventDefault: !0
	}), /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-file-input",
		children: [/* @__PURE__ */ p("input", {
			onChange: (a) => {
				if (t) return;
				let o = a.target.files ? [...a.target.files] : [], s = o.filter((e) => e.size > i.maxSize);
				if (s.length > 0) {
					let e = r.formatMessage({ id: "ibexa.ai_assistant.file_input.error.file_too_large" }, {
						maxSize: ee(i.maxSize, "MB", "B", 2),
						fileNames: s.map((e) => e.name).join(", ")
					});
					n(Error(e), e);
					return;
				}
				e(o.map((e) => ({
					file: e,
					id: I()
				}))), a.target.value = "";
			},
			type: "file",
			multiple: !0,
			ref: s,
			className: "ibexa-ai-assistant-file-input__input",
			accept: i.allowedTypes.join(",")
		}), /* @__PURE__ */ m(Ye, {
			onClick: c,
			title: bt(r.formatMessage({ id: "ibexa.ai_assistant.file_input.title" }), o.attachFile),
			disabled: t,
			labelled: !0,
			"data-testid": "file-input-button",
			children: [/* @__PURE__ */ p(mt, { name: "paperclip" }), r.formatMessage({ id: "ibexa.ai_assistant.file_input.title" })]
		})]
	});
}, na = ({ files: e }) => {
	let t = a(zt), n = (e) => {
		if (t.has(e)) return t.get(e);
		let n = e.split("/")[0];
		return t.has(n) ? t.get(n) : null;
	}, r = e.every(({ file: e }) => n(e.type)?.fullPreview) ? "fullPreview" : "compactPreview", i = t.get("default").compactPreview;
	return /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-input-files-list",
		children: e.map((e) => {
			let t = n(e.file.type)?.[r] ?? i;
			return t ? /* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-input-files-list__entry",
				children: t(e)
			}, e.id) : null;
		})
	});
}, ra = r(({ items: e, loading: t, command: n, rect: r }, i) => {
	let [a, c] = d(0);
	if (o(() => {
		c(0);
	}, [e]), s(i, () => ({ handleKeyDown(t) {
		if (!e.length) return !1;
		if (t.key === "ArrowDown") return c((t) => Math.min(t + 1, e.length - 1)), !0;
		if (t.key === "ArrowUp") return c((e) => Math.max(e - 1, 0)), !0;
		if (t.key === "Enter") {
			let t = e[a];
			return t && n(t), !0;
		}
		return !1;
	} })), !r || !e.length && !t) return null;
	let l = /* @__PURE__ */ p("ul", {
		className: "ibexa-ai-assistant-mention-list",
		style: {
			top: r.top - 4,
			left: r.left,
			transform: "translateY(-100%)"
		},
		children: t ? /* @__PURE__ */ p("li", {
			className: "ibexa-ai-assistant-mention-list__loader",
			children: /* @__PURE__ */ p(qt, {})
		}) : e.map((e, t) => /* @__PURE__ */ p("li", {
			className: Je({
				"ibexa-ai-assistant-mention-list__item": !0,
				"ibexa-ai-assistant-mention-list__item--selected": t === a
			}),
			onMouseDown: (t) => {
				t.preventDefault(), n(e);
			},
			children: e.label
		}, e.id))
	});
	return y(l, document.body);
});
ra.displayName = "MentionList";
//#endregion
//#region node_modules/orderedmap/dist/index.js
function ia(e) {
	this.content = e;
}
ia.prototype = {
	constructor: ia,
	find: function(e) {
		for (var t = 0; t < this.content.length; t += 2) if (this.content[t] === e) return t;
		return -1;
	},
	get: function(e) {
		var t = this.find(e);
		return t == -1 ? void 0 : this.content[t + 1];
	},
	update: function(e, t, n) {
		var r = n && n != e ? this.remove(n) : this, i = r.find(e), a = r.content.slice();
		return i == -1 ? a.push(n || e, t) : (a[i + 1] = t, n && (a[i] = n)), new ia(a);
	},
	remove: function(e) {
		var t = this.find(e);
		if (t == -1) return this;
		var n = this.content.slice();
		return n.splice(t, 2), new ia(n);
	},
	addToStart: function(e, t) {
		return new ia([e, t].concat(this.remove(e).content));
	},
	addToEnd: function(e, t) {
		var n = this.remove(e).content.slice();
		return n.push(e, t), new ia(n);
	},
	addBefore: function(e, t, n) {
		var r = this.remove(t), i = r.content.slice(), a = r.find(e);
		return i.splice(a == -1 ? i.length : a, 0, t, n), new ia(i);
	},
	forEach: function(e) {
		for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
	},
	prepend: function(e) {
		return e = ia.from(e), e.size ? new ia(e.content.concat(this.subtract(e).content)) : this;
	},
	append: function(e) {
		return e = ia.from(e), e.size ? new ia(this.subtract(e).content.concat(e.content)) : this;
	},
	subtract: function(e) {
		var t = this;
		e = ia.from(e);
		for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
		return t;
	},
	toObject: function() {
		var e = {};
		return this.forEach(function(t, n) {
			e[t] = n;
		}), e;
	},
	get size() {
		return this.content.length >> 1;
	}
}, ia.from = function(e) {
	if (e instanceof ia) return e;
	var t = [];
	if (e) for (var n in e) t.push(n, e[n]);
	return new ia(t);
};
//#endregion
//#region node_modules/prosemirror-model/dist/index.js
function aa(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) {
			n += i.nodeSize;
			continue;
		}
		if (!i.sameMarkup(a)) return n;
		if (i.isText && i.text != a.text) {
			let e = i.text, t = a.text, r = 0;
			for (; e[r] == t[r]; r++) n++;
			return r && r < e.length && r < t.length && ca(e.charCodeAt(r - 1)) && sa(e.charCodeAt(r)) && n--, n;
		}
		if (i.content.size || a.content.size) {
			let e = aa(i.content, a.content, n + 1);
			if (e != null) return e;
		}
		n += i.nodeSize;
	}
}
function oa(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), c = o.nodeSize;
		if (o == s) {
			n -= c, r -= c;
			continue;
		}
		if (!o.sameMarkup(s)) return {
			a: n,
			b: r
		};
		if (o.isText && o.text != s.text) {
			let e = o.text, t = s.text, i = e.length, a = t.length;
			for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
			return i && a && i < e.length && ca(e.charCodeAt(i - 1)) && sa(e.charCodeAt(i)) && (n++, r++), {
				a: n,
				b: r
			};
		}
		if (o.content.size || s.content.size) {
			let e = oa(o.content, s.content, n - 1, r - 1);
			if (e) return e;
		}
		n -= c, r -= c;
	}
}
function sa(e) {
	return e >= 56320 && e < 57344;
}
function ca(e) {
	return e >= 55296 && e < 56320;
}
var B = class e {
	constructor(e, t) {
		if (this.content = e, this.size = t || 0, t == null) for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
	}
	nodesBetween(e, t, n, r = 0, i) {
		for (let a = 0, o = 0; o < t; a++) {
			let s = this.content[a], c = o + s.nodeSize;
			if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
				let i = o + 1;
				s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i);
			}
			o = c;
		}
	}
	descendants(e) {
		this.nodesBetween(0, this.size, e);
	}
	textBetween(e, t, n, r) {
		let i = "", a = !0;
		return this.nodesBetween(e, t, (o, s) => {
			let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == "function" ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : "" : "";
			o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c;
		}, 0), i;
	}
	append(t) {
		if (!t.size) return this;
		if (!this.size) return t;
		let n = this.lastChild, r = t.firstChild, i = this.content.slice(), a = 0;
		for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
		return new e(i, this.size + t.size);
	}
	cut(t, n = this.size) {
		if (t == 0 && n == this.size) return this;
		let r = [], i = 0;
		if (n > t) for (let e = 0, a = 0; a < n; e++) {
			let o = this.content[e], s = a + o.nodeSize;
			s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s;
		}
		return new e(r, i);
	}
	cutByIndex(t, n) {
		return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n));
	}
	replaceChild(t, n) {
		let r = this.content[t];
		if (r == n) return this;
		let i = this.content.slice(), a = this.size + n.nodeSize - r.nodeSize;
		return i[t] = n, new e(i, a);
	}
	addToStart(t) {
		return new e([t].concat(this.content), this.size + t.nodeSize);
	}
	addToEnd(t) {
		return new e(this.content.concat(t), this.size + t.nodeSize);
	}
	eq(e) {
		if (this.content.length != e.content.length) return !1;
		for (let t = 0; t < this.content.length; t++) if (!this.content[t].eq(e.content[t])) return !1;
		return !0;
	}
	get firstChild() {
		return this.content.length ? this.content[0] : null;
	}
	get lastChild() {
		return this.content.length ? this.content[this.content.length - 1] : null;
	}
	get childCount() {
		return this.content.length;
	}
	child(e) {
		let t = this.content[e];
		if (!t) throw RangeError("Index " + e + " out of range for " + this);
		return t;
	}
	maybeChild(e) {
		return this.content[e] || null;
	}
	forEach(e) {
		for (let t = 0, n = 0; t < this.content.length; t++) {
			let r = this.content[t];
			e(r, n, t), n += r.nodeSize;
		}
	}
	findDiffStart(e, t = 0) {
		return aa(this, e, t);
	}
	findDiffEnd(e, t = this.size, n = e.size) {
		return oa(this, e, t, n);
	}
	findIndex(e) {
		if (e == 0) return ua(0, e);
		if (e == this.size) return ua(this.content.length, e);
		if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
		for (let t = 0, n = 0;; t++) {
			let r = this.child(t), i = n + r.nodeSize;
			if (i >= e) return i == e ? ua(t + 1, i) : ua(t, n);
			n = i;
		}
	}
	toString() {
		return "<" + this.toStringInner() + ">";
	}
	toStringInner() {
		return this.content.join(", ");
	}
	toJSON() {
		return this.content.length ? this.content.map((e) => e.toJSON()) : null;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		if (!Array.isArray(n)) throw RangeError("Invalid input for Fragment.fromJSON");
		return e.fromArray(n.map(t.nodeFromJSON));
	}
	static fromArray(t) {
		if (!t.length) return e.empty;
		let n, r = 0;
		for (let e = 0; e < t.length; e++) {
			let i = t[e];
			r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i);
		}
		return new e(n || t, r);
	}
	static from(t) {
		if (!t) return e.empty;
		if (t instanceof e) return t;
		if (Array.isArray(t)) return this.fromArray(t);
		if (t.attrs) return new e([t], t.nodeSize);
		throw RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
	}
};
B.empty = new B([], 0);
var la = {
	index: 0,
	offset: 0
};
function ua(e, t) {
	return la.index = e, la.offset = t, la;
}
function da(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!da(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !da(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
var V = class e {
	constructor(e, t) {
		this.type = e, this.attrs = t;
	}
	addToSet(e) {
		let t, n = !1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.eq(i)) return e;
			if (this.type.excludes(i.type)) t ||= e.slice(0, r);
			else if (i.type.excludes(this.type)) return e;
			else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i);
		}
		return t ||= e.slice(), n || t.push(this), t;
	}
	removeFromSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
		return !1;
	}
	eq(e) {
		return this == e || this.type == e.type && da(this.attrs, e.attrs);
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Mark.fromJSON");
		let n = e.marks[t.type];
		if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
		let r = n.create(t.attrs);
		return n.checkAttrs(r.attrs), r;
	}
	static sameSet(e, t) {
		if (e == t) return !0;
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
		return !0;
	}
	static setFrom(t) {
		if (!t || Array.isArray(t) && t.length == 0) return e.none;
		if (t instanceof e) return [t];
		let n = t.slice();
		return n.sort((e, t) => e.type.rank - t.type.rank), n;
	}
};
V.none = [];
var fa = class extends Error {}, H = class e {
	constructor(e, t, n) {
		this.content = e, this.openStart = t, this.openEnd = n;
	}
	get size() {
		return this.content.size - this.openStart - this.openEnd;
	}
	insertAt(t, n) {
		let r = ma(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
		return r && new e(r, this.openStart, this.openEnd);
	}
	removeBetween(t, n) {
		return new e(pa(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
	}
	eq(e) {
		return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
	}
	toString() {
		return this.content + "(" + this.openStart + "," + this.openEnd + ")";
	}
	toJSON() {
		if (!this.content.size) return null;
		let e = { content: this.content.toJSON() };
		return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		let r = n.openStart || 0, i = n.openEnd || 0;
		if (typeof r != "number" || typeof i != "number") throw RangeError("Invalid input for Slice.fromJSON");
		return new e(B.fromJSON(t, n.content), r, i);
	}
	static maxOpen(t, n = !0) {
		let r = 0, i = 0;
		for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
		for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
		return new e(t, r, i);
	}
};
H.empty = new H(B.empty, 0, 0);
function pa(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(pa(a.content, t - i - 1, n - i - 1)));
}
function ma(e, t, n, r, i, a) {
	let { index: o, offset: s } = e.findIndex(t), c = e.maybeChild(o);
	if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let l = ma(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
	return l && e.replaceChild(o, c.copy(l));
}
function ha(e, t, n) {
	if (n.openStart > e.depth) throw new fa("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new fa("Inconsistent open depths");
	return ga(e, t, n, 0);
}
function ga(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = ga(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	}
	if (!n.content.size) return xa(a, Ca(e, t, r));
	if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return xa(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	}
	{
		let { start: i, end: o } = wa(n, e);
		return xa(a, Sa(e, i, o, t, r));
	}
}
function _a(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new fa("Cannot join " + t.type.name + " onto " + e.type.name);
}
function va(e, t, n) {
	let r = e.node(n);
	return _a(r, t.node(n)), r;
}
function ya(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function ba(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (ya(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) ya(i.child(e), r);
	t && t.depth == n && t.textOffset && ya(t.nodeBefore, r);
}
function xa(e, t) {
	if (!e.type.validContent(t)) throw new fa("Invalid content for node " + e.type.name);
	return e.copy(t);
}
function Sa(e, t, n, r, i) {
	let a = e.depth > i && va(e, t, i + 1), o = r.depth > i && va(n, r, i + 1), s = [];
	return ba(null, e, i, s), a && o && t.index(i) == n.index(i) ? (_a(a, o), ya(xa(a, Sa(e, t, n, r, i + 1)), s)) : (a && ya(xa(a, Ca(e, t, i + 1)), s), ba(t, n, i, s), o && ya(xa(o, Ca(n, r, i + 1)), s)), ba(r, null, i, s), new B(s);
}
function Ca(e, t, n) {
	let r = [];
	return ba(null, e, n, r), e.depth > n && ya(xa(va(e, t, n + 1), Ca(e, t, n + 1)), r), ba(t, null, n, r), new B(r);
}
function wa(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(B.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
var Ta = class e {
	constructor(e, t, n) {
		this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
	}
	resolveDepth(e) {
		return e == null ? this.depth : e < 0 ? this.depth + e : e;
	}
	get parent() {
		return this.node(this.depth);
	}
	get doc() {
		return this.node(0);
	}
	node(e) {
		return this.path[this.resolveDepth(e) * 3];
	}
	index(e) {
		return this.path[this.resolveDepth(e) * 3 + 1];
	}
	indexAfter(e) {
		return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
	}
	start(e) {
		return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
	}
	end(e) {
		return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
	}
	before(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position before the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
	}
	after(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position after the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
	}
	get textOffset() {
		return this.pos - this.path[this.path.length - 1];
	}
	get nodeAfter() {
		let e = this.parent, t = this.index(this.depth);
		if (t == e.childCount) return null;
		let n = this.pos - this.path[this.path.length - 1], r = e.child(t);
		return n ? e.child(t).cut(n) : r;
	}
	get nodeBefore() {
		let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
		return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
	}
	posAtIndex(e, t) {
		t = this.resolveDepth(t);
		let n = this.path[t * 3], r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
		for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
		return r;
	}
	marks() {
		let e = this.parent, t = this.index();
		if (e.content.size == 0) return V.none;
		if (this.textOffset) return e.child(t).marks;
		let n = e.maybeChild(t - 1), r = e.maybeChild(t);
		if (!n) {
			let e = n;
			n = r, r = e;
		}
		let i = n.marks;
		for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
		return i;
	}
	marksAcross(e) {
		let t = this.parent.maybeChild(this.index());
		if (!t || !t.isInline) return null;
		let n = t.marks, r = e.parent.maybeChild(e.index());
		for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
		return n;
	}
	sharedDepth(e) {
		for (let t = this.depth; t > 0; t--) if (this.start(t) <= e && this.end(t) >= e) return t;
		return 0;
	}
	blockRange(e = this, t) {
		if (e.pos < this.pos) return e.blockRange(this);
		for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new ka(this, e, n);
		return null;
	}
	sameParent(e) {
		return this.pos - this.parentOffset == e.pos - e.parentOffset;
	}
	max(e) {
		return e.pos > this.pos ? e : this;
	}
	min(e) {
		return e.pos < this.pos ? e : this;
	}
	toString() {
		let e = "";
		for (let t = 1; t <= this.depth; t++) e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
		return e + ":" + this.parentOffset;
	}
	static resolve(t, n) {
		if (!(n >= 0 && n <= t.content.size)) throw RangeError("Position " + n + " out of range");
		let r = [], i = 0, a = n;
		for (let e = t;;) {
			let { index: t, offset: n } = e.content.findIndex(a), o = a - n;
			if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
			a = o - 1, i += n + 1;
		}
		return new e(n, r, a);
	}
	static resolveCached(t, n) {
		let r = Oa.get(t);
		if (r) for (let e = 0; e < r.elts.length; e++) {
			let t = r.elts[e];
			if (t.pos == n) return t;
		}
		else Oa.set(t, r = new Ea());
		let i = r.elts[r.i] = e.resolve(t, n);
		return r.i = (r.i + 1) % Da, i;
	}
}, Ea = class {
	constructor() {
		this.elts = [], this.i = 0;
	}
}, Da = 12, Oa = /* @__PURE__ */ new WeakMap(), ka = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.depth = n;
	}
	get start() {
		return this.$from.before(this.depth + 1);
	}
	get end() {
		return this.$to.after(this.depth + 1);
	}
	get parent() {
		return this.$from.node(this.depth);
	}
	get startIndex() {
		return this.$from.index(this.depth);
	}
	get endIndex() {
		return this.$to.indexAfter(this.depth);
	}
}, Aa = Object.create(null), ja = class e {
	constructor(e, t, n, r = V.none) {
		this.type = e, this.attrs = t, this.marks = r, this.content = n || B.empty;
	}
	get children() {
		return this.content.content;
	}
	get nodeSize() {
		return this.isLeaf ? 1 : 2 + this.content.size;
	}
	get childCount() {
		return this.content.childCount;
	}
	child(e) {
		return this.content.child(e);
	}
	maybeChild(e) {
		return this.content.maybeChild(e);
	}
	forEach(e) {
		this.content.forEach(e);
	}
	nodesBetween(e, t, n, r = 0) {
		this.content.nodesBetween(e, t, n, r, this);
	}
	descendants(e) {
		this.nodesBetween(0, this.content.size, e);
	}
	get textContent() {
		return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
	}
	textBetween(e, t, n, r) {
		return this.content.textBetween(e, t, n, r);
	}
	get firstChild() {
		return this.content.firstChild;
	}
	get lastChild() {
		return this.content.lastChild;
	}
	eq(e) {
		return this == e || this.sameMarkup(e) && this.content.eq(e.content);
	}
	sameMarkup(e) {
		return this.hasMarkup(e.type, e.attrs, e.marks);
	}
	hasMarkup(e, t, n) {
		return this.type == e && da(this.attrs, t || e.defaultAttrs || Aa) && V.sameSet(this.marks, n || V.none);
	}
	copy(t = null) {
		return t == this.content ? this : new e(this.type, this.attrs, t, this.marks);
	}
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.content, t);
	}
	cut(e, t = this.content.size) {
		return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
	}
	slice(e, t = this.content.size, n = !1) {
		if (e == t) return H.empty;
		let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a);
		return new H(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a);
	}
	replace(e, t, n) {
		return ha(this.resolve(e), this.resolve(t), n);
	}
	nodeAt(e) {
		for (let t = this;;) {
			let { index: n, offset: r } = t.content.findIndex(e);
			if (t = t.maybeChild(n), !t) return null;
			if (r == e || t.isText) return t;
			e -= r + 1;
		}
	}
	childAfter(e) {
		let { index: t, offset: n } = this.content.findIndex(e);
		return {
			node: this.content.maybeChild(t),
			index: t,
			offset: n
		};
	}
	childBefore(e) {
		if (e == 0) return {
			node: null,
			index: 0,
			offset: 0
		};
		let { index: t, offset: n } = this.content.findIndex(e);
		if (n < e) return {
			node: this.content.child(t),
			index: t,
			offset: n
		};
		let r = this.content.child(t - 1);
		return {
			node: r,
			index: t - 1,
			offset: n - r.nodeSize
		};
	}
	resolve(e) {
		return Ta.resolveCached(this, e);
	}
	resolveNoCache(e) {
		return Ta.resolve(this, e);
	}
	rangeHasMark(e, t, n) {
		let r = !1;
		return t > e && this.nodesBetween(e, t, (e) => (n.isInSet(e.marks) && (r = !0), !r)), r;
	}
	get isBlock() {
		return this.type.isBlock;
	}
	get isTextblock() {
		return this.type.isTextblock;
	}
	get inlineContent() {
		return this.type.inlineContent;
	}
	get isInline() {
		return this.type.isInline;
	}
	get isText() {
		return this.type.isText;
	}
	get isLeaf() {
		return this.type.isLeaf;
	}
	get isAtom() {
		return this.type.isAtom;
	}
	toString() {
		if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
		let e = this.type.name;
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Na(this.marks, e);
	}
	contentMatchAt(e) {
		let t = this.type.contentMatch.matchFragment(this.content, 0, e);
		if (!t) throw Error("Called contentMatchAt on a node with invalid content");
		return t;
	}
	canReplace(e, t, n = B.empty, r = 0, i = n.childCount) {
		let a = this.contentMatchAt(e).matchFragment(n, r, i), o = a && a.matchFragment(this.content, t);
		if (!o || !o.validEnd) return !1;
		for (let e = r; e < i; e++) if (!this.type.allowsMarks(n.child(e).marks)) return !1;
		return !0;
	}
	canReplaceWith(e, t, n, r) {
		if (r && !this.type.allowsMarks(r)) return !1;
		let i = this.contentMatchAt(e).matchType(n), a = i && i.matchFragment(this.content, t);
		return a ? a.validEnd : !1;
	}
	canAppend(e) {
		return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
	}
	check() {
		this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
		let e = V.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			n.type.checkAttrs(n.attrs), e = n.addToSet(e);
		}
		if (!V.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
		this.content.forEach((e) => e.check());
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((e) => e.toJSON())), e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Node.fromJSON");
		let n;
		if (t.marks) {
			if (!Array.isArray(t.marks)) throw RangeError("Invalid mark data for Node.fromJSON");
			n = t.marks.map(e.markFromJSON);
		}
		if (t.type == "text") {
			if (typeof t.text != "string") throw RangeError("Invalid text node in JSON");
			return e.text(t.text, n);
		}
		let r = B.fromJSON(e, t.content), i = e.nodeType(t.type).create(t.attrs, r, n);
		return i.type.checkAttrs(i.attrs), i;
	}
};
ja.prototype.text = void 0;
var Ma = class e extends ja {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Na(this.marks, JSON.stringify(this.text));
	}
	get textContent() {
		return this.text;
	}
	textBetween(e, t) {
		return this.text.slice(e, t);
	}
	get nodeSize() {
		return this.text.length;
	}
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.text, t);
	}
	withText(t) {
		return t == this.text ? this : new e(this.type, this.attrs, t, this.marks);
	}
	cut(e = 0, t = this.text.length) {
		return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
	}
	eq(e) {
		return this.sameMarkup(e) && this.text == e.text;
	}
	toJSON() {
		let e = super.toJSON();
		return e.text = this.text, e;
	}
};
function Na(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
var Pa = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new Fa(t, n);
		if (r.next == null) return e.empty;
		let i = Ia(r);
		r.next && r.err("Unexpected trailing text");
		let a = Ka(Ua(i));
		return qa(a, r), a;
	}
	matchType(e) {
		for (let t = 0; t < this.next.length; t++) if (this.next[t].type == e) return this.next[t].next;
		return null;
	}
	matchFragment(e, t = 0, n = e.childCount) {
		let r = this;
		for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
		return r;
	}
	get inlineContent() {
		return this.next.length != 0 && this.next[0].type.isInline;
	}
	get defaultType() {
		for (let e = 0; e < this.next.length; e++) {
			let { type: t } = this.next[e];
			if (!(t.isText || t.hasRequiredAttrs())) return t;
		}
		return null;
	}
	compatible(e) {
		for (let t = 0; t < this.next.length; t++) for (let n = 0; n < e.next.length; n++) if (this.next[t].type == e.next[n].type) return !0;
		return !1;
	}
	fillBefore(e, t = !1, n = 0) {
		let r = [this];
		function i(a, o) {
			let s = a.matchFragment(e, n);
			if (s && (!t || s.validEnd)) return B.from(o.map((e) => e.createAndFill()));
			for (let e = 0; e < a.next.length; e++) {
				let { type: t, next: n } = a.next[e];
				if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
					r.push(n);
					let e = i(n, o.concat(t));
					if (e) return e;
				}
			}
			return null;
		}
		return i(this, []);
	}
	findWrapping(e) {
		for (let t = 0; t < this.wrapCache.length; t += 2) if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
		let t = this.computeWrapping(e);
		return this.wrapCache.push(e, t), t;
	}
	computeWrapping(e) {
		let t = Object.create(null), n = [{
			match: this,
			type: null,
			via: null
		}];
		for (; n.length;) {
			let r = n.shift(), i = r.match;
			if (i.matchType(e)) {
				let e = [];
				for (let t = r; t.type; t = t.via) e.push(t.type);
				return e.reverse();
			}
			for (let e = 0; e < i.next.length; e++) {
				let { type: a, next: o } = i.next[e];
				!a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
					match: a.contentMatch,
					type: a,
					via: r
				}), t[a.name] = !0);
			}
		}
		return null;
	}
	get edgeCount() {
		return this.next.length;
	}
	edge(e) {
		if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
		return this.next[e];
	}
	toString() {
		let e = [];
		function t(n) {
			e.push(n);
			for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next);
		}
		return t(this), e.map((t, n) => {
			let r = n + (t.validEnd ? "*" : " ") + " ";
			for (let n = 0; n < t.next.length; n++) r += (n ? ", " : "") + t.next[n].type.name + "->" + e.indexOf(t.next[n].next);
			return r;
		}).join("\n");
	}
};
Pa.empty = new Pa(!0);
var Fa = class {
	constructor(e, t) {
		this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
	}
	get next() {
		return this.tokens[this.pos];
	}
	eat(e) {
		return this.next == e && (this.pos++ || !0);
	}
	err(e) {
		throw SyntaxError(e + " (in content expression '" + this.string + "')");
	}
};
function Ia(e) {
	let t = [];
	do
		t.push(La(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function La(e) {
	let t = [];
	do
		t.push(Ra(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function Ra(e) {
	let t = Ha(e);
	for (;;) if (e.eat("+")) t = {
		type: "plus",
		expr: t
	};
	else if (e.eat("*")) t = {
		type: "star",
		expr: t
	};
	else if (e.eat("?")) t = {
		type: "opt",
		expr: t
	};
	else if (e.eat("{")) t = Ba(e, t);
	else break;
	return t;
}
function za(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function Ba(e, t) {
	let n = za(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : za(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Va(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Ha(e) {
	if (e.eat("(")) {
		let t = Ia(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	}
	if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Va(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function Ua(e) {
	let t = [[]];
	return i(a(e, 0), n()), t;
	function n() {
		return t.push([]) - 1;
	}
	function r(e, n, r) {
		let i = {
			term: r,
			to: n
		};
		return t[e].push(i), i;
	}
	function i(e, t) {
		e.forEach((e) => e.to = t);
	}
	function a(e, t) {
		if (e.type == "choice") return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
		if (e.type == "seq") for (let r = 0;; r++) {
			let o = a(e.exprs[r], t);
			if (r == e.exprs.length - 1) return o;
			i(o, t = n());
		}
		else if (e.type == "star") {
			let o = n();
			return r(t, o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "plus") {
			let o = n();
			return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "opt") return [r(t)].concat(a(e.expr, t));
		else if (e.type == "range") {
			let o = t;
			for (let t = 0; t < e.min; t++) {
				let t = n();
				i(a(e.expr, o), t), o = t;
			}
			if (e.max == -1) i(a(e.expr, o), o);
			else for (let t = e.min; t < e.max; t++) {
				let t = n();
				r(o, t), i(a(e.expr, o), t), o = t;
			}
			return [r(o)];
		} else if (e.type == "name") return [r(t, void 0, e.value)];
		else throw Error("Unknown expr type");
	}
}
function Wa(e, t) {
	return t - e;
}
function Ga(e, t) {
	let n = [];
	return r(t), n.sort(Wa);
	function r(t) {
		let i = e[t];
		if (i.length == 1 && !i[0].term) return r(i[0].to);
		n.push(t);
		for (let e = 0; e < i.length; e++) {
			let { term: t, to: a } = i[e];
			!t && n.indexOf(a) == -1 && r(a);
		}
	}
}
function Ka(e) {
	let t = Object.create(null);
	return n(Ga(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				Ga(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new Pa(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Wa);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function qa(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function Ja(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Ya(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = t && t[r];
		if (i === void 0) {
			let t = e[r];
			if (t.hasDefault) i = t.default;
			else throw RangeError("No value supplied for attribute " + r);
		}
		n[r] = i;
	}
	return n;
}
function Xa(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
function Za(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new eo(e, r, t[r]);
	return n;
}
var Qa = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Za(e, n.attrs), this.defaultAttrs = Ja(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == Pa.empty;
	}
	get isAtom() {
		return this.isLeaf || !!this.spec.atom;
	}
	isInGroup(e) {
		return this.groups.indexOf(e) > -1;
	}
	get whitespace() {
		return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
	}
	hasRequiredAttrs() {
		for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
		return !1;
	}
	compatibleContent(e) {
		return this == e || this.contentMatch.compatible(e.contentMatch);
	}
	computeAttrs(e) {
		return !e && this.defaultAttrs ? this.defaultAttrs : Ya(this.attrs, e);
	}
	create(e = null, t, n) {
		if (this.isText) throw Error("NodeType.create can't construct text nodes");
		return new ja(this, this.computeAttrs(e), B.from(t), V.setFrom(n));
	}
	createChecked(e = null, t, n) {
		return t = B.from(t), this.checkContent(t), new ja(this, this.computeAttrs(e), t, V.setFrom(n));
	}
	createAndFill(e = null, t, n) {
		if (e = this.computeAttrs(e), t = B.from(t), t.size) {
			let e = this.contentMatch.fillBefore(t);
			if (!e) return null;
			t = e.append(t);
		}
		let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(B.empty, !0);
		return i ? new ja(this, e, t.append(i), V.setFrom(n)) : null;
	}
	validContent(e) {
		let t = this.contentMatch.matchFragment(e);
		if (!t || !t.validEnd) return !1;
		for (let t = 0; t < e.childCount; t++) if (!this.allowsMarks(e.child(t).marks)) return !1;
		return !0;
	}
	checkContent(e) {
		if (!this.validContent(e)) throw RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
	}
	checkAttrs(e) {
		Xa(this.attrs, e, "node", this.name);
	}
	allowsMarkType(e) {
		return this.markSet == null || this.markSet.indexOf(e) > -1;
	}
	allowsMarks(e) {
		if (this.markSet == null) return !0;
		for (let t = 0; t < e.length; t++) if (!this.allowsMarkType(e[t].type)) return !1;
		return !0;
	}
	allowedMarks(e) {
		if (this.markSet == null) return e;
		let t;
		for (let n = 0; n < e.length; n++) this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t ||= e.slice(0, n);
		return t ? t.length ? t : V.none : e;
	}
	static compile(t, n) {
		let r = Object.create(null);
		t.forEach((t, i) => r[t] = new e(t, n, i));
		let i = n.spec.topNode || "doc";
		if (!r[i]) throw RangeError("Schema is missing its top node type ('" + i + "')");
		if (!r.text) throw RangeError("Every schema needs a 'text' type");
		for (let e in r.text.attrs) throw RangeError("The text node type should not have attributes");
		return r;
	}
};
function $a(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var eo = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? $a(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, to = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Za(e, r.attrs), this.excluded = null;
		let i = Ja(this.attrs);
		this.instance = i ? new V(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new V(this, Ya(this.attrs, e));
	}
	static compile(t, n) {
		let r = Object.create(null), i = 0;
		return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r;
	}
	removeFromSet(e) {
		for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
	}
	checkAttrs(e) {
		Xa(this.attrs, e, "mark", this.name);
	}
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, no = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = ia.from(e.nodes), t.marks = ia.from(e.marks || {}), this.nodes = Qa.compile(this.spec.nodes, this), this.marks = to.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = Pa.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? ro(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : ro(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => ja.fromJSON(this, e), this.markFromJSON = (e) => V.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof Qa)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new Ma(n, n.defaultAttrs, e, V.setFrom(t));
	}
	mark(e, t) {
		return typeof e == "string" && (e = this.marks[e]), e.create(t);
	}
	nodeType(e) {
		let t = this.nodes[e];
		if (!t) throw RangeError("Unknown node type: " + e);
		return t;
	}
};
function ro(e, t) {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e.marks[i], o = a;
		if (a) n.push(a);
		else for (let t in e.marks) {
			let r = e.marks[t];
			(i == "_" || r.spec.group && r.spec.group.split(" ").indexOf(i) > -1) && n.push(o = r);
		}
		if (!o) throw SyntaxError("Unknown mark type: '" + t[r] + "'");
	}
	return n;
}
function io(e) {
	return e.tag != null;
}
function ao(e) {
	return e.style != null;
}
var oo = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (io(e)) this.tags.push(e);
			else if (ao(e)) {
				let t = /[^=]*/.exec(e.style)[0];
				n.indexOf(t) < 0 && n.push(t), this.styles.push(e);
			}
		}), this.normalizeLists = !this.tags.some((t) => {
			if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
			let n = e.nodes[t.node];
			return n.contentMatch.matchType(n);
		});
	}
	parse(e, t = {}) {
		let n = new go(this, t, !1);
		return n.addAll(e, V.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new go(this, t, !0);
		return n.addAll(e, V.none, t.from, t.to), H.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (vo(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
				if (n.getAttrs) {
					let t = n.getAttrs(e);
					if (t === !1) continue;
					n.attrs = t || void 0;
				}
				return n;
			}
		}
	}
	matchStyle(e, t, n, r) {
		for (let i = r ? this.styles.indexOf(r) + 1 : 0; i < this.styles.length; i++) {
			let r = this.styles[i], a = r.style;
			if (!(a.indexOf(e) != 0 || r.context && !n.matchesContext(r.context) || a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
				if (r.getAttrs) {
					let e = r.getAttrs(t);
					if (e === !1) continue;
					r.attrs = e || void 0;
				}
				return r;
			}
		}
	}
	static schemaRules(e) {
		let t = [];
		function n(e) {
			let n = e.priority == null ? 50 : e.priority, r = 0;
			for (; r < t.length; r++) {
				let e = t[r];
				if ((e.priority == null ? 50 : e.priority) < n) break;
			}
			t.splice(r, 0, e);
		}
		for (let t in e.marks) {
			let r = e.marks[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = yo(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = yo(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, so = {
	address: !0,
	article: !0,
	aside: !0,
	blockquote: !0,
	body: !0,
	canvas: !0,
	dd: !0,
	div: !0,
	dl: !0,
	fieldset: !0,
	figcaption: !0,
	figure: !0,
	footer: !0,
	form: !0,
	h1: !0,
	h2: !0,
	h3: !0,
	h4: !0,
	h5: !0,
	h6: !0,
	header: !0,
	hgroup: !0,
	hr: !0,
	li: !0,
	noscript: !0,
	ol: !0,
	output: !0,
	p: !0,
	pre: !0,
	section: !0,
	table: !0,
	tfoot: !0,
	ul: !0
}, co = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, lo = {
	ol: !0,
	ul: !0
}, uo = 1, fo = 2, po = 4;
function mo(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? uo : 0) | (t === "full" ? fo : 0);
}
var ho = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = V.none, this.match = i || (a & po ? null : e.contentMatch);
	}
	findWrapping(e) {
		if (!this.match) {
			if (!this.type) return [];
			let t = this.type.contentMatch.fillBefore(B.from(e));
			if (t) this.match = this.type.contentMatch.matchFragment(t);
			else {
				let t = this.type.contentMatch, n;
				return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
			}
		}
		return this.match.findWrapping(e.type);
	}
	finish(e) {
		if (!(this.options & uo)) {
			let e = this.content[this.content.length - 1], t;
			if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
				let n = e;
				e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
			}
		}
		let t = B.from(this.content);
		return !e && this.match && (t = t.append(this.match.fillBefore(B.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
	}
	inlineContext(e) {
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !so.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, go = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = mo(null, t.preserveWhitespace, 0) | (n ? po : 0);
		i = r ? new ho(r.type, r.attrs, V.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new ho(null, null, V.none, !0, null, a) : new ho(e.schema.topNodeType, null, V.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & fo ? "full" : this.localPreserveWS || (r.options & uo) > 0, { schema: a } = this.parser;
		if (i === "full" || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
			if (!i) {
				if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
					let t = r.content[r.content.length - 1], i = e.previousSibling;
					(!t || i && i.nodeName == "BR" || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (n = n.slice(1));
				}
			} else if (i === "full") n = n.replace(/\r\n?/g, "\n");
			else if (a.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(a.linebreakReplacement.create())) {
				let e = n.split(/\r?\n|\r/);
				for (let n = 0; n < e.length; n++) n && this.insertNode(a.linebreakReplacement.create(), t, !0), e[n] && this.insertNode(a.text(e[n]), t, !/\S/.test(e[n]));
				n = "";
			} else n = n.replace(/\r?\n|\r/g, " ");
			n && this.insertNode(a.text(n), t, !/\S/.test(n)), this.findInText(e);
		} else this.findInside(e);
	}
	addElement(e, t, n) {
		let r = this.localPreserveWS, i = this.top;
		(e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
		let a = e.nodeName.toLowerCase(), o;
		lo.hasOwnProperty(a) && this.parser.normalizeLists && _o(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : co.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if (so.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
			else if (!e.firstChild) {
				this.leafFallback(e, t);
				break out;
			}
			let o = s && s.skip ? t : this.readStyles(e, t);
			o && this.addAll(e, o), n && this.sync(i), this.needsBlock = r;
		} else {
			let n = this.readStyles(e, t);
			n && this.addElementByRule(e, s, n, s.consuming === !1 ? o : void 0);
		}
		this.localPreserveWS = r;
	}
	leafFallback(e, t) {
		e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
	}
	ignoreFallback(e, t) {
		e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
	}
	readStyles(e, t) {
		let n = e.style;
		if (n && n.length) for (let e = 0; e < this.parser.matchedStyles.length; e++) {
			let r = this.parser.matchedStyles[e], i = n.getPropertyValue(r);
			if (i) for (let e;;) {
				let n = this.parser.matchStyle(r, i, this, e);
				if (!n) break;
				if (n.ignore) return null;
				if (t = n.clearMark ? t.filter((e) => !n.clearMark(e)) : t.concat(this.parser.schema.marks[n.mark].create(n.attrs)), n.consuming === !1) e = n;
				else break;
			}
		}
		return t;
	}
	addElementByRule(e, t, n, r) {
		let i, a;
		if (t.node) if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
		else {
			let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
			e && (i = !0, n = e);
		}
		else {
			let e = this.parser.schema.marks[t.mark];
			n = n.concat(e.create(t.attrs));
		}
		let o = this.top;
		if (a && a.isLeaf) this.findInside(e);
		else if (r) this.addElement(e, n, r);
		else if (t.getContent) this.findInside(e), t.getContent(e, this.parser.schema).forEach((e) => this.insertNode(e, n, !1));
		else {
			let r = e;
			typeof t.contentElement == "string" ? r = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? r = t.contentElement(e) : t.contentElement && (r = t.contentElement), this.findAround(e, r, !0), this.addAll(r, n), this.findAround(e, r, !1);
		}
		i && this.sync(o) && this.open--;
	}
	addAll(e, t, n, r) {
		let i = n || 0;
		for (let a = n ? e.childNodes[n] : e.firstChild, o = r == null ? null : e.childNodes[r]; a != o; a = a.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(a, t);
		this.findAtPoint(e, i);
	}
	findPlace(e, t, n) {
		let r, i;
		for (let t = this.open, a = 0; t >= 0; t--) {
			let o = this.nodes[t], s = o.findWrapping(e);
			if (s && (!r || r.length > s.length + a) && (r = s, i = o, !s.length)) break;
			if (o.solid) {
				if (n) break;
				a += 2;
			}
		}
		if (!r) return null;
		this.sync(i);
		for (let e = 0; e < r.length; e++) t = this.enterInner(r[e], null, t, !1);
		return t;
	}
	insertNode(e, t, n) {
		if (e.isInline && this.needsBlock && !this.top.type) {
			let e = this.textblockFromContext();
			e && (t = this.enterInner(e, null, t));
		}
		let r = this.findPlace(e, t, n);
		if (r) {
			this.closeExtra();
			let t = this.top;
			t.match &&= t.match.matchType(e.type);
			let n = V.none;
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : bo(i.type, e.type)) && (n = i.addToSet(n));
			return t.content.push(e.mark(n)), !0;
		}
		return !1;
	}
	enter(e, t, n, r) {
		let i = this.findPlace(e.create(t), n, !1);
		return i &&= this.enterInner(e, t, n, !0, r), i;
	}
	enterInner(e, t, n, r = !1, i) {
		this.closeExtra();
		let a = this.top;
		a.match = a.match && a.match.matchType(e);
		let o = mo(e, i, a.options);
		a.options & po && a.content.length == 0 && (o |= po);
		let s = V.none;
		return n = n.filter((t) => !(a.type ? a.type.allowsMarkType(t.type) : bo(t.type, e)) || (s = t.addToSet(s), !1)), this.nodes.push(new ho(e, t, s, r, null, o)), this.open++, n;
	}
	closeExtra(e = !1) {
		let t = this.nodes.length - 1;
		if (t > this.open) {
			for (; t > this.open; t--) this.nodes[t - 1].content.push(this.nodes[t].finish(e));
			this.nodes.length = this.open + 1;
		}
	}
	finish() {
		return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
	}
	sync(e) {
		for (let t = this.open; t >= 0; t--) if (this.nodes[t] == e) return this.open = t, !0;
		else this.localPreserveWS && (this.nodes[t].options |= uo);
		return !1;
	}
	get currentPos() {
		this.closeExtra();
		let e = 0;
		for (let t = this.open; t >= 0; t--) {
			let n = this.nodes[t].content;
			for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
			t && e++;
		}
		return e;
	}
	findAtPoint(e, t) {
		if (this.find) for (let n = 0; n < this.find.length; n++) this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
	}
	findInside(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
	}
	findAround(e, t, n) {
		if (e != t && this.find) for (let r = 0; r < this.find.length; r++) this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) && (this.find[r].pos = this.currentPos);
	}
	findInText(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
	}
	matchesContext(e) {
		if (e.indexOf("|") > -1) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
		let t = e.split("/"), n = this.options.context, r = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), i = -(n ? n.depth + 1 : 0) + +!r, a = (e, o) => {
			for (; e >= 0; e--) {
				let s = t[e];
				if (s == "") {
					if (e == t.length - 1 || e == 0) continue;
					for (; o >= i; o--) if (a(e - 1, o)) return !0;
					return !1;
				}
				{
					let e = o > 0 || o == 0 && r ? this.nodes[o].type : n && o >= i ? n.node(o - i).type : null;
					if (!e || e.name != s && !e.isInGroup(s)) return !1;
					o--;
				}
			}
			return !0;
		};
		return a(t.length - 1, this.open);
	}
	textblockFromContext() {
		let e = this.options.context;
		if (e) for (let t = e.depth; t >= 0; t--) {
			let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
			if (n && n.isTextblock && n.defaultAttrs) return n;
		}
		for (let e in this.parser.schema.nodes) {
			let t = this.parser.schema.nodes[e];
			if (t.isTextblock && t.defaultAttrs) return t;
		}
	}
};
function _o(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && lo.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function vo(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function yo(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function bo(e, t) {
	let n = t.schema.nodes;
	for (let r in n) {
		let i = n[r];
		if (!i.allowsMarkType(e)) continue;
		let a = [], o = (e) => {
			a.push(e);
			for (let n = 0; n < e.edgeCount; n++) {
				let { type: r, next: i } = e.edge(n);
				if (r == t || a.indexOf(i) < 0 && o(i)) return !0;
			}
		};
		if (o(i.contentMatch)) return !0;
	}
}
var xo = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= Co(t).createDocumentFragment();
		let r = n, i = [];
		return e.forEach((e) => {
			if (i.length || e.marks.length) {
				let n = 0, a = 0;
				for (; n < i.length && a < e.marks.length;) {
					let t = e.marks[a];
					if (!this.marks[t.type.name]) {
						a++;
						continue;
					}
					if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
					n++, a++;
				}
				for (; n < i.length;) r = i.pop()[1];
				for (; a < e.marks.length;) {
					let n = e.marks[a++], o = this.serializeMark(n, e.isInline, t);
					o && (i.push([n, r]), r.appendChild(o.dom), r = o.contentDOM || o.dom);
				}
			}
			r.appendChild(this.serializeNodeInner(e, t));
		}), n;
	}
	serializeNodeInner(e, t) {
		if (e.isText) return Co(t).createTextNode(e.text);
		let { dom: n, contentDOM: r } = Do(Co(t), this.nodes[e.type.name](e), null, e.attrs);
		if (r) {
			if (e.isLeaf) throw RangeError("Content hole not allowed in a leaf node spec");
			this.serializeFragment(e.content, t, r);
		}
		return n;
	}
	serializeNode(e, t = {}) {
		let n = this.serializeNodeInner(e, t);
		for (let r = e.marks.length - 1; r >= 0; r--) {
			let i = this.serializeMark(e.marks[r], e.isInline, t);
			i && ((i.contentDOM || i.dom).appendChild(n), n = i.dom);
		}
		return n;
	}
	serializeMark(e, t, n = {}) {
		let r = this.marks[e.type.name];
		return r && Do(Co(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return typeof t == "string" ? { dom: e.createTextNode(t) } : Do(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = So(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return So(e.marks);
	}
};
function So(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function Co(e) {
	return e.document || window.document;
}
var wo = /* @__PURE__ */ new WeakMap();
function To(e) {
	let t = wo.get(e);
	return t === void 0 && wo.set(e, t = Eo(e)), t;
}
function Eo(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") if (Array.isArray(e)) if (typeof e[0] == "string") t ||= [], t.push(e);
		else for (let t = 0; t < e.length; t++) n(e[t]);
		else for (let t in e) n(e[t]);
	}
	return n(e), t;
}
function Do(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = To(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
	let o = i.indexOf(" ");
	o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
	let s, c = n ? e.createElementNS(n, i) : e.createElement(i), l = t[1], u = 1;
	if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
		u = 2;
		for (let e in l) if (l[e] != null) {
			let t = e.indexOf(" ");
			t > 0 ? c.setAttributeNS(e.slice(0, t), e.slice(t + 1), l[e]) : e == "style" && c.style ? c.style.cssText = l[e] : c.setAttribute(e, l[e]);
		}
	}
	for (let i = u; i < t.length; i++) {
		let a = t[i];
		if (a === 0) {
			if (i < t.length - 1 || i > u) throw RangeError("Content hole must be the only child of its parent node");
			return {
				dom: c,
				contentDOM: c
			};
		}
		if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = Do(e, a, n, r);
			if (c.appendChild(t), i) {
				if (s) throw RangeError("Multiple content holes");
				s = i;
			}
		}
	}
	return {
		dom: c,
		contentDOM: s
	};
}
//#endregion
//#region node_modules/prosemirror-transform/dist/index.js
var Oo = 65535, ko = 2 ** 16;
function Ao(e, t) {
	return e + t * ko;
}
function jo(e) {
	return e & Oo;
}
function Mo(e) {
	return (e - (e & Oo)) / ko;
}
var No = 1, Po = 2, Fo = 4, Io = 8, Lo = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & Io) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & 5) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & 6) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & Fo) > 0;
	}
}, Ro = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = jo(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + Mo(e);
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	map(e, t = 1) {
		return this._map(e, t, !0);
	}
	_map(e, t, n) {
		let r = 0, i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let o = 0; o < this.ranges.length; o += 3) {
			let s = this.ranges[o] - (this.inverted ? r : 0);
			if (s > e) break;
			let c = this.ranges[o + i], l = this.ranges[o + a], u = s + c;
			if (e <= u) {
				let i = c ? e == s ? -1 : e == u ? 1 : t : t, a = s + r + (i < 0 ? 0 : l);
				if (n) return a;
				let d = e == (t < 0 ? s : u) ? null : Ao(o / 3, e - s), f = e == s ? Po : e == u ? No : Fo;
				return (t < 0 ? e != s : e != u) && (f |= Io), new Lo(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new Lo(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = jo(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let t = 0; t < this.ranges.length; t += 3) {
			let o = this.ranges[t] - (this.inverted ? n : 0);
			if (o > e) break;
			let s = this.ranges[t + i];
			if (e <= o + s && t == r * 3) return !0;
			n += this.ranges[t + a] - s;
		}
		return !1;
	}
	forEach(e) {
		let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
		for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
			let a = this.ranges[r], o = a - (this.inverted ? i : 0), s = a + (this.inverted ? 0 : i), c = this.ranges[r + t], l = this.ranges[r + n];
			e(o, o + c, s, s + l), i += l - c;
		}
	}
	invert() {
		return new e(this.ranges, !this.inverted);
	}
	toString() {
		return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
	}
	static offset(t) {
		return t == 0 ? e.empty : new e(t < 0 ? [
			0,
			-t,
			0
		] : [
			0,
			0,
			t
		]);
	}
};
Ro.empty = new Ro([]);
var zo = class e {
	constructor(e, t, n = 0, r = e ? e.length : 0) {
		this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t);
	}
	get maps() {
		return this._maps;
	}
	slice(t = 0, n = this.maps.length) {
		return new e(this._maps, this.mirror, t, n);
	}
	appendMap(e, t) {
		this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
	}
	appendMapping(e) {
		for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0);
		}
	}
	getMirror(e) {
		if (this.mirror) {
			for (let t = 0; t < this.mirror.length; t++) if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
		}
	}
	setMirror(e, t) {
		this.mirror ||= [], this.mirror.push(e, t);
	}
	appendMappingInverted(e) {
		for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0);
		}
	}
	invert() {
		let t = new e();
		return t.appendMappingInverted(this), t;
	}
	map(e, t = 1) {
		if (this.mirror) return this._map(e, t, !0);
		for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
		return e;
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	_map(e, t, n) {
		let r = 0;
		for (let n = this.from; n < this.to; n++) {
			let i = this._maps[n].mapResult(e, t);
			if (i.recover != null) {
				let t = this.getMirror(n);
				if (t != null && t > n && t < this.to) {
					n = t, e = this._maps[t].recover(i.recover);
					continue;
				}
			}
			r |= i.delInfo, e = i.pos;
		}
		return n ? e : new Lo(e, r, null);
	}
}, Bo = Object.create(null), Vo = class {
	getMap() {
		return Ro.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = Bo[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Bo) throw RangeError("Duplicate use of step JSON ID " + e);
		return Bo[e] = t, t.prototype.jsonID = e, t;
	}
}, Ho = class e {
	constructor(e, t) {
		this.doc = e, this.failed = t;
	}
	static ok(t) {
		return new e(t, null);
	}
	static fail(t) {
		return new e(null, t);
	}
	static fromReplace(t, n, r, i) {
		try {
			return e.ok(t.replace(n, r, i));
		} catch (t) {
			if (t instanceof fa) return e.fail(t.message);
			throw t;
		}
	}
};
function Uo(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Uo(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return B.fromArray(r);
}
var Wo = class e extends Vo {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new H(Uo(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return Ho.fromReplace(e, this.from, this.to, i);
	}
	invert() {
		return new Go(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "addMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for AddMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
Vo.jsonID("addMark", Wo);
var Go = class e extends Vo {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new H(Uo(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return Ho.fromReplace(e, this.from, this.to, n);
	}
	invert() {
		return new Wo(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "removeMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for RemoveMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
Vo.jsonID("removeMark", Go);
var Ko = class e extends Vo {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ho.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
		return Ho.fromReplace(e, this.pos, this.pos + 1, new H(B.from(n), 0, +!t.isLeaf));
	}
	invert(t) {
		let n = t.nodeAt(this.pos);
		if (n) {
			let t = this.mark.addToSet(n.marks);
			if (t.length == n.marks.length) {
				for (let r = 0; r < n.marks.length; r++) if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
				return new e(this.pos, this.mark);
			}
		}
		return new qo(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "addNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for AddNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
Vo.jsonID("addNodeMark", Ko);
var qo = class e extends Vo {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ho.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
		return Ho.fromReplace(e, this.pos, this.pos + 1, new H(B.from(n), 0, +!t.isLeaf));
	}
	invert(e) {
		let t = e.nodeAt(this.pos);
		return !t || !this.mark.isInSet(t.marks) ? this : new Ko(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "removeNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
Vo.jsonID("removeNodeMark", qo);
var Jo = class e extends Vo {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && Xo(e, this.from, this.to) ? Ho.fail("Structure replace would overwrite content") : Ho.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new Ro([
			this.from,
			this.to - this.from,
			this.slice.size
		]);
	}
	invert(t) {
		return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to));
	}
	map(t) {
		let n = t.mapResult(this.to, -1), r = this.from == this.to && e.MAP_BIAS < 0 ? n : t.mapResult(this.from, 1);
		return r.deletedAcross && n.deletedAcross ? null : new e(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
	}
	merge(t) {
		if (!(t instanceof e) || t.structure || this.structure) return null;
		if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
			let n = this.slice.size + t.slice.size == 0 ? H.empty : new H(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
			return new e(this.from, this.to + (t.to - t.from), n, this.structure);
		}
		if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? H.empty : new H(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
			return new e(t.from, this.to, n, this.structure);
		}
		return null;
	}
	toJSON() {
		let e = {
			stepType: "replace",
			from: this.from,
			to: this.to
		};
		return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for ReplaceStep.fromJSON");
		return new e(n.from, n.to, H.fromJSON(t, n.slice), !!n.structure);
	}
};
Jo.MAP_BIAS = 1, Vo.jsonID("replace", Jo);
var Yo = class e extends Vo {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (Xo(e, this.from, this.gapFrom) || Xo(e, this.gapTo, this.to))) return Ho.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return Ho.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? Ho.fromReplace(e, this.from, this.to, n) : Ho.fail("Content does not fit in gap");
	}
	getMap() {
		return new Ro([
			this.from,
			this.gapFrom - this.from,
			this.insert,
			this.gapTo,
			this.to - this.gapTo,
			this.slice.size - this.insert
		]);
	}
	invert(t) {
		let n = this.gapTo - this.gapFrom;
		return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1), a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
		return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
	}
	toJSON() {
		let e = {
			stepType: "replaceAround",
			from: this.from,
			to: this.to,
			gapFrom: this.gapFrom,
			gapTo: this.gapTo,
			insert: this.insert
		};
		return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number") throw RangeError("Invalid input for ReplaceAroundStep.fromJSON");
		return new e(n.from, n.to, n.gapFrom, n.gapTo, H.fromJSON(t, n.slice), n.insert, !!n.structure);
	}
};
Vo.jsonID("replaceAround", Yo);
function Xo(e, t, n) {
	let r = e.resolve(t), i = n - t, a = r.depth;
	for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
	if (i > 0) {
		let e = r.node(a).maybeChild(r.indexAfter(a));
		for (; i > 0;) {
			if (!e || e.isLeaf) return !0;
			e = e.firstChild, i--;
		}
	}
	return !1;
}
function Zo(e, t, n, r) {
	let i = [], a = [], o, s;
	e.doc.nodesBetween(t, n, (e, c, l) => {
		if (!e.isInline) return;
		let u = e.marks;
		if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
			let l = Math.max(c, t), d = Math.min(c + e.nodeSize, n), f = r.addToSet(u);
			for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new Go(l, d, u[e])));
			s && s.to == l ? s.to = d : a.push(s = new Wo(l, d, r));
		}
	}), i.forEach((t) => e.step(t)), a.forEach((t) => e.step(t));
}
function Qo(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline) return;
		a++;
		let s = null;
		if (r instanceof to) {
			let t = e.marks, n;
			for (; n = r.isInSet(t);) (s ||= []).push(n), t = n.removeFromSet(t);
		} else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
		if (s && s.length) {
			let r = Math.min(o + e.nodeSize, n);
			for (let e = 0; e < s.length; e++) {
				let n = s[e], c;
				for (let e = 0; e < i.length; e++) {
					let t = i[e];
					t.step == a - 1 && n.eq(i[e].style) && (c = t);
				}
				c ? (c.to = r, c.step = a) : i.push({
					style: n,
					from: Math.max(o, t),
					to: r,
					step: a
				});
			}
		}
	}), i.forEach((t) => e.step(new Go(t.from, t.to, t.style)));
}
function $o(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Jo(s, l, H.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new Go(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new H(B.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Jo(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(B.empty, !0);
		e.replace(s, s, new H(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function es(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function ts(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !es(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function ns(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = B.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = B.from(r.node(e).copy(u)), d++) : c--;
	let f = B.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = B.from(i.node(e).copy(f)), p++) : l++;
	e.step(new Yo(c, l, o, s, new H(u.append(f), d, p), u.size - d, !0));
}
function rs(e, t, n = null, r = e) {
	let i = as(e, t), a = i && ss(r, t);
	return a ? i.map(is).concat({
		type: t,
		attrs: n
	}).concat(a.map(is)) : null;
}
function is(e) {
	return {
		type: e,
		attrs: null
	};
}
function as(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function ss(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function cs(e, t, n) {
	let r = B.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = B.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new Yo(i, a, i, a, new H(r, 0, 0), n.length, !0));
}
function ls(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && fs(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && ds(e, t, n, a), $o(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new Yo(c, l, c + 1, l - 1, new H(B.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && us(e, t, n, a), !1;
		}
	});
}
function us(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.isText) {
			let o, s = /\r?\n|\r/g;
			for (; o = s.exec(i.text);) {
				let i = e.mapping.slice(r).map(n + 1 + a + o.index);
				e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create());
			}
		}
	});
}
function ds(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function fs(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function ps(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new Yo(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new H(B.from(o), 0, 0), 1, !0));
}
function ms(e, t, n = 1, r) {
	let i = e.resolve(t), a = i.depth - n, o = r && r[r.length - 1] || i.parent;
	if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
	for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
		let n = i.node(e), a = i.index(e);
		if (n.type.spec.isolating) return !1;
		let o = n.content.cutByIndex(a, n.childCount), s = r && r[t + 1];
		s && (o = o.replaceChild(0, s.type.create(s.attrs)));
		let c = r && r[t] || n;
		if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1;
	}
	let s = i.indexAfter(a), c = r && r[0];
	return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type);
}
function hs(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = B.empty, o = B.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = B.from(i.node(e).copy(a));
		let t = r && r[s];
		o = B.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Jo(t, t, new H(a.append(o), n, n), !0));
}
function gs(e, t) {
	let n = e.resolve(t), r = n.index();
	return vs(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function _s(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function vs(e, t) {
	return !!(e && t && !e.isLeaf && _s(e, t));
}
function ys(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && vs(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function bs(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		ds(e, r.node(), r.before(), s);
	}
	o.inlineContent && $o(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Jo(l, c.map(t + n, -1), H.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		us(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function xs(e, t, n) {
	let r = e.resolve(t);
	if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
	if (r.parentOffset == 0) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.index(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
		if (t > 0) return null;
	}
	if (r.parentOffset == r.parent.content.size) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.indexAfter(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
		if (t < r.node(e).childCount) return null;
	}
	return null;
}
function Ss(e, t, n) {
	let r = e.resolve(t);
	if (!n.content.size) return t;
	let i = n.content;
	for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
	for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++) for (let t = r.depth; t >= 0; t--) {
		let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1, a = r.index(t) + +(n > 0), o = r.node(t), s = !1;
		if (e == 1) s = o.canReplace(a, a, i);
		else {
			let e = o.contentMatchAt(a).findWrapping(i.firstChild.type);
			s = e && o.canReplaceWith(a, a, e[0]);
		}
		if (s) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1);
	}
	return null;
}
function Cs(e, t, n = t, r = H.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return ws(i, a, r) ? new Jo(t, n, r) : new Ts(i, a, r).fit();
}
function ws(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var Ts = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = B.empty;
		for (let t = 0; t <= e.depth; t++) {
			let n = e.node(t);
			this.frontier.push({
				type: n.type,
				match: n.contentMatchAt(e.indexAfter(t))
			});
		}
		for (let t = e.depth; t > 0; t--) this.placed = B.from(e.node(t).copy(this.placed));
	}
	get depth() {
		return this.frontier.length - 1;
	}
	fit() {
		for (; this.unplaced.size;) {
			let e = this.findFittable();
			e ? this.placeNodes(e) : this.openMore() || this.dropNode();
		}
		let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
		if (!r) return null;
		let i = this.placed, a = n.depth, o = r.depth;
		for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
		let s = new H(i, a, o);
		return e > -1 ? new Yo(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Jo(n.pos, r.pos, s) : null;
	}
	findFittable() {
		let e = this.unplaced.openStart;
		for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
			let i = t.firstChild;
			if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
				e = n;
				break;
			}
			t = i.content;
		}
		for (let t = 1; t <= 2; t++) for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
			let e, r = null;
			n ? (r = Os(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
			let i = e.firstChild;
			for (let e = this.depth; e >= 0; e--) {
				let { type: a, match: o } = this.frontier[e], s, c = null;
				if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(B.from(i), !1)) : r && a.compatibleContent(r.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					inject: c
				};
				if (t == 2 && i && (s = o.findWrapping(i.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					wrap: s
				};
				if (r && o.matchType(r.type)) break;
			}
		}
	}
	openMore() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = Os(e, t);
		return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new H(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = Os(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new H(Es(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new H(Es(e, t, 1), t, n);
	}
	placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: r, wrap: i }) {
		for (; this.depth > t;) this.closeFrontierNode();
		if (i) for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
		let a = this.unplaced, o = n ? n.content : a.content, s = a.openStart - e, c = 0, l = [], { match: u, type: d } = this.frontier[t];
		if (r) {
			for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
			u = u.matchFragment(r);
		}
		let f = o.size + e - (a.content.size - a.openEnd);
		for (; c < o.childCount;) {
			let e = o.child(c), t = u.matchType(e.type);
			if (!t) break;
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(ks(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = Ds(this.placed, t, B.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = o; e < f; e++) {
			let e = t.lastChild;
			this.frontier.push({
				type: e.type,
				match: e.contentMatchAt(e.childCount)
			}), t = e.content;
		}
		this.unplaced = p ? e == 0 ? H.empty : new H(Es(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new H(Es(a.content, e, c), a.openStart, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !As(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = As(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = As(e, n, r, t, !0);
					if (!i || i.childCount) continue scan;
				}
				return {
					depth: t,
					fit: a,
					move: i ? e.doc.resolve(e.after(t + 1)) : e
				};
			}
		}
	}
	close(e) {
		let t = this.findCloseLevel(e);
		if (!t) return null;
		for (; this.depth > t.depth;) this.closeFrontierNode();
		t.fit.childCount && (this.placed = Ds(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = Ds(this.placed, this.depth, B.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(B.empty, !0);
		e.childCount && (this.placed = Ds(this.placed, this.frontier.length, e));
	}
};
function Es(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(Es(e.firstChild.content, t - 1, n)));
}
function Ds(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(Ds(e.lastChild.content, t - 1, n)));
}
function Os(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function ks(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, ks(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(B.empty, !0)))), e.copy(r);
}
function As(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !js(n, a.content, o) ? s : null;
}
function js(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function Ms(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function Ns(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (ws(i, a, r)) return e.step(new Jo(t, n, r));
	let o = Ls(i, a);
	o[o.length - 1] == 0 && o.pop();
	let s = -(i.depth + 1);
	o.unshift(s);
	for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
		let n = i.node(e).type.spec;
		if (n.defining || n.definingAsContext || n.isolating) break;
		o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e);
	}
	let c = o.indexOf(s), l = [], u = r.openStart;
	for (let e = r.content, t = 0;; t++) {
		let n = e.firstChild;
		if (l.push(n), t == r.openStart) break;
		e = n.content;
	}
	for (let e = u - 1; e >= 0; e--) {
		let t = l[e], n = Ms(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new H(Ps(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function Ps(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(Ps(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(B.empty, !0));
	}
	return e;
}
function Fs(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = xs(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new H(B.from(r), 0, 0));
}
function Is(e, t, n) {
	let r = e.doc.resolve(t), i = e.doc.resolve(n);
	if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
		let a = r.sharedDepth(n), o = !1;
		for (let e = r.depth; e > a; e--) r.node(e).type.spec.isolating && (o = !0);
		for (let e = i.depth; e > a; e--) i.node(e).type.spec.isolating && (o = !0);
		if (!o) {
			for (let e = r.depth; e > 0 && t == r.start(e); e--) t = r.before(e);
			for (let e = i.depth; e > 0 && n == i.start(e); e--) n = i.before(e);
			r = e.doc.resolve(t), i = e.doc.resolve(n);
		}
	}
	let a = Ls(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function Ls(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var Rs = class e extends Vo {
	constructor(e, t, n) {
		super(), this.pos = e, this.attr = t, this.value = n;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ho.fail("No node at attribute step's position");
		let n = Object.create(null);
		for (let e in t.attrs) n[e] = t.attrs[e];
		n[this.attr] = this.value;
		let r = t.type.create(n, null, t.marks);
		return Ho.fromReplace(e, this.pos, this.pos + 1, new H(B.from(r), 0, +!t.isLeaf));
	}
	getMap() {
		return Ro.empty;
	}
	invert(t) {
		return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.attr, this.value);
	}
	toJSON() {
		return {
			stepType: "attr",
			pos: this.pos,
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number" || typeof n.attr != "string") throw RangeError("Invalid input for AttrStep.fromJSON");
		return new e(n.pos, n.attr, n.value);
	}
};
Vo.jsonID("attr", Rs);
var zs = class e extends Vo {
	constructor(e, t) {
		super(), this.attr = e, this.value = t;
	}
	apply(e) {
		let t = Object.create(null);
		for (let n in e.attrs) t[n] = e.attrs[n];
		t[this.attr] = this.value;
		let n = e.type.create(t, e.content, e.marks);
		return Ho.ok(n);
	}
	getMap() {
		return Ro.empty;
	}
	invert(t) {
		return new e(this.attr, t.attrs[this.attr]);
	}
	map(e) {
		return this;
	}
	toJSON() {
		return {
			stepType: "docAttr",
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.attr != "string") throw RangeError("Invalid input for DocAttrStep.fromJSON");
		return new e(n.attr, n.value);
	}
};
Vo.jsonID("docAttr", zs);
var Bs = class extends Error {};
Bs = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, Bs.prototype = Object.create(Error.prototype), Bs.prototype.constructor = Bs, Bs.prototype.name = "TransformError";
var Vs = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new zo();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new Bs(t.failed);
		return this;
	}
	maybeStep(e) {
		let t = e.apply(this.doc);
		return t.failed || this.addStep(e, t.doc), t;
	}
	get docChanged() {
		return this.steps.length > 0;
	}
	changedRange() {
		let e = 1e9, t = -1e9;
		for (let n = 0; n < this.mapping.maps.length; n++) {
			let r = this.mapping.maps[n];
			n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
				e = Math.min(e, i), t = Math.max(t, a);
			});
		}
		return e == 1e9 ? null : {
			from: e,
			to: t
		};
	}
	addStep(e, t) {
		this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
	}
	replace(e, t = e, n = H.empty) {
		let r = Cs(this.doc, e, t, n);
		return r && this.step(r), this;
	}
	replaceWith(e, t, n) {
		return this.replace(e, t, new H(B.from(n), 0, 0));
	}
	delete(e, t) {
		return this.replace(e, t, H.empty);
	}
	insert(e, t) {
		return this.replaceWith(e, e, t);
	}
	replaceRange(e, t, n) {
		return Ns(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return Fs(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return Is(this, e, t), this;
	}
	lift(e, t) {
		return ns(this, e, t), this;
	}
	join(e, t = 1) {
		return bs(this, e, t), this;
	}
	wrap(e, t) {
		return cs(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return ls(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return ps(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new Rs(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new zs(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Ko(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof V) t.isInSet(n.marks) && this.step(new qo(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new qo(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return hs(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return Zo(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Qo(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return $o(this, e, t, n), this;
	}
}, Hs = Object.create(null), U = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new Us(e.min(t), e.max(t))];
	}
	get anchor() {
		return this.$anchor.pos;
	}
	get head() {
		return this.$head.pos;
	}
	get from() {
		return this.$from.pos;
	}
	get to() {
		return this.$to.pos;
	}
	get $from() {
		return this.ranges[0].$from;
	}
	get $to() {
		return this.ranges[0].$to;
	}
	get empty() {
		let e = this.ranges;
		for (let t = 0; t < e.length; t++) if (e[t].$from.pos != e[t].$to.pos) return !1;
		return !0;
	}
	content() {
		return this.$from.doc.slice(this.from, this.to, !0);
	}
	replace(e, t = H.empty) {
		let n = t.content.lastChild, r = null;
		for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
		let i = e.steps.length, a = this.ranges;
		for (let o = 0; o < a.length; o++) {
			let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? H.empty : t), o == 0 && Zs(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), Zs(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new W(e) : Xs(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? Xs(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Xs(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Js(e.node(0));
	}
	static atStart(e) {
		return Xs(e, e, 0, 0, 1) || new Js(e);
	}
	static atEnd(e) {
		return Xs(e, e, e.content.size, e.childCount, -1) || new Js(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = Hs[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Hs) throw RangeError("Duplicate use of selection JSON ID " + e);
		return Hs[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return W.between(this.$anchor, this.$head).getBookmark();
	}
};
U.prototype.visible = !0;
var Us = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, Ws = !1;
function Gs(e) {
	!Ws && !e.parent.inlineContent && (Ws = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var W = class e extends U {
	constructor(e, t = e) {
		Gs(e), Gs(t), super(e, t);
	}
	get $cursor() {
		return this.$anchor.pos == this.$head.pos ? this.$head : null;
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		if (!r.parent.inlineContent) return U.near(r);
		let i = t.resolve(n.map(this.anchor));
		return new e(i.parent.inlineContent ? i : r, r);
	}
	replace(e, t = H.empty) {
		if (super.replace(e, t), t == H.empty) {
			let t = this.$from.marksAcross(this.$to);
			t && e.ensureMarks(t);
		}
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor && t.head == this.head;
	}
	getBookmark() {
		return new Ks(this.anchor, this.head);
	}
	toJSON() {
		return {
			type: "text",
			anchor: this.anchor,
			head: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number" || typeof n.head != "number") throw RangeError("Invalid input for TextSelection.fromJSON");
		return new e(t.resolve(n.anchor), t.resolve(n.head));
	}
	static create(e, t, n = t) {
		let r = e.resolve(t);
		return new this(r, n == t ? r : e.resolve(n));
	}
	static between(t, n, r) {
		let i = t.pos - n.pos;
		if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
			let e = U.findFrom(n, r, !0) || U.findFrom(n, -r, !0);
			if (e) n = e.$head;
			else return U.near(n, r);
		}
		return t.parent.inlineContent || (i == 0 ? t = n : (t = (U.findFrom(t, -r, !0) || U.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
	}
};
U.jsonID("text", W);
var Ks = class e {
	constructor(e, t) {
		this.anchor = e, this.head = t;
	}
	map(t) {
		return new e(t.map(this.anchor), t.map(this.head));
	}
	resolve(e) {
		return W.between(e.resolve(this.anchor), e.resolve(this.head));
	}
}, G = class e extends U {
	constructor(e) {
		let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
		super(e, n), this.node = t;
	}
	map(t, n) {
		let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
		return r ? U.near(a) : new e(a);
	}
	content() {
		return new H(B.from(this.node), 0, 0);
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor;
	}
	toJSON() {
		return {
			type: "node",
			anchor: this.anchor
		};
	}
	getBookmark() {
		return new qs(this.anchor);
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number") throw RangeError("Invalid input for NodeSelection.fromJSON");
		return new e(t.resolve(n.anchor));
	}
	static create(t, n) {
		return new e(t.resolve(n));
	}
	static isSelectable(e) {
		return !e.isText && e.type.spec.selectable !== !1;
	}
};
G.prototype.visible = !1, U.jsonID("node", G);
var qs = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new Ks(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && G.isSelectable(n) ? new G(t) : U.near(t);
	}
}, Js = class e extends U {
	constructor(e) {
		super(e.resolve(0), e.resolve(e.content.size));
	}
	replace(e, t = H.empty) {
		if (t == H.empty) {
			e.delete(0, e.doc.content.size);
			let t = U.atStart(e.doc);
			t.eq(e.selection) || e.setSelection(t);
		} else super.replace(e, t);
	}
	toJSON() {
		return { type: "all" };
	}
	static fromJSON(t) {
		return new e(t);
	}
	map(t) {
		return new e(t);
	}
	eq(t) {
		return t instanceof e;
	}
	getBookmark() {
		return Ys;
	}
};
U.jsonID("all", Js);
var Ys = {
	map() {
		return this;
	},
	resolve(e) {
		return new Js(e);
	}
};
function Xs(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return W.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = Xs(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && G.isSelectable(r)) return G.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function Zs(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Jo || i instanceof Yo)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(U.near(e.doc.resolve(o), n));
}
var Qs = 1, $s = 2, ec = 4, tc = class extends Vs {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Qs) & -3, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & Qs) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= $s, this;
	}
	ensureMarks(e) {
		return V.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
	}
	addStoredMark(e) {
		return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
	}
	removeStoredMark(e) {
		return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
	}
	get storedMarksSet() {
		return (this.updated & $s) > 0;
	}
	addStep(e, t) {
		super.addStep(e, t), this.updated &= -3, this.storedMarks = null;
	}
	setTime(e) {
		return this.time = e, this;
	}
	replaceSelection(e) {
		return this.selection.replace(this, e), this;
	}
	replaceSelectionWith(e, t = !0) {
		let n = this.selection;
		return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || V.none))), n.replaceWith(this, e), this;
	}
	deleteSelection() {
		return this.selection.replace(this), this;
	}
	insertText(e, t, n) {
		let r = this.doc.type.schema;
		if (t == null) return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection();
		{
			if (n ??= t, !e) return this.deleteRange(t, n);
			let i = this.storedMarks;
			if (!i) {
				let e = this.doc.resolve(t);
				i = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n));
			}
			return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(U.near(this.selection.$to)), this;
		}
	}
	setMeta(e, t) {
		return this.meta[typeof e == "string" ? e : e.key] = t, this;
	}
	getMeta(e) {
		return this.meta[typeof e == "string" ? e : e.key];
	}
	get isGeneric() {
		for (let e in this.meta) return !1;
		return !0;
	}
	scrollIntoView() {
		return this.updated |= ec, this;
	}
	get scrolledIntoView() {
		return (this.updated & ec) > 0;
	}
};
function nc(e, t) {
	return !t || !e ? e : e.bind(t);
}
var rc = class {
	constructor(e, t, n) {
		this.name = e, this.init = nc(t.init, n), this.apply = nc(t.apply, n);
	}
}, ic = [
	new rc("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new rc("selection", {
		init(e, t) {
			return e.selection || U.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new rc("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new rc("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], ac = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = ic.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new rc(e.key, e.spec.state, e));
		});
	}
}, oc = class e {
	constructor(e) {
		this.config = e;
	}
	get schema() {
		return this.config.schema;
	}
	get plugins() {
		return this.config.plugins;
	}
	apply(e) {
		return this.applyTransaction(e).state;
	}
	filterTransaction(e, t = -1) {
		for (let n = 0; n < this.config.plugins.length; n++) if (n != t) {
			let t = this.config.plugins[n];
			if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, e, this)) return !1;
		}
		return !0;
	}
	applyTransaction(e) {
		if (!this.filterTransaction(e)) return {
			state: this,
			transactions: []
		};
		let t = [e], n = this.applyInner(e), r = null;
		for (;;) {
			let i = !1;
			for (let a = 0; a < this.config.plugins.length; a++) {
				let o = this.config.plugins[a];
				if (o.spec.appendTransaction) {
					let s = r ? r[a].n : 0, c = r ? r[a].state : this, l = s < t.length && o.spec.appendTransaction.call(o, s ? t.slice(s) : t, c, n);
					if (l && n.filterTransaction(l, a)) {
						if (l.setMeta("appendedTransaction", e), !r) {
							r = [];
							for (let e = 0; e < this.config.plugins.length; e++) r.push(e < a ? {
								state: n,
								n: t.length
							} : {
								state: this,
								n: 0
							});
						}
						t.push(l), n = n.applyInner(l), i = !0;
					}
					r && (r[a] = {
						state: n,
						n: t.length
					});
				}
			}
			if (!i) return {
				state: n,
				transactions: t
			};
		}
	}
	applyInner(t) {
		if (!t.before.eq(this.doc)) throw RangeError("Applying a mismatched transaction");
		let n = new e(this.config), r = this.config.fields;
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n[i.name] = i.apply(t, this[i.name], this, n);
		}
		return n;
	}
	get tr() {
		return new tc(this);
	}
	static create(t) {
		let n = new ac(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new ac(this.schema, t.plugins), r = n.fields, i = new e(n);
		for (let e = 0; e < r.length; e++) {
			let n = r[e].name;
			i[n] = this.hasOwnProperty(n) ? this[n] : r[e].init(t, i);
		}
		return i;
	}
	toJSON(e) {
		let t = {
			doc: this.doc.toJSON(),
			selection: this.selection.toJSON()
		};
		if (this.storedMarks && (t.storedMarks = this.storedMarks.map((e) => e.toJSON())), e && typeof e == "object") for (let n in e) {
			if (n == "doc" || n == "selection") throw RangeError("The JSON fields `doc` and `selection` are reserved");
			let r = e[n], i = r.spec.state;
			i && i.toJSON && (t[n] = i.toJSON.call(r, this[r.key]));
		}
		return t;
	}
	static fromJSON(t, n, r) {
		if (!n) throw RangeError("Invalid input for EditorState.fromJSON");
		if (!t.schema) throw RangeError("Required config field 'schema' missing");
		let i = new ac(t.schema, t.plugins), a = new e(i);
		return i.fields.forEach((e) => {
			if (e.name == "doc") a.doc = ja.fromJSON(t.schema, n.doc);
			else if (e.name == "selection") a.selection = U.fromJSON(a.doc, n.selection);
			else if (e.name == "storedMarks") n.storedMarks && (a.storedMarks = n.storedMarks.map(t.schema.markFromJSON));
			else {
				if (r) for (let i in r) {
					let o = r[i], s = o.spec.state;
					if (o.key == e.name && s && s.fromJSON && Object.prototype.hasOwnProperty.call(n, i)) {
						a[e.name] = s.fromJSON.call(o, t, n[i], a);
						return;
					}
				}
				a[e.name] = e.init(t, a);
			}
		}), a;
	}
};
function sc(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = sc(i, t, {})), n[r] = i;
	}
	return n;
}
var K = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && sc(e.props, this, this.props), this.key = e.key ? e.key.key : lc("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, cc = Object.create(null);
function lc(e) {
	return e in cc ? e + "$" + ++cc[e] : (cc[e] = 0, e + "$");
}
var uc = class {
	constructor(e = "key") {
		this.key = lc(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, dc = (e, t) => !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function fc(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var pc = (e, t, n) => {
	let r = fc(e, n);
	if (!r) return !1;
	let i = yc(r);
	if (!i) {
		let n = r.blockRange(), i = n && ts(n);
		return i != null && (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (Lc(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (_c(a, "end") || G.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = Cs(e.doc, r.before(n), r.after(n), H.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(_c(a, "end") ? U.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : G.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, mc = (e, t, n) => {
	let r = fc(e, n);
	if (!r) return !1;
	let i = yc(r);
	return i ? gc(e, i, t) : !1;
}, hc = (e, t, n) => {
	let r = bc(e, n);
	if (!r) return !1;
	let i = Cc(r);
	return i ? gc(e, i, t) : !1;
};
function gc(e, t, n) {
	let r = t.nodeBefore, i = t.pos - 1;
	for (; !r.isTextblock; i--) {
		if (r.type.spec.isolating) return !1;
		let e = r.lastChild;
		if (!e) return !1;
		r = e;
	}
	let a = t.nodeAfter, o = t.pos + 1;
	for (; !a.isTextblock; o++) {
		if (a.type.spec.isolating) return !1;
		let e = a.firstChild;
		if (!e) return !1;
		a = e;
	}
	let s = Cs(e.doc, i, o, H.empty);
	if (!s || s.from != i || s instanceof Jo && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(W.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function _c(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var vc = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = yc(r);
	}
	let o = a && a.nodeBefore;
	return !o || !G.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(G.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function yc(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function bc(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var xc = (e, t, n) => {
	let r = bc(e, n);
	if (!r) return !1;
	let i = Cc(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (Lc(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (_c(a, "start") || G.isSelectable(a))) {
		let n = Cs(e.doc, r.before(), r.after(), H.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(_c(a, "start") ? U.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : G.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, Sc = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = Cc(r);
	}
	let o = a && a.nodeAfter;
	return !o || !G.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(G.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function Cc(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var wc = (e, t) => {
	let n = e.selection, r = n instanceof G, i;
	if (r) {
		if (n.node.isTextblock || !gs(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = ys(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(G.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, Tc = (e, t) => {
	let n = e.selection, r;
	if (n instanceof G) {
		if (n.node.isTextblock || !gs(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = ys(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, Ec = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && ts(i);
	return a != null && (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, Dc = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function Oc(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var kc = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = Oc(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(U.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, Ac = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Js || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = Oc(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(W.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, jc = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if (ms(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && ts(r);
	return i != null && (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function Mc(e) {
	return (t, n) => {
		let { $from: r, $to: i } = t.selection;
		if (t.selection instanceof G && t.selection.node.isBlock) return !r.parentOffset || !ms(t.doc, r.pos) ? !1 : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
		if (!r.depth) return !1;
		let a = [], o, s, c = !1, l = !1;
		for (let t = r.depth;; t--) if (r.node(t).isBlock) {
			c = r.end(t) == r.pos + (r.depth - t), l = r.start(t) == r.pos - (r.depth - t), s = Oc(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)));
			let n = e && e(i.parent, c, r);
			a.unshift(n || (c && s ? { type: s } : null)), o = t;
			break;
		} else {
			if (t == 1) return !1;
			a.unshift(null);
		}
		let u = t.tr;
		(t.selection instanceof W || t.selection instanceof Js) && u.deleteSelection();
		let d = u.mapping.map(r.pos), f = ms(u.doc, d, a.length, a);
		if (f ||= (a[0] = s ? { type: s } : null, ms(u.doc, d, a.length, a)), !f) return !1;
		if (u.split(d, a.length, a), !c && l && r.node(o).type != s) {
			let e = u.mapping.map(r.before(o)), t = u.doc.resolve(e);
			s && r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) && u.setNodeMarkup(u.mapping.map(r.before(o)), s);
		}
		return n && n(u.scrollIntoView()), !0;
	};
}
var Nc = Mc(), Pc = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a != 0 && (i = n.before(a), t && t(e.tr.setSelection(G.create(e.doc, i))), !0);
}, Fc = (e, t) => (t && t(e.tr.setSelection(new Js(e.doc))), !0);
function Ic(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || gs(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function Lc(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && Ic(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = B.empty;
			for (let e = o.length - 1; e >= 0; e--) s = B.from(o[e].create(null, s));
			s = B.from(i.copy(s));
			let c = e.tr.step(new Yo(t.pos - 1, r, t.pos, r, new H(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && gs(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : U.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && ts(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && _c(a, "start", !0) && _c(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = B.empty;
				for (let e = o.length - 1; e >= 0; e--) r = B.from(o[e].copy(r));
				n(e.tr.step(new Yo(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new H(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function Rc(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(W.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var zc = Rc(-1), Bc = Rc(1);
function Vc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && rs(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function Hc(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (!(!r.isTextblock || r.hasMarkup(e, t))) if (r.type == e) i = !0;
				else {
					let t = n.doc.resolve(a), r = t.index();
					i = t.parent.canReplaceWith(r, r + 1, e);
				}
			});
		}
		if (!i) return !1;
		if (r) {
			let i = n.tr;
			for (let r = 0; r < n.selection.ranges.length; r++) {
				let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
				i.setBlockType(a, o, e, t);
			}
			r(i.scrollIntoView());
		}
		return !0;
	};
}
function Uc(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var Wc = Uc(dc, pc, vc), Gc = Uc(dc, xc, Sc), Kc = {
	Enter: Uc(Dc, Ac, jc, Nc),
	"Mod-Enter": kc,
	Backspace: Wc,
	"Mod-Backspace": Wc,
	"Shift-Backspace": Wc,
	Delete: Gc,
	"Mod-Delete": Gc,
	"Mod-a": Fc
}, qc = {
	"Ctrl-h": Kc.Backspace,
	"Alt-Backspace": Kc["Mod-Backspace"],
	"Ctrl-d": Kc.Delete,
	"Ctrl-Alt-Backspace": Kc["Mod-Delete"],
	"Alt-Delete": Kc["Mod-Delete"],
	"Alt-d": Kc["Mod-Delete"],
	"Ctrl-a": zc,
	"Ctrl-e": Bc
};
for (let e in Kc) qc[e] = Kc[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
//#endregion
//#region node_modules/prosemirror-schema-list/dist/index.js
function Jc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return Yc(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function Yc(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new ka(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new ka(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = rs(a, n, r, t);
	return s ? (e && Xc(e, t, s, i, n), !0) : !1;
}
function Xc(e, t, n, r, i) {
	let a = B.empty;
	for (let e = n.length - 1; e >= 0; e--) a = B.from(n[e].type.create(n[e].attrs, a));
	e.step(new Yo(t.start - (r ? 2 : 0), t.end, t.start, t.end, new H(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && ms(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Zc(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		return a ? n ? r.node(a.depth - 1).type == e ? Qc(t, n, e, a) : $c(t, n, a) : !0 : !1;
	};
}
function Qc(e, t, n, r) {
	let i = e.tr, a = r.end, o = r.$to.end(r.depth);
	a < o && (i.step(new Yo(a - 1, o, a, o, new H(B.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new ka(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
	let s = ts(r);
	if (s == null) return !1;
	i.lift(r, s);
	let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
	return gs(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0;
}
function $c(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? B.empty : B.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new Yo(d - +!!s, f + +!!c, d + 1, f - 1, new H((s ? B.empty : B.from(i.copy(B.empty))).append(c ? B.empty : B.from(i.copy(B.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function el(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (c.type != e) return !1;
		if (n) {
			let r = c.lastChild && c.lastChild.type == s.type, i = B.from(r ? e.create() : null), o = new H(B.from(e.create(null, B.from(s.type.create(null, i)))), r ? 3 : 1, 0), l = a.start, u = a.end;
			n(t.tr.step(new Yo(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
//#endregion
//#region node_modules/prosemirror-view/dist/index.js
var tl = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}, nl = function(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}, rl = null, il = function(e, t, n) {
	let r = rl ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}, al = function() {
	rl = null;
}, ol = function(e, t, n, r) {
	return n && (cl(e, t, n, r, -1) || cl(e, t, n, r, 1));
}, sl = /^(img|br|input|textarea|hr)$/i;
function cl(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : ll(e))) {
			let n = e.parentNode;
			if (!n || n.nodeType != 1 || pl(e) || sl.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = tl(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (n.nodeType == 1 && n.contentEditable == "false") if (n.pmViewDesc?.ignoreForSelection) t += i;
			else return !1;
			else e = n, t = i < 0 ? ll(e) : 0;
		} else return !1;
	}
}
function ll(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function ul(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t) return e;
		if (e.nodeType == 1 && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = ll(e);
		} else if (e.parentNode && !pl(e)) t = tl(e), e = e.parentNode;
		else return null;
	}
}
function dl(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t < e.nodeValue.length) return e;
		if (e.nodeType == 1 && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !pl(e)) t = tl(e) + 1, e = e.parentNode;
		else return null;
	}
}
function fl(e, t, n) {
	for (let r = t == 0, i = t == ll(e); r || i;) {
		if (e == n) return !0;
		let t = tl(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == ll(e);
	}
}
function pl(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var ml = function(e) {
	return e.focusNode && ol(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
};
function hl(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function gl(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function _l(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(ll(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(ll(r.startContainer), r.startOffset)
		};
	}
}
var vl = typeof navigator < "u" ? navigator : null, yl = typeof document < "u" ? document : null, bl = vl && vl.userAgent || "", xl = /Edge\/(\d+)/.exec(bl), Sl = /MSIE \d/.exec(bl), Cl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(bl), wl = !!(Sl || Cl || xl), Tl = Sl ? document.documentMode : Cl ? +Cl[1] : xl ? +xl[1] : 0, El = !wl && /gecko\/(\d+)/i.test(bl);
El && +(/Firefox\/(\d+)/.exec(bl) || [0, 0])[1];
var Dl = !wl && /Chrome\/(\d+)/.exec(bl), Ol = !!Dl, kl = Dl ? +Dl[1] : 0, Al = !wl && !!vl && /Apple Computer/.test(vl.vendor), jl = Al && (/Mobile\/\w+/.test(bl) || !!vl && vl.maxTouchPoints > 2), Ml = jl || (vl ? /Mac/.test(vl.platform) : !1), Nl = vl ? /Win/.test(vl.platform) : !1, Pl = /Android \d/.test(bl), Fl = !!yl && "webkitFontSmoothing" in yl.documentElement.style, Il = Fl ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ll(e) {
	let t = e.defaultView && e.defaultView.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.documentElement.clientWidth,
		top: 0,
		bottom: e.documentElement.clientHeight
	};
}
function Rl(e, t) {
	return typeof e == "number" ? e : e[t];
}
function zl(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function Bl(e, t, n) {
	if (!tu(t) && t.left == 0) return;
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (o.nodeType != 1) {
			o = nl(o);
			continue;
		}
		let e = o, n = e == a.body, s = n ? Ll(a) : zl(e), c = 0, l = 0;
		if (t.top < s.top + Rl(r, "top") ? l = -(s.top - t.top + Rl(i, "top")) : t.bottom > s.bottom - Rl(r, "bottom") && (l = t.bottom - t.top > s.bottom - s.top ? t.top + Rl(i, "top") - s.top : t.bottom - s.bottom + Rl(i, "bottom")), t.left < s.left + Rl(r, "left") ? c = -(s.left - t.left + Rl(i, "left")) : t.right > s.right - Rl(r, "right") && (c = t.right - s.right + Rl(i, "right")), c || l) if (n) a.defaultView.scrollBy(c, l);
		else {
			let n = e.scrollLeft, r = e.scrollTop;
			l && (e.scrollTop += l), c && (e.scrollLeft += c);
			let i = e.scrollLeft - n, a = e.scrollTop - r;
			t = {
				left: t.left - i,
				top: t.top - a,
				right: t.right - i,
				bottom: t.bottom - a
			};
		}
		let u = n ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(u)) break;
		o = u == "absolute" ? o.offsetParent : nl(o);
	}
}
function Vl(e) {
	let t = e.dom.getBoundingClientRect(), n = Math.max(0, t.top), r, i;
	for (let a = (t.left + t.right) / 2, o = n + 1; o < Math.min(innerHeight, t.bottom); o += 5) {
		let t = e.root.elementFromPoint(a, o);
		if (!t || t == e.dom || !e.dom.contains(t)) continue;
		let s = t.getBoundingClientRect();
		if (s.top >= n - 20) {
			r = t, i = s.top;
			break;
		}
	}
	return {
		refDOM: r,
		refTop: i,
		stack: Hl(e.dom)
	};
}
function Hl(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = nl(r));
	return t;
}
function Ul({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	Wl(n, r == 0 ? 0 : r - t);
}
function Wl(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Gl = null;
function Kl(e) {
	if (e.setActive) return e.setActive();
	if (Gl) return e.focus(Gl);
	let t = Hl(e);
	e.focus(Gl == null ? { get preventScroll() {
		return Gl = { preventScroll: !0 }, !0;
	} } : void 0), Gl || (Gl = !1, Wl(t, 0));
}
function ql(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (u.nodeType == 1) e = u.getClientRects();
		else if (u.nodeType == 3) e = il(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && n.nodeType == 3 ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, u.nodeType == 1 && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && n.nodeType == 3 ? Jl(n, i) : !n || r && n.nodeType == 1 ? {
		node: e,
		offset: a
	} : ql(n, i);
}
function Jl(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = nu(r, 1);
		if (n.top != n.bottom && Yl(t, n)) {
			i = {
				node: e,
				offset: a + +(t.left >= (n.left + n.right) / 2)
			};
			break;
		}
	}
	return r.detach(), i || {
		node: e,
		offset: 0
	};
}
function Yl(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function Xl(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function Zl(e, t, n) {
	let { node: r, offset: i } = ql(t, n), a = -1;
	if (r.nodeType == 1 && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Ql(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (t.dom.nodeType == 1 && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function $l(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (n.nodeType == 1) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (Yl(t, i)) return $l(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function eu(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = _l(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
		let n = e.dom.getBoundingClientRect();
		if (!Yl(t, n) || (o = $l(e.dom, t, n), !o)) return null;
	}
	if (Al) for (let e = o; r && e; e = nl(e)) e.draggable && (r = void 0);
	if (o = Xl(o, t), r) {
		if (El && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		Fl && i && r.nodeType == 1 && (n = r.childNodes[i - 1]).nodeType == 1 && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (s = Ql(e, r, i, t));
	}
	s ??= Zl(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function tu(e) {
	return e.top < e.bottom || e.left < e.right;
}
function nu(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (tu(e)) return e;
	}
	return Array.prototype.find.call(n, tu) || e.getBoundingClientRect();
}
var ru = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function iu(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = Fl || El;
	if (r.nodeType == 3) if (o && (ru.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
		let e = nu(il(r, i, i), n);
		if (El && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
			let t = nu(il(r, i - 1, i - 1), -1);
			if (t.top == e.top) {
				let n = nu(il(r, i, i + 1), -1);
				if (n.top != e.top) return au(n, n.left < t.left);
			}
		}
		return e;
	} else {
		let e = i, t = i, a = n < 0 ? 1 : -1;
		return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, au(nu(il(r, e, t), a), a < 0);
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == ll(r))) {
			let e = r.childNodes[i - 1];
			if (e.nodeType == 1) return ou(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < ll(r)) {
			let e = r.childNodes[i];
			if (e.nodeType == 1) return ou(e.getBoundingClientRect(), !0);
		}
		return ou(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == ll(r))) {
		let e = r.childNodes[i - 1], t = e.nodeType == 3 ? il(e, ll(e) - +!o) : e.nodeType == 1 && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return au(nu(t, 1), !1);
	}
	if (a == null && i < ll(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? e.nodeType == 3 ? il(e, 0, +!o) : e.nodeType == 1 ? e : null : null;
		if (t) return au(nu(t, -1), !0);
	}
	return au(nu(r.nodeType == 3 ? il(r) : r, -n), n >= 0);
}
function au(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function ou(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function su(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function cu(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return su(e, t, () => {
		let { node: t } = e.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
		for (;;) {
			let n = e.docView.nearestDesc(t, !0);
			if (!n) break;
			if (n.node.isBlock) {
				t = n.contentDOM || n.dom;
				break;
			}
			t = n.dom.parentNode;
		}
		let r = iu(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (e.nodeType == 1) t = e.getClientRects();
			else if (e.nodeType == 3) t = il(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var lu = /[\u0590-\u08ac]/;
function uu(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !lu.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : su(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !l.contains(u.nodeType == 1 ? u : u.parentNode) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
var du = null, fu = null, pu = !1;
function mu(e, t, n) {
	return du == t && fu == n ? pu : (du = t, fu = n, pu = n == "up" || n == "down" ? cu(e, t, n) : uu(e, t, n));
}
var hu = 0, gu = 1, _u = 2, vu = 3, yu = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = hu, n.pmViewDesc = this;
	}
	matchesWidget(e) {
		return !1;
	}
	matchesMark(e) {
		return !1;
	}
	matchesNode(e, t, n) {
		return !1;
	}
	matchesHack(e) {
		return !1;
	}
	parseRule(e) {
		return null;
	}
	stopEvent(e) {
		return !1;
	}
	get size() {
		let e = 0;
		for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
		return e;
	}
	get border() {
		return 0;
	}
	destroy() {
		this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
		for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
	}
	posBeforeChild(e) {
		for (let t = 0, n = this.posAtStart;; t++) {
			let r = this.children[t];
			if (r == e) return n;
			n += r.size;
		}
	}
	get posBefore() {
		return this.parent.posBeforeChild(this);
	}
	get posAtStart() {
		return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
	}
	get posAfter() {
		return this.posBefore + this.size;
	}
	get posAtEnd() {
		return this.posAtStart + this.size - 2 * this.border;
	}
	localPosFromDOM(e, t, n) {
		if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)) if (n < 0) {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t - 1];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.previousSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
			return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
		} else {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.nextSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
			return n ? this.posBeforeChild(r) : this.posAtEnd;
		}
		let r;
		if (e == this.dom && this.contentDOM) r = t > tl(this.contentDOM);
		else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) r = e.compareDocumentPosition(this.contentDOM) & 2;
		else if (this.dom.firstChild) {
			if (t == 0) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !1;
					break;
				}
				if (t.previousSibling) break;
			}
			if (r == null && t == e.childNodes.length) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !0;
					break;
				}
				if (t.nextSibling) break;
			}
		}
		return r ?? n > 0 ? this.posAtEnd : this.posAtStart;
	}
	nearestDesc(e, t = !1) {
		for (let n = !0, r = e; r; r = r.parentNode) {
			let i = this.getDesc(r), a;
			if (i && (!t || i.node)) if (n && (a = i.nodeDOM) && !(a.nodeType == 1 ? a.contains(e.nodeType == 1 ? e : e.parentNode) : a == e)) n = !1;
			else return i;
		}
	}
	getDesc(e) {
		let t = e.pmViewDesc;
		for (let e = t; e; e = e.parent) if (e == this) return t;
	}
	posFromDOM(e, t, n) {
		for (let r = e; r; r = r.parentNode) {
			let i = this.getDesc(r);
			if (i) return i.localPosFromDOM(e, t, n);
		}
		return -1;
	}
	descAt(e) {
		for (let t = 0, n = 0; t < this.children.length; t++) {
			let r = this.children[t], i = n + r.size;
			if (n == e && i != n) {
				for (; !r.border && r.children.length;) for (let e = 0; e < r.children.length; e++) {
					let t = r.children[e];
					if (t.size) {
						r = t;
						break;
					}
				}
				return r;
			}
			if (e < i) return r.descAt(e - n - r.border);
			n = i;
		}
	}
	domFromPos(e, t) {
		if (!this.contentDOM) return {
			node: this.dom,
			offset: 0,
			atom: e + 1
		};
		let n = 0, r = 0;
		for (let t = 0; n < this.children.length; n++) {
			let i = this.children[n], a = t + i.size;
			if (a > e || i instanceof Eu) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (let e; n && !(e = this.children[n - 1]).size && e instanceof bu && e.side >= 0; n--);
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, !(!e || e.dom.parentNode == this.contentDOM); n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? tl(e.dom) + 1 : 0
			};
		}
		{
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, !(!e || e.dom.parentNode == this.contentDOM); n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? tl(e.dom) : this.contentDOM.childNodes.length
			};
		}
	}
	parseRange(e, t, n = 0) {
		if (this.children.length == 0) return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: 0,
			toOffset: this.contentDOM.childNodes.length
		};
		let r = -1, i = -1;
		for (let a = n, o = 0;; o++) {
			let n = this.children[o], s = a + n.size;
			if (r == -1 && e <= s) {
				let i = a + n.border;
				if (e >= i && t <= s - n.border && n.node && n.contentDOM && this.contentDOM.contains(n.contentDOM)) return n.parseRange(e, t, i);
				e = a;
				for (let t = o; t > 0; t--) {
					let n = this.children[t - 1];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
						r = tl(n.dom) + 1;
						break;
					}
					e -= n.size;
				}
				r == -1 && (r = 0);
			}
			if (r > -1 && (s > t || o == this.children.length - 1)) {
				t = s;
				for (let e = o + 1; e < this.children.length; e++) {
					let n = this.children[e];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(-1)) {
						i = tl(n.dom);
						break;
					}
					t += n.size;
				}
				i == -1 && (i = this.contentDOM.childNodes.length);
				break;
			}
			a = s;
		}
		return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: r,
			toOffset: i
		};
	}
	emptyChildAt(e) {
		if (this.border || !this.contentDOM || !this.children.length) return !1;
		let t = this.children[e < 0 ? 0 : this.children.length - 1];
		return t.size == 0 || t.emptyChildAt(e);
	}
	domAfterPos(e) {
		let { node: t, offset: n } = this.domFromPos(e, 0);
		if (t.nodeType != 1 || n == t.childNodes.length) throw RangeError("No node after pos " + e);
		return t.childNodes[n];
	}
	setSelection(e, t, n, r = !1) {
		let i = Math.min(e, t), a = Math.max(e, t);
		for (let o = 0, s = 0; o < this.children.length; o++) {
			let c = this.children[o], l = s + c.size;
			if (i > s && a < l) return c.setSelection(e - s - c.border, t - s - c.border, n, r);
			s = l;
		}
		let o = this.domFromPos(e, e ? -1 : 1), s = t == e ? o : this.domFromPos(t, t ? -1 : 1), c = n.root.getSelection(), l = n.domSelectionRange(), u = !1;
		if ((El || Al) && e == t) {
			let { node: e, offset: t } = o;
			if (e.nodeType == 3) {
				if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
					if (n = t.nextSibling) {
						n.nodeName == "BR" && (o = s = {
							node: n.parentNode,
							offset: tl(n) + 1
						});
						break;
					}
					let e = t.pmViewDesc;
					if (e && e.node && e.node.isBlock) break;
				}
			} else {
				let n = e.childNodes[t - 1];
				u = n && (n.nodeName == "BR" || n.contentEditable == "false");
			}
		}
		if (El && l.focusNode && l.focusNode != s.node && l.focusNode.nodeType == 1) {
			let e = l.focusNode.childNodes[l.focusOffset];
			e && e.contentEditable == "false" && (r = !0);
		}
		if (!(r || u && Al) && ol(o.node, o.offset, l.anchorNode, l.anchorOffset) && ol(s.node, s.offset, l.focusNode, l.focusOffset)) return;
		let d = !1;
		if ((c.extend || e == t) && !(u && El)) {
			c.collapse(o.node, o.offset);
			try {
				e != t && c.extend(s.node, s.offset), d = !0;
			} catch {}
		}
		if (!d) {
			if (e > t) {
				let e = o;
				o = s, s = e;
			}
			let n = document.createRange();
			n.setEnd(s.node, s.offset), n.setStart(o.node, o.offset), c.removeAllRanges(), c.addRange(n);
		}
	}
	ignoreMutation(e) {
		return !this.contentDOM && e.type != "selection";
	}
	get contentLost() {
		return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
	}
	markDirty(e, t) {
		for (let n = 0, r = 0; r < this.children.length; r++) {
			let i = this.children[r], a = n + i.size;
			if (n == a ? e <= a && t >= n : e < a && t > n) {
				let r = n + i.border, o = a - i.border;
				if (e >= r && t <= o) {
					this.dirty = e == n || t == a ? _u : gu, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = vu : i.markDirty(e - r, t - r);
					return;
				}
				i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? _u : vu;
			}
			n = a;
		}
		this.dirty = _u;
	}
	markParentsDirty() {
		let e = 1;
		for (let t = this.parent; t; t = t.parent, e++) {
			let n = e == 1 ? _u : gu;
			t.dirty < n && (t.dirty = n);
		}
	}
	get domAtom() {
		return !1;
	}
	get ignoreForCoords() {
		return !1;
	}
	get ignoreForSelection() {
		return !1;
	}
	isText(e) {
		return !1;
	}
}, bu = class extends yu {
	constructor(e, t, n, r) {
		let i, a = t.type.toDOM;
		if (typeof a == "function" && (a = a(n, () => {
			if (!i) return r;
			if (i.parent) return i.parent.posBeforeChild(i);
		})), !t.type.spec.raw) {
			if (a.nodeType != 1) {
				let e = document.createElement("span");
				e.appendChild(a), a = e;
			}
			a.contentEditable = "false", a.classList.add("ProseMirror-widget");
		}
		super(e, [], a, null), this.widget = t, this.widget = t, i = this;
	}
	matchesWidget(e) {
		return this.dirty == hu && e.type.eq(this.widget.type);
	}
	parseRule() {
		return { ignore: !0 };
	}
	stopEvent(e) {
		let t = this.widget.spec.stopEvent;
		return t ? t(e) : !1;
	}
	ignoreMutation(e) {
		return e.type != "selection" || this.widget.spec.ignoreSelection;
	}
	destroy() {
		this.widget.type.destroy(this.dom), super.destroy();
	}
	get domAtom() {
		return !0;
	}
	get ignoreForSelection() {
		return !!this.widget.type.spec.relaxedSide;
	}
	get side() {
		return this.widget.type.side;
	}
}, xu = class extends yu {
	constructor(e, t, n, r) {
		super(e, [], t, null), this.textDOM = n, this.text = r;
	}
	get size() {
		return this.text.length;
	}
	localPosFromDOM(e, t) {
		return e == this.textDOM ? this.posAtStart + t : this.posAtStart + (t ? this.size : 0);
	}
	domFromPos(e) {
		return {
			node: this.textDOM,
			offset: e
		};
	}
	ignoreMutation(e) {
		return e.type === "characterData" && e.target.nodeValue == e.oldValue;
	}
}, Su = class e extends yu {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return (!o || !o.dom) && (o = xo.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.dirty & vu || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return this.dirty != vu && this.mark.eq(e);
	}
	markDirty(e, t) {
		if (super.markDirty(e, t), this.dirty != hu) {
			let e = this.parent;
			for (; !e.node;) e = e.parent;
			e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = hu;
		}
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = Uu(a, n, o, r)), t > 0 && (a = Uu(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, Cu = class e extends yu {
	constructor(e, t, n, r, i, a, o) {
		super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o;
	}
	static create(t, n, r, i, a, o) {
		let s = a.nodeViews[n.type.name], c, l = s && s(n, a, () => {
			if (!c) return o;
			if (c.parent) return c.parent.posBeforeChild(c);
		}, r, i), u = l && l.dom, d = l && l.contentDOM;
		if (n.isText) {
			if (!u) u = document.createTextNode(n.text);
			else if (u.nodeType != 3) throw RangeError("Text must be rendered as a DOM text node");
		} else if (!u) {
			let e = xo.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = Pu(u, r, n), l ? c = new Du(t, n, r, i, u, d || null, f, l) : n.isText ? new Tu(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f);
	}
	parseRule(e) {
		if (this.node.type.spec.reparseInView) return null;
		let t = {
			node: this.node.type.name,
			attrs: this.node.attrs
		};
		if (this.node.type.whitespace == "pre" && (t.preserveWhitespace = "full"), !this.contentDOM) t.getContent = () => this.node.content;
		else if (!this.contentLost) t.contentElement = this.contentDOM;
		else {
			for (let e = this.children.length - 1; e >= 0; e--) {
				let n = this.children[e];
				if (this.dom.contains(n.dom.parentNode)) {
					t.contentElement = n.dom.parentNode;
					break;
				}
			}
			if (!t.contentElement) {
				let n = e && e.find((t) => t.nodeType == 1 && e.indexOf(t.parentNode) < 0 && this.dom.contains(t));
				n ? t.contentElement = n : t.getContent = () => B.empty;
			}
		}
		return t;
	}
	matchesNode(e, t, n) {
		return this.dirty == hu && e.eq(this.node) && Fu(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Lu(this, a && a.node, e);
		Bu(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? V.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, c, l) => {
			s.syncToMarks(t.marks, n, e, l);
			let u;
			s.findNodeMatch(t, a, c, l) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (u = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, c, u, e) || s.updateNextNode(t, a, c, e, l, r) || s.addNode(t, a, c, e, r), r += t.nodeSize;
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == _u) && (a && this.protectLocalComposition(e, a), Ou(this.contentDOM, this.children, e), jl && Vu(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof W) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = Hu(this.node.content, e, n - t, r - t);
			return a < 0 ? null : {
				node: i,
				pos: a,
				text: e
			};
		}
		return {
			node: i,
			pos: -1,
			text: ""
		};
	}
	protectLocalComposition(e, { node: t, pos: n, text: r }) {
		if (this.getDesc(t)) return;
		let i = t;
		for (; i.parentNode != this.contentDOM; i = i.parentNode) {
			for (; i.previousSibling;) i.parentNode.removeChild(i.previousSibling);
			for (; i.nextSibling;) i.parentNode.removeChild(i.nextSibling);
			i.pmViewDesc && (i.pmViewDesc = void 0);
		}
		let a = new xu(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = Uu(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r) {
		return this.dirty == vu || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
	}
	updateInner(e, t, n, r) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = hu;
	}
	updateOuterDeco(e) {
		if (Fu(e, this.outerDeco)) return;
		let t = this.nodeDOM.nodeType != 1, n = this.dom;
		this.dom = Mu(this.dom, this.nodeDOM, ju(this.outerDeco, this.node, t), ju(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
	}
	selectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
	}
	deselectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
	}
	get domAtom() {
		return this.node.isAtom;
	}
};
function wu(e, t, n, r, i) {
	Pu(r, t, e);
	let a = new Cu(void 0, e, t, n, r, r, r);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
var Tu = class e extends Cu {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, r, i, null, a);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.dirty == vu || this.dirty != hu && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != hu || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = hu, !0);
	}
	inParent() {
		let e = this.parent.contentDOM;
		for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
		return !1;
	}
	domFromPos(e) {
		return {
			node: this.nodeDOM,
			offset: e
		};
	}
	localPosFromDOM(e, t, n) {
		return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n);
	}
	ignoreMutation(e) {
		return e.type != "characterData" && e.type != "selection";
	}
	slice(t, n, r) {
		let i = this.node.cut(t, n), a = document.createTextNode(i.text);
		return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a);
	}
	markDirty(e, t) {
		super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = vu);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, Eu = class extends yu {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return this.dirty == hu && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, Du = class extends Cu {
	constructor(e, t, n, r, i, a, o, s) {
		super(e, t, n, r, i, a, o), this.spec = s;
	}
	update(e, t, n, r) {
		if (this.dirty == vu) return !1;
		if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
			let i = this.spec.update(e, t, n);
			return i && this.updateInner(e, t, n, r), i;
		}
		return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, r);
	}
	selectNode() {
		this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
	}
	deselectNode() {
		this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
	}
	setSelection(e, t, n, r) {
		this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, r);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
	stopEvent(e) {
		return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
};
function Ou(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = Iu(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof Su) {
			let t = r ? r.previousSibling : e.lastChild;
			Ou(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = Iu(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var ku = function(e) {
	e && (this.nodeName = e);
};
ku.prototype = Object.create(null);
var Au = [new ku()];
function ju(e, t, n) {
	if (e.length == 0) return Au;
	let r = n ? Au[0] : new ku(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new ku(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new ku(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function Mu(e, t, n, r) {
	if (n == Au && r == Au) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName ? i = t : (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = Au[0], i = t);
		}
		Nu(i, o || Au[0], a);
	}
	return i;
}
function Nu(e, t, n) {
	for (let r in t) r != "class" && r != "style" && r != "nodeName" && !(r in n) && e.removeAttribute(r);
	for (let r in n) r != "class" && r != "style" && r != "nodeName" && n[r] != t[r] && e.setAttribute(r, n[r]);
	if (t.class != n.class) {
		let r = t.class ? t.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
		for (let t = 0; t < r.length; t++) i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
		for (let t = 0; t < i.length; t++) r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
		e.classList.length == 0 && e.removeAttribute("class");
	}
	if (t.style != n.style) {
		if (t.style) {
			let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, r;
			for (; r = n.exec(t.style);) e.style.removeProperty(r[1]);
		}
		n.style && (e.style.cssText += n.style);
	}
}
function Pu(e, t, n) {
	return Mu(e, e, Au, ju(t, n, e.nodeType != 1));
}
function Fu(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function Iu(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var Lu = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Ru(e.node.content, e);
	}
	destroyBetween(e, t) {
		if (e != t) {
			for (let n = e; n < t; n++) this.top.children[n].destroy();
			this.top.children.splice(e, t - e), this.changed = !0;
		}
	}
	destroyRest() {
		this.destroyBetween(this.index, this.top.children.length);
	}
	syncToMarks(e, t, n, r) {
		let i = 0, a = this.stack.length >> 1, o = Math.min(a, e.length);
		for (; i < o && (i == a - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1;) i++;
		for (; i < a;) this.destroyRest(), this.top.dirty = hu, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
		for (; a < e.length;) {
			this.stack.push(this.top, this.index + 1);
			let i = -1, o = this.top.children.length;
			r < this.preMatch.index && (o = Math.min(this.index + 3, o));
			for (let t = this.index; t < o; t++) {
				let n = this.top.children[t];
				if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
					i = t;
					break;
				}
			}
			if (i < 0 && this.index < this.top.children.length) {
				let t = this.top.children[this.index];
				t instanceof Su && t.dirty != vu && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0);
			}
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = Su.create(this.top, e[a], t, n);
				this.top.children.splice(this.index, 0, r), this.top = r, this.changed = !0;
			}
			this.index = 0, a++;
		}
	}
	findNodeMatch(e, t, n, r) {
		let i = -1, a;
		if (r >= this.preMatch.index && (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && a.matchesNode(e, t, n)) i = this.top.children.indexOf(a, this.index);
		else for (let r = this.index, a = Math.min(this.top.children.length, r + 5); r < a; r++) {
			let a = this.top.children[r];
			if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
				i = r;
				break;
			}
		}
		return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
	}
	updateNodeAt(e, t, n, r, i) {
		let a = this.top.children[r];
		return a.dirty == vu && a.dom == a.contentDOM && (a.dirty = _u), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
	}
	findIndexWithChild(e) {
		for (;;) {
			let t = e.parentNode;
			if (!t) return -1;
			if (t == this.top.contentDOM) {
				let t = e.pmViewDesc;
				if (t) {
					for (let e = this.index; e < this.top.children.length; e++) if (this.top.children[e] == t) return e;
				}
				return -1;
			}
			e = t;
		}
	}
	updateNextNode(e, t, n, r, i, a) {
		for (let o = this.index; o < this.top.children.length; o++) {
			let s = this.top.children[o];
			if (s instanceof Cu) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != vu && Fu(t, s.outerDeco));
				if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = _u, u.updateChildren(r, a + 1), u.dirty = hu), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Fu(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = Cu.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = Cu.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new bu(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof Su;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof Tu) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Al || Ol) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new Eu(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
	}
};
function Ru(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof Su) n = e, r = e.children.length;
			else {
				s = e, r--;
				break;
			}
		} else if (n == t) break outer;
		else r = n.parent.children.indexOf(n), n = n.parent;
		let c = s.node;
		if (c) {
			if (c != e.child(i - 1)) break;
			--i, a.set(s, i), o.push(s);
		}
	}
	return {
		index: i,
		matched: a,
		matches: o.reverse()
	};
}
function zu(e, t) {
	return e.type.side - t.type.side;
}
function Bu(e, t, n, r) {
	let i = t.locals(e), a = 0;
	if (i.length == 0) {
		for (let n = 0; n < e.childCount; n++) {
			let o = e.child(n);
			r(o, i, t.forChild(a, o), n), a += o.nodeSize;
		}
		return;
	}
	let o = 0, s = [], c = null;
	for (let l = 0;;) {
		let u, d;
		for (; o < i.length && i[o].to == a;) {
			let e = i[o++];
			e.widget && (u ? (d ||= [u]).push(e) : u = e);
		}
		if (u) if (d) {
			d.sort(zu);
			for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
		} else n(u, l, !!c);
		let f, p;
		if (c) p = -1, f = c, c = null;
		else if (l < e.childCount) p = l, f = e.child(l++);
		else break;
		for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
		for (; o < i.length && i[o].from <= a && i[o].to > a;) s.push(i[o++]);
		let m = a + f.nodeSize;
		if (f.isText) {
			let e = m;
			o < i.length && i[o].from < e && (e = i[o].from);
			for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
			e < m && (c = f.cut(e - a), f = f.cut(0, e - a), m = e, p = -1);
		} else for (; o < i.length && i[o].to < m;) o++;
		let h = f.isInline && !f.isLeaf ? s.filter((e) => !e.inline) : s.slice();
		r(f, h, t.forChild(a, f), p), a = m;
	}
}
function Vu(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Hu(e, t, n, r) {
	for (let i = 0, a = 0; i < e.childCount && a <= r;) {
		let o = e.child(i++), s = a;
		if (a += o.nodeSize, !o.isText) continue;
		let c = o.text;
		for (; i < e.childCount;) {
			let t = e.child(i++);
			if (a += t.nodeSize, !t.isText) break;
			c += t.text;
		}
		if (a >= n) {
			if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
			let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
			if (e >= 0 && e + t.length + s >= n) return s + e;
			if (n == r && c.length >= r + t.length - s && c.slice(r - s, r - s + t.length) == t) return r;
		}
	}
	return -1;
}
function Uu(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function Wu(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (ml(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		let e = i.node;
		if (i && e.isAtom && G.isSelectable(e) && i.parent && !(e.isInline && fl(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new G(o == e ? s : r.resolve(e));
		}
	} else {
		if (n instanceof e.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
			let t = o, i = o;
			for (let r = 0; r < n.rangeCount; r++) {
				let a = n.getRangeAt(r);
				t = Math.min(t, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1));
			}
			if (t < 0) return null;
			[c, o] = i == e.state.selection.anchor ? [i, t] : [t, i], s = r.resolve(o);
		} else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
		if (c < 0) return null;
	}
	let u = r.resolve(c);
	if (!l) {
		let n = t == "pointer" || e.state.selection.head < s.pos && !a ? 1 : -1;
		l = td(e, u, s, n);
	}
	return l;
}
function Gu(e) {
	return e.editable ? e.hasFocus() : rd(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Ku(e, t = !1) {
	let n = e.state.selection;
	if ($u(e, n), !Gu(e)) return;
	let r = e.input.mouseDown;
	if (!t && Ol && r) {
		let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
		if (t.anchorNode && n.anchorNode && ol(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
			e.domObserver.setCurSelection();
			return;
		}
	}
	if (e.domObserver.disconnectSelection(), e.cursorWrapper) Qu(e);
	else {
		let { anchor: r, head: i } = n, a, o;
		qu && !(n instanceof W) && (n.$from.parent.inlineContent || (a = Ju(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = Ju(e, n.to))), e.docView.setSelection(r, i, e, t), qu && (a && Xu(a), o && Xu(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Zu(e));
	}
	e.domObserver.setCurSelection(), e.domObserver.connectSelection();
}
var qu = Al || Ol && kl < 63;
function Ju(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (Al && i && i.contentEditable == "false") return Yu(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return Yu(i);
		if (a) return Yu(a);
	}
}
function Yu(e) {
	return e.contentEditable = "true", Al && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function Xu(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function Zu(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Gu(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Qu(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, tl(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && wl && Tl <= 11 && (n.disabled = !0, n.disabled = !1);
}
function $u(e, t) {
	if (t instanceof G) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (ed(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else ed(e);
}
function ed(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function td(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || W.between(t, n, r);
}
function nd(e) {
	return e.editable && !e.hasFocus() ? !1 : rd(e);
}
function rd(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return e.dom.contains(t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode) && (e.editable || e.dom.contains(t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode));
	} catch {
		return !1;
	}
}
function id(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return ol(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function ad(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && U.findFrom(a, t);
}
function od(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function sd(e, t, n) {
	let r = e.state.selection;
	if (r instanceof W) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return od(e, new W(r.$anchor, a));
		}
		if (!r.empty) return !1;
		if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = ad(e.state, t);
			return n && n instanceof G ? od(e, n) : !1;
		}
		if (!(Ml && n.indexOf("m") > -1)) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? G.isSelectable(i) ? od(e, new G(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : Fl ? od(e, new W(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1 : !1;
		}
	} else if (r instanceof G && r.node.isInline) return od(e, new W(t > 0 ? r.$to : r.$from));
	else {
		let n = ad(e.state, t);
		return n ? od(e, n) : !1;
	}
}
function cd(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function ld(e, t) {
	let n = e.pmViewDesc;
	return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR");
}
function ud(e, t) {
	return t < 0 ? dd(e) : fd(e);
}
function dd(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (El && n.nodeType == 1 && r < cd(n) && ld(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (n.nodeType != 1) break;
		{
			let e = n.childNodes[r - 1];
			if (ld(e, -1)) i = n, a = --r;
			else if (e.nodeType == 3) n = e, r = n.nodeValue.length;
			else break;
		}
	} else if (pd(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && ld(t, -1);) i = n.parentNode, a = tl(t), t = t.previousSibling;
		if (t) n = t, r = cd(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? gd(e, n, r) : i && gd(e, i, a);
}
function fd(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = cd(n), a, o;
	for (;;) if (r < i) {
		if (n.nodeType != 1) break;
		let e = n.childNodes[r];
		if (ld(e, 1)) a = n, o = ++r;
		else break;
	} else if (pd(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && ld(t, 1);) a = t.parentNode, o = tl(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = cd(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && gd(e, a, o);
}
function pd(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function md(e, t) {
	for (; e && t == e.childNodes.length && !pl(e);) t = tl(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function hd(e, t) {
	for (; e && !t && !pl(e);) t = tl(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function gd(e, t, n) {
	if (t.nodeType != 3) {
		let e, r;
		(r = md(t, n)) ? (t = r, n = 0) : (e = hd(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection();
	if (!r) return;
	if (ml(r)) {
		let e = document.createRange();
		e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e);
	} else r.extend && r.extend(t, n);
	e.domObserver.setCurSelection();
	let { state: i } = e;
	setTimeout(() => {
		e.state == i && Ku(e);
	}, 50);
}
function _d(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(Ol || Nl) && n.parent.inlineContent) {
		let r = e.coordsAtPos(t);
		if (t > n.start()) {
			let n = e.coordsAtPos(t - 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left < r.left ? "ltr" : "rtl";
		}
		if (t < n.end()) {
			let n = e.coordsAtPos(t + 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left > r.left ? "ltr" : "rtl";
		}
	}
	return getComputedStyle(e.dom).direction == "rtl" ? "rtl" : "ltr";
}
function vd(e, t, n) {
	let r = e.state.selection;
	if (r instanceof W && !r.empty || n.indexOf("s") > -1 || Ml && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = ad(e.state, t);
		if (n && n instanceof G) return od(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Js ? U.near(n, t) : U.findFrom(n, t);
		return o ? od(e, o) : !1;
	}
	return !1;
}
function yd(e, t) {
	if (!(e.state.selection instanceof W)) return !0;
	let { $head: n, $anchor: r, empty: i } = e.state.selection;
	if (!n.sameParent(r)) return !0;
	if (!i) return !1;
	if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
	let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
	if (a && !a.isText) {
		let r = e.state.tr;
		return t < 0 ? r.delete(n.pos - a.nodeSize, n.pos) : r.delete(n.pos, n.pos + a.nodeSize), e.dispatch(r), !0;
	}
	return !1;
}
function bd(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function xd(e) {
	if (!Al || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && t.nodeType == 1 && n == 0 && t.firstChild && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		bd(e, n, "true"), setTimeout(() => bd(e, n, "false"), 20);
	}
	return !1;
}
function Sd(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function Cd(e, t) {
	let n = t.keyCode, r = Sd(t);
	if (n == 8 || Ml && n == 72 && r == "c") return yd(e, -1) || ud(e, -1);
	if (n == 46 && !t.shiftKey || Ml && n == 68 && r == "c") return yd(e, 1) || ud(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || Ml && n == 66 && r == "c") {
		let t = n == 37 ? _d(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return sd(e, t, r) || ud(e, t);
	}
	if (n == 39 || Ml && n == 70 && r == "c") {
		let t = n == 39 ? _d(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return sd(e, t, r) || ud(e, t);
	}
	return n == 38 || Ml && n == 80 && r == "c" ? vd(e, -1, r) || ud(e, -1) : n == 40 || Ml && n == 78 && r == "c" ? xd(e) || vd(e, 1, r) || ud(e, 1) : !(r != (Ml ? "m" : "c") || n != 66 && n != 73 && n != 89 && n != 90);
}
function wd(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || xo.fromSchema(e.state.schema), s = Pd(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && l.nodeType == 1 && (u = Nd[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && l.nodeType == 1 && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function Td(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new H(B.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = xo.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = Ld(n), Fl && Rd(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && e.nodeType != 1;) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || oo.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !Ed.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = zd(Md(s, +u[1], +u[2]), u[4]);
	else if (s = H.maxOpen(Dd(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = Md(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
var Ed = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Dd(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && kd(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = Ad(a[a.length - 1], i.length));
				let n = Od(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return B.from(a);
	}
	return e;
}
function Od(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, B.from(e));
	return e;
}
function kd(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = kd(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(B.from(Od(n, e, i + 1))));
	}
}
function Ad(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, Ad(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(B.empty, !0);
	return e.copy(n.append(r));
}
function jd(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = jd(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(B.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function Md(e, t, n) {
	return t < e.openStart && (e = new H(jd(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new H(jd(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var Nd = {
	thead: ["table"],
	tbody: ["table"],
	tfoot: ["table"],
	caption: ["table"],
	colgroup: ["table"],
	col: ["table", "colgroup"],
	tr: ["table", "tbody"],
	td: [
		"table",
		"tbody",
		"tr"
	],
	th: [
		"table",
		"tbody",
		"tr"
	]
};
function Pd() {
	return document.implementation.createHTMLDocument("title");
}
var Fd = null;
function Id(e) {
	let t = window.trustedTypes;
	return t ? (Fd ||= t.defaultPolicy || t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e }), Fd.createHTML(e)) : e;
}
function Ld(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = Pd(), r = n.body, i = /<([a-z][^>\s]+)/i.exec(e), a;
	if ((a = i && Nd[i[1].toLowerCase()]) && (e = a.map((e) => "<" + e + ">").join("") + e + a.map((e) => "</" + e + ">").reverse().join("")), r.innerHTML = Id(e), a) for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
	for (let e = 0; e < n.styleSheets.length; e++) {
		let t = n.styleSheets[e];
		for (let e = 0; e < t.rules.length; e++) {
			let n = t.rules[e];
			if (n instanceof CSSStyleRule) {
				let e = r.querySelectorAll(n.selectorText);
				for (let t = 0; t < e.length; t++) e[t].style.cssText += n.style.cssText;
			}
		}
	}
	return r;
}
function Rd(e) {
	let t = e.querySelectorAll(Ol ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function zd(e, t) {
	if (!e.size) return e;
	let n = e.content.firstChild.type.schema, r;
	try {
		r = JSON.parse(t);
	} catch {
		return e;
	}
	let { content: i, openStart: a, openEnd: o } = e;
	for (let e = r.length - 2; e >= 0; e -= 2) {
		let t = n.nodes[r[e]];
		if (!t || t.hasRequiredAttrs()) break;
		i = B.from(t.create(r[e + 1], i)), a++, o++;
	}
	return new H(i, a, o);
}
var Bd = {}, Vd = {}, Hd = {
	touchstart: !0,
	touchmove: !0
}, Ud = class {
	constructor() {
		this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = {
			time: 0,
			x: 0,
			y: 0,
			type: "",
			button: 0
		}, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = Object.create(null), this.hideSelectionGuard = null;
	}
};
function Wd(e) {
	for (let t in Bd) {
		let n = Bd[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			Yd(e, t) && !Jd(e, t) && (e.editable || !(t.type in Vd)) && n(e, t);
		}, Hd[t] ? { passive: !0 } : void 0);
	}
	Al && e.dom.addEventListener("input", () => null), qd(e);
}
function Gd(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function Kd(e) {
	e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function qd(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => Jd(e, t));
	});
}
function Jd(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function Yd(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function Xd(e, t) {
	!Jd(e, t) && Bd[t.type] && (e.editable || !(t.type in Vd)) && Bd[t.type](e, t);
}
Vd.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !mf(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(Pl && Ol && n.keyCode == 13))) if (n.keyCode != 229 && e.domObserver.forceFlush(), jl && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
		let t = Date.now();
		e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
			e.input.lastIOSEnter == t && (e.someProp("handleKeyDown", (t) => t(e, hl(13, "Enter"))), e.input.lastIOSEnter = 0);
		}, 200);
	} else e.someProp("handleKeyDown", (t) => t(e, n)) || Cd(e, n) ? n.preventDefault() : Gd(e, "key");
}, Vd.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, Vd.keypress = (e, t) => {
	let n = t;
	if (mf(e) || !n.charCode || n.ctrlKey && !n.altKey || Ml && n.metaKey) return;
	if (e.someProp("handleKeyPress", (t) => t(e, n))) {
		n.preventDefault();
		return;
	}
	let r = e.state.selection;
	if (!(r instanceof W) || !r.$from.sameParent(r.$to)) {
		let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
		!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
	}
};
function Zd(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Qd(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function $d(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function ef(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	n == "pointer" && r.setMeta("pointer", !0), e.dispatch(r);
}
function tf(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && G.isSelectable(r) ? (ef(e, new G(n), "pointer"), !0) : !1;
}
function nf(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof G && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (G.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i != null && (ef(e, G.create(e.state.doc, i), "pointer"), !0);
}
function rf(e, t, n, r, i) {
	return $d(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? nf(e, n) : tf(e, n));
}
function af(e, t, n, r) {
	return $d(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function of(e, t, n, r) {
	return $d(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || sf(e, n, r);
}
function sf(e, t, n) {
	if (n.button != 0) return !1;
	let r = cf(e, t, !0), i = e.state.doc;
	return r ? (ef(e, r, "pointer"), r instanceof W && i.eq(e.state.doc) && (e.input.mouseDown = new pf(e, r)), !0) : !1;
}
function cf(e, t, n) {
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? W.create(r, 0, r.content.size) : null;
	let i = r.resolve(t);
	for (let e = i.depth + 1; e > 0; e--) {
		let t = e > i.depth ? i.nodeAfter : i.node(e), a = i.before(e);
		if (t.inlineContent) return W.create(r, a + 1, a + 1 + t.content.size);
		if (n && G.isSelectable(t)) return G.create(r, a);
	}
	return null;
}
function lf(e) {
	return bf(e);
}
var uf = Ml ? "metaKey" : "ctrlKey";
Bd.mousedown = (e, t) => {
	let n = t;
	e.input.shiftKey = n.shiftKey;
	let r = lf(e), i = Date.now(), a = "singleClick";
	i - e.input.lastClick.time < 500 && Qd(n, e.input.lastClick) && !n[uf] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
		time: i,
		x: n.clientX,
		y: n.clientY,
		type: a,
		button: n.button
	}, e.input.mouseDown && e.input.mouseDown.done();
	let o = e.posAtCoords(Zd(n));
	o && (a == "singleClick" ? e.input.mouseDown = new ff(e, o, n, !!r) : (a == "doubleClick" ? af : of)(e, o.pos, o.inside, n) ? n.preventDefault() : Gd(e, "pointer"));
};
var df = class {
	constructor(e) {
		this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
	}
	up(e) {
		this.done();
	}
	move(e) {
		e.buttons == 0 && this.done();
	}
	done() {
		this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
	}
	delaySelUpdate() {
		return !1;
	}
}, ff = class extends df {
	constructor(e, t, n, r) {
		super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[uf], this.allowDefault = n.shiftKey;
		let i, a;
		if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
		else {
			let n = e.state.doc.resolve(t.pos);
			i = n.parent, a = n.depth ? n.before() : 0;
		}
		let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
		this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
		let { selection: c } = e.state;
		n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof G && c.from <= a && c.to > a) && (this.mightDrag = {
			node: i,
			pos: a,
			addAttr: !!(this.target && !this.target.draggable),
			setUneditable: !!(this.target && El && !this.target.hasAttribute("contentEditable"))
		}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
			this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
		}, 20), this.view.domObserver.start()), Gd(e, "pointer");
	}
	done() {
		super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
			this.view.isDestroyed || Ku(this.view);
		});
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.pos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Zd(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Gd(this.view, "pointer") : rf(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || Al && this.mightDrag && !this.mightDrag.node.isAtom || Ol && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (ef(this.view, U.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : Gd(this.view, "pointer");
	}
	move(e) {
		this.updateAllowDefault(e), Gd(this.view, "pointer"), super.move(e);
	}
	updateAllowDefault(e) {
		!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
	}
	delaySelUpdate() {
		return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
	}
}, pf = class extends df {
	constructor(e, t) {
		super(e), this.startSelection = t, this.startDoc = e.state.doc;
	}
	move(e) {
		if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
			this.done();
			return;
		}
		e.preventDefault(), Gd(this.view, "pointer");
		let t = this.view.posAtCoords(Zd(e)), n = t && cf(this.view, t.inside, !1);
		if (!n) return;
		let { doc: r } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
		ef(this.view, W.create(r, a, o), "pointer");
	}
};
Bd.touchstart = (e) => {
	e.input.lastTouch = Date.now(), lf(e), Gd(e, "pointer");
}, Bd.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Gd(e, "pointer");
}, Bd.contextmenu = (e) => lf(e);
function mf(e, t) {
	return e.composing ? !0 : Al && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var hf = Pl ? 5e3 : -1;
Vd.compositionstart = Vd.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof W && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || Ol && Nl && gf(e))) e.markCursor = e.state.storedMarks || n.marks(), bf(e, !0), e.markCursor = null;
		else if (bf(e, !t.selection.empty), El && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
			let t = e.domSelectionRange();
			for (let n = t.focusNode, r = t.focusOffset; n && n.nodeType == 1 && r != 0;) {
				let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
				if (!t) break;
				if (t.nodeType == 3) {
					let n = e.domSelection();
					n && n.collapse(t, t.nodeValue.length);
					break;
				}
				n = t, r = -1;
			}
		}
		e.input.composing = !0;
	}
	_f(e, hf);
};
function gf(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return r.nodeType == 1 && r.contentEditable == "false";
}
Vd.compositionend = (e, t) => {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, _f(e, 20));
};
function _f(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => bf(e), t));
}
function vf(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function yf(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = ul(t.focusNode, t.focusOffset), r = dl(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (!(!e || !e.isText(n.nodeValue))) return r;
		}
	}
	return n || r;
}
function bf(e, t = !1) {
	if (!(Pl && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), vf(e), t || e.docView && e.docView.dirty) {
			let n = Wu(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function xf(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var Sf = wl && Tl < 15 || jl && Il < 604;
Bd.copy = Vd.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = Sf ? null : n.clipboardData, { dom: o, text: s } = wd(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : xf(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Cf(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function wf(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? Tf(e, r.value, null, i, t) : Tf(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function Tf(e, t, n, r, i) {
	let a = Td(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || H.empty))) return !0;
	if (!a) return !1;
	let o = Cf(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Ef(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
Vd.paste = (e, t) => {
	let n = t;
	if (e.composing && !Pl) return;
	let r = Sf ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && Tf(e, Ef(r), r.getData("text/html"), i, n) ? n.preventDefault() : wf(e, n);
};
var Df = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, Of = Ml ? "altKey" : "ctrlKey";
function kf(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[Of] : !n;
}
Bd.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(Zd(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof G ? i.to - 1 : i.to))) {
		if (r && r.mightDrag) o = G.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && n.target.nodeType == 1) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = G.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = wd(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !Ol || kl > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(Sf ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", Sf || n.dataTransfer.setData("text/plain", c), e.dragging = new Df(l, kf(e, n), o);
}, Bd.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, Vd.dragover = Vd.dragenter = (e, t) => t.preventDefault(), Vd.drop = (e, t) => {
	try {
		Af(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function Af(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(Zd(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = Td(e, Ef(t.dataTransfer), Sf ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && kf(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || H.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? Ss(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && G.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new G(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(td(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
Bd.focus = (e) => {
	e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0, setTimeout(() => {
		e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && Ku(e);
	}, 20));
}, Bd.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
}, Bd.beforeinput = (e, t) => {
	if (Pl && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp("handleKeyDown", (t) => t(e, hl(8, "Backspace"))))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in Vd) Bd[e] = Vd[e];
function jf(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var Mf = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || Lf, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new Ff(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && jf(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, Nf = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Lf;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new Ff(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && jf(this.attrs, t.attrs) && jf(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, Pf = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Lf;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new Ff(i.pos - n, a.pos - n, this);
	}
	valid(e, t) {
		let { index: n, offset: r } = e.content.findIndex(t.from), i;
		return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && jf(this.attrs, t.attrs) && jf(this.spec, t.spec);
	}
	destroy() {}
}, Ff = class e {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.type = n;
	}
	copy(t, n) {
		return new e(t, n, this.type);
	}
	eq(e, t = 0) {
		return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
	}
	map(e, t, n) {
		return this.type.map(e, this, t, n);
	}
	static widget(t, n, r) {
		return new e(t, t, new Mf(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new Nf(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new Pf(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof Nf;
	}
	get widget() {
		return this.type instanceof Mf;
	}
}, If = [], Lf = {}, Rf = class e {
	constructor(e, t) {
		this.local = e.length ? e : If, this.children = t.length ? t : If;
	}
	static create(e, t) {
		return t.length ? Kf(t, e, 0, Lf) : zf;
	}
	find(e, t, n) {
		let r = [];
		return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r;
	}
	findInner(e, t, n, r, i) {
		for (let a = 0; a < this.local.length; a++) {
			let o = this.local[a];
			o.from <= t && o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r));
		}
		for (let a = 0; a < this.children.length; a += 3) if (this.children[a] < t && this.children[a + 1] > e) {
			let o = this.children[a] + 1;
			this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
		}
	}
	map(e, t, n) {
		return this == zf || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Lf);
	}
	mapInner(t, n, r, i, a) {
		let o;
		for (let e = 0; e < this.local.length; e++) {
			let s = this.local[e].map(t, r, i);
			s && s.type.valid(n, s) ? (o ||= []).push(s) : a.onRemove && a.onRemove(this.local[e].spec);
		}
		return this.children.length ? Vf(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(qf), If) : zf;
	}
	add(t, n) {
		return n.length ? this == zf ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = Wf(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, Kf(s, e, o + 1, Lf)), a += 3;
			}
		});
		let o = Hf(a ? Gf(n) : n, -r);
		for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || o.splice(e--, 1);
		return new e(o.length ? this.local.concat(o).sort(qf) : this.local, i || this.children);
	}
	remove(e) {
		return e.length == 0 || this == zf ? this : this.removeInner(e, 0);
	}
	removeInner(t, n) {
		let r = this.children, i = this.local;
		for (let e = 0; e < r.length; e += 3) {
			let i, a = r[e] + n, o = r[e + 1] + n;
			for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
			if (!i) continue;
			r == this.children && (r = this.children.slice());
			let s = r[e + 2].removeInner(i, a + 1);
			s == zf ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
		}
		if (i.length) {
			for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
		}
		return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : zf;
	}
	forChild(t, n) {
		if (this == zf) return this;
		if (n.isLeaf) return e.empty;
		let r, i;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
			this.children[e] == t && (r = this.children[e + 2]);
			break;
		}
		let a = t + 1, o = a + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < o && t.to > a && t.type instanceof Nf) {
				let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(qf), If);
			return r ? new Bf([t, r]) : t;
		}
		return r || zf;
	}
	eq(t) {
		if (this == t) return !0;
		if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
		for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
		return !0;
	}
	locals(e) {
		return Jf(this.localsInner(e));
	}
	localsInner(e) {
		if (this == zf) return If;
		if (e.inlineContent || !this.local.some(Nf.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof Nf || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
Rf.empty = new Rf([], []), Rf.removeOverlap = Jf;
var zf = Rf.empty, Bf = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, Lf));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return Rf.empty;
		let r = [];
		for (let i = 0; i < this.members.length; i++) {
			let a = this.members[i].forChild(t, n);
			a != zf && (a instanceof e ? r = r.concat(a.members) : r.push(a));
		}
		return e.from(r);
	}
	eq(t) {
		if (!(t instanceof e) || t.members.length != this.members.length) return !1;
		for (let e = 0; e < this.members.length; e++) if (!this.members[e].eq(t.members[e])) return !1;
		return !0;
	}
	locals(e) {
		let t, n = !0;
		for (let r = 0; r < this.members.length; r++) {
			let i = this.members[r].localsInner(e);
			if (i.length) if (!t) t = i;
			else {
				n &&= (t = t.slice(), !1);
				for (let e = 0; e < i.length; e++) t.push(i[e]);
			}
		}
		return t ? Jf(n ? t : t.sort(qf)) : If;
	}
	static from(t) {
		switch (t.length) {
			case 0: return zf;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof Rf) ? t : t.reduce((e, t) => e.concat(t instanceof Rf ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function Vf(e, t, n, r, i, a, o) {
	let s = e.slice();
	for (let e = 0, t = a; e < n.maps.length; e++) {
		let r = 0;
		n.maps[e].forEach((e, n, i, a) => {
			let o = a - i - (n - e);
			for (let i = 0; i < s.length; i += 3) {
				let a = s[i + 1];
				if (a < 0 || e > a + t - r) continue;
				let c = s[i] + t - r;
				n >= c ? s[i + 1] = e <= c ? -2 : -1 : e >= t && o && (s[i] += o, s[i + 1] += o);
			}
			r += o;
		}), t = n.maps[e].map(t, -1);
	}
	let c = !1;
	for (let t = 0; t < s.length; t += 3) if (s[t + 1] < 0) {
		if (s[t + 1] == -2) {
			c = !0, s[t + 1] = -1;
			continue;
		}
		let l = n.map(e[t] + a), u = l - i;
		if (u < 0 || u >= r.content.size) {
			c = !0;
			continue;
		}
		let d = n.map(e[t + 1] + a, -1) - i, { index: f, offset: p } = r.content.findIndex(u), m = r.maybeChild(f);
		if (m && p == u && p + m.nodeSize == d) {
			let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
			r == zf ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = Kf(Uf(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new Rf(t.sort(qf), s);
}
function Hf(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new Ff(i.from + t, i.to + t, i.type));
	}
	return n;
}
function Uf(e, t, n, r, i, a, o) {
	function s(e, t) {
		for (let a = 0; a < e.local.length; a++) {
			let s = e.local[a].map(r, i, t);
			s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec);
		}
		for (let n = 0; n < e.children.length; n += 3) s(e.children[n + 2], e.children[n] + t + 1);
	}
	for (let n = 0; n < e.length; n += 3) e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
	return n;
}
function Wf(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function Gf(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function Kf(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = Wf(e, t, o + n);
		if (s) {
			a = !0;
			let e = Kf(s, t, n + o + 1, r);
			e != zf && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = Hf(a ? Gf(e) : e, -n).sort(qf);
	for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
	return o.length || i.length ? new Rf(o, i) : zf;
}
function qf(e, t) {
	return e.from - t.from || e.to - t.to;
}
function Jf(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) {
				a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), Yf(t, i + 1, a.copy(r.to, a.to)));
				continue;
			}
			a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), Yf(t, i, r.copy(a.from, r.to)));
			break;
		}
	}
	return t;
}
function Yf(e, t, n) {
	for (; t < e.length && qf(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function Xf(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != zf && t.push(r);
	}), e.cursorWrapper && t.push(Rf.create(e.state.doc, [e.cursorWrapper.deco])), Bf.from(t);
}
var Zf = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, Qf = wl && Tl <= 11, $f = class {
	constructor() {
		this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
	}
	set(e) {
		this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
	}
	clear() {
		this.anchorNode = this.focusNode = null;
	}
	eq(e) {
		return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
	}
}, ep = class {
	constructor(e, t) {
		this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new $f(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			wl && Tl <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : Al && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		}), Qf && (this.onCharData = (e) => {
			this.queue.push({
				target: e.target,
				type: "characterData",
				oldValue: e.prevValue
			}), this.flushSoon();
		}), this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	flushSoon() {
		this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
			this.flushingSoon = -1, this.flush();
		}, 20));
	}
	forceFlush() {
		this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
	}
	start() {
		this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Zf)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
	}
	stop() {
		if (this.observer) {
			let e = this.observer.takeRecords();
			if (e.length) {
				for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
				window.setTimeout(() => this.flush(), 20);
			}
			this.observer.disconnect();
		}
		this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
	}
	connectSelection() {
		this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
	}
	disconnectSelection() {
		this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
	}
	suppressSelectionUpdates() {
		this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
	}
	onSelectionChange() {
		if (nd(this.view)) {
			if (this.suppressingSelectionUpdates) return Ku(this.view);
			if (wl && Tl <= 11 && !this.view.state.selection.empty) {
				let e = this.view.domSelectionRange();
				if (e.focusNode && ol(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
			}
			this.flush();
		}
	}
	setCurSelection() {
		this.currentSelection.set(this.view.domSelectionRange());
	}
	ignoreSelectionChange(e) {
		if (!e.focusNode) return !0;
		let t = /* @__PURE__ */ new Set(), n;
		for (let n = e.focusNode; n; n = nl(n)) t.add(n);
		for (let r = e.anchorNode; r; r = nl(r)) if (t.has(r)) {
			n = r;
			break;
		}
		let r = n && this.view.docView.nearestDesc(n);
		if (r && r.ignoreMutation({
			type: "selection",
			target: n.nodeType == 3 ? n.parentNode : n
		})) return this.setCurSelection(), !0;
	}
	pendingRecords() {
		if (this.observer) for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	flush() {
		let { view: e } = this;
		if (!e.docView || this.flushingSoon > -1) return;
		let t = this.pendingRecords();
		t.length && (this.queue = []);
		let n = e.domSelectionRange(), r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && nd(e) && !this.ignoreSelectionChange(n), i = -1, a = -1, o = !1, s = [];
		if (e.editable) for (let e = 0; e < t.length; e++) {
			let n = this.registerMutation(t[e], s);
			n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || Ol && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((e) => e.type == "childList" && e.removedNodes.length))) {
			for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
				let t = e.nextSibling;
				for (; t && t.nodeType == 1;) {
					if (t.contentEditable == "false") {
						e.parentNode.removeChild(e);
						break;
					}
					t = t.firstChild;
				}
			}
		} else if (El && s.length) {
			let t = s.filter((e) => e.nodeName == "BR");
			if (t.length == 2) {
				let [e, n] = t;
				e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
			} else {
				let { focusNode: n } = this.currentSelection;
				for (let r of t) {
					let t = r.parentNode;
					t && t.nodeName == "LI" && (!n || op(e, n) != t) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && ml(n) && (c = Wu(e)) && c.eq(U.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Ku(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), rp(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, sp(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || Ku(e), this.currentSelection.set(n));
	}
	registerMutation(e, t) {
		if (t.indexOf(e.target) > -1) return null;
		let n = this.view.docView.nearestDesc(e.target);
		if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
		if (e.type == "childList") {
			for (let n = 0; n < e.addedNodes.length; n++) {
				let r = e.addedNodes[n];
				t.push(r), r.nodeType == 3 && (this.lastChangedTextNode = r);
			}
			if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
				from: n.posBefore,
				to: n.posAfter
			};
			let r = e.previousSibling, i = e.nextSibling;
			if (wl && Tl <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
				let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
				(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
			}
			let a = r && r.parentNode == e.target ? tl(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? tl(i) : e.target.childNodes.length;
			return {
				from: o,
				to: n.localPosFromDOM(e.target, s, 1)
			};
		}
		return e.type == "attributes" ? {
			from: n.posAtStart - n.border,
			to: n.posAtEnd + n.border
		} : (this.lastChangedTextNode = e.target, {
			from: n.posAtStart,
			to: n.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		});
	}
}, tp = /* @__PURE__ */ new WeakMap(), np = !1;
function rp(e) {
	if (!tp.has(e) && (tp.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = El, np) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), np = !0;
	}
}
function ip(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return ol(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function ap(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return ip(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? ip(e, n) : null;
}
function op(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function sp(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSelectionRange();
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || e.nodeType != 1 || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
function cp(e, t, n, r) {
	let { node: i, fromOffset: a, toOffset: o, from: s, to: c } = e.docView.parseRange(t, n), l = e.domSelectionRange(), u, d = l.anchorNode;
	if (d && e.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (u = [{
		node: d,
		offset: l.anchorOffset
	}], ml(l) || u.push({
		node: l.focusNode,
		offset: l.focusOffset
	})), Ol && e.input.lastKeyCode === 8) for (let e = o; e > a; e--) {
		let t = i.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			o = e;
			break;
		}
		if (!n || n.size) break;
	}
	let f = e.state.doc, p = e.someProp("domParser") || oo.fromSchema(e.state.schema), m = f.resolve(s), h = null, g = p.parse(i, {
		topNode: m.parent,
		topMatch: m.parent.contentMatchAt(m.index()),
		topOpen: !0,
		from: a,
		to: o,
		preserveWhitespace: m.parent.type.whitespace != "pre" || "full",
		findPositions: u,
		ruleFromNode: lp(r),
		context: m
	});
	if (u && u[0].pos != null) {
		let e = u[0].pos, t = u[1] && u[1].pos;
		t ??= e, h = {
			anchor: e + s,
			head: t + s
		};
	}
	return {
		doc: g,
		sel: h,
		from: s,
		to: c
	};
}
var lp = (e) => (t) => {
	let n = t.pmViewDesc;
	if (n) return n.parseRule(e);
	if (t.nodeName == "BR" && t.parentNode) {
		if (Al && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		}
		if (t.parentNode.lastChild == t || Al && /^(tr|table)$/i.test(t.parentNode.nodeName)) return { ignore: !0 };
	} else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}, up = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function dp(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = Wu(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (Ol && Pl && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp("handleKeyDown", (t) => t(e, hl(13, "Enter")))) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = cp(e, t, n, i), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = gp(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (jl && e.input.lastIOSEnter > Date.now() - 225 || Pl) && i.some((e) => e.nodeType == 1 && !up.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp("handleKeyDown", (t) => t(e, hl(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) if (r && c instanceof W && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
		start: c.from,
		endA: c.to,
		endB: c.to
	};
	else {
		if (l.sel) {
			let t = fp(e, e.state.doc, l.sel);
			if (t && !t.eq(e.state.selection)) {
				let n = e.state.tr.setSelection(t);
				a && n.setMeta("composition", a), e.dispatch(n);
			}
		}
		return;
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof W && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), wl && Tl <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((jl && e.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !v && h.pos < l.doc.content.size && (!h.sameParent(g) || !h.parent.inlineContent) && h.pos < g.pos && !/\S/.test(l.doc.textBetween(h.pos, g.pos, "", ""))) && e.someProp("handleKeyDown", (t) => t(e, hl(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && mp(u, m.start, m.endA, h, g) && e.someProp("handleKeyDown", (t) => t(e, hl(8, "Backspace")))) {
		Pl && Ol && e.domObserver.suppressSelectionUpdates();
		return;
	}
	Ol && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), Pl && !v && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
		e.someProp("handleKeyDown", function(t) {
			return t(e, hl(13, "Enter"));
		});
	}, 20));
	let y = m.start, b = m.endA, x = (t) => {
		let n = t || e.state.tr.replace(y, b, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = fp(e, n.doc, l.sel);
			t && !(Ol && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == y || t.head == n.mapping.map(b) - 1) || wl && t.empty && t.head == y) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, S;
	if (v) if (h.pos == g.pos) {
		wl && Tl <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Ku(e), 20));
		let t = x(e.state.tr.delete(y, b)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
		n && t.ensureMarks(n), e.dispatch(t);
	} else if (m.endA == m.endB && (S = pp(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
		let t = x(e.state.tr);
		S.type == "add" ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark), e.dispatch(t);
	} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
		let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => x(e.state.tr.insertText(t, y, b));
		e.someProp("handleTextInput", (r) => r(e, y, b, t, n)) || e.dispatch(n());
	} else e.dispatch(x());
	else e.dispatch(x());
}
function fp(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : td(e, t.resolve(n.anchor), t.resolve(n.head));
}
function pp(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (B.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function mp(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || hp(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.isTextblock) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(hp(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || hp(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function hp(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function gp(e, t, n, r, i) {
	let a = e.findDiffStart(t, n), o = n + e.size, s = n + t.size;
	if (a == null) return null;
	let { a: c, b: l } = e.findDiffEnd(t, o, s);
	if (i == "end") {
		let e = Math.max(0, a - Math.min(c, l));
		r -= c + e - a;
	}
	if (c < a && o < s) {
		let e = r <= a && r >= c ? a - r : 0;
		a -= e, l = a + (l - c), c = a;
	} else if (l < a) {
		let e = r <= a && r >= l ? a - r : 0;
		a -= e, c = a + (c - l), l = a;
	}
	return {
		start: a,
		endA: c,
		endB: l
	};
}
var _p = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Ud(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(wp), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = bp(this), yp(this), this.nodeViews = Sp(this), this.docView = wu(this.state.doc, vp(this), Xf(this), this.dom, this), this.domObserver = new ep(this, (e, t, n, r) => dp(this, e, t, n, r)), this.domObserver.start(), Wd(this), this.updatePluginViews();
	}
	get composing() {
		return this.input.composing;
	}
	get props() {
		if (this._props.state != this.state) {
			let e = this._props;
			this._props = {};
			for (let t in e) this._props[t] = e[t];
			this._props.state = this.state;
		}
		return this._props;
	}
	update(e) {
		e.handleDOMEvents != this._props.handleDOMEvents && qd(this);
		let t = this._props;
		this._props = e, e.plugins && (e.plugins.forEach(wp), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
	}
	setProps(e) {
		let t = {};
		for (let e in this._props) t[e] = this._props[e];
		t.state = this.state;
		for (let n in e) t[n] = e[n];
		this.update(t);
	}
	updateState(e) {
		this.updateStateInner(e, this._props);
	}
	updateStateInner(e, t) {
		let n = this.state, r = !1, i = !1;
		e.storedMarks && this.composing && (vf(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = Sp(this);
			Cp(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && qd(this), this.editable = bp(this), yp(this);
		let o = Xf(this), s = vp(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && Vl(this);
		if (i) {
			this.domObserver.stop();
			let t = l && (wl || Ol) && !this.composing && !n.selection.empty && !e.selection.empty && xp(n.selection, e.selection);
			if (l) {
				let n = Ol ? this.trackWrites = this.domSelectionRange().focusNode : null;
				this.composing && (this.input.compositionNode = yf(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = wu(e.doc, s, o, this.dom, this)), n && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (t = !0);
			}
			let i = this.input.mouseDown;
			t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && id(this) && i.delaySelUpdate()) ? Ku(this, t) : ($u(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
		}
		this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && Ul(u);
	}
	scrollToSelection() {
		let e = this.domSelectionRange().focusNode;
		if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) && !this.someProp("handleScrollToSelection", (e) => e(this))) if (this.state.selection instanceof G) {
			let t = this.docView.domAfterPos(this.state.selection.from);
			t.nodeType == 1 && Bl(this, t.getBoundingClientRect(), e);
		} else Bl(this, this.coordsAtPos(this.state.selection.head, 1), e);
	}
	destroyPluginViews() {
		let e;
		for (; e = this.pluginViews.pop();) e.destroy && e.destroy();
	}
	updatePluginViews(e) {
		if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
			this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
			for (let e = 0; e < this.directPlugins.length; e++) {
				let t = this.directPlugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
			for (let e = 0; e < this.state.plugins.length; e++) {
				let t = this.state.plugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
		} else for (let t = 0; t < this.pluginViews.length; t++) {
			let n = this.pluginViews[t];
			n.update && n.update(this, e);
		}
	}
	updateDraggedNode(e, t) {
		let n = e.node, r = -1;
		if (n.from < this.state.doc.content.size && this.state.doc.nodeAt(n.from) == n.node) r = n.from;
		else {
			let e = n.from + (this.state.doc.content.size - t.doc.content.size);
			(e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) == n.node && (r = e);
		}
		this.dragging = new Df(e.slice, e.move, r < 0 ? void 0 : G.create(this.state.doc, r));
	}
	someProp(e, t) {
		let n = this._props && this._props[e], r;
		if (n != null && (r = t ? t(n) : n)) return r;
		for (let n = 0; n < this.directPlugins.length; n++) {
			let i = this.directPlugins[n].props[e];
			if (i != null && (r = t ? t(i) : i)) return r;
		}
		let i = this.state.plugins;
		if (i) for (let n = 0; n < i.length; n++) {
			let a = i[n].props[e];
			if (a != null && (r = t ? t(a) : a)) return r;
		}
	}
	hasFocus() {
		if (wl) {
			let e = this.root.activeElement;
			if (e == this.dom) return !0;
			if (!e || !this.dom.contains(e)) return !1;
			for (; e && this.dom != e && this.dom.contains(e);) {
				if (e.contentEditable == "false") return !1;
				e = e.parentElement;
			}
			return !0;
		}
		return this.root.activeElement == this.dom;
	}
	focus() {
		this.domObserver.stop(), this.editable && Kl(this.dom), Ku(this), this.domObserver.start();
	}
	get root() {
		let e = this._root;
		if (e == null) {
			for (let e = this.dom.parentNode; e; e = e.parentNode) if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e;
		}
		return e || document;
	}
	updateRoot() {
		this._root = null;
	}
	posAtCoords(e) {
		return eu(this, e);
	}
	coordsAtPos(e, t = 1) {
		return iu(this, e, t);
	}
	domAtPos(e, t = 0) {
		return this.docView.domFromPos(e, t);
	}
	nodeDOM(e) {
		let t = this.docView.descAt(e);
		return t ? t.nodeDOM : null;
	}
	posAtDOM(e, t, n = -1) {
		let r = this.docView.posFromDOM(e, t, n);
		if (r == null) throw RangeError("DOM position not inside the editor");
		return r;
	}
	endOfTextblock(e, t) {
		return mu(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return Tf(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return Tf(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return wd(this, e);
	}
	destroy() {
		this.docView && (Kd(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Xf(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, al());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return Xd(this, e);
	}
	domSelectionRange() {
		let e = this.domSelection();
		return e ? Al && this.root.nodeType === 11 && gl(this.dom.ownerDocument) == this.dom && ap(this, e) || e : {
			focusNode: null,
			focusOffset: 0,
			anchorNode: null,
			anchorOffset: 0
		};
	}
	domSelection() {
		return this.root.getSelection();
	}
};
_p.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function vp(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [Ff.node(0, e.state.doc.content.size, t)];
}
function yp(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: Ff.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function bp(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function xp(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function Sp(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function Cp(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function wp(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var Tp = {
	8: "Backspace",
	9: "Tab",
	10: "Enter",
	12: "NumLock",
	13: "Enter",
	16: "Shift",
	17: "Control",
	18: "Alt",
	20: "CapsLock",
	27: "Escape",
	32: " ",
	33: "PageUp",
	34: "PageDown",
	35: "End",
	36: "Home",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	44: "PrintScreen",
	45: "Insert",
	46: "Delete",
	59: ";",
	61: "=",
	91: "Meta",
	92: "Meta",
	106: "*",
	107: "+",
	108: ",",
	109: "-",
	110: ".",
	111: "/",
	144: "NumLock",
	145: "ScrollLock",
	160: "Shift",
	161: "Shift",
	162: "Control",
	163: "Control",
	164: "Alt",
	165: "Alt",
	173: "-",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
}, Ep = {
	48: ")",
	49: "!",
	50: "@",
	51: "#",
	52: "$",
	53: "%",
	54: "^",
	55: "&",
	56: "*",
	57: "(",
	59: ":",
	61: "+",
	173: "_",
	186: ":",
	187: "+",
	188: "<",
	189: "_",
	190: ">",
	191: "?",
	192: "~",
	219: "{",
	220: "|",
	221: "}",
	222: "\""
}, Dp = typeof navigator < "u" && /Mac/.test(navigator.platform), Op = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), kp = 0; kp < 10; kp++) Tp[48 + kp] = Tp[96 + kp] = String(kp);
for (var kp = 1; kp <= 24; kp++) Tp[kp + 111] = "F" + kp;
for (var kp = 65; kp <= 90; kp++) Tp[kp] = String.fromCharCode(kp + 32), Ep[kp] = String.fromCharCode(kp);
for (var Ap in Tp) Ep.hasOwnProperty(Ap) || (Ep[Ap] = Tp[Ap]);
function jp(e) {
	var t = !(Dp && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Op && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? Ep : Tp)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
//#endregion
//#region node_modules/prosemirror-keymap/dist/index.js
var Mp = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), Np = typeof navigator < "u" && /Win/.test(navigator.platform);
function Pp(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) Mp ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function Fp(e) {
	let t = Object.create(null);
	for (let n in e) t[Pp(n)] = e[n];
	return t;
}
function Ip(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function Lp(e) {
	return new K({ props: { handleKeyDown: Rp(e) } });
}
function Rp(e) {
	let t = Fp(e);
	return function(e, n) {
		let r = jp(n), i, a = t[Ip(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[Ip(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(Np && n.ctrlKey && n.altKey) && (i = Tp[n.keyCode]) && i != r) {
				let r = t[Ip(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
//#endregion
//#region node_modules/@tiptap/core/dist/index.js
var zp = Object.defineProperty, Bp = (e, t) => {
	for (var n in t) zp(e, n, {
		get: t[n],
		enumerable: !0
	});
};
function Vp(e) {
	let { state: t, transaction: n } = e, { selection: r } = n, { doc: i } = n, { storedMarks: a } = n;
	return {
		...t,
		apply: t.apply.bind(t),
		applyTransaction: t.applyTransaction.bind(t),
		plugins: t.plugins,
		schema: t.schema,
		reconfigure: t.reconfigure.bind(t),
		toJSON: t.toJSON.bind(t),
		get storedMarks() {
			return a;
		},
		get selection() {
			return r;
		},
		get doc() {
			return i;
		},
		get tr() {
			return r = n.selection, i = n.doc, a = n.storedMarks, n;
		}
	};
}
var Hp = class {
	constructor(e) {
		this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
	}
	get hasCustomState() {
		return !!this.customState;
	}
	get state() {
		return this.customState || this.editor.state;
	}
	get commands() {
		let { rawCommands: e, editor: t, state: n } = this, { view: r } = t, { tr: i } = n, a = this.buildProps(i);
		return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, (...e) => {
			let n = t(...e)(a);
			return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), n;
		}]));
	}
	get chain() {
		return () => this.createChain();
	}
	get can() {
		return () => this.createCan();
	}
	createChain(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = [], s = !!e, c = e || i.tr, l = () => (!s && t && !c.getMeta("preventDispatch") && !this.hasCustomState && a.dispatch(c), o.every((e) => e === !0)), u = {
			...Object.fromEntries(Object.entries(n).map(([e, n]) => [e, (...e) => {
				let r = this.buildProps(c, t), i = n(...e)(r);
				return o.push(i), u;
			}])),
			run: l
		};
		return u;
	}
	createCan(e) {
		let { rawCommands: t, state: n } = this, r = e || n.tr, i = this.buildProps(r, !1);
		return {
			...Object.fromEntries(Object.entries(t).map(([e, t]) => [e, (...e) => t(...e)({
				...i,
				dispatch: void 0
			})])),
			chain: () => this.createChain(r, !1)
		};
	}
	buildProps(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = {
			tr: e,
			editor: r,
			view: a,
			state: Vp({
				state: i,
				transaction: e
			}),
			dispatch: t ? () => void 0 : void 0,
			chain: () => this.createChain(e, t),
			can: () => this.createCan(e),
			get commands() {
				return Object.fromEntries(Object.entries(n).map(([e, t]) => [e, (...e) => t(...e)(o)]));
			}
		};
		return o;
	}
}, Up = {};
Bp(Up, {
	blur: () => Wp,
	clearContent: () => Gp,
	clearNodes: () => Kp,
	command: () => qp,
	createParagraphNear: () => Jp,
	cut: () => Yp,
	deleteCurrentNode: () => Xp,
	deleteNode: () => Qp,
	deleteRange: () => $p,
	deleteSelection: () => rm,
	enter: () => im,
	exitCode: () => am,
	extendMarkRange: () => fm,
	first: () => pm,
	focus: () => bm,
	forEach: () => xm,
	insertContent: () => Sm,
	insertContentAt: () => Om,
	insertDefaultBlock: () => Am,
	joinBackward: () => Nm,
	joinDown: () => Mm,
	joinForward: () => Pm,
	joinItemBackward: () => Fm,
	joinItemForward: () => Im,
	joinTextblockBackward: () => Lm,
	joinTextblockForward: () => Rm,
	joinUp: () => jm,
	keyboardShortcut: () => Vm,
	lift: () => Um,
	liftEmptyBlock: () => Wm,
	liftListItem: () => Gm,
	newlineInCode: () => Km,
	resetAttributes: () => Ym,
	scrollIntoView: () => Xm,
	selectAll: () => Zm,
	selectNodeBackward: () => Qm,
	selectNodeForward: () => $m,
	selectParentNode: () => eh,
	selectTextblockEnd: () => th,
	selectTextblockStart: () => nh,
	setContent: () => ih,
	setMark: () => $h,
	setMeta: () => eg,
	setNode: () => tg,
	setNodeSelection: () => ng,
	setTextDirection: () => rg,
	setTextSelection: () => ig,
	sinkListItem: () => ag,
	splitBlock: () => sg,
	splitListItem: () => cg,
	toggleList: () => mg,
	toggleMark: () => hg,
	toggleNode: () => gg,
	toggleWrap: () => _g,
	undoInputRule: () => vg,
	unsetAllMarks: () => yg,
	unsetMark: () => bg,
	unsetTextDirection: () => xg,
	updateAttributes: () => Sg,
	wrapIn: () => Cg,
	wrapInList: () => wg
});
var Wp = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	var n;
	e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), Gp = (e = !0) => ({ commands: t }) => t.setContent("", { emitUpdate: e }), Kp = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = ts(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, qp = (e) => (t) => e(t), Jp = () => ({ state: e, dispatch: t }) => Ac(e, t), Yp = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new W(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, Xp = () => ({ tr: e, dispatch: t }) => {
	let { selection: n } = e, r = n.$anchor.node();
	if (r.content.size > 0) return !1;
	let i = e.selection.$anchor;
	for (let n = i.depth; n > 0; --n) if (i.node(n).type === r.type) {
		if (t) {
			let t = i.before(n), r = i.after(n);
			e.delete(t, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
};
function Zp(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
var Qp = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = Zp(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, $p = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, em = (e) => e.content ? /^text(\*|\+)/.test(e.content) : !1, tm = (e, t, n) => {
	if (!e.parent.isInline || n === "left" && e.pos > e.start() || n === "right" && e.pos < e.end()) return e.pos;
	let r = t.nodes[e.parent.type.name].spec;
	return em(r) ? n === "left" ? e.start() - 1 : e.end() + 1 : e.pos;
}, nm = (e, t, n) => ({
	from: tm(e, n, "left"),
	to: tm(t, n, "right")
}), rm = () => ({ state: e, dispatch: t }) => {
	if (e.selection.empty) return !1;
	if (t) {
		let n = e.tr, { ranges: r } = e.selection, i = n.steps.length;
		r.forEach((t) => {
			let r = n.mapping.slice(i), { from: a, to: o } = nm(n.doc.resolve(r.map(t.$from.pos)), n.doc.resolve(r.map(t.$to.pos)), e.schema);
			n.deleteRange(a, o);
		}), n.selection.empty || n.setSelection(W.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), t(n);
	}
	return !0;
}, im = () => ({ commands: e }) => e.keyboardShortcut("Enter"), am = () => ({ state: e, dispatch: t }) => kc(e, t);
function om(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function sm(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return !r.length || r.every((r) => n.strict ? t[r] === e[r] : om(t[r]) ? t[r].test(e[r]) : t[r] === e[r]);
}
function cm(e, t, n = {}) {
	return e.find((e) => e.type === t && sm(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function lm(e, t, n = {}) {
	return !!cm(e, t, n);
}
function um(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if ((!r.node || !r.node.marks.some((e) => e.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t)) return;
	if (!n) {
		let e = r.node.marks.find((e) => e.type === t);
		e && (n = e.attrs);
	}
	if (!cm([...r.node.marks], t, n)) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && lm([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && lm([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function dm(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var fm = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = dm(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = um(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = W.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, pm = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function mm(e) {
	return e instanceof W;
}
function hm(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function gm(e, t = null) {
	if (!t) return null;
	let n = U.atStart(e), r = U.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? W.create(e, hm(0, i, a), hm(e.content.size, i, a)) : W.create(e, hm(t, i, a), hm(t, i, a));
}
function _m() {
	return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function vm() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ym() {
	return typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
var bm = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(vm() || _m()) && r.dom.focus(), ym() && !vm() && !_m() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), t?.scrollIntoView && n.commands.scrollIntoView());
		});
	};
	try {
		if (r.hasFocus() && e === null || e === !1) return !0;
	} catch {
		return !1;
	}
	if (a && e === null && !mm(n.state.selection)) return o(), !0;
	let s = gm(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, xm = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), Sm = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), Cm = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Cm(r);
	}
	return e;
};
function wm(e) {
	if (typeof window > "u") throw Error("[tiptap error]: there is no window object available, so this function cannot be used");
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return Cm(n);
}
function Tm(e, t, n) {
	if (e instanceof ja || e instanceof B) return e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let r = typeof e == "object" && !!e, i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return B.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), Tm("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new no({
				topNode: t.spec.topNode,
				marks: t.spec.marks,
				nodes: t.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
					content: "inline*",
					group: "block",
					parseDOM: [{
						tag: "*",
						getAttrs: (e) => (r = !0, i = typeof e == "string" ? e : e.outerHTML, null)
					}]
				} })
			});
			if (n.slice ? oo.fromSchema(a).parseSlice(wm(e), n.parseOptions) : oo.fromSchema(a).parse(wm(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = oo.fromSchema(t);
		return n.slice ? r.parseSlice(wm(e), n.parseOptions).content : r.parse(wm(e), n.parseOptions);
	}
	return Tm("", t, n);
}
function Em(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Jo || i instanceof Yo)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(U.near(e.doc.resolve(o), n));
}
var Dm = (e) => !("type" in e), Om = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
	if (i) {
		n = {
			parseOptions: a.options.parseOptions,
			updateSelection: !0,
			applyInputRules: !1,
			applyPasteRules: !1,
			...n
		};
		let i, o = (e) => {
			a.emit("contentError", {
				editor: a,
				error: e,
				disableCollaboration: () => {
					"collaboration" in a.storage && typeof a.storage.collaboration == "object" && a.storage.collaboration && (a.storage.collaboration.isDisabled = !0);
				}
			});
		}, s = {
			preserveWhitespace: "full",
			...n.parseOptions
		};
		if (!n.errorOnInvalidContent && !a.options.enableContentCheck && a.options.emitContentError) try {
			Tm(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = Tm(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: n.errorOnInvalidContent ?? a.options.enableContentCheck
			});
		} catch (e) {
			return o(e), !1;
		}
		let { from: c, to: l } = typeof e == "number" ? {
			from: e,
			to: e
		} : {
			from: e.from,
			to: e.to
		}, u = !0, d = !0;
		if ((Dm(i) ? i : [i]).forEach((e) => {
			e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
		}), c === l && d) {
			let { parent: e } = r.doc.resolve(c);
			e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
		}
		let f;
		if (u) {
			if (Array.isArray(t)) f = t.map((e) => e.text || "").join("");
			else if (t instanceof B) {
				let e = "";
				t.forEach((t) => {
					t.text && (e += t.text);
				}), f = e;
			} else f = typeof t == "object" && t && t.text ? t.text : t;
			r.insertText(f, c, l);
		} else {
			f = i;
			let e = r.doc.resolve(c), t = e.node(), n = e.parentOffset === 0, a = t.isText || t.isTextblock, o = t.content.size > 0;
			n && a && o && d && (c = Math.max(0, c - 1)), r.replaceWith(c, l, f);
		}
		n.updateSelection && Em(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: f
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: f
		});
	}
	return !0;
};
function km(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var Am = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
	let { pos: i, attrs: a, content: o, updateSelection: s = !0 } = e, c;
	c = typeof i == "number" ? t.doc.resolve(i) : i || t.selection.$from;
	let l = km(c.parent.contentMatchAt(c.index()));
	if (!l) return !1;
	let u = Object.keys(l.spec.attrs || {}), d = a ? Object.fromEntries(Object.entries(a).filter(([e]) => u.includes(e))) : {}, f;
	if (o) {
		let e = Tm(o, r.schema);
		f = l.createAndFill(d, e);
	} else f = l.createAndFill(d);
	return f ? (n && (t.insert(c.pos, f), s && Em(t, t.steps.length - 1, -1)), !0) : !1;
}, jm = () => ({ state: e, dispatch: t }) => wc(e, t), Mm = () => ({ state: e, dispatch: t }) => Tc(e, t), Nm = () => ({ state: e, dispatch: t }) => pc(e, t), Pm = () => ({ state: e, dispatch: t }) => xc(e, t), Fm = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = ys(e.doc, e.selection.$from.pos, -1);
		return r != null && (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Im = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = ys(e.doc, e.selection.$from.pos, 1);
		return r != null && (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Lm = () => ({ state: e, dispatch: t }) => mc(e, t), Rm = () => ({ state: e, dispatch: t }) => hc(e, t);
function zm() {
	return typeof navigator < "u" && /Mac/.test(navigator.platform);
}
function Bm(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) vm() || zm() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var Vm = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = Bm(e).split(/-(?!$)/), o = a.find((e) => ![
		"Alt",
		"Ctrl",
		"Meta",
		"Shift"
	].includes(e)), s = new KeyboardEvent("keydown", {
		key: o === "Space" ? " " : o,
		altKey: a.includes("Alt"),
		ctrlKey: a.includes("Ctrl"),
		metaKey: a.includes("Meta"),
		shiftKey: a.includes("Shift"),
		bubbles: !0,
		cancelable: !0
	});
	return t.captureTransaction(() => {
		n.someProp("handleKeyDown", (e) => e(n, s));
	})?.steps.forEach((e) => {
		let t = e.map(r.mapping);
		t && i && r.maybeStep(t);
	}), !0;
};
function Hm(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? Zp(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => !o || o.name === e.node.type.name).filter((e) => sm(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var Um = (e, t = {}) => ({ state: n, dispatch: r }) => Hm(n, Zp(e, n.schema), t) ? Ec(n, r) : !1, Wm = () => ({ state: e, dispatch: t }) => jc(e, t), Gm = (e) => ({ state: t, dispatch: n }) => Zc(Zp(e, t.schema))(t, n), Km = () => ({ state: e, dispatch: t }) => Dc(e, t);
function qm(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function Jm(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var Ym = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = qm(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = Zp(e, r.schema)), s === "mark" && (o = dm(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, Jm(e.attrs, t))), o && e.marks.length && e.marks.forEach((a) => {
				o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(Jm(a.attrs, t))));
			});
		});
	}), c;
}, Xm = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), Zm = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Js(e.doc);
		e.setSelection(t);
	}
	return !0;
}, Qm = () => ({ state: e, dispatch: t }) => vc(e, t), $m = () => ({ state: e, dispatch: t }) => Sc(e, t), eh = () => ({ state: e, dispatch: t }) => Pc(e, t), th = () => ({ state: e, dispatch: t }) => Bc(e, t), nh = () => ({ state: e, dispatch: t }) => zc(e, t);
function rh(e, t, n = {}, r = {}) {
	return Tm(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var ih = (e, { errorOnInvalidContent: t, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (r.preserveWhitespace !== "full") {
		let s = rh(e, i.schema, r, { errorOnInvalidContent: t ?? i.options.enableContentCheck });
		return o && a.replaceWith(0, c.content.size, s).setMeta("preventUpdate", !n), !0;
	}
	return o && a.setMeta("preventUpdate", !n), s.insertContentAt({
		from: 0,
		to: c.content.size
	}, e, {
		parseOptions: r,
		errorOnInvalidContent: t ?? i.options.enableContentCheck
	});
};
function ah(e, t) {
	let n = dm(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function oh(e, t) {
	let n = new Vs(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function sh(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function ch(e, t) {
	for (let n = e.depth; n > 0; --n) {
		let r = e.node(n);
		if (t(r)) return {
			pos: n > 0 ? e.before(n) : 0,
			start: e.start(n),
			depth: n,
			node: r
		};
	}
}
function lh(e) {
	return (t) => ch(t.$from, e);
}
function q(e, t, n) {
	return e.config[t] === void 0 && e.parent ? q(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? q(e.parent, t, n) : null
	}) : e.config[t];
}
function uh(e) {
	return e.map((e) => {
		let t = q(e, "addExtensions", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		return t ? [e, ...uh(t())] : e;
	}).flat(10);
}
function dh(e, t) {
	let n = xo.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
function fh(e) {
	return typeof e == "function";
}
function J(e, t = void 0, ...n) {
	return fh(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function ph(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function mh(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function hh(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = mh(e), i = [...n, ...r], a = {
		default: null,
		validate: void 0,
		rendered: !0,
		renderHTML: null,
		parseHTML: null,
		keepOnSplit: !0,
		isRequired: !1
	}, o = n.filter((e) => e.name !== "text").map((e) => e.name), s = r.map((e) => e.name), c = [...o, ...s];
	return e.forEach((e) => {
		let n = q(e, "addGlobalAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage,
			extensions: i
		});
		n && n().forEach((e) => {
			let n;
			n = Array.isArray(e.types) ? e.types : e.types === "*" ? c : e.types === "nodes" ? o : e.types === "marks" ? s : [], n.forEach((n) => {
				Object.entries(e.attributes).forEach(([e, r]) => {
					t.push({
						type: n,
						name: e,
						attribute: {
							...a,
							...r
						}
					});
				});
			});
		});
	}), i.forEach((e) => {
		let n = q(e, "addAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		if (!n) return;
		let r = n();
		Object.entries(r).forEach(([n, r]) => {
			let i = {
				...a,
				...r
			};
			typeof i?.default == "function" && (i.default = i.default()), i?.isRequired && i?.default === void 0 && delete i.default, t.push({
				type: e.name,
				name: n,
				attribute: i
			});
		});
	}), t;
}
function gh(e) {
	let t = [], n = "", r = !1, i = !1, a = 0, o = e.length;
	for (let s = 0; s < o; s += 1) {
		let o = e[s];
		if (o === "'" && !i) {
			r = !r, n += o;
			continue;
		}
		if (o === "\"" && !r) {
			i = !i, n += o;
			continue;
		}
		if (!r && !i) {
			if (o === "(") {
				a += 1, n += o;
				continue;
			}
			if (o === ")" && a > 0) {
				--a, n += o;
				continue;
			}
			if (o === ";" && a === 0) {
				t.push(n), n = "";
				continue;
			}
		}
		n += o;
	}
	return n && t.push(n), t;
}
function _h(e) {
	let t = [], n = gh(e || ""), r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e], i = r.indexOf(":");
		if (i === -1) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		a && o && t.push([a, o]);
	}
	return t;
}
function vh(...e) {
	return e.filter((e) => !!e).reduce((e, t) => {
		let n = { ...e };
		return Object.entries(t).forEach(([e, t]) => {
			if (!n[e]) {
				n[e] = t;
				return;
			}
			if (e === "class") {
				let r = t ? String(t).split(" ") : [], i = n[e] ? n[e].split(" ") : [], a = r.filter((e) => !i.includes(e));
				n[e] = [...i, ...a].join(" ");
			} else if (e === "style") {
				let r = new Map([..._h(n[e]), ..._h(t)]);
				n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function yh(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => vh(e, t), {});
}
function bh(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" || e !== "false" && e : e;
}
function xh(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : bh(n.getAttribute(t.name));
				return r == null ? e : {
					...e,
					[t.name]: r
				};
			}, {});
			return {
				...r,
				...i
			};
		}
	};
}
function Sh(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && ph(t) ? !1 : t != null));
}
function Ch(e) {
	let t = {};
	return !e?.attribute?.isRequired && "default" in (e?.attribute || {}) && (t.default = e.attribute.default), e?.attribute?.validate !== void 0 && (t.validate = e.attribute.validate), [e.name, t];
}
function wh(e, t) {
	let n = hh(e), { nodeExtensions: r, markExtensions: i } = mh(e), a = r.find((e) => q(e, "topNode"))?.name;
	return new no({
		topNode: a,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Sh({
				...e.reduce((e, t) => {
					let n = q(t, "extendNodeSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				content: J(q(r, "content", a)),
				marks: J(q(r, "marks", a)),
				group: J(q(r, "group", a)),
				inline: J(q(r, "inline", a)),
				atom: J(q(r, "atom", a)),
				selectable: J(q(r, "selectable", a)),
				draggable: J(q(r, "draggable", a)),
				code: J(q(r, "code", a)),
				whitespace: J(q(r, "whitespace", a)),
				linebreakReplacement: J(q(r, "linebreakReplacement", a)),
				defining: J(q(r, "defining", a)),
				isolating: J(q(r, "isolating", a)),
				attrs: Object.fromEntries(i.map(Ch))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => xh(e, i)));
			let c = q(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: yh(e, i)
			}));
			let l = q(r, "renderText", a);
			return l && (o.toText = l), [r.name, o];
		})),
		marks: Object.fromEntries(i.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Sh({
				...e.reduce((e, t) => {
					let n = q(t, "extendMarkSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				inclusive: J(q(r, "inclusive", a)),
				excludes: J(q(r, "excludes", a)),
				group: J(q(r, "group", a)),
				spanning: J(q(r, "spanning", a)),
				code: J(q(r, "code", a)),
				attrs: Object.fromEntries(i.map(Ch))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => xh(e, i)));
			let c = q(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: yh(e, i)
			})), [r.name, o];
		}))
	});
}
function Th(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
function Eh(e) {
	return e.sort((e, t) => {
		let n = q(e, "priority") || 100, r = q(t, "priority") || 100;
		return n > r ? -1 : +(n < r);
	});
}
function Dh(e) {
	let t = Eh(uh(e)), n = Th(t.map((e) => e.name));
	return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), t;
}
function Oh(e, t, n) {
	let { from: r, to: i } = t, { blockSeparator: a = "\n\n", textSerializers: o = {} } = n || {}, s = "";
	return e.nodesBetween(r, i, (e, n, c, l) => {
		e.isBlock && n > r && (s += a);
		let u = o?.[e.type.name];
		if (u) return c && (s += u({
			node: e,
			pos: n,
			parent: c,
			index: l,
			range: t
		})), !1;
		e.isText && (s += (e?.text)?.slice(Math.max(r, n) - n, i - n));
	}), s;
}
function kh(e, t) {
	return Oh(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function Ah(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function jh(e, t) {
	let n = Zp(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function Mh(e, t) {
	let n = qm(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? jh(e, t) : n === "mark" ? ah(e, t) : {};
}
function Nh(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function Ph(e) {
	let t = Nh(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function Fh(e) {
	let { mapping: t, steps: n } = e, r = [];
	return t.maps.forEach((e, i) => {
		let a = [];
		if (e.ranges.length) e.forEach((e, t) => {
			a.push({
				from: e,
				to: t
			});
		});
		else {
			let { from: e, to: t } = n[i];
			if (e === void 0 || t === void 0) return;
			a.push({
				from: e,
				to: t
			});
		}
		a.forEach(({ from: e, to: n }) => {
			let a = t.slice(i).map(e, -1), o = t.slice(i).map(n), s = t.invert().map(a, -1), c = t.invert().map(o);
			r.push({
				oldRange: {
					from: s,
					to: c
				},
				newRange: {
					from: a,
					to: o
				}
			});
		});
	}), Ph(r);
}
function Ih(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = um(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		!e || e?.nodeSize === void 0 || r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
var Lh = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
};
function Rh(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function zh(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
var Bh = (e, t = 500) => {
	let n = "", r = e.parentOffset;
	return e.parent.nodesBetween(Math.max(0, r - t), r, (e, t, i, a) => {
		var o;
		let s = (o = e.type.spec).toText?.call(o, {
			node: e,
			pos: t,
			parent: i,
			index: a
		}) || e.textContent || "%leaf%";
		n += e.isAtom && !e.isText ? s : s.slice(0, Math.max(0, r - t));
	}), n;
};
function Vh(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? dm(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => !a || a.name === e.type.name).find((e) => sm(e.attrs, n, { strict: !1 }));
	let o = 0, s = [];
	if (i.forEach(({ $from: t, $to: n }) => {
		let r = t.pos, i = n.pos;
		e.doc.nodesBetween(r, i, (e, t) => {
			if (a && e.inlineContent && !e.type.allowsMarkType(a)) return !1;
			if (!e.isText && !e.marks.length) return;
			let n = Math.max(r, t), c = Math.min(i, t + e.nodeSize), l = c - n;
			o += l, s.push(...e.marks.map((e) => ({
				mark: e,
				from: n,
				to: c
			})));
		});
	}), o === 0) return !1;
	let c = s.filter((e) => !a || a.name === e.mark.type.name).filter((e) => sm(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => !a || e.mark.type !== a && e.mark.type.excludes(a)).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function Hh(e, t, n = {}) {
	if (!t) return Hm(e, null, n) || Vh(e, null, n);
	let r = qm(t, e.schema);
	return r === "node" ? Hm(e, t, n) : r === "mark" && Vh(e, t, n);
}
var Uh = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = lh((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, Wh = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function Gh(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function Kh(e, t) {
	let { nodeExtensions: n } = mh(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = J(q(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" && i.split(" ").includes("list");
}
function qh(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
	if (n) {
		if (e.type.name === "hardBreak") return !0;
		if (e.isText) return !/\S/.test(e.text ?? "");
	}
	if (e.isText) return !e.text;
	if (e.isAtom || e.isLeaf) return !1;
	if (e.content.childCount === 0) return !0;
	if (t) {
		let r = !0;
		return e.content.forEach((e) => {
			r !== !1 && (qh(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function Jh(e) {
	return e instanceof G;
}
var Yh = class e {
	constructor(e) {
		this.position = e;
	}
	static fromJSON(t) {
		return new e(t.position);
	}
	toJSON() {
		return { position: this.position };
	}
};
function Xh(e, t) {
	let n = t.mapping.mapResult(e.position);
	return {
		position: new Yh(n.pos),
		mapResult: n
	};
}
function Zh(e) {
	return new Yh(e);
}
function Qh(e, t, n) {
	let { selection: r } = t, i = null;
	if (mm(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return i.parent.type.allowsMarkType(n) && (!!n.isInSet(t) || !t.some((e) => e.type.excludes(n)));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 && e.doc.inlineContent && e.doc.type.allowsMarkType(n);
		return e.doc.nodesBetween(t.pos, r.pos, (e, t, r) => {
			if (i) return !1;
			if (e.isInline) {
				let t = !r || r.type.allowsMarkType(n), a = !!n.isInSet(e.marks) || !e.marks.some((e) => e.type.excludes(n));
				i = t && a;
			}
			return !i;
		}), i;
	});
}
var $h = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = dm(e, r.schema);
	if (i) if (o) {
		let e = ah(r, c);
		n.addStoredMark(c.create({
			...e,
			...t
		}));
	} else s.forEach((e) => {
		let i = e.$from.pos, a = e.$to.pos;
		r.doc.nodesBetween(i, a, (e, r) => {
			let o = Math.max(r, i), s = Math.min(r + e.nodeSize, a);
			e.marks.find((e) => e.type === c) ? e.marks.forEach((e) => {
				c === e.type && n.addMark(o, s, c.create({
					...e.attrs,
					...t
				}));
			}) : n.addMark(o, s, c.create(t));
		});
	});
	return Qh(r, n, c);
}, eg = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), tg = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = Zp(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => Hc(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => Hc(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, ng = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = hm(e, 0, n.content.size), i = G.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, rg = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = r, o, s;
	return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
		t.isText || n.setNodeMarkup(r, void 0, {
			...t.attrs,
			dir: e
		});
	}), !0;
}, ig = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = W.atStart(n).from, o = W.atEnd(n).to, s = hm(r, a, o), c = hm(i, a, o), l = W.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, ag = (e) => ({ state: t, dispatch: n }) => el(Zp(e, t.schema))(t, n);
function og(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var sg = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = zh(l, s.node().type.name, s.node().attrs);
	if (a instanceof G && a.node.isBlock) return !s.parentOffset || !ms(o, s.pos) ? !1 : (r && (e && og(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : km(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = ms(t.doc, t.mapping.map(s.pos), 1, p);
	if (!p && !m && ms(t.doc, t.mapping.map(s.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (m && (a instanceof W && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
			let e = t.mapping.map(s.before()), n = t.doc.resolve(e);
			s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f);
		}
		e && og(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return m;
}, cg = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
	let o = Zp(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
	if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
	let u = s.node(-1);
	if (u.type !== o) return !1;
	let d = a.extensionManager.attributes;
	if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
		if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
		if (i) {
			let e = B.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
			for (let t = s.depth - r; t >= s.depth - 3; --t) e = B.from(s.node(t).copy(e));
			let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
				...zh(d, s.node().type.name, s.node().attrs),
				...t
			}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
			e = e.append(B.from(o.createAndFill(null, c) || void 0));
			let l = s.before(s.depth - (r - 1));
			n.replace(l, s.after(-i), new H(e, 4 - r, 0));
			let u = -1;
			n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
				if (u > -1) return !1;
				e.isTextblock && e.content.size === 0 && (u = t + 1);
			}), u > -1 && n.setSelection(W.near(n.doc.resolve(u))), n.scrollIntoView();
		}
		return !0;
	}
	let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
		...zh(d, u.type.name, u.attrs),
		...t
	}, m = {
		...zh(d, s.node().type.name, s.node().attrs),
		...t
	};
	n.delete(s.pos, c.pos);
	let h = f ? [{
		type: o,
		attrs: p
	}, {
		type: f,
		attrs: m
	}] : [{
		type: o,
		attrs: p
	}];
	if (!ms(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, h).scrollIntoView(), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
};
function lg(e) {
	return !e || e === "1" ? null : e;
}
function ug(e, t) {
	return lg(e) === lg(t);
}
var dg = (e, t) => {
	let n = lh((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && gs(e.doc, n.pos)) || !ug(n.node.attrs.type, i?.attrs.type) || e.join(n.pos), !0;
}, fg = (e, t) => {
	let n = lh((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && gs(e.doc, r)) || !ug(n.node.attrs.type, i?.attrs.type) || e.join(r), !0;
};
function pg(e) {
	let t = e.doc, n = t.firstChild;
	if (!n) return null;
	let r = t.resolve(1), i = t.resolve(n.nodeSize - 1);
	return W.between(r, i);
}
var mg = (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
	let { extensions: d, splittableMarks: f } = i.extensionManager, p = Zp(e, o.schema), m = Zp(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
	if (!y) return !1;
	let x = lh((e) => Kh(e.type.name, d))(h), S = h.from === 0 && h.to === o.doc.content.size, C = o.doc.content.content, w = C.length === 1 ? C[0] : null, T = S && w && Kh(w.type.name, d) ? {
		node: w,
		pos: 0,
		depth: 0
	} : null, E = x ?? T, D = !!x && y.depth >= 1 && y.depth - x.depth <= 1, O = !!T;
	if ((D || O) && E) {
		if (E.node.type === p) return S && O ? c().command(({ tr: e, dispatch: t }) => {
			let n = pg(e);
			return n ? (e.setSelection(n), t && t(e), !0) : !1;
		}).liftListItem(m).run() : l.liftListItem(m);
		if (Kh(E.node.type.name, d) && p.validContent(E.node.content)) return c().command(() => (a.setNodeMarkup(E.pos, p), !0)).command(() => dg(a, p)).command(() => fg(a, p)).run();
	}
	return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => dg(a, p)).command(() => fg(a, p)).run() : c().command(() => {
		let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
		return a.ensureMarks(t), e ? !0 : l.clearNodes();
	}).wrapInList(p, r).command(() => dg(a, p)).command(() => fg(a, p)).run();
}, hg = (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
	let { extendEmptyMarkRange: a = !1 } = n, o = dm(e, r.schema);
	return Vh(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
}, gg = (e, t, n = {}) => ({ state: r, commands: i }) => {
	let a = Zp(e, r.schema), o = Zp(t, r.schema), s = Hm(r, a, n), c;
	return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
		...c,
		...n
	});
}, _g = (e, t = {}) => ({ state: n, commands: r }) => {
	let i = Zp(e, n.schema);
	return Hm(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
}, vg = () => ({ state: e, dispatch: t }) => {
	let n = e.plugins;
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r], a;
		if (i.spec.isInputRules && (a = i.getState(e))) {
			if (t) {
				let t = e.tr, n = a.transform;
				for (let e = n.steps.length - 1; e >= 0; --e) t.step(n.steps[e].invert(n.docs[e]));
				if (a.text) {
					let n = t.doc.resolve(a.from).marks();
					t.replaceWith(a.from, a.to, e.schema.text(a.text, n));
				} else t.delete(a.from, a.to);
			}
			return !0;
		}
	}
	return !1;
}, yg = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
	let { ignoreClearable: i = !1 } = e, { selection: a } = t, { empty: o, ranges: s } = a;
	if (o) return !0;
	let { nonClearableMarks: c } = r.extensionManager;
	if (n) {
		let e = Object.values(r.schema.marks).filter((e) => i || !c.includes(e.name));
		s.forEach((n) => {
			for (let r of e) t.removeMark(n.$from.pos, n.$to.pos, r);
		});
	}
	return !0;
}, bg = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = dm(e, r.schema), { $from: c, empty: l, ranges: u } = o;
	if (!i) return !0;
	if (l && a) {
		let { from: e, to: t } = o, r = um(c, s, c.marks().find((e) => e.type === s)?.attrs);
		r && (e = r.from, t = r.to), n.removeMark(e, t, s);
	} else u.forEach((e) => {
		n.removeMark(e.$from.pos, e.$to.pos, s);
	});
	return n.removeStoredMark(s), !0;
}, xg = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let { selection: i } = n, a, o;
	return typeof e == "number" ? (a = e, o = e) : e && "from" in e && "to" in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
		if (e.isText) return;
		let r = { ...e.attrs };
		delete r.dir, t.setNodeMarkup(n, void 0, r);
	}), !0;
}, Sg = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = qm(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = Zp(e, r.schema)), s === "mark" && (o = dm(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		let s = e.$from.pos, l = e.$to.pos, u, d, f, p;
		n.selection.empty ? r.doc.nodesBetween(s, l, (e, t) => {
			a && a === e.type && (c = !0, f = Math.max(t, s), p = Math.min(t + e.nodeSize, l), u = t, d = e);
		}) : r.doc.nodesBetween(s, l, (e, r) => {
			r < s && a && a === e.type && (c = !0, f = Math.max(r, s), p = Math.min(r + e.nodeSize, l), u = r, d = e), r >= s && r <= l && (a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, {
				...e.attrs,
				...t
			})), o && e.marks.length && e.marks.forEach((a) => {
				if (o === a.type && (c = !0, i)) {
					let i = Math.max(r, s), c = Math.min(r + e.nodeSize, l);
					n.addMark(i, c, o.create({
						...a.attrs,
						...t
					}));
				}
			}));
		}), d && (u !== void 0 && i && n.setNodeMarkup(u, void 0, {
			...d.attrs,
			...t
		}), o && d.marks.length && d.marks.forEach((e) => {
			o === e.type && i && n.addMark(f, p, o.create({
				...e.attrs,
				...t
			}));
		}));
	}), c;
}, Cg = (e, t = {}) => ({ state: n, dispatch: r }) => Vc(Zp(e, n.schema), t)(n, r), wg = (e, t = {}) => ({ state: n, dispatch: r }) => Jc(Zp(e, n.schema), t)(n, r), Tg = class {
	constructor() {
		this.callbacks = {};
	}
	on(e, t) {
		return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
	}
	emit(e, ...t) {
		let n = this.callbacks[e];
		return n && n.forEach((e) => e.apply(this, t)), this;
	}
	off(e, t) {
		let n = this.callbacks[e];
		return n && (t ? this.callbacks[e] = n.filter((e) => e !== t) : delete this.callbacks[e]), this;
	}
	once(e, t) {
		let n = (...r) => {
			this.off(e, n), t.apply(this, r);
		};
		return this.on(e, n);
	}
	removeAllListeners() {
		this.callbacks = {};
	}
};
function Eg(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof G) {
		let e = r.index();
		return r.parent.canReplaceWith(e, e + 1, t);
	}
	let i = r.depth;
	for (; i >= 0;) {
		let e = r.index(i);
		if (r.node(i).contentMatchAt(e).matchType(t)) return !0;
		--i;
	}
	return !1;
}
function Dg(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
function Og(e) {
	return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function kg(e) {
	return typeof e == "number";
}
function Ag(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function jg(e) {
	return Ag(e) === "Object" && e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
Bp({}, {
	createAtomBlockMarkdownSpec: () => Pg,
	createBlockMarkdownSpec: () => Fg,
	createInlineMarkdownSpec: () => Rg,
	parseAttributes: () => Mg,
	parseIndentedBlocks: () => zg,
	renderNestedMarkdownContent: () => Bg,
	serializeAttributes: () => Ng
});
function Mg(e) {
	if (!e?.trim()) return {};
	let t = {}, n = [], r = e.replace(/["']([^"']*)["']/g, (e) => (n.push(e), `__QUOTED_${n.length - 1}__`)), i = r.match(/(?:^|\s)\.([\w-]+)/g);
	i && (t.class = i.map((e) => e.trim().slice(1)).join(" "));
	let a = r.match(/(?:^|\s)#([\w-]+)/);
	a && (t.id = a[1]), Array.from(r.matchAll(/([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g)).forEach(([, e, r]) => {
		let i = parseInt(r.match(/__QUOTED_(\d+)__/)?.[1] || "0", 10), a = n[i];
		a && (t[e] = a.slice(1, -1));
	});
	let o = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
	return o && o.split(/\s+/).filter(Boolean).forEach((e) => {
		e.match(/^[a-zA-Z][\w-]*$/) && (t[e] = !0);
	}), t;
}
function Ng(e) {
	if (!e || Object.keys(e).length === 0) return "";
	let t = [];
	return e.class && String(e.class).split(/\s+/).filter(Boolean).forEach((e) => t.push(`.${e}`)), e.id && t.push(`#${e.id}`), Object.entries(e).forEach(([e, n]) => {
		e !== "class" && e !== "id" && (n === !0 ? t.push(e) : n !== !1 && n != null && t.push(`${e}="${String(n)}"`));
	}), t.join(" ");
}
function Pg(e) {
	let { nodeName: t, name: n, parseAttributes: r = Mg, serializeAttributes: i = Ng, defaultAttributes: a = {}, requiredAttributes: o = [], allowedAttributes: s } = e, c = n || t, l = (e) => {
		if (!s) return e;
		let t = {};
		return s.forEach((n) => {
			n in e && (t[n] = e[n]);
		}), t;
	};
	return {
		parseMarkdown: (e, n) => {
			let r = {
				...a,
				...e.attributes
			};
			return n.createNode(t, r, []);
		},
		markdownTokenizer: {
			name: t,
			level: "block",
			start(e) {
				let t = RegExp(`^:::${c}(?:\\s|$)`, "m"), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, i) {
				let a = RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), s = e.match(a);
				if (!s) return;
				let l = s[1] || "", u = r(l);
				if (!o.find((e) => !(e in u))) return {
					type: t,
					raw: s[0],
					attributes: u
				};
			}
		},
		renderMarkdown: (e) => {
			let t = l(e.attrs || {}), n = i(t), r = n ? ` {${n}}` : "";
			return `:::${c}${r} :::`;
		}
	};
}
function Fg(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = Mg, serializeAttributes: a = Ng, defaultAttributes: o = {}, content: s = "block", allowedAttributes: c } = e, l = n || t, u = (e) => {
		if (!c) return e;
		let t = {};
		return c.forEach((n) => {
			n in e && (t[n] = e[n]);
		}), t;
	};
	return {
		parseMarkdown: (e, n) => {
			let i;
			if (r) {
				let t = r(e);
				i = typeof t == "string" ? [{
					type: "text",
					text: t
				}] : t;
			} else i = s === "block" ? n.parseChildren(e.tokens || []) : n.parseInline(e.tokens || []);
			let a = {
				...o,
				...e.attributes
			};
			return n.createNode(t, a, i);
		},
		markdownTokenizer: {
			name: t,
			level: "block",
			start(e) {
				let t = RegExp(`^:::${l}`, "m"), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, r) {
				let a = RegExp(`^:::${l}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), o = e.match(a);
				if (!o) return;
				let [c, u = ""] = o, d = i(u), f = 1, p = c.length, m = "", h = /^:::([\w-]*)(\s.*)?/gm, g = e.slice(p);
				for (h.lastIndex = 0;;) {
					let n = h.exec(g);
					if (n === null) break;
					let i = n.index, a = n[1];
					if (!n[2]?.endsWith(":::")) {
						if (a) f += 1;
						else if (--f, f === 0) {
							let a = g.slice(0, i);
							m = a.trim();
							let o = e.slice(0, p + i + n[0].length), c = [];
							if (m) if (s === "block") for (c = r.blockTokens(a), c.forEach((e) => {
								e.text && (!e.tokens || e.tokens.length === 0) && (e.tokens = r.inlineTokens(e.text));
							}); c.length > 0;) {
								let e = c[c.length - 1];
								if (e.type === "paragraph" && (!e.text || e.text.trim() === "")) c.pop();
								else break;
							}
							else c = r.inlineTokens(m);
							return {
								type: t,
								raw: o,
								attributes: d,
								content: m,
								tokens: c
							};
						}
					}
				}
			}
		},
		renderMarkdown: (e, t) => {
			let n = u(e.attrs || {}), r = a(n), i = r ? ` {${r}}` : "", o = t.renderChildren(e.content || [], "\n\n");
			return `:::${l}${i}

${o}

:::`;
		}
	};
}
function Ig(e) {
	if (!e.trim()) return {};
	let t = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g, r = n.exec(e);
	for (; r !== null;) {
		let [, i, a, o] = r;
		t[i] = a || o, r = n.exec(e);
	}
	return t;
}
function Lg(e) {
	return Object.entries(e).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function Rg(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = Ig, serializeAttributes: a = Lg, defaultAttributes: o = {}, selfClosing: s = !1, allowedAttributes: c } = e, l = n || t, u = (e) => {
		if (!c) return e;
		let t = {};
		return c.forEach((n) => {
			let r = typeof n == "string" ? n : n.name, i = typeof n == "string" ? void 0 : n.skipIfDefault;
			if (r in e) {
				let n = e[r];
				if (i !== void 0 && n === i) return;
				t[r] = n;
			}
		}), t;
	}, d = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return {
		parseMarkdown: (e, n) => {
			let i = {
				...o,
				...e.attributes
			};
			if (s) return n.createNode(t, i);
			let a = r ? r(e) : e.content || "";
			return a ? n.createNode(t, i, [n.createTextNode(a)]) : n.createNode(t, i, []);
		},
		markdownTokenizer: {
			name: t,
			level: "inline",
			start(e) {
				let t = RegExp(s ? `\\[${d}\\s*[^\\]]*\\]` : `\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, r) {
				let a = RegExp(s ? `^\\[${d}\\s*([^\\]]*)\\]` : `^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`), o = e.match(a);
				if (!o) return;
				let c = "", l = "";
				if (s) {
					let [, e] = o;
					l = e;
				} else {
					let [, e, t] = o;
					l = e, c = t || "";
				}
				let u = i(l.trim());
				return {
					type: t,
					raw: o[0],
					content: c.trim(),
					attributes: u
				};
			}
		},
		renderMarkdown: (e) => {
			let t = "";
			r ? t = r(e) : e.content && e.content.length > 0 && (t = e.content.filter((e) => e.type === "text").map((e) => e.text).join(""));
			let n = u(e.attrs || {}), i = a(n), o = i ? ` ${i}` : "";
			return s ? `[${l}${o}]` : `[${l}${o}]${t}[/${l}]`;
		}
	};
}
function zg(e, t, n) {
	let r = e.split("\n"), i = [], a = "", o = 0, s = t.baseIndentSize || 2;
	for (; o < r.length;) {
		let e = r[o], c = e.match(t.itemPattern);
		if (!c) {
			if (i.length > 0) break;
			if (e.trim() === "") {
				o += 1, a = `${a}${e}
`;
				continue;
			}
			return;
		}
		let l = t.extractItemData(c), { indentLevel: u, mainContent: d } = l;
		a = `${a}${e}
`;
		let f = [d];
		for (o += 1; o < r.length;) {
			let e = r[o];
			if (e.trim() === "") {
				let t = r.slice(o + 1).findIndex((e) => e.trim() !== "");
				if (t === -1) break;
				if ((r[o + 1 + t].match(/^(\s*)/)?.[1]?.length || 0) > u) {
					f.push(e), a = `${a}${e}
`, o += 1;
					continue;
				}
				break;
			}
			if ((e.match(/^(\s*)/)?.[1]?.length || 0) > u) f.push(e), a = `${a}${e}
`, o += 1;
			else break;
		}
		let p, m = f.slice(1);
		if (m.length > 0) {
			let e = m.map((e) => e.slice(u + s)).join("\n");
			e.trim() && (p = t.customNestedParser ? t.customNestedParser(e) : n.blockTokens(e));
		}
		let h = t.createToken(l, p);
		i.push(h);
	}
	if (i.length !== 0) return {
		items: i,
		raw: a
	};
}
function Bg(e, t, n, r) {
	if (!e || !Array.isArray(e.content)) return "";
	let i = typeof n == "function" ? n(r) : n, [a, ...o] = e.content, s = `${i}${t.renderChildren([a])}`;
	return o && o.length > 0 && o.forEach((e, n) => {
		let r = t.renderChild?.call(t, e, n + 1) ?? t.renderChildren([e]);
		if (r != null) {
			let n = r.split("\n").map((e) => e ? t.indent(e) : t.indent("")).join("\n");
			s += e.type === "paragraph" ? `

${n}` : `
${n}`;
		}
	}), s;
}
function Vg(e, t) {
	let n = { ...e };
	return jg(e) && jg(t) && Object.keys(t).forEach((r) => {
		jg(t[r]) && jg(e[r]) ? n[r] = Vg(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function Hg(e, t, n = {}) {
	let { state: r } = t, { doc: i, tr: a } = r, o = e;
	i.descendants((t, r) => {
		let i = a.mapping.map(r), s = a.mapping.map(r) + t.nodeSize, c = null;
		if (t.marks.forEach((e) => {
			if (e !== o) return !1;
			c = e;
		}), !c) return;
		let l = !1;
		if (Object.keys(n).forEach((e) => {
			n[e] !== c.attrs[e] && (l = !0);
		}), l) {
			let t = e.type.create({
				...e.attrs,
				...n
			});
			a.removeMark(i, s, e.type), a.addMark(i, s, t);
		}
	}), a.docChanged && t.view.dispatch(a);
}
var Ug = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0;
	}
}, Wg = (e, t) => {
	if (om(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function Gg(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o } = e, { view: s } = t;
	if (s.composing) return !1;
	let c = s.state.doc.resolve(n);
	if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let l = !1, u = Bh(c) + i;
	return a.forEach((e) => {
		if (l) return;
		let a = Wg(u, e.find);
		if (!a) return;
		let d = a[0].length - i.length;
		if (d > 0) {
			let e = c.parentOffset - d;
			if (e < 0 || c.parent.textBetween(e, c.parentOffset) !== a[0].slice(0, d)) return;
		}
		let f = s.state.tr, p = Vp({
			state: s.state,
			transaction: f
		}), m = {
			from: n - (a[0].length - i.length),
			to: r
		}, { commands: h, chain: g, can: _ } = new Hp({
			editor: t,
			state: p
		});
		e.handler({
			state: p,
			range: m,
			match: a,
			commands: h,
			chain: g,
			can: _
		}) === null || !f.steps.length || (e.undoable && f.setMeta(o, {
			transform: f,
			from: n,
			to: r,
			text: i
		}), s.dispatch(f), l = !0);
	}), l;
}
function Kg(e) {
	let { editor: t, rules: n } = e, r = new K({
		state: {
			init() {
				return null;
			},
			apply(e, i, a) {
				let o = e.getMeta(r);
				if (o) return o;
				let s = e.getMeta("applyInputRules");
				return s && setTimeout(() => {
					let { text: e } = s;
					e = typeof e == "string" ? e : dh(B.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					Gg({
						editor: t,
						from: i,
						to: o,
						text: e,
						rules: n,
						plugin: r
					});
				}), e.selectionSet || e.docChanged ? null : i;
			}
		},
		props: {
			handleTextInput(e, i, a, o) {
				return Gg({
					editor: t,
					from: i,
					to: a,
					text: o,
					rules: n,
					plugin: r
				});
			},
			handleDOMEvents: { compositionend: (e) => (setTimeout(() => {
				let { $cursor: i } = e.state.selection;
				i && Gg({
					editor: t,
					from: i.pos,
					to: i.pos,
					text: "",
					rules: n,
					plugin: r
				});
			}), !1) },
			handleKeyDown(e, i) {
				if (i.key !== "Enter") return !1;
				let { $cursor: a } = e.state.selection;
				return a ? Gg({
					editor: t,
					from: a.pos,
					to: a.pos,
					text: "\n",
					rules: n,
					plugin: r
				}) : !1;
			}
		},
		isInputRules: !0
	});
	return r;
}
var qg = class {
	constructor(e = {}) {
		this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name;
	}
	get options() {
		return { ...J(q(this, "addOptions", { name: this.name })) };
	}
	get storage() {
		return { ...J(q(this, "addStorage", {
			name: this.name,
			options: this.options
		})) };
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => Vg(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, this.child = null, t;
	}
	extend(e = {}) {
		let t = new this.constructor({
			...this.config,
			...e
		});
		return t.parent = this, this.child = t, t.name = "name" in e ? e.name : t.parent.name, t;
	}
}, Jg = class e extends qg {
	constructor() {
		super(...arguments), this.type = "mark";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	static handleExit({ editor: e, mark: t }) {
		let { tr: n } = e.state, r = e.state.selection.$from;
		if (r.pos === r.end()) {
			let i = r.marks();
			if (!i.find((e) => e?.type.name === t.name)) return !1;
			let a = i.find((e) => e?.type.name === t.name);
			return a && n.removeStoredMark(a), n.insertText(" ", r.pos), e.view.dispatch(n), !0;
		}
		return !1;
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
}, Yg = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, Xg = (e, t, n) => {
	if (om(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function Zg(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new Hp({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		if (e.type?.spec?.code || !(e.isText || e.isTextblock || e.isInline)) return;
		let f = e.content?.size ?? e.nodeSize ?? 0, p = Math.max(r, t), m = Math.min(i, t + f);
		p >= m || Xg(e.isText ? e.text || "" : e.textBetween(p - t, m - t, void 0, "￼"), a.find, o).forEach((e) => {
			if (e.index === void 0) return;
			let t = p + e.index + 1, r = t + e[0].length, i = {
				from: n.tr.mapping.map(t),
				to: n.tr.mapping.map(r)
			}, f = a.handler({
				state: n,
				range: i,
				match: e,
				commands: c,
				chain: l,
				can: u,
				pasteEvent: o,
				dropEvent: s
			});
			d.push(f);
		});
	}), d.every((e) => e !== null);
}
var Qg = null, $g = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function e_(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = Vp({
			state: e,
			transaction: c
		});
		if (!(!Zg({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) || !c.steps.length)) {
			try {
				s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
			} catch {
				s = null;
			}
			return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, c;
		}
	};
	return n.map((e) => new K({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (Qg = t);
			}, i = () => {
				Qg &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = Qg;
					e?.isEditable && setTimeout(() => {
						let t = e.state.selection;
						t && e.commands.deleteRange({
							from: t.from,
							to: t.to
						});
					}, 10);
				}
				return !1;
			},
			paste: (e, t) => {
				let n = t.clipboardData?.getData("text/html");
				return o = t, i = !!n?.includes("data-pm-slice"), !1;
			}
		} },
		appendTransaction: (t, n, r) => {
			let s = t[0], l = s.getMeta("uiEvent") === "paste" && !i, u = s.getMeta("uiEvent") === "drop" && !a, d = s.getMeta("applyPasteRules"), f = !!d;
			if (!l && !u && !f) return;
			if (f) {
				let { text: t } = d;
				t = typeof t == "string" ? t : dh(B.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = $g(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (!(!kg(p) || !m || p === m.b)) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
var t_ = class {
	constructor(e, t) {
		this.splittableMarks = [], this.nonClearableMarks = [], this.editor = t, this.baseExtensions = e, this.extensions = Dh(e), this.schema = wh(this.extensions, t), this.setupExtensions();
	}
	get commands() {
		return this.extensions.reduce((e, t) => {
			let n = q(t, "addCommands", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: this.editor,
				type: Rh(t.name, this.schema)
			});
			return n ? {
				...e,
				...n()
			} : e;
		}, {});
	}
	get plugins() {
		let { editor: e } = this;
		return Eh([...this.extensions].reverse()).flatMap((t) => {
			let n = {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: Rh(t.name, this.schema)
			}, r = [], i = q(t, "addKeyboardShortcuts", n), a = {};
			if (t.type === "mark" && q(t, "exitable", n) && (a.ArrowRight = () => Jg.handleExit({
				editor: e,
				mark: t
			})), i) {
				let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({ editor: e })]));
				a = {
					...a,
					...t
				};
			}
			let o = Lp(a);
			r.push(o);
			let s = q(t, "addInputRules", n);
			if (Gh(t, e.options.enableInputRules) && s) {
				let t = s();
				if (t && t.length) {
					let n = Kg({
						editor: e,
						rules: t
					}), i = Array.isArray(n) ? n : [n];
					r.push(...i);
				}
			}
			let c = q(t, "addPasteRules", n);
			if (Gh(t, e.options.enablePasteRules) && c) {
				let t = c();
				if (t && t.length) {
					let n = e_({
						editor: e,
						rules: t
					});
					r.push(...n);
				}
			}
			let l = q(t, "addProseMirrorPlugins", n);
			if (l) {
				let e = l();
				r.push(...e);
			}
			return r;
		});
	}
	get attributes() {
		return hh(this.extensions);
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = mh(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: Zp(t.name, this.schema)
			});
			if (!r) return [];
			let i = r();
			return i ? [t.name, (r, a, o, s, c) => {
				let l = yh(r, n);
				return i({
					node: r,
					view: a,
					getPos: o,
					decorations: s,
					innerDecorations: c,
					editor: e,
					extension: t,
					HTMLAttributes: l
				});
			}] : [];
		}));
	}
	dispatchTransaction(e) {
		let { editor: t } = this;
		return Eh([...this.extensions].reverse()).reduceRight((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: Rh(n.name, this.schema)
			}, i = q(n, "dispatchTransaction", r);
			return i ? (t) => {
				i.call(r, {
					transaction: t,
					next: e
				});
			} : e;
		}, e);
	}
	transformPastedHTML(e) {
		let { editor: t } = this;
		return Eh([...this.extensions]).reduce((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: Rh(n.name, this.schema)
			}, i = q(n, "transformPastedHTML", r);
			return i ? (t, n) => {
				let a = e(t, n);
				return i.call(r, a);
			} : e;
		}, e || ((e) => e));
	}
	get markViews() {
		let { editor: e } = this, { markExtensions: t } = mh(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addMarkView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addMarkView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: dm(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o) => {
				let s = yh(i, n);
				return r()({
					mark: i,
					view: a,
					inline: o,
					editor: e,
					extension: t,
					HTMLAttributes: s,
					updateAttributes: (t) => {
						Hg(i, e, t);
					}
				});
			}] : [];
		}));
	}
	destroy() {
		this.extensions.forEach((e) => {
			let t = e;
			for (; t.parent;) {
				let e = t.parent;
				e.child === t && (e.child = null), t = e;
			}
		}), this.extensions = [], this.baseExtensions = [], this.schema = null, this.editor = null;
	}
	setupExtensions() {
		let e = this.extensions;
		this.editor.extensionStorage = Object.fromEntries(e.map((e) => [e.name, e.storage])), e.forEach((e) => {
			let t = {
				name: e.name,
				options: e.options,
				storage: this.editor.extensionStorage[e.name],
				editor: this.editor,
				type: Rh(e.name, this.schema)
			};
			e.type === "mark" && ((J(q(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name), (J(q(e, "clearable", t)) ?? !0) || this.nonClearableMarks.push(e.name));
			let n = q(e, "onBeforeCreate", t), r = q(e, "onCreate", t), i = q(e, "onUpdate", t), a = q(e, "onSelectionUpdate", t), o = q(e, "onTransaction", t), s = q(e, "onFocus", t), c = q(e, "onBlur", t), l = q(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
};
t_.resolve = Dh, t_.sort = Eh, t_.flatten = uh;
var n_ = {};
Bp(n_, {
	ClipboardTextSerializer: () => r_,
	Commands: () => i_,
	Delete: () => a_,
	Drop: () => o_,
	Editable: () => s_,
	FocusEvents: () => l_,
	Keymap: () => u_,
	Paste: () => d_,
	Tabindex: () => f_,
	TextDirection: () => p_,
	focusEventsPluginKey: () => c_
});
var Y = class e extends qg {
	constructor() {
		super(...arguments), this.type = "extension";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
}, r_ = Y.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, a = Ah(n), { blockSeparator: o } = this.options, s = {
					...o === void 0 ? {} : { blockSeparator: o },
					textSerializers: a
				};
				return [...i.ranges].sort((e, t) => e.$from.pos - t.$from.pos).map(({ $from: e, $to: t }) => Oh(r, {
					from: e.pos,
					to: t.pos
				}, s)).join(o ?? "\n\n");
			} }
		})];
	}
}), i_ = Y.create({
	name: "commands",
	addCommands() {
		return { ...Up };
	}
}), a_ = Y.create({
	name: "delete",
	onUpdate({ transaction: e, appendedTransactions: t }) {
		let n = () => {
			var n;
			if (((n = this.editor.options.coreExtensionOptions?.delete)?.filterTransaction)?.call(n, e) ?? e.getMeta("y-sync$")) return;
			let r = oh(e.before, [e, ...t]);
			Fh(r).forEach((t) => {
				r.mapping.mapResult(t.oldRange.from).deletedAfter && r.mapping.mapResult(t.oldRange.to).deletedBefore && r.before.nodesBetween(t.oldRange.from, t.oldRange.to, (n, i) => {
					let a = i + n.nodeSize - 2, o = t.oldRange.from <= i && a <= t.oldRange.to;
					this.editor.emit("delete", {
						type: "node",
						node: n,
						from: i,
						to: a,
						newFrom: r.mapping.map(i),
						newTo: r.mapping.map(a),
						deletedRange: t.oldRange,
						newRange: t.newRange,
						partial: !o,
						editor: this.editor,
						transaction: e,
						combinedTransform: r
					});
				});
			});
			let i = r.mapping;
			r.steps.forEach((t, n) => {
				if (t instanceof Go) {
					let a = i.slice(n).map(t.from, -1), o = i.slice(n).map(t.to), s = i.invert().map(a, -1), c = i.invert().map(o), l = a > 0 && r.doc.nodeAt(a - 1)?.marks.some((e) => e.eq(t.mark)), u = r.doc.nodeAt(o)?.marks.some((e) => e.eq(t.mark));
					this.editor.emit("delete", {
						type: "mark",
						mark: t.mark,
						from: t.from,
						to: t.to,
						deletedRange: {
							from: s,
							to: c
						},
						newRange: {
							from: a,
							to: o
						},
						partial: !!(u || l),
						editor: this.editor,
						transaction: e,
						combinedTransform: r
					});
				}
			});
		};
		this.editor.options.coreExtensionOptions?.delete?.async ?? !0 ? setTimeout(n, 0) : n();
	}
}), o_ = Y.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("tiptapDrop"),
			props: { handleDrop: (e, t, n, r) => {
				this.editor.emit("drop", {
					editor: this.editor,
					event: t,
					slice: n,
					moved: r
				});
			} }
		})];
	}
}), s_ = Y.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), c_ = new uc("focusEvents"), l_ = Y.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new K({
			key: c_,
			props: { handleDOMEvents: {
				focus: (t, n) => {
					e.isFocused = !0;
					let r = e.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				},
				blur: (t, n) => {
					e.isFocused = !1;
					let r = e.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				}
			} }
		})];
	}
}), u_ = Y.create({
	name: "keymap",
	addKeyboardShortcuts() {
		let e = () => this.editor.commands.first(({ commands: e }) => [
			() => e.undoInputRule(),
			() => e.command(({ tr: t }) => {
				let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : U.atStart(r).from === o;
				return !i || !s.type.isTextblock || s.textContent.length || !d || d && a.parent.type.name === "paragraph" ? !1 : e.clearNodes();
			}),
			() => e.deleteSelection(),
			() => e.joinBackward(),
			() => e.selectNodeBackward()
		]), t = () => this.editor.commands.first(({ commands: e }) => [
			() => e.deleteSelection(),
			() => e.deleteCurrentNode(),
			() => e.joinForward(),
			() => e.selectNodeForward()
		]), n = {
			Enter: () => this.editor.commands.first(({ commands: e }) => [
				() => e.newlineInCode(),
				() => e.createParagraphNear(),
				() => e.liftEmptyBlock(),
				() => e.splitBlock()
			]),
			"Mod-Enter": () => this.editor.commands.exitCode(),
			Backspace: e,
			"Mod-Backspace": e,
			"Shift-Backspace": e,
			Delete: t,
			"Mod-Delete": t,
			"Mod-a": () => this.editor.commands.selectAll()
		}, r = { ...n }, i = {
			...n,
			"Ctrl-h": e,
			"Alt-Backspace": e,
			"Ctrl-d": t,
			"Ctrl-Alt-Backspace": t,
			"Alt-Delete": t,
			"Alt-d": t,
			"Ctrl-a": () => this.editor.commands.selectTextblockStart(),
			"Ctrl-e": () => this.editor.commands.selectTextblockEnd()
		};
		return vm() || zm() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = U.atStart(t.doc).from, l = U.atEnd(t.doc).to;
				if (a || o !== c || s !== l || !qh(n.doc)) return;
				let u = n.tr, d = Vp({
					state: n,
					transaction: u
				}), { commands: f } = new Hp({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), d_ = Y.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), f_ = Y.create({
	name: "tabindex",
	addOptions() {
		return { value: void 0 };
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("tabindex"),
			props: { attributes: () => !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: this.options.value ?? "0" } }
		})];
	}
}), p_ = Y.create({
	name: "textDirection",
	addOptions() {
		return { direction: void 0 };
	},
	addGlobalAttributes() {
		if (!this.options.direction) return [];
		let { nodeExtensions: e } = mh(this.extensions);
		return [{
			types: e.filter((e) => e.name !== "text").map((e) => e.name),
			attributes: { dir: {
				default: this.options.direction,
				parseHTML: (e) => {
					let t = e.getAttribute("dir");
					return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
				},
				renderHTML: (e) => e.dir ? { dir: e.dir } : {}
			} }
		}];
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("textDirection"),
			props: { attributes: () => {
				let e = this.options.direction;
				return e ? { dir: e } : {};
			} }
		})];
	}
}), m_ = class e {
	constructor(e, t, n = !1, r = null) {
		this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r;
	}
	get name() {
		return this.node.type.name;
	}
	get node() {
		return this.currentNode || this.resolvedPos.node();
	}
	get element() {
		return this.editor.view.domAtPos(this.pos).node;
	}
	get depth() {
		return this.actualDepth ?? this.resolvedPos.depth;
	}
	get pos() {
		return this.resolvedPos.pos;
	}
	get content() {
		return this.node.content;
	}
	set content(e) {
		let t = this.from, n = this.to;
		if (this.isBlock) {
			if (this.content.size === 0) {
				console.error(`You can\u2019t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
				return;
			}
			t = this.from + 1, n = this.to - 1;
		}
		this.editor.commands.insertContentAt({
			from: t,
			to: n
		}, e);
	}
	get attributes() {
		return this.node.attrs;
	}
	get textContent() {
		return this.node.textContent;
	}
	get size() {
		return this.node.nodeSize;
	}
	get from() {
		return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
	}
	get range() {
		return {
			from: this.from,
			to: this.to
		};
	}
	get to() {
		return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + +!this.node.isText;
	}
	get parent() {
		if (this.depth === 0) return null;
		let t = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(t);
		return new e(n, this.editor);
	}
	get before() {
		let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new e(t, this.editor);
	}
	get after() {
		let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new e(t, this.editor);
	}
	get children() {
		let t = [];
		return this.node.content.forEach((n, r) => {
			let i = n.isBlock && !n.isTextblock, a = n.isAtom && !n.isText, o = n.isInline, s = this.pos + r + +!a;
			if (s < 0 || s > this.resolvedPos.doc.nodeSize - 2) return;
			let c = this.resolvedPos.doc.resolve(s);
			if (!i && !o && c.depth <= this.depth) return;
			let l = new e(c, this.editor, i, i || o ? n : null);
			i && (l.actualDepth = this.depth + 1), t.push(l);
		}), t;
	}
	get firstChild() {
		return this.children[0] || null;
	}
	get lastChild() {
		let e = this.children;
		return e[e.length - 1] || null;
	}
	closest(e, t = {}) {
		let n = null, r = this.parent;
		for (; r && !n;) {
			if (r.node.type.name === e) if (Object.keys(t).length > 0) {
				let e = r.node.attrs, n = Object.keys(t);
				for (let r = 0; r < n.length; r += 1) {
					let i = n[r];
					if (e[i] !== t[i]) break;
				}
			} else n = r;
			r = r.parent;
		}
		return n;
	}
	querySelector(e, t = {}) {
		return this.querySelectorAll(e, t, !0)[0] || null;
	}
	querySelectorAll(e, t = {}, n = !1) {
		let r = [];
		if (!this.children || this.children.length === 0) return r;
		let i = Object.keys(t);
		return this.children.forEach((a) => {
			n && r.length > 0 || (a.node.type.name === e && i.every((e) => t[e] === a.node.attrs[e]) && r.push(a), !(n && r.length > 0) && (r = r.concat(a.querySelectorAll(e, t, n))));
		}), r;
	}
	setAttribute(e) {
		let { tr: t } = this.editor.state;
		t.setNodeMarkup(this.from, void 0, {
			...this.node.attrs,
			...e
		}), this.editor.view.dispatch(t);
	}
}, h_ = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}", g_ = class extends Tg {
	constructor(e = {}) {
		super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
			element: typeof document < "u" ? document.createElement("div") : null,
			content: "",
			injectCSS: !0,
			injectNonce: void 0,
			extensions: [],
			autofocus: !1,
			editable: !0,
			textDirection: void 0,
			editorProps: {},
			parseOptions: {},
			coreExtensionOptions: {},
			enableInputRules: !0,
			enablePasteRules: !0,
			enableCoreExtensions: !0,
			enableContentCheck: !1,
			emitContentError: !1,
			onBeforeCreate: () => null,
			onCreate: () => null,
			onMount: () => null,
			onUnmount: () => null,
			onUpdate: () => null,
			onSelectionUpdate: () => null,
			onTransaction: () => null,
			onFocus: () => null,
			onBlur: () => null,
			onDestroy: () => null,
			onContentError: ({ error: e }) => {
				throw e;
			},
			onPaste: () => null,
			onDrop: () => null,
			onDelete: () => null,
			enableExtensionDispatchTransaction: !0
		}, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
			getUpdatedPosition: Xh,
			createMappablePosition: Zh
		}, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), this.on("delete", this.options.onDelete);
		let t = this.createDoc();
		if (!this.editorState) {
			let e = gm(t, this.options.autofocus);
			this.editorState = oc.create({
				doc: t,
				schema: this.schema,
				selection: e || void 0
			});
		}
		this.options.element && this.mount(this.options.element);
	}
	mount(e) {
		if (typeof document > "u") throw Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
		this.createView(e), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
			this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
		}, 0);
	}
	unmount() {
		if (this.editorView) {
			let e = this.editorView.dom;
			e?.editor && delete e.editor, this.editorView.destroy();
		}
		if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
			typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
		} catch (e) {
			console.warn("Failed to remove CSS element:", e);
		}
		this.css = null, this.emit("unmount", { editor: this });
	}
	get storage() {
		return this.extensionStorage;
	}
	get commands() {
		return this.commandManager.commands;
	}
	chain() {
		return this.commandManager.chain();
	}
	can() {
		return this.commandManager.can();
	}
	injectCSS() {
		this.options.injectCSS && typeof document < "u" && (this.css = Dg(h_, this.options.injectNonce));
	}
	setOptions(e = {}) {
		this.options = {
			...this.options,
			...e
		}, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
	}
	setEditable(e, t = !0) {
		this.setOptions({ editable: e }), t && this.emit("update", {
			editor: this,
			transaction: this.state.tr,
			appendedTransactions: []
		});
	}
	get isEditable() {
		return this.options.editable && this.view && this.view.editable;
	}
	get view() {
		return this.editorView ? this.editorView : new Proxy({
			state: this.editorState,
			updateState: (e) => {
				this.editorState = e;
			},
			dispatch: (e) => {
				this.dispatchTransaction(e);
			},
			composing: !1,
			dragging: null,
			editable: !0,
			isDestroyed: !1
		}, { get: (e, t) => {
			if (this.editorView) return this.editorView[t];
			if (t === "state") return this.editorState;
			if (t in e) return Reflect.get(e, t);
			throw Error(`[tiptap error]: The editor view is not available. Cannot access view['${t}']. The editor may not be mounted yet.`);
		} });
	}
	get state() {
		return this.editorView && (this.editorState = this.view.state), this.editorState;
	}
	registerPlugin(e, t) {
		let n = fh(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	unregisterPlugin(e) {
		if (this.isDestroyed) return;
		let t = this.state.plugins, n = t;
		if ([].concat(e).forEach((e) => {
			let t = typeof e == "string" ? `${e}$` : e.key;
			n = n.filter((e) => !e.key.startsWith(t));
		}), t.length === n.length) return;
		let r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	createExtensionManager() {
		let e = [...this.options.enableCoreExtensions ? [
			s_,
			r_.configure({ blockSeparator: this.options.coreExtensionOptions?.clipboardTextSerializer?.blockSeparator }),
			i_,
			l_,
			u_,
			f_.configure({ value: this.options.coreExtensionOptions?.tabindex?.value }),
			o_,
			d_,
			a_,
			p_.configure({ direction: this.options.textDirection })
		].filter((e) => typeof this.options.enableCoreExtensions != "object" || this.options.enableCoreExtensions[e.name] !== !1) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new t_(e, this);
	}
	createCommandManager() {
		this.commandManager = new Hp({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createDoc() {
		let e;
		try {
			e = rh(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (e) {
			if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) throw e;
			let t = rh(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
			return this.editorState = oc.create({
				doc: t,
				schema: this.schema,
				selection: gm(t, this.options.autofocus) || void 0
			}), this.emit("contentError", {
				editor: this,
				error: e,
				disableCollaboration: () => {
					"collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), this.editorState.doc;
		}
		return e;
	}
	createView(e) {
		let { editorProps: t, enableExtensionDispatchTransaction: n } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
		this.editorView = new _p(e, {
			...t,
			attributes: {
				role: "textbox",
				...t?.attributes
			},
			dispatchTransaction: i,
			transformPastedHTML: o,
			state: this.editorState,
			markViews: this.extensionManager.markViews,
			nodeViews: this.extensionManager.nodeViews
		});
		let s = this.state.reconfigure({ plugins: this.extensionManager.plugins });
		this.view.updateState(s), this.prependClass(), this.injectCSS();
		let c = this.view.dom;
		c.editor = this;
	}
	createNodeViews() {
		this.view.isDestroyed || this.view.setProps({
			markViews: this.extensionManager.markViews,
			nodeViews: this.extensionManager.nodeViews
		});
	}
	prependClass() {
		this.view.dom.className = `${this.className} ${this.view.dom.className}`;
	}
	captureTransaction(e) {
		this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
		let t = this.capturedTransaction;
		return this.capturedTransaction = null, t;
	}
	dispatchTransaction(e) {
		if (this.view.isDestroyed) return;
		if (this.isCapturingTransaction) {
			if (!this.capturedTransaction) {
				this.capturedTransaction = e;
				return;
			}
			e.steps.forEach((e) => this.capturedTransaction?.step(e));
			return;
		}
		let { state: t, transactions: n } = this.state.applyTransaction(e), r = !this.state.selection.eq(t.selection), i = n.includes(e), a = this.state;
		if (this.emit("beforeTransaction", {
			editor: this,
			transaction: e,
			nextState: t
		}), !i) return;
		this.view.updateState(t), this.emit("transaction", {
			editor: this,
			transaction: e,
			appendedTransactions: n.slice(1)
		}), r && this.emit("selectionUpdate", {
			editor: this,
			transaction: e
		});
		let o = n.findLast((e) => e.getMeta("focus") || e.getMeta("blur")), s = o?.getMeta("focus"), c = o?.getMeta("blur");
		s && this.emit("focus", {
			editor: this,
			event: s.event,
			transaction: o
		}), c && this.emit("blur", {
			editor: this,
			event: c.event,
			transaction: o
		}), !(e.getMeta("preventUpdate") || !n.some((e) => e.docChanged) || a.doc.eq(t.doc)) && this.emit("update", {
			editor: this,
			transaction: e,
			appendedTransactions: n.slice(1)
		});
	}
	getAttributes(e) {
		return Mh(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return Hh(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return dh(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return kh(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...Ah(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return qh(this.state.doc);
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.emit("destroy"), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {});
	}
	get isDestroyed() {
		return this.editorView?.isDestroyed ?? !0;
	}
	$node(e, t) {
		return this.$doc?.querySelector(e, t) || null;
	}
	$nodes(e, t) {
		return this.$doc?.querySelectorAll(e, t) || null;
	}
	$pos(e) {
		let t = this.state.doc.resolve(e), n = e > 0 && t.nodeAfter && !t.nodeAfter.isText && t.nodeAfter.isAtom ? t.nodeAfter : null;
		return new m_(t, this, !1, n);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function __(e) {
	return new Ug({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (Ih(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		},
		undoable: e.undoable
	});
}
function v_(e) {
	return new Ug({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r) || {}, { tr: a } = t, o = n.from, s = n.to, c = e.type.create(i);
			if (r[1]) {
				let e = o + r[0].lastIndexOf(r[1]);
				e > s ? e = s : s = e + r[1].length;
				let t = r[0][r[0].length - 1];
				a.insertText(t, o + r[0].length - 1), a.replaceWith(e, s, c);
			} else if (r[0]) {
				let t = e.type.isInline ? o : o - 1;
				a.insert(t, e.type.create(i)).delete(a.mapping.map(o), a.mapping.map(s));
			}
			a.scrollIntoView();
		},
		undoable: e.undoable
	});
}
function y_(e) {
	return new Ug({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = J(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		},
		undoable: e.undoable
	});
}
function b_(e) {
	return new Ug({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = J(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && rs(s, e.type, a);
			if (!c) return null;
			if (o.wrap(s, c), e.keepMarks && e.editor) {
				let { selection: n, storedMarks: r } = t, { splittableMarks: i } = e.editor.extensionManager, a = r || n.$to.parentOffset && n.$from.marks();
				if (a) {
					let e = a.filter((e) => i.includes(e.type.name));
					o.ensureMarks(e);
				}
			}
			if (e.keepAttributes) {
				let t = e.type.name === "bulletList" || e.type.name === "orderedList" ? "listItem" : "taskList";
				i().updateAttributes(t, a).run();
			}
			let l = o.doc.resolve(n.from - 1).nodeBefore;
			l && l.type === e.type && gs(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		},
		undoable: e.undoable
	});
}
var X = class e extends qg {
	constructor() {
		super(...arguments), this.type = "node";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
};
function x_(e) {
	return new Yg({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = J(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let i = c.search(/\S/), u = n.from + c.indexOf(s), d = u + s.length;
				if (Ih(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > u).length) return null;
				d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type);
			}
		}
	});
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var S_ = Math.min, C_ = Math.max, w_ = Math.round, T_ = Math.floor, E_ = (e) => ({
	x: e,
	y: e
}), D_ = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function O_(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function k_(e) {
	return e.split("-")[0];
}
function A_(e) {
	return e.split("-")[1];
}
function j_(e) {
	return e === "x" ? "y" : "x";
}
function M_(e) {
	return e === "y" ? "height" : "width";
}
function N_(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function P_(e) {
	return j_(N_(e));
}
function F_(e, t, n) {
	n === void 0 && (n = !1);
	let r = A_(e), i = P_(e), a = M_(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = W_(o)), [o, W_(o)];
}
function I_(e) {
	let t = W_(e);
	return [
		L_(e),
		t,
		L_(t)
	];
}
function L_(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var R_ = ["left", "right"], z_ = ["right", "left"], B_ = ["top", "bottom"], V_ = ["bottom", "top"];
function H_(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? z_ : R_ : t ? R_ : z_;
		case "left":
		case "right": return t ? B_ : V_;
		default: return [];
	}
}
function U_(e, t, n, r) {
	let i = A_(e), a = H_(k_(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(L_)))), a;
}
function W_(e) {
	let t = k_(e);
	return D_[t] + e.slice(t.length);
}
function G_(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function K_(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : G_(e);
}
function q_(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function J_(e, t, n) {
	let { reference: r, floating: i } = e, a = N_(t), o = P_(t), s = M_(o), c = k_(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = A_(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Y_(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = O_(t, e), p = K_(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = q_(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = q_(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var X_ = 50, Z_ = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Y_
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = J_(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < X_ && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = J_(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Q_ = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = O_(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = k_(r), _ = N_(o), v = k_(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [W_(o)] : I_(o)), x = p !== "none";
			!d && x && b.push(...U_(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = F_(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === N_(t) || T.every((e) => N_(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = N_(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, $_ = /*#__PURE__*/ new Set(["left", "top"]);
async function ev(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = k_(n), s = A_(n), c = N_(n) === "y", l = $_.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = O_(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var tv = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await ev(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function nv() {
	return typeof window < "u";
}
function rv(e) {
	return ov(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function iv(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function av(e) {
	return ((ov(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ov(e) {
	return nv() ? e instanceof Node || e instanceof iv(e).Node : !1;
}
function sv(e) {
	return nv() ? e instanceof Element || e instanceof iv(e).Element : !1;
}
function cv(e) {
	return nv() ? e instanceof HTMLElement || e instanceof iv(e).HTMLElement : !1;
}
function lv(e) {
	return !nv() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof iv(e).ShadowRoot;
}
function uv(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = xv(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function dv(e) {
	return /^(table|td|th)$/.test(rv(e));
}
function fv(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var pv = /transform|translate|scale|rotate|perspective|filter/, mv = /paint|layout|strict|content/, hv = (e) => !!e && e !== "none", gv;
function _v(e) {
	let t = sv(e) ? xv(e) : e;
	return hv(t.transform) || hv(t.translate) || hv(t.scale) || hv(t.rotate) || hv(t.perspective) || !yv() && (hv(t.backdropFilter) || hv(t.filter)) || pv.test(t.willChange || "") || mv.test(t.contain || "");
}
function vv(e) {
	let t = Cv(e);
	for (; cv(t) && !bv(t);) {
		if (_v(t)) return t;
		if (fv(t)) return null;
		t = Cv(t);
	}
	return null;
}
function yv() {
	return gv ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), gv;
}
function bv(e) {
	return /^(html|body|#document)$/.test(rv(e));
}
function xv(e) {
	return iv(e).getComputedStyle(e);
}
function Sv(e) {
	return sv(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Cv(e) {
	if (rv(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || lv(e) && e.host || av(e);
	return lv(t) ? t.host : t;
}
function wv(e) {
	let t = Cv(e);
	return bv(t) ? (e.ownerDocument || e).body : cv(t) && uv(t) ? t : wv(t);
}
function Tv(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = wv(e), i = r === e.ownerDocument?.body, a = iv(r);
	if (i) {
		let e = Ev(a);
		return t.concat(a, a.visualViewport || [], uv(r) ? r : [], e && n ? Tv(e) : []);
	}
	return t.concat(r, Tv(r, [], n));
}
function Ev(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Dv(e) {
	let t = xv(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = cv(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = w_(n) !== a || w_(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ov(e) {
	return sv(e) ? e : e.contextElement;
}
function kv(e) {
	let t = Ov(e);
	if (!cv(t)) return E_(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Dv(t), o = (a ? w_(n.width) : n.width) / r, s = (a ? w_(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Av = /*#__PURE__*/ E_(0);
function jv(e) {
	let t = iv(e);
	return !yv() || !t.visualViewport ? Av : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Mv(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === iv(e);
}
function Nv(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ov(e), o = E_(1);
	t && (r ? sv(r) && (o = kv(r)) : o = kv(e));
	let s = Mv(a, n, r) ? jv(a) : E_(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = iv(a), t = sv(r) ? iv(r) : r, n = e, i = Ev(n);
		for (; i && t !== n;) {
			let e = kv(i), t = i.getBoundingClientRect(), r = xv(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = iv(i), i = Ev(n);
		}
	}
	return q_({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Pv(e, t) {
	let n = Sv(e).scrollLeft;
	return t ? t.left + n : Nv(av(e)).left + n;
}
function Fv(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Pv(e, n),
		y: n.top + t.scrollTop
	};
}
function Iv(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = av(r), s = t ? fv(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = E_(1), u = E_(0), d = cv(r);
	if ((d || !a) && ((rv(r) !== "body" || uv(o)) && (c = Sv(r)), d)) {
		let e = Nv(r);
		l = kv(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Fv(o, c) : E_(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Lv(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Rv(e) {
	let t = Sv(e), n = e.ownerDocument.body, r = C_(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = C_(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Pv(e), o = -t.scrollTop;
	return xv(n).direction === "rtl" && (a += C_(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var zv = 25;
function Bv(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = iv(e), a = av(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !yv() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Pv(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= zv && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Vv(e, t) {
	let n = Nv(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = kv(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Hv(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Bv(e, n, t);
	else if (t === "document") r = Rv(av(e));
	else if (sv(t)) r = Vv(t, n);
	else {
		let n = jv(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return q_(r);
}
function Uv(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Tv(e, [], !1).filter((e) => sv(e) && rv(e) !== "body"), i = null, a = xv(e).position === "fixed", o = a ? Cv(e) : e;
	for (; sv(o) && !bv(o);) {
		let e = xv(o), t = _v(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Cv(o);
	}
	return t.set(e, r), r;
}
function Wv(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? fv(t) ? [] : Uv(t, this._c) : [].concat(n), r], o = Hv(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Hv(t, a[e], i);
		s = C_(n.top, s), c = S_(n.right, c), l = S_(n.bottom, l), u = C_(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Gv(e) {
	let { width: t, height: n } = Dv(e);
	return {
		width: t,
		height: n
	};
}
function Kv(e, t, n) {
	let r = cv(t), i = av(t), a = n === "fixed", o = Nv(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = E_(0);
	if ((r || !a) && ((rv(t) !== "body" || uv(i)) && (s = Sv(t)), r)) {
		let e = Nv(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Pv(i));
	let l = i && !r && !a ? Fv(i, s) : E_(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function qv(e) {
	return xv(e).position === "static";
}
function Jv(e, t) {
	if (!cv(e) || xv(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return av(e) === n && (n = n.ownerDocument.body), n;
}
function Yv(e, t) {
	let n = iv(e);
	if (fv(e)) return n;
	if (!cv(e)) {
		let t = Cv(e);
		for (; t && !bv(t);) {
			if (sv(t) && !qv(t)) return t;
			t = Cv(t);
		}
		return n;
	}
	let r = Jv(e, t);
	for (; r && dv(r) && qv(r);) r = Jv(r, t);
	return r && bv(r) && qv(r) && !_v(r) ? n : r || vv(e) || n;
}
var Xv = async function(e) {
	let t = this.getOffsetParent || Yv, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Kv(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Zv(e) {
	return xv(e).direction === "rtl";
}
var Qv = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Iv,
	getDocumentElement: av,
	getClippingRect: Wv,
	getOffsetParent: Yv,
	getElementRects: Xv,
	getClientRects: Lv,
	getDimensions: Gv,
	getScale: kv,
	isElement: sv,
	isRTL: Zv
};
function $v(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ey(e, t, n) {
	let r = null, i, a = av(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = T_(d), h = T_(a.clientWidth - (u + f)), g = T_(a.clientHeight - (d + p)), _ = T_(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: C_(0, S_(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!$v(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = iv(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function ty(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ov(e), u = i || a ? [...l ? Tv(l) : [], ...t ? Tv(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ey(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Nv(e) : null;
	c && g();
	function g() {
		let t = Nv(e);
		h && !$v(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ny = tv, ry = Q_, iy = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Qv,
		...i.platform,
		_c: r
	};
	return Z_(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@tiptap/suggestion/dist/index.js
function ay(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = Og(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
	if (!p) return null;
	let m = o.pos - p.length, h = Array.from(p.matchAll(f)).pop();
	if (!h || h.input === void 0 || h.index === void 0) return null;
	let g = h.input.slice(Math.max(0, h.index - 1), h.index), _ = RegExp(`^[${i?.join("")}\0]?$`).test(g);
	if (i !== null && !_) return null;
	let v = m + h.index, y = v + h[0].length;
	return s && l.test(p.slice(y - 1, y + 1)) && (h[0] += " ", y += 1), v < o.pos && y >= o.pos ? {
		range: {
			from: v,
			to: y
		},
		query: h[0].slice(t.length),
		text: h[0]
	} : null;
}
function oy(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function sy(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function cy(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : sy(e);
}
function ly({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !oy(r);
}
function uy({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function dy({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
	return {
		handleKeyDown(t, n) {
			var r;
			let i = e.getState(t.state);
			return i.active ? n.key === "Escape" || n.key === "Esc" ? ((r = a?.onKeyDown) == null || r.call(a, {
				view: t,
				event: n,
				range: i.range
			}), o(t), !0) : (a?.onKeyDown)?.call(a, {
				view: t,
				event: n,
				range: i.range
			}) || !1 : !1;
		},
		decorations(a) {
			let { active: o, range: s, decorationId: c, query: l } = e.getState(a);
			if (!o) return null;
			let u = !l?.length, d = [n];
			return u && d.push(i), Rf.create(a.doc, [Ff.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function fy({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
	return {
		init() {
			return {
				active: !1,
				range: {
					from: 0,
					to: 0
				},
				query: null,
				text: null,
				composing: !1,
				dismissedRange: null
			};
		},
		apply(d, f, p, m) {
			let { isEditable: h } = e, { composing: g } = e.view, { selection: _ } = d, { empty: v, from: y } = _, b = { ...f }, x = d.getMeta(u);
			if (x && x.exit) return b.active = !1, b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null, b.dismissedRange = f.active ? { ...f.range } : f.dismissedRange, b;
			if (b.composing = g, d.docChanged && b.dismissedRange !== null && (b.dismissedRange = {
				from: d.mapping.map(b.dismissedRange.from),
				to: d.mapping.map(b.dismissedRange.to)
			}), h && (v || e.view.composing)) {
				(y < f.range.from || y > f.range.to) && !g && !f.composing && (b.active = !1);
				let u = o({
					char: t,
					allowSpaces: n,
					allowToIncludeChar: r,
					allowedPrefixes: i,
					startOfLine: a,
					$position: _.$from
				}), p = `id_${Math.floor(Math.random() * 4294967295)}`;
				u && s({
					editor: e,
					state: m,
					range: u.range,
					isActive: f.active
				}) && (!c || c({
					editor: e,
					range: u.range,
					query: u.query,
					text: u.text,
					transaction: d
				})) ? (b.dismissedRange !== null && !l({
					match: u,
					dismissedRange: b.dismissedRange,
					state: m,
					transaction: d
				}) && (b.dismissedRange = null), b.dismissedRange === null ? (b.active = !0, b.decorationId = f.decorationId || p, b.range = u.range, b.query = u.query, b.text = u.text) : b.active = !1) : (u || (b.dismissedRange = null), b.active = !1);
			} else b.active = !1;
			return b.active || (b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null), b;
		}
	};
}
function py({ editor: e, items: t }) {
	let n = null, r = null, i = null, a = () => {
		r !== null && (clearTimeout(r), r = null), i?.(), i = null;
	}, o = (e) => new Promise((t) => {
		i = t, r = setTimeout(() => {
			r = null;
			let e = i;
			i = null, e?.();
		}, e);
	}), s = () => {
		n?.abort(), a(), n = null;
	};
	return {
		abort: s,
		fetch: async (r, i) => {
			s(), n = new AbortController();
			let a = n;
			if (i > 0 && await o(i), n !== a || a.signal.aborted) return { status: "aborted" };
			try {
				let i = await t({
					editor: e,
					query: r,
					signal: a.signal
				});
				return n !== a || a.signal.aborted ? { status: "aborted" } : {
					status: "resolved",
					items: i
				};
			} catch {
				return n !== a || a.signal.aborted ? { status: "aborted" } : { status: "error" };
			}
		}
	};
}
function my({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [ny({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(ry()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function hy(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function gy({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && hy(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = ty(c, o, () => {
			iy(c, o, {
				placement: n.placement,
				strategy: n.strategy,
				middleware: n.middleware
			}).then(({ x: e, y: t, placement: n, strategy: r }) => {
				if (s.onPosition) {
					s.onPosition({
						x: e,
						y: t,
						placement: n,
						strategy: r
					});
					return;
				}
				Object.assign(o.style, {
					position: r,
					left: `${e}px`,
					top: `${t}px`
				}), l || (l = !0, o.style.visibility = "");
			});
		}, s.autoUpdate), f;
		return i && (f = (e) => {
			let n = e.target;
			!(n instanceof Node) || o.contains(n) || t.contains(n) || a();
		}, document.addEventListener("pointerdown", f, !0)), () => {
			d(), f && document.removeEventListener("pointerdown", f, !0), u && o.remove();
		};
	};
}
function _y({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = py({
		editor: e,
		items: n
	}), v = my({
		placement: s,
		offset: c,
		flip: u,
		floatingUi: d
	});
	function y(e, t) {
		var n, i, a;
		switch (e) {
			case "started":
				(n = r?.onStart) == null || n.call(r, t);
				break;
			case "updated":
				(i = r?.onUpdate) == null || i.call(r, t);
				break;
			case "stopped": (a = r?.onExit) == null || a.call(r, t);
		}
	}
	return {
		update: async (n, d) => {
			var b, x;
			let S = t.getState(d), C = t.getState(n.state);
			if (!S || !C) return;
			let w = null, T = S.query !== C.query, E = S.text !== C.text, D = S.range.from !== C.range.from || S.range.to !== C.range.to, O = T || E || D;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && O) w = "updated";
			else return;
			let k = w === "stopped" ? S : C, A = n.dom.querySelector(`[data-decoration-id="${k.decorationId}"]`), j = m(n, A), ee = i === 0 || (k.query ? k.query.length >= i : !1), te = (w === "started" || w === "updated") && ee;
			if (g = {
				editor: e,
				range: k.range,
				query: k.query || "",
				text: k.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: k.range,
					props: t
				}),
				decorationNode: A,
				clientRect: j,
				loading: te,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: gy({
					getReferenceRect: j,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") if (!te) _.abort(), g = {
				...g,
				items: o ?? [],
				loading: !1
			};
			else {
				g = {
					...g,
					items: o ?? [],
					loading: !0
				}, w = "updated", y(w, g);
				let e = await _.fetch(k.query || "", a);
				if (e.status === "aborted") return;
				if (!t.getState(n.state)?.active) {
					_.abort();
					return;
				}
				g = e.status === "resolved" ? {
					...g,
					items: e.items,
					loading: !1
				} : {
					...g,
					loading: !1
				};
			}
			if (w === "stopped") {
				_.abort(), y(w, g), g = void 0;
				return;
			}
			w === "updated" && y(w, g);
		},
		destroy: () => {
			var e;
			_.abort(), g && ((e = r?.onExit) == null || e.call(r, g));
		}
	};
}
var vy = new uc("suggestion");
function yy({ pluginKey: e = vy, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = ay, shouldShow: T, shouldResetDismissed: E }) {
	let D = S?.(), O = r && !i, k = (n, r) => cy(t, n, r, e);
	function A(e) {
		return ly({
			...e,
			editor: t,
			shouldResetDismissed: E,
			effectiveAllowSpaces: O
		});
	}
	let j = (t) => uy({
		view: t,
		pluginKeyRef: e
	});
	return new K({
		key: e,
		view: () => _y({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: D,
			minQueryLength: p,
			debounce: m,
			initialItems: h,
			placement: g,
			offset: _,
			container: v,
			flip: y,
			floatingUi: b,
			dismissOnOutsideClick: x,
			command: d,
			clientRectFor: k,
			dispatchExit: j
		}),
		state: fy({
			editor: t,
			char: n,
			effectiveAllowSpaces: O,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: T,
			shouldKeepDismissed: A,
			pluginKey: e
		}),
		props: dy({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: D,
			dispatchExit: j
		})
	});
}
//#endregion
//#region node_modules/@tiptap/extension-mention/dist/index.js
function by({ editor: e, overrideSuggestionOptions: t, extensionName: n, char: r = "@" }) {
	return {
		editor: e,
		char: r,
		pluginKey: new uc(),
		command: ({ editor: e, range: t, props: i }) => {
			var a;
			(e.view.state.selection.$to.nodeAfter?.text)?.startsWith(" ") && (t.to += 1), e.chain().focus().insertContentAt(t, [{
				type: n,
				attrs: {
					...i,
					mentionSuggestionChar: r
				}
			}, {
				type: "text",
				text: " "
			}]).run(), (a = e.view.dom.ownerDocument.defaultView?.getSelection()) == null || a.collapseToEnd();
		},
		allow: ({ state: e, range: t }) => {
			let r = e.doc.resolve(t.from), i = e.schema.nodes[n];
			return !!r.parent.type.contentMatch.matchType(i);
		},
		...t
	};
}
function xy(e) {
	return (e.options.suggestions.length ? e.options.suggestions : [e.options.suggestion]).map((t) => by({
		editor: e.editor,
		overrideSuggestionOptions: t,
		extensionName: e.name,
		char: t.char
	}));
}
function Sy(e, t) {
	let n = xy(e);
	return n.find((e) => e.char === t) || (n.length ? n[0] : null);
}
var Cy = X.create({
	name: "mention",
	priority: 101,
	addOptions() {
		return {
			HTMLAttributes: {},
			renderText({ node: e, suggestion: t }) {
				return `${t?.char ?? "@"}${e.attrs.label ?? e.attrs.id}`;
			},
			deleteTriggerWithBackspace: !1,
			renderHTML({ options: e, node: t, suggestion: n }) {
				return [
					"span",
					vh(this.HTMLAttributes, e.HTMLAttributes),
					`${n?.char ?? "@"}${t.attrs.label ?? t.attrs.id}`
				];
			},
			suggestions: [],
			suggestion: {}
		};
	},
	group: "inline",
	inline: !0,
	selectable: !1,
	atom: !0,
	addAttributes() {
		return {
			id: {
				default: null,
				parseHTML: (e) => e.getAttribute("data-id"),
				renderHTML: (e) => e.id ? { "data-id": e.id } : {}
			},
			label: {
				default: null,
				parseHTML: (e) => e.getAttribute("data-label"),
				renderHTML: (e) => e.label ? { "data-label": e.label } : {}
			},
			mentionSuggestionChar: {
				default: "@",
				parseHTML: (e) => e.getAttribute("data-mention-suggestion-char"),
				renderHTML: (e) => ({ "data-mention-suggestion-char": e.mentionSuggestionChar })
			}
		};
	},
	parseHTML() {
		return [{ tag: `span[data-type="${this.name}"]` }];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = Sy(this, e.attrs.mentionSuggestionChar);
		if (this.options.renderLabel !== void 0) return console.warn("renderLabel is deprecated use renderText and renderHTML instead"), [
			"span",
			vh({ "data-type": this.name }, this.options.HTMLAttributes, t),
			this.options.renderLabel({
				options: this.options,
				node: e,
				suggestion: n
			})
		];
		let r = { ...this.options };
		r.HTMLAttributes = vh({ "data-type": this.name }, this.options.HTMLAttributes, t);
		let i = this.options.renderHTML({
			options: r,
			node: e,
			suggestion: n
		});
		return typeof i == "string" ? [
			"span",
			vh({ "data-type": this.name }, this.options.HTMLAttributes, t),
			i
		] : i;
	},
	...Rg({
		nodeName: "mention",
		name: "@",
		selfClosing: !0,
		allowedAttributes: [
			"id",
			"label",
			{
				name: "mentionSuggestionChar",
				skipIfDefault: "@"
			}
		],
		parseAttributes: (e) => {
			let t = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g, r = n.exec(e);
			for (; r !== null;) {
				let [, i, a, o] = r;
				t[i === "char" ? "mentionSuggestionChar" : i] = a ?? o, r = n.exec(e);
			}
			return t;
		},
		serializeAttributes: (e) => Object.entries(e).filter(([, e]) => e != null).map(([e, t]) => `${e === "mentionSuggestionChar" ? "char" : e}="${t}"`).join(" ")
	}),
	renderText({ node: e }) {
		let t = {
			options: this.options,
			node: e,
			suggestion: Sy(this, e.attrs.mentionSuggestionChar)
		};
		return this.options.renderLabel === void 0 ? this.options.renderText(t) : (console.warn("renderLabel is deprecated use renderText and renderHTML instead"), this.options.renderLabel(t));
	},
	addKeyboardShortcuts() {
		return { Backspace: () => this.editor.commands.command(({ tr: e, state: t }) => {
			let n = !1, { selection: r } = t, { empty: i, anchor: a } = r;
			if (!i) return !1;
			let o = new ja(), s = 0;
			return t.doc.nodesBetween(a - 1, a, (e, t) => {
				if (e.type.name === this.name) return n = !0, o = e, s = t, !1;
			}), n && e.insertText(this.options.deleteTriggerWithBackspace ? "" : o.attrs.mentionSuggestionChar, s, s + o.nodeSize), n;
		}) };
	},
	addProseMirrorPlugins() {
		return xy(this).map(yy);
	}
}), wy = {};
function Ty(e) {
	let t = wy[e];
	if (t) return t;
	t = wy[e] = [];
	for (let e = 0; e < 128; e++) {
		let n = String.fromCharCode(e);
		t.push(n);
	}
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		t[r] = "%" + ("0" + r.toString(16).toUpperCase()).slice(-2);
	}
	return t;
}
function Ey(e, t) {
	typeof t != "string" && (t = Ey.defaultChars);
	let n = Ty(t);
	return e.replace(/(%[a-f0-9]{2})+/gi, function(e) {
		let t = "";
		for (let r = 0, i = e.length; r < i; r += 3) {
			let a = parseInt(e.slice(r + 1, r + 3), 16);
			if (a < 128) {
				t += n[a];
				continue;
			}
			if ((a & 224) == 192 && r + 3 < i) {
				let n = parseInt(e.slice(r + 4, r + 6), 16);
				if ((n & 192) == 128) {
					let e = a << 6 & 1984 | n & 63;
					t += e < 128 ? "��" : String.fromCharCode(e), r += 3;
					continue;
				}
			}
			if ((a & 240) == 224 && r + 6 < i) {
				let n = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16);
				if ((n & 192) == 128 && (i & 192) == 128) {
					let e = a << 12 & 61440 | n << 6 & 4032 | i & 63;
					t += e < 2048 || e >= 55296 && e <= 57343 ? "���" : String.fromCharCode(e), r += 6;
					continue;
				}
			}
			if ((a & 248) == 240 && r + 9 < i) {
				let n = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16), o = parseInt(e.slice(r + 10, r + 12), 16);
				if ((n & 192) == 128 && (i & 192) == 128 && (o & 192) == 128) {
					let e = a << 18 & 1835008 | n << 12 & 258048 | i << 6 & 4032 | o & 63;
					e < 65536 || e > 1114111 ? t += "����" : (e -= 65536, t += String.fromCharCode(55296 + (e >> 10), 56320 + (e & 1023))), r += 9;
					continue;
				}
			}
			t += "�";
		}
		return t;
	});
}
Ey.defaultChars = ";/?:@&=+$,#", Ey.componentChars = "";
//#endregion
//#region node_modules/mdurl/lib/encode.mjs
var Dy = {};
function Oy(e) {
	let t = Dy[e];
	if (t) return t;
	t = Dy[e] = [];
	for (let e = 0; e < 128; e++) {
		let n = String.fromCharCode(e);
		/^[0-9a-z]$/i.test(n) ? t.push(n) : t.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
	}
	for (let n = 0; n < e.length; n++) t[e.charCodeAt(n)] = e[n];
	return t;
}
function ky(e, t, n) {
	typeof t != "string" && (n = t, t = ky.defaultChars), n === void 0 && (n = !0);
	let r = Oy(t), i = "";
	for (let t = 0, a = e.length; t < a; t++) {
		let o = e.charCodeAt(t);
		if (n && o === 37 && t + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(t + 1, t + 3))) {
			i += e.slice(t, t + 3), t += 2;
			continue;
		}
		if (o < 128) {
			i += r[o];
			continue;
		}
		if (o >= 55296 && o <= 57343) {
			if (o >= 55296 && o <= 56319 && t + 1 < a) {
				let n = e.charCodeAt(t + 1);
				if (n >= 56320 && n <= 57343) {
					i += encodeURIComponent(e[t] + e[t + 1]), t++;
					continue;
				}
			}
			i += "%EF%BF%BD";
			continue;
		}
		i += encodeURIComponent(e[t]);
	}
	return i;
}
ky.defaultChars = ";/?:@&=+$,-_.!~*'()#", ky.componentChars = "-_.!~*'()";
//#endregion
//#region node_modules/mdurl/lib/format.mjs
function Ay(e) {
	let t = "";
	return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
//#endregion
//#region node_modules/mdurl/lib/parse.mjs
function jy() {
	this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var My = /^([a-z0-9.+-]+:)/i, Ny = /:[0-9]*$/, Py = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Fy = [
	"%",
	"/",
	"?",
	";",
	"#",
	"'",
	"{",
	"}",
	"|",
	"\\",
	"^",
	"`",
	"<",
	">",
	"\"",
	"`",
	" ",
	"\r",
	"\n",
	"	"
], Iy = [
	"/",
	"?",
	"#"
], Ly = 255, Ry = /^[+a-z0-9A-Z_-]{0,63}$/, zy = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, By = {
	javascript: !0,
	"javascript:": !0
}, Vy = {
	http: !0,
	https: !0,
	ftp: !0,
	gopher: !0,
	file: !0,
	"http:": !0,
	"https:": !0,
	"ftp:": !0,
	"gopher:": !0,
	"file:": !0
};
function Hy(e, t) {
	if (e && e instanceof jy) return e;
	let n = new jy();
	return n.parse(e, t), n;
}
jy.prototype.parse = function(e, t) {
	let n, r, i, a = e;
	if (a = a.trim(), !t && e.split("#").length === 1) {
		let e = Py.exec(a);
		if (e) return this.pathname = e[1], e[2] && (this.search = e[2]), this;
	}
	let o = My.exec(a);
	if (o && (o = o[0], n = o.toLowerCase(), this.protocol = o, a = a.substr(o.length)), (t || o || a.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = a.substr(0, 2) === "//", i && !(o && By[o]) && (a = a.substr(2), this.slashes = !0)), !By[o] && (i || o && !Vy[o])) {
		let e = -1;
		for (let t = 0; t < Iy.length; t++) r = a.indexOf(Iy[t]), r !== -1 && (e === -1 || r < e) && (e = r);
		let t, n;
		n = e === -1 ? a.lastIndexOf("@") : a.lastIndexOf("@", e), n !== -1 && (t = a.slice(0, n), a = a.slice(n + 1), this.auth = t), e = -1;
		for (let t = 0; t < Fy.length; t++) r = a.indexOf(Fy[t]), r !== -1 && (e === -1 || r < e) && (e = r);
		e === -1 && (e = a.length), a[e - 1] === ":" && e--;
		let i = a.slice(0, e);
		a = a.slice(e), this.parseHost(i), this.hostname = this.hostname || "";
		let o = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
		if (!o) {
			let e = this.hostname.split(/\./);
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				if (n && !n.match(Ry)) {
					let r = "";
					for (let e = 0, t = n.length; e < t; e++) n.charCodeAt(e) > 127 ? r += "x" : r += n[e];
					if (!r.match(Ry)) {
						let r = e.slice(0, t), i = e.slice(t + 1), o = n.match(zy);
						o && (r.push(o[1]), i.unshift(o[2])), i.length && (a = i.join(".") + a), this.hostname = r.join(".");
						break;
					}
				}
			}
		}
		this.hostname.length > Ly && (this.hostname = ""), o && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
	}
	let s = a.indexOf("#");
	s !== -1 && (this.hash = a.substr(s), a = a.slice(0, s));
	let c = a.indexOf("?");
	return c !== -1 && (this.search = a.substr(c), a = a.slice(0, c)), a && (this.pathname = a), Vy[n] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, jy.prototype.parseHost = function(e) {
	let t = Ny.exec(e);
	t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
//#endregion
//#region node_modules/mdurl/index.mjs
var Uy = /* @__PURE__ */ D({
	decode: () => Ey,
	encode: () => ky,
	format: () => Ay,
	parse: () => Hy
}), Wy = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Gy = /[\0-\x1F\x7F-\x9F]/, Ky = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, qy = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Jy = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, Yy = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, Xy = /* @__PURE__ */ D({
	Any: () => Wy,
	Cc: () => Gy,
	Cf: () => Ky,
	P: () => qy,
	S: () => Jy,
	Z: () => Yy
}), Zy = new Uint16Array("ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻\"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌".split("").map((e) => e.charCodeAt(0))), Qy = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))), $y = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]), eb = String.fromCodePoint ?? function(e) {
	let t = "";
	return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
};
function tb(e) {
	return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : $y.get(e) ?? e;
}
//#endregion
//#region node_modules/markdown-it/node_modules/entities/lib/esm/decode.js
var nb;
(function(e) {
	e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(nb ||= {});
var rb = 32, ib;
(function(e) {
	e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(ib ||= {});
function ab(e) {
	return e >= nb.ZERO && e <= nb.NINE;
}
function ob(e) {
	return e >= nb.UPPER_A && e <= nb.UPPER_F || e >= nb.LOWER_A && e <= nb.LOWER_F;
}
function sb(e) {
	return e >= nb.UPPER_A && e <= nb.UPPER_Z || e >= nb.LOWER_A && e <= nb.LOWER_Z || ab(e);
}
function cb(e) {
	return e === nb.EQUALS || sb(e);
}
var lb;
(function(e) {
	e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(lb ||= {});
var ub;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ub ||= {});
var db = class {
	constructor(e, t, n) {
		this.decodeTree = e, this.emitCodePoint = t, this.errors = n, this.state = lb.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ub.Strict;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = lb.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
	}
	write(e, t) {
		switch (this.state) {
			case lb.EntityStart: return e.charCodeAt(t) === nb.NUM ? (this.state = lb.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = lb.NamedEntity, this.stateNamedEntity(e, t));
			case lb.NumericStart: return this.stateNumericStart(e, t);
			case lb.NumericDecimal: return this.stateNumericDecimal(e, t);
			case lb.NumericHex: return this.stateNumericHex(e, t);
			case lb.NamedEntity: return this.stateNamedEntity(e, t);
		}
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | rb) === nb.LOWER_X ? (this.state = lb.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = lb.NumericDecimal, this.stateNumericDecimal(e, t));
	}
	addToNumericResult(e, t, n, r) {
		if (t !== n) {
			let i = n - t;
			this.result = this.result * r ** +i + parseInt(e.substr(t, i), r), this.consumed += i;
		}
	}
	stateNumericHex(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (ab(r) || ob(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 16), this.emitNumericEntity(r, 3);
		}
		return this.addToNumericResult(e, n, t, 16), -1;
	}
	stateNumericDecimal(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (ab(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 10), this.emitNumericEntity(r, 2);
		}
		return this.addToNumericResult(e, n, t, 10), -1;
	}
	emitNumericEntity(e, t) {
		var n;
		if (this.consumed <= t) return (n = this.errors) == null || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === nb.SEMI) this.consumed += 1;
		else if (this.decodeMode === ub.Strict) return 0;
		return this.emitCodePoint(tb(this.result), this.consumed), this.errors && (e !== nb.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	stateNamedEntity(e, t) {
		let { decodeTree: n } = this, r = n[this.treeIndex], i = (r & ib.VALUE_LENGTH) >> 14;
		for (; t < e.length; t++, this.excess++) {
			let a = e.charCodeAt(t);
			if (this.treeIndex = pb(n, r, this.treeIndex + Math.max(1, i), a), this.treeIndex < 0) return this.result === 0 || this.decodeMode === ub.Attribute && (i === 0 || cb(a)) ? 0 : this.emitNotTerminatedNamedEntity();
			if (r = n[this.treeIndex], i = (r & ib.VALUE_LENGTH) >> 14, i !== 0) {
				if (a === nb.SEMI) return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
				this.decodeMode !== ub.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
			}
		}
		return -1;
	}
	emitNotTerminatedNamedEntity() {
		var e;
		let { result: t, decodeTree: n } = this, r = (n[t] & ib.VALUE_LENGTH) >> 14;
		return this.emitNamedEntityData(t, r, this.consumed), (e = this.errors) == null || e.missingSemicolonAfterCharacterReference(), this.consumed;
	}
	emitNamedEntityData(e, t, n) {
		let { decodeTree: r } = this;
		return this.emitCodePoint(t === 1 ? r[e] & ~ib.VALUE_LENGTH : r[e + 1], n), t === 3 && this.emitCodePoint(r[e + 2], n), n;
	}
	end() {
		var e;
		switch (this.state) {
			case lb.NamedEntity: return this.result !== 0 && (this.decodeMode !== ub.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case lb.NumericDecimal: return this.emitNumericEntity(0, 2);
			case lb.NumericHex: return this.emitNumericEntity(0, 3);
			case lb.NumericStart: return (e = this.errors) == null || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			case lb.EntityStart: return 0;
		}
	}
};
function fb(e) {
	let t = "", n = new db(e, (e) => t += eb(e));
	return function(e, r) {
		let i = 0, a = 0;
		for (; (a = e.indexOf("&", a)) >= 0;) {
			t += e.slice(i, a), n.startEntity(r);
			let o = n.write(e, a + 1);
			if (o < 0) {
				i = a + n.end();
				break;
			}
			i = a + o, a = o === 0 ? i + 1 : i;
		}
		let o = t + e.slice(i);
		return t = "", o;
	};
}
function pb(e, t, n, r) {
	let i = (t & ib.BRANCH_LENGTH) >> 7, a = t & ib.JUMP_TABLE;
	if (i === 0) return a !== 0 && r === a ? n : -1;
	if (a) {
		let t = r - a;
		return t < 0 || t >= i ? -1 : e[n + t] - 1;
	}
	let o = n, s = o + i - 1;
	for (; o <= s;) {
		let t = o + s >>> 1, n = e[t];
		if (n < r) o = t + 1;
		else if (n > r) s = t - 1;
		else return e[t + i];
	}
	return -1;
}
var mb = fb(Zy);
fb(Qy);
function hb(e, t = ub.Legacy) {
	return mb(e, t);
}
function gb(e) {
	return mb(e, ub.Strict);
}
//#endregion
//#region node_modules/markdown-it/lib/common/utils.mjs
var _b = /* @__PURE__ */ D({
	arrayReplaceAt: () => Cb,
	asciiTrim: () => Gb,
	assign: () => Sb,
	escapeHtml: () => Ib,
	escapeRE: () => Rb,
	fromCodePoint: () => Tb,
	has: () => xb,
	isMdAsciiPunct: () => Hb,
	isPunctChar: () => Bb,
	isPunctCharCode: () => Vb,
	isSpace: () => Z,
	isString: () => yb,
	isValidEntityCode: () => wb,
	isWhiteSpace: () => zb,
	lib: () => Kb,
	normalizeReference: () => Ub,
	unescapeAll: () => jb,
	unescapeMd: () => Ab
});
function vb(e) {
	return Object.prototype.toString.call(e);
}
function yb(e) {
	return vb(e) === "[object String]";
}
var bb = Object.prototype.hasOwnProperty;
function xb(e, t) {
	return bb.call(e, t);
}
function Sb(e) {
	return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
		if (t) {
			if (typeof t != "object") throw TypeError(t + "must be object");
			Object.keys(t).forEach(function(n) {
				e[n] = t[n];
			});
		}
	}), e;
}
function Cb(e, t, n) {
	return [].concat(e.slice(0, t), n, e.slice(t + 1));
}
function wb(e) {
	return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) == 65535 || (e & 65535) == 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function Tb(e) {
	if (e > 65535) {
		e -= 65536;
		let t = 55296 + (e >> 10), n = 56320 + (e & 1023);
		return String.fromCharCode(t, n);
	}
	return String.fromCharCode(e);
}
var Eb = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, Db = RegExp(Eb.source + "|&([a-z#][a-z0-9]{1,31});", "gi"), Ob = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function kb(e, t) {
	if (t.charCodeAt(0) === 35 && Ob.test(t)) {
		let n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
		return wb(n) ? Tb(n) : e;
	}
	let n = hb(e);
	return n === e ? e : n;
}
function Ab(e) {
	return e.indexOf("\\") < 0 ? e : e.replace(Eb, "$1");
}
function jb(e) {
	return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(Db, function(e, t, n) {
		return t || kb(e, n);
	});
}
var Mb = /[&<>"]/, Nb = /[&<>"]/g, Pb = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
};
function Fb(e) {
	return Pb[e];
}
function Ib(e) {
	return Mb.test(e) ? e.replace(Nb, Fb) : e;
}
var Lb = /[.?*+^$[\]\\(){}|-]/g;
function Rb(e) {
	return e.replace(Lb, "\\$&");
}
function Z(e) {
	switch (e) {
		case 9:
		case 32: return !0;
	}
	return !1;
}
function zb(e) {
	if (e >= 8192 && e <= 8202) return !0;
	switch (e) {
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 32:
		case 160:
		case 5760:
		case 8239:
		case 8287:
		case 12288: return !0;
	}
	return !1;
}
function Bb(e) {
	return qy.test(e) || Jy.test(e);
}
function Vb(e) {
	return Bb(Tb(e));
}
function Hb(e) {
	switch (e) {
		case 33:
		case 34:
		case 35:
		case 36:
		case 37:
		case 38:
		case 39:
		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 58:
		case 59:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 124:
		case 125:
		case 126: return !0;
		default: return !1;
	}
}
function Ub(e) {
	return e = e.trim().replace(/\s+/g, " "), e.toLowerCase().toUpperCase();
}
function Wb(e) {
	return e === 32 || e === 9 || e === 10 || e === 13;
}
function Gb(e) {
	let t = 0;
	for (; t < e.length && Wb(e.charCodeAt(t)); t++);
	let n = e.length - 1;
	for (; n >= t && Wb(e.charCodeAt(n)); n--);
	return e.slice(t, n + 1);
}
var Kb = {
	mdurl: Uy,
	ucmicro: Xy
};
//#endregion
//#region node_modules/markdown-it/lib/helpers/parse_link_label.mjs
function qb(e, t, n) {
	let r, i, a, o, s = e.posMax, c = e.pos;
	for (e.pos = t + 1, r = 1; e.pos < s;) {
		if (a = e.src.charCodeAt(e.pos), a === 93 && (r--, r === 0)) {
			i = !0;
			break;
		}
		if (o = e.pos, e.md.inline.skipToken(e), a === 91) {
			if (o === e.pos - 1) r++;
			else if (n) return e.pos = c, -1;
		}
	}
	let l = -1;
	return i && (l = e.pos), e.pos = c, l;
}
//#endregion
//#region node_modules/markdown-it/lib/helpers/parse_link_destination.mjs
function Jb(e, t, n) {
	let r, i = t, a = {
		ok: !1,
		pos: 0,
		str: ""
	};
	if (e.charCodeAt(i) === 60) {
		for (i++; i < n;) {
			if (r = e.charCodeAt(i), r === 10 || r === 60) return a;
			if (r === 62) return a.pos = i + 1, a.str = jb(e.slice(t + 1, i)), a.ok = !0, a;
			if (r === 92 && i + 1 < n) {
				i += 2;
				continue;
			}
			i++;
		}
		return a;
	}
	let o = 0;
	for (; i < n && (r = e.charCodeAt(i), !(r === 32 || r < 32 || r === 127));) {
		if (r === 92 && i + 1 < n) {
			if (e.charCodeAt(i + 1) === 32) break;
			i += 2;
			continue;
		}
		if (r === 40 && (o++, o > 32)) return a;
		if (r === 41) {
			if (o === 0) break;
			o--;
		}
		i++;
	}
	return t === i || o !== 0 ? a : (a.str = jb(e.slice(t, i)), a.pos = i, a.ok = !0, a);
}
//#endregion
//#region node_modules/markdown-it/lib/helpers/parse_link_title.mjs
function Yb(e, t, n, r) {
	let i, a = t, o = {
		ok: !1,
		can_continue: !1,
		pos: 0,
		str: "",
		marker: 0
	};
	if (r) o.str = r.str, o.marker = r.marker;
	else {
		if (a >= n) return o;
		let r = e.charCodeAt(a);
		if (r !== 34 && r !== 39 && r !== 40) return o;
		t++, a++, r === 40 && (r = 41), o.marker = r;
	}
	for (; a < n;) {
		if (i = e.charCodeAt(a), i === o.marker) return o.pos = a + 1, o.str += jb(e.slice(t, a)), o.ok = !0, o;
		if (i === 40 && o.marker === 41) return o;
		i === 92 && a + 1 < n && a++, a++;
	}
	return o.can_continue = !0, o.str += jb(e.slice(t, a)), o;
}
//#endregion
//#region node_modules/markdown-it/lib/helpers/index.mjs
var Xb = /* @__PURE__ */ D({
	parseLinkDestination: () => Jb,
	parseLinkLabel: () => qb,
	parseLinkTitle: () => Yb
}), Zb = {};
Zb.code_inline = function(e, t, n, r, i) {
	let a = e[t];
	return "<code" + i.renderAttrs(a) + ">" + Ib(a.content) + "</code>";
}, Zb.code_block = function(e, t, n, r, i) {
	let a = e[t];
	return "<pre" + i.renderAttrs(a) + "><code>" + Ib(e[t].content) + "</code></pre>\n";
}, Zb.fence = function(e, t, n, r, i) {
	let a = e[t], o = a.info ? jb(a.info).trim() : "", s = "", c = "";
	if (o) {
		let e = o.split(/(\s+)/g);
		s = e[0], c = e.slice(2).join("");
	}
	let l;
	if (l = n.highlight && n.highlight(a.content, s, c) || Ib(a.content), l.indexOf("<pre") === 0) return l + "\n";
	if (o) {
		let e = a.attrIndex("class"), t = a.attrs ? a.attrs.slice() : [];
		e < 0 ? t.push(["class", n.langPrefix + s]) : (t[e] = t[e].slice(), t[e][1] += " " + n.langPrefix + s);
		let r = { attrs: t };
		return `<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`;
	}
	return `<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`;
}, Zb.image = function(e, t, n, r, i) {
	let a = e[t];
	return a.attrs[a.attrIndex("alt")][1] = i.renderInlineAsText(a.children, n, r), i.renderToken(e, t, n);
}, Zb.hardbreak = function(e, t, n) {
	return n.xhtmlOut ? "<br />\n" : "<br>\n";
}, Zb.softbreak = function(e, t, n) {
	return n.breaks ? n.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, Zb.text = function(e, t) {
	return Ib(e[t].content);
}, Zb.html_block = function(e, t) {
	return e[t].content;
}, Zb.html_inline = function(e, t) {
	return e[t].content;
};
function Qb() {
	this.rules = Sb({}, Zb);
}
Qb.prototype.renderAttrs = function(e) {
	let t, n, r;
	if (!e.attrs) return "";
	for (r = "", t = 0, n = e.attrs.length; t < n; t++) r += " " + Ib(e.attrs[t][0]) + "=\"" + Ib(e.attrs[t][1]) + "\"";
	return r;
}, Qb.prototype.renderToken = function(e, t, n) {
	let r = e[t], i = "";
	if (r.hidden) return "";
	r.block && r.nesting !== -1 && t && e[t - 1].hidden && (i += "\n"), i += (r.nesting === -1 ? "</" : "<") + r.tag, i += this.renderAttrs(r), r.nesting === 0 && n.xhtmlOut && (i += " /");
	let a = !1;
	if (r.block && (a = !0, r.nesting === 1 && t + 1 < e.length)) {
		let n = e[t + 1];
		(n.type === "inline" || n.hidden || n.nesting === -1 && n.tag === r.tag) && (a = !1);
	}
	return i += a ? ">\n" : ">", i;
}, Qb.prototype.renderInline = function(e, t, n) {
	let r = "", i = this.rules;
	for (let a = 0, o = e.length; a < o; a++) {
		let o = e[a].type;
		i[o] === void 0 ? r += this.renderToken(e, a, t) : r += i[o](e, a, t, n, this);
	}
	return r;
}, Qb.prototype.renderInlineAsText = function(e, t, n) {
	let r = "";
	for (let i = 0, a = e.length; i < a; i++) switch (e[i].type) {
		case "text":
			r += e[i].content;
			break;
		case "image":
			r += this.renderInlineAsText(e[i].children, t, n);
			break;
		case "html_inline":
		case "html_block":
			r += e[i].content;
			break;
		case "softbreak":
		case "hardbreak": r += "\n";
	}
	return r;
}, Qb.prototype.render = function(e, t, n) {
	let r = "", i = this.rules;
	for (let a = 0, o = e.length; a < o; a++) {
		let o = e[a].type;
		o === "inline" ? r += this.renderInline(e[a].children, t, n) : i[o] === void 0 ? r += this.renderToken(e, a, t, n) : r += i[o](e, a, t, n, this);
	}
	return r;
};
//#endregion
//#region node_modules/markdown-it/lib/ruler.mjs
function $b() {
	this.__rules__ = [], this.__cache__ = null;
}
$b.prototype.__find__ = function(e) {
	for (let t = 0; t < this.__rules__.length; t++) if (this.__rules__[t].name === e) return t;
	return -1;
}, $b.prototype.__compile__ = function() {
	let e = this, t = [""];
	e.__rules__.forEach(function(e) {
		e.enabled && e.alt.forEach(function(e) {
			t.indexOf(e) < 0 && t.push(e);
		});
	}), e.__cache__ = {}, t.forEach(function(t) {
		e.__cache__[t] = [], e.__rules__.forEach(function(n) {
			n.enabled && (t && n.alt.indexOf(t) < 0 || e.__cache__[t].push(n.fn));
		});
	});
}, $b.prototype.at = function(e, t, n) {
	let r = this.__find__(e), i = n || {};
	if (r === -1) throw Error("Parser rule not found: " + e);
	this.__rules__[r].fn = t, this.__rules__[r].alt = i.alt || [], this.__cache__ = null;
}, $b.prototype.before = function(e, t, n, r) {
	let i = this.__find__(e), a = r || {};
	if (i === -1) throw Error("Parser rule not found: " + e);
	this.__rules__.splice(i, 0, {
		name: t,
		enabled: !0,
		fn: n,
		alt: a.alt || []
	}), this.__cache__ = null;
}, $b.prototype.after = function(e, t, n, r) {
	let i = this.__find__(e), a = r || {};
	if (i === -1) throw Error("Parser rule not found: " + e);
	this.__rules__.splice(i + 1, 0, {
		name: t,
		enabled: !0,
		fn: n,
		alt: a.alt || []
	}), this.__cache__ = null;
}, $b.prototype.push = function(e, t, n) {
	let r = n || {};
	this.__rules__.push({
		name: e,
		enabled: !0,
		fn: t,
		alt: r.alt || []
	}), this.__cache__ = null;
}, $b.prototype.enable = function(e, t) {
	Array.isArray(e) || (e = [e]);
	let n = [];
	return e.forEach(function(e) {
		let r = this.__find__(e);
		if (r < 0) {
			if (t) return;
			throw Error("Rules manager: invalid rule name " + e);
		}
		this.__rules__[r].enabled = !0, n.push(e);
	}, this), this.__cache__ = null, n;
}, $b.prototype.enableOnly = function(e, t) {
	Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(e) {
		e.enabled = !1;
	}), this.enable(e, t);
}, $b.prototype.disable = function(e, t) {
	Array.isArray(e) || (e = [e]);
	let n = [];
	return e.forEach(function(e) {
		let r = this.__find__(e);
		if (r < 0) {
			if (t) return;
			throw Error("Rules manager: invalid rule name " + e);
		}
		this.__rules__[r].enabled = !1, n.push(e);
	}, this), this.__cache__ = null, n;
}, $b.prototype.getRules = function(e) {
	return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
//#endregion
//#region node_modules/markdown-it/lib/token.mjs
function ex(e, t, n) {
	this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
ex.prototype.attrIndex = function(e) {
	if (!this.attrs) return -1;
	let t = this.attrs;
	for (let n = 0, r = t.length; n < r; n++) if (t[n][0] === e) return n;
	return -1;
}, ex.prototype.attrPush = function(e) {
	this.attrs ? this.attrs.push(e) : this.attrs = [e];
}, ex.prototype.attrSet = function(e, t) {
	let n = this.attrIndex(e), r = [e, t];
	n < 0 ? this.attrPush(r) : this.attrs[n] = r;
}, ex.prototype.attrGet = function(e) {
	let t = this.attrIndex(e), n = null;
	return t >= 0 && (n = this.attrs[t][1]), n;
}, ex.prototype.attrJoin = function(e, t) {
	let n = this.attrIndex(e);
	n < 0 ? this.attrPush([e, t]) : this.attrs[n][1] = this.attrs[n][1] + " " + t;
};
//#endregion
//#region node_modules/markdown-it/lib/rules_core/state_core.mjs
function tx(e, t, n) {
	this.src = e, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = t;
}
tx.prototype.Token = ex;
//#endregion
//#region node_modules/markdown-it/lib/rules_core/normalize.mjs
var nx = /\r\n?|\n/g, rx = /\0/g;
function ix(e) {
	let t;
	t = e.src.replace(nx, "\n"), t = t.replace(rx, "�"), e.src = t;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/block.mjs
function ax(e) {
	let t;
	e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/inline.mjs
function ox(e) {
	let t = e.tokens;
	for (let n = 0, r = t.length; n < r; n++) {
		let r = t[n];
		r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
	}
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/linkify.mjs
function sx(e) {
	return /^<a[>\s]/i.test(e);
}
function cx(e) {
	return /^<\/a\s*>/i.test(e);
}
function lx(e) {
	let t = e.tokens;
	if (e.md.options.linkify) for (let n = 0, r = t.length; n < r; n++) {
		if (t[n].type !== "inline" || !e.md.linkify.pretest(t[n].content)) continue;
		let r = t[n].children, i = 0;
		for (let a = r.length - 1; a >= 0; a--) {
			let o = r[a];
			if (o.type === "link_close") {
				for (a--; r[a].level !== o.level && r[a].type !== "link_open";) a--;
				continue;
			}
			if (o.type === "html_inline" && (sx(o.content) && i > 0 && i--, cx(o.content) && i++), !(i > 0) && o.type === "text" && e.md.linkify.test(o.content)) {
				let i = o.content, s = e.md.linkify.match(i), c = [], l = o.level, u = 0;
				s.length > 0 && s[0].index === 0 && a > 0 && r[a - 1].type === "text_special" && (s = s.slice(1));
				for (let t = 0; t < s.length; t++) {
					let n = s[t].url, r = e.md.normalizeLink(n);
					if (!e.md.validateLink(r)) continue;
					let a = s[t].text;
					a = s[t].schema ? s[t].schema === "mailto:" && !/^mailto:/i.test(a) ? e.md.normalizeLinkText("mailto:" + a).replace(/^mailto:/, "") : e.md.normalizeLinkText(a) : e.md.normalizeLinkText("http://" + a).replace(/^http:\/\//, "");
					let o = s[t].index;
					if (o > u) {
						let t = new e.Token("text", "", 0);
						t.content = i.slice(u, o), t.level = l, c.push(t);
					}
					let d = new e.Token("link_open", "a", 1);
					d.attrs = [["href", r]], d.level = l++, d.markup = "linkify", d.info = "auto", c.push(d);
					let f = new e.Token("text", "", 0);
					f.content = a, f.level = l, c.push(f);
					let p = new e.Token("link_close", "a", -1);
					p.level = --l, p.markup = "linkify", p.info = "auto", c.push(p), u = s[t].lastIndex;
				}
				if (u < i.length) {
					let t = new e.Token("text", "", 0);
					t.content = i.slice(u), t.level = l, c.push(t);
				}
				t[n].children = r = Cb(r, a, c);
			}
		}
	}
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/replacements.mjs
var ux = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, dx = /\((c|tm|r)\)/i, fx = /\((c|tm|r)\)/gi, px = {
	c: "©",
	r: "®",
	tm: "™"
};
function mx(e, t) {
	return px[t.toLowerCase()];
}
function hx(e) {
	let t = 0;
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		r.type === "text" && !t && (r.content = r.content.replace(fx, mx)), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
	}
}
function gx(e) {
	let t = 0;
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		r.type === "text" && !t && ux.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
	}
}
function _x(e) {
	let t;
	if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) e.tokens[t].type === "inline" && (dx.test(e.tokens[t].content) && hx(e.tokens[t].children), ux.test(e.tokens[t].content) && gx(e.tokens[t].children));
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/smartquotes.mjs
var vx = /['"]/, yx = /['"]/g, bx = "’";
function xx(e, t, n, r) {
	e[t] || (e[t] = []), e[t].push({
		pos: n,
		ch: r
	});
}
function Sx(e, t) {
	let n = "", r = 0;
	t.sort((e, t) => e.pos - t.pos);
	for (let i = 0; i < t.length; i++) {
		let a = t[i];
		n += e.slice(r, a.pos) + a.ch, r = a.pos + 1;
	}
	return n + e.slice(r);
}
function Cx(e, t) {
	let n, r = [], i = {};
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = e[a].level;
		for (n = r.length - 1; n >= 0 && !(r[n].level <= s); n--);
		if (r.length = n + 1, o.type !== "text") continue;
		let c = o.content, l = 0, u = c.length;
		OUTER: for (; l < u;) {
			yx.lastIndex = l;
			let o = yx.exec(c);
			if (!o) break;
			let d = !0, f = !0;
			l = o.index + 1;
			let p = o[0] === "'", m = 32;
			if (o.index - 1 >= 0) m = c.charCodeAt(o.index - 1);
			else for (n = a - 1; n >= 0 && e[n].type !== "softbreak" && e[n].type !== "hardbreak"; n--) if (e[n].content) {
				m = e[n].content.charCodeAt(e[n].content.length - 1);
				break;
			}
			let h = 32;
			if (l < u) h = c.charCodeAt(l);
			else for (n = a + 1; n < e.length && e[n].type !== "softbreak" && e[n].type !== "hardbreak"; n++) if (e[n].content) {
				h = e[n].content.charCodeAt(0);
				break;
			}
			let g = Hb(m) || Vb(m), _ = Hb(h) || Vb(h), v = zb(m), y = zb(h);
			if (y ? d = !1 : _ && (v || g || (d = !1)), v ? f = !1 : g && (y || _ || (f = !1)), h === 34 && o[0] === "\"" && m >= 48 && m <= 57 && (f = d = !1), d && f && (d = g, f = _), !d && !f) {
				p && xx(i, a, o.index, bx);
				continue;
			}
			if (f) for (n = r.length - 1; n >= 0; n--) {
				let e = r[n];
				if (r[n].level < s) break;
				if (e.single === p && r[n].level === s) {
					e = r[n];
					let s, c;
					p ? (s = t.md.options.quotes[2], c = t.md.options.quotes[3]) : (s = t.md.options.quotes[0], c = t.md.options.quotes[1]), xx(i, a, o.index, c), xx(i, e.token, e.pos, s), r.length = n;
					continue OUTER;
				}
			}
			d ? r.push({
				token: a,
				pos: o.index,
				single: p,
				level: s
			}) : f && p && xx(i, a, o.index, bx);
		}
	}
	Object.keys(i).forEach(function(t) {
		e[t].content = Sx(e[t].content, i[t]);
	});
}
function wx(e) {
	if (e.md.options.typographer) for (let t = e.tokens.length - 1; t >= 0; t--) e.tokens[t].type !== "inline" || !vx.test(e.tokens[t].content) || Cx(e.tokens[t].children, e);
}
//#endregion
//#region node_modules/markdown-it/lib/rules_core/text_join.mjs
function Tx(e) {
	let t, n, r = e.tokens, i = r.length;
	for (let e = 0; e < i; e++) {
		if (r[e].type !== "inline") continue;
		let i = r[e].children, a = i.length;
		for (t = 0; t < a; t++) i[t].type === "text_special" && (i[t].type = "text");
		for (t = n = 0; t < a; t++) i[t].type === "text" && t + 1 < a && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
		t !== n && (i.length = n);
	}
}
//#endregion
//#region node_modules/markdown-it/lib/parser_core.mjs
var Ex = [
	["normalize", ix],
	["block", ax],
	["inline", ox],
	["linkify", lx],
	["replacements", _x],
	["smartquotes", wx],
	["text_join", Tx]
];
function Dx() {
	this.ruler = new $b();
	for (let e = 0; e < Ex.length; e++) this.ruler.push(Ex[e][0], Ex[e][1]);
}
Dx.prototype.process = function(e) {
	let t = this.ruler.getRules("");
	for (let n = 0, r = t.length; n < r; n++) t[n](e);
}, Dx.prototype.State = tx;
//#endregion
//#region node_modules/markdown-it/lib/rules_block/state_block.mjs
function Ox(e, t, n, r) {
	this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
	let i = this.src;
	for (let e = 0, t = 0, n = 0, r = 0, a = i.length, o = !1; t < a; t++) {
		let s = i.charCodeAt(t);
		if (!o) if (Z(s)) {
			n++, s === 9 ? r += 4 - r % 4 : r++;
			continue;
		} else o = !0;
		(s === 10 || t === a - 1) && (s !== 10 && t++, this.bMarks.push(e), this.eMarks.push(t), this.tShift.push(n), this.sCount.push(r), this.bsCount.push(0), o = !1, n = 0, r = 0, e = t + 1);
	}
	this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Ox.prototype.push = function(e, t, n) {
	let r = new ex(e, t, n);
	return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
}, Ox.prototype.isEmpty = function(e) {
	return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
}, Ox.prototype.skipEmptyLines = function(e) {
	for (let t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
	return e;
}, Ox.prototype.skipSpaces = function(e) {
	for (let t = this.src.length; e < t && Z(this.src.charCodeAt(e)); e++);
	return e;
}, Ox.prototype.skipSpacesBack = function(e, t) {
	if (e <= t) return e;
	for (; e > t;) if (!Z(this.src.charCodeAt(--e))) return e + 1;
	return e;
}, Ox.prototype.skipChars = function(e, t) {
	for (let n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++);
	return e;
}, Ox.prototype.skipCharsBack = function(e, t, n) {
	if (e <= n) return e;
	for (; e > n;) if (t !== this.src.charCodeAt(--e)) return e + 1;
	return e;
}, Ox.prototype.getLines = function(e, t, n, r) {
	if (e >= t) return "";
	let i = Array(t - e);
	for (let a = 0, o = e; o < t; o++, a++) {
		let e = 0, s = this.bMarks[o], c = s, l;
		for (l = o + 1 < t || r ? this.eMarks[o] + 1 : this.eMarks[o]; c < l && e < n;) {
			let t = this.src.charCodeAt(c);
			if (Z(t)) t === 9 ? e += 4 - (e + this.bsCount[o]) % 4 : e++;
			else if (c - s < this.tShift[o]) e++;
			else break;
			c++;
		}
		e > n ? i[a] = Array(e - n + 1).join(" ") + this.src.slice(c, l) : i[a] = this.src.slice(c, l);
	}
	return i.join("");
}, Ox.prototype.Token = ex;
//#endregion
//#region node_modules/markdown-it/lib/rules_block/table.mjs
var kx = 65536;
function Ax(e, t) {
	let n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t];
	return e.src.slice(n, r);
}
function jx(e) {
	let t = [], n = e.length, r = 0, i = e.charCodeAt(r), a = !1, o = 0, s = "";
	for (; r < n;) i === 124 && (a ? (s += e.substring(o, r - 1), o = r) : (t.push(s + e.substring(o, r)), s = "", o = r + 1)), a = i === 92, r++, i = e.charCodeAt(r);
	return t.push(s + e.substring(o)), t;
}
function Mx(e, t, n, r) {
	if (t + 2 > n) return !1;
	let i = t + 1;
	if (e.sCount[i] < e.blkIndent || e.sCount[i] - e.blkIndent >= 4) return !1;
	let a = e.bMarks[i] + e.tShift[i];
	if (a >= e.eMarks[i]) return !1;
	let o = e.src.charCodeAt(a++);
	if (o !== 124 && o !== 45 && o !== 58 || a >= e.eMarks[i]) return !1;
	let s = e.src.charCodeAt(a++);
	if (s !== 124 && s !== 45 && s !== 58 && !Z(s) || o === 45 && Z(s)) return !1;
	for (; a < e.eMarks[i];) {
		let t = e.src.charCodeAt(a);
		if (t !== 124 && t !== 45 && t !== 58 && !Z(t)) return !1;
		a++;
	}
	let c = Ax(e, t + 1), l = c.split("|"), u = [];
	for (let e = 0; e < l.length; e++) {
		let t = l[e].trim();
		if (!t) {
			if (e === 0 || e === l.length - 1) continue;
			return !1;
		}
		if (!/^:?-+:?$/.test(t)) return !1;
		t.charCodeAt(t.length - 1) === 58 ? u.push(t.charCodeAt(0) === 58 ? "center" : "right") : t.charCodeAt(0) === 58 ? u.push("left") : u.push("");
	}
	if (c = Ax(e, t).trim(), c.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4) return !1;
	l = jx(c), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop();
	let d = l.length;
	if (d === 0 || d !== u.length) return !1;
	if (r) return !0;
	let f = e.parentType;
	e.parentType = "table";
	let p = e.md.block.ruler.getRules("blockquote"), m = e.push("table_open", "table", 1), h = [t, 0];
	m.map = h;
	let g = e.push("thead_open", "thead", 1);
	g.map = [t, t + 1];
	let _ = e.push("tr_open", "tr", 1);
	_.map = [t, t + 1];
	for (let t = 0; t < l.length; t++) {
		let n = e.push("th_open", "th", 1);
		u[t] && (n.attrs = [["style", "text-align:" + u[t]]]);
		let r = e.push("inline", "", 0);
		r.content = l[t].trim(), r.children = [], e.push("th_close", "th", -1);
	}
	e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
	let v, y = 0;
	for (i = t + 2; i < n && !(e.sCount[i] < e.blkIndent); i++) {
		let r = !1;
		for (let t = 0, a = p.length; t < a; t++) if (p[t](e, i, n, !0)) {
			r = !0;
			break;
		}
		if (r || (c = Ax(e, i).trim(), !c) || e.sCount[i] - e.blkIndent >= 4 || (l = jx(c), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop(), y += d - l.length, y > kx)) break;
		if (i === t + 2) {
			let n = e.push("tbody_open", "tbody", 1);
			n.map = v = [t + 2, 0];
		}
		let a = e.push("tr_open", "tr", 1);
		a.map = [i, i + 1];
		for (let t = 0; t < d; t++) {
			let n = e.push("td_open", "td", 1);
			u[t] && (n.attrs = [["style", "text-align:" + u[t]]]);
			let r = e.push("inline", "", 0);
			r.content = l[t] ? l[t].trim() : "", r.children = [], e.push("td_close", "td", -1);
		}
		e.push("tr_close", "tr", -1);
	}
	return v && (e.push("tbody_close", "tbody", -1), v[1] = i), e.push("table_close", "table", -1), h[1] = i, e.parentType = f, e.line = i, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/code.mjs
function Nx(e, t, n) {
	if (e.sCount[t] - e.blkIndent < 4) return !1;
	let r = t + 1, i = r;
	for (; r < n;) {
		if (e.isEmpty(r)) {
			r++;
			continue;
		}
		if (e.sCount[r] - e.blkIndent >= 4) {
			r++, i = r;
			continue;
		}
		break;
	}
	e.line = i;
	let a = e.push("code_block", "code", 0);
	return a.content = e.getLines(t, i, 4 + e.blkIndent, !1) + "\n", a.map = [t, e.line], !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/fence.mjs
function Px(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4 || i + 3 > a) return !1;
	let o = e.src.charCodeAt(i);
	if (o !== 126 && o !== 96) return !1;
	let s = i;
	i = e.skipChars(i, o);
	let c = i - s;
	if (c < 3) return !1;
	let l = e.src.slice(s, i), u = e.src.slice(i, a);
	if (o === 96 && u.indexOf(String.fromCharCode(o)) >= 0) return !1;
	if (r) return !0;
	let d = t, f = !1;
	for (; d++, !(d >= n || (i = s = e.bMarks[d] + e.tShift[d], a = e.eMarks[d], i < a && e.sCount[d] < e.blkIndent));) if (e.src.charCodeAt(i) === o && !(e.sCount[d] - e.blkIndent >= 4) && (i = e.skipChars(i, o), !(i - s < c) && (i = e.skipSpaces(i), !(i < a)))) {
		f = !0;
		break;
	}
	c = e.sCount[t], e.line = d + +!!f;
	let p = e.push("fence", "code", 0);
	return p.info = u, p.content = e.getLines(t + 1, d, c, !0), p.markup = l, p.map = [t, e.line], !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/blockquote.mjs
function Fx(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t], o = e.lineMax;
	if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 62) return !1;
	if (r) return !0;
	let s = [], c = [], l = [], u = [], d = e.md.block.ruler.getRules("blockquote"), f = e.parentType;
	e.parentType = "blockquote";
	let p = !1, m;
	for (m = t; m < n; m++) {
		let t = e.sCount[m] < e.blkIndent;
		if (i = e.bMarks[m] + e.tShift[m], a = e.eMarks[m], i >= a) break;
		if (e.src.charCodeAt(i++) === 62 && !t) {
			let t = e.sCount[m] + 1, n, r;
			e.src.charCodeAt(i) === 32 ? (i++, t++, r = !1, n = !0) : e.src.charCodeAt(i) === 9 ? (n = !0, (e.bsCount[m] + t) % 4 == 3 ? (i++, t++, r = !1) : r = !0) : n = !1;
			let o = t;
			for (s.push(e.bMarks[m]), e.bMarks[m] = i; i < a;) {
				let t = e.src.charCodeAt(i);
				if (Z(t)) t === 9 ? o += 4 - (o + e.bsCount[m] + +!!r) % 4 : o++;
				else break;
				i++;
			}
			p = i >= a, c.push(e.bsCount[m]), e.bsCount[m] = e.sCount[m] + 1 + +!!n, l.push(e.sCount[m]), e.sCount[m] = o - t, u.push(e.tShift[m]), e.tShift[m] = i - e.bMarks[m];
			continue;
		}
		if (p) break;
		let r = !1;
		for (let t = 0, i = d.length; t < i; t++) if (d[t](e, m, n, !0)) {
			r = !0;
			break;
		}
		if (r) {
			e.lineMax = m, e.blkIndent !== 0 && (s.push(e.bMarks[m]), c.push(e.bsCount[m]), u.push(e.tShift[m]), l.push(e.sCount[m]), e.sCount[m] -= e.blkIndent);
			break;
		}
		s.push(e.bMarks[m]), c.push(e.bsCount[m]), u.push(e.tShift[m]), l.push(e.sCount[m]), e.sCount[m] = -1;
	}
	let h = e.blkIndent;
	e.blkIndent = 0;
	let g = e.push("blockquote_open", "blockquote", 1);
	g.markup = ">";
	let _ = [t, 0];
	g.map = _, e.md.block.tokenize(e, t, m);
	let v = e.push("blockquote_close", "blockquote", -1);
	v.markup = ">", e.lineMax = o, e.parentType = f, _[1] = e.line;
	for (let n = 0; n < u.length; n++) e.bMarks[n + t] = s[n], e.tShift[n + t] = u[n], e.sCount[n + t] = l[n], e.bsCount[n + t] = c[n];
	return e.blkIndent = h, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/hr.mjs
function Ix(e, t, n, r) {
	let i = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let a = e.bMarks[t] + e.tShift[t], o = e.src.charCodeAt(a++);
	if (o !== 42 && o !== 45 && o !== 95) return !1;
	let s = 1;
	for (; a < i;) {
		let t = e.src.charCodeAt(a++);
		if (t !== o && !Z(t)) return !1;
		t === o && s++;
	}
	if (s < 3) return !1;
	if (r) return !0;
	e.line = t + 1;
	let c = e.push("hr", "hr", 0);
	return c.map = [t, e.line], c.markup = Array(s + 1).join(String.fromCharCode(o)), !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/list.mjs
function Lx(e, t) {
	let n = e.eMarks[t], r = e.bMarks[t] + e.tShift[t], i = e.src.charCodeAt(r++);
	return i !== 42 && i !== 45 && i !== 43 || r < n && !Z(e.src.charCodeAt(r)) ? -1 : r;
}
function Rx(e, t) {
	let n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t], i = n;
	if (i + 1 >= r) return -1;
	let a = e.src.charCodeAt(i++);
	if (a < 48 || a > 57) return -1;
	for (;;) {
		if (i >= r) return -1;
		if (a = e.src.charCodeAt(i++), a >= 48 && a <= 57) {
			if (i - n >= 10) return -1;
			continue;
		}
		if (a === 41 || a === 46) break;
		return -1;
	}
	return i < r && (a = e.src.charCodeAt(i), !Z(a)) ? -1 : i;
}
function zx(e, t) {
	let n = e.level + 2;
	for (let r = t + 2, i = e.tokens.length - 2; r < i; r++) e.tokens[r].level === n && e.tokens[r].type === "paragraph_open" && (e.tokens[r + 2].hidden = !0, e.tokens[r].hidden = !0, r += 2);
}
function Bx(e, t, n, r) {
	let i, a, o, s, c = t, l = !0;
	if (e.sCount[c] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[c] - e.listIndent >= 4 && e.sCount[c] < e.blkIndent) return !1;
	let u = !1;
	r && e.parentType === "paragraph" && e.sCount[c] >= e.blkIndent && (u = !0);
	let d, f, p;
	if ((p = Rx(e, c)) >= 0) {
		if (d = !0, o = e.bMarks[c] + e.tShift[c], f = Number(e.src.slice(o, p - 1)), u && f !== 1) return !1;
	} else if ((p = Lx(e, c)) >= 0) d = !1;
	else return !1;
	if (u && e.skipSpaces(p) >= e.eMarks[c]) return !1;
	if (r) return !0;
	let m = e.src.charCodeAt(p - 1), h = e.tokens.length;
	d ? (s = e.push("ordered_list_open", "ol", 1), f !== 1 && (s.attrs = [["start", f]])) : s = e.push("bullet_list_open", "ul", 1);
	let g = [c, 0];
	s.map = g, s.markup = String.fromCharCode(m);
	let _ = !1, v = e.md.block.ruler.getRules("list"), y = e.parentType;
	for (e.parentType = "list"; c < n;) {
		a = p, i = e.eMarks[c];
		let t = e.sCount[c] + p - (e.bMarks[c] + e.tShift[c]), r = t;
		for (; a < i;) {
			let t = e.src.charCodeAt(a);
			if (t === 9) r += 4 - (r + e.bsCount[c]) % 4;
			else if (t === 32) r++;
			else break;
			a++;
		}
		let u = a, f;
		f = u >= i ? 1 : r - t, f > 4 && (f = 1);
		let h = t + f;
		s = e.push("list_item_open", "li", 1), s.markup = String.fromCharCode(m);
		let g = [c, 0];
		s.map = g, d && (s.info = e.src.slice(o, p - 1));
		let y = e.tight, b = e.tShift[c], x = e.sCount[c], S = e.listIndent;
		if (e.listIndent = e.blkIndent, e.blkIndent = h, e.tight = !0, e.tShift[c] = u - e.bMarks[c], e.sCount[c] = r, u >= i && e.isEmpty(c + 1) ? e.line = Math.min(e.line + 2, n) : e.md.block.tokenize(e, c, n, !0), (!e.tight || _) && (l = !1), _ = e.line - c > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = S, e.tShift[c] = b, e.sCount[c] = x, e.tight = y, s = e.push("list_item_close", "li", -1), s.markup = String.fromCharCode(m), c = e.line, g[1] = c, c >= n || e.sCount[c] < e.blkIndent || e.sCount[c] - e.blkIndent >= 4) break;
		let C = !1;
		for (let t = 0, r = v.length; t < r; t++) if (v[t](e, c, n, !0)) {
			C = !0;
			break;
		}
		if (C) break;
		if (d) {
			if (p = Rx(e, c), p < 0) break;
			o = e.bMarks[c] + e.tShift[c];
		} else if (p = Lx(e, c), p < 0) break;
		if (m !== e.src.charCodeAt(p - 1)) break;
	}
	return s = d ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), s.markup = String.fromCharCode(m), g[1] = c, e.line = c, e.parentType = y, l && zx(e, h), !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/reference.mjs
function Vx(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t], o = t + 1;
	if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 91) return !1;
	function s(t) {
		let n = e.lineMax;
		if (t >= n || e.isEmpty(t)) return null;
		let r = !1;
		if (e.sCount[t] - e.blkIndent > 3 && (r = !0), e.sCount[t] < 0 && (r = !0), !r) {
			let r = e.md.block.ruler.getRules("reference"), i = e.parentType;
			e.parentType = "reference";
			let a = !1;
			for (let i = 0, o = r.length; i < o; i++) if (r[i](e, t, n, !0)) {
				a = !0;
				break;
			}
			if (e.parentType = i, a) return null;
		}
		let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
		return e.src.slice(i, a + 1);
	}
	let c = e.src.slice(i, a + 1);
	a = c.length;
	let l = -1;
	for (i = 1; i < a; i++) {
		let e = c.charCodeAt(i);
		if (e === 91) return !1;
		if (e === 93) {
			l = i;
			break;
		}
		if (e === 10) {
			let e = s(o);
			e !== null && (c += e, a = c.length, o++);
		} else if (e === 92 && (i++, i < a && c.charCodeAt(i) === 10)) {
			let e = s(o);
			e !== null && (c += e, a = c.length, o++);
		}
	}
	if (l < 0 || c.charCodeAt(l + 1) !== 58) return !1;
	for (i = l + 2; i < a; i++) {
		let e = c.charCodeAt(i);
		if (e === 10) {
			let e = s(o);
			e !== null && (c += e, a = c.length, o++);
		} else if (!Z(e)) break;
	}
	let u = e.md.helpers.parseLinkDestination(c, i, a);
	if (!u.ok) return !1;
	let d = e.md.normalizeLink(u.str);
	if (!e.md.validateLink(d)) return !1;
	i = u.pos;
	let f = i, p = o, m = i;
	for (; i < a; i++) {
		let e = c.charCodeAt(i);
		if (e === 10) {
			let e = s(o);
			e !== null && (c += e, a = c.length, o++);
		} else if (!Z(e)) break;
	}
	let h = e.md.helpers.parseLinkTitle(c, i, a);
	for (; h.can_continue;) {
		let t = s(o);
		if (t === null) break;
		c += t, i = a, a = c.length, o++, h = e.md.helpers.parseLinkTitle(c, i, a, h);
	}
	let g;
	for (i < a && m !== i && h.ok ? (g = h.str, i = h.pos) : (g = "", i = f, o = p); i < a && Z(c.charCodeAt(i));) i++;
	if (i < a && c.charCodeAt(i) !== 10 && g) for (g = "", i = f, o = p; i < a && Z(c.charCodeAt(i));) i++;
	if (i < a && c.charCodeAt(i) !== 10) return !1;
	let _ = Ub(c.slice(1, l));
	return _ ? 
	/* istanbul ignore if */
	r ? !0 : (e.env.references === void 0 && (e.env.references = {}), e.env.references[_] === void 0 && (e.env.references[_] = {
		title: g,
		href: d
	}), e.line = o, !0) : !1;
}
//#endregion
//#region node_modules/markdown-it/lib/common/html_blocks.mjs
var Hx = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), Ux = /* @__PURE__ */ RegExp("^(?:<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>|<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"), Wx = /* @__PURE__ */ RegExp("^(?:<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>|<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>)"), Gx = [
	[
		/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
		/<\/(script|pre|style|textarea)>/i,
		!0
	],
	[
		/^<!--/,
		/-->/,
		!0
	],
	[
		/^<\?/,
		/\?>/,
		!0
	],
	[
		/^<![A-Z]/,
		/>/,
		!0
	],
	[
		/^<!\[CDATA\[/,
		/\]\]>/,
		!0
	],
	[
		RegExp("^</?(" + Hx.join("|") + ")(?=(\\s|/?>|$))", "i"),
		/^$/,
		!0
	],
	[
		RegExp(Wx.source + "\\s*$"),
		/^$/,
		!1
	]
];
function Kx(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(i) !== 60) return !1;
	let o = e.src.slice(i, a), s = 0;
	for (; s < Gx.length && !Gx[s][0].test(o); s++);
	if (s === Gx.length) return !1;
	if (r) return Gx[s][2];
	let c = t + 1, l = Gx[s][1].test("");
	if (!Gx[s][1].test(o)) {
		for (; c < n && !(e.sCount[c] < e.blkIndent && (l || !e.isEmpty(c))); c++) if (i = e.bMarks[c] + e.tShift[c], a = e.eMarks[c], o = e.src.slice(i, a), Gx[s][1].test(o)) {
			o.length !== 0 && c++;
			break;
		}
	}
	e.line = c;
	let u = e.push("html_block", "", 0);
	return u.map = [t, c], u.content = e.getLines(t, c, e.blkIndent, !0), !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/heading.mjs
function qx(e, t, n, r) {
	let i = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let o = e.src.charCodeAt(i);
	if (o !== 35 || i >= a) return !1;
	let s = 1;
	for (o = e.src.charCodeAt(++i); o === 35 && i < a && s <= 6;) s++, o = e.src.charCodeAt(++i);
	if (s > 6 || i < a && !Z(o)) return !1;
	if (r) return !0;
	a = e.skipSpacesBack(a, i);
	let c = e.skipCharsBack(a, 35, i);
	c > i && Z(e.src.charCodeAt(c - 1)) && (a = c), e.line = t + 1;
	let l = e.push("heading_open", "h" + String(s), 1);
	l.markup = "########".slice(0, s), l.map = [t, e.line];
	let u = e.push("inline", "", 0);
	u.content = Gb(e.src.slice(i, a)), u.map = [t, e.line], u.children = [];
	let d = e.push("heading_close", "h" + String(s), -1);
	return d.markup = "########".slice(0, s), !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/lheading.mjs
function Jx(e, t, n) {
	let r = e.md.block.ruler.getRules("paragraph");
	if (e.sCount[t] - e.blkIndent >= 4) return !1;
	let i = e.parentType;
	e.parentType = "paragraph";
	let a = 0, o, s = t + 1;
	for (; s < n && !e.isEmpty(s); s++) {
		if (e.sCount[s] - e.blkIndent > 3) continue;
		if (e.sCount[s] >= e.blkIndent) {
			let t = e.bMarks[s] + e.tShift[s], n = e.eMarks[s];
			if (t < n && (o = e.src.charCodeAt(t), (o === 45 || o === 61) && (t = e.skipChars(t, o), t = e.skipSpaces(t), t >= n))) {
				a = o === 61 ? 1 : 2;
				break;
			}
		}
		if (e.sCount[s] < 0) continue;
		let t = !1;
		for (let i = 0, a = r.length; i < a; i++) if (r[i](e, s, n, !0)) {
			t = !0;
			break;
		}
		if (t) break;
	}
	if (!a) return e.parentType = i, !1;
	let c = Gb(e.getLines(t, s, e.blkIndent, !1));
	e.line = s + 1;
	let l = e.push("heading_open", "h" + String(a), 1);
	l.markup = String.fromCharCode(o), l.map = [t, e.line];
	let u = e.push("inline", "", 0);
	u.content = c, u.map = [t, e.line - 1], u.children = [];
	let d = e.push("heading_close", "h" + String(a), -1);
	return d.markup = String.fromCharCode(o), e.parentType = i, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_block/paragraph.mjs
function Yx(e, t, n) {
	let r = e.md.block.ruler.getRules("paragraph"), i = e.parentType, a = t + 1;
	for (e.parentType = "paragraph"; a < n && !e.isEmpty(a); a++) {
		if (e.sCount[a] - e.blkIndent > 3 || e.sCount[a] < 0) continue;
		let t = !1;
		for (let i = 0, o = r.length; i < o; i++) if (r[i](e, a, n, !0)) {
			t = !0;
			break;
		}
		if (t) break;
	}
	let o = Gb(e.getLines(t, a, e.blkIndent, !1));
	e.line = a;
	let s = e.push("paragraph_open", "p", 1);
	s.map = [t, e.line];
	let c = e.push("inline", "", 0);
	return c.content = o, c.map = [t, e.line], c.children = [], e.push("paragraph_close", "p", -1), e.parentType = i, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/parser_block.mjs
var Xx = [
	[
		"table",
		Mx,
		["paragraph", "reference"]
	],
	["code", Nx],
	[
		"fence",
		Px,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"blockquote",
		Fx,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"hr",
		Ix,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"list",
		Bx,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["reference", Vx],
	[
		"html_block",
		Kx,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	[
		"heading",
		qx,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["lheading", Jx],
	["paragraph", Yx]
];
function Zx() {
	this.ruler = new $b();
	for (let e = 0; e < Xx.length; e++) this.ruler.push(Xx[e][0], Xx[e][1], { alt: (Xx[e][2] || []).slice() });
}
Zx.prototype.tokenize = function(e, t, n) {
	let r = this.ruler.getRules(""), i = r.length, a = e.md.options.maxNesting, o = t, s = !1;
	for (; o < n && (e.line = o = e.skipEmptyLines(o), !(o >= n || e.sCount[o] < e.blkIndent));) {
		if (e.level >= a) {
			e.line = n;
			break;
		}
		let t = e.line, c = !1;
		for (let a = 0; a < i; a++) if (c = r[a](e, o, n, !1), c) {
			if (t >= e.line) throw Error("block rule didn't increment state.line");
			break;
		}
		if (!c) throw Error("none of the block rules matched");
		e.tight = !s, e.isEmpty(e.line - 1) && (s = !0), o = e.line, o < n && e.isEmpty(o) && (s = !0, o++, e.line = o);
	}
}, Zx.prototype.parse = function(e, t, n, r) {
	if (!e) return;
	let i = new this.State(e, t, n, r);
	this.tokenize(i, i.line, i.lineMax);
}, Zx.prototype.State = Ox;
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/state_inline.mjs
function Qx(e, t, n, r) {
	this.src = e, this.env = n, this.md = t, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
Qx.prototype.pushPending = function() {
	let e = new ex("text", "", 0);
	return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
}, Qx.prototype.push = function(e, t, n) {
	this.pending && this.pushPending();
	let r = new ex(e, t, n), i = null;
	return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], i = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(i), r;
}, Qx.prototype.scanDelims = function(e, t) {
	let n = this.posMax, r = this.src.charCodeAt(e), i;
	if (e === 0) i = 32;
	else if (e === 1) i = this.src.charCodeAt(0), (i & 63488) == 55296 && (i = 65533);
	else if (i = this.src.charCodeAt(e - 1), (i & 64512) == 56320) {
		let t = this.src.charCodeAt(e - 2);
		i = (t & 64512) == 55296 ? 65536 + (t - 55296 << 10) + (i - 56320) : 65533;
	} else (i & 64512) == 55296 && (i = 65533);
	let a = e;
	for (; a < n && this.src.charCodeAt(a) === r;) a++;
	let o = a - e, s = a < n ? this.src.charCodeAt(a) : 32;
	if ((s & 64512) == 55296) {
		let e = this.src.charCodeAt(a + 1);
		s = (e & 64512) == 56320 ? 65536 + (s - 55296 << 10) + (e - 56320) : 65533;
	} else (s & 64512) == 56320 && (s = 65533);
	let c = Hb(i) || Vb(i), l = Hb(s) || Vb(s), u = zb(i), d = zb(s), f = !d && (!l || u || c), p = !u && (!c || d || l);
	return {
		can_open: f && (t || !p || c),
		can_close: p && (t || !f || l),
		length: o
	};
}, Qx.prototype.Token = ex;
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/text.mjs
function $x(e) {
	switch (e) {
		case 10:
		case 33:
		case 35:
		case 36:
		case 37:
		case 38:
		case 42:
		case 43:
		case 45:
		case 58:
		case 60:
		case 61:
		case 62:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 125:
		case 126: return !0;
		default: return !1;
	}
}
function eS(e, t) {
	let n = e.pos;
	for (; n < e.posMax && !$x(e.src.charCodeAt(n));) n++;
	return n !== e.pos && (t || (e.pending += e.src.slice(e.pos, n)), e.pos = n, !0);
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/linkify.mjs
var tS = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function nS(e, t) {
	if (!e.md.options.linkify || e.linkLevel > 0) return !1;
	let n = e.pos, r = e.posMax;
	if (n + 3 > r || e.src.charCodeAt(n) !== 58 || e.src.charCodeAt(n + 1) !== 47 || e.src.charCodeAt(n + 2) !== 47) return !1;
	let i = e.pending.match(tS);
	if (!i) return !1;
	let a = i[1], o = e.md.linkify.matchAtStart(e.src.slice(n - a.length));
	if (!o) return !1;
	let s = o.url;
	if (s.length <= a.length) return !1;
	let c = s.length;
	for (; c > 0 && s.charCodeAt(c - 1) === 42;) c--;
	c !== s.length && (s = s.slice(0, c));
	let l = e.md.normalizeLink(s);
	if (!e.md.validateLink(l)) return !1;
	if (!t) {
		e.pending = e.pending.slice(0, -a.length);
		let t = e.push("link_open", "a", 1);
		t.attrs = [["href", l]], t.markup = "linkify", t.info = "auto";
		let n = e.push("text", "", 0);
		n.content = e.md.normalizeLinkText(s);
		let r = e.push("link_close", "a", -1);
		r.markup = "linkify", r.info = "auto";
	}
	return e.pos += s.length - a.length, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/newline.mjs
function rS(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 10) return !1;
	let r = e.pending.length - 1, i = e.posMax;
	if (!t) if (r >= 0 && e.pending.charCodeAt(r) === 32) if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
		let t = r - 1;
		for (; t >= 1 && e.pending.charCodeAt(t - 1) === 32;) t--;
		e.pending = e.pending.slice(0, t), e.push("hardbreak", "br", 0);
	} else e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
	else e.push("softbreak", "br", 0);
	for (n++; n < i && Z(e.src.charCodeAt(n));) n++;
	return e.pos = n, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/escape.mjs
var iS = [];
for (let e = 0; e < 256; e++) iS.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
	iS[e.charCodeAt(0)] = 1;
});
function aS(e, t) {
	let n = e.pos, r = e.posMax;
	if (e.src.charCodeAt(n) !== 92 || (n++, n >= r)) return !1;
	let i = e.src.charCodeAt(n);
	if (i === 10) {
		for (t || e.push("hardbreak", "br", 0), n++; n < r && (i = e.src.charCodeAt(n), Z(i));) n++;
		return e.pos = n, !0;
	}
	if (i === 32) {
		if (!t) {
			let t = e.push("text_special", "", 0);
			t.content = "\\", t.markup = "\\", t.info = "escape";
		}
		return e.pos = n, !0;
	}
	let a = e.src[n];
	if (i >= 55296 && i <= 56319 && n + 1 < r) {
		let t = e.src.charCodeAt(n + 1);
		t >= 56320 && t <= 57343 && (a += e.src[n + 1], n++);
	}
	let o = "\\" + a;
	if (!t) {
		let t = e.push("text_special", "", 0);
		t.content = i < 256 && iS[i] !== 0 ? a : o, t.markup = o, t.info = "escape";
	}
	return e.pos = n + 1, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/backticks.mjs
function oS(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 96) return !1;
	let r = n;
	n++;
	let i = e.posMax;
	for (; n < i && e.src.charCodeAt(n) === 96;) n++;
	let a = e.src.slice(r, n), o = a.length;
	if (e.backticksScanned && (e.backticks[o] || 0) <= r) return t || (e.pending += a), e.pos += o, !0;
	let s = n, c;
	for (; (c = e.src.indexOf("`", s)) !== -1;) {
		for (s = c + 1; s < i && e.src.charCodeAt(s) === 96;) s++;
		let r = s - c;
		if (r === o) {
			if (!t) {
				let t = e.push("code_inline", "code", 0);
				t.markup = a, t.content = e.src.slice(n, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
			}
			return e.pos = s, !0;
		}
		e.backticks[r] = c;
	}
	return e.backticksScanned = !0, t || (e.pending += a), e.pos += o, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/strikethrough.mjs
function sS(e, t) {
	let n = e.pos, r = e.src.charCodeAt(n);
	if (t || r !== 126) return !1;
	let i = e.scanDelims(e.pos, !0), a = i.length, o = String.fromCharCode(r);
	if (a < 2) return !1;
	let s;
	a % 2 && (s = e.push("text", "", 0), s.content = o, a--);
	for (let t = 0; t < a; t += 2) s = e.push("text", "", 0), s.content = o + o, e.delimiters.push({
		marker: r,
		length: 0,
		token: e.tokens.length - 1,
		end: -1,
		open: i.can_open,
		close: i.can_close
	});
	return e.pos += i.length, !0;
}
function cS(e, t) {
	let n, r = [], i = t.length;
	for (let a = 0; a < i; a++) {
		let i = t[a];
		if (i.marker !== 126 || i.end === -1) continue;
		let o = t[i.end];
		n = e.tokens[i.token], n.type = "s_open", n.tag = "s", n.nesting = 1, n.markup = "~~", n.content = "", n = e.tokens[o.token], n.type = "s_close", n.tag = "s", n.nesting = -1, n.markup = "~~", n.content = "", e.tokens[o.token - 1].type === "text" && e.tokens[o.token - 1].content === "~" && r.push(o.token - 1);
	}
	for (; r.length;) {
		let t = r.pop(), i = t + 1;
		for (; i < e.tokens.length && e.tokens[i].type === "s_close";) i++;
		i--, t !== i && (n = e.tokens[i], e.tokens[i] = e.tokens[t], e.tokens[t] = n);
	}
}
function lS(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	cS(e, e.delimiters);
	for (let r = 0; r < n; r++) t[r] && t[r].delimiters && cS(e, t[r].delimiters);
}
var uS = {
	tokenize: sS,
	postProcess: lS
};
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/emphasis.mjs
function dS(e, t) {
	let n = e.pos, r = e.src.charCodeAt(n);
	if (t || r !== 95 && r !== 42) return !1;
	let i = e.scanDelims(e.pos, r === 42);
	for (let t = 0; t < i.length; t++) {
		let t = e.push("text", "", 0);
		t.content = String.fromCharCode(r), e.delimiters.push({
			marker: r,
			length: i.length,
			token: e.tokens.length - 1,
			end: -1,
			open: i.can_open,
			close: i.can_close
		});
	}
	return e.pos += i.length, !0;
}
function fS(e, t) {
	let n = t.length;
	for (let r = n - 1; r >= 0; r--) {
		let n = t[r];
		if (n.marker !== 95 && n.marker !== 42 || n.end === -1) continue;
		let i = t[n.end], a = r > 0 && t[r - 1].end === n.end + 1 && t[r - 1].marker === n.marker && t[r - 1].token === n.token - 1 && t[n.end + 1].token === i.token + 1, o = String.fromCharCode(n.marker), s = e.tokens[n.token];
		s.type = a ? "strong_open" : "em_open", s.tag = a ? "strong" : "em", s.nesting = 1, s.markup = a ? o + o : o, s.content = "";
		let c = e.tokens[i.token];
		c.type = a ? "strong_close" : "em_close", c.tag = a ? "strong" : "em", c.nesting = -1, c.markup = a ? o + o : o, c.content = "", a && (e.tokens[t[r - 1].token].content = "", e.tokens[t[n.end + 1].token].content = "", r--);
	}
}
function pS(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	fS(e, e.delimiters);
	for (let r = 0; r < n; r++) t[r] && t[r].delimiters && fS(e, t[r].delimiters);
}
var mS = {
	tokenize: dS,
	postProcess: pS
};
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/link.mjs
function hS(e, t) {
	let n, r, i, a, o = "", s = "", c = e.pos, l = !0;
	if (e.src.charCodeAt(e.pos) !== 91) return !1;
	let u = e.pos, d = e.posMax, f = e.pos + 1, p = e.md.helpers.parseLinkLabel(e, e.pos, !0);
	if (p < 0) return !1;
	let m = p + 1;
	if (m < d && e.src.charCodeAt(m) === 40) {
		for (l = !1, m++; m < d && (n = e.src.charCodeAt(m), !(!Z(n) && n !== 10)); m++);
		if (m >= d) return !1;
		if (c = m, i = e.md.helpers.parseLinkDestination(e.src, m, e.posMax), i.ok) {
			for (o = e.md.normalizeLink(i.str), e.md.validateLink(o) ? m = i.pos : o = "", c = m; m < d && (n = e.src.charCodeAt(m), !(!Z(n) && n !== 10)); m++);
			if (i = e.md.helpers.parseLinkTitle(e.src, m, e.posMax), m < d && c !== m && i.ok) for (s = i.str, m = i.pos; m < d && (n = e.src.charCodeAt(m), !(!Z(n) && n !== 10)); m++);
		}
		(m >= d || e.src.charCodeAt(m) !== 41) && (l = !0), m++;
	}
	if (l) {
		if (e.env.references === void 0) return !1;
		if (m < d && e.src.charCodeAt(m) === 91 ? (c = m + 1, m = e.md.helpers.parseLinkLabel(e, m), m >= 0 ? r = e.src.slice(c, m++) : m = p + 1) : m = p + 1, r ||= e.src.slice(f, p), a = e.env.references[Ub(r)], !a) return e.pos = u, !1;
		o = a.href, s = a.title;
	}
	if (!t) {
		e.pos = f, e.posMax = p;
		let t = e.push("link_open", "a", 1), n = [["href", o]];
		t.attrs = n, s && n.push(["title", s]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
	}
	return e.pos = m, e.posMax = d, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/image.mjs
function gS(e, t) {
	let n, r, i, a, o, s, c, l, u = "", d = e.pos, f = e.posMax;
	if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91) return !1;
	let p = e.pos + 2, m = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
	if (m < 0) return !1;
	if (a = m + 1, a < f && e.src.charCodeAt(a) === 40) {
		for (a++; a < f && (n = e.src.charCodeAt(a), !(!Z(n) && n !== 10)); a++);
		if (a >= f) return !1;
		for (l = a, s = e.md.helpers.parseLinkDestination(e.src, a, e.posMax), s.ok && (u = e.md.normalizeLink(s.str), e.md.validateLink(u) ? a = s.pos : u = ""), l = a; a < f && (n = e.src.charCodeAt(a), !(!Z(n) && n !== 10)); a++);
		if (s = e.md.helpers.parseLinkTitle(e.src, a, e.posMax), a < f && l !== a && s.ok) for (c = s.str, a = s.pos; a < f && (n = e.src.charCodeAt(a), !(!Z(n) && n !== 10)); a++);
		else c = "";
		if (a >= f || e.src.charCodeAt(a) !== 41) return e.pos = d, !1;
		a++;
	} else {
		if (e.env.references === void 0) return !1;
		if (a < f && e.src.charCodeAt(a) === 91 ? (l = a + 1, a = e.md.helpers.parseLinkLabel(e, a), a >= 0 ? i = e.src.slice(l, a++) : a = m + 1) : a = m + 1, i ||= e.src.slice(p, m), o = e.env.references[Ub(i)], !o) return e.pos = d, !1;
		u = o.href, c = o.title;
	}
	if (!t) {
		r = e.src.slice(p, m);
		let t = [];
		e.md.inline.parse(r, e.md, e.env, t);
		let n = e.push("image", "img", 0), i = [["src", u], ["alt", ""]];
		n.attrs = i, n.children = t, n.content = r, c && i.push(["title", c]);
	}
	return e.pos = a, e.posMax = f, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/autolink.mjs
var _S = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, vS = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function yS(e, t) {
	let n = e.pos;
	if (e.src.charCodeAt(n) !== 60) return !1;
	let r = e.pos, i = e.posMax;
	for (;;) {
		if (++n >= i) return !1;
		let t = e.src.charCodeAt(n);
		if (t === 60) return !1;
		if (t === 62) break;
	}
	let a = e.src.slice(r + 1, n);
	if (vS.test(a)) {
		let n = e.md.normalizeLink(a);
		if (!e.md.validateLink(n)) return !1;
		if (!t) {
			let t = e.push("link_open", "a", 1);
			t.attrs = [["href", n]], t.markup = "autolink", t.info = "auto";
			let r = e.push("text", "", 0);
			r.content = e.md.normalizeLinkText(a);
			let i = e.push("link_close", "a", -1);
			i.markup = "autolink", i.info = "auto";
		}
		return e.pos += a.length + 2, !0;
	}
	if (_S.test(a)) {
		let n = e.md.normalizeLink("mailto:" + a);
		if (!e.md.validateLink(n)) return !1;
		if (!t) {
			let t = e.push("link_open", "a", 1);
			t.attrs = [["href", n]], t.markup = "autolink", t.info = "auto";
			let r = e.push("text", "", 0);
			r.content = e.md.normalizeLinkText(a);
			let i = e.push("link_close", "a", -1);
			i.markup = "autolink", i.info = "auto";
		}
		return e.pos += a.length + 2, !0;
	}
	return !1;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/html_inline.mjs
function bS(e) {
	return /^<a[>\s]/i.test(e);
}
function xS(e) {
	return /^<\/a\s*>/i.test(e);
}
function SS(e) {
	let t = e | 32;
	return t >= 97 && t <= 122;
}
function CS(e, t) {
	if (!e.md.options.html) return !1;
	let n = e.posMax, r = e.pos;
	if (e.src.charCodeAt(r) !== 60 || r + 2 >= n) return !1;
	let i = e.src.charCodeAt(r + 1);
	if (i !== 33 && i !== 63 && i !== 47 && !SS(i)) return !1;
	let a = e.src.slice(r).match(Ux);
	if (!a) return !1;
	if (!t) {
		let t = e.push("html_inline", "", 0);
		t.content = a[0], bS(t.content) && e.linkLevel++, xS(t.content) && e.linkLevel--;
	}
	return e.pos += a[0].length, !0;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/entity.mjs
var wS = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, TS = /^&([a-z][a-z0-9]{1,31});/i;
function ES(e, t) {
	let n = e.pos, r = e.posMax;
	if (e.src.charCodeAt(n) !== 38 || n + 1 >= r) return !1;
	if (e.src.charCodeAt(n + 1) === 35) {
		let r = e.src.slice(n).match(wS);
		if (r) {
			if (!t) {
				let t = r[1][0].toLowerCase() === "x" ? parseInt(r[1].slice(1), 16) : parseInt(r[1], 10), n = e.push("text_special", "", 0);
				n.content = wb(t) ? Tb(t) : Tb(65533), n.markup = r[0], n.info = "entity";
			}
			return e.pos += r[0].length, !0;
		}
	} else {
		let r = e.src.slice(n).match(TS);
		if (r) {
			let n = gb(r[0]);
			if (n !== r[0]) {
				if (!t) {
					let t = e.push("text_special", "", 0);
					t.content = n, t.markup = r[0], t.info = "entity";
				}
				return e.pos += r[0].length, !0;
			}
		}
	}
	return !1;
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs
function DS(e) {
	let t = {}, n = e.length;
	if (!n) return;
	let r = 0, i = -2, a = [];
	for (let o = 0; o < n; o++) {
		let n = e[o];
		if (a.push(0), (e[r].marker !== n.marker || i !== n.token - 1) && (r = o), i = n.token, n.length = n.length || 0, !n.close) continue;
		t.hasOwnProperty(n.marker) || (t[n.marker] = [
			-1,
			-1,
			-1,
			-1,
			-1,
			-1
		]);
		let s = t[n.marker][(n.open ? 3 : 0) + n.length % 3], c = r - a[r] - 1, l = c;
		for (; c > s; c -= a[c] + 1) {
			let t = e[c];
			if (t.marker === n.marker && t.open && t.end < 0) {
				let r = !1;
				if ((t.close || n.open) && (t.length + n.length) % 3 == 0 && (t.length % 3 != 0 || n.length % 3 != 0) && (r = !0), !r) {
					let r = c > 0 && !e[c - 1].open ? a[c - 1] + 1 : 0;
					a[o] = o - c + r, a[c] = r, n.open = !1, t.end = o, t.close = !1, l = -1, i = -2;
					break;
				}
			}
		}
		l !== -1 && (t[n.marker][(n.open ? 3 : 0) + (n.length || 0) % 3] = l);
	}
}
function OS(e) {
	let t = e.tokens_meta, n = e.tokens_meta.length;
	DS(e.delimiters);
	for (let e = 0; e < n; e++) t[e] && t[e].delimiters && DS(t[e].delimiters);
}
//#endregion
//#region node_modules/markdown-it/lib/rules_inline/fragments_join.mjs
function kS(e) {
	let t, n, r = 0, i = e.tokens, a = e.tokens.length;
	for (t = n = 0; t < a; t++) i[t].nesting < 0 && r--, i[t].level = r, i[t].nesting > 0 && r++, i[t].type === "text" && t + 1 < a && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
	t !== n && (i.length = n);
}
//#endregion
//#region node_modules/markdown-it/lib/parser_inline.mjs
var AS = [
	["text", eS],
	["linkify", nS],
	["newline", rS],
	["escape", aS],
	["backticks", oS],
	["strikethrough", uS.tokenize],
	["emphasis", mS.tokenize],
	["link", hS],
	["image", gS],
	["autolink", yS],
	["html_inline", CS],
	["entity", ES]
], jS = [
	["balance_pairs", OS],
	["strikethrough", uS.postProcess],
	["emphasis", mS.postProcess],
	["fragments_join", kS]
];
function MS() {
	this.ruler = new $b();
	for (let e = 0; e < AS.length; e++) this.ruler.push(AS[e][0], AS[e][1]);
	this.ruler2 = new $b();
	for (let e = 0; e < jS.length; e++) this.ruler2.push(jS[e][0], jS[e][1]);
}
MS.prototype.skipToken = function(e) {
	let t = e.pos, n = this.ruler.getRules(""), r = n.length, i = e.md.options.maxNesting, a = e.cache;
	if (a[t] !== void 0) {
		e.pos = a[t];
		return;
	}
	let o = !1;
	if (e.level < i) {
		for (let i = 0; i < r; i++) if (e.level++, o = n[i](e, !0), e.level--, o) {
			if (t >= e.pos) throw Error("inline rule didn't increment state.pos");
			break;
		}
	} else e.pos = e.posMax;
	o || e.pos++, a[t] = e.pos;
}, MS.prototype.tokenize = function(e) {
	let t = this.ruler.getRules(""), n = t.length, r = e.posMax, i = e.md.options.maxNesting;
	for (; e.pos < r;) {
		let a = e.pos, o = !1;
		if (e.level < i) {
			for (let r = 0; r < n; r++) if (o = t[r](e, !1), o) {
				if (a >= e.pos) throw Error("inline rule didn't increment state.pos");
				break;
			}
		}
		if (o) {
			if (e.pos >= r) break;
			continue;
		}
		e.pending += e.src[e.pos++];
	}
	e.pending && e.pushPending();
}, MS.prototype.parse = function(e, t, n, r) {
	let i = new this.State(e, t, n, r);
	this.tokenize(i);
	let a = this.ruler2.getRules(""), o = a.length;
	for (let e = 0; e < o; e++) a[e](i);
}, MS.prototype.State = Qx;
//#endregion
//#region node_modules/linkify-it/lib/re.mjs
function NS(e) {
	let t = {};
	e ||= {}, t.src_Any = Wy.source, t.src_Cc = Gy.source, t.src_Z = Yy.source, t.src_P = qy.source, t.src_ZPCc = [
		t.src_Z,
		t.src_P,
		t.src_Cc
	].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
	let n = "[><｜]";
	return t.src_pseudo_letter = `(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`, t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = `(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`, t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = `(?=$|${n}|${t.src_ZPCc})(?!${e["---"] ? "-(?!--)|" : "-|"}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`, t.src_path = `(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|` + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + `,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`, t.src_email_name = "[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\\"\\.a-zA-Z0-9_]{0,63}", t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = "(?:" + t.src_xn + `|${t.src_pseudo_letter}{1,63})`, t.src_domain = "(?:" + t.src_xn + `|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`, t.src_host = `(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`, t.tpl_host_fuzzy = "(?:" + t.src_ip4 + `|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`, t.tpl_host_no_ip_fuzzy = `(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`, t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = `localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`, t.tpl_email_fuzzy = `(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`, t.tpl_link_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_fuzzy_strict}${t.src_path})`, t.tpl_link_no_ip_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`, t;
}
//#endregion
//#region node_modules/linkify-it/index.mjs
function PS(e) {
	return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
		t && Object.keys(t).forEach(function(n) {
			e[n] = t[n];
		});
	}), e;
}
function FS(e) {
	return Object.prototype.toString.call(e);
}
function IS(e) {
	return FS(e) === "[object String]";
}
function LS(e) {
	return FS(e) === "[object Object]";
}
function RS(e) {
	return FS(e) === "[object RegExp]";
}
function zS(e) {
	return FS(e) === "[object Function]";
}
function BS(e) {
	return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var VS = {
	fuzzyLink: !0,
	fuzzyEmail: !0,
	fuzzyIP: !1
};
function HS(e) {
	return Object.keys(e || {}).reduce(function(e, t) {
		return e || VS.hasOwnProperty(t);
	}, !1);
}
var US = {
	"http:": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.http || (n.re.http = RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`, "i")), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
	} },
	"https:": "http:",
	"ftp:": "http:",
	"//": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.no_http || (n.re.no_http = RegExp("^" + n.re.src_auth + `(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})` + n.re.src_port + n.re.src_host_terminator + n.re.src_path, "i")), n.re.no_http.test(r) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
	} },
	"mailto:": { validate: function(e, t, n) {
		let r = e.slice(t);
		return n.re.mailto || (n.re.mailto = RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`, "i")), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
	} }
}, WS = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", GS = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function KS(e) {
	return function(t, n) {
		let r = t.slice(n);
		return e.test(r) ? r.match(e)[0].length : 0;
	};
}
function qS() {
	return function(e, t) {
		t.normalize(e);
	};
}
function JS(e) {
	let t = e.re = NS(e.__opts__), n = e.__tlds__.slice();
	e.onCompile(), e.__tlds_replaced__ || n.push(WS), n.push(t.src_xn), t.src_tlds = n.join("|");
	function r(e) {
		return e.replace("%TLDS%", t.src_tlds);
	}
	t.email_fuzzy = RegExp(r(t.tpl_email_fuzzy), "i"), t.email_fuzzy_global = RegExp(r(t.tpl_email_fuzzy), "ig"), t.link_fuzzy = RegExp(r(t.tpl_link_fuzzy), "i"), t.link_fuzzy_global = RegExp(r(t.tpl_link_fuzzy), "ig"), t.link_no_ip_fuzzy = RegExp(r(t.tpl_link_no_ip_fuzzy), "i"), t.link_no_ip_fuzzy_global = RegExp(r(t.tpl_link_no_ip_fuzzy), "ig"), t.host_fuzzy_test = RegExp(r(t.tpl_host_fuzzy_test), "i");
	let i = [];
	e.__compiled__ = {};
	function a(e, t) {
		throw Error(`(LinkifyIt) Invalid schema "${e}": ${t}`);
	}
	Object.keys(e.__schemas__).forEach(function(t) {
		let n = e.__schemas__[t];
		if (n === null) return;
		let r = {
			validate: null,
			link: null
		};
		if (e.__compiled__[t] = r, LS(n)) {
			RS(n.validate) ? r.validate = KS(n.validate) : zS(n.validate) ? r.validate = n.validate : a(t, n), zS(n.normalize) ? r.normalize = n.normalize : n.normalize ? a(t, n) : r.normalize = qS();
			return;
		}
		if (IS(n)) {
			i.push(t);
			return;
		}
		a(t, n);
	}), i.forEach(function(t) {
		e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize);
	}), e.__compiled__[""] = {
		validate: null,
		normalize: qS()
	};
	let o = Object.keys(e.__compiled__).filter(function(t) {
		return t.length > 0 && e.__compiled__[t];
	}).map(BS).join("|");
	e.re.schema_test = RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`, "i"), e.re.schema_search = RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`, "ig"), e.re.schema_at_start = RegExp(`^${e.re.schema_search.source}`, "i"), e.re.pretest = RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`, "i");
}
function YS(e, t, n, r) {
	let i = e.slice(n, r);
	this.schema = t.toLowerCase(), this.index = n, this.lastIndex = r, this.raw = i, this.text = i, this.url = i;
}
function XS(e, t) {
	if (!(this instanceof XS)) return new XS(e, t);
	t || HS(e) && (t = e, e = {}), this.__opts__ = PS({}, VS, t), this.__schemas__ = PS({}, US, e), this.__compiled__ = {}, this.__tlds__ = GS, this.__tlds_replaced__ = !1, this.re = {}, JS(this);
}
XS.prototype.add = function(e, t) {
	return this.__schemas__[e] = t, JS(this), this;
}, XS.prototype.set = function(e) {
	return this.__opts__ = PS(this.__opts__, e), this;
}, XS.prototype.test = function(e) {
	if (!e.length) return !1;
	let t, n;
	if (this.re.schema_test.test(e)) {
		for (n = this.re.schema_search, n.lastIndex = 0; (t = n.exec(e)) !== null;) if (this.testSchemaAt(e, t[2], n.lastIndex)) return !0;
	}
	return !!(this.__opts__.fuzzyLink && this.__compiled__["http:"] && e.search(this.re.host_fuzzy_test) >= 0 && e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy) !== null || this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && e.indexOf("@") >= 0 && e.match(this.re.email_fuzzy) !== null);
}, XS.prototype.pretest = function(e) {
	return this.re.pretest.test(e);
}, XS.prototype.testSchemaAt = function(e, t, n) {
	return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, n, this) : 0;
}, XS.prototype.match = function(e) {
	let t = [], n = [], r = [], i = [], a, o, s;
	function c(e, t) {
		return e ? t ? e.index === t.index ? e.lastIndex >= t.lastIndex ? e : t : e.index < t.index ? e : t : e : t;
	}
	if (!e.length) return null;
	if (this.re.schema_test.test(e)) for (s = this.re.schema_search, s.lastIndex = 0; (a = s.exec(e)) !== null;) o = this.testSchemaAt(e, a[2], s.lastIndex), o && n.push({
		schema: a[2],
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length + o
	});
	if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) for (s = this.__opts__.fuzzyIP ? this.re.link_fuzzy_global : this.re.link_no_ip_fuzzy_global, s.lastIndex = 0; (a = s.exec(e)) !== null;) r.push({
		schema: "",
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length
	});
	if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) for (s = this.re.email_fuzzy_global, s.lastIndex = 0; (a = s.exec(e)) !== null;) i.push({
		schema: "mailto:",
		index: a.index + a[1].length,
		lastIndex: a.index + a[0].length
	});
	let l = [
		0,
		0,
		0
	], u = 0;
	for (;;) {
		let a = [
			n[l[0]],
			i[l[1]],
			r[l[2]]
		], o = c(c(a[0], a[1]), a[2]);
		if (!o) break;
		if (o === a[0] ? l[0]++ : o === a[1] ? l[1]++ : l[2]++, o.index < u) continue;
		let s = new YS(e, o.schema, o.index, o.lastIndex);
		this.__compiled__[s.schema].normalize(s, this), t.push(s), u = o.lastIndex;
	}
	return t.length ? t : null;
}, XS.prototype.matchAtStart = function(e) {
	if (!e.length) return null;
	let t = this.re.schema_at_start.exec(e);
	if (!t) return null;
	let n = this.testSchemaAt(e, t[2], t[0].length);
	if (!n) return null;
	let r = new YS(e, t[2], t.index + t[1].length, t.index + t[0].length + n);
	return this.__compiled__[r.schema].normalize(r, this), r;
}, XS.prototype.tlds = function(e, t) {
	return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(e, t, n) {
		return e !== n[t - 1];
	}).reverse(), JS(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, JS(this), this);
}, XS.prototype.normalize = function(e) {
	e.schema || (e.url = `http://${e.url}`), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = `mailto:${e.url}`);
}, XS.prototype.onCompile = function() {};
//#endregion
//#region node_modules/punycode.js/punycode.es6.js
var ZS = 2147483647, QS = 36, $S = 1, eC = 26, tC = 38, nC = 700, rC = 72, iC = 128, aC = "-", oC = /^xn--/, sC = /[^\0-\x7F]/, cC = /[\x2E\u3002\uFF0E\uFF61]/g, lC = {
	overflow: "Overflow: input needs wider integers to process",
	"not-basic": "Illegal input >= 0x80 (not a basic code point)",
	"invalid-input": "Invalid input"
}, uC = 35, dC = Math.floor, fC = String.fromCharCode;
function pC(e) {
	throw RangeError(lC[e]);
}
function mC(e, t) {
	let n = [], r = e.length;
	for (; r--;) n[r] = t(e[r]);
	return n;
}
function hC(e, t) {
	let n = e.split("@"), r = "";
	n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(cC, ".");
	let i = mC(e.split("."), t).join(".");
	return r + i;
}
function gC(e) {
	let t = [], n = 0, r = e.length;
	for (; n < r;) {
		let i = e.charCodeAt(n++);
		if (i >= 55296 && i <= 56319 && n < r) {
			let r = e.charCodeAt(n++);
			(r & 64512) == 56320 ? t.push(((i & 1023) << 10) + (r & 1023) + 65536) : (t.push(i), n--);
		} else t.push(i);
	}
	return t;
}
var _C = (e) => String.fromCodePoint(...e), vC = function(e) {
	return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : QS;
}, yC = function(e, t) {
	return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, bC = function(e, t, n) {
	let r = 0;
	for (e = n ? dC(e / nC) : e >> 1, e += dC(e / t); e > 455; r += QS) e = dC(e / uC);
	return dC(r + 36 * e / (e + tC));
}, xC = function(e) {
	let t = [], n = e.length, r = 0, i = iC, a = rC, o = e.lastIndexOf(aC);
	o < 0 && (o = 0);
	for (let n = 0; n < o; ++n) e.charCodeAt(n) >= 128 && pC("not-basic"), t.push(e.charCodeAt(n));
	for (let s = o > 0 ? o + 1 : 0; s < n;) {
		let o = r;
		for (let t = 1, i = QS;; i += QS) {
			s >= n && pC("invalid-input");
			let o = vC(e.charCodeAt(s++));
			o >= QS && pC("invalid-input"), o > dC((ZS - r) / t) && pC("overflow"), r += o * t;
			let c = i <= a ? $S : i >= a + eC ? eC : i - a;
			if (o < c) break;
			let l = QS - c;
			t > dC(ZS / l) && pC("overflow"), t *= l;
		}
		let c = t.length + 1;
		a = bC(r - o, c, o == 0), dC(r / c) > ZS - i && pC("overflow"), i += dC(r / c), r %= c, t.splice(r++, 0, i);
	}
	return String.fromCodePoint(...t);
}, SC = function(e) {
	let t = [];
	e = gC(e);
	let n = e.length, r = iC, i = 0, a = rC;
	for (let n of e) n < 128 && t.push(fC(n));
	let o = t.length, s = o;
	for (o && t.push(aC); s < n;) {
		let n = ZS;
		for (let t of e) t >= r && t < n && (n = t);
		let c = s + 1;
		n - r > dC((ZS - i) / c) && pC("overflow"), i += (n - r) * c, r = n;
		for (let n of e) if (n < r && ++i > ZS && pC("overflow"), n === r) {
			let e = i;
			for (let n = QS;; n += QS) {
				let r = n <= a ? $S : n >= a + eC ? eC : n - a;
				if (e < r) break;
				let i = e - r, o = QS - r;
				t.push(fC(yC(r + i % o, 0))), e = dC(i / o);
			}
			t.push(fC(yC(e, 0))), a = bC(i, c, s === o), i = 0, ++s;
		}
		++i, ++r;
	}
	return t.join("");
}, CC = {
	version: "2.3.1",
	ucs2: {
		decode: gC,
		encode: _C
	},
	decode: xC,
	encode: SC,
	toASCII: function(e) {
		return hC(e, function(e) {
			return sC.test(e) ? "xn--" + SC(e) : e;
		});
	},
	toUnicode: function(e) {
		return hC(e, function(e) {
			return oC.test(e) ? xC(e.slice(4).toLowerCase()) : e;
		});
	}
}, wC = {
	default: {
		options: {
			html: !1,
			xhtmlOut: !1,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 100
		},
		components: {
			core: {},
			block: {},
			inline: {}
		}
	},
	zero: {
		options: {
			html: !1,
			xhtmlOut: !1,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: ["paragraph"] },
			inline: {
				rules: ["text"],
				rules2: ["balance_pairs", "fragments_join"]
			}
		}
	},
	commonmark: {
		options: {
			html: !0,
			xhtmlOut: !0,
			breaks: !1,
			langPrefix: "language-",
			linkify: !1,
			typographer: !1,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: [
				"blockquote",
				"code",
				"fence",
				"heading",
				"hr",
				"html_block",
				"lheading",
				"list",
				"reference",
				"paragraph"
			] },
			inline: {
				rules: [
					"autolink",
					"backticks",
					"emphasis",
					"entity",
					"escape",
					"html_inline",
					"image",
					"link",
					"newline",
					"text"
				],
				rules2: [
					"balance_pairs",
					"emphasis",
					"fragments_join"
				]
			}
		}
	}
}, TC = /^(vbscript|javascript|file|data):/, EC = /^data:image\/(gif|png|jpeg|webp);/;
function DC(e) {
	let t = e.trim().toLowerCase();
	return !TC.test(t) || EC.test(t);
}
var OC = [
	"http:",
	"https:",
	"mailto:"
];
function kC(e) {
	let t = Hy(e, !0);
	if (t.hostname && (!t.protocol || OC.indexOf(t.protocol) >= 0)) try {
		t.hostname = CC.toASCII(t.hostname);
	} catch {}
	return ky(Ay(t));
}
function AC(e) {
	let t = Hy(e, !0);
	if (t.hostname && (!t.protocol || OC.indexOf(t.protocol) >= 0)) try {
		t.hostname = CC.toUnicode(t.hostname);
	} catch {}
	return Ey(Ay(t), Ey.defaultChars + "%");
}
function jC(e, t) {
	if (!(this instanceof jC)) return new jC(e, t);
	t || yb(e) || (t = e || {}, e = "default"), this.inline = new MS(), this.block = new Zx(), this.core = new Dx(), this.renderer = new Qb(), this.linkify = new XS(), this.validateLink = DC, this.normalizeLink = kC, this.normalizeLinkText = AC, this.utils = _b, this.helpers = Sb({}, Xb), this.options = {}, this.configure(e), t && this.set(t);
}
jC.prototype.set = function(e) {
	return Sb(this.options, e), this;
}, jC.prototype.configure = function(e) {
	let t = this;
	if (yb(e)) {
		let t = e;
		if (e = wC[t], !e) throw Error("Wrong `markdown-it` preset \"" + t + "\", check name");
	}
	if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
	return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(n) {
		e.components[n].rules && t[n].ruler.enableOnly(e.components[n].rules), e.components[n].rules2 && t[n].ruler2.enableOnly(e.components[n].rules2);
	}), this;
}, jC.prototype.enable = function(e, t) {
	let n = [];
	Array.isArray(e) || (e = [e]), [
		"core",
		"block",
		"inline"
	].forEach(function(t) {
		n = n.concat(this[t].ruler.enable(e, !0));
	}, this), n = n.concat(this.inline.ruler2.enable(e, !0));
	let r = e.filter(function(e) {
		return n.indexOf(e) < 0;
	});
	if (r.length && !t) throw Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
	return this;
}, jC.prototype.disable = function(e, t) {
	let n = [];
	Array.isArray(e) || (e = [e]), [
		"core",
		"block",
		"inline"
	].forEach(function(t) {
		n = n.concat(this[t].ruler.disable(e, !0));
	}, this), n = n.concat(this.inline.ruler2.disable(e, !0));
	let r = e.filter(function(e) {
		return n.indexOf(e) < 0;
	});
	if (r.length && !t) throw Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
	return this;
}, jC.prototype.use = function(e) {
	let t = [this].concat(Array.prototype.slice.call(arguments, 1));
	return e.apply(e, t), this;
}, jC.prototype.parse = function(e, t) {
	if (typeof e != "string") throw Error("Input data should be a String");
	let n = new this.core.State(e, this, t);
	return this.core.process(n), n.tokens;
}, jC.prototype.render = function(e, t) {
	return t ||= {}, this.renderer.render(this.parse(e, t), this.options, t);
}, jC.prototype.parseInline = function(e, t) {
	let n = new this.core.State(e, this, t);
	return n.inlineMode = !0, this.core.process(n), n.tokens;
}, jC.prototype.renderInline = function(e, t) {
	return t ||= {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
//#endregion
//#region node_modules/prosemirror-markdown/dist/index.js
var MC = new no({
	nodes: {
		doc: { content: "block+" },
		paragraph: {
			content: "inline*",
			group: "block",
			parseDOM: [{ tag: "p" }],
			toDOM() {
				return ["p", 0];
			}
		},
		blockquote: {
			content: "block+",
			group: "block",
			parseDOM: [{ tag: "blockquote" }],
			toDOM() {
				return ["blockquote", 0];
			}
		},
		horizontal_rule: {
			group: "block",
			parseDOM: [{ tag: "hr" }],
			toDOM() {
				return ["div", ["hr"]];
			}
		},
		heading: {
			attrs: { level: { default: 1 } },
			content: "(text | image)*",
			group: "block",
			defining: !0,
			parseDOM: [
				{
					tag: "h1",
					attrs: { level: 1 }
				},
				{
					tag: "h2",
					attrs: { level: 2 }
				},
				{
					tag: "h3",
					attrs: { level: 3 }
				},
				{
					tag: "h4",
					attrs: { level: 4 }
				},
				{
					tag: "h5",
					attrs: { level: 5 }
				},
				{
					tag: "h6",
					attrs: { level: 6 }
				}
			],
			toDOM(e) {
				return ["h" + e.attrs.level, 0];
			}
		},
		code_block: {
			content: "text*",
			group: "block",
			code: !0,
			defining: !0,
			marks: "",
			attrs: { params: { default: "" } },
			parseDOM: [{
				tag: "pre",
				preserveWhitespace: "full",
				getAttrs: (e) => ({ params: e.getAttribute("data-params") || "" })
			}],
			toDOM(e) {
				return [
					"pre",
					e.attrs.params ? { "data-params": e.attrs.params } : {},
					["code", 0]
				];
			}
		},
		ordered_list: {
			content: "list_item+",
			group: "block",
			attrs: {
				order: { default: 1 },
				tight: { default: !1 }
			},
			parseDOM: [{
				tag: "ol",
				getAttrs(e) {
					return {
						order: e.hasAttribute("start") ? +e.getAttribute("start") : 1,
						tight: e.hasAttribute("data-tight")
					};
				}
			}],
			toDOM(e) {
				return [
					"ol",
					{
						start: e.attrs.order == 1 ? null : e.attrs.order,
						"data-tight": e.attrs.tight ? "true" : null
					},
					0
				];
			}
		},
		bullet_list: {
			content: "list_item+",
			group: "block",
			attrs: { tight: { default: !1 } },
			parseDOM: [{
				tag: "ul",
				getAttrs: (e) => ({ tight: e.hasAttribute("data-tight") })
			}],
			toDOM(e) {
				return [
					"ul",
					{ "data-tight": e.attrs.tight ? "true" : null },
					0
				];
			}
		},
		list_item: {
			content: "block+",
			defining: !0,
			parseDOM: [{ tag: "li" }],
			toDOM() {
				return ["li", 0];
			}
		},
		text: { group: "inline" },
		image: {
			inline: !0,
			attrs: {
				src: {},
				alt: { default: null },
				title: { default: null }
			},
			group: "inline",
			draggable: !0,
			parseDOM: [{
				tag: "img[src]",
				getAttrs(e) {
					return {
						src: e.getAttribute("src"),
						title: e.getAttribute("title"),
						alt: e.getAttribute("alt")
					};
				}
			}],
			toDOM(e) {
				return ["img", e.attrs];
			}
		},
		hard_break: {
			inline: !0,
			group: "inline",
			selectable: !1,
			parseDOM: [{ tag: "br" }],
			toDOM() {
				return ["br"];
			}
		}
	},
	marks: {
		em: {
			parseDOM: [
				{ tag: "i" },
				{ tag: "em" },
				{ style: "font-style=italic" },
				{
					style: "font-style=normal",
					clearMark: (e) => e.type.name == "em"
				}
			],
			toDOM() {
				return ["em"];
			}
		},
		strong: {
			parseDOM: [
				{ tag: "strong" },
				{
					tag: "b",
					getAttrs: (e) => e.style.fontWeight != "normal" && null
				},
				{
					style: "font-weight=400",
					clearMark: (e) => e.type.name == "strong"
				},
				{
					style: "font-weight",
					getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
				}
			],
			toDOM() {
				return ["strong"];
			}
		},
		link: {
			attrs: {
				href: {},
				title: { default: null }
			},
			inclusive: !1,
			parseDOM: [{
				tag: "a[href]",
				getAttrs(e) {
					return {
						href: e.getAttribute("href"),
						title: e.getAttribute("title")
					};
				}
			}],
			toDOM(e) {
				return ["a", e.attrs];
			}
		},
		code: {
			code: !0,
			parseDOM: [{ tag: "code" }],
			toDOM() {
				return ["code"];
			}
		}
	}
});
function NC(e, t) {
	if (e.isText && t.isText && V.sameSet(e.marks, t.marks)) return e.withText(e.text + t.text);
}
var PC = class {
	constructor(e, t) {
		this.schema = e, this.tokenHandlers = t, this.stack = [{
			type: e.topNodeType,
			attrs: null,
			content: [],
			marks: V.none
		}];
	}
	top() {
		return this.stack[this.stack.length - 1];
	}
	push(e) {
		this.stack.length && this.top().content.push(e);
	}
	addText(e) {
		if (!e) return;
		let t = this.top(), n = t.content, r = n[n.length - 1], i = this.schema.text(e, t.marks), a;
		r && (a = NC(r, i)) ? n[n.length - 1] = a : n.push(i);
	}
	openMark(e) {
		let t = this.top();
		t.marks = e.addToSet(t.marks);
	}
	closeMark(e) {
		let t = this.top();
		t.marks = e.removeFromSet(t.marks);
	}
	parseTokens(e) {
		for (let t = 0; t < e.length; t++) {
			let n = e[t], r = this.tokenHandlers[n.type];
			if (!r) throw Error("Token type `" + n.type + "` not supported by Markdown parser");
			r(this, n, e, t);
		}
	}
	addNode(e, t, n) {
		let r = this.top(), i = e.createAndFill(t, n, r ? r.marks : []);
		return i ? (this.push(i), i) : null;
	}
	openNode(e, t) {
		this.stack.push({
			type: e,
			attrs: t,
			content: [],
			marks: V.none
		});
	}
	closeNode() {
		let e = this.stack.pop();
		return this.addNode(e.type, e.attrs, e.content);
	}
};
function FC(e, t, n, r) {
	return e.getAttrs ? e.getAttrs(t, n, r) : e.attrs instanceof Function ? e.attrs(t) : e.attrs;
}
function IC(e, t) {
	return e.noCloseToken || t == "code_inline" || t == "code_block" || t == "fence";
}
function LC(e) {
	return e[e.length - 1] == "\n" ? e.slice(0, e.length - 1) : e;
}
function RC() {}
function zC(e, t) {
	let n = Object.create(null);
	for (let r in t) {
		let i = t[r];
		if (i.block) {
			let t = e.nodeType(i.block);
			IC(i, r) ? n[r] = (e, n, r, a) => {
				e.openNode(t, FC(i, n, r, a)), e.addText(LC(n.content)), e.closeNode();
			} : (n[r + "_open"] = (e, n, r, a) => e.openNode(t, FC(i, n, r, a)), n[r + "_close"] = (e) => e.closeNode());
		} else if (i.node) {
			let t = e.nodeType(i.node);
			n[r] = (e, n, r, a) => e.addNode(t, FC(i, n, r, a));
		} else if (i.mark) {
			let t = e.marks[i.mark];
			IC(i, r) ? n[r] = (e, n, r, a) => {
				e.openMark(t.create(FC(i, n, r, a))), e.addText(LC(n.content)), e.closeMark(t);
			} : (n[r + "_open"] = (e, n, r, a) => e.openMark(t.create(FC(i, n, r, a))), n[r + "_close"] = (e) => e.closeMark(t));
		} else if (i.ignore) IC(i, r) ? n[r] = RC : (n[r + "_open"] = RC, n[r + "_close"] = RC);
		else throw RangeError("Unrecognized parsing spec " + JSON.stringify(i));
	}
	return n.text = (e, t) => e.addText(t.content), n.inline = (e, t) => e.parseTokens(t.children), n.softbreak = n.softbreak || ((e) => e.addText(" ")), n;
}
var BC = class {
	constructor(e, t, n) {
		this.schema = e, this.tokenizer = t, this.tokens = n, this.tokenHandlers = zC(e, n);
	}
	parse(e, t = {}) {
		let n = new PC(this.schema, this.tokenHandlers), r;
		n.parseTokens(this.tokenizer.parse(e, t));
		do
			r = n.closeNode();
		while (n.stack.length);
		return r || this.schema.topNodeType.createAndFill();
	}
};
function VC(e, t) {
	for (; ++t < e.length;) if (e[t].type != "list_item_open") return e[t].hidden;
	return !1;
}
new BC(MC, jC("commonmark", { html: !1 }), {
	blockquote: { block: "blockquote" },
	paragraph: { block: "paragraph" },
	list_item: { block: "list_item" },
	bullet_list: {
		block: "bullet_list",
		getAttrs: (e, t, n) => ({ tight: VC(t, n) })
	},
	ordered_list: {
		block: "ordered_list",
		getAttrs: (e, t, n) => ({
			order: +e.attrGet("start") || 1,
			tight: VC(t, n)
		})
	},
	heading: {
		block: "heading",
		getAttrs: (e) => ({ level: +e.tag.slice(1) })
	},
	code_block: {
		block: "code_block",
		noCloseToken: !0
	},
	fence: {
		block: "code_block",
		getAttrs: (e) => ({ params: e.info || "" }),
		noCloseToken: !0
	},
	hr: { node: "horizontal_rule" },
	image: {
		node: "image",
		getAttrs: (e) => ({
			src: e.attrGet("src"),
			title: e.attrGet("title") || null,
			alt: e.children[0] && e.children[0].content || null
		})
	},
	hardbreak: { node: "hard_break" },
	em: { mark: "em" },
	strong: { mark: "strong" },
	link: {
		mark: "link",
		getAttrs: (e) => ({
			href: e.attrGet("href"),
			title: e.attrGet("title") || null
		})
	},
	code_inline: {
		mark: "code",
		noCloseToken: !0
	}
});
var HC = {
	open: "",
	close: "",
	mixable: !0
}, UC = new class {
	constructor(e, t, n = {}) {
		this.nodes = e, this.marks = t, this.options = n;
	}
	serialize(e, t = {}) {
		t = Object.assign({}, this.options, t);
		let n = new KC(this.nodes, this.marks, t);
		return n.renderContent(e), n.out;
	}
}({
	blockquote(e, t) {
		e.wrapBlock("> ", null, t, () => e.renderContent(t));
	},
	code_block(e, t) {
		let n = t.textContent.match(/`{3,}/gm), r = n ? n.sort().slice(-1)[0] + "`" : "```";
		e.write(r + (t.attrs.params || "") + "\n"), e.text(t.textContent, !1), e.write("\n"), e.write(r), e.closeBlock(t);
	},
	heading(e, t) {
		e.write(e.repeat("#", t.attrs.level) + " "), e.renderInline(t, !1), e.closeBlock(t);
	},
	horizontal_rule(e, t) {
		e.write(t.attrs.markup || "---"), e.closeBlock(t);
	},
	bullet_list(e, t) {
		e.renderList(t, "  ", () => (t.attrs.bullet || "*") + " ");
	},
	ordered_list(e, t) {
		let n = t.attrs.order ?? 1, r = String(n + t.childCount - 1).length, i = e.repeat(" ", r + 2);
		e.renderList(t, i, (t) => {
			let i = String(n + t);
			return e.repeat(" ", r - i.length) + i + ". ";
		});
	},
	list_item(e, t) {
		e.renderContent(t);
	},
	paragraph(e, t) {
		e.renderInline(t), e.closeBlock(t);
	},
	image(e, t) {
		e.write("![" + e.esc(t.attrs.alt || "") + "](" + t.attrs.src.replace(/[\(\)]/g, "\\$&") + (t.attrs.title ? " \"" + t.attrs.title.replace(/"/g, "\\\"") + "\"" : "") + ")");
	},
	hard_break(e, t, n, r) {
		for (let i = r + 1; i < n.childCount; i++) if (n.child(i).type != t.type) {
			e.write("\\\n");
			return;
		}
	},
	text(e, t) {
		e.text(t.text, !e.inAutolink);
	}
}, {
	em: {
		open: "*",
		close: "*",
		mixable: !0,
		expelEnclosingWhitespace: !0
	},
	strong: {
		open: "**",
		close: "**",
		mixable: !0,
		expelEnclosingWhitespace: !0
	},
	link: {
		open(e, t, n, r) {
			return e.inAutolink = GC(t, n, r), e.inAutolink ? "<" : "[";
		},
		close(e, t, n, r) {
			let { inAutolink: i } = e;
			return e.inAutolink = void 0, i ? ">" : "](" + t.attrs.href.replace(/[\(\)"]/g, "\\$&") + (t.attrs.title ? ` "${t.attrs.title.replace(/"/g, "\\\"")}"` : "") + ")";
		},
		mixable: !0
	},
	code: {
		open(e, t, n, r) {
			return WC(n.child(r), -1);
		},
		close(e, t, n, r) {
			return WC(n.child(r - 1), 1);
		},
		escape: !1
	}
});
function WC(e, t) {
	let n = /`+/g, r, i = 0;
	if (e.isText) for (; r = n.exec(e.text);) i = Math.max(i, r[0].length);
	let a = i > 0 && t > 0 ? " `" : "`";
	for (let e = 0; e < i; e++) a += "`";
	return i > 0 && t < 0 && (a += " "), a;
}
function GC(e, t, n) {
	if (e.attrs.title || !/^\w+:/.test(e.attrs.href)) return !1;
	let r = t.child(n);
	return !r.isText || r.text != e.attrs.href || r.marks[r.marks.length - 1] != e ? !1 : n == t.childCount - 1 || !e.isInSet(t.child(n + 1).marks);
}
var KC = class {
	constructor(e, t, n) {
		this.nodes = e, this.marks = t, this.options = n, this.delim = "", this.out = "", this.closed = null, this.inAutolink = void 0, this.atBlockStart = !1, this.inTightList = !1, this.options.tightLists === void 0 && (this.options.tightLists = !1), this.options.hardBreakNodeName === void 0 && (this.options.hardBreakNodeName = "hard_break");
	}
	flushClose(e = 2) {
		if (this.closed) {
			if (this.atBlank() || (this.out += "\n"), e > 1) {
				let t = this.delim, n = /\s+$/.exec(t);
				n && (t = t.slice(0, t.length - n[0].length));
				for (let n = 1; n < e; n++) this.out += t + "\n";
			}
			this.closed = null;
		}
	}
	getMark(e) {
		let t = this.marks[e];
		if (!t) {
			if (this.options.strict !== !1) throw Error(`Mark type \`${e}\` not supported by Markdown renderer`);
			t = HC;
		}
		return t;
	}
	wrapBlock(e, t, n, r) {
		let i = this.delim;
		this.write(t ?? e), this.delim += e, r(), this.delim = i, this.closeBlock(n);
	}
	atBlank() {
		return /(^|\n)$/.test(this.out);
	}
	ensureNewLine() {
		this.atBlank() || (this.out += "\n");
	}
	write(e) {
		this.flushClose(), this.delim && this.atBlank() && (this.out += this.delim), e && (this.out += e);
	}
	closeBlock(e) {
		this.closed = e;
	}
	text(e, t = !0) {
		let n = e.split("\n");
		for (let e = 0; e < n.length; e++) this.write(), !t && n[e][0] == "[" && /(^|[^\\])\!$/.test(this.out) && (this.out = this.out.slice(0, this.out.length - 1) + "\\!"), this.out += t ? this.esc(n[e], this.atBlockStart) : n[e], e != n.length - 1 && (this.out += "\n");
	}
	render(e, t, n) {
		if (this.nodes[e.type.name]) this.nodes[e.type.name](this, e, t, n);
		else if (this.options.strict !== !1) throw Error("Token type `" + e.type.name + "` not supported by Markdown renderer");
		else e.type.isLeaf || (e.type.inlineContent ? this.renderInline(e) : this.renderContent(e), e.isBlock && this.closeBlock(e));
	}
	renderContent(e) {
		e.forEach((t, n, r) => this.render(t, e, r));
	}
	renderInline(e, t = !0) {
		this.atBlockStart = t;
		let n = [], r = "", i = (t, i, a) => {
			let o = t ? t.marks : [];
			t && t.type.name === this.options.hardBreakNodeName && (o = o.filter((t) => {
				if (a + 1 == e.childCount) return !1;
				let n = e.child(a + 1);
				return t.isInSet(n.marks) && (!n.isText || /\S/.test(n.text));
			}));
			let s = r;
			if (r = "", t && t.isText && o.some((e) => {
				let t = this.getMark(e.type.name);
				return t && t.expelEnclosingWhitespace && !e.isInSet(n);
			})) {
				let [e, r, i] = /^(\s*)(.*)$/m.exec(t.text);
				r && (s += r, t = i ? t.withText(i) : null, t || (o = n));
			}
			if (t && t.isText && o.some((t) => {
				let n = this.getMark(t.type.name);
				return n && n.expelEnclosingWhitespace && !this.isMarkAhead(e, a + 1, t);
			})) {
				let [e, i, a] = /^(.*?)(\s*)$/m.exec(t.text);
				a && (r = a, t = i ? t.withText(i) : null, t || (o = n));
			}
			let c = o.length ? o[o.length - 1] : null, l = c && this.getMark(c.type.name).escape === !1, u = o.length - +!!l;
			outer: for (let e = 0; e < u; e++) {
				let t = o[e];
				if (!this.getMark(t.type.name).mixable) break;
				for (let r = 0; r < n.length; r++) {
					let i = n[r];
					if (!this.getMark(i.type.name).mixable) break;
					if (t.eq(i)) {
						e > r ? o = o.slice(0, r).concat(t).concat(o.slice(r, e)).concat(o.slice(e + 1, u)) : r > e && (o = o.slice(0, e).concat(o.slice(e + 1, r)).concat(t).concat(o.slice(r, u)));
						continue outer;
					}
				}
			}
			let d = 0;
			for (; d < Math.min(n.length, u) && o[d].eq(n[d]);) ++d;
			for (; d < n.length;) this.text(this.markString(n.pop(), !1, e, a), !1);
			if (s && this.text(s), t) {
				for (; n.length < u;) {
					let t = o[n.length];
					n.push(t), this.text(this.markString(t, !0, e, a), !1), this.atBlockStart = !1;
				}
				l && t.isText ? this.text(this.markString(c, !0, e, a) + t.text + this.markString(c, !1, e, a + 1), !1) : this.render(t, e, a), this.atBlockStart = !1;
			}
			t?.isText && t.nodeSize > 0 && (this.atBlockStart = !1);
		};
		e.forEach(i), i(null, 0, e.childCount), this.atBlockStart = !1;
	}
	renderList(e, t, n) {
		this.closed && this.closed.type == e.type ? this.flushClose(3) : this.inTightList && this.flushClose(1);
		let r = e.attrs.tight === void 0 ? this.options.tightLists : e.attrs.tight, i = this.inTightList;
		this.inTightList = r, e.forEach((i, a, o) => {
			o && r && this.flushClose(1), this.wrapBlock(t, n(o), e, () => this.render(i, e, o));
		}), this.inTightList = i;
	}
	esc(e, t = !1) {
		return e = e.replace(/[`*\\~\[\]_]/g, (t, n) => t == "_" && n > 0 && n + 1 < e.length && e[n - 1].match(/\w/) && e[n + 1].match(/\w/) ? t : "\\" + t), t && (e = e.replace(/^(\+[ ]|[\-*>])/, "\\$&").replace(/^(\s*)(#{1,6})(\s|$)/, "$1\\$2$3").replace(/^(\s*\d+)\.\s/, "$1\\. ")), this.options.escapeExtraCharacters && (e = e.replace(this.options.escapeExtraCharacters, "\\$&")), e;
	}
	quote(e) {
		let t = e.indexOf("\"") == -1 ? "\"\"" : e.indexOf("'") == -1 ? "''" : "()";
		return t[0] + e + t[1];
	}
	repeat(e, t) {
		let n = "";
		for (let r = 0; r < t; r++) n += e;
		return n;
	}
	markString(e, t, n, r) {
		let i = this.getMark(e.type.name), a = t ? i.open : i.close;
		return typeof a == "string" ? a : a(this, e, n, r);
	}
	getEnclosingWhitespace(e) {
		return {
			leading: (e.match(/^(\s+)/) || [void 0])[0],
			trailing: (e.match(/(\s+)$/) || [void 0])[0]
		};
	}
	isMarkAhead(e, t, n) {
		for (;; t++) {
			if (t >= e.childCount) return !1;
			let r = e.child(t);
			if (r.type.name != this.options.hardBreakNodeName) return n.isInSet(r.marks);
			t++;
		}
	}
}, qC = Cy.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			link: {
				default: null,
				parseHTML: (e) => e.getAttribute("href"),
				renderHTML: (e) => ({ href: e.link })
			}
		};
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"a",
			vh({ "data-type": this.name }, this.options.HTMLAttributes, t),
			`@${e.attrs.label ?? e.attrs.id ?? ""}`
		];
	},
	addStorage() {
		return { markdown: { serialize(e, t) {
			let n = t.attrs.label ?? t.attrs.id ?? "", r = t.attrs.link;
			e.write(r ? `[@${n}](${r})` : `@${n}`);
		} } };
	}
});
function JC(e) {
	let t = u(e);
	c(() => {
		t.current = e;
	}, [e]);
	let n = u(null), [r, i] = d(null), a = u(!1), o = u(null), s = (e) => {
		i({
			items: e.items,
			loading: !1,
			command: (t) => e.command(t),
			rect: e.clientRect?.() ?? null
		});
	};
	return c(() => {
		e && (o.current = qC.configure({
			HTMLAttributes: { class: "ibexa-ai-assistant-chat-input__mention" },
			suggestion: {
				items: async ({ query: e }) => {
					i((e) => e ? {
						...e,
						loading: !0
					} : null);
					try {
						return await t.current?.(e) ?? [];
					} catch {
						return [];
					}
				},
				render: () => ({
					onStart: (e) => {
						a.current = !0, s(e);
					},
					onUpdate: s,
					onKeyDown: ({ event: e }) => e.key === "Escape" ? (a.current = !1, i(null), !0) : n.current?.handleKeyDown(e) ?? !1,
					onExit: () => {
						a.current = !1, i(null);
					}
				})
			}
		}));
	}, []), {
		mentionExtensionRef: o,
		mentionListRef: n,
		mentionPopup: r,
		mentionActiveRef: a
	};
}
//#endregion
//#region node_modules/@tiptap/core/dist/jsx-runtime/jsx-runtime.js
var YC = (e, t) => {
	if (e === "slot") return 0;
	if (e instanceof Function) return e(t);
	let { children: n, ...r } = t ?? {};
	if (e === "svg") throw Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
	return [
		e,
		r,
		n
	];
}, XC = (e, t) => {
	let { state: n, view: r } = e, { selection: i } = n;
	if (!i.empty) return !1;
	let { $from: a } = i;
	if (a.parentOffset !== 0) return !1;
	let o = a.depth - 1;
	if (o < 0) return !1;
	let s = a.node(o), c = a.index(o);
	if (c === 0) return !1;
	if (s.type === t) return e.commands.lift(t.name);
	let l = s.child(c - 1);
	if (l.type !== t || !l.lastChild?.isTextblock) return !1;
	let u = a.before(), d = u - 1 - 1, { tr: f } = n;
	return f.delete(u, a.after()).insert(d, a.parent.content), f.setSelection(W.create(f.doc, d)), r.dispatch(f.scrollIntoView()), !0;
}, ZC = /^\s*>\s$/, QC = X.create({
	name: "blockquote",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	group: "block",
	defining: !0,
	parseHTML() {
		return [{ tag: "blockquote" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return /* @__PURE__ */ YC("blockquote", {
			...vh(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ YC("slot", {})
		});
	},
	parseMarkdown: (e, t) => {
		let n = t.parseBlockChildren ?? t.parseChildren;
		return t.createNode("blockquote", void 0, n(e.tokens || []));
	},
	renderMarkdown: (e, t) => {
		if (!e.content) return "";
		let n = [];
		return e.content.forEach((e, r) => {
			let i = (t.renderChild?.call(t, e, r) ?? t.renderChildren([e])).split("\n").map((e) => e.trim() === "" ? ">" : `> ${e}`);
			n.push(i.join("\n"));
		}), n.join("\n>\n");
	},
	addCommands() {
		return {
			setBlockquote: () => ({ commands: e }) => e.wrapIn(this.name),
			toggleBlockquote: () => ({ commands: e }) => e.toggleWrap(this.name),
			unsetBlockquote: () => ({ commands: e }) => e.lift(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
			Backspace: () => XC(this.editor, this.type)
		};
	},
	addInputRules() {
		return [b_({
			find: ZC,
			type: this.type
		})];
	}
}), $C = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, ew = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, tw = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, nw = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, rw = Jg.create({
	name: "bold",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (e) => e.style.fontWeight !== "normal" && null
			},
			{
				style: "font-weight=400",
				clearMark: (e) => e.type.name === this.name
			},
			{
				style: "font-weight",
				getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return /* @__PURE__ */ YC("strong", {
			...vh(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ YC("slot", {})
		});
	},
	markdownTokenName: "strong",
	parseMarkdown: (e, t) => t.applyMark("bold", t.parseInline(e.tokens || [])),
	markdownOptions: { htmlReopen: {
		open: "<strong>",
		close: "</strong>"
	} },
	renderMarkdown: (e, t) => `**${t.renderChildren(e)}**`,
	addCommands() {
		return {
			setBold: () => ({ commands: e }) => e.setMark(this.name),
			toggleBold: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetBold: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-b": () => this.editor.commands.toggleBold(),
			"Mod-B": () => this.editor.commands.toggleBold()
		};
	},
	addInputRules() {
		return [__({
			find: $C,
			type: this.type
		}), __({
			find: tw,
			type: this.type
		})];
	},
	addPasteRules() {
		return [x_({
			find: ew,
			type: this.type
		}), x_({
			find: nw,
			type: this.type
		})];
	}
}), iw = (e) => {
	let t = /`([^`]+)`(?!`)$/.exec(e);
	return !t || t.index > 0 && e[t.index - 1] === "`" ? null : {
		index: t.index,
		text: t[0],
		replaceWith: t[1]
	};
}, aw = (e) => {
	let t = /`([^`]+)`(?!`)/g, n = [], r;
	for (; (r = t.exec(e)) !== null;) r.index > 0 && e[r.index - 1] === "`" || n.push({
		index: r.index,
		text: r[0],
		replaceWith: r[1]
	});
	return n;
}, ow = Jg.create({
	name: "code",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	excludes: "_",
	code: !0,
	exitable: !0,
	parseHTML() {
		return [{ tag: "code" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"code",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "codespan",
	parseMarkdown: (e, t) => t.applyMark("code", [{
		type: "text",
		text: e.text || ""
	}]),
	renderMarkdown: (e, t) => e.content ? `\`${t.renderChildren(e.content)}\`` : "",
	addCommands() {
		return {
			setCode: () => ({ commands: e }) => e.setMark(this.name),
			toggleCode: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetCode: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-e": () => this.editor.commands.toggleCode() };
	},
	addInputRules() {
		return [__({
			find: iw,
			type: this.type
		})];
	},
	addPasteRules() {
		return [x_({
			find: aw,
			type: this.type
		})];
	}
}), sw = 4, cw = /^```([a-z]+)?[\s\n]$/, lw = /^~~~([a-z]+)?[\s\n]$/, uw = X.create({
	name: "codeBlock",
	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: !0,
			exitOnArrowDown: !0,
			exitOnArrowUp: !0,
			defaultLanguage: null,
			enableTabIndentation: !1,
			tabSize: sw,
			HTMLAttributes: {}
		};
	},
	content: "text*",
	marks: "",
	group: "block",
	code: !0,
	defining: !0,
	addAttributes() {
		return { language: {
			default: this.options.defaultLanguage,
			parseHTML: (e) => {
				let { languageClassPrefix: t } = this.options;
				return t && [...e.firstElementChild?.classList || []].filter((e) => e.startsWith(t)).map((e) => e.replace(t, ""))[0] || null;
			},
			rendered: !1
		} };
	},
	parseHTML() {
		return [{
			tag: "pre",
			preserveWhitespace: "full"
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"pre",
			vh(this.options.HTMLAttributes, t),
			[
				"code",
				{ class: e.attrs.language ? this.options.languageClassPrefix + e.attrs.language : null },
				0
			]
		];
	},
	markdownTokenName: "code",
	parseMarkdown: (e, t) => e.raw?.startsWith("```") === !1 && e.raw?.startsWith("~~~") === !1 && e.codeBlockStyle !== "indented" ? [] : t.createNode("codeBlock", { language: e.lang || null }, e.text ? [t.createTextNode(e.text)] : []),
	renderMarkdown: (e, t) => {
		let n = "", r = e.attrs?.language || "";
		return n = e.content ? [
			`\`\`\`${r}`,
			t.renderChildren(e.content),
			"```"
		].join("\n") : `\`\`\`${r}

\`\`\``, n;
	},
	addCommands() {
		return {
			setCodeBlock: (e) => ({ commands: t }) => t.setNode(this.name, e),
			toggleCodeBlock: (e) => ({ commands: t }) => t.toggleNode(this.name, "paragraph", e)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
			Backspace: () => {
				let { empty: e, $anchor: t } = this.editor.state.selection, n = t.pos === 1;
				return !e || t.parent.type.name !== this.name ? !1 : n || !t.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
			},
			Tab: ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? sw, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				if (i.parent.type !== this.type) return !1;
				let o = " ".repeat(t);
				return a ? e.commands.insertContent(o) : e.commands.command(({ tr: e }) => {
					let { from: t, to: i } = r, a = n.doc.textBetween(t, i, "\n", "\n").split("\n").map((e) => o + e).join("\n");
					return e.replaceWith(t, i, n.schema.text(a)), !0;
				});
			},
			"Shift-Tab": ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? sw, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				return i.parent.type === this.type ? a ? e.commands.command(({ tr: e }) => {
					let { pos: r } = i, a = i.start(), o = i.end(), s = n.doc.textBetween(a, o, "\n", "\n").split("\n"), c = 0, l = 0, u = r - a;
					for (let e = 0; e < s.length; e += 1) {
						if (l + s[e].length >= u) {
							c = e;
							break;
						}
						l += s[e].length + 1;
					}
					let d = s[c].match(/^ */)?.[0] || "", f = Math.min(d.length, t);
					if (f === 0) return !0;
					let p = a;
					for (let e = 0; e < c; e += 1) p += s[e].length + 1;
					return e.delete(p, p + f), r - p <= f && e.setSelection(W.create(e.doc, p)), !0;
				}) : e.commands.command(({ tr: e }) => {
					let { from: i, to: a } = r, o = n.doc.textBetween(i, a, "\n", "\n").split("\n").map((e) => {
						let n = e.match(/^ */)?.[0] || "", r = Math.min(n.length, t);
						return e.slice(r);
					}).join("\n");
					return e.replaceWith(i, a, n.schema.text(o)), !0;
				}) : !1;
			},
			Enter: ({ editor: e }) => {
				if (!this.options.exitOnTripleEnter) return !1;
				let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
				if (!i || r.parent.type !== this.type) return !1;
				let a = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith("\n\n");
				return !a || !o ? !1 : e.chain().command(({ tr: e }) => (e.delete(r.pos - 2, r.pos), !0)).exitCode().run();
			},
			ArrowUp: ({ editor: e }) => {
				if (!this.options.exitOnArrowUp) return !1;
				let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
				if (!i || r.parent.type !== this.type || r.parentOffset !== 0) return !1;
				let a = r.before();
				return a > 0 ? !1 : e.commands.insertDefaultBlock({ pos: a });
			},
			ArrowDown: ({ editor: e }) => {
				if (!this.options.exitOnArrowDown) return !1;
				let { state: t } = e, { selection: n, doc: r } = t, { $from: i, empty: a } = n;
				if (!a || i.parent.type !== this.type || i.parentOffset !== i.parent.nodeSize - 2) return !1;
				let o = i.after();
				return o === void 0 ? !1 : r.nodeAt(o) ? e.commands.command(({ tr: e }) => (e.setSelection(U.near(r.resolve(o))), !0)) : e.commands.exitCode();
			}
		};
	},
	addInputRules() {
		return [y_({
			find: cw,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		}), y_({
			find: lw,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		})];
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("codeBlockVSCodeHandler"),
			props: { handlePaste: (e, t) => {
				if (!t.clipboardData || this.editor.isActive(this.type.name)) return !1;
				let n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), i = (r ? JSON.parse(r) : void 0)?.mode;
				if (!n || !i) return !1;
				let { tr: a, schema: o } = e.state, s = o.text(n.replace(/\r\n?/g, "\n"));
				return a.replaceSelectionWith(this.type.create({ language: i }, s)), a.selection.$from.parent.type !== this.type && a.setSelection(W.near(a.doc.resolve(Math.max(0, a.selection.from - 2)))), a.setMeta("paste", !0), e.dispatch(a), !0;
			} }
		})];
	}
}), dw = X.create({
	name: "doc",
	topNode: !0,
	content: "block+",
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n\n") : ""
}), fw = X.create({
	name: "hardBreak",
	markdownTokenName: "br",
	addOptions() {
		return {
			keepMarks: !0,
			HTMLAttributes: {}
		};
	},
	inline: !0,
	group: "inline",
	selectable: !1,
	linebreakReplacement: !0,
	parseHTML() {
		return [{ tag: "br" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["br", vh(this.options.HTMLAttributes, e)];
	},
	renderText() {
		return "\n";
	},
	renderMarkdown: () => "  \n",
	parseMarkdown: () => ({ type: "hardBreak" }),
	addCommands() {
		return { setHardBreak: () => ({ commands: e, chain: t, state: n, editor: r }) => e.first([() => e.exitCode(), () => e.command(() => {
			let { selection: e, storedMarks: i } = n;
			if (e.$from.parent.type.spec.isolating) return !1;
			let { keepMarks: a } = this.options, { splittableMarks: o } = r.extensionManager, s = i || e.$to.parentOffset && e.$from.marks();
			return t().insertContent({ type: this.name }).command(({ tr: e, dispatch: t }) => {
				if (t && s && a) {
					let t = s.filter((e) => o.includes(e.type.name));
					e.ensureMarks(t);
				}
				return !0;
			}).scrollIntoView().run();
		})]) };
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Enter": () => this.editor.commands.setHardBreak(),
			"Shift-Enter": () => this.editor.commands.setHardBreak()
		};
	}
}), pw = X.create({
	name: "heading",
	addOptions() {
		return {
			levels: [
				1,
				2,
				3,
				4,
				5,
				6
			],
			HTMLAttributes: {}
		};
	},
	content: "inline*",
	group: "block",
	defining: !0,
	addAttributes() {
		return { level: {
			default: 1,
			rendered: !1
		} };
	},
	parseHTML() {
		return this.options.levels.map((e) => ({
			tag: `h${e}`,
			attrs: { level: e }
		}));
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			`h${this.options.levels.includes(e.attrs.level) ? e.attrs.level : this.options.levels[0]}`,
			vh(this.options.HTMLAttributes, t),
			0
		];
	},
	parseMarkdown: (e, t) => t.createNode("heading", { level: e.depth || 1 }, t.parseInline(e.tokens || [])),
	renderMarkdown: (e, t) => {
		let n = e.attrs?.level ? parseInt(e.attrs.level, 10) : 1, r = "#".repeat(n);
		return e.content ? `${r} ${t.renderChildren(e.content)}` : "";
	},
	addCommands() {
		return {
			setHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.setNode(this.name, e) : !1,
			toggleHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.toggleNode(this.name, "paragraph", e) : !1
		};
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((e, t) => ({
			...e,
			[`Mod-Alt-${t}`]: () => this.editor.commands.toggleHeading({ level: t })
		}), {});
	},
	addInputRules() {
		return this.options.levels.map((e) => y_({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), mw = X.create({
	name: "horizontalRule",
	addOptions() {
		return {
			HTMLAttributes: {},
			nextNodeType: "paragraph"
		};
	},
	group: "block",
	parseHTML() {
		return [{ tag: "hr" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["hr", vh(this.options.HTMLAttributes, e)];
	},
	markdownTokenName: "hr",
	parseMarkdown: (e, t) => t.createNode("horizontalRule"),
	renderMarkdown: () => "---",
	addCommands() {
		return { setHorizontalRule: () => ({ chain: e, state: t }) => {
			if (!Eg(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $to: r } = n, i = e();
			return Jh(n) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: e, tr: t, dispatch: n }) => {
				if (n) {
					let { $to: n } = t.selection, r = n.end();
					if (n.nodeAfter) n.nodeAfter.isTextblock ? t.setSelection(W.create(t.doc, n.pos + 1)) : n.nodeAfter.isBlock ? t.setSelection(G.create(t.doc, n.pos)) : t.setSelection(W.create(t.doc, n.pos));
					else {
						let i = (e.schema.nodes[this.options.nextNodeType] || n.parent.type.contentMatch.defaultType)?.create();
						i && (t.insert(r, i), t.setSelection(W.create(t.doc, r + 1)));
					}
					t.scrollIntoView();
				}
				return !0;
			}).run();
		} };
	},
	addInputRules() {
		return [v_({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), hw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, gw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, _w = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, vw = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, yw = Jg.create({
	name: "italic",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "em" },
			{
				tag: "i",
				getAttrs: (e) => e.style.fontStyle !== "normal" && null
			},
			{
				style: "font-style=normal",
				clearMark: (e) => e.type.name === this.name
			},
			{ style: "font-style=italic" }
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"em",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setItalic: () => ({ commands: e }) => e.setMark(this.name),
			toggleItalic: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetItalic: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	markdownTokenName: "em",
	parseMarkdown: (e, t) => t.applyMark("italic", t.parseInline(e.tokens || [])),
	markdownOptions: { htmlReopen: {
		open: "<em>",
		close: "</em>"
	} },
	renderMarkdown: (e, t) => `*${t.renderChildren(e)}*`,
	addKeyboardShortcuts() {
		return {
			"Mod-i": () => this.editor.commands.toggleItalic(),
			"Mod-I": () => this.editor.commands.toggleItalic()
		};
	},
	addInputRules() {
		return [__({
			find: hw,
			type: this.type
		}), __({
			find: _w,
			type: this.type
		})];
	},
	addPasteRules() {
		return [x_({
			find: gw,
			type: this.type
		}), x_({
			find: vw,
			type: this.type
		})];
	}
}), bw = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", xw = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Sw = "numeric", Cw = "ascii", ww = "alpha", Tw = "asciinumeric", Ew = "alphanumeric", Dw = "domain", Ow = "emoji", kw = "scheme", Aw = "slashscheme", jw = "whitespace";
function Mw(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Nw(e, t, n) {
	t[Sw] && (t[Tw] = !0, t[Ew] = !0), t[Cw] && (t[Tw] = !0, t[ww] = !0), t[Tw] && (t[Ew] = !0), t[ww] && (t[Ew] = !0), t[Ew] && (t[Dw] = !0), t[Ow] && (t[Dw] = !0);
	for (let r in t) {
		let t = Mw(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Pw(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function Fw(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
Fw.groups = {}, Fw.prototype = {
	accepts() {
		return !!this.t;
	},
	go(e) {
		let t = this, n = t.j[e];
		if (n) return n;
		for (let n = 0; n < t.jr.length; n++) {
			let r = t.jr[n][0], i = t.jr[n][1];
			if (i && r.test(e)) return i;
		}
		return t.jd;
	},
	has(e, t = !1) {
		return t ? e in this.j : !!this.go(e);
	},
	ta(e, t, n, r) {
		for (let i = 0; i < e.length; i++) this.tt(e[i], t, n, r);
	},
	tr(e, t, n, r) {
		r ||= Fw.groups;
		let i;
		return t && t.j ? i = t : (i = new Fw(t), n && r && Nw(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= Fw.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new Fw(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new Fw(), a && (r && (o.t && typeof o.t == "string" ? Nw(a, Object.assign(Pw(o.t, r), n), r) : n && Nw(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var Q = (e, t, n, r, i) => e.ta(t, n, r, i), Iw = (e, t, n, r, i) => e.tr(t, n, r, i), Lw = (e, t, n, r, i) => e.ts(t, n, r, i), $ = (e, t, n, r, i) => e.tt(t, n, r, i), Rw = "WORD", zw = "UWORD", Bw = "ASCIINUMERICAL", Vw = "ALPHANUMERICAL", Hw = "LOCALHOST", Uw = "TLD", Ww = "UTLD", Gw = "SCHEME", Kw = "SLASH_SCHEME", qw = "NUM", Jw = "WS", Yw = "NL", Xw = "OPENBRACE", Zw = "CLOSEBRACE", Qw = "OPENBRACKET", $w = "CLOSEBRACKET", eT = "OPENPAREN", tT = "CLOSEPAREN", nT = "OPENANGLEBRACKET", rT = "CLOSEANGLEBRACKET", iT = "FULLWIDTHLEFTPAREN", aT = "FULLWIDTHRIGHTPAREN", oT = "LEFTCORNERBRACKET", sT = "RIGHTCORNERBRACKET", cT = "LEFTWHITECORNERBRACKET", lT = "RIGHTWHITECORNERBRACKET", uT = "FULLWIDTHLESSTHAN", dT = "FULLWIDTHGREATERTHAN", fT = "AMPERSAND", pT = "APOSTROPHE", mT = "ASTERISK", hT = "AT", gT = "BACKSLASH", _T = "BACKTICK", vT = "CARET", yT = "COLON", bT = "COMMA", xT = "DOLLAR", ST = "DOT", CT = "EQUALS", wT = "EXCLAMATION", TT = "HYPHEN", ET = "PERCENT", DT = "PIPE", OT = "PLUS", kT = "POUND", AT = "QUERY", jT = "QUOTE", MT = "FULLWIDTHMIDDLEDOT", NT = "SEMI", PT = "SLASH", FT = "TILDE", IT = "UNDERSCORE", LT = "EMOJI", RT = "SYM", zT = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: Vw,
	AMPERSAND: fT,
	APOSTROPHE: pT,
	ASCIINUMERICAL: Bw,
	ASTERISK: mT,
	AT: hT,
	BACKSLASH: gT,
	BACKTICK: _T,
	CARET: vT,
	CLOSEANGLEBRACKET: rT,
	CLOSEBRACE: Zw,
	CLOSEBRACKET: $w,
	CLOSEPAREN: tT,
	COLON: yT,
	COMMA: bT,
	DOLLAR: xT,
	DOT: ST,
	EMOJI: LT,
	EQUALS: CT,
	EXCLAMATION: wT,
	FULLWIDTHGREATERTHAN: dT,
	FULLWIDTHLEFTPAREN: iT,
	FULLWIDTHLESSTHAN: uT,
	FULLWIDTHMIDDLEDOT: MT,
	FULLWIDTHRIGHTPAREN: aT,
	HYPHEN: TT,
	LEFTCORNERBRACKET: oT,
	LEFTWHITECORNERBRACKET: cT,
	LOCALHOST: Hw,
	NL: Yw,
	NUM: qw,
	OPENANGLEBRACKET: nT,
	OPENBRACE: Xw,
	OPENBRACKET: Qw,
	OPENPAREN: eT,
	PERCENT: ET,
	PIPE: DT,
	PLUS: OT,
	POUND: kT,
	QUERY: AT,
	QUOTE: jT,
	RIGHTCORNERBRACKET: sT,
	RIGHTWHITECORNERBRACKET: lT,
	SCHEME: Gw,
	SEMI: NT,
	SLASH: PT,
	SLASH_SCHEME: Kw,
	SYM: RT,
	TILDE: FT,
	TLD: Uw,
	UNDERSCORE: IT,
	UTLD: Ww,
	UWORD: zw,
	WORD: Rw,
	WS: Jw
}), BT = /[a-z]/, VT = /\p{L}/u, HT = /\p{Emoji}/u, UT = /\d/, WT = /\s/, GT = "\r", KT = "\n", qT = "️", JT = "‍", YT = "￼", XT = null, ZT = null;
function QT(e = []) {
	let t = {};
	Fw.groups = t;
	let n = new Fw();
	XT ??= nE(bw), ZT ??= nE(xw), $(n, "'", pT), $(n, "{", Xw), $(n, "}", Zw), $(n, "[", Qw), $(n, "]", $w), $(n, "(", eT), $(n, ")", tT), $(n, "<", nT), $(n, ">", rT), $(n, "（", iT), $(n, "）", aT), $(n, "「", oT), $(n, "」", sT), $(n, "『", cT), $(n, "』", lT), $(n, "＜", uT), $(n, "＞", dT), $(n, "&", fT), $(n, "*", mT), $(n, "@", hT), $(n, "`", _T), $(n, "^", vT), $(n, ":", yT), $(n, ",", bT), $(n, "$", xT), $(n, ".", ST), $(n, "=", CT), $(n, "!", wT), $(n, "-", TT), $(n, "%", ET), $(n, "|", DT), $(n, "+", OT), $(n, "#", kT), $(n, "?", AT), $(n, "\"", jT), $(n, "/", PT), $(n, ";", NT), $(n, "~", FT), $(n, "_", IT), $(n, "\\", gT), $(n, "・", MT);
	let r = Iw(n, UT, qw, { [Sw]: !0 });
	Iw(r, UT, r);
	let i = Iw(r, BT, Bw, { [Tw]: !0 }), a = Iw(r, VT, Vw, { [Ew]: !0 }), o = Iw(n, BT, Rw, { [Cw]: !0 });
	Iw(o, UT, i), Iw(o, BT, o), Iw(i, UT, i), Iw(i, BT, i);
	let s = Iw(n, VT, zw, { [ww]: !0 });
	Iw(s, BT), Iw(s, UT, a), Iw(s, VT, s), Iw(a, UT, a), Iw(a, BT), Iw(a, VT, a);
	let c = $(n, KT, Yw, { [jw]: !0 }), l = $(n, GT, Jw, { [jw]: !0 }), u = Iw(n, WT, Jw, { [jw]: !0 });
	$(n, YT, u), $(l, KT, c), $(l, YT, u), Iw(l, WT, u), $(u, GT), $(u, KT), Iw(u, WT, u), $(u, YT, u);
	let d = Iw(n, HT, LT, { [Ow]: !0 });
	$(d, "#"), Iw(d, HT, d), $(d, qT, d);
	let f = $(d, JT);
	$(f, "#"), Iw(f, HT, d);
	let p = [[BT, o], [UT, i]], m = [
		[BT, null],
		[VT, s],
		[UT, a]
	];
	for (let e = 0; e < XT.length; e++) tE(n, XT[e], Uw, Rw, p);
	for (let e = 0; e < ZT.length; e++) tE(n, ZT[e], Ww, zw, m);
	Nw(Uw, {
		tld: !0,
		ascii: !0
	}, t), Nw(Ww, {
		utld: !0,
		alpha: !0
	}, t), tE(n, "file", Gw, Rw, p), tE(n, "mailto", Gw, Rw, p), tE(n, "http", Kw, Rw, p), tE(n, "https", Kw, Rw, p), tE(n, "ftp", Kw, Rw, p), tE(n, "ftps", Kw, Rw, p), Nw(Gw, {
		scheme: !0,
		ascii: !0
	}, t), Nw(Kw, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [kw]: !0 } : { [Aw]: !0 };
		r.indexOf("-") >= 0 ? i[Dw] = !0 : BT.test(r) ? UT.test(r) ? i[Tw] = !0 : i[Cw] = !0 : i[Sw] = !0, Lw(n, r, r, i);
	}
	return Lw(n, "localhost", Hw, { ascii: !0 }), n.jd = new Fw(RT), {
		start: n,
		tokens: Object.assign({ groups: t }, zT)
	};
}
function $T(e, t) {
	let n = eE(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
	for (; o < r;) {
		let s = e, c = null, l = 0, u = null, d = -1, f = -1;
		for (; o < r && (c = s.go(n[o]));) s = c, s.accepts() ? (d = 0, f = 0, u = s) : d >= 0 && (d += n[o].length, f++), l += n[o].length, a += n[o].length, o++;
		a -= d, o -= f, l -= d, i.push({
			t: u.t,
			v: t.slice(a - l, a),
			s: a - l,
			e: a
		});
	}
	return i;
}
function eE(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function tE(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new Fw(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new Fw(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function nE(e) {
	let t = [], n = [], r = 0;
	for (; r < e.length;) {
		let i = 0;
		for (; "0123456789".indexOf(e[r + i]) >= 0;) i++;
		if (i > 0) {
			t.push(n.join(""));
			for (let t = parseInt(e.substring(r, r + i), 10); t > 0; t--) n.pop();
			r += i;
		} else n.push(e[r]), r++;
	}
	return t;
}
var rE = {
	defaultProtocol: "http",
	events: null,
	format: aE,
	formatHref: aE,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	render: null
};
function iE(e, t = null) {
	let n = Object.assign({}, rE);
	e && (n = Object.assign(n, e instanceof iE ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
iE.prototype = {
	o: rE,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : rE[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
	},
	getObj(e, t, n) {
		let r = this.o[e];
		return typeof r == "function" && t != null && (r = r(t, n.t, n)), r;
	},
	render(e) {
		let t = e.render(this);
		return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
	}
};
function aE(e) {
	return e;
}
function oE(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
oE.prototype = {
	isLink: !1,
	toString() {
		return this.v;
	},
	toHref(e) {
		return this.toString();
	},
	toFormattedString(e) {
		let t = this.toString(), n = e.get("truncate", t, this), r = e.get("format", t, this);
		return n && r.length > n ? r.substring(0, n) + "…" : r;
	},
	toFormattedHref(e) {
		return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
	},
	startIndex() {
		return this.tk[0].s;
	},
	endIndex() {
		return this.tk[this.tk.length - 1].e;
	},
	toObject(e = rE.defaultProtocol) {
		return {
			type: this.t,
			value: this.toString(),
			isLink: this.isLink,
			href: this.toHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	toFormattedObject(e) {
		return {
			type: this.t,
			value: this.toFormattedString(e),
			isLink: this.isLink,
			href: this.toFormattedHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	validate(e) {
		return e.get("validate", this.toString(), this);
	},
	render(e) {
		let t = this, n = this.toHref(e.get("defaultProtocol")), r = e.get("formatHref", n, this), i = e.get("tagName", n, t), a = this.toFormattedString(e), o = {}, s = e.get("className", n, t), c = e.get("target", n, t), l = e.get("rel", n, t), u = e.getObj("attributes", n, t), d = e.getObj("events", n, t);
		return o.href = r, s && (o.class = s), c && (o.target = c), l && (o.rel = l), u && Object.assign(o, u), {
			tagName: i,
			attributes: o,
			content: a,
			eventListeners: d
		};
	}
};
function sE(e, t) {
	class n extends oE {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var cE = sE("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), lE = sE("text"), uE = sE("nl"), dE = sE("url", {
	isLink: !0,
	toHref(e = rE.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== Hw && e[1].t === yT;
	}
}), fE = (e) => new Fw(e);
function pE({ groups: e }) {
	let t = e.domain.concat([
		fT,
		mT,
		hT,
		gT,
		_T,
		vT,
		xT,
		CT,
		TT,
		qw,
		ET,
		DT,
		OT,
		kT,
		PT,
		RT,
		FT,
		IT
	]), n = [
		pT,
		yT,
		bT,
		ST,
		wT,
		ET,
		AT,
		jT,
		NT,
		nT,
		rT,
		Xw,
		Zw,
		$w,
		Qw,
		eT,
		tT,
		iT,
		aT,
		oT,
		sT,
		cT,
		lT,
		uT,
		dT
	], r = [
		fT,
		pT,
		mT,
		gT,
		_T,
		vT,
		xT,
		CT,
		TT,
		Xw,
		Zw,
		ET,
		DT,
		OT,
		kT,
		AT,
		PT,
		RT,
		FT,
		IT
	], i = fE(), a = $(i, FT);
	Q(a, r, a), Q(a, e.domain, a);
	let o = fE(), s = fE(), c = fE();
	Q(i, e.domain, o), Q(i, e.scheme, s), Q(i, e.slashscheme, c), Q(o, r, a), Q(o, e.domain, o);
	let l = $(o, hT);
	$(a, hT, l), $(s, hT, l), $(c, hT, l);
	let u = $(a, ST);
	Q(u, r, a), Q(u, e.domain, a);
	let d = fE();
	Q(l, e.domain, d), Q(d, e.domain, d);
	let f = $(d, ST);
	Q(f, e.domain, d);
	let p = fE(cE);
	Q(f, e.tld, p), Q(f, e.utld, p), $(l, Hw, p);
	let m = $(d, TT);
	$(m, TT, m), Q(m, e.domain, d), Q(p, e.domain, d), $(p, ST, f), $(p, TT, m);
	let h = $(o, TT), g = $(o, ST);
	$(h, TT, h), Q(h, e.domain, o), Q(g, r, a), Q(g, e.domain, o);
	let _ = fE(dE);
	Q(g, e.tld, _), Q(g, e.utld, _), Q(_, e.domain, o), Q(_, r, a), $(_, ST, g), $(_, TT, h), $(_, hT, l);
	let v = $(_, yT), y = fE(dE);
	Q(v, e.numeric, y);
	let b = fE(dE), x = fE();
	Q(b, t, b), Q(b, n, x), Q(x, t, b), Q(x, n, x), $(_, PT, b), $(y, PT, b);
	let S = $(s, yT), C = $($($(c, yT), PT), PT);
	Q(s, e.domain, o), $(s, ST, g), $(s, TT, h), Q(c, e.domain, o), $(c, ST, g), $(c, TT, h), Q(S, e.domain, b), $(S, PT, b), $(S, AT, b), Q(C, e.domain, b), Q(C, t, b), $(C, PT, b);
	let w = [
		[Xw, Zw],
		[Qw, $w],
		[eT, tT],
		[nT, rT],
		[iT, aT],
		[oT, sT],
		[cT, lT],
		[uT, dT]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = $(b, r);
		$(x, r, a);
		let o = fE(dE);
		Q(a, t, o);
		let s = fE();
		Q(a, n, s), $(a, i, b), Q(o, t, o), Q(o, n, s), Q(s, t, o), Q(s, n, s), $(o, i, b), $(s, i, b);
	}
	return $(i, Hw, _), $(i, Yw, uE), {
		start: i,
		tokens: zT
	};
}
function mE(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(hE(lE, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(hE(e, t, r));
		}
	}
	return o.length > 0 && a.push(hE(lE, t, o)), a;
}
function hE(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var gE = typeof console < "u" && console && console.warn || (() => {}), _E = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", vE = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function yE() {
	return Fw.groups = {}, vE.scanner = null, vE.parser = null, vE.tokenQueue = [], vE.pluginQueue = [], vE.customSchemes = [], vE.initialized = !1, vE;
}
function bE(e, t = !1) {
	if (vE.initialized && gE(`linkifyjs: already initialized - will not register custom scheme "${e}" ${_E}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	vE.customSchemes.push([e, t]);
}
function xE() {
	vE.scanner = QT(vE.customSchemes);
	for (let e = 0; e < vE.tokenQueue.length; e++) vE.tokenQueue[e][1]({ scanner: vE.scanner });
	vE.parser = pE(vE.scanner.tokens);
	for (let e = 0; e < vE.pluginQueue.length; e++) vE.pluginQueue[e][1]({
		scanner: vE.scanner,
		parser: vE.parser
	});
	return vE.initialized = !0, vE;
}
function SE(e) {
	return vE.initialized || xE(), mE(vE.parser.start, e, $T(vE.scanner.start, e));
}
SE.scan = $T;
function CE(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new iE(n), i = SE(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var wE = "[\0- \xA0 ᠎ -\u2029 　]", TE = new RegExp(wE), EE = RegExp(`${wE}$`), DE = new RegExp(wE, "g");
function OE(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function kE(e) {
	return new K({
		key: new uc("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r;
			if (Fh(oh(n.doc, [...t])).forEach(({ newRange: t }) => {
				let n = sh(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!EE.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(TE).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = SE(n).map((t) => t.toObject(e.defaultProtocol));
					if (!OE(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						Ih(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function AE(e) {
	return new K({
		key: new uc("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = null;
			if (r.target instanceof HTMLAnchorElement) i = r.target;
			else {
				let t = r.target;
				if (!t) return !1;
				let n = e.editor.view.dom;
				i = t.closest("a"), i && !n.contains(i) && (i = null);
			}
			if (!i) return !1;
			let a = !1;
			if (e.enableClickSelection && (a = e.editor.commands.extendMarkRange(e.type.name)), e.openOnClick) {
				let n = Mh(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var jE = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, ME = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function NE(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function PE(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && NE(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function FE(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || NE(e, t.index ?? 0) || PE(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function IE(e) {
	let [t, n, r, , i, a, o] = e, s = i ?? a ?? o;
	return {
		index: e.index ?? 0,
		text: t,
		replaceWith: n,
		data: {
			href: r,
			title: s || null,
			markdown: !0
		}
	};
}
function LE(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function RE(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function zE(e) {
	let t = __({
		find: (t) => {
			let n = jE.exec(t);
			return !n || !FE(t, n, e.isAllowedHref) ? null : IE(n);
		},
		type: e.type,
		getAttributes: RE
	});
	return new Ug({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function BE(e) {
	let t = x_({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(ME)) FE(t, r, e.isAllowedHref) && n.push(IE(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => LE(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: RE
	});
	return new Yg({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function VE(e) {
	return new K({
		key: new uc("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = CE(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function HE(e, t) {
	let n = [
		"http",
		"https",
		"ftp",
		"ftps",
		"mailto",
		"tel",
		"callto",
		"sms",
		"cid",
		"xmpp"
	];
	return t && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.scheme;
		t && n.push(t);
	}), !e || e.replace(DE, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var UE = Jg.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				bE(e);
				return;
			}
			bE(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		yE();
	},
	inclusive() {
		return this.options.autolink;
	},
	addOptions() {
		return {
			openOnClick: !0,
			enableClickSelection: !1,
			linkOnPaste: !0,
			markdownLinks: !1,
			autolink: !0,
			protocols: [],
			defaultProtocol: "http",
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				class: null
			},
			isAllowedUri: (e, t) => !!HE(e, t.protocols),
			validate: (e) => !!e,
			shouldAutoLink: (e) => {
				let t = /^[a-z][a-z0-9+.-]*:\/\//i.test(e), n = /^[a-z][a-z0-9+.-]*:/i.test(e);
				if (t || n && !e.includes("@")) return !0;
				let r = (e.includes("@") ? e.split("@").pop() : e).split(/[/?#:]/)[0];
				return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(r) || !/\./.test(r));
			}
		};
	},
	addAttributes() {
		return {
			href: {
				default: null,
				parseHTML(e) {
					return e.getAttribute("href");
				}
			},
			target: { default: this.options.HTMLAttributes.target ?? null },
			rel: { default: this.options.HTMLAttributes.rel ?? null },
			class: { default: this.options.HTMLAttributes.class ?? null },
			title: { default: null }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (e) => {
				let t = e.getAttribute("href");
				return !t || !this.options.isAllowedUri(t, {
					defaultValidate: (e) => !!HE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!HE(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			vh(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			vh(this.options.HTMLAttributes, {
				...e,
				href: ""
			}),
			0
		];
	},
	markdownTokenName: "link",
	parseMarkdown: (e, t) => t.applyMark("link", t.parseInline(e.tokens || []), {
		href: e.href,
		title: e.title || null
	}),
	renderMarkdown: (e, t) => {
		let n = e.attrs?.href ?? "", r = e.attrs?.title ?? "", i = t.renderChildren(e);
		return r ? `[${i}](${n} "${r}")` : `[${i}](${n})`;
	},
	addCommands() {
		return {
			setLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!HE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!HE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [zE({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!HE(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			})
		})] : [];
	},
	addPasteRules() {
		let e = (e) => {
			let t = [];
			if (e) {
				let { protocols: n, defaultProtocol: r } = this.options;
				CE(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!HE(e, n),
					protocols: n,
					defaultProtocol: r
				})).forEach((e) => {
					this.options.shouldAutoLink(e.value) && t.push({
						text: e.value,
						data: { href: e.href },
						index: e.start
					});
				});
			}
			return t;
		};
		return this.options.markdownLinks ? [BE({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!HE(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [x_({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(kE({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!HE(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(AE({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(VE({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), WE = UE, GE = Object.defineProperty, KE = (e, t) => {
	for (var n in t) GE(e, n, {
		get: t[n],
		enumerable: !0
	});
}, qE = "listItem", JE = "textStyle", YE = /^\s*([-+*])\s$/, XE = X.create({
	name: "bulletList",
	addOptions() {
		return {
			itemTypeName: "listItem",
			HTMLAttributes: {},
			keepMarks: !1,
			keepAttributes: !1
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	parseHTML() {
		return [{ tag: "ul" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ul",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => e.type !== "list" || e.ordered ? [] : {
		type: "bulletList",
		content: e.items ? t.parseChildren(e.items) : []
	},
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(qE, this.editor.getAttributes(JE)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = b_({
			find: YE,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = b_({
			find: YE,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(JE),
			editor: this.editor
		})), [e];
	}
}), ZE = (e, t, n) => {
	let { selection: r } = e;
	if (!r.empty) return null;
	let { $from: i } = r;
	if (!i.parent.isTextblock || i.parentOffset !== i.parent.content.size) return null;
	let a = -1;
	for (let e = i.depth; e > 0; --e) if (i.node(e).type.name === t) {
		a = e;
		break;
	}
	if (a < 0) return null;
	let o = i.node(a), s = i.index(a);
	if (s + 1 >= o.childCount) return null;
	let c = o.child(s + 1);
	if (!n.includes(c.type.name)) return null;
	let l = e.schema.nodes[t], u = !1;
	if (c.forEach((e) => {
		e.type === l && e.childCount > 1 && (u = !0);
	}), !u) return null;
	let d = e.doc.resolve(i.after()).nodeAfter;
	if (!d || !n.includes(d.type.name)) return null;
	let f = [];
	return d.forEach((e) => {
		f.push(e);
	}), f.length === 0 ? null : {
		listItemDepth: a,
		nestedList: d,
		nestedListPos: i.after(),
		insertPos: i.after(a),
		items: f
	};
}, QE = (e, t, n, r) => {
	let i = ZE(e, n, r);
	if (!i) return !1;
	let { selection: a } = e, { nestedList: o, nestedListPos: s, insertPos: c, items: l } = i, u = e.tr;
	u.delete(s, s + o.nodeSize);
	let d = u.mapping.map(c);
	return u.insert(d, B.from(l)), u.setSelection(a.map(u.doc, u.mapping)), t && t(u), !0;
}, $E = (e, t, n) => QE(e.state, e.view.dispatch, t, n), eD = (e, t) => Y.create({
	name: `${e}BranchingDeleteKeymap`,
	priority: 101,
	addKeyboardShortcuts() {
		let n = () => $E(this.editor, e, t);
		return {
			Delete: n,
			"Mod-Delete": n
		};
	}
}), tD = [
	[1e3, "m"],
	[900, "cm"],
	[500, "d"],
	[400, "cd"],
	[100, "c"],
	[90, "xc"],
	[50, "l"],
	[40, "xl"],
	[10, "x"],
	[9, "ix"],
	[5, "v"],
	[4, "iv"],
	[1, "i"]
], nD = "abcdefghijklmnopqrstuvwxyz", rD = String.raw`\d+|[ivxlcdmIVXLCDM]+|${"[a-zA-Z]{1,2}"}`;
function iD(e) {
	let t = e, n = "";
	for (let [e, r] of tD) for (; t >= e;) n += r, t -= e;
	return n;
}
function aD(e) {
	return iD(e).toUpperCase();
}
function oD(e) {
	let t = e.toLowerCase(), n = 0, r = 0;
	for (; n < t.length;) {
		let e = !1;
		for (let [i, a] of tD) if (t.startsWith(a, n)) {
			r += i, n += a.length, e = !0;
			break;
		}
		if (!e) return 0;
	}
	return r;
}
function sD(e) {
	if (!/^[ivxlcdmIVXLCDM]+$/.test(e)) return !1;
	let t = oD(e);
	return t <= 0 ? !1 : (e === e.toLowerCase() ? iD(t) : aD(t)) === e;
}
function cD(e) {
	let t = e.toLowerCase();
	if (t.length === 1) return t.charCodeAt(0) - 97 + 1;
	if (t.length === 2) {
		let e = t.charCodeAt(0) - 97, n = t.charCodeAt(1) - 97;
		return (e + 1) * 26 + n + 1;
	}
	return 0;
}
function lD(e) {
	if (e <= 26) return nD[e - 1];
	let t = Math.floor((e - 1) / 26) - 1, n = (e - 1) % 26;
	return t < 0 ? nD[n] : nD[t] + nD[n];
}
function uD(e) {
	if (!(!e || /^\d+$/.test(e))) {
		if (sD(e)) return e === e.toLowerCase() ? "i" : "I";
		if (/^[a-z]{1,2}$/.test(e)) return "a";
		if (/^[A-Z]{1,2}$/.test(e)) return "A";
	}
}
function dD(e) {
	if (/^\d+$/.test(e)) return parseInt(e, 10);
	let t = uD(e);
	if (t === "i" || t === "I") return oD(e);
	if (t === "a" || t === "A") {
		let t = cD(e);
		return t > 0 ? t : 1;
	}
	let n = parseInt(e, 10);
	return Number.isNaN(n) ? 1 : n;
}
function fD(e, t) {
	if (e === "numeric") return String(t);
	switch (e) {
		case "a": return lD(t);
		case "A": return lD(t).toUpperCase();
		case "i": return iD(t);
		case "I": return aD(t);
		default: return String(t);
	}
}
function pD(e) {
	if (e.length === 0) return !1;
	let t = uD(e[0]) ?? "numeric", n = dD(e[0]);
	if (n < 1) return !1;
	for (let r = 0; r < e.length; r++) {
		let i = fD(t, n + r);
		if (e[r] !== i) return !1;
	}
	return !0;
}
function mD(e) {
	return {
		type: uD(e),
		start: dD(e)
	};
}
function hD(e) {
	let { type: t, start: n } = mD(e), r = {};
	return t && (r.type = t), n !== 1 && (r.start = n), r;
}
function gD(e, t, n = ". ") {
	let r = t + 1;
	if (!e || e === "1") return `${r}${n}`;
	switch (e) {
		case "a": return `${lD(r)}${n}`;
		case "A": return `${lD(r).toUpperCase()}${n}`;
		case "i": return `${iD(r)}${n}`;
		case "I": return `${aD(r)}${n}`;
		default: return `${r}${n}`;
	}
}
function _D(e) {
	let t = e.tokens?.[0];
	return !!(e.text && e.tokens?.length === 1 && t?.type === "list" && t.ordered && t.raw === e.text);
}
function vD(e, t) {
	return t.tokenizeInline ? t.parseInline(t.tokenizeInline(e)) : t.parseInline([{
		type: "text",
		raw: e,
		text: e
	}]);
}
var yD = X.create({
	name: "listItem",
	addOptions() {
		return {
			HTMLAttributes: {},
			bulletListTypeName: "bulletList",
			orderedListTypeName: "orderedList"
		};
	},
	content: "paragraph block*",
	defining: !0,
	parseHTML() {
		return [{ tag: "li" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"li",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list_item",
	parseMarkdown: (e, t) => {
		if (e.type !== "list_item") return [];
		let n = t.parseBlockChildren ?? t.parseChildren, r = [];
		if (e.tokens && e.tokens.length > 0) {
			if (_D(e)) return {
				type: "listItem",
				content: [{
					type: "paragraph",
					content: vD(e.text || "", t)
				}]
			};
			if (e.tokens.some((e) => e.type === "paragraph")) r = n(e.tokens);
			else {
				let i = e.tokens[0];
				if (i && i.type === "text" && i.tokens && i.tokens.length > 0) {
					if (r = [{
						type: "paragraph",
						content: t.parseInline(i.tokens)
					}], e.tokens.length > 1) {
						let t = n(e.tokens.slice(1));
						r.push(...t);
					}
				} else r = n(e.tokens);
			}
		}
		return r.length === 0 && (r = [{
			type: "paragraph",
			content: []
		}]), {
			type: "listItem",
			content: r
		};
	},
	renderMarkdown: (e, t, n) => Bg(e, t, (e) => {
		if (e.parentType === "bulletList") return "- ";
		if (e.parentType === "orderedList") {
			let t = e.meta?.parentAttrs?.start || 1;
			return gD(e.meta?.parentAttrs?.type, t - 1 + (e.index || 0), ". ");
		}
		return "- ";
	}, n),
	addExtensions() {
		return [eD(this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName])];
	},
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.splitListItem(this.name),
			Tab: () => this.editor.commands.sinkListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
	}
});
KE({}, {
	findListItemPos: () => bD,
	getNextListDepth: () => xD,
	handleBackspace: () => CD,
	handleDelete: () => ED,
	hasListBefore: () => SD,
	hasListItemAfter: () => DD,
	hasListItemBefore: () => OD,
	listItemHasSubList: () => kD,
	nextListIsDeeper: () => wD,
	nextListIsHigher: () => TD
});
var bD = (e, t) => {
	let { $from: n } = t.selection, r = Zp(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, xD = (e, t) => {
	let n = bD(e, t);
	if (!n) return !1;
	let [, r] = Lh(t, e, n.$pos.pos + 4);
	return r;
}, SD = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, CD = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!Hm(e.state, t) && SD(e.state, t, n)) {
		let { $anchor: n } = e.state.selection, r = e.state.doc.resolve(n.before() - 1), i = [];
		r.node().descendants((e, n) => {
			e.type.name === t && i.push({
				node: e,
				pos: n
			});
		});
		let a = i.at(-1);
		if (!a) return !1;
		let o = e.state.doc.resolve(r.start() + a.pos + 1);
		return e.chain().cut({
			from: n.start() - 1,
			to: n.end() + 1
		}, o.end()).joinForward().run();
	}
	return !Hm(e.state, t) || !Wh(e.state) ? !1 : e.chain().liftListItem(t).run();
}, wD = (e, t) => {
	let n = xD(e, t), r = bD(e, t);
	return !r || !n ? !1 : n > r.depth;
}, TD = (e, t) => {
	let n = xD(e, t), r = bD(e, t);
	return !r || !n ? !1 : n < r.depth;
}, ED = (e, t) => {
	if (!Hm(e.state, t) || !Uh(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : wD(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : TD(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, DD = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - n.parentOffset - 2);
	return r.index() !== r.parent.childCount - 1 && r.nodeAfter?.type.name === e;
}, OD = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - 2);
	return r.index() !== 0 && r.nodeBefore?.type.name === e;
}, kD = (e, t, n) => {
	if (!n) return !1;
	let r = Zp(e, t.schema), i = !1;
	return n.descendants((e) => {
		e.type === r && (i = !0);
	}), i;
}, AD = Y.create({
	name: "listKeymap",
	addOptions() {
		return { listTypes: [{
			itemName: "listItem",
			wrapperNames: ["bulletList", "orderedList"]
		}, {
			itemName: "taskItem",
			wrapperNames: ["taskList"]
		}] };
	},
	addKeyboardShortcuts() {
		return {
			Delete: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && ED(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && ED(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && CD(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && CD(e, n, r) && (t = !0);
				}), t;
			}
		};
	}
}), jD = RegExp(`^(\\s*)(${rD})([.)])\\s+(.*)$`), MD = /^\s/, ND = {
	heading: /^#{1,6}(?:\s|$)/,
	bulletItem: /^[-+*]\s+/,
	codeFence: /^(?:```|~~~)/,
	thematicBreak: /^(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/
};
function PD(e) {
	return jD.test(e.trimStart());
}
function FD(e) {
	let t = e.trimStart();
	return ND.bulletItem.test(t) || PD(t) || ND.heading.test(t) || ND.thematicBreak.test(t) && !t.startsWith("-") || /^>\s?/.test(t) || ND.codeFence.test(t);
}
function ID(e) {
	return Object.values(ND).some((t) => t.test(e));
}
function LD(e) {
	let t = [], n = [], r = !1;
	return e.forEach((e) => {
		if (r) {
			n.push(e);
			return;
		}
		if (e.trim() === "") {
			r = !0, n.push(e);
			return;
		}
		if (t.length > 0 && FD(e)) {
			r = !0, n.push(e);
			return;
		}
		t.push(e);
	}), {
		paragraphLines: t,
		blockLines: n
	};
}
function RD(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n], a = i.match(jD);
		if (!a) break;
		let [, o, s, c, l] = a, u = o.length, d = parseInt(s, 10), f = isNaN(d) ? uD(s) : void 0, p = isNaN(d) ? dD(s) : d, m = [l], h = n + 1, g = [i], _ = !1;
		for (; h < e.length;) {
			let t = e[h];
			if (t.match(jD)) break;
			if (t.trim() === "") g.push(t), m.push(""), _ = !0, h += 1;
			else if (t.match(MD)) {
				let e = t.length - t.trimStart().length, n = u + s.length + 1;
				g.push(t), m.push(t.slice(Math.min(e, n))), h += 1;
			} else {
				if (_ || ID(t)) break;
				g.push(t), m.push(t), h += 1;
			}
		}
		t.push({
			indent: u,
			number: p,
			type: f,
			content: m.join("\n").trim(),
			contentLines: m,
			raw: g.join("\n")
		}), r = h, n = h;
	}
	return [t, r];
}
var zD = RegExp(`^(${rD})([.)])\\s+(.+)$`);
function BD(e) {
	let t = e.split("\n").filter((e) => e.trim().length > 0);
	if (t.length === 0) return null;
	let n = [];
	for (let e of t) {
		let t = e.trim().match(zD);
		if (!t) return null;
		n.push({
			marker: t[1],
			content: t[3]
		});
	}
	return pD(n.map((e) => e.marker)) ? {
		type: "orderedList",
		attrs: hD(n[0].marker),
		content: n.map((e) => ({
			type: "listItem",
			content: [{
				type: "paragraph",
				content: [{
					type: "text",
					text: e.content
				}]
			}]
		}))
	} : null;
}
function VD(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a.indent === t) {
			let { paragraphLines: o, blockLines: s } = LD(a.contentLines), c = o.join("\n").trim(), l = [];
			c && l.push({
				type: "paragraph",
				raw: c,
				tokens: n.inlineTokens(c)
			});
			let u = s.join("\n").trim();
			if (u) {
				let e = n.blockTokens(u);
				l.push(...e);
			}
			let d = i + 1, f = [];
			for (; d < e.length && e[d].indent > t;) f.push(e[d]), d += 1;
			if (f.length > 0) {
				let e = VD(f, Math.min(...f.map((e) => e.indent)), n);
				l.push({
					type: "list",
					ordered: !0,
					start: f[0].number,
					typeMarker: f[0].type,
					items: e,
					raw: f.map((e) => e.raw).join("\n")
				});
			}
			r.push({
				type: "list_item",
				raw: a.raw,
				tokens: l
			}), i = d;
		} else i += 1;
	}
	return r;
}
function HD(e, t) {
	return e.map((e) => {
		if (e.type !== "list_item") return t.parseChildren([e])[0];
		let n = [];
		return e.tokens && e.tokens.length > 0 && e.tokens.forEach((e) => {
			if (e.type === "paragraph" || e.type === "list" || e.type === "blockquote" || e.type === "code") n.push(...t.parseChildren([e]));
			else if (e.type === "text" && e.tokens) {
				let r = t.parseChildren([e]);
				n.push({
					type: "paragraph",
					content: r
				});
			} else {
				let r = t.parseChildren([e]);
				r.length > 0 && n.push(...r);
			}
		}), {
			type: "listItem",
			content: n
		};
	});
}
var UD = "listItem", WD = "textStyle", GD = /^(\d+)\.\s$/;
function KD(e) {
	let t = e.match(/list-style-type\s*:\s*([^;]+)/i);
	if (!t) return null;
	switch (t[1].trim().toLowerCase()) {
		case "upper-roman": return "I";
		case "lower-roman": return "i";
		case "upper-alpha":
		case "upper-latin": return "A";
		case "lower-alpha":
		case "lower-latin": return "a";
		default: return null;
	}
}
var qD = X.create({
	name: "orderedList",
	addOptions() {
		return {
			itemTypeName: "listItem",
			HTMLAttributes: {},
			keepMarks: !1,
			keepAttributes: !1
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	addAttributes() {
		return {
			start: {
				default: 1,
				parseHTML: (e) => e.hasAttribute("start") ? parseInt(e.getAttribute("start") || "", 10) : 1
			},
			type: {
				default: null,
				parseHTML: (e) => {
					let t = e.getAttribute("type");
					if (t) return t;
					let n = e.getAttribute("style");
					if (n) {
						let e = KD(n);
						if (e) return e;
					}
					let r = e.querySelector("li");
					if (r) {
						let e = r.getAttribute("style");
						if (e) {
							let t = KD(e);
							if (t) return t;
						}
					}
					return null;
				}
			}
		};
	},
	parseHTML() {
		return [{ tag: "ol" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		let { start: t, type: n, ...r } = e, i = vh(this.options.HTMLAttributes, r);
		return t !== 1 && (i.start = t), n && n !== "1" && (i.type = n), [
			"ol",
			i,
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => {
		if (e.type !== "list" || !e.ordered) return [];
		let n = e.start || 1, r = e.typeMarker, i = e.items ? HD(e.items, t) : [], a = {};
		return n !== 1 && (a.start = n), r && (a.type = r), Object.keys(a).length > 0 ? {
			type: "orderedList",
			attrs: a,
			content: i
		} : {
			type: "orderedList",
			content: i
		};
	},
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownTokenizer: {
		name: "orderedList",
		level: "block",
		start: () => -1,
		tokenize: (e, t, n) => {
			let r = e.split("\n"), [i, a] = RD(r);
			if (i.length === 0) return;
			let o = VD(i, i[0].indent, n);
			if (o.length !== 0) return {
				type: "list",
				ordered: !0,
				start: i[0]?.number || 1,
				typeMarker: i[0]?.type,
				items: o,
				raw: r.slice(0, a).join("\n")
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(UD, this.editor.getAttributes(WD)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addProseMirrorPlugins() {
		return [new K({ props: { handlePaste: (e, t) => {
			if ((t.clipboardData?.getData("text/html"))?.trim()) return !1;
			let n = t.clipboardData?.getData("text/plain");
			if (!n) return !1;
			let r = BD(n);
			if (!r) return !1;
			try {
				let t = e.state.schema.nodeFromJSON(r), n = e.state.tr.replaceSelectionWith(t);
				return e.dispatch(n), !0;
			} catch {
				return !1;
			}
		} } })];
	},
	addInputRules() {
		let e = (e, t) => (!t.attrs.type || t.attrs.type === "1") && t.childCount + t.attrs.start === +e[1], t = b_({
			find: GD,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: e
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (t = b_({
			find: GD,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(WD)
			}),
			joinPredicate: e,
			editor: this.editor
		})), [t];
	}
}), JD = /^\s*(\[([( |x])?\])\s$/, YD = X.create({
	name: "taskItem",
	addOptions() {
		return {
			nested: !1,
			HTMLAttributes: {},
			taskListTypeName: "taskList",
			a11y: void 0
		};
	},
	content() {
		return this.options.nested ? "paragraph block*" : "paragraph+";
	},
	defining: !0,
	addAttributes() {
		return { checked: {
			default: !1,
			keepOnSplit: !1,
			parseHTML: (e) => {
				let t = e.getAttribute("data-checked");
				return t === "" || t === "true";
			},
			renderHTML: (e) => ({ "data-checked": e.checked })
		} };
	},
	parseHTML() {
		return [{
			tag: `li[data-type="${this.name}"]`,
			priority: 51
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"li",
			vh(this.options.HTMLAttributes, t, { "data-type": this.name }),
			[
				"label",
				["input", {
					type: "checkbox",
					checked: e.attrs.checked ? "checked" : null
				}],
				["span"]
			],
			["div", 0]
		];
	},
	parseMarkdown: (e, t) => {
		let n = [];
		if (e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0) {
			let r = t.parseChildren(e.nestedTokens);
			n.push(...r);
		}
		return t.createNode("taskItem", { checked: e.checked || !1 }, n);
	},
	renderMarkdown: (e, t) => Bg(e, t, `- [${e.attrs?.checked ? "x" : " "}] `),
	addExtensions() {
		return this.options.nested ? [eD(this.name, [this.options.taskListTypeName])] : [];
	},
	addKeyboardShortcuts() {
		let e = {
			Enter: () => this.editor.commands.splitListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
		return this.options.nested ? {
			...e,
			Tab: () => this.editor.commands.sinkListItem(this.name)
		} : e;
	},
	addNodeView() {
		return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
			let i = document.createElement("li"), a = document.createElement("label"), o = document.createElement("span"), s = document.createElement("input"), c = document.createElement("div"), l = (e) => {
				var t;
				s.ariaLabel = ((t = this.options.a11y)?.checkboxLabel)?.call(t, e, s.checked) || `Task item checkbox for ${e.textContent || "empty task item"}`;
			};
			l(e), a.contentEditable = "false", s.type = "checkbox", s.addEventListener("mousedown", (e) => e.preventDefault()), s.addEventListener("change", (t) => {
				if (!r.isEditable && !this.options.onReadOnlyChecked) {
					s.checked = !s.checked;
					return;
				}
				let { checked: i } = t.target;
				r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: e }) => {
					let t = n();
					if (typeof t != "number") return !1;
					let r = e.doc.nodeAt(t);
					return e.setNodeMarkup(t, void 0, {
						...r?.attrs,
						checked: i
					}), !0;
				}).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(e, i) || (s.checked = !s.checked));
			}), Object.entries(this.options.HTMLAttributes).forEach(([e, t]) => {
				i.setAttribute(e, t);
			}), i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, a.append(s, o), i.append(a, c), Object.entries(t).forEach(([e, t]) => {
				i.setAttribute(e, t);
			});
			let u = new Set(Object.keys(t));
			return {
				dom: i,
				contentDOM: c,
				update: (e) => {
					if (e.type !== this.type) return !1;
					i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, l(e);
					let t = r.extensionManager.attributes, n = yh(e, t), a = new Set(Object.keys(n)), o = this.options.HTMLAttributes;
					return u.forEach((e) => {
						a.has(e) || (e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e));
					}), Object.entries(n).forEach(([e, t]) => {
						t == null ? e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e) : i.setAttribute(e, t);
					}), u = a, !0;
				}
			};
		};
	},
	addInputRules() {
		return [b_({
			find: JD,
			type: this.type,
			getAttributes: (e) => ({ checked: e[e.length - 1] === "x" })
		})];
	}
}), XD = X.create({
	name: "taskList",
	addOptions() {
		return {
			itemTypeName: "taskItem",
			HTMLAttributes: {}
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	parseHTML() {
		return [{
			tag: `ul[data-type="${this.name}"]`,
			priority: 51
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ul",
			vh(this.options.HTMLAttributes, e, { "data-type": this.name }),
			0
		];
	},
	parseMarkdown: (e, t) => t.createNode("taskList", {}, t.parseChildren(e.items || [])),
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownTokenizer: {
		name: "taskList",
		level: "block",
		start(e) {
			let t = e.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)?.index;
			return t === void 0 ? -1 : t;
		},
		tokenize(e, t, n) {
			let r = (e) => {
				let t = zg(e, {
					itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
					extractItemData: (e) => ({
						indentLevel: e[1].length,
						mainContent: e[4],
						checked: e[3].toLowerCase() === "x"
					}),
					createToken: (e, t) => ({
						type: "taskItem",
						raw: "",
						mainContent: e.mainContent,
						indentLevel: e.indentLevel,
						checked: e.checked,
						text: e.mainContent,
						tokens: n.inlineTokens(e.mainContent),
						nestedTokens: t
					}),
					customNestedParser: r
				}, n);
				if (t) {
					let r = {
						type: "taskList",
						raw: t.raw,
						items: t.items
					}, i = e.slice(t.raw.length);
					return i.trim() ? [r, ...n.blockTokens(i)] : [r];
				}
				return n.blockTokens(e);
			}, i = zg(e, {
				itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
				extractItemData: (e) => ({
					indentLevel: e[1].length,
					mainContent: e[4],
					checked: e[3].toLowerCase() === "x"
				}),
				createToken: (e, t) => ({
					type: "taskItem",
					raw: "",
					mainContent: e.mainContent,
					indentLevel: e.indentLevel,
					checked: e.checked,
					text: e.mainContent,
					tokens: n.inlineTokens(e.mainContent),
					nestedTokens: t
				}),
				customNestedParser: r
			}, n);
			if (i) return {
				type: "taskList",
				raw: i.raw,
				items: i.items
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleTaskList: () => ({ commands: e }) => e.toggleList(this.name, this.options.itemTypeName) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-9": () => this.editor.commands.toggleTaskList() };
	}
});
Y.create({
	name: "listKit",
	addExtensions() {
		let e = [];
		return this.options.bulletList !== !1 && e.push(XE.configure(this.options.bulletList)), this.options.listItem !== !1 && e.push(yD.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(AD.configure(this.options.listKeymap)), this.options.orderedList !== !1 && e.push(qD.configure(this.options.orderedList)), this.options.taskItem !== !1 && e.push(YD.configure(this.options.taskItem)), this.options.taskList !== !1 && e.push(XD.configure(this.options.taskList)), e;
	}
});
//#endregion
//#region node_modules/@tiptap/extension-paragraph/dist/index.js
var ZD = "&nbsp;", QD = "\xA0", $D = X.create({
	name: "paragraph",
	priority: 1e3,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	group: "block",
	content: "inline*",
	parseHTML() {
		return [{ tag: "p" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"p",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown: (e, t) => {
		let n = e.tokens || [];
		if (n.length === 1 && n[0].type === "image") return t.parseChildren([n[0]]);
		let r = t.parseInline(n);
		return n.length === 1 && n[0].type === "text" && (n[0].raw === ZD || n[0].text === ZD || n[0].raw === QD || n[0].text === QD) && r.length === 1 && r[0].type === "text" && (r[0].text === ZD || r[0].text === QD) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
	},
	renderMarkdown: (e, t, n) => {
		if (!e) return "";
		let r = Array.isArray(e.content) ? e.content : [];
		if (r.length === 0) {
			let e = Array.isArray(n?.previousNode?.content) ? n.previousNode.content : [];
			return n?.previousNode?.type === "paragraph" && e.length === 0 ? ZD : "";
		}
		return t.renderChildren(r);
	},
	addCommands() {
		return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
	}
}), eO = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, tO = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, nO = Jg.create({
	name: "strike",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "s" },
			{ tag: "del" },
			{ tag: "strike" },
			{
				style: "text-decoration",
				consuming: !1,
				getAttrs: (e) => e.includes("line-through") ? {} : !1
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"s",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "del",
	parseMarkdown: (e, t) => t.applyMark("strike", t.parseInline(e.tokens || [])),
	renderMarkdown: (e, t) => `~~${t.renderChildren(e)}~~`,
	addCommands() {
		return {
			setStrike: () => ({ commands: e }) => e.setMark(this.name),
			toggleStrike: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetStrike: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-s": () => this.editor.commands.toggleStrike() };
	},
	addInputRules() {
		return [__({
			find: eO,
			type: this.type
		})];
	},
	addPasteRules() {
		return [x_({
			find: tO,
			type: this.type
		})];
	}
}), rO = X.create({
	name: "text",
	group: "inline",
	parseMarkdown: (e) => ({
		type: "text",
		text: e.text || ""
	}),
	renderMarkdown: (e) => e.text || ""
}), iO = Jg.create({
	name: "underline",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "u" }, {
			style: "text-decoration",
			consuming: !1,
			getAttrs: (e) => e.includes("underline") ? {} : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"u",
			vh(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown(e, t) {
		return t.applyMark(this.name || "underline", t.parseInline(e.tokens || []));
	},
	renderMarkdown(e, t) {
		return `++${t.renderChildren(e)}++`;
	},
	markdownTokenizer: {
		name: "underline",
		level: "inline",
		start(e) {
			return e.indexOf("++");
		},
		tokenize(e, t, n) {
			let r = /^(\+\+)([\s\S]+?)(\+\+)/.exec(e);
			if (!r) return;
			let i = r[2].trim();
			return {
				type: "underline",
				raw: r[0],
				text: i,
				tokens: n.inlineTokens(i)
			};
		}
	},
	addCommands() {
		return {
			setUnderline: () => ({ commands: e }) => e.setMark(this.name),
			toggleUnderline: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetUnderline: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-u": () => this.editor.commands.toggleUnderline(),
			"Mod-U": () => this.editor.commands.toggleUnderline()
		};
	}
});
//#endregion
//#region node_modules/prosemirror-dropcursor/dist/index.js
function aO(e = {}) {
	return new K({ view(t) {
		return new oO(t, e);
	} });
}
var oO = class {
	constructor(e, t) {
		this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.lastDragEvent = null, this.width = t.width ?? 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = [
			"dragover",
			"dragend",
			"drop",
			"dragleave"
		].map((t) => {
			let n = (e) => {
				this[t](e);
			};
			return e.dom.addEventListener(t, n), {
				name: t,
				handler: n
			};
		});
	}
	destroy() {
		this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
	}
	update(e, t) {
		if (this.cursorPos != null && t.doc != e.state.doc) if (this.lastDragEvent) {
			let e = this.computeTarget(this.lastDragEvent);
			e == this.cursorPos ? this.updateOverlay() : this.setCursor(e);
		} else this.updateOverlay();
	}
	setCursor(e) {
		e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
	}
	updateOverlay() {
		let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, n, r = this.editorView.dom, i = r.getBoundingClientRect(), a = i.width / r.offsetWidth, o = i.height / r.offsetHeight;
		if (t) {
			let t = e.nodeBefore, r = e.nodeAfter;
			if (t || r) {
				let e = this.editorView.nodeDOM(this.cursorPos - (t ? t.nodeSize : 0));
				if (e) {
					let i = e.getBoundingClientRect(), a = t ? i.bottom : i.top;
					t && r && (a = (a + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
					let s = this.width / 2 * o;
					n = {
						left: i.left,
						right: i.right,
						top: a - s,
						bottom: a + s
					};
				}
			}
		}
		if (!n) {
			let e = this.editorView.coordsAtPos(this.cursorPos), t = this.width / 2 * a;
			n = {
				left: e.left - t,
				right: e.left + t,
				top: e.top,
				bottom: e.bottom
			};
		}
		let s = this.editorView.dom.offsetParent;
		this.element || (this.element = s.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
		let c, l;
		if (!s || s == document.body && getComputedStyle(s).position == "static") c = -pageXOffset, l = -pageYOffset;
		else {
			let e = s.getBoundingClientRect(), t = e.width / s.offsetWidth, n = e.height / s.offsetHeight;
			c = e.left - s.scrollLeft * t, l = e.top - s.scrollTop * n;
		}
		this.element.style.left = (n.left - c) / a + "px", this.element.style.top = (n.top - l) / o + "px", this.element.style.width = (n.right - n.left) / a + "px", this.element.style.height = (n.bottom - n.top) / o + "px";
	}
	scheduleRemoval(e) {
		clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
	}
	computeTarget(e) {
		let t = this.editorView.posAtCoords({
			left: e.clientX,
			top: e.clientY
		}), n = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), r = n && n.type.spec.disableDropCursor, i = typeof r == "function" ? r(this.editorView, t, e) : r;
		if (!t || i) return null;
		let a = t.pos;
		if (this.editorView.dragging && this.editorView.dragging.slice) {
			let e = Ss(this.editorView.state.doc, a, this.editorView.dragging.slice);
			e != null && (a = e);
		}
		return a;
	}
	dragover(e) {
		if (!this.editorView.editable) return;
		this.lastDragEvent = e;
		let t = this.computeTarget(e);
		t != null && (this.setCursor(t), this.scheduleRemoval(5e3));
	}
	dragend() {
		this.scheduleRemoval(20);
	}
	drop() {
		this.scheduleRemoval(20);
	}
	dragleave(e) {
		this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
	}
}, sO = class e extends U {
	constructor(e) {
		super(e, e);
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		return e.valid(r) ? new e(r) : U.near(r);
	}
	content() {
		return H.empty;
	}
	eq(t) {
		return t instanceof e && t.head == this.head;
	}
	toJSON() {
		return {
			type: "gapcursor",
			pos: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for GapCursor.fromJSON");
		return new e(t.resolve(n.pos));
	}
	getBookmark() {
		return new cO(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !uO(e) || !dO(e)) return !1;
		let n = t.type.spec.allowGapCursor;
		if (n != null) return n;
		let r = t.contentMatchAt(e.index()).defaultType;
		return r && r.isTextblock;
	}
	static findGapCursorFrom(t, n, r = !1) {
		search: for (;;) {
			if (!r && e.valid(t)) return t;
			let i = t.pos, a = null;
			for (let r = t.depth;; r--) {
				let o = t.node(r);
				if (n > 0 ? t.indexAfter(r) < o.childCount : t.index(r) > 0) {
					a = o.child(n > 0 ? t.indexAfter(r) : t.index(r) - 1);
					break;
				}
				if (r == 0) return null;
				i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			for (;;) {
				let o = n > 0 ? a.firstChild : a.lastChild;
				if (!o) {
					if (a.isAtom && !a.isText && !G.isSelectable(a)) {
						t = t.doc.resolve(i + a.nodeSize * n), r = !1;
						continue search;
					}
					break;
				}
				a = o, i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			return null;
		}
	}
};
sO.prototype.visible = !1, sO.findFrom = sO.findGapCursorFrom, U.jsonID("gapcursor", sO);
var cO = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return sO.valid(t) ? new sO(t) : U.near(t);
	}
};
function lO(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function uO(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || lO(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function dO(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || lO(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function fO() {
	return new K({ props: {
		decorations: _O,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && sO.valid(n) ? new sO(n) : null;
		},
		handleClick: hO,
		handleKeyDown: pO,
		handleDOMEvents: { beforeinput: gO }
	} });
}
var pO = Rp({
	ArrowLeft: mO("horiz", -1),
	ArrowRight: mO("horiz", 1),
	ArrowUp: mO("vert", -1),
	ArrowDown: mO("vert", 1)
});
function mO(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof W) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = sO.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new sO(c))), !0) : !1;
	};
}
function hO(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!sO.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && G.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new sO(r))), !0);
}
function gO(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof sO)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = B.empty;
	for (let e = r.length - 1; e >= 0; e--) i = B.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new H(i, 0, 0));
	return a.setSelection(W.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function _O(e) {
	if (!(e.selection instanceof sO)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", Rf.create(e.doc, [Ff.widget(e.selection.head, t, { key: "gapcursor" })]);
}
//#endregion
//#region node_modules/rope-sequence/dist/index.js
var vO = 200, yO = function() {};
yO.prototype.append = function(e) {
	return e.length ? (e = yO.from(e), !this.length && e || e.length < vO && this.leafAppend(e) || this.length < vO && e.leafPrepend(this) || this.appendInner(e)) : this;
}, yO.prototype.prepend = function(e) {
	return e.length ? yO.from(e).append(this) : this;
}, yO.prototype.appendInner = function(e) {
	return new xO(this, e);
}, yO.prototype.slice = function(e, t) {
	return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? yO.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
}, yO.prototype.get = function(e) {
	if (!(e < 0 || e >= this.length)) return this.getInner(e);
}, yO.prototype.forEach = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
}, yO.prototype.map = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length);
	var r = [];
	return this.forEach(function(t, n) {
		return r.push(e(t, n));
	}, t, n), r;
}, yO.from = function(e) {
	return e instanceof yO ? e : e && e.length ? new bO(e) : yO.empty;
};
var bO = /* @__PURE__ */ function(e) {
	function t(t) {
		e.call(this), this.values = t;
	}
	e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
	var n = {
		length: { configurable: !0 },
		depth: { configurable: !0 }
	};
	return t.prototype.flatten = function() {
		return this.values;
	}, t.prototype.sliceInner = function(e, n) {
		return e == 0 && n == this.length ? this : new t(this.values.slice(e, n));
	}, t.prototype.getInner = function(e) {
		return this.values[e];
	}, t.prototype.forEachInner = function(e, t, n, r) {
		for (var i = t; i < n; i++) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		for (var i = t - 1; i >= n; i--) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.leafAppend = function(e) {
		if (this.length + e.length <= vO) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= vO) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(yO);
yO.empty = new bO([]);
var xO = /* @__PURE__ */ function(e) {
	function t(t, n) {
		e.call(this), this.left = t, this.right = n, this.length = t.length + n.length, this.depth = Math.max(t.depth, n.depth) + 1;
	}
	return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.flatten = function() {
		return this.left.flatten().concat(this.right.flatten());
	}, t.prototype.getInner = function(e) {
		return e < this.left.length ? this.left.get(e) : this.right.get(e - this.left.length);
	}, t.prototype.forEachInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t < i && this.left.forEachInner(e, t, Math.min(n, i), r) === !1 || n > i && this.right.forEachInner(e, Math.max(t - i, 0), Math.min(this.length, n) - i, r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t > i && this.right.forEachInvertedInner(e, t - i, Math.max(n, i) - i, r + i) === !1 || n < i && this.left.forEachInvertedInner(e, Math.min(t, i), n, r) === !1) return !1;
	}, t.prototype.sliceInner = function(e, t) {
		if (e == 0 && t == this.length) return this;
		var n = this.left.length;
		return t <= n ? this.left.slice(e, t) : e >= n ? this.right.slice(e - n, t - n) : this.left.slice(e, n).append(this.right.slice(0, t - n));
	}, t.prototype.leafAppend = function(e) {
		var n = this.right.leafAppend(e);
		if (n) return new t(this.left, n);
	}, t.prototype.leafPrepend = function(e) {
		var n = this.left.leafPrepend(e);
		if (n) return new t(n, this.right);
	}, t.prototype.appendInner = function(e) {
		return this.left.depth >= Math.max(this.right.depth, e.depth) + 1 ? new t(this.left, new t(this.right, e)) : new t(this, e);
	}, t;
}(yO), SO = 500, CO = class e {
	constructor(e, t) {
		this.items = e, this.eventCount = t;
	}
	popEvent(t, n) {
		if (this.eventCount == 0) return null;
		let r = this.items.length;
		for (;; r--) if (this.items.get(r - 1).selection) {
			--r;
			break;
		}
		let i, a;
		n && (i = this.remapping(r, this.items.length), a = i.maps.length);
		let o = t.tr, s, c, l = [], u = [];
		return this.items.forEach((t, n) => {
			if (!t.step) {
				i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
				return;
			}
			if (i) {
				u.push(new TO(t.map));
				let e = t.step.map(i.slice(a)), n;
				e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new TO(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
			} else o.maybeStep(t.step);
			if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
		}, this.items.length, 0), {
			remaining: c,
			transform: o,
			selection: s
		};
	}
	addTransform(t, n, r, i) {
		let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
		for (let e = 0; e < t.steps.length; e++) {
			let r = t.steps[e].invert(t.docs[e]), l = new TO(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > DO && (s = wO(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new zo();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new TO(e))), this.eventCount);
	}
	rebased(t, n) {
		if (!this.eventCount) return this;
		let r = [], i = Math.max(0, this.items.length - n), a = t.mapping, o = t.steps.length, s = this.eventCount;
		this.items.forEach((e) => {
			e.selection && s--;
		}, i);
		let c = n;
		this.items.forEach((e) => {
			let n = a.getMirror(--c);
			if (n == null) return;
			o = Math.min(o, n);
			let i = a.maps[n];
			if (e.step) {
				let o = t.steps[n].invert(t.docs[n]), l = e.selection && e.selection.map(a.slice(c + 1, n));
				l && s++, r.push(new TO(i, o, l));
			} else r.push(new TO(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new TO(a.maps[e]));
		let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
		return d.emptyItemCount() > SO && (d = d.compress(this.items.length - r.length)), d;
	}
	emptyItemCount() {
		let e = 0;
		return this.items.forEach((t) => {
			t.step || e++;
		}), e;
	}
	compress(t = this.items.length) {
		let n = this.remapping(0, t), r = n.maps.length, i = [], a = 0;
		return this.items.forEach((e, o) => {
			if (o >= t) i.push(e), e.selection && a++;
			else if (e.step) {
				let t = e.step.map(n.slice(r)), o = t && t.getMap();
				if (r--, o && n.appendMap(o, r), t) {
					let s = e.selection && e.selection.map(n.slice(r));
					s && a++;
					let c = new TO(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(yO.from(i.reverse()), a);
	}
};
CO.empty = new CO(yO.empty, 0);
function wO(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var TO = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, EO = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, DO = 20;
function OO(e, t, n, r) {
	let i = n.getMeta(IO), a;
	if (i) return i.historyState;
	n.getMeta(LO) && (e = new EO(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(IO)) return o.getMeta(IO).redo ? new EO(e.done.addTransform(n, void 0, r, FO(t)), e.undone, AO(n.mapping.maps), e.prevTime, e.prevComposition) : new EO(e.done, e.undone.addTransform(n, void 0, r, FO(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !kO(n, e.prevRanges)), s = o ? jO(e.prevRanges, n.mapping) : AO(n.mapping.maps);
		return new EO(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, FO(t)), CO.empty, s, n.time, i ?? e.prevComposition);
	}
	return (a = n.getMeta("rebased")) ? new EO(e.done.rebased(n, a), e.undone.rebased(n, a), jO(e.prevRanges, n.mapping), e.prevTime, e.prevComposition) : new EO(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), jO(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function kO(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function AO(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function jO(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function MO(e, t, n) {
	let r = FO(t), i = IO.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new EO(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(IO, {
		redo: n,
		historyState: c
	});
}
var NO = !1, PO = null;
function FO(e) {
	let t = e.plugins;
	if (PO != t) {
		NO = !1, PO = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			NO = !0;
			break;
		}
	}
	return NO;
}
var IO = new uc("history"), LO = new uc("closeHistory");
function RO(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new K({
		key: IO,
		state: {
			init() {
				return new EO(CO.empty, CO.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return OO(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? BO : n == "historyRedo" ? VO : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function zO(e, t) {
	return (n, r) => {
		let i = IO.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = MO(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var BO = zO(!1, !0), VO = zO(!0, !0), HO = Y.create({
	name: "characterCount",
	addOptions() {
		return {
			limit: null,
			autoTrim: !0,
			mode: "textSize",
			textCounter: (e) => e.length,
			wordCounter: (e) => e.split(" ").filter((e) => e !== "").length
		};
	},
	addStorage() {
		return {
			characters: () => 0,
			words: () => 0
		};
	},
	onBeforeCreate() {
		this.storage.characters = (e) => {
			let t = e?.node || this.editor.state.doc;
			if ((e?.mode || this.options.mode) === "textSize") {
				let e = t.textBetween(0, t.content.size, void 0, " ");
				return this.options.textCounter(e);
			}
			return t.nodeSize;
		}, this.storage.words = (e) => {
			let t = e?.node || this.editor.state.doc, n = t.textBetween(0, t.content.size, " ", " ");
			return this.options.wordCounter(n);
		};
	},
	addProseMirrorPlugins() {
		let e = !1;
		return [new K({
			key: new uc("characterCount"),
			appendTransaction: (t, n, r) => {
				if (e) return;
				let i = this.options.limit, a = this.options.autoTrim;
				if (i == null || i === 0 || a === !1) {
					e = !0;
					return;
				}
				let o = this.storage.characters({ node: r.doc });
				if (o > i) {
					let t = o - i;
					console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
					let n = r.tr.deleteRange(0, t);
					return e = !0, n;
				}
				e = !0;
			},
			filterTransaction: (e, t) => {
				let n = this.options.limit;
				if (!e.docChanged || n === 0 || n == null) return !0;
				let r = this.storage.characters({ node: t.doc }), i = this.storage.characters({ node: e.doc });
				if (i <= n || r > n && i > n && i <= r) return !0;
				if (r > n && i > n && i > r || !e.getMeta("paste")) return !1;
				let a = e.selection.$head.pos, o = a - (i - n), s = a;
				return e.deleteRange(o, s), !(this.storage.characters({ node: e.doc }) > n);
			}
		})];
	}
}), UO = Y.create({
	name: "dropCursor",
	addOptions() {
		return {
			color: "currentColor",
			width: 1,
			class: void 0
		};
	},
	addProseMirrorPlugins() {
		return [aO(this.options)];
	}
});
Y.create({
	name: "focus",
	addOptions() {
		return {
			className: "has-focus",
			mode: "all"
		};
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("focus"),
			props: { decorations: ({ doc: e, selection: t }) => {
				let { isEditable: n, isFocused: r } = this.editor, { anchor: i } = t, a = [];
				if (!n || !r) return Rf.create(e, []);
				let o = 0;
				this.options.mode === "deepest" && e.descendants((e, t) => {
					if (!e.isText) {
						if (!(i >= t && i <= t + e.nodeSize - 1)) return !1;
						o += 1;
					}
				});
				let s = 0;
				return e.descendants((e, t) => {
					if (e.isText || !(i >= t && i <= t + e.nodeSize - 1)) return !1;
					if (s += 1, this.options.mode === "deepest" && o - s > 0 || this.options.mode === "shallowest" && s > 1) return this.options.mode === "deepest";
					a.push(Ff.node(t, t + e.nodeSize, { class: this.options.className }));
				}), Rf.create(e, a);
			} }
		})];
	}
});
var WO = Y.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [fO()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: J(q(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), GO = "placeholder", KO = new uc("tiptap__placeholder");
function qO(e) {
	let { editor: t, placeholder: n, dataAttribute: r, pos: i, node: a, isEmptyDoc: o, hasAnchor: s, classes: { emptyNode: c, emptyEditor: l } } = e, u = [c];
	return o && u.push(l), Ff.node(i, i + a.nodeSize, {
		class: u.join(" "),
		[r]: typeof n == "function" ? n({
			editor: t,
			node: a,
			pos: i,
			hasAnchor: s
		}) : n
	});
}
function JO(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function YO({ editor: e, options: t, dataAttribute: n, doc: r, selection: i, from: a, to: o }) {
	let { anchor: s } = i, c = [], l = e.isEmpty;
	return r.nodesBetween(a, o, (r, i) => {
		let a = s >= i && s <= i + r.nodeSize, o = !r.isLeaf && qh(r);
		return r.type.isTextblock && (a || !t.showOnlyCurrent) && o && c.push(qO({
			editor: e,
			isEmptyDoc: l,
			dataAttribute: n,
			hasAnchor: a,
			placeholder: t.placeholder,
			classes: {
				emptyEditor: t.emptyEditorClass,
				emptyNode: JO(t.emptyNodeClass, {
					editor: e,
					node: r,
					pos: i,
					hasAnchor: a
				})
			},
			node: r,
			pos: i
		})), t.includeChildren;
	}), c;
}
function XO({ editor: e, options: t, dataAttribute: n, doc: r, selection: i }) {
	if (!(e.isEditable || !t.showOnlyWhenEditable)) return null;
	let { anchor: a } = i, o = [], s = e.isEmpty;
	if (t.showOnlyCurrent && !t.includeChildren) {
		let i = r.resolve(a), c = i.depth > 0 ? i.node(1) : i.nodeAfter, l = i.depth > 0 ? i.before(1) : a;
		if (c && c.type.isTextblock && qh(c)) {
			let r = a >= l && a <= l + c.nodeSize;
			o.push(qO({
				editor: e,
				isEmptyDoc: s,
				dataAttribute: n,
				hasAnchor: r,
				placeholder: t.placeholder,
				classes: {
					emptyEditor: t.emptyEditorClass,
					emptyNode: JO(t.emptyNodeClass, {
						editor: e,
						node: c,
						pos: l,
						hasAnchor: r
					})
				},
				node: c,
				pos: l
			}));
		}
	} else o.push(...YO({
		editor: e,
		options: t,
		dataAttribute: n,
		doc: r,
		selection: i,
		from: 0,
		to: r.content.size
	}));
	return Rf.create(r, o);
}
function ZO(e, t) {
	let n = e.resolve(t);
	if (n.depth === 0) {
		let e = n.nodeAfter ?? n.nodeBefore;
		if (!e) return {
			from: t,
			to: t
		};
		let r = n.nodeAfter ? t : t - e.nodeSize;
		return {
			from: r,
			to: r + e.nodeSize
		};
	}
	let r = n.before(1);
	return {
		from: r,
		to: r + n.node(1).nodeSize
	};
}
function QO(e, t) {
	return {
		from: Math.max(0, t.from - 1),
		to: Math.min(e.content.size, t.to - 1)
	};
}
function $O(e, t, n) {
	let r = [];
	return e.forEach((e, i) => {
		let a = i, o = a + e.nodeSize, s = a + 1, c = o + 1;
		s < n && c > t && r.push({
			from: a,
			to: o
		});
	}), r;
}
function ek(e) {
	if (e.length === 0) return [];
	let t = [...e].sort((e, t) => e.from - t.from), n = [{ ...t[0] }];
	for (let e = 1; e < t.length; e += 1) {
		let r = n[n.length - 1], i = t[e];
		i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
	}
	return n;
}
function tk(e, t) {
	let n = $O(e, t.from, t.to);
	return n.push(QO(e, ZO(e, t.from))), t.to > t.from ? n.push(QO(e, ZO(e, Math.min(t.to, e.content.size + 1) - 1))) : t.from < e.content.size + 1 && n.push(QO(e, ZO(e, Math.min(t.from + 1, e.content.size)))), n;
}
function nk(e, t, n) {
	let r = [];
	if (e.docChanged) {
		let t = Fh(e);
		for (let e of t) r.push(...tk(n.doc, e.newRange));
	}
	return e.selectionSet && (r.push(QO(n.doc, ZO(n.doc, e.mapping.map(t.selection.anchor)))), r.push(QO(n.doc, ZO(n.doc, n.selection.anchor)))), ek(r);
}
function rk(e, t, n) {
	let r = Math.max(0, Math.min(e, n.content.size));
	return {
		from: r,
		to: Math.max(r, Math.min(t, n.content.size))
	};
}
function ik({ decorations: e, ranges: t, editor: n, options: r, dataAttribute: i, doc: a, selection: o }) {
	let s = e;
	for (let e of t) {
		let { from: t, to: c } = rk(e.from, e.to, a), l = s.find(t, c).filter((e) => e.from >= t && e.to <= c);
		l.length && (s = s.remove(l));
		let u = YO({
			editor: n,
			options: r,
			dataAttribute: i,
			doc: a,
			selection: o,
			from: t,
			to: c
		});
		u.length && (s = s.add(a, u));
	}
	return s;
}
function ak({ editor: e, options: t, dataAttribute: n }) {
	return {
		init(r, i) {
			return XO({
				editor: e,
				options: t,
				dataAttribute: n,
				doc: i.doc,
				selection: i.selection
			}) ?? Rf.empty;
		},
		apply(r, i, a, o) {
			return !r.docChanged && !r.selectionSet ? i : ik({
				decorations: i.map(r.mapping, r.doc),
				ranges: nk(r, a, o),
				editor: e,
				options: t,
				dataAttribute: n,
				doc: o.doc,
				selection: o.selection
			});
		}
	};
}
function ok(e) {
	return e.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function sk({ editor: e, options: t }) {
	let n = t.dataAttribute ? `data-${ok(t.dataAttribute)}` : `data-${GO}`, r = t.showOnlyCurrent && !t.includeChildren;
	return new K({
		key: KO,
		...r ? {} : { state: ak({
			editor: e,
			options: t,
			dataAttribute: n
		}) },
		props: { decorations: r ? ({ doc: r, selection: i }) => XO({
			editor: e,
			options: t,
			dataAttribute: n,
			doc: r,
			selection: i
		}) : (n) => t.showOnlyWhenEditable && !e.isEditable ? Rf.empty : KO.getState(n) ?? Rf.empty }
	});
}
Y.create({
	name: "placeholder",
	addOptions() {
		return {
			emptyEditorClass: "is-editor-empty",
			emptyNodeClass: "is-empty",
			dataAttribute: GO,
			placeholder: "Write something …",
			showOnlyWhenEditable: !0,
			showOnlyCurrent: !0,
			includeChildren: !1
		};
	},
	addProseMirrorPlugins() {
		return [sk({
			editor: this.editor,
			options: this.options
		})];
	}
});
function ck(e, t) {
	return !e.selection.empty && !Jh(e.selection) && t.isEditable;
}
function lk(e, t) {
	return ck(e, t) && !t.isFocused && !t.view.dragging;
}
function uk() {
	var e;
	(e = window.getSelection()) == null || e.removeAllRanges();
}
function dk(e) {
	e.focus();
}
Y.create({
	name: "selection",
	addOptions() {
		return { className: "selection" };
	},
	addProseMirrorPlugins() {
		let { editor: e, options: t } = this;
		return [new K({
			key: new uc("selection"),
			props: {
				decorations(n) {
					return lk(n, e) ? Rf.create(n.doc, [Ff.inline(n.selection.from, n.selection.to, { class: t.className })]) : null;
				},
				handleDOMEvents: {
					blur(t) {
						return ck(t.state, e) && uk(), !1;
					},
					focus(t) {
						return ck(t.state, e) && requestAnimationFrame(() => {
							!e.isDestroyed && t.hasFocus() && dk(t);
						}), !1;
					}
				}
			}
		})];
	}
});
function fk({ types: e, node: t }) {
	return t && Array.isArray(e) && e.includes(t.type) || t?.type === e;
}
var pk = Y.create({
	name: "trailingNode",
	addOptions() {
		return {
			node: void 0,
			notAfter: []
		};
	},
	addProseMirrorPlugins() {
		let e = new uc(this.name), t = this.options.node || this.editor.schema.topNodeType.contentMatch.defaultType?.name || "paragraph", n = Object.entries(this.editor.schema.nodes).map(([, e]) => e).filter((e) => (this.options.notAfter || []).concat(t).includes(e.name));
		return [new K({
			key: e,
			appendTransaction: (n, r, i) => {
				let { doc: a, tr: o, schema: s } = i, c = e.getState(i), l = a.content.size, u = s.nodes[t];
				if (!n.some((e) => e.getMeta("skipTrailingNode")) && c) return o.insert(l, u.create());
			},
			state: {
				init: (e, t) => {
					let r = t.tr.doc.lastChild;
					return !fk({
						node: r,
						types: n
					});
				},
				apply: (e, t) => {
					if (!e.docChanged || e.getMeta("__uniqueIDTransaction")) return t;
					let r = e.doc.lastChild;
					return !fk({
						node: r,
						types: n
					});
				}
			}
		})];
	}
}), mk = Y.create({
	name: "undoRedo",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => BO(e, t),
			redo: () => ({ state: e, dispatch: t }) => VO(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [RO(this.options)];
	},
	addKeyboardShortcuts() {
		return {
			"Mod-z": () => this.editor.commands.undo(),
			"Shift-Mod-z": () => this.editor.commands.redo(),
			"Mod-y": () => this.editor.commands.redo(),
			"Mod-я": () => this.editor.commands.undo(),
			"Shift-Mod-я": () => this.editor.commands.redo()
		};
	}
}), hk = Y.create({
	name: "starterKit",
	addExtensions() {
		let e = [];
		return this.options.bold !== !1 && e.push(rw.configure(this.options.bold)), this.options.blockquote !== !1 && e.push(QC.configure(this.options.blockquote)), this.options.bulletList !== !1 && e.push(XE.configure(this.options.bulletList)), this.options.code !== !1 && e.push(ow.configure(this.options.code)), this.options.codeBlock !== !1 && e.push(uw.configure(this.options.codeBlock)), this.options.document !== !1 && e.push(dw.configure(this.options.document)), this.options.dropcursor !== !1 && e.push(UO.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && e.push(WO.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && e.push(fw.configure(this.options.hardBreak)), this.options.heading !== !1 && e.push(pw.configure(this.options.heading)), this.options.undoRedo !== !1 && e.push(mk.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && e.push(mw.configure(this.options.horizontalRule)), this.options.italic !== !1 && e.push(yw.configure(this.options.italic)), this.options.listItem !== !1 && e.push(yD.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(AD.configure(this.options?.listKeymap)), this.options.link !== !1 && e.push(UE.configure(this.options?.link)), this.options.orderedList !== !1 && e.push(qD.configure(this.options.orderedList)), this.options.paragraph !== !1 && e.push($D.configure(this.options.paragraph)), this.options.strike !== !1 && e.push(nO.configure(this.options.strike)), this.options.text !== !1 && e.push(rO.configure(this.options.text)), this.options.underline !== !1 && e.push(iO.configure(this.options?.underline)), this.options.trailingNode !== !1 && e.push(pk.configure(this.options?.trailingNode)), e;
	}
}), gk = HO, _k = /* @__PURE__ */ k((/* @__PURE__ */ E(((e, t) => {
	var n = !0, r = !1, i = !1;
	t.exports = function(e, t) {
		t && (n = !t.enabled, r = !!t.label, i = !!t.labelAfter), e.core.ruler.after("inline", "github-task-lists", function(e) {
			for (var t = e.tokens, r = 2; r < t.length; r++) s(t, r) && (c(t[r], e.Token), a(t[r - 2], "class", "task-list-item" + (n ? "" : " enabled")), a(t[o(t, r - 2)], "class", "contains-task-list"));
		});
	};
	function a(e, t, n) {
		var r = e.attrIndex(t), i = [t, n];
		r < 0 ? e.attrPush(i) : e.attrs[r] = i;
	}
	function o(e, t) {
		for (var n = e[t].level - 1, r = t - 1; r >= 0; r--) if (e[r].level === n) return r;
		return -1;
	}
	function s(e, t) {
		return p(e[t]) && m(e[t - 1]) && h(e[t - 2]) && g(e[t]);
	}
	function c(e, t) {
		if (e.children.unshift(l(e, t)), e.children[1].content = e.children[1].content.slice(3), e.content = e.content.slice(3), r) if (i) {
			e.children.pop();
			var n = "task-item-" + Math.ceil(Math.random() * 1e7 - 1e3);
			e.children[0].content = e.children[0].content.slice(0, -1) + " id=\"" + n + "\">", e.children.push(f(e.content, n, t));
		} else e.children.unshift(u(t)), e.children.push(d(t));
	}
	function l(e, t) {
		var r = new t("html_inline", "", 0), i = n ? " disabled=\"\" " : "";
		return e.content.indexOf("[ ] ") === 0 ? r.content = "<input class=\"task-list-item-checkbox\"" + i + "type=\"checkbox\">" : (e.content.indexOf("[x] ") === 0 || e.content.indexOf("[X] ") === 0) && (r.content = "<input class=\"task-list-item-checkbox\" checked=\"\"" + i + "type=\"checkbox\">"), r;
	}
	function u(e) {
		var t = new e("html_inline", "", 0);
		return t.content = "<label>", t;
	}
	function d(e) {
		var t = new e("html_inline", "", 0);
		return t.content = "</label>", t;
	}
	function f(e, t, n) {
		var r = new n("html_inline", "", 0);
		return r.content = "<label class=\"task-list-item-label\" for=\"" + t + "\">" + e + "</label>", r.attrs = [{ for: t }], r;
	}
	function p(e) {
		return e.type === "inline";
	}
	function m(e) {
		return e.type === "paragraph_open";
	}
	function h(e) {
		return e.type === "list_item_open";
	}
	function g(e) {
		return e.content.indexOf("[ ] ") === 0 || e.content.indexOf("[x] ") === 0 || e.content.indexOf("[X] ") === 0;
	}
})))(), 1), vk = Object.defineProperty, yk = (e, t, n) => t in e ? vk(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, bk = (e, t, n) => (yk(e, typeof t == "symbol" ? t : t + "", n), n), xk = Y.create({
	name: "markdownTightLists",
	addOptions: () => ({
		tight: !0,
		tightClass: "tight",
		listTypes: ["bulletList", "orderedList"]
	}),
	addGlobalAttributes() {
		return [{
			types: this.options.listTypes,
			attributes: { tight: {
				default: this.options.tight,
				parseHTML: (e) => e.getAttribute("data-tight") === "true" || !e.querySelector("p"),
				renderHTML: (e) => ({
					class: e.tight ? this.options.tightClass : null,
					"data-tight": e.tight ? "true" : null
				})
			} }
		}];
	},
	addCommands() {
		var e = this;
		return { toggleTight: function() {
			let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
			return (n) => {
				let { editor: r, commands: i } = n;
				function a(e) {
					if (!r.isActive(e)) return !1;
					let n = r.getAttributes(e);
					return i.updateAttributes(e, { tight: t ?? !(n != null && n.tight) });
				}
				return e.options.listTypes.some((e) => a(e));
			};
		} };
	}
}), Sk = jC();
function Ck(e, t) {
	return Sk.inline.State.prototype.scanDelims.call({
		src: e,
		posMax: e.length
	}), new Sk.inline.State(e, null, null, []).scanDelims(t, !0);
}
function wk(e, t, n, r) {
	let i = e.substring(0, n) + e.substring(n + t.length);
	return i = i.substring(0, n + r) + t + i.substring(n + r), i;
}
function Tk(e, t, n, r) {
	let i = n, a = e;
	for (; i < r && !Ck(a, i).can_open;) a = wk(a, t, i, 1), i++;
	return {
		text: a,
		from: i,
		to: r
	};
}
function Ek(e, t, n, r) {
	let i = r, a = e;
	for (; i > n && !Ck(a, i).can_close;) a = wk(a, t, i, -1), i--;
	return {
		text: a,
		from: n,
		to: i
	};
}
function Dk(e, t, n, r) {
	let i = {
		text: e,
		from: n,
		to: r
	};
	return i = Tk(i.text, t, i.from, i.to), i = Ek(i.text, t, i.from, i.to), i.to - i.from < t.length + 1 && (i.text = i.text.substring(0, i.from) + i.text.substring(i.to + t.length)), i.text;
}
var Ok = class extends KC {
	constructor(e, t, n) {
		super(e, t, n ?? {}), bk(this, "inTable", !1), this.inlines = [];
	}
	render(e, t, n) {
		super.render(e, t, n);
		let r = this.inlines[this.inlines.length - 1];
		if (r != null && r.start && r != null && r.end) {
			let { delimiter: e, start: t, end: n } = this.normalizeInline(r);
			this.out = Dk(this.out, e, t, n), this.inlines.pop();
		}
	}
	markString(e, t, n, r) {
		let i = this.marks[e.type.name];
		if (i.expelEnclosingWhitespace) if (t) this.inlines.push({
			start: this.out.length,
			delimiter: i.open
		});
		else {
			let e = this.inlines.pop();
			this.inlines.push({
				...e,
				end: this.out.length
			});
		}
		return super.markString(e, t, n, r);
	}
	normalizeInline(e) {
		let { start: t, end: n } = e;
		for (; this.out.charAt(t).match(/\s/);) t++;
		return {
			...e,
			start: t
		};
	}
}, kk = Jg.create({
	name: "markdownHTMLMark",
	addStorage() {
		return { markdown: {
			serialize: {
				open(e, t) {
					return this.editor.storage.markdown.options.html ? Ak(t)?.[0] ?? "" : (console.warn(`Tiptap Markdown: "${t.type.name}" mark is only available in html mode`), "");
				},
				close(e, t) {
					return this.editor.storage.markdown.options.html ? Ak(t)?.[1] ?? "" : "";
				}
			},
			parse: {}
		} };
	}
});
function Ak(e) {
	let t = e.type.schema, n = t.text(" ", [e]), r = dh(B.from(n), t).match(/^(<.*?>) (<\/.*?>)$/);
	return r ? [r[1], r[2]] : null;
}
function jk(e) {
	let t = `<body>${e}</body>`;
	return new window.DOMParser().parseFromString(t, "text/html").body;
}
function Mk(e) {
	return e?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Nk(e) {
	let t = e.parentElement, n = t.cloneNode();
	for (; t.firstChild && t.firstChild !== e;) n.appendChild(t.firstChild);
	n.childNodes.length > 0 && t.parentElement.insertBefore(n, t), t.parentElement.insertBefore(e, t), t.childNodes.length === 0 && t.remove();
}
function Pk(e) {
	let t = e.parentNode;
	for (; e.firstChild;) t.insertBefore(e.firstChild, e);
	t.removeChild(e);
}
var Fk = X.create({
	name: "markdownHTMLNode",
	addStorage() {
		return { markdown: {
			serialize(e, t, n) {
				this.editor.storage.markdown.options.html ? e.write(Ik(t, n)) : (console.warn(`Tiptap Markdown: "${t.type.name}" node is only available in html mode`), e.write(`[${t.type.name}]`)), t.isBlock && e.closeBlock(t);
			},
			parse: {}
		} };
	}
});
function Ik(e, t) {
	let n = e.type.schema, r = dh(B.from(e), n);
	return e.isBlock && (t instanceof B || t.type.name === n.topNodeType.name) ? Lk(r) : r;
}
function Lk(e) {
	let t = jk(e).firstElementChild;
	return t.innerHTML = t.innerHTML.trim() ? `
${t.innerHTML}
` : "\n", t.outerHTML;
}
var Rk = X.create({ name: "blockquote" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.blockquote,
		parse: {}
	} };
} }), zk = X.create({ name: "bulletList" }).extend({ addStorage() {
	return { markdown: {
		serialize(e, t) {
			return e.renderList(t, "  ", () => (this.editor.storage.markdown.options.bulletListMarker || "-") + " ");
		},
		parse: {}
	} };
} }), Bk = X.create({ name: "codeBlock" }).extend({ addStorage() {
	return { markdown: {
		serialize(e, t) {
			e.write("```" + (t.attrs.language || "") + "\n"), e.text(t.textContent, !1), e.ensureNewLine(), e.write("```"), e.closeBlock(t);
		},
		parse: {
			setup(e) {
				e.set({ langPrefix: this.options.languageClassPrefix ?? "language-" });
			},
			updateDOM(e) {
				e.innerHTML = e.innerHTML.replace(/\n<\/code><\/pre>/g, "</code></pre>");
			}
		}
	} };
} }), Vk = X.create({ name: "hardBreak" }).extend({ addStorage() {
	return { markdown: {
		serialize(e, t, n, r) {
			for (let i = r + 1; i < n.childCount; i++) if (n.child(i).type != t.type) {
				e.write(e.inTable ? Fk.storage.markdown.serialize.call(this, e, t, n) : "\\\n");
				return;
			}
		},
		parse: {}
	} };
} }), Hk = X.create({ name: "heading" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.heading,
		parse: {}
	} };
} }), Uk = X.create({ name: "horizontalRule" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.horizontal_rule,
		parse: {}
	} };
} }), Wk = X.create({ name: "image" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.image,
		parse: {}
	} };
} }), Gk = X.create({ name: "listItem" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.list_item,
		parse: {}
	} };
} }), Kk = X.create({ name: "orderedList" });
function qk(e, t, n) {
	let r = 0;
	for (; n - r > 0 && t.child(n - r - 1).type.name === e.type.name; r++);
	return r;
}
var Jk = Kk.extend({ addStorage() {
	return { markdown: {
		serialize(e, t, n, r) {
			let i = t.attrs.start || 1, a = String(i + t.childCount - 1).length, o = e.repeat(" ", a + 2), s = qk(t, n, r) % 2 ? ") " : ". ";
			e.renderList(t, o, (t) => {
				let n = String(i + t);
				return e.repeat(" ", a - n.length) + n + s;
			});
		},
		parse: {}
	} };
} }), Yk = X.create({ name: "paragraph" }).extend({ addStorage() {
	return { markdown: {
		serialize: UC.nodes.paragraph,
		parse: {}
	} };
} });
function Xk(e) {
	var t;
	return (e == null || (t = e.content) == null ? void 0 : t.content) ?? [];
}
var Zk = X.create({ name: "table" }).extend({ addStorage() {
	return { markdown: {
		serialize(e, t, n) {
			if (!$k(t)) {
				Fk.storage.markdown.serialize.call(this, e, t, n);
				return;
			}
			e.inTable = !0, t.forEach((t, n, r) => {
				if (e.write("| "), t.forEach((t, n, r) => {
					r && e.write(" | ");
					let i = t.firstChild;
					i.textContent.trim() && e.renderInline(i);
				}), e.write(" |"), e.ensureNewLine(), !r) {
					let n = Array.from({ length: t.childCount }).map(() => "---").join(" | ");
					e.write(`| ${n} |`), e.ensureNewLine();
				}
			}), e.closeBlock(t), e.inTable = !1;
		},
		parse: {}
	} };
} });
function Qk(e) {
	return e.attrs.colspan > 1 || e.attrs.rowspan > 1;
}
function $k(e) {
	let t = Xk(e), n = t[0], r = t.slice(1);
	return !(Xk(n).some((e) => e.type.name !== "tableHeader" || Qk(e) || e.childCount > 1) || r.some((e) => Xk(e).some((e) => e.type.name === "tableHeader" || Qk(e) || e.childCount > 1)));
}
var eA = [
	Rk,
	zk,
	Bk,
	Vk,
	Hk,
	Uk,
	Fk,
	Wk,
	Gk,
	Jk,
	Yk,
	Zk,
	X.create({ name: "taskItem" }).extend({ addStorage() {
		return { markdown: {
			serialize(e, t) {
				let n = t.attrs.checked ? "[x]" : "[ ]";
				e.write(`${n} `), e.renderContent(t);
			},
			parse: { updateDOM(e) {
				[...e.querySelectorAll(".task-list-item")].forEach((e) => {
					let t = e.querySelector("input");
					e.setAttribute("data-type", "taskItem"), t && (e.setAttribute("data-checked", t.checked), t.remove());
				});
			} }
		} };
	} }),
	X.create({ name: "taskList" }).extend({ addStorage() {
		return { markdown: {
			serialize: zk.storage.markdown.serialize,
			parse: {
				setup(e) {
					e.use(_k.default);
				},
				updateDOM(e) {
					[...e.querySelectorAll(".contains-task-list")].forEach((e) => {
						e.setAttribute("data-type", "taskList");
					});
				}
			}
		} };
	} }),
	X.create({ name: "text" }).extend({ addStorage() {
		return { markdown: {
			serialize(e, t) {
				e.text(Mk(t.text));
			},
			parse: {}
		} };
	} }),
	Jg.create({ name: "bold" }).extend({ addStorage() {
		return { markdown: {
			serialize: UC.marks.strong,
			parse: {}
		} };
	} }),
	Jg.create({ name: "code" }).extend({ addStorage() {
		return { markdown: {
			serialize: UC.marks.code,
			parse: {}
		} };
	} }),
	kk,
	Jg.create({ name: "italic" }).extend({ addStorage() {
		return { markdown: {
			serialize: UC.marks.em,
			parse: {}
		} };
	} }),
	Jg.create({ name: "link" }).extend({ addStorage() {
		return { markdown: {
			serialize: UC.marks.link,
			parse: {}
		} };
	} }),
	Jg.create({ name: "strike" }).extend({ addStorage() {
		return { markdown: {
			serialize: {
				open: "~~",
				close: "~~",
				expelEnclosingWhitespace: !0
			},
			parse: {}
		} };
	} })
];
function tA(e) {
	let t = e.storage?.markdown, n = eA.find((t) => t.name === e.name)?.storage.markdown;
	return t || n ? {
		...n,
		...t
	} : null;
}
var nA = class {
	constructor(e) {
		bk(this, "editor", null), this.editor = e;
	}
	serialize(e) {
		let t = new Ok(this.nodes, this.marks, { hardBreakNodeName: Vk.name });
		return t.renderContent(e), t.out;
	}
	get nodes() {
		return {
			...Object.fromEntries(Object.keys(this.editor.schema.nodes).map((e) => [e, this.serializeNode(Fk)])),
			...Object.fromEntries(this.editor.extensionManager.extensions.filter((e) => e.type === "node" && this.serializeNode(e)).map((e) => [e.name, this.serializeNode(e)]) ?? [])
		};
	}
	get marks() {
		return {
			...Object.fromEntries(Object.keys(this.editor.schema.marks).map((e) => [e, this.serializeMark(kk)])),
			...Object.fromEntries(this.editor.extensionManager.extensions.filter((e) => e.type === "mark" && this.serializeMark(e)).map((e) => [e.name, this.serializeMark(e)]) ?? [])
		};
	}
	serializeNode(e) {
		var t;
		return (t = tA(e)) == null || (t = t.serialize) == null ? void 0 : t.bind({
			editor: this.editor,
			options: e.options
		});
	}
	serializeMark(e) {
		let t = tA(e)?.serialize;
		return t ? {
			...t,
			open: typeof t.open == "function" ? t.open.bind({
				editor: this.editor,
				options: e.options
			}) : t.open,
			close: typeof t.close == "function" ? t.close.bind({
				editor: this.editor,
				options: e.options
			}) : t.close
		} : null;
	}
}, rA = class {
	constructor(e, t) {
		bk(this, "editor", null), bk(this, "md", null);
		let { html: n, linkify: r, breaks: i } = t;
		this.editor = e, this.md = this.withPatchedRenderer(jC({
			html: n,
			linkify: r,
			breaks: i
		}));
	}
	parse(e) {
		let { inline: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (typeof e == "string") {
			this.editor.extensionManager.extensions.forEach((e) => {
				var t;
				return (t = tA(e)) == null || (t = t.parse) == null || (t = t.setup) == null ? void 0 : t.call({
					editor: this.editor,
					options: e.options
				}, this.md);
			});
			let n = jk(this.md.render(e));
			return this.editor.extensionManager.extensions.forEach((e) => {
				var t;
				return (t = tA(e)) == null || (t = t.parse) == null || (t = t.updateDOM) == null ? void 0 : t.call({
					editor: this.editor,
					options: e.options
				}, n);
			}), this.normalizeDOM(n, {
				inline: t,
				content: e
			}), n.innerHTML;
		}
		return e;
	}
	normalizeDOM(e, t) {
		let { inline: n, content: r } = t;
		return this.normalizeBlocks(e), e.querySelectorAll("*").forEach((e) => {
			e.nextSibling?.nodeType === Node.TEXT_NODE && !e.closest("pre") && (e.nextSibling.textContent = e.nextSibling.textContent.replace(/^\n/, ""));
		}), n && this.normalizeInline(e, r), e;
	}
	normalizeBlocks(e) {
		let t = Object.values(this.editor.schema.nodes).filter((e) => e.isBlock).map((e) => e.spec.parseDOM?.map((e) => e.tag)).flat().filter(Boolean).join(",");
		t && [...e.querySelectorAll(t)].forEach((e) => {
			e.parentElement.matches("p") && Nk(e);
		});
	}
	normalizeInline(e, t) {
		var n;
		if ((n = e.firstElementChild) != null && n.matches("p")) {
			let n = e.firstElementChild, { nextElementSibling: r } = n, i = t.match(/^\s+/)?.[0] ?? "", a = r ? "" : t.match(/\s+$/)?.[0] ?? "";
			if (t.match(/^\n\n/)) {
				n.innerHTML = `${n.innerHTML}${a}`;
				return;
			}
			Pk(n), e.innerHTML = `${i}${e.innerHTML}${a}`;
		}
	}
	withPatchedRenderer(e) {
		let t = (e) => function() {
			let t = e(...arguments);
			return t === "\n" ? t : t[t.length - 1] === "\n" ? t.slice(0, -1) : t;
		};
		return e.renderer.rules.hardbreak = t(e.renderer.rules.hardbreak), e.renderer.rules.softbreak = t(e.renderer.rules.softbreak), e.renderer.rules.fence = t(e.renderer.rules.fence), e.renderer.rules.code_block = t(e.renderer.rules.code_block), e.renderer.renderToken = t(e.renderer.renderToken.bind(e.renderer)), e;
	}
}, iA = Y.create({
	name: "markdownClipboard",
	addOptions() {
		return {
			transformPastedText: !1,
			transformCopiedText: !1
		};
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new uc("markdownClipboard"),
			props: {
				clipboardTextParser: (e, t, n) => {
					if (n || !this.options.transformPastedText) return null;
					let r = this.editor.storage.markdown.parser.parse(e, { inline: !0 });
					return oo.fromSchema(this.editor.schema).parseSlice(jk(r), {
						preserveWhitespace: !0,
						context: t
					});
				},
				clipboardTextSerializer: (e) => this.options.transformCopiedText ? this.editor.storage.markdown.serializer.serialize(e.content) : null
			}
		})];
	}
}), aA = Y.create({
	name: "markdown",
	priority: 50,
	addOptions() {
		return {
			html: !0,
			tightLists: !0,
			tightListClass: "tight",
			bulletListMarker: "-",
			linkify: !1,
			breaks: !1,
			transformPastedText: !1,
			transformCopiedText: !1
		};
	},
	addCommands() {
		let e = n_.Commands.config.addCommands();
		return {
			setContent: (t, n) => (r) => e.setContent(r.editor.storage.markdown.parser.parse(t), n)(r),
			insertContentAt: (t, n, r) => (i) => e.insertContentAt(t, i.editor.storage.markdown.parser.parse(n, { inline: !0 }), r)(i)
		};
	},
	onBeforeCreate() {
		this.editor.storage.markdown = {
			options: { ...this.options },
			parser: new rA(this.editor, this.options),
			serializer: new nA(this.editor),
			getMarkdown: () => this.editor.storage.markdown.serializer.serialize(this.editor.state.doc)
		}, this.editor.options.initialContent = this.editor.options.content, this.editor.options.content = this.editor.storage.markdown.parser.parse(this.editor.options.content);
	},
	onCreate() {
		this.editor.options.content = this.editor.options.initialContent, delete this.editor.options.initialContent;
	},
	addStorage() {
		return {};
	},
	addExtensions() {
		return [xk.configure({
			tight: this.options.tightLists,
			tightClass: this.options.tightListClass
		}), iA.configure({
			transformPastedText: this.options.transformPastedText,
			transformCopiedText: this.options.transformCopiedText
		})];
	}
});
//#endregion
//#region lib/hooks/useTiptapEditor.ts
function oA({ inputText: e, setInputText: t, onSend: n, disabled: r, maxLength: i, extraExtensionsRef: a, inputRef: s, isSuggestionActiveRef: l }) {
	let d = g(), f = u(null), p = u(null), m = u(""), h = u(e), _ = u(t);
	c(() => {
		_.current = t;
	}, [t]);
	let v = u(n);
	c(() => {
		v.current = n;
	}, [n]), o(() => {
		let e = f.current;
		if (!e) return;
		let t = d.formatMessage({ id: "ibexa.ai_assistant.chat_input.placeholder" }), n = new g_({
			element: e,
			extensions: [
				hk.configure({
					heading: !1,
					horizontalRule: !1
				}),
				WE.configure({
					openOnClick: !1,
					linkOnPaste: !0,
					autolink: !0
				}),
				gk.configure({ limit: i }),
				aA.configure({
					html: !1,
					tightLists: !0,
					transformCopiedText: !0,
					transformPastedText: !0
				}),
				...a?.current ? [a.current] : []
			],
			autofocus: !0,
			editable: !r,
			content: h.current,
			editorProps: {
				attributes: {
					role: "textbox",
					"aria-multiline": "true",
					"data-placeholder": t,
					class: "ibexa-ai-assistant-chat-input__editor"
				},
				handleKeyDown(e, t) {
					return t.key === "Enter" && !t.shiftKey ? !l?.current && (v.current?.(), !0) : t.key === "Enter" && t.shiftKey ? (p.current?.chain().setHardBreak().run(), !0) : !1;
				}
			},
			onUpdate({ editor: e }) {
				let t = e.storage.markdown.getMarkdown();
				m.current = t, _.current(t);
			}
		});
		p.current = n, s.set(n.view.dom);
		let o = typeof ResizeObserver < "u" ? new ResizeObserver(() => {
			requestAnimationFrame(() => {
				if (n.isDestroyed || !n.isEditable || n.isFocused) return;
				let e = document.activeElement;
				(!e || e === document.body || e === document.documentElement) && n.commands.focus();
			});
		}) : null;
		return o?.observe(e), n.view.dom._tiptapType = (e) => {
			for (let t of e) {
				let { state: e } = n;
				n.view.dispatch(e.tr.insertText(t, e.selection.from, e.selection.to));
			}
		}, () => {
			o?.disconnect(), s.set(null), n.destroy(), p.current = null;
		};
	}, []);
	let y = u(r);
	return o(() => {
		let e = p.current;
		if (!(!e || e.isDestroyed)) {
			if (e.setEditable(!r), e.view.dom.setAttribute("aria-disabled", r ? "true" : "false"), y.current && !r) {
				let t = document.activeElement;
				(!t || t === document.body || t === document.documentElement) && e.commands.focus();
			}
			y.current = r;
		}
	}, [r]), o(() => {
		let t = p.current;
		!t || t.isDestroyed || e !== m.current && (m.current = e, t.commands.setContent(e));
	}, [e]), { containerRef: f };
}
//#endregion
//#region lib/components/ChatInput/ChatInput.tsx
var sA = () => Promise.resolve(void 0), cA = (e, t) => e.priority === void 0 && t.priority === void 0 ? 0 : e.priority === void 0 ? 1 : t.priority === void 0 ? -1 : e.priority - t.priority, lA = ({ label: e, onClick: t, icon: n, shortcut: r, disabled: i, onSelect: a }) => (wi(r ?? "", t, { enabled: !!r && !i }), /* @__PURE__ */ m(Ye, {
	title: bt(e, r ?? ""),
	onClick: () => {
		t(), a?.();
	},
	disabled: i,
	labelled: !0,
	children: [n, e]
})), uA = ({ onSend: e, disabled: t, inputActions: n, onUploadFile: r = sA, onDeleteFile: s = sA, fetchAgents: c }) => {
	let f = g(), [h, _] = a(Or), [v, y] = a(kr), { hasLock: b, toggleLock: x, isLocked: S } = a(Dr), { modes: C, text: w, inputRef: T, SpeechRecognitionClass: E } = a(re), [D, O] = d(!1), k = u(null), A = l(() => ({ delete: (e) => {
		let t = v.find((t) => t.id === e);
		t && s(t.id).catch(console.error), y((t) => t.filter((t) => t.id !== e));
	} }), [
		v,
		y,
		s
	]), j = (e) => {
		x(Er.VOICE_INPUT, e);
	}, ee = b(Er.VOICE_INPUT), te = t || S(), ne = l(() => [...n ?? []].sort(cA), [n]), ie = ne.length > 0, M = C.includes("file"), ae = M || ie, N = D && !t, oe = i(() => O(!1), []);
	t && D && O(!1), C.includes("text") || console.warn("\"text\" input mode is required.");
	let { mentionExtensionRef: se, mentionListRef: ce, mentionPopup: le, mentionActiveRef: P } = JC(c), { containerRef: ue } = oA({
		inputText: h,
		setInputText: _,
		onSend: e,
		disabled: t,
		maxLength: w.maxLength,
		extraExtensionsRef: se,
		inputRef: T,
		isSuggestionActiveRef: P
	}), de = i((e) => {
		e.forEach((e) => {
			r(e.file).catch(console.error);
		}), y((t) => [...t, ...e]), oe();
	}, [
		y,
		r,
		oe
	]);
	return o(() => {
		let e = h.trim() !== "" || v.length > 0;
		x(Er.INPUT, !e);
	}, [
		h,
		v,
		x
	]), o(() => {
		if (!N) return;
		let e = (e) => {
			k.current && !k.current.contains(e.target) && oe();
		}, t = (e) => {
			e.key === "Escape" && oe();
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [N, oe]), /* @__PURE__ */ m("div", {
		className: "ibexa-ai-assistant-chat-input",
		children: [
			le && /* @__PURE__ */ p(ra, {
				ref: ce,
				items: le.items,
				loading: le.loading,
				command: le.command,
				rect: le.rect
			}),
			/* @__PURE__ */ p(wt.Provider, {
				value: A,
				children: /* @__PURE__ */ p(na, { files: v })
			}),
			/* @__PURE__ */ m("div", {
				className: Je({
					"ibexa-ai-assistant-chat-input__controls": !0,
					"ibexa-ai-assistant-chat-input__controls--recording": ee
				}),
				children: [
					!ee && ae && /* @__PURE__ */ m("div", {
						className: "ibexa-ai-assistant-chat-input__toolbar",
						ref: k,
						children: [/* @__PURE__ */ m("div", {
							className: Je({
								"ibexa-ai-assistant-chat-input__actions-menu": !0,
								"ibexa-ai-assistant-chat-input__actions-menu--open": N
							}),
							"aria-hidden": !N,
							children: [
								M && /* @__PURE__ */ p(ta, {
									onUpload: de,
									disabled: t
								}),
								M && ie && /* @__PURE__ */ p("div", {
									className: "ibexa-ai-assistant-chat-input__actions-menu-divider",
									role: "separator"
								}),
								ne.map((e) => /* @__PURE__ */ p(lA, {
									...e,
									disabled: t,
									onSelect: oe
								}, e.label))
							]
						}), /* @__PURE__ */ p(Ye, {
							className: "ibexa-ai-assistant-chat-input__actions-toggle",
							title: f.formatMessage({ id: N ? "ibexa.ai_assistant.chat_input.actions_menu.close" : "ibexa.ai_assistant.chat_input.actions_menu.open" }),
							onClick: () => O((e) => !e),
							disabled: t,
							"aria-haspopup": !0,
							"aria-expanded": N,
							children: /* @__PURE__ */ p(mt, { name: N ? "discard" : "plus" })
						})]
					}),
					/* @__PURE__ */ p("div", {
						className: Je({
							"ibexa-ai-assistant-chat-input__textarea-wrapper": !0,
							"ibexa-ai-assistant-chat-input__textarea-wrapper--hidden": ee,
							"ibexa-ai-assistant-chat-input__textarea-wrapper--fixed": w.growth === "fixed"
						}),
						children: /* @__PURE__ */ p("div", { ref: ue })
					}),
					C.includes("voice") && E.isSupported() && /* @__PURE__ */ p(ea, {
						disabled: t,
						onListeningChange: j
					}),
					!ee && /* @__PURE__ */ p(qi, {
						onClick: e,
						disabled: te
					})
				]
			})
		]
	});
}, dA = () => {
	let e = g();
	return /* @__PURE__ */ p("div", {
		className: "ibexa-ai-assistant-message ibexa-ai-assistant-message-renderer-error",
		children: /* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-message__content",
			children: e.formatMessage({ id: "ibexa.ai_assistant.error.message" })
		})
	});
}, fA = 100, pA = ({ conversationId: e, draft: t = !1, loading: n = !1, messages: r, onNextPage: i, endOfResults: a = !1 }) => {
	let s = u(null), c = u(null), l = r.at(-1)?.id ?? null;
	return o(() => {
		n || !s.current || s.current.scrollTo({
			top: s.current.scrollHeight,
			behavior: "smooth"
		});
	}, [l, n]), o(() => {
		let e = c.current, t = s.current;
		if (!e || !t) return;
		let n = new MutationObserver(() => {
			t.scrollHeight - t.scrollTop - t.clientHeight <= fA && (t.scrollTop = t.scrollHeight);
		});
		return n.observe(e, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), () => n.disconnect();
	}, []), /* @__PURE__ */ p(Vi, {
		className: "ibexa-ai-assistant-chat-messages",
		contentVersion: r.length.toString(),
		loadMore: i,
		endOfResults: a,
		elementAs: "div",
		listAs: "div",
		listRef: s,
		triggerPosition: "top",
		initialPosition: "bottom",
		isExternalLoading: n,
		isLoadingInitially: !t,
		children: /* @__PURE__ */ p("div", {
			ref: c,
			className: "ibexa-ai-assistant-chat-messages__content",
			children: r.map((e) => /* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-chat-messages__item",
				children: /* @__PURE__ */ p(le, {
					fallback: /* @__PURE__ */ p(dA, {}),
					children: /* @__PURE__ */ p(Lr, {
						type: e.type,
						message: e
					})
				})
			}, e.id))
		})
	}, e);
}, mA = 10, hA = ({ allowConversationManagement: e = !1, allowFullscreen: t, backdrop: n = !1, closeable: r = !0, fetchAgents: s, height: c, inputActions: f, messageActions: h = [], layout: g, open: _, position: v = {}, setOpen: y, title: b, welcomeMessage: x = Ri, welcomeMessageSuggestions: S = zi, width: C }) => {
	let w = g === "fullscreen", T = u(void 0), E = l(() => L.createWelcomeMessage(x, S), [x, S]), [D, O] = d([]), [k, A] = d(!1), [j, ee] = d(!1), [te, ne] = d(!1), [re, ie] = d(!1), [M, ae] = d(w), N = u(/* @__PURE__ */ new Set()), oe = i(() => {
		ee(!1);
	}, []), { onCreateConversationError: se, onSendMessageError: ce, onLoadMessagesError: le } = He(oe), { currentConversation: P, setCurrentConversation: ue, newConversation: de } = a(Be), [F, fe] = a(Or), [R, pe] = a(kr), { addLock: me, removeLock: he } = a(Dr), [ge, _e] = d(P.draft ? P.id : void 0), ve = l(() => ge === P.id ? D : [], [
		ge,
		P.id,
		D
	]), ye = l(() => j ? [...ve, L.createLoadingMessage(`__agent-loading__-${P.id}`, "assistant")] : ve, [ve, j]), be = l(() => ge !== P.id || te, [
		ge,
		P.id,
		te
	]), xe = Je({
		"ibexa-ai-assistant-chat-window": !0,
		[`ibexa-ai-assistant-chat-window--${M ? "fullscreen" : g}`]: !0,
		"ibexa-ai-assistant-chat-window--with-sidebar": e
	}), Se = i(() => {
		fe(""), pe([]), A(!1);
	}, [fe, pe]), Ce = i(() => {
		if (!F.trim() && R.length === 0) return;
		A(!0), me(Er.SEND_MESSAGE), ee(!0), N.current.clear();
		let e = I(), t = R.map(({ file: e }) => e), n = Li(F);
		if (P.draft) {
			let r = F ? L.createTextMessage(e, "user", F) : L.createLoadingMessage(e, "user");
			O((e) => [...e, r]), de(e, F, t, n).then(Se).catch((t) => {
				A(!1), O((t) => t.filter((t) => t.id !== e)), se(t), he(Er.SEND_MESSAGE), oe();
			});
			return;
		}
		P.service.send(e, F, t, n).then(Se).catch((e) => {
			A(!1), ce(e), he(Er.SEND_MESSAGE), oe();
		});
	}, [
		F,
		R,
		P,
		ce,
		de,
		se,
		Se,
		oe,
		me,
		he
	]), we = i(() => Promise.resolve(void 0), []), Te = i(() => Promise.resolve(), []), Ee = i(() => P.draft || T.current === void 0 ? Promise.resolve({ done: !0 }) : (A(!0), P.service.getHistory(T.current, mA).then(({ messages: e, nextCursor: t, hasMore: n }) => (T.current = t ?? void 0, O((t) => [...e, ...t]), ie(!n), { done: !n })).catch((e) => (le(e), { done: !0 })).finally(() => {
		A(!1);
	})), [P, le]), De = i(() => {
		y(!1);
	}, [y]), Oe = i(() => {
		r && y(!1);
	}, [r, y]), ke = i(() => !(ve.length === 0 || ve.length === 1 && ve[0].role === "assistant"), [ve]), Ae = i(() => {
		ke() && ue(null);
	}, [ke, ue]), je = i(() => {
		ae(!M);
	}, [M]);
	if (o(() => {
		if (T.current = void 0, _e(P.id), oe(), P.draft) {
			O([E]), ie(!0);
			return;
		}
		let e = !1;
		return O([]), ne(!0), A(!0), P.service.getHistory().then(({ messages: t, nextCursor: n, hasMore: r }) => {
			e || (T.current = n ?? void 0, O(t), ie(!r));
		}).catch((e) => {
			le(e);
		}).finally(() => {
			e || (A(!1), ne(!1));
		}), () => {
			e = !0;
		};
	}, [
		P.id,
		le,
		E
	]), o(() => {
		if (P.draft) return;
		let e = !0, t = P.service.onMessage((t, n) => {
			e && n && (fe(""), A(!1), e = !1), t.role === "assistant" && t.status === "done" ? (oe(), t.type !== "streamed_text" && he(Er.SEND_MESSAGE)) : t.role === "assistant" && t.status === "pending" ? oe() : t.status === "failed" ? (t.role === "tool" && N.current.delete(t.id), oe()) : t.role === "tool" && (t.status === "pending" ? (N.current.add(t.id), oe()) : (N.current.delete(t.id), N.current.size === 0 && ee(!0))), O((e) => {
				let n = e.findIndex((e) => e.id === t.id), r = [...e];
				return n === -1 ? r.push(t) : r[n] = t, r;
			});
		});
		return () => {
			t();
		};
	}, [
		P,
		O,
		fe,
		he
	]), o(() => {
		let e = M && _;
		return window.document.body.classList.toggle("ibexa-ai-assistant-fullscreen", e), () => {
			window.document.body.classList.remove("ibexa-ai-assistant-fullscreen");
		};
	}, [M, _]), o(() => {
		w && ae(!0);
	}, [w]), Ti("deactivate", () => {
		y(!1);
	}, {
		preventDefault: !0,
		enableOnFormTags: !0,
		enabled: r
	}, [r]), !_) return null;
	let Me = {
		width: C,
		height: c
	};
	return v.x !== void 0 && (Me.left = v.x), v.y !== void 0 && (Me.top = v.y), /* @__PURE__ */ m(Zt.Provider, {
		value: h,
		children: [n && g !== "embedded" && /* @__PURE__ */ p("div", {
			className: "ibexa-ai-assistant-chat-window__backdrop",
			onClick: Oe,
			role: "presentation",
			"aria-hidden": "true"
		}), /* @__PURE__ */ m("div", {
			className: xe,
			style: Me,
			children: [e && M && /* @__PURE__ */ p(Ki, { onNewConversation: Ae }), /* @__PURE__ */ m("main", {
				className: "ibexa-ai-assistant-chat-window__main",
				children: [
					/* @__PURE__ */ p(Fi, {
						newConversationVisible: e && !M,
						fullscreenVisible: !!t,
						closeVisible: r,
						fullscreen: M,
						onClose: De,
						onFullscreenChange: je,
						onNewConversation: Ae,
						title: b
					}),
					/* @__PURE__ */ p(pA, {
						conversationId: P.id,
						draft: P.draft,
						messages: ye,
						loading: be,
						onNextPage: Ee,
						endOfResults: re
					}),
					/* @__PURE__ */ p(uA, {
						onSend: Ce,
						disabled: k,
						inputActions: f,
						fetchAgents: s,
						onUploadFile: we,
						onDeleteFile: Te
					})
				]
			})]
		})]
	});
}, gA = ({ onClick: e }) => {
	let t = g();
	return Ti("activate", e, {
		preventDefault: !0,
		enableOnFormTags: !0
	}), /* @__PURE__ */ m("button", {
		className: "ibexa-ai-assistant-chatbot-toggle",
		onClick: e,
		children: [
			/* @__PURE__ */ p(mt, {
				name: "assistant",
				type: "primary",
				size: "medium"
			}),
			/* @__PURE__ */ p("span", { children: t.formatMessage({ id: "ibexa.ai_assistant.chatbox_toggle.label" }) }),
			/* @__PURE__ */ p("div", {
				className: "ibexa-ai-assistant-chatbot-toggle__chevron",
				children: /* @__PURE__ */ p(mt, { name: "chevronDown" })
			})
		]
	});
}, _A = {
	en: "en-US",
	es: "es-ES",
	fr: "fr-FR",
	de: "de-DE"
}, vA = r(({ adapter: e, allowConversationManagement: t = !1, allowFullscreen: n = !1, avatar: r, backdrop: a = !1, closeable: c, currentUser: f = {
	id: "",
	name: ""
}, height: h, initialConversationId: g, inputConfig: _, inputActions: v, messageActions: y, isOpen: b = !0, layout: x = ue, locale: S, messageComponents: C = {}, inputPreviewComponents: w = {}, translations: T, onConfirmation: E = ae, onConversationChange: D, onError: O, onOpenChange: k, onClose: A, position: j, title: ee = "Assistant", welcomeMessage: te, welcomeMessageSuggestions: ne, width: re, hotkeys: ie = {} }, M) => {
	let N = x !== "floating" && x !== "sidebar", se = x === "fullscreen", [ce, le] = d(N || b), P = i((...e) => {
		N || le(...e);
	}, [N, le]), de = i(() => {
		P((e) => !e);
	}, [P]), F = l(() => ({
		name: r?.name ?? ee,
		imageUrl: r?.imageUrl
	}), [r, ee]), fe = l(() => ({ onError: O ?? (() => {}) }), [O]), I = l(() => {
		if (_?.voice?.lang) return _;
		let e = _A[S ?? "en"] ?? "en-US";
		return {
			..._ ?? {},
			voice: {
				..._?.voice ?? {},
				lang: e
			}
		};
	}, [_, S]), L = i((e) => {
		O ? O(new oe("general", "Error rendering Assistant component", e)) : console.error(e);
	}, [O]);
	o(() => {
		P(b);
	}, [b, P]), o(() => {
		N && (b || console.warn("Assistant component is set to always open due to embedded layout. The isOpen prop will be ignored."), c && console.warn("Assistant component is set to always open due to embedded layout. The closeable prop will be ignored.")), se && !n && console.warn("Assistant component is set to fullscreen layout but allowFullscreen is false. The allowFullscreen prop will be ignored.");
	}, [
		N,
		b,
		le,
		c,
		se,
		n
	]), o(() => {
		N && !ce && le(!0);
	}, [
		N,
		ce,
		le
	]), o(() => {
		k?.(ce);
	}, [ce, k]);
	let pe = u(ce);
	if (o(() => {
		pe.current && !ce && A?.(), pe.current = ce;
	}, [ce, A]), s(M, () => ({
		isOpen: () => ce,
		open: () => P(!0),
		close: () => P(!1),
		toggle: de
	}), [
		ce,
		de,
		P
	]), !e) {
		console.error("No adapter provided to Assistant component");
		return;
	}
	let me = x === "floating" && !ce, he = e.constructor.name;
	return /* @__PURE__ */ m(Jr, {
		errorFallbackHandler: L,
		locale: S,
		translations: T,
		errorMemo: fe,
		onConfirmation: E,
		avatarMemo: F,
		currentUser: f,
		hotkeys: ie,
		messageComponents: C,
		inputPreviewComponents: w,
		adapterKey: he,
		adapter: e,
		initialConversationId: g,
		inputConfig: I,
		onConversationChange: D,
		children: [ce && /* @__PURE__ */ p(hA, {
			title: ee,
			open: ce,
			setOpen: P,
			layout: x,
			width: re,
			height: h,
			position: j,
			closeable: !N && c,
			backdrop: a,
			allowFullscreen: !se && n,
			allowConversationManagement: t,
			welcomeMessage: te,
			welcomeMessageSuggestions: ne,
			inputActions: v,
			messageActions: y,
			fetchAgents: e.supports(R.CAPABILITY_FETCH_AGENTS) ? e.fetchAgents?.bind(e) : void 0
		}), me && /* @__PURE__ */ p(gA, { onClick: de })]
	});
});
//#endregion
export { R as AbstractAdapter, he as AbstractConversation, vA as Assistant, Ht as Avatar, uA as ChatInput, pA as ChatMessages, gA as ChatbotToggle, hA as ChatbotWindow, Rr as CompoundMessage, pe as ConversationEmitter, Ae as EchoAdapter, Br as ErrorMessage, ta as FileInput, Oe as IbexaAdapter, Pr as ImageMessage, Vr as LoadingMessage, Qt as MessageContainer, me as MessageEmitter, ze as OpenAIAdapter, qi as SendButton, qt as Spinner, Ar as StreamedTextMessage, Tr as TextMessage, Hr as ToolMessage, ea as VoiceInput, Nr as WelcomeMessage };
