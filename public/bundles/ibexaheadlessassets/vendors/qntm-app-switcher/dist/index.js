import "./index.css";
import * as l from "react";
import lo, { forwardRef as fo, createElement as Zt, useLayoutEffect as go, useEffect as uo, useState as Nn, createContext as Co, useContext as wo } from "react";
import * as Yn from "react-dom";
import ho from "react-dom";
var Ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yt = { exports: {} }, Fe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _t;
function vo() {
  if (_t) return Fe;
  _t = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(r, o, A) {
    var a = null;
    if (A !== void 0 && (a = "" + A), o.key !== void 0 && (a = "" + o.key), "key" in o) {
      A = {};
      for (var i in o)
        i !== "key" && (A[i] = o[i]);
    } else A = o;
    return o = A.ref, {
      $$typeof: e,
      type: r,
      key: a,
      ref: o !== void 0 ? o : null,
      props: A
    };
  }
  return Fe.Fragment = t, Fe.jsx = n, Fe.jsxs = n, Fe;
}
var He = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $t;
function po() {
  return $t || ($t = 1, process.env.NODE_ENV !== "production" && function() {
    function e(w) {
      if (w == null) return null;
      if (typeof w == "function")
        return w.$$typeof === F ? null : w.displayName || w.name || null;
      if (typeof w == "string") return w;
      switch (w) {
        case d:
          return "Fragment";
        case v:
          return "Profiler";
        case h:
          return "StrictMode";
        case Q:
          return "Suspense";
        case P:
          return "SuspenseList";
        case H:
          return "Activity";
      }
      if (typeof w == "object")
        switch (typeof w.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), w.$$typeof) {
          case B:
            return "Portal";
          case m:
            return (w.displayName || "Context") + ".Provider";
          case D:
            return (w._context.displayName || "Context") + ".Consumer";
          case E:
            var y = w.render;
            return w = w.displayName, w || (w = y.displayName || y.name || "", w = w !== "" ? "ForwardRef(" + w + ")" : "ForwardRef"), w;
          case I:
            return y = w.displayName || null, y !== null ? y : e(w.type) || "Memo";
          case x:
            y = w._payload, w = w._init;
            try {
              return e(w(y));
            } catch {
            }
        }
      return null;
    }
    function t(w) {
      return "" + w;
    }
    function n(w) {
      try {
        t(w);
        var y = !1;
      } catch {
        y = !0;
      }
      if (y) {
        y = console;
        var O = y.error, j = typeof Symbol == "function" && Symbol.toStringTag && w[Symbol.toStringTag] || w.constructor.name || "Object";
        return O.call(
          y,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          j
        ), t(w);
      }
    }
    function r(w) {
      if (w === d) return "<>";
      if (typeof w == "object" && w !== null && w.$$typeof === x)
        return "<...>";
      try {
        var y = e(w);
        return y ? "<" + y + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var w = T.A;
      return w === null ? null : w.getOwner();
    }
    function A() {
      return Error("react-stack-top-frame");
    }
    function a(w) {
      if (Y.call(w, "key")) {
        var y = Object.getOwnPropertyDescriptor(w, "key").get;
        if (y && y.isReactWarning) return !1;
      }
      return w.key !== void 0;
    }
    function i(w, y) {
      function O() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          y
        ));
      }
      O.isReactWarning = !0, Object.defineProperty(w, "key", {
        get: O,
        configurable: !0
      });
    }
    function c() {
      var w = e(this.type);
      return L[w] || (L[w] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), w = this.props.ref, w !== void 0 ? w : null;
    }
    function s(w, y, O, j, X, V, Oe, Ce) {
      return O = V.ref, w = {
        $$typeof: C,
        type: w,
        key: y,
        props: V,
        _owner: X
      }, (O !== void 0 ? O : null) !== null ? Object.defineProperty(w, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(w, "ref", { enumerable: !1, value: null }), w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(w, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(w, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Oe
      }), Object.defineProperty(w, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Ce
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    }
    function f(w, y, O, j, X, V, Oe, Ce) {
      var N = y.children;
      if (N !== void 0)
        if (j)
          if (R(N)) {
            for (j = 0; j < N.length; j++)
              g(N[j]);
            Object.freeze && Object.freeze(N);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g(N);
      if (Y.call(y, "key")) {
        N = e(w);
        var ee = Object.keys(y).filter(function(Ye) {
          return Ye !== "key";
        });
        j = 0 < ee.length ? "{key: someKey, " + ee.join(": ..., ") + ": ...}" : "{key: someKey}", k[N + j] || (ee = 0 < ee.length ? "{" + ee.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          j,
          N,
          ee,
          N
        ), k[N + j] = !0);
      }
      if (N = null, O !== void 0 && (n(O), N = "" + O), a(y) && (n(y.key), N = "" + y.key), "key" in y) {
        O = {};
        for (var we in y)
          we !== "key" && (O[we] = y[we]);
      } else O = y;
      return N && i(
        O,
        typeof w == "function" ? w.displayName || w.name || "Unknown" : w
      ), s(
        w,
        N,
        V,
        X,
        o(),
        O,
        Oe,
        Ce
      );
    }
    function g(w) {
      typeof w == "object" && w !== null && w.$$typeof === C && w._store && (w._store.validated = 1);
    }
    var u = lo, C = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), m = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), F = Symbol.for("react.client.reference"), T = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = Object.prototype.hasOwnProperty, R = Array.isArray, M = console.createTask ? console.createTask : function() {
      return null;
    };
    u = {
      "react-stack-bottom-frame": function(w) {
        return w();
      }
    };
    var U, L = {}, G = u["react-stack-bottom-frame"].bind(
      u,
      A
    )(), b = M(r(A)), k = {};
    He.Fragment = d, He.jsx = function(w, y, O, j, X) {
      var V = 1e4 > T.recentlyCreatedOwnerStacks++;
      return f(
        w,
        y,
        O,
        !1,
        j,
        X,
        V ? Error("react-stack-top-frame") : G,
        V ? M(r(w)) : b
      );
    }, He.jsxs = function(w, y, O, j, X) {
      var V = 1e4 > T.recentlyCreatedOwnerStacks++;
      return f(
        w,
        y,
        O,
        !0,
        j,
        X,
        V ? Error("react-stack-top-frame") : G,
        V ? M(r(w)) : b
      );
    };
  }()), He;
}
process.env.NODE_ENV === "production" ? yt.exports = vo() : yt.exports = po();
var p = yt.exports;
function Eo(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, A;
  for (A = 0; A < r.length; A++)
    o = r[A], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
var mo = ["color"], Do = /* @__PURE__ */ fo(function(e, t) {
  var n = e.color, r = n === void 0 ? "currentColor" : n, o = Eo(e, mo);
  return Zt("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Zt("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: r,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
function Ae(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function en(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function jn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const A = en(o, t);
      return !n && typeof A == "function" && (n = !0), A;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const A = r[o];
          typeof A == "function" ? A() : en(e[o], null);
        }
      };
  };
}
function le(...e) {
  return l.useCallback(jn(...e), e);
}
function Un(e, t = []) {
  let n = [];
  function r(A, a) {
    const i = l.createContext(a), c = n.length;
    n = [...n, a];
    const s = (g) => {
      var v;
      const { scope: u, children: C, ...B } = g, d = ((v = u == null ? void 0 : u[e]) == null ? void 0 : v[c]) || i, h = l.useMemo(() => B, Object.values(B));
      return /* @__PURE__ */ p.jsx(d.Provider, { value: h, children: C });
    };
    s.displayName = A + "Provider";
    function f(g, u) {
      var d;
      const C = ((d = u == null ? void 0 : u[e]) == null ? void 0 : d[c]) || i, B = l.useContext(C);
      if (B) return B;
      if (a !== void 0) return a;
      throw new Error(`\`${g}\` must be used within \`${A}\``);
    }
    return [s, f];
  }
  const o = () => {
    const A = n.map((a) => l.createContext(a));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || A;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, Qo(o, ...t)];
}
function Qo(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(A) {
      const a = r.reduce((i, { useScope: c, scopeName: s }) => {
        const g = c(A)[`__scope${s}`];
        return { ...i, ...g };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Jn(e) {
  const t = /* @__PURE__ */ Io(e), n = l.forwardRef((r, o) => {
    const { children: A, ...a } = r, i = l.Children.toArray(A), c = i.find(Po);
    if (c) {
      const s = c.props.children, f = i.map((g) => g === c ? l.Children.count(s) > 1 ? l.Children.only(null) : l.isValidElement(s) ? s.props.children : null : g);
      return /* @__PURE__ */ p.jsx(t, { ...a, ref: o, children: l.isValidElement(s) ? l.cloneElement(s, void 0, f) : null });
    }
    return /* @__PURE__ */ p.jsx(t, { ...a, ref: o, children: A });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Io(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...A } = n;
    if (l.isValidElement(o)) {
      const a = xo(o), i = bo(A, o.props);
      return o.type !== l.Fragment && (i.ref = r ? jn(r, a) : a), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var yo = Symbol("radix.slottable");
function Po(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === yo;
}
function bo(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], A = t[r];
    /^on[A-Z]/.test(r) ? o && A ? n[r] = (...i) => {
      A(...i), o(...i);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...A } : r === "className" && (n[r] = [o, A].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function xo(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Mo = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], re = Mo.reduce((e, t) => {
  const n = /* @__PURE__ */ Jn(`Primitive.${t}`), r = l.forwardRef((o, A) => {
    const { asChild: a, ...i } = o, c = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p.jsx(c, { ...i, ref: A });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Oo(e, t) {
  e && Yn.flushSync(() => e.dispatchEvent(t));
}
function ie(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function So(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ie(e);
  l.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Fo = "DismissableLayer", Pt = "dismissableLayer.update", Ho = "dismissableLayer.pointerDownOutside", Lo = "dismissableLayer.focusOutside", tn, Kn = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Vn = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: A,
      onInteractOutside: a,
      onDismiss: i,
      ...c
    } = e, s = l.useContext(Kn), [f, g] = l.useState(null), u = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, C] = l.useState({}), B = le(t, (I) => g(I)), d = Array.from(s.layers), [h] = [...s.layersWithOutsidePointerEventsDisabled].slice(-1), v = d.indexOf(h), D = f ? d.indexOf(f) : -1, m = s.layersWithOutsidePointerEventsDisabled.size > 0, E = D >= v, Q = To((I) => {
      const x = I.target, H = [...s.branches].some((F) => F.contains(x));
      !E || H || (o == null || o(I), a == null || a(I), I.defaultPrevented || i == null || i());
    }, u), P = ko((I) => {
      const x = I.target;
      [...s.branches].some((F) => F.contains(x)) || (A == null || A(I), a == null || a(I), I.defaultPrevented || i == null || i());
    }, u);
    return So((I) => {
      D === s.layers.size - 1 && (r == null || r(I), !I.defaultPrevented && i && (I.preventDefault(), i()));
    }, u), l.useEffect(() => {
      if (f)
        return n && (s.layersWithOutsidePointerEventsDisabled.size === 0 && (tn = u.body.style.pointerEvents, u.body.style.pointerEvents = "none"), s.layersWithOutsidePointerEventsDisabled.add(f)), s.layers.add(f), nn(), () => {
          n && s.layersWithOutsidePointerEventsDisabled.size === 1 && (u.body.style.pointerEvents = tn);
        };
    }, [f, u, n, s]), l.useEffect(() => () => {
      f && (s.layers.delete(f), s.layersWithOutsidePointerEventsDisabled.delete(f), nn());
    }, [f, s]), l.useEffect(() => {
      const I = () => C({});
      return document.addEventListener(Pt, I), () => document.removeEventListener(Pt, I);
    }, []), /* @__PURE__ */ p.jsx(
      re.div,
      {
        ...c,
        ref: B,
        style: {
          pointerEvents: m ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ae(e.onFocusCapture, P.onFocusCapture),
        onBlurCapture: Ae(e.onBlurCapture, P.onBlurCapture),
        onPointerDownCapture: Ae(
          e.onPointerDownCapture,
          Q.onPointerDownCapture
        )
      }
    );
  }
);
Vn.displayName = Fo;
var Ro = "DismissableLayerBranch", Go = l.forwardRef((e, t) => {
  const n = l.useContext(Kn), r = l.useRef(null), o = le(t, r);
  return l.useEffect(() => {
    const A = r.current;
    if (A)
      return n.branches.add(A), () => {
        n.branches.delete(A);
      };
  }, [n.branches]), /* @__PURE__ */ p.jsx(re.div, { ...e, ref: o });
});
Go.displayName = Ro;
function To(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ie(e), r = l.useRef(!1), o = l.useRef(() => {
  });
  return l.useEffect(() => {
    const A = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          zn(
            Ho,
            n,
            s,
            { discrete: !0 }
          );
        };
        const s = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", A);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", A), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function ko(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ie(e), r = l.useRef(!1);
  return l.useEffect(() => {
    const o = (A) => {
      A.target && !r.current && zn(Lo, n, { originalEvent: A }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function nn() {
  const e = new CustomEvent(Pt);
  document.dispatchEvent(e);
}
function zn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, A = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Oo(o, A) : o.dispatchEvent(A);
}
var wt = 0;
function No() {
  l.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? rn()), document.body.insertAdjacentElement("beforeend", e[1] ?? rn()), wt++, () => {
      wt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), wt--;
    };
  }, []);
}
function rn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ht = "focusScope.autoFocusOnMount", Bt = "focusScope.autoFocusOnUnmount", on = { bubbles: !1, cancelable: !0 }, Yo = "FocusScope", Wn = l.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: A,
    ...a
  } = e, [i, c] = l.useState(null), s = ie(o), f = ie(A), g = l.useRef(null), u = le(t, (d) => c(d)), C = l.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  l.useEffect(() => {
    if (r) {
      let d = function(m) {
        if (C.paused || !i) return;
        const E = m.target;
        i.contains(E) ? g.current = E : oe(g.current, { select: !0 });
      }, h = function(m) {
        if (C.paused || !i) return;
        const E = m.relatedTarget;
        E !== null && (i.contains(E) || oe(g.current, { select: !0 }));
      }, v = function(m) {
        if (document.activeElement === document.body)
          for (const Q of m)
            Q.removedNodes.length > 0 && oe(i);
      };
      document.addEventListener("focusin", d), document.addEventListener("focusout", h);
      const D = new MutationObserver(v);
      return i && D.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", d), document.removeEventListener("focusout", h), D.disconnect();
      };
    }
  }, [r, i, C.paused]), l.useEffect(() => {
    if (i) {
      an.add(C);
      const d = document.activeElement;
      if (!i.contains(d)) {
        const v = new CustomEvent(ht, on);
        i.addEventListener(ht, s), i.dispatchEvent(v), v.defaultPrevented || (jo(zo(Xn(i)), { select: !0 }), document.activeElement === d && oe(i));
      }
      return () => {
        i.removeEventListener(ht, s), setTimeout(() => {
          const v = new CustomEvent(Bt, on);
          i.addEventListener(Bt, f), i.dispatchEvent(v), v.defaultPrevented || oe(d ?? document.body, { select: !0 }), i.removeEventListener(Bt, f), an.remove(C);
        }, 0);
      };
    }
  }, [i, s, f, C]);
  const B = l.useCallback(
    (d) => {
      if (!n && !r || C.paused) return;
      const h = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, v = document.activeElement;
      if (h && v) {
        const D = d.currentTarget, [m, E] = Uo(D);
        m && E ? !d.shiftKey && v === E ? (d.preventDefault(), n && oe(m, { select: !0 })) : d.shiftKey && v === m && (d.preventDefault(), n && oe(E, { select: !0 })) : v === D && d.preventDefault();
      }
    },
    [n, r, C.paused]
  );
  return /* @__PURE__ */ p.jsx(re.div, { tabIndex: -1, ...a, ref: u, onKeyDown: B });
});
Wn.displayName = Yo;
function jo(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (oe(r, { select: t }), document.activeElement !== n) return;
}
function Uo(e) {
  const t = Xn(e), n = An(t, e), r = An(t.reverse(), e);
  return [n, r];
}
function Xn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function An(e, t) {
  for (const n of e)
    if (!Jo(n, { upTo: t })) return n;
}
function Jo(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Ko(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function oe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Ko(e) && t && e.select();
  }
}
var an = Vo();
function Vo() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = sn(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = sn(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function sn(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function zo(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ge = globalThis != null && globalThis.document ? l.useLayoutEffect : () => {
}, Wo = l[" useId ".trim().toString()] || (() => {
}), Xo = 0;
function qo(e) {
  const [t, n] = l.useState(Wo());
  return ge(() => {
    n((r) => r ?? String(Xo++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Zo = ["top", "right", "bottom", "left"], ae = Math.min, J = Math.max, $e = Math.round, Je = Math.floor, Z = (e) => ({
  x: e,
  y: e
}), _o = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, $o = {
  start: "end",
  end: "start"
};
function bt(e, t, n) {
  return J(e, ae(t, n));
}
function te(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ne(e) {
  return e.split("-")[0];
}
function Qe(e) {
  return e.split("-")[1];
}
function St(e) {
  return e === "x" ? "y" : "x";
}
function Ft(e) {
  return e === "y" ? "height" : "width";
}
function se(e) {
  return ["top", "bottom"].includes(ne(e)) ? "y" : "x";
}
function Ht(e) {
  return St(se(e));
}
function eA(e, t, n) {
  n === void 0 && (n = !1);
  const r = Qe(e), o = Ht(e), A = Ft(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[A] > t.floating[A] && (a = et(a)), [a, et(a)];
}
function tA(e) {
  const t = et(e);
  return [xt(e), t, xt(t)];
}
function xt(e) {
  return e.replace(/start|end/g, (t) => $o[t]);
}
function nA(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], A = ["top", "bottom"], a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? A : a;
    default:
      return [];
  }
}
function rA(e, t, n, r) {
  const o = Qe(e);
  let A = nA(ne(e), n === "start", r);
  return o && (A = A.map((a) => a + "-" + o), t && (A = A.concat(A.map(xt)))), A;
}
function et(e) {
  return e.replace(/left|right|bottom|top/g, (t) => _o[t]);
}
function oA(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function qn(e) {
  return typeof e != "number" ? oA(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function tt(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function cn(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const A = se(t), a = Ht(t), i = Ft(a), c = ne(t), s = A === "y", f = r.x + r.width / 2 - o.width / 2, g = r.y + r.height / 2 - o.height / 2, u = r[i] / 2 - o[i] / 2;
  let C;
  switch (c) {
    case "top":
      C = {
        x: f,
        y: r.y - o.height
      };
      break;
    case "bottom":
      C = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      C = {
        x: r.x + r.width,
        y: g
      };
      break;
    case "left":
      C = {
        x: r.x - o.width,
        y: g
      };
      break;
    default:
      C = {
        x: r.x,
        y: r.y
      };
  }
  switch (Qe(t)) {
    case "start":
      C[a] -= u * (n && s ? -1 : 1);
      break;
    case "end":
      C[a] += u * (n && s ? -1 : 1);
      break;
  }
  return C;
}
const AA = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: A = [],
    platform: a
  } = n, i = A.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let s = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: g
  } = cn(s, r, c), u = r, C = {}, B = 0;
  for (let d = 0; d < i.length; d++) {
    const {
      name: h,
      fn: v
    } = i[d], {
      x: D,
      y: m,
      data: E,
      reset: Q
    } = await v({
      x: f,
      y: g,
      initialPlacement: r,
      placement: u,
      strategy: o,
      middlewareData: C,
      rects: s,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = D ?? f, g = m ?? g, C = {
      ...C,
      [h]: {
        ...C[h],
        ...E
      }
    }, Q && B <= 50 && (B++, typeof Q == "object" && (Q.placement && (u = Q.placement), Q.rects && (s = Q.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : Q.rects), {
      x: f,
      y: g
    } = cn(s, u, c)), d = -1);
  }
  return {
    x: f,
    y: g,
    placement: u,
    strategy: o,
    middlewareData: C
  };
};
async function Re(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: A,
    rects: a,
    elements: i,
    strategy: c
  } = e, {
    boundary: s = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: g = "floating",
    altBoundary: u = !1,
    padding: C = 0
  } = te(t, e), B = qn(C), h = i[u ? g === "floating" ? "reference" : "floating" : g], v = tt(await A.getClippingRect({
    element: (n = await (A.isElement == null ? void 0 : A.isElement(h))) == null || n ? h : h.contextElement || await (A.getDocumentElement == null ? void 0 : A.getDocumentElement(i.floating)),
    boundary: s,
    rootBoundary: f,
    strategy: c
  })), D = g === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, m = await (A.getOffsetParent == null ? void 0 : A.getOffsetParent(i.floating)), E = await (A.isElement == null ? void 0 : A.isElement(m)) ? await (A.getScale == null ? void 0 : A.getScale(m)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, Q = tt(A.convertOffsetParentRelativeRectToViewportRelativeRect ? await A.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: D,
    offsetParent: m,
    strategy: c
  }) : D);
  return {
    top: (v.top - Q.top + B.top) / E.y,
    bottom: (Q.bottom - v.bottom + B.bottom) / E.y,
    left: (v.left - Q.left + B.left) / E.x,
    right: (Q.right - v.right + B.right) / E.x
  };
}
const iA = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: A,
      platform: a,
      elements: i,
      middlewareData: c
    } = t, {
      element: s,
      padding: f = 0
    } = te(e, t) || {};
    if (s == null)
      return {};
    const g = qn(f), u = {
      x: n,
      y: r
    }, C = Ht(o), B = Ft(C), d = await a.getDimensions(s), h = C === "y", v = h ? "top" : "left", D = h ? "bottom" : "right", m = h ? "clientHeight" : "clientWidth", E = A.reference[B] + A.reference[C] - u[C] - A.floating[B], Q = u[C] - A.reference[C], P = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s));
    let I = P ? P[m] : 0;
    (!I || !await (a.isElement == null ? void 0 : a.isElement(P))) && (I = i.floating[m] || A.floating[B]);
    const x = E / 2 - Q / 2, H = I / 2 - d[B] / 2 - 1, F = ae(g[v], H), T = ae(g[D], H), Y = F, R = I - d[B] - T, M = I / 2 - d[B] / 2 + x, U = bt(Y, M, R), L = !c.arrow && Qe(o) != null && M !== U && A.reference[B] / 2 - (M < Y ? F : T) - d[B] / 2 < 0, G = L ? M < Y ? M - Y : M - R : 0;
    return {
      [C]: u[C] + G,
      data: {
        [C]: U,
        centerOffset: M - U - G,
        ...L && {
          alignmentOffset: G
        }
      },
      reset: L
    };
  }
}), aA = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: A,
        rects: a,
        initialPlacement: i,
        platform: c,
        elements: s
      } = t, {
        mainAxis: f = !0,
        crossAxis: g = !0,
        fallbackPlacements: u,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: B = "none",
        flipAlignment: d = !0,
        ...h
      } = te(e, t);
      if ((n = A.arrow) != null && n.alignmentOffset)
        return {};
      const v = ne(o), D = se(i), m = ne(i) === i, E = await (c.isRTL == null ? void 0 : c.isRTL(s.floating)), Q = u || (m || !d ? [et(i)] : tA(i)), P = B !== "none";
      !u && P && Q.push(...rA(i, d, B, E));
      const I = [i, ...Q], x = await Re(t, h), H = [];
      let F = ((r = A.flip) == null ? void 0 : r.overflows) || [];
      if (f && H.push(x[v]), g) {
        const M = eA(o, a, E);
        H.push(x[M[0]], x[M[1]]);
      }
      if (F = [...F, {
        placement: o,
        overflows: H
      }], !H.every((M) => M <= 0)) {
        var T, Y;
        const M = (((T = A.flip) == null ? void 0 : T.index) || 0) + 1, U = I[M];
        if (U)
          return {
            data: {
              index: M,
              overflows: F
            },
            reset: {
              placement: U
            }
          };
        let L = (Y = F.filter((G) => G.overflows[0] <= 0).sort((G, b) => G.overflows[1] - b.overflows[1])[0]) == null ? void 0 : Y.placement;
        if (!L)
          switch (C) {
            case "bestFit": {
              var R;
              const G = (R = F.filter((b) => {
                if (P) {
                  const k = se(b.placement);
                  return k === D || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  k === "y";
                }
                return !0;
              }).map((b) => [b.placement, b.overflows.filter((k) => k > 0).reduce((k, w) => k + w, 0)]).sort((b, k) => b[1] - k[1])[0]) == null ? void 0 : R[0];
              G && (L = G);
              break;
            }
            case "initialPlacement":
              L = i;
              break;
          }
        if (o !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
};
function ln(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function fn(e) {
  return Zo.some((t) => e[t] >= 0);
}
const sA = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = te(e, t);
      switch (r) {
        case "referenceHidden": {
          const A = await Re(t, {
            ...o,
            elementContext: "reference"
          }), a = ln(A, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: fn(a)
            }
          };
        }
        case "escaped": {
          const A = await Re(t, {
            ...o,
            altBoundary: !0
          }), a = ln(A, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: fn(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function cA(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, A = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = ne(n), i = Qe(n), c = se(n) === "y", s = ["left", "top"].includes(a) ? -1 : 1, f = A && c ? -1 : 1, g = te(t, e);
  let {
    mainAxis: u,
    crossAxis: C,
    alignmentAxis: B
  } = typeof g == "number" ? {
    mainAxis: g,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: g.mainAxis || 0,
    crossAxis: g.crossAxis || 0,
    alignmentAxis: g.alignmentAxis
  };
  return i && typeof B == "number" && (C = i === "end" ? B * -1 : B), c ? {
    x: C * f,
    y: u * s
  } : {
    x: u * s,
    y: C * f
  };
}
const lA = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: A,
        placement: a,
        middlewareData: i
      } = t, c = await cA(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: A + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, fA = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: A = !0,
        crossAxis: a = !1,
        limiter: i = {
          fn: (h) => {
            let {
              x: v,
              y: D
            } = h;
            return {
              x: v,
              y: D
            };
          }
        },
        ...c
      } = te(e, t), s = {
        x: n,
        y: r
      }, f = await Re(t, c), g = se(ne(o)), u = St(g);
      let C = s[u], B = s[g];
      if (A) {
        const h = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", D = C + f[h], m = C - f[v];
        C = bt(D, C, m);
      }
      if (a) {
        const h = g === "y" ? "top" : "left", v = g === "y" ? "bottom" : "right", D = B + f[h], m = B - f[v];
        B = bt(D, B, m);
      }
      const d = i.fn({
        ...t,
        [u]: C,
        [g]: B
      });
      return {
        ...d,
        data: {
          x: d.x - n,
          y: d.y - r,
          enabled: {
            [u]: A,
            [g]: a
          }
        }
      };
    }
  };
}, gA = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: A,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: s = !0
      } = te(e, t), f = {
        x: n,
        y: r
      }, g = se(o), u = St(g);
      let C = f[u], B = f[g];
      const d = te(i, t), h = typeof d == "number" ? {
        mainAxis: d,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...d
      };
      if (c) {
        const m = u === "y" ? "height" : "width", E = A.reference[u] - A.floating[m] + h.mainAxis, Q = A.reference[u] + A.reference[m] - h.mainAxis;
        C < E ? C = E : C > Q && (C = Q);
      }
      if (s) {
        var v, D;
        const m = u === "y" ? "width" : "height", E = ["top", "left"].includes(ne(o)), Q = A.reference[g] - A.floating[m] + (E && ((v = a.offset) == null ? void 0 : v[g]) || 0) + (E ? 0 : h.crossAxis), P = A.reference[g] + A.reference[m] + (E ? 0 : ((D = a.offset) == null ? void 0 : D[g]) || 0) - (E ? h.crossAxis : 0);
        B < Q ? B = Q : B > P && (B = P);
      }
      return {
        [u]: C,
        [g]: B
      };
    }
  };
}, uA = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: A,
        platform: a,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...s
      } = te(e, t), f = await Re(t, s), g = ne(o), u = Qe(o), C = se(o) === "y", {
        width: B,
        height: d
      } = A.floating;
      let h, v;
      g === "top" || g === "bottom" ? (h = g, v = u === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = g, h = u === "end" ? "top" : "bottom");
      const D = d - f.top - f.bottom, m = B - f.left - f.right, E = ae(d - f[h], D), Q = ae(B - f[v], m), P = !t.middlewareData.shift;
      let I = E, x = Q;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = m), (r = t.middlewareData.shift) != null && r.enabled.y && (I = D), P && !u) {
        const F = J(f.left, 0), T = J(f.right, 0), Y = J(f.top, 0), R = J(f.bottom, 0);
        C ? x = B - 2 * (F !== 0 || T !== 0 ? F + T : J(f.left, f.right)) : I = d - 2 * (Y !== 0 || R !== 0 ? Y + R : J(f.top, f.bottom));
      }
      await c({
        ...t,
        availableWidth: x,
        availableHeight: I
      });
      const H = await a.getDimensions(i.floating);
      return B !== H.width || d !== H.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function it() {
  return typeof window < "u";
}
function Ie(e) {
  return Zn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function $(e) {
  var t;
  return (t = (Zn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Zn(e) {
  return it() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function z(e) {
  return it() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function _(e) {
  return it() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function gn(e) {
  return !it() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function Te(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = W(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function dA(e) {
  return ["table", "td", "th"].includes(Ie(e));
}
function at(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Lt(e) {
  const t = Rt(), n = z(e) ? W(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function CA(e) {
  let t = ce(e);
  for (; _(t) && !me(t); ) {
    if (Lt(t))
      return t;
    if (at(t))
      return null;
    t = ce(t);
  }
  return null;
}
function Rt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function me(e) {
  return ["html", "body", "#document"].includes(Ie(e));
}
function W(e) {
  return K(e).getComputedStyle(e);
}
function st(e) {
  return z(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ce(e) {
  if (Ie(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gn(e) && e.host || // Fallback.
    $(e)
  );
  return gn(t) ? t.host : t;
}
function _n(e) {
  const t = ce(e);
  return me(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : _(t) && Te(t) ? t : _n(t);
}
function Ge(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = _n(e), A = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = K(o);
  if (A) {
    const i = Mt(a);
    return t.concat(a, a.visualViewport || [], Te(o) ? o : [], i && n ? Ge(i) : []);
  }
  return t.concat(o, Ge(o, [], n));
}
function Mt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function $n(e) {
  const t = W(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = _(e), A = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = $e(n) !== A || $e(r) !== a;
  return i && (n = A, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function Gt(e) {
  return z(e) ? e : e.contextElement;
}
function pe(e) {
  const t = Gt(e);
  if (!_(t))
    return Z(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: A
  } = $n(t);
  let a = (A ? $e(n.width) : n.width) / r, i = (A ? $e(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const wA = /* @__PURE__ */ Z(0);
function er(e) {
  const t = K(e);
  return !Rt() || !t.visualViewport ? wA : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function hA(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== K(e) ? !1 : t;
}
function ue(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), A = Gt(e);
  let a = Z(1);
  t && (r ? z(r) && (a = pe(r)) : a = pe(e));
  const i = hA(A, n, r) ? er(A) : Z(0);
  let c = (o.left + i.x) / a.x, s = (o.top + i.y) / a.y, f = o.width / a.x, g = o.height / a.y;
  if (A) {
    const u = K(A), C = r && z(r) ? K(r) : r;
    let B = u, d = Mt(B);
    for (; d && r && C !== B; ) {
      const h = pe(d), v = d.getBoundingClientRect(), D = W(d), m = v.left + (d.clientLeft + parseFloat(D.paddingLeft)) * h.x, E = v.top + (d.clientTop + parseFloat(D.paddingTop)) * h.y;
      c *= h.x, s *= h.y, f *= h.x, g *= h.y, c += m, s += E, B = K(d), d = Mt(B);
    }
  }
  return tt({
    width: f,
    height: g,
    x: c,
    y: s
  });
}
function Tt(e, t) {
  const n = st(e).scrollLeft;
  return t ? t.left + n : ue($(e)).left + n;
}
function tr(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Tt(e, r)
  )), A = r.top + t.scrollTop;
  return {
    x: o,
    y: A
  };
}
function BA(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const A = o === "fixed", a = $(r), i = t ? at(t.floating) : !1;
  if (r === a || i && A)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = Z(1);
  const f = Z(0), g = _(r);
  if ((g || !g && !A) && ((Ie(r) !== "body" || Te(a)) && (c = st(r)), _(r))) {
    const C = ue(r);
    s = pe(r), f.x = C.x + r.clientLeft, f.y = C.y + r.clientTop;
  }
  const u = a && !g && !A ? tr(a, c, !0) : Z(0);
  return {
    width: n.width * s.x,
    height: n.height * s.y,
    x: n.x * s.x - c.scrollLeft * s.x + f.x + u.x,
    y: n.y * s.y - c.scrollTop * s.y + f.y + u.y
  };
}
function vA(e) {
  return Array.from(e.getClientRects());
}
function pA(e) {
  const t = $(e), n = st(e), r = e.ownerDocument.body, o = J(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), A = J(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Tt(e);
  const i = -n.scrollTop;
  return W(r).direction === "rtl" && (a += J(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: A,
    x: a,
    y: i
  };
}
function EA(e, t) {
  const n = K(e), r = $(e), o = n.visualViewport;
  let A = r.clientWidth, a = r.clientHeight, i = 0, c = 0;
  if (o) {
    A = o.width, a = o.height;
    const s = Rt();
    (!s || s && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: A,
    height: a,
    x: i,
    y: c
  };
}
function mA(e, t) {
  const n = ue(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, A = _(e) ? pe(e) : Z(1), a = e.clientWidth * A.x, i = e.clientHeight * A.y, c = o * A.x, s = r * A.y;
  return {
    width: a,
    height: i,
    x: c,
    y: s
  };
}
function un(e, t, n) {
  let r;
  if (t === "viewport")
    r = EA(e, n);
  else if (t === "document")
    r = pA($(e));
  else if (z(t))
    r = mA(t, n);
  else {
    const o = er(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return tt(r);
}
function nr(e, t) {
  const n = ce(e);
  return n === t || !z(n) || me(n) ? !1 : W(n).position === "fixed" || nr(n, t);
}
function DA(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ge(e, [], !1).filter((i) => z(i) && Ie(i) !== "body"), o = null;
  const A = W(e).position === "fixed";
  let a = A ? ce(e) : e;
  for (; z(a) && !me(a); ) {
    const i = W(a), c = Lt(a);
    !c && i.position === "fixed" && (o = null), (A ? !c && !o : !c && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Te(a) && !c && nr(e, a)) ? r = r.filter((f) => f !== a) : o = i, a = ce(a);
  }
  return t.set(e, r), r;
}
function QA(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? at(t) ? [] : DA(t, this._c) : [].concat(n), r], i = a[0], c = a.reduce((s, f) => {
    const g = un(t, f, o);
    return s.top = J(g.top, s.top), s.right = ae(g.right, s.right), s.bottom = ae(g.bottom, s.bottom), s.left = J(g.left, s.left), s;
  }, un(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function IA(e) {
  const {
    width: t,
    height: n
  } = $n(e);
  return {
    width: t,
    height: n
  };
}
function yA(e, t, n) {
  const r = _(t), o = $(t), A = n === "fixed", a = ue(e, !0, A, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Z(0);
  if (r || !r && !A)
    if ((Ie(t) !== "body" || Te(o)) && (i = st(t)), r) {
      const u = ue(t, !0, A, t);
      c.x = u.x + t.clientLeft, c.y = u.y + t.clientTop;
    } else o && (c.x = Tt(o));
  const s = o && !r && !A ? tr(o, i) : Z(0), f = a.left + i.scrollLeft - c.x - s.x, g = a.top + i.scrollTop - c.y - s.y;
  return {
    x: f,
    y: g,
    width: a.width,
    height: a.height
  };
}
function vt(e) {
  return W(e).position === "static";
}
function dn(e, t) {
  if (!_(e) || W(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return $(e) === n && (n = n.ownerDocument.body), n;
}
function rr(e, t) {
  const n = K(e);
  if (at(e))
    return n;
  if (!_(e)) {
    let o = ce(e);
    for (; o && !me(o); ) {
      if (z(o) && !vt(o))
        return o;
      o = ce(o);
    }
    return n;
  }
  let r = dn(e, t);
  for (; r && dA(r) && vt(r); )
    r = dn(r, t);
  return r && me(r) && vt(r) && !Lt(r) ? n : r || CA(e) || n;
}
const PA = async function(e) {
  const t = this.getOffsetParent || rr, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: yA(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function bA(e) {
  return W(e).direction === "rtl";
}
const xA = {
  convertOffsetParentRelativeRectToViewportRelativeRect: BA,
  getDocumentElement: $,
  getClippingRect: QA,
  getOffsetParent: rr,
  getElementRects: PA,
  getClientRects: vA,
  getDimensions: IA,
  getScale: pe,
  isElement: z,
  isRTL: bA
};
function or(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function MA(e, t) {
  let n = null, r;
  const o = $(e);
  function A() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), A();
    const s = e.getBoundingClientRect(), {
      left: f,
      top: g,
      width: u,
      height: C
    } = s;
    if (i || t(), !u || !C)
      return;
    const B = Je(g), d = Je(o.clientWidth - (f + u)), h = Je(o.clientHeight - (g + C)), v = Je(f), m = {
      rootMargin: -B + "px " + -d + "px " + -h + "px " + -v + "px",
      threshold: J(0, ae(1, c)) || 1
    };
    let E = !0;
    function Q(P) {
      const I = P[0].intersectionRatio;
      if (I !== c) {
        if (!E)
          return a();
        I ? a(!1, I) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      I === 1 && !or(s, e.getBoundingClientRect()) && a(), E = !1;
    }
    try {
      n = new IntersectionObserver(Q, {
        ...m,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(Q, m);
    }
    n.observe(e);
  }
  return a(!0), A;
}
function OA(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: A = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, s = Gt(e), f = o || A ? [...s ? Ge(s) : [], ...Ge(t)] : [];
  f.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), A && v.addEventListener("resize", n);
  });
  const g = s && i ? MA(s, n) : null;
  let u = -1, C = null;
  a && (C = new ResizeObserver((v) => {
    let [D] = v;
    D && D.target === s && C && (C.unobserve(t), cancelAnimationFrame(u), u = requestAnimationFrame(() => {
      var m;
      (m = C) == null || m.observe(t);
    })), n();
  }), s && !c && C.observe(s), C.observe(t));
  let B, d = c ? ue(e) : null;
  c && h();
  function h() {
    const v = ue(e);
    d && !or(d, v) && n(), d = v, B = requestAnimationFrame(h);
  }
  return n(), () => {
    var v;
    f.forEach((D) => {
      o && D.removeEventListener("scroll", n), A && D.removeEventListener("resize", n);
    }), g == null || g(), (v = C) == null || v.disconnect(), C = null, c && cancelAnimationFrame(B);
  };
}
const SA = lA, FA = fA, HA = aA, LA = uA, RA = sA, Cn = iA, GA = gA, TA = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: xA,
    ...n
  }, A = {
    ...o.platform,
    _c: r
  };
  return AA(e, t, {
    ...o,
    platform: A
  });
};
var qe = typeof document < "u" ? go : uo;
function nt(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!nt(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const A = o[r];
      if (!(A === "_owner" && e.$$typeof) && !nt(e[A], t[A]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ar(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function wn(e, t) {
  const n = Ar(e);
  return Math.round(t * n) / n;
}
function pt(e) {
  const t = l.useRef(e);
  return qe(() => {
    t.current = e;
  }), t;
}
function kA(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: A,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: c,
    open: s
  } = e, [f, g] = l.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [u, C] = l.useState(r);
  nt(u, r) || C(r);
  const [B, d] = l.useState(null), [h, v] = l.useState(null), D = l.useCallback((b) => {
    b !== P.current && (P.current = b, d(b));
  }, []), m = l.useCallback((b) => {
    b !== I.current && (I.current = b, v(b));
  }, []), E = A || B, Q = a || h, P = l.useRef(null), I = l.useRef(null), x = l.useRef(f), H = c != null, F = pt(c), T = pt(o), Y = pt(s), R = l.useCallback(() => {
    if (!P.current || !I.current)
      return;
    const b = {
      placement: t,
      strategy: n,
      middleware: u
    };
    T.current && (b.platform = T.current), TA(P.current, I.current, b).then((k) => {
      const w = {
        ...k,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Y.current !== !1
      };
      M.current && !nt(x.current, w) && (x.current = w, Yn.flushSync(() => {
        g(w);
      }));
    });
  }, [u, t, n, T, Y]);
  qe(() => {
    s === !1 && x.current.isPositioned && (x.current.isPositioned = !1, g((b) => ({
      ...b,
      isPositioned: !1
    })));
  }, [s]);
  const M = l.useRef(!1);
  qe(() => (M.current = !0, () => {
    M.current = !1;
  }), []), qe(() => {
    if (E && (P.current = E), Q && (I.current = Q), E && Q) {
      if (F.current)
        return F.current(E, Q, R);
      R();
    }
  }, [E, Q, R, F, H]);
  const U = l.useMemo(() => ({
    reference: P,
    floating: I,
    setReference: D,
    setFloating: m
  }), [D, m]), L = l.useMemo(() => ({
    reference: E,
    floating: Q
  }), [E, Q]), G = l.useMemo(() => {
    const b = {
      position: n,
      left: 0,
      top: 0
    };
    if (!L.floating)
      return b;
    const k = wn(L.floating, f.x), w = wn(L.floating, f.y);
    return i ? {
      ...b,
      transform: "translate(" + k + "px, " + w + "px)",
      ...Ar(L.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: k,
      top: w
    };
  }, [n, i, L.floating, f.x, f.y]);
  return l.useMemo(() => ({
    ...f,
    update: R,
    refs: U,
    elements: L,
    floatingStyles: G
  }), [f, R, U, L, G]);
}
const NA = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? Cn({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Cn({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, YA = (e, t) => ({
  ...SA(e),
  options: [e, t]
}), jA = (e, t) => ({
  ...FA(e),
  options: [e, t]
}), UA = (e, t) => ({
  ...GA(e),
  options: [e, t]
}), JA = (e, t) => ({
  ...HA(e),
  options: [e, t]
}), KA = (e, t) => ({
  ...LA(e),
  options: [e, t]
}), VA = (e, t) => ({
  ...RA(e),
  options: [e, t]
}), zA = (e, t) => ({
  ...NA(e),
  options: [e, t]
});
var WA = "Arrow", ir = l.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...A } = e;
  return /* @__PURE__ */ p.jsx(
    re.svg,
    {
      ...A,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ p.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ir.displayName = WA;
var XA = ir;
function qA(e) {
  const [t, n] = l.useState(void 0);
  return ge(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const A = o[0];
        let a, i;
        if ("borderBoxSize" in A) {
          const c = A.borderBoxSize, s = Array.isArray(c) ? c[0] : c;
          a = s.inlineSize, i = s.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var kt = "Popper", [ar, sr] = Un(kt), [ZA, cr] = ar(kt), lr = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = l.useState(null);
  return /* @__PURE__ */ p.jsx(ZA, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
lr.displayName = kt;
var fr = "PopperAnchor", gr = l.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, A = cr(fr, n), a = l.useRef(null), i = le(t, a);
    return l.useEffect(() => {
      A.onAnchorChange((r == null ? void 0 : r.current) || a.current);
    }), r ? null : /* @__PURE__ */ p.jsx(re.div, { ...o, ref: i });
  }
);
gr.displayName = fr;
var Nt = "PopperContent", [_A, $A] = ar(Nt), ur = l.forwardRef(
  (e, t) => {
    var Ce, N, ee, we, Ye, Xt;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: A = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: s = [],
      collisionPadding: f = 0,
      sticky: g = "partial",
      hideWhenDetached: u = !1,
      updatePositionStrategy: C = "optimized",
      onPlaced: B,
      ...d
    } = e, h = cr(Nt, n), [v, D] = l.useState(null), m = le(t, (Se) => D(Se)), [E, Q] = l.useState(null), P = qA(E), I = (P == null ? void 0 : P.width) ?? 0, x = (P == null ? void 0 : P.height) ?? 0, H = r + (A !== "center" ? "-" + A : ""), F = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, T = Array.isArray(s) ? s : [s], Y = T.length > 0, R = {
      padding: F,
      boundary: T.filter(ti),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Y
    }, { refs: M, floatingStyles: U, placement: L, isPositioned: G, middlewareData: b } = kA({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: H,
      whileElementsMounted: (...Se) => OA(...Se, {
        animationFrame: C === "always"
      }),
      elements: {
        reference: h.anchor
      },
      middleware: [
        YA({ mainAxis: o + x, alignmentAxis: a }),
        c && jA({
          mainAxis: !0,
          crossAxis: !1,
          limiter: g === "partial" ? UA() : void 0,
          ...R
        }),
        c && JA({ ...R }),
        KA({
          ...R,
          apply: ({ elements: Se, rects: qt, availableWidth: io, availableHeight: ao }) => {
            const { width: so, height: co } = qt.reference, je = Se.floating.style;
            je.setProperty("--radix-popper-available-width", `${io}px`), je.setProperty("--radix-popper-available-height", `${ao}px`), je.setProperty("--radix-popper-anchor-width", `${so}px`), je.setProperty("--radix-popper-anchor-height", `${co}px`);
          }
        }),
        E && zA({ element: E, padding: i }),
        ni({ arrowWidth: I, arrowHeight: x }),
        u && VA({ strategy: "referenceHidden", ...R })
      ]
    }), [k, w] = wr(L), y = ie(B);
    ge(() => {
      G && (y == null || y());
    }, [G, y]);
    const O = (Ce = b.arrow) == null ? void 0 : Ce.x, j = (N = b.arrow) == null ? void 0 : N.y, X = ((ee = b.arrow) == null ? void 0 : ee.centerOffset) !== 0, [V, Oe] = l.useState();
    return ge(() => {
      v && Oe(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ p.jsx(
      "div",
      {
        ref: M.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...U,
          transform: G ? U.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: V,
          "--radix-popper-transform-origin": [
            (we = b.transformOrigin) == null ? void 0 : we.x,
            (Ye = b.transformOrigin) == null ? void 0 : Ye.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Xt = b.hide) == null ? void 0 : Xt.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ p.jsx(
          _A,
          {
            scope: n,
            placedSide: k,
            onArrowChange: Q,
            arrowX: O,
            arrowY: j,
            shouldHideArrow: X,
            children: /* @__PURE__ */ p.jsx(
              re.div,
              {
                "data-side": k,
                "data-align": w,
                ...d,
                ref: m,
                style: {
                  ...d.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ur.displayName = Nt;
var dr = "PopperArrow", ei = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Cr = l.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, A = $A(dr, r), a = ei[A.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ p.jsx(
      "span",
      {
        ref: A.onArrowChange,
        style: {
          position: "absolute",
          left: A.arrowX,
          top: A.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[A.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[A.placedSide],
          visibility: A.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ p.jsx(
          XA,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Cr.displayName = dr;
function ti(e) {
  return e !== null;
}
var ni = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var h, v, D;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((h = o.arrow) == null ? void 0 : h.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [s, f] = wr(n), g = { start: "0%", center: "50%", end: "100%" }[f], u = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, C = (((D = o.arrow) == null ? void 0 : D.y) ?? 0) + c / 2;
    let B = "", d = "";
    return s === "bottom" ? (B = a ? g : `${u}px`, d = `${-c}px`) : s === "top" ? (B = a ? g : `${u}px`, d = `${r.floating.height + c}px`) : s === "right" ? (B = `${-c}px`, d = a ? g : `${C}px`) : s === "left" && (B = `${r.floating.width + c}px`, d = a ? g : `${C}px`), { data: { x: B, y: d } };
  }
});
function wr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var ri = lr, hr = gr, oi = ur, Ai = Cr, ii = "Portal", Br = l.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, A] = l.useState(!1);
  ge(() => A(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? ho.createPortal(/* @__PURE__ */ p.jsx(re.div, { ...r, ref: t }), a) : null;
});
Br.displayName = ii;
function ai(e, t) {
  return l.useReducer((n, r) => t[n][r] ?? n, e);
}
var Yt = (e) => {
  const { present: t, children: n } = e, r = si(t), o = typeof n == "function" ? n({ present: r.isPresent }) : l.Children.only(n), A = le(r.ref, ci(o));
  return typeof n == "function" || r.isPresent ? l.cloneElement(o, { ref: A }) : null;
};
Yt.displayName = "Presence";
function si(e) {
  const [t, n] = l.useState(), r = l.useRef({}), o = l.useRef(e), A = l.useRef("none"), a = e ? "mounted" : "unmounted", [i, c] = ai(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return l.useEffect(() => {
    const s = Ke(r.current);
    A.current = i === "mounted" ? s : "none";
  }, [i]), ge(() => {
    const s = r.current, f = o.current;
    if (f !== e) {
      const u = A.current, C = Ke(s);
      e ? c("MOUNT") : C === "none" || (s == null ? void 0 : s.display) === "none" ? c("UNMOUNT") : c(f && u !== C ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ge(() => {
    if (t) {
      let s;
      const f = t.ownerDocument.defaultView ?? window, g = (C) => {
        const d = Ke(r.current).includes(C.animationName);
        if (C.target === t && d && (c("ANIMATION_END"), !o.current)) {
          const h = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", s = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = h);
          });
        }
      }, u = (C) => {
        C.target === t && (A.current = Ke(r.current));
      };
      return t.addEventListener("animationstart", u), t.addEventListener("animationcancel", g), t.addEventListener("animationend", g), () => {
        f.clearTimeout(s), t.removeEventListener("animationstart", u), t.removeEventListener("animationcancel", g), t.removeEventListener("animationend", g);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: l.useCallback((s) => {
      s && (r.current = getComputedStyle(s)), n(s);
    }, [])
  };
}
function Ke(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function ci(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function li({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  }
}) {
  const [r, o] = fi({ defaultProp: t, onChange: n }), A = e !== void 0, a = A ? e : r, i = ie(n), c = l.useCallback(
    (s) => {
      if (A) {
        const g = typeof s == "function" ? s(e) : s;
        g !== e && i(g);
      } else
        o(s);
    },
    [A, e, o, i]
  );
  return [a, c];
}
function fi({
  defaultProp: e,
  onChange: t
}) {
  const n = l.useState(e), [r] = n, o = l.useRef(r), A = ie(t);
  return l.useEffect(() => {
    o.current !== r && (A(r), o.current = r);
  }, [r, o, A]), n;
}
var gi = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, he = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), ze = {}, Et = 0, vr = function(e) {
  return e && (e.host || vr(e.parentNode));
}, ui = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = vr(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, di = function(e, t, n, r) {
  var o = ui(t, Array.isArray(e) ? e : [e]);
  ze[n] || (ze[n] = /* @__PURE__ */ new WeakMap());
  var A = ze[n], a = [], i = /* @__PURE__ */ new Set(), c = new Set(o), s = function(g) {
    !g || i.has(g) || (i.add(g), s(g.parentNode));
  };
  o.forEach(s);
  var f = function(g) {
    !g || c.has(g) || Array.prototype.forEach.call(g.children, function(u) {
      if (i.has(u))
        f(u);
      else
        try {
          var C = u.getAttribute(r), B = C !== null && C !== "false", d = (he.get(u) || 0) + 1, h = (A.get(u) || 0) + 1;
          he.set(u, d), A.set(u, h), a.push(u), d === 1 && B && Ve.set(u, !0), h === 1 && u.setAttribute(n, "true"), B || u.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", u, v);
        }
    });
  };
  return f(t), i.clear(), Et++, function() {
    a.forEach(function(g) {
      var u = he.get(g) - 1, C = A.get(g) - 1;
      he.set(g, u), A.set(g, C), u || (Ve.has(g) || g.removeAttribute(r), Ve.delete(g)), C || g.removeAttribute(n);
    }), Et--, Et || (he = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), ze = {});
  };
}, Ci = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = gi(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), di(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, q = function() {
  return q = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var A in n) Object.prototype.hasOwnProperty.call(n, A) && (t[A] = n[A]);
    }
    return t;
  }, q.apply(this, arguments);
};
function pr(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function wi(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, A; r < o; r++)
    (A || !(r in t)) && (A || (A = Array.prototype.slice.call(t, 0, r)), A[r] = t[r]);
  return e.concat(A || Array.prototype.slice.call(t));
}
var Ze = "right-scroll-bar-position", _e = "width-before-scroll-bar", hi = "with-scroll-bars-hidden", Bi = "--removed-body-scroll-bar-size";
function mt(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function vi(e, t) {
  var n = Nn(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var pi = typeof window < "u" ? l.useLayoutEffect : l.useEffect, hn = /* @__PURE__ */ new WeakMap();
function Ei(e, t) {
  var n = vi(null, function(r) {
    return e.forEach(function(o) {
      return mt(o, r);
    });
  });
  return pi(function() {
    var r = hn.get(n);
    if (r) {
      var o = new Set(r), A = new Set(e), a = n.current;
      o.forEach(function(i) {
        A.has(i) || mt(i, null);
      }), A.forEach(function(i) {
        o.has(i) || mt(i, a);
      });
    }
    hn.set(n, e);
  }, [e]), n;
}
function mi(e) {
  return e;
}
function Di(e, t) {
  t === void 0 && (t = mi);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(A) {
      var a = t(A, r);
      return n.push(a), function() {
        n = n.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(A) {
      for (r = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(A);
      }
      n = {
        push: function(i) {
          return A(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(A) {
      r = !0;
      var a = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(A), a = n;
      }
      var c = function() {
        var f = a;
        a = [], f.forEach(A);
      }, s = function() {
        return Promise.resolve().then(c);
      };
      s(), n = {
        push: function(f) {
          a.push(f), s();
        },
        filter: function(f) {
          return a = a.filter(f), n;
        }
      };
    }
  };
  return o;
}
function Qi(e) {
  e === void 0 && (e = {});
  var t = Di(null);
  return t.options = q({ async: !0, ssr: !1 }, e), t;
}
var Er = function(e) {
  var t = e.sideCar, n = pr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return l.createElement(r, q({}, n));
};
Er.isSideCarExport = !0;
function Ii(e, t) {
  return e.useMedium(t), Er;
}
var mr = Qi(), Dt = function() {
}, ct = l.forwardRef(function(e, t) {
  var n = l.useRef(null), r = l.useState({
    onScrollCapture: Dt,
    onWheelCapture: Dt,
    onTouchMoveCapture: Dt
  }), o = r[0], A = r[1], a = e.forwardProps, i = e.children, c = e.className, s = e.removeScrollBar, f = e.enabled, g = e.shards, u = e.sideCar, C = e.noIsolation, B = e.inert, d = e.allowPinchZoom, h = e.as, v = h === void 0 ? "div" : h, D = e.gapMode, m = pr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = u, Q = Ei([n, t]), P = q(q({}, m), o);
  return l.createElement(
    l.Fragment,
    null,
    f && l.createElement(E, { sideCar: mr, removeScrollBar: s, shards: g, noIsolation: C, inert: B, setCallbacks: A, allowPinchZoom: !!d, lockRef: n, gapMode: D }),
    a ? l.cloneElement(l.Children.only(i), q(q({}, P), { ref: Q })) : l.createElement(v, q({}, P, { className: c, ref: Q }), i)
  );
});
ct.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
ct.classNames = {
  fullWidth: _e,
  zeroRight: Ze
};
var yi = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Pi() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = yi();
  return t && e.setAttribute("nonce", t), e;
}
function bi(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function xi(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Mi = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Pi()) && (bi(t, n), xi(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Oi = function() {
  var e = Mi();
  return function(t, n) {
    l.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Dr = function() {
  var e = Oi(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Si = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Qt = function(e) {
  return parseInt(e || "", 10) || 0;
}, Fi = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Qt(n), Qt(r), Qt(o)];
}, Hi = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Si;
  var t = Fi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Li = Dr(), Ee = "data-scroll-locked", Ri = function(e, t, n, r) {
  var o = e.left, A = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(hi, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Ee, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(A, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ze, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(_e, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Ze, " .").concat(Ze, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(_e, " .").concat(_e, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Ee, `] {
    `).concat(Bi, ": ").concat(i, `px;
  }
`);
}, Bn = function() {
  var e = parseInt(document.body.getAttribute(Ee) || "0", 10);
  return isFinite(e) ? e : 0;
}, Gi = function() {
  l.useEffect(function() {
    return document.body.setAttribute(Ee, (Bn() + 1).toString()), function() {
      var e = Bn() - 1;
      e <= 0 ? document.body.removeAttribute(Ee) : document.body.setAttribute(Ee, e.toString());
    };
  }, []);
}, Ti = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Gi();
  var A = l.useMemo(function() {
    return Hi(o);
  }, [o]);
  return l.createElement(Li, { styles: Ri(A, !t, o, n ? "" : "!important") });
}, Ot = !1;
if (typeof window < "u")
  try {
    var We = Object.defineProperty({}, "passive", {
      get: function() {
        return Ot = !0, !0;
      }
    });
    window.addEventListener("test", We, We), window.removeEventListener("test", We, We);
  } catch {
    Ot = !1;
  }
var Be = Ot ? { passive: !1 } : !1, ki = function(e) {
  return e.tagName === "TEXTAREA";
}, Qr = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ki(e) && n[t] === "visible")
  );
}, Ni = function(e) {
  return Qr(e, "overflowY");
}, Yi = function(e) {
  return Qr(e, "overflowX");
}, vn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ir(e, r);
    if (o) {
      var A = yr(e, r), a = A[1], i = A[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, ji = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ui = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ir = function(e, t) {
  return e === "v" ? Ni(t) : Yi(t);
}, yr = function(e, t) {
  return e === "v" ? ji(t) : Ui(t);
}, Ji = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Ki = function(e, t, n, r, o) {
  var A = Ji(e, window.getComputedStyle(t).direction), a = A * r, i = n.target, c = t.contains(i), s = !1, f = a > 0, g = 0, u = 0;
  do {
    var C = yr(e, i), B = C[0], d = C[1], h = C[2], v = d - h - A * B;
    (B || v) && Ir(e, i) && (g += v, u += B), i instanceof ShadowRoot ? i = i.host : i = i.parentNode;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (f && Math.abs(g) < 1 || !f && Math.abs(u) < 1) && (s = !0), s;
}, Xe = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pn = function(e) {
  return [e.deltaX, e.deltaY];
}, En = function(e) {
  return e && "current" in e ? e.current : e;
}, Vi = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, zi = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Wi = 0, ve = [];
function Xi(e) {
  var t = l.useRef([]), n = l.useRef([0, 0]), r = l.useRef(), o = l.useState(Wi++)[0], A = l.useState(Dr)[0], a = l.useRef(e);
  l.useEffect(function() {
    a.current = e;
  }, [e]), l.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var d = wi([e.lockRef.current], (e.shards || []).map(En), !0).filter(Boolean);
      return d.forEach(function(h) {
        return h.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), d.forEach(function(h) {
          return h.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = l.useCallback(function(d, h) {
    if ("touches" in d && d.touches.length === 2 || d.type === "wheel" && d.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = Xe(d), D = n.current, m = "deltaX" in d ? d.deltaX : D[0] - v[0], E = "deltaY" in d ? d.deltaY : D[1] - v[1], Q, P = d.target, I = Math.abs(m) > Math.abs(E) ? "h" : "v";
    if ("touches" in d && I === "h" && P.type === "range")
      return !1;
    var x = vn(I, P);
    if (!x)
      return !0;
    if (x ? Q = I : (Q = I === "v" ? "h" : "v", x = vn(I, P)), !x)
      return !1;
    if (!r.current && "changedTouches" in d && (m || E) && (r.current = Q), !Q)
      return !0;
    var H = r.current || Q;
    return Ki(H, h, d, H === "h" ? m : E);
  }, []), c = l.useCallback(function(d) {
    var h = d;
    if (!(!ve.length || ve[ve.length - 1] !== A)) {
      var v = "deltaY" in h ? pn(h) : Xe(h), D = t.current.filter(function(Q) {
        return Q.name === h.type && (Q.target === h.target || h.target === Q.shadowParent) && Vi(Q.delta, v);
      })[0];
      if (D && D.should) {
        h.cancelable && h.preventDefault();
        return;
      }
      if (!D) {
        var m = (a.current.shards || []).map(En).filter(Boolean).filter(function(Q) {
          return Q.contains(h.target);
        }), E = m.length > 0 ? i(h, m[0]) : !a.current.noIsolation;
        E && h.cancelable && h.preventDefault();
      }
    }
  }, []), s = l.useCallback(function(d, h, v, D) {
    var m = { name: d, delta: h, target: v, should: D, shadowParent: qi(v) };
    t.current.push(m), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== m;
      });
    }, 1);
  }, []), f = l.useCallback(function(d) {
    n.current = Xe(d), r.current = void 0;
  }, []), g = l.useCallback(function(d) {
    s(d.type, pn(d), d.target, i(d, e.lockRef.current));
  }, []), u = l.useCallback(function(d) {
    s(d.type, Xe(d), d.target, i(d, e.lockRef.current));
  }, []);
  l.useEffect(function() {
    return ve.push(A), e.setCallbacks({
      onScrollCapture: g,
      onWheelCapture: g,
      onTouchMoveCapture: u
    }), document.addEventListener("wheel", c, Be), document.addEventListener("touchmove", c, Be), document.addEventListener("touchstart", f, Be), function() {
      ve = ve.filter(function(d) {
        return d !== A;
      }), document.removeEventListener("wheel", c, Be), document.removeEventListener("touchmove", c, Be), document.removeEventListener("touchstart", f, Be);
    };
  }, []);
  var C = e.removeScrollBar, B = e.inert;
  return l.createElement(
    l.Fragment,
    null,
    B ? l.createElement(A, { styles: zi(o) }) : null,
    C ? l.createElement(Ti, { gapMode: e.gapMode }) : null
  );
}
function qi(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Zi = Ii(mr, Xi);
var Pr = l.forwardRef(function(e, t) {
  return l.createElement(ct, q({}, e, { ref: t, sideCar: Zi }));
});
Pr.classNames = ct.classNames;
var jt = "Popover", [br, b0] = Un(jt, [
  sr
]), ke = sr(), [_i, fe] = br(jt), xr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: A,
    modal: a = !1
  } = e, i = ke(t), c = l.useRef(null), [s, f] = l.useState(!1), [g = !1, u] = li({
    prop: r,
    defaultProp: o,
    onChange: A
  });
  return /* @__PURE__ */ p.jsx(ri, { ...i, children: /* @__PURE__ */ p.jsx(
    _i,
    {
      scope: t,
      contentId: qo(),
      triggerRef: c,
      open: g,
      onOpenChange: u,
      onOpenToggle: l.useCallback(() => u((C) => !C), [u]),
      hasCustomAnchor: s,
      onCustomAnchorAdd: l.useCallback(() => f(!0), []),
      onCustomAnchorRemove: l.useCallback(() => f(!1), []),
      modal: a,
      children: n
    }
  ) });
};
xr.displayName = jt;
var Mr = "PopoverAnchor", $i = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = fe(Mr, n), A = ke(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: i } = o;
    return l.useEffect(() => (a(), () => i()), [a, i]), /* @__PURE__ */ p.jsx(hr, { ...A, ...r, ref: t });
  }
);
$i.displayName = Mr;
var Or = "PopoverTrigger", Sr = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = fe(Or, n), A = ke(n), a = le(t, o.triggerRef), i = /* @__PURE__ */ p.jsx(
      re.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Tr(o.open),
        ...r,
        ref: a,
        onClick: Ae(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ p.jsx(hr, { asChild: !0, ...A, children: i });
  }
);
Sr.displayName = Or;
var Ut = "PopoverPortal", [ea, ta] = br(Ut, {
  forceMount: void 0
}), Fr = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, A = fe(Ut, t);
  return /* @__PURE__ */ p.jsx(ea, { scope: t, forceMount: n, children: /* @__PURE__ */ p.jsx(Yt, { present: n || A.open, children: /* @__PURE__ */ p.jsx(Br, { asChild: !0, container: o, children: r }) }) });
};
Fr.displayName = Ut;
var De = "PopoverContent", Hr = l.forwardRef(
  (e, t) => {
    const n = ta(De, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, A = fe(De, e.__scopePopover);
    return /* @__PURE__ */ p.jsx(Yt, { present: r || A.open, children: A.modal ? /* @__PURE__ */ p.jsx(ra, { ...o, ref: t }) : /* @__PURE__ */ p.jsx(oa, { ...o, ref: t }) });
  }
);
Hr.displayName = De;
var na = /* @__PURE__ */ Jn("PopoverContent.RemoveScroll"), ra = l.forwardRef(
  (e, t) => {
    const n = fe(De, e.__scopePopover), r = l.useRef(null), o = le(t, r), A = l.useRef(!1);
    return l.useEffect(() => {
      const a = r.current;
      if (a) return Ci(a);
    }, []), /* @__PURE__ */ p.jsx(Pr, { as: na, allowPinchZoom: !0, children: /* @__PURE__ */ p.jsx(
      Lr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Ae(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), A.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: Ae(
          e.onPointerDownOutside,
          (a) => {
            const i = a.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, s = i.button === 2 || c;
            A.current = s;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: Ae(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), oa = l.forwardRef(
  (e, t) => {
    const n = fe(De, e.__scopePopover), r = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ p.jsx(
      Lr,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (A) => {
          var a, i;
          (a = e.onCloseAutoFocus) == null || a.call(e, A), A.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), A.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (A) => {
          var c, s;
          (c = e.onInteractOutside) == null || c.call(e, A), A.defaultPrevented || (r.current = !0, A.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = A.target;
          ((s = n.triggerRef.current) == null ? void 0 : s.contains(a)) && A.preventDefault(), A.detail.originalEvent.type === "focusin" && o.current && A.preventDefault();
        }
      }
    );
  }
), Lr = l.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: A,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: s,
      onInteractOutside: f,
      ...g
    } = e, u = fe(De, n), C = ke(n);
    return No(), /* @__PURE__ */ p.jsx(
      Wn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: A,
        children: /* @__PURE__ */ p.jsx(
          Vn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: f,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: s,
            onDismiss: () => u.onOpenChange(!1),
            children: /* @__PURE__ */ p.jsx(
              oi,
              {
                "data-state": Tr(u.open),
                role: "dialog",
                id: u.contentId,
                ...C,
                ...g,
                ref: t,
                style: {
                  ...g.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), Rr = "PopoverClose", Gr = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = fe(Rr, n);
    return /* @__PURE__ */ p.jsx(
      re.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: Ae(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Gr.displayName = Rr;
var Aa = "PopoverArrow", ia = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ke(n);
    return /* @__PURE__ */ p.jsx(Ai, { ...o, ...r, ref: t });
  }
);
ia.displayName = Aa;
function Tr(e) {
  return e ? "open" : "closed";
}
var aa = xr, sa = Sr, ca = Fr, la = Hr, fa = Gr;
const ga = "_overlay_11atf_5", ua = "_PopoverTrigger_11atf_17", da = "_PopoverContent_11atf_21", Ca = "_PopoverClose_11atf_45", wa = "_partners_11atf_59", ha = "_partner__icon_11atf_66", Ba = "_partner__link_11atf_71", va = "_footer__link_11atf_90", pa = "_slideDownAndFade_11atf_1", Ea = "_slideLeftAndFade_11atf_1", ma = "_slideUpAndFade_11atf_1", Da = "_slideRightAndFade_11atf_1", Qa = {
  overlay: ga,
  PopoverTrigger: ua,
  PopoverContent: da,
  PopoverClose: Ca,
  partners: wa,
  partner__icon: ha,
  partner__link: Ba,
  footer__link: va,
  slideDownAndFade: pa,
  slideLeftAndFade: Ea,
  slideUpAndFade: ma,
  slideRightAndFade: Da
}, Ia = "data:image/svg+xml,%3csvg%20width='512'%20height='512'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3e%3cimage%20href='data:image/png;base64,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'%20x='0'%20y='0'%20width='512'%20height='512'%20preserveAspectRatio='xMidYMid%20meet'%20/%3e%3c/svg%3e", ya = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20clip-path='url(%23clip0_4867_62297)'%3e%3crect%20width='40'%20height='40'%20fill='url(%23pattern0_4867_62297)'/%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0_4867_62297'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0_4867_62297'%20transform='scale(0.0125)'/%3e%3c/pattern%3e%3cclipPath%20id='clip0_4867_62297'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3cimage%20id='image0_4867_62297'%20width='80'%20height='80'%20xlink:href='data:image/png;base64,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'/%3e%3c/defs%3e%3c/svg%3e", Pa = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62302)'%3e%3cmask%20id='mask0_4867_62302'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='40'%20height='40'%3e%3cpath%20d='M40%200H0V40H40V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_4867_62302)'%3e%3cmask%20id='mask1_4867_62302'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='-1'%20y='1'%20width='43'%20height='38'%3e%3cpath%20d='M41.4799%201.79779H-0.520142V38.7978H41.4799V1.79779Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_4867_62302)'%3e%3cpath%20d='M34.4807%2027.9425L41.4657%2018.8285H35.6447L30.3996%2025.6854H24.0206V13.4114C24.0288%2013.022%2023.9559%2012.635%2023.8065%2012.2752C23.657%2011.9154%2023.4343%2011.5906%2023.1527%2011.3215C22.8805%2011.0478%2022.5559%2010.8318%2022.1983%2010.6865C21.8408%2010.5411%2021.4576%2010.4694%2021.0717%2010.4755H3.89068V1.99545H-1.00032V27.2875C-1.00875%2027.6772%20-0.935926%2028.0644%20-0.786483%2028.4244C-0.63704%2028.7844%20-0.414254%2029.1093%20-0.13232%2029.3785C0.138743%2029.6545%200.46282%2029.8729%200.820436%2030.0205C1.17805%2030.1682%201.56182%2030.2419%201.94868%2030.2375H19.0787V38.5994H23.9677V30.3635H30.3137L36.2137%2038.5994H41.9547L34.4807%2027.9425ZM19.1316%2025.3605H3.89068V15.1395H19.1297V16.9395L19.1316%2025.3605Z'%20fill='%2317233E'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62302'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", ba = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62355)'%3e%3cpath%20d='M6.04721%208.19188L6.05163%200.777857C6.05163%200.408853%206.35127%200.109222%206.72175%200.109222H10.6081C10.9771%200.109222%2011.2767%200.408853%2011.2782%200.777857L11.2841%203.3166C11.2871%204.22288%2010.9284%205.09225%2010.2878%205.73284L7.31067%208.71439C6.84278%209.18081%206.04721%208.85018%206.04721%208.19188ZM33.3904%2033.5793C33.3933%2034.7926%2032.9092%2035.9572%2032.0487%2036.8118L29.073%2039.7653C28.7144%2040.1225%2028.1033%2039.8657%2028.1048%2039.3594L28.121%2035.9852C25.8007%2037.8037%2022.8797%2038.8886%2019.7092%2038.8886C11.9572%2038.8886%205.69149%2032.3985%206.06197%2024.5668L6.04573%2016.8812C6.04278%2015.6679%206.52691%2014.5033%207.38743%2013.6487L10.3631%2010.6952C10.7217%2010.338%2011.3328%2010.5948%2011.3313%2011.1011L11.3151%2014.4635C13.3771%2012.8487%2015.907%2011.8096%2018.6538%2011.603C26.5623%2011.0052%2033.2059%2017.1867%2033.3682%2024.9343L33.3712%2024.9284V25.2236C33.3712%2025.2251%2033.3712%2025.2266%2033.3712%2025.228C33.3712%2025.2295%2033.3712%2025.2295%2033.3712%2025.231L33.3904%2033.5793ZM28.1328%2025.3314C28.1328%2020.6288%2024.307%2016.8029%2019.6044%2016.8029C14.9018%2016.8029%2011.076%2020.6288%2011.076%2025.3314C11.076%2030.0339%2014.9018%2033.8598%2019.6044%2033.8598C24.307%2033.8598%2028.1328%2030.0325%2028.1328%2025.3314Z'%20fill='url(%23paint0_linear_4867_62355)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_4867_62355'%20x1='6.04647'%20y1='20.0204'%20x2='33.3911'%20y2='20.0204'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF4713'/%3e%3cstop%20offset='0.5'%20stop-color='%23DB0032'/%3e%3cstop%20offset='1'%20stop-color='%23AE1164'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_4867_62355'%3e%3crect%20width='27.4539'%20height='40'%20fill='white'%20transform='translate(6)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", xa = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20clip-path='url(%23clip0_4867_62334)'%3e%3crect%20width='40'%20height='40'%20fill='url(%23pattern0_4867_62334)'/%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0_4867_62334'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0_4867_62334'%20transform='scale(0.0125)'/%3e%3c/pattern%3e%3cclipPath%20id='clip0_4867_62334'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3cimage%20id='image0_4867_62334'%20width='80'%20height='80'%20xlink:href='data:image/png;base64,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'/%3e%3c/defs%3e%3c/svg%3e", Ma = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62315)'%3e%3cpath%20d='M40%200C37.384%202.03569%2034.5932%203.83603%2031.66%205.38C30.44%206.04%2029.08%206.74%2027.66%207.38C21.9369%2010.0591%2015.8843%2011.969%209.66%2013.06C8.22%2013.3%206.72%2013.52%205.18%2013.68C3.64%2013.84%201.74%2014%200%2014C1.50896%2014.5515%203.07044%2014.9469%204.66%2015.18C4.36358%2016.4384%204.21591%2017.7272%204.22%2019.02C4.20736%2021.7907%204.86741%2024.5231%206.14346%2026.9826C7.41951%2029.442%209.27343%2031.555%2011.546%2033.14C13.8186%2034.7251%2016.442%2035.7349%2019.1908%2036.0827C21.9397%2036.4305%2024.7319%2036.1059%2027.3276%2035.1368C29.9234%2034.1677%2032.2451%2032.5831%2034.0935%2030.519C35.9419%2028.4549%2037.2617%2025.973%2037.9396%2023.2864C38.6174%2020.5999%2038.6331%2017.7889%2037.9852%2015.095C37.3373%2012.401%2036.0453%209.90457%2034.22%207.82C36.6342%205.6116%2038.5971%202.95589%2040%200ZM21.34%2018.76C22.0322%2018.76%2022.7089%2018.9653%2023.2845%2019.3499C23.8601%2019.7344%2024.3087%2020.2811%2024.5736%2020.9206C24.8385%2021.5601%2024.9078%2022.2639%2024.7727%2022.9428C24.6377%2023.6217%2024.3044%2024.2454%2023.8149%2024.7349C23.3254%2025.2244%2022.7017%2025.5577%2022.0228%2025.6927C21.3439%2025.8278%2020.6401%2025.7585%2020.0006%2025.4936C19.3611%2025.2287%2018.8144%2024.7801%2018.4299%2024.2045C18.0453%2023.6289%2017.84%2022.9522%2017.84%2022.26C17.84%2021.3317%2018.2087%2020.4415%2018.8651%2019.7851C19.5215%2019.1287%2020.4117%2018.76%2021.34%2018.76ZM34.54%2019.04C34.54%2022.5409%2033.1493%2025.8983%2030.6738%2028.3738C28.1983%2030.8493%2024.8409%2032.24%2021.34%2032.24C17.8391%2032.24%2014.4817%2030.8493%2012.0062%2028.3738C9.53071%2025.8983%208.14%2022.5409%208.14%2019.04C8.13289%2017.8775%208.28771%2016.7198%208.6%2015.6C10.2388%2015.69%2011.8812%2015.69%2013.52%2015.6C12.8819%2017.0475%2012.6574%2018.6435%2012.8714%2020.2108C13.0854%2021.7782%2013.7295%2023.2556%2014.7323%2024.479C15.735%2025.7025%2017.0572%2026.6242%2018.552%2027.1417C20.0468%2027.6593%2021.6558%2027.7525%2023.2004%2027.4111C24.745%2027.0696%2026.1648%2026.3068%2027.3022%2025.2073C28.4395%2024.1079%2029.2499%2022.7148%2029.6435%2021.1826C30.0371%2019.6505%2029.9984%2018.0392%2029.5318%2016.5277C29.0651%2015.0162%2028.1888%2013.6636%2027%2012.62C28.4731%2011.9664%2029.8853%2011.1833%2031.22%2010.28C33.3605%2012.6959%2034.5416%2015.8123%2034.54%2019.04Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62315'%3e%3crect%20width='40'%20height='36.16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Oa = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62322)'%3e%3cpath%20d='M4.57062%2012.026C2.55801%2011.5384%202.04783%2011.1347%202.04783%2010.1435C2.04783%209.18525%202.89412%208.46283%204.41766%208.46283C6.02775%208.46283%207.0421%209.35412%207.14373%2011.0168L8.78601%2010.765C8.75482%208.44484%207.0592%207%204.58773%207C1.99751%207%200.32101%208.26099%200.32101%2010.2974C0.32101%2012.1639%201.16731%2013.0711%204.45188%2013.7766C6.46448%2014.2312%207.17694%2014.6509%207.17694%2015.761C7.17694%2016.8711%206.14448%2017.4916%204.67125%2017.4916C2.91123%2017.4916%201.74392%2016.5494%201.64128%2014.9686L0%2015.2534C0.20126%2017.6075%202.06493%2018.9904%204.57062%2018.9904C7.16084%2018.9904%208.92086%2017.6914%208.92086%2015.6781C8.92086%2013.6227%207.90551%2012.8493%204.57062%2012.026Z'%20fill='%23FF5500'/%3e%3cpath%20d='M12.5332%2013.4988H18.4284V12.0111H12.5332V8.5667H18.7336V7.09592H10.8394V18.7986H18.801V17.3268H12.5332V13.4988Z'%20fill='%23FF5500'/%3e%3cpath%20d='M22.8927%2013.4988H28.7881V12.0111H22.8927V8.5667H29.0922V7.09592H21.199V18.7986H29.1607V17.3268H22.8927V13.4988Z'%20fill='%23FF5500'/%3e%3cpath%20d='M0%2023.1492H3.63979V33.3789H5.33239V23.1492H8.92086V21.6763H0V23.1492Z'%20fill='%23FF5500'/%3e%3cpath%20d='M17.1072%2026.6078H12.5332V21.6763H10.8394V33.3789H12.5332V28.0797H17.1072V33.3789H18.801V21.6763H17.1072V26.6078Z'%20fill='%23FF5500'/%3e%3cpath%20d='M24.3073%2021.6763H21.199V23.1492H24.3073V31.905H21.199V33.3789H24.3587H26.0524H29.1607V31.905H26.0524V23.1492H29.1607V21.6763H26.001H24.3073Z'%20fill='%23FF5500'/%3e%3cpath%20d='M32.8685%208.5667H38.1147V18.7986H39.7122V7.09592H38.5943H32.0883H31.271V18.7986H32.8685V8.5667Z'%20fill='%23FF5500'/%3e%3cpath%20d='M35.6498%2026.5113C33.6371%2026.0235%2033.127%2025.6198%2033.127%2024.6284C33.127%2023.67%2033.9733%2022.9475%2035.4968%2022.9475C37.1069%2022.9475%2038.1213%2023.8389%2038.2229%2025.5019L39.8652%2025.2501C39.83%2022.9295%2038.1374%2021.4844%2035.6659%2021.4844C33.0767%2021.4844%2031.4002%2022.7446%2031.4002%2024.7823C31.4002%2026.6491%2032.2465%2027.5565%2035.5311%2028.2622C37.5436%2028.7159%2038.2561%2029.1366%2038.2561%2030.2469C38.2561%2031.3571%2037.2236%2031.9788%2035.7504%2031.9788C33.9904%2031.9788%2032.823%2031.0363%2032.7204%2029.4553L31.0792%2029.7412C31.2804%2032.0957%2033.1441%2033.4748%2035.6498%2033.4748C38.24%2033.4748%2040%2032.1756%2040%2030.1619C40%2028.1082%2038.9836%2027.3347%2035.6498%2026.5113Z'%20fill='%23FF5500'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62322'%3e%3crect%20width='40'%20height='26.4748'%20fill='white'%20transform='translate(0%207)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Sa = {
  Actito: {
    icon: Ia,
    link: "https://www.actito.com/"
  },
  Adnami: {
    icon: ya,
    link: "https://www.adnami.io/"
  },
  Bizzkit: {
    icon: Pa,
    link: "https://bizzkit.com/"
  },
  Ibexa: {
    icon: ba,
    link: "https://www.ibexa.co/"
  },
  Qualifio: {
    icon: xa,
    link: "https://www.qualifio.com/"
  },
  Raptor: {
    icon: Ma,
    link: "https://www.raptorservices.com/"
  },
  Seenthis: {
    icon: Oa,
    link: "https://www.seenthis.co/"
  }
}, kr = Co(() => ""), Jt = () => {
  const e = wo(kr);
  if (!e)
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  return e;
}, Fa = ({ open: e, overlayColor: t }) => {
  const n = Jt();
  return /* @__PURE__ */ p.jsx(
    "div",
    {
      className: n("overlay"),
      "data-testid": "app-switcher-overlay",
      style: {
        opacity: e ? 1 : 0,
        backgroundColor: t
      }
    }
  );
}, Ha = ({ icon: e, link: t, name: n }) => {
  const r = Jt();
  return /* @__PURE__ */ p.jsxs(
    "a",
    {
      className: r("partner__link"),
      "data-testid": "app-switcher-partner-link",
      href: t,
      rel: "noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ p.jsx("img", { src: e, alt: n, className: r("partner__icon") }),
        /* @__PURE__ */ p.jsx("span", { children: n })
      ]
    }
  );
}, La = () => {
  const e = Jt();
  return /* @__PURE__ */ p.jsxs(
    "a",
    {
      className: e("footer__link"),
      "data-testid": "qntm-ecosystem-link",
      href: "https://qntmgroup.com/solutions/",
      rel: "noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ p.jsx("span", { children: "Discover" }),
        /* @__PURE__ */ p.jsx(Ra, {}),
        /* @__PURE__ */ p.jsx("span", { children: "ecosystem" })
      ]
    }
  );
}, Ra = () => /* @__PURE__ */ p.jsxs("svg", { width: "53", height: "10", viewBox: "0 0 53 10", children: [
  /* @__PURE__ */ p.jsx("path", { d: "M27.7695 4.56776H29.3719V3.08609H37.3819V4.56776H38.9824V1.60614H27.7695V4.56776Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M34.1772 3.95056H32.5748V6.91391H30.9724V8.39558H35.7795V6.91391H34.1772V3.95056Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M53 1.60614H49.7971V3.08608H51.3995H53V1.60614Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M51.3995 3.08612L49.7971 4.56779V8.3956H53V6.91392H51.3995V4.56779V3.08612Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M15.3545 6.91392H13.7521V8.3956H16.955V4.56779L15.3545 3.08612V6.91392Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M22.9624 5.43221L24.5648 6.91389V3.08608H26.1672V1.60614H22.9624V5.43221Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M23.0803 6.7998L17.9067 2.01072C17.6318 1.75485 17.2579 1.61135 16.869 1.61135L13.7521 1.60443V3.08783H16.5399C16.6521 3.08783 16.7586 3.12933 16.839 3.20194L22.0108 7.99101C22.2856 8.24689 22.6596 8.38866 23.0485 8.38866L26.1654 8.39558V6.91391H23.3776C23.2654 6.91391 23.1588 6.87241 23.0784 6.7998H23.0803Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M42.1872 6.91392H40.5848V8.3956H43.7896V4.56779L42.1872 3.08612V6.91392Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M43.7017 1.61135L40.5848 1.60443V3.08783H43.3745C43.4867 3.08783 43.5933 3.12933 43.6737 3.20194L47.4693 6.722L48.6472 5.63279L44.7357 2.01245C44.4608 1.7583 44.0888 1.6148 43.6998 1.61308L43.7017 1.61135Z" }),
  /* @__PURE__ */ p.jsx("path", { d: "M10.8146 5C10.8146 2.23893 8.39332 0 5.40732 0C2.42133 0 0 2.23721 0 4.99827C0 7.75934 2.41946 9.99827 5.40545 9.99827V8.39384C3.37864 8.39384 1.73326 6.87414 1.73326 5C1.73326 3.12586 3.37677 1.60443 5.40358 1.60443C7.4304 1.60443 9.07578 3.12414 9.07578 4.99827C9.07578 5.63105 8.88506 6.25 8.5242 6.78769C8.48868 6.84129 8.41389 6.85857 8.35592 6.82573C8.35032 6.82227 8.34471 6.81881 8.3391 6.81362C8.33349 6.80844 8.32788 6.80325 8.32227 6.79806L6.0767 4.72165C5.80184 4.46577 5.42789 4.324 5.03898 4.324L3.38799 4.31708V5.79703H4.70617C4.81835 5.79703 4.9268 5.83852 5.00533 5.91113L7.24342 7.98236C7.51828 8.23824 7.89223 8.38001 8.28113 8.38001L12.1459 8.38693V6.9139H10.3996C10.6725 6.30705 10.8128 5.65526 10.8109 4.99654L10.8146 5Z" })
] });
function Ga() {
  this.__data__ = [], this.size = 0;
}
var Ta = Ga;
function ka(e, t) {
  return e === t || e !== e && t !== t;
}
var lt = ka, Na = lt;
function Ya(e, t) {
  for (var n = e.length; n--; )
    if (Na(e[n][0], t))
      return n;
  return -1;
}
var ft = Ya, ja = ft, Ua = Array.prototype, Ja = Ua.splice;
function Ka(e) {
  var t = this.__data__, n = ja(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ja.call(t, n, 1), --this.size, !0;
}
var Va = Ka, za = ft;
function Wa(e) {
  var t = this.__data__, n = za(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var Xa = Wa, qa = ft;
function Za(e) {
  return qa(this.__data__, e) > -1;
}
var _a = Za, $a = ft;
function es(e, t) {
  var n = this.__data__, r = $a(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var ts = es, ns = Ta, rs = Va, os = Xa, As = _a, is = ts;
function ye(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ye.prototype.clear = ns;
ye.prototype.delete = rs;
ye.prototype.get = os;
ye.prototype.has = As;
ye.prototype.set = is;
var gt = ye, as = gt;
function ss() {
  this.__data__ = new as(), this.size = 0;
}
var cs = ss;
function ls(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var fs = ls;
function gs(e) {
  return this.__data__.get(e);
}
var us = gs;
function ds(e) {
  return this.__data__.has(e);
}
var Cs = ds, ws = typeof Ue == "object" && Ue && Ue.Object === Object && Ue, Nr = ws, hs = Nr, Bs = typeof self == "object" && self && self.Object === Object && self, vs = hs || Bs || Function("return this")(), Pe = vs, ps = Pe, Es = ps.Symbol, Yr = Es, mn = Yr, jr = Object.prototype, ms = jr.hasOwnProperty, Ds = jr.toString, Le = mn ? mn.toStringTag : void 0;
function Qs(e) {
  var t = ms.call(e, Le), n = e[Le];
  try {
    e[Le] = void 0;
    var r = !0;
  } catch {
  }
  var o = Ds.call(e);
  return r && (t ? e[Le] = n : delete e[Le]), o;
}
var Is = Qs, ys = Object.prototype, Ps = ys.toString;
function bs(e) {
  return Ps.call(e);
}
var xs = bs, Dn = Yr, Ms = Is, Os = xs, Ss = "[object Null]", Fs = "[object Undefined]", Qn = Dn ? Dn.toStringTag : void 0;
function Hs(e) {
  return e == null ? e === void 0 ? Fs : Ss : Qn && Qn in Object(e) ? Ms(e) : Os(e);
}
var ut = Hs;
function Ls(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var de = Ls, Rs = ut, Gs = de, Ts = "[object AsyncFunction]", ks = "[object Function]", Ns = "[object GeneratorFunction]", Ys = "[object Proxy]";
function js(e) {
  if (!Gs(e))
    return !1;
  var t = Rs(e);
  return t == ks || t == Ns || t == Ts || t == Ys;
}
var Kt = js, Us = Pe, Js = Us["__core-js_shared__"], Ks = Js, It = Ks, In = function() {
  var e = /[^.]+$/.exec(It && It.keys && It.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Vs(e) {
  return !!In && In in e;
}
var zs = Vs, Ws = Function.prototype, Xs = Ws.toString;
function qs(e) {
  if (e != null) {
    try {
      return Xs.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Zs = qs, _s = Kt, $s = zs, ec = de, tc = Zs, nc = /[\\^$.*+?()[\]{}|]/g, rc = /^\[object .+?Constructor\]$/, oc = Function.prototype, Ac = Object.prototype, ic = oc.toString, ac = Ac.hasOwnProperty, sc = RegExp(
  "^" + ic.call(ac).replace(nc, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function cc(e) {
  if (!ec(e) || $s(e))
    return !1;
  var t = _s(e) ? sc : rc;
  return t.test(tc(e));
}
var lc = cc;
function fc(e, t) {
  return e == null ? void 0 : e[t];
}
var gc = fc, uc = lc, dc = gc;
function Cc(e, t) {
  var n = dc(e, t);
  return uc(n) ? n : void 0;
}
var Vt = Cc, wc = Vt, hc = Pe, Bc = wc(hc, "Map"), Ur = Bc, vc = Vt, pc = vc(Object, "create"), dt = pc, yn = dt;
function Ec() {
  this.__data__ = yn ? yn(null) : {}, this.size = 0;
}
var mc = Ec;
function Dc(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Qc = Dc, Ic = dt, yc = "__lodash_hash_undefined__", Pc = Object.prototype, bc = Pc.hasOwnProperty;
function xc(e) {
  var t = this.__data__;
  if (Ic) {
    var n = t[e];
    return n === yc ? void 0 : n;
  }
  return bc.call(t, e) ? t[e] : void 0;
}
var Mc = xc, Oc = dt, Sc = Object.prototype, Fc = Sc.hasOwnProperty;
function Hc(e) {
  var t = this.__data__;
  return Oc ? t[e] !== void 0 : Fc.call(t, e);
}
var Lc = Hc, Rc = dt, Gc = "__lodash_hash_undefined__";
function Tc(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Rc && t === void 0 ? Gc : t, this;
}
var kc = Tc, Nc = mc, Yc = Qc, jc = Mc, Uc = Lc, Jc = kc;
function be(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
be.prototype.clear = Nc;
be.prototype.delete = Yc;
be.prototype.get = jc;
be.prototype.has = Uc;
be.prototype.set = Jc;
var Kc = be, Pn = Kc, Vc = gt, zc = Ur;
function Wc() {
  this.size = 0, this.__data__ = {
    hash: new Pn(),
    map: new (zc || Vc)(),
    string: new Pn()
  };
}
var Xc = Wc;
function qc(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Zc = qc, _c = Zc;
function $c(e, t) {
  var n = e.__data__;
  return _c(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Ct = $c, el = Ct;
function tl(e) {
  var t = el(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var nl = tl, rl = Ct;
function ol(e) {
  return rl(this, e).get(e);
}
var Al = ol, il = Ct;
function al(e) {
  return il(this, e).has(e);
}
var sl = al, cl = Ct;
function ll(e, t) {
  var n = cl(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var fl = ll, gl = Xc, ul = nl, dl = Al, Cl = sl, wl = fl;
function xe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xe.prototype.clear = gl;
xe.prototype.delete = ul;
xe.prototype.get = dl;
xe.prototype.has = Cl;
xe.prototype.set = wl;
var hl = xe, Bl = gt, vl = Ur, pl = hl, El = 200;
function ml(e, t) {
  var n = this.__data__;
  if (n instanceof Bl) {
    var r = n.__data__;
    if (!vl || r.length < El - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new pl(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var Dl = ml, Ql = gt, Il = cs, yl = fs, Pl = us, bl = Cs, xl = Dl;
function Me(e) {
  var t = this.__data__ = new Ql(e);
  this.size = t.size;
}
Me.prototype.clear = Il;
Me.prototype.delete = yl;
Me.prototype.get = Pl;
Me.prototype.has = bl;
Me.prototype.set = xl;
var Ml = Me, Ol = Vt, Sl = function() {
  try {
    var e = Ol(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Jr = Sl, bn = Jr;
function Fl(e, t, n) {
  t == "__proto__" && bn ? bn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var zt = Fl, Hl = zt, Ll = lt;
function Rl(e, t, n) {
  (n !== void 0 && !Ll(e[t], n) || n === void 0 && !(t in e)) && Hl(e, t, n);
}
var Kr = Rl;
function Gl(e) {
  return function(t, n, r) {
    for (var o = -1, A = Object(t), a = r(t), i = a.length; i--; ) {
      var c = a[e ? i : ++o];
      if (n(A[c], c, A) === !1)
        break;
    }
    return t;
  };
}
var Tl = Gl, kl = Tl, Nl = kl(), Yl = Nl, rt = { exports: {} };
rt.exports;
(function(e, t) {
  var n = Pe, r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, A = o && o.exports === r, a = A ? n.Buffer : void 0, i = a ? a.allocUnsafe : void 0;
  function c(s, f) {
    if (f)
      return s.slice();
    var g = s.length, u = i ? i(g) : new s.constructor(g);
    return s.copy(u), u;
  }
  e.exports = c;
})(rt, rt.exports);
var jl = rt.exports, Ul = Pe, Jl = Ul.Uint8Array, Kl = Jl, xn = Kl;
function Vl(e) {
  var t = new e.constructor(e.byteLength);
  return new xn(t).set(new xn(e)), t;
}
var zl = Vl, Wl = zl;
function Xl(e, t) {
  var n = t ? Wl(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var ql = Xl;
function Zl(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var _l = Zl, $l = de, Mn = Object.create, ef = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!$l(t))
      return {};
    if (Mn)
      return Mn(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), tf = ef;
function nf(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var rf = nf, of = rf, Af = of(Object.getPrototypeOf, Object), Vr = Af, af = Object.prototype;
function sf(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || af;
  return e === n;
}
var zr = sf, cf = tf, lf = Vr, ff = zr;
function gf(e) {
  return typeof e.constructor == "function" && !ff(e) ? cf(lf(e)) : {};
}
var uf = gf;
function df(e) {
  return e != null && typeof e == "object";
}
var Ne = df, Cf = ut, wf = Ne, hf = "[object Arguments]";
function Bf(e) {
  return wf(e) && Cf(e) == hf;
}
var vf = Bf, On = vf, pf = Ne, Wr = Object.prototype, Ef = Wr.hasOwnProperty, mf = Wr.propertyIsEnumerable, Df = On(/* @__PURE__ */ function() {
  return arguments;
}()) ? On : function(e) {
  return pf(e) && Ef.call(e, "callee") && !mf.call(e, "callee");
}, Xr = Df, Qf = Array.isArray, qr = Qf, If = 9007199254740991;
function yf(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= If;
}
var Zr = yf, Pf = Kt, bf = Zr;
function xf(e) {
  return e != null && bf(e.length) && !Pf(e);
}
var Wt = xf, Mf = Wt, Of = Ne;
function Sf(e) {
  return Of(e) && Mf(e);
}
var Ff = Sf, ot = { exports: {} };
function Hf() {
  return !1;
}
var Lf = Hf;
ot.exports;
(function(e, t) {
  var n = Pe, r = Lf, o = t && !t.nodeType && t, A = o && !0 && e && !e.nodeType && e, a = A && A.exports === o, i = a ? n.Buffer : void 0, c = i ? i.isBuffer : void 0, s = c || r;
  e.exports = s;
})(ot, ot.exports);
var _r = ot.exports, Rf = ut, Gf = Vr, Tf = Ne, kf = "[object Object]", Nf = Function.prototype, Yf = Object.prototype, $r = Nf.toString, jf = Yf.hasOwnProperty, Uf = $r.call(Object);
function Jf(e) {
  if (!Tf(e) || Rf(e) != kf)
    return !1;
  var t = Gf(e);
  if (t === null)
    return !0;
  var n = jf.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && $r.call(n) == Uf;
}
var Kf = Jf, Vf = ut, zf = Zr, Wf = Ne, Xf = "[object Arguments]", qf = "[object Array]", Zf = "[object Boolean]", _f = "[object Date]", $f = "[object Error]", eg = "[object Function]", tg = "[object Map]", ng = "[object Number]", rg = "[object Object]", og = "[object RegExp]", Ag = "[object Set]", ig = "[object String]", ag = "[object WeakMap]", sg = "[object ArrayBuffer]", cg = "[object DataView]", lg = "[object Float32Array]", fg = "[object Float64Array]", gg = "[object Int8Array]", ug = "[object Int16Array]", dg = "[object Int32Array]", Cg = "[object Uint8Array]", wg = "[object Uint8ClampedArray]", hg = "[object Uint16Array]", Bg = "[object Uint32Array]", S = {};
S[lg] = S[fg] = S[gg] = S[ug] = S[dg] = S[Cg] = S[wg] = S[hg] = S[Bg] = !0;
S[Xf] = S[qf] = S[sg] = S[Zf] = S[cg] = S[_f] = S[$f] = S[eg] = S[tg] = S[ng] = S[rg] = S[og] = S[Ag] = S[ig] = S[ag] = !1;
function vg(e) {
  return Wf(e) && zf(e.length) && !!S[Vf(e)];
}
var pg = vg;
function Eg(e) {
  return function(t) {
    return e(t);
  };
}
var mg = Eg, At = { exports: {} };
At.exports;
(function(e, t) {
  var n = Nr, r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, A = o && o.exports === r, a = A && n.process, i = function() {
    try {
      var c = o && o.require && o.require("util").types;
      return c || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  e.exports = i;
})(At, At.exports);
var Dg = At.exports, Qg = pg, Ig = mg, Sn = Dg, Fn = Sn && Sn.isTypedArray, yg = Fn ? Ig(Fn) : Qg, eo = yg;
function Pg(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var to = Pg, bg = zt, xg = lt, Mg = Object.prototype, Og = Mg.hasOwnProperty;
function Sg(e, t, n) {
  var r = e[t];
  (!(Og.call(e, t) && xg(r, n)) || n === void 0 && !(t in e)) && bg(e, t, n);
}
var Fg = Sg, Hg = Fg, Lg = zt;
function Rg(e, t, n, r) {
  var o = !n;
  n || (n = {});
  for (var A = -1, a = t.length; ++A < a; ) {
    var i = t[A], c = r ? r(n[i], e[i], i, n, e) : void 0;
    c === void 0 && (c = e[i]), o ? Lg(n, i, c) : Hg(n, i, c);
  }
  return n;
}
var Gg = Rg;
function Tg(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var kg = Tg, Ng = 9007199254740991, Yg = /^(?:0|[1-9]\d*)$/;
function jg(e, t) {
  var n = typeof e;
  return t = t ?? Ng, !!t && (n == "number" || n != "symbol" && Yg.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var no = jg, Ug = kg, Jg = Xr, Kg = qr, Vg = _r, zg = no, Wg = eo, Xg = Object.prototype, qg = Xg.hasOwnProperty;
function Zg(e, t) {
  var n = Kg(e), r = !n && Jg(e), o = !n && !r && Vg(e), A = !n && !r && !o && Wg(e), a = n || r || o || A, i = a ? Ug(e.length, String) : [], c = i.length;
  for (var s in e)
    (t || qg.call(e, s)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (s == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (s == "offset" || s == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    A && (s == "buffer" || s == "byteLength" || s == "byteOffset") || // Skip index properties.
    zg(s, c))) && i.push(s);
  return i;
}
var _g = Zg;
function $g(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var eu = $g, tu = de, nu = zr, ru = eu, ou = Object.prototype, Au = ou.hasOwnProperty;
function iu(e) {
  if (!tu(e))
    return ru(e);
  var t = nu(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !Au.call(e, r)) || n.push(r);
  return n;
}
var au = iu, su = _g, cu = au, lu = Wt;
function fu(e) {
  return lu(e) ? su(e, !0) : cu(e);
}
var ro = fu, gu = Gg, uu = ro;
function du(e) {
  return gu(e, uu(e));
}
var Cu = du, Hn = Kr, wu = jl, hu = ql, Bu = _l, vu = uf, Ln = Xr, Rn = qr, pu = Ff, Eu = _r, mu = Kt, Du = de, Qu = Kf, Iu = eo, Gn = to, yu = Cu;
function Pu(e, t, n, r, o, A, a) {
  var i = Gn(e, n), c = Gn(t, n), s = a.get(c);
  if (s) {
    Hn(e, n, s);
    return;
  }
  var f = A ? A(i, c, n + "", e, t, a) : void 0, g = f === void 0;
  if (g) {
    var u = Rn(c), C = !u && Eu(c), B = !u && !C && Iu(c);
    f = c, u || C || B ? Rn(i) ? f = i : pu(i) ? f = Bu(i) : C ? (g = !1, f = wu(c, !0)) : B ? (g = !1, f = hu(c, !0)) : f = [] : Qu(c) || Ln(c) ? (f = i, Ln(i) ? f = yu(i) : (!Du(i) || mu(i)) && (f = vu(c))) : g = !1;
  }
  g && (a.set(c, f), o(f, c, r, A, a), a.delete(c)), Hn(e, n, f);
}
var bu = Pu, xu = Ml, Mu = Kr, Ou = Yl, Su = bu, Fu = de, Hu = ro, Lu = to;
function oo(e, t, n, r, o) {
  e !== t && Ou(t, function(A, a) {
    if (o || (o = new xu()), Fu(A))
      Su(e, t, a, n, oo, r, o);
    else {
      var i = r ? r(Lu(e, a), A, a + "", e, t, o) : void 0;
      i === void 0 && (i = A), Mu(e, a, i);
    }
  }, Hu);
}
var Ru = oo;
function Gu(e) {
  return e;
}
var Ao = Gu;
function Tu(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var ku = Tu, Nu = ku, Tn = Math.max;
function Yu(e, t, n) {
  return t = Tn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, A = Tn(r.length - t, 0), a = Array(A); ++o < A; )
      a[o] = r[t + o];
    o = -1;
    for (var i = Array(t + 1); ++o < t; )
      i[o] = r[o];
    return i[t] = n(a), Nu(e, this, i);
  };
}
var ju = Yu;
function Uu(e) {
  return function() {
    return e;
  };
}
var Ju = Uu, Ku = Ju, kn = Jr, Vu = Ao, zu = kn ? function(e, t) {
  return kn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ku(t),
    writable: !0
  });
} : Vu, Wu = zu, Xu = 800, qu = 16, Zu = Date.now;
function _u(e) {
  var t = 0, n = 0;
  return function() {
    var r = Zu(), o = qu - (r - n);
    if (n = r, o > 0) {
      if (++t >= Xu)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var $u = _u, e0 = Wu, t0 = $u, n0 = t0(e0), r0 = n0, o0 = Ao, A0 = ju, i0 = r0;
function a0(e, t) {
  return i0(A0(e, t, o0), e + "");
}
var s0 = a0, c0 = lt, l0 = Wt, f0 = no, g0 = de;
function u0(e, t, n) {
  if (!g0(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? l0(n) && f0(t, n.length) : r == "string" && t in n) ? c0(n[t], e) : !1;
}
var d0 = u0, C0 = s0, w0 = d0;
function h0(e) {
  return C0(function(t, n) {
    var r = -1, o = n.length, A = o > 1 ? n[o - 1] : void 0, a = o > 2 ? n[2] : void 0;
    for (A = e.length > 3 && typeof A == "function" ? (o--, A) : void 0, a && w0(n[0], n[1], a) && (A = o < 3 ? void 0 : A, o = 1), t = Object(t); ++r < o; ) {
      var i = n[r];
      i && e(t, i, r, A);
    }
    return t;
  });
}
var B0 = h0, v0 = Ru, p0 = B0, E0 = p0(function(e, t, n) {
  v0(e, t, n);
}), m0 = E0;
const D0 = /* @__PURE__ */ Bo(m0), Q0 = /* @__PURE__ */ p.jsx(
  "svg",
  {
    "data-testid": "app-switcher-button",
    height: 16,
    viewBox: "0 0 16 16",
    width: 16,
    children: /* @__PURE__ */ p.jsx(
      "path",
      {
        d: "M4.57143 2.375C4.57143 2.97174 4.33061 3.54403 3.90196 3.96599C3.4733 4.38795 2.89192 4.625 2.28571 4.625C1.67951 4.625 1.09812 4.38795 0.66947 3.96599C0.240816 3.54403 0 2.97174 0 2.375C0 1.77826 0.240816 1.20597 0.66947 0.78401C1.09812 0.362053 1.67951 0.125 2.28571 0.125C2.89192 0.125 3.4733 0.362053 3.90196 0.78401C4.33061 1.20597 4.57143 1.77826 4.57143 2.375ZM4.57143 8C4.57143 8.59674 4.33061 9.16903 3.90196 9.59099C3.4733 10.0129 2.89192 10.25 2.28571 10.25C1.67951 10.25 1.09812 10.0129 0.66947 9.59099C0.240816 9.16903 0 8.59674 0 8C0 7.40326 0.240816 6.83097 0.66947 6.40901C1.09812 5.98705 1.67951 5.75 2.28571 5.75C2.89192 5.75 3.4733 5.98705 3.90196 6.40901C4.33061 6.83097 4.57143 7.40326 4.57143 8ZM2.28571 15.875C1.67951 15.875 1.09812 15.6379 0.66947 15.216C0.240816 14.794 0 14.2217 0 13.625C0 13.0283 0.240816 12.456 0.66947 12.034C1.09812 11.6121 1.67951 11.375 2.28571 11.375C2.89192 11.375 3.4733 11.6121 3.90196 12.034C4.33061 12.456 4.57143 13.0283 4.57143 13.625C4.57143 14.2217 4.33061 14.794 3.90196 15.216C3.4733 15.6379 2.89192 15.875 2.28571 15.875ZM10.2857 2.375C10.2857 2.97174 10.0449 3.54403 9.61624 3.96599C9.18759 4.38795 8.60621 4.625 8 4.625C7.39379 4.625 6.81241 4.38795 6.38376 3.96599C5.9551 3.54403 5.71429 2.97174 5.71429 2.375C5.71429 1.77826 5.9551 1.20597 6.38376 0.78401C6.81241 0.362053 7.39379 0.125 8 0.125C8.60621 0.125 9.18759 0.362053 9.61624 0.78401C10.0449 1.20597 10.2857 1.77826 10.2857 2.375ZM8 10.25C7.39379 10.25 6.81241 10.0129 6.38376 9.59099C5.9551 9.16903 5.71429 8.59674 5.71429 8C5.71429 7.40326 5.9551 6.83097 6.38376 6.40901C6.81241 5.98705 7.39379 5.75 8 5.75C8.60621 5.75 9.18759 5.98705 9.61624 6.40901C10.0449 6.83097 10.2857 7.40326 10.2857 8C10.2857 8.59674 10.0449 9.16903 9.61624 9.59099C9.18759 10.0129 8.60621 10.25 8 10.25ZM10.2857 13.625C10.2857 14.2217 10.0449 14.794 9.61624 15.216C9.18759 15.6379 8.60621 15.875 8 15.875C7.39379 15.875 6.81241 15.6379 6.38376 15.216C5.9551 14.794 5.71429 14.2217 5.71429 13.625C5.71429 13.0283 5.9551 12.456 6.38376 12.034C6.81241 11.6121 7.39379 11.375 8 11.375C8.60621 11.375 9.18759 11.6121 9.61624 12.034C10.0449 12.456 10.2857 13.0283 10.2857 13.625ZM13.7143 4.625C13.1081 4.625 12.5267 4.38795 12.098 3.96599C11.6694 3.54403 11.4286 2.97174 11.4286 2.375C11.4286 1.77826 11.6694 1.20597 12.098 0.78401C12.5267 0.362053 13.1081 0.125 13.7143 0.125C14.3205 0.125 14.9019 0.362053 15.3305 0.78401C15.7592 1.20597 16 1.77826 16 2.375C16 2.97174 15.7592 3.54403 15.3305 3.96599C14.9019 4.38795 14.3205 4.625 13.7143 4.625ZM16 8C16 8.59674 15.7592 9.16903 15.3305 9.59099C14.9019 10.0129 14.3205 10.25 13.7143 10.25C13.1081 10.25 12.5267 10.0129 12.098 9.59099C11.6694 9.16903 11.4286 8.59674 11.4286 8C11.4286 7.40326 11.6694 6.83097 12.098 6.40901C12.5267 5.98705 13.1081 5.75 13.7143 5.75C14.3205 5.75 14.9019 5.98705 15.3305 6.40901C15.7592 6.83097 16 7.40326 16 8ZM13.7143 15.875C13.1081 15.875 12.5267 15.6379 12.098 15.216C11.6694 14.794 11.4286 14.2217 11.4286 13.625C11.4286 13.0283 11.6694 12.456 12.098 12.034C12.5267 11.6121 13.1081 11.375 13.7143 11.375C14.3205 11.375 14.9019 11.6121 15.3305 12.034C15.7592 12.456 16 13.0283 16 13.625C16 14.2217 15.7592 14.794 15.3305 15.216C14.9019 15.6379 14.3205 15.875 13.7143 15.875Z",
        fill: "currentColor"
      }
    )
  }
), x0 = ({
  buttonUI: e = Q0,
  hideCloseButton: t = !1,
  hideFooter: n = !1,
  overlayColor: r = "transparent",
  partnersConfig: o = {},
  customStyles: A = {}
}) => {
  const [a, i] = Nn(!1), c = D0(
    {},
    Sa,
    o
  ), s = Object.entries(c).filter(
    ([, g]) => !g.shouldHide
  ), f = (g) => `${Qa[g]} ${A[g] || ""}`.trim();
  return /* @__PURE__ */ p.jsx(kr.Provider, { value: f, children: /* @__PURE__ */ p.jsxs(aa, { onOpenChange: i, children: [
    /* @__PURE__ */ p.jsx(sa, { className: f("PopoverTrigger"), asChild: !0, children: e }),
    /* @__PURE__ */ p.jsx(ca, { children: /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsxs(
        la,
        {
          className: f("PopoverContent"),
          collisionPadding: 10,
          side: "bottom",
          sideOffset: 20,
          children: [
            /* @__PURE__ */ p.jsx("div", { className: f("partners"), children: s.map(([g, u]) => /* @__PURE__ */ p.jsx(
              Ha,
              {
                icon: u.icon,
                link: u.link,
                name: g
              },
              g
            )) }),
            !n && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
              /* @__PURE__ */ p.jsx("hr", {}),
              /* @__PURE__ */ p.jsx(La, {})
            ] }),
            !t && /* @__PURE__ */ p.jsx(
              fa,
              {
                "aria-label": "Close",
                className: f("PopoverClose"),
                "data-testid": "app-switcher-close-button",
                children: /* @__PURE__ */ p.jsx(Do, {})
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ p.jsx(Fa, { open: a, overlayColor: r })
    ] }) })
  ] }) });
};
export {
  x0 as QntmAppSwitcher
};
