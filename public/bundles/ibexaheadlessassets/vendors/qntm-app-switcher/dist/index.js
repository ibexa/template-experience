import "./index.css";
import * as P from "react";
import Or, { forwardRef as Q, createElement as F, useCallback as Ee, createContext as Et, useMemo as Pt, useContext as it, Children as He, isValidElement as Ot, cloneElement as hn, Fragment as qo, useEffect as Y, useRef as K, useState as ee, useLayoutEffect as $r, useReducer as Xo } from "react";
import * as Yo from "react-dom";
import Ko, { flushSync as _r } from "react-dom";
var vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ln = { exports: {} }, et = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vn;
function Qo() {
  if (Vn)
    return et;
  Vn = 1;
  var e = Or, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(i, l, u) {
    var d, f = {}, v = null, p = null;
    u !== void 0 && (v = "" + u), l.key !== void 0 && (v = "" + l.key), l.ref !== void 0 && (p = l.ref);
    for (d in l)
      r.call(l, d) && !a.hasOwnProperty(d) && (f[d] = l[d]);
    if (i && i.defaultProps)
      for (d in l = i.defaultProps, l)
        f[d] === void 0 && (f[d] = l[d]);
    return { $$typeof: t, type: i, key: v, ref: p, props: f, _owner: o.current };
  }
  return et.Fragment = n, et.jsx = c, et.jsxs = c, et;
}
var tt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hn;
function Jo() {
  return Hn || (Hn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Or, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = Symbol.iterator, h = "@@iterator";
    function b(s) {
      if (s === null || typeof s != "object")
        return null;
      var g = m && s[m] || s[h];
      return typeof g == "function" ? g : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(s) {
      {
        for (var g = arguments.length, w = new Array(g > 1 ? g - 1 : 0), O = 1; O < g; O++)
          w[O - 1] = arguments[O];
        A("error", s, w);
      }
    }
    function A(s, g, w) {
      {
        var O = y.ReactDebugCurrentFrame, j = O.getStackAddendum();
        j !== "" && (g += "%s", w = w.concat([j]));
        var I = w.map(function(L) {
          return String(L);
        });
        I.unshift("Warning: " + g), Function.prototype.apply.call(console[s], console, I);
      }
    }
    var x = !1, E = !1, _ = !1, R = !1, $ = !1, B;
    B = Symbol.for("react.module.reference");
    function X(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === r || s === a || $ || s === o || s === u || s === d || R || s === p || x || E || _ || typeof s == "object" && s !== null && (s.$$typeof === v || s.$$typeof === f || s.$$typeof === c || s.$$typeof === i || s.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === B || s.getModuleId !== void 0));
    }
    function q(s, g, w) {
      var O = s.displayName;
      if (O)
        return O;
      var j = g.displayName || g.name || "";
      return j !== "" ? w + "(" + j + ")" : w;
    }
    function V(s) {
      return s.displayName || "Context";
    }
    function k(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case o:
          return "StrictMode";
        case u:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case i:
            var g = s;
            return V(g) + ".Consumer";
          case c:
            var w = s;
            return V(w._context) + ".Provider";
          case l:
            return q(s, s.render, "ForwardRef");
          case f:
            var O = s.displayName || null;
            return O !== null ? O : k(s.type) || "Memo";
          case v: {
            var j = s, I = j._payload, L = j._init;
            try {
              return k(L(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, N = 0, G, M, ae, ne, lt, Ae, ut;
    function Qe() {
    }
    Qe.__reactDisabledLog = !0;
    function zt() {
      {
        if (N === 0) {
          G = console.log, M = console.info, ae = console.warn, ne = console.error, lt = console.group, Ae = console.groupCollapsed, ut = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Qe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        N++;
      }
    }
    function Te() {
      {
        if (N--, N === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, s, {
              value: G
            }),
            info: D({}, s, {
              value: M
            }),
            warn: D({}, s, {
              value: ae
            }),
            error: D({}, s, {
              value: ne
            }),
            group: D({}, s, {
              value: lt
            }),
            groupCollapsed: D({}, s, {
              value: Ae
            }),
            groupEnd: D({}, s, {
              value: ut
            })
          });
        }
        N < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = y.ReactCurrentDispatcher, Re;
    function Le(s, g, w) {
      {
        if (Re === void 0)
          try {
            throw Error();
          } catch (j) {
            var O = j.stack.trim().match(/\n( *(at )?)/);
            Re = O && O[1] || "";
          }
        return `
` + Re + s;
      }
    }
    var he = !1, Fe;
    {
      var Gt = typeof WeakMap == "function" ? WeakMap : Map;
      Fe = new Gt();
    }
    function ft(s, g) {
      if (!s || he)
        return "";
      {
        var w = Fe.get(s);
        if (w !== void 0)
          return w;
      }
      var O;
      he = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = ie.current, ie.current = null, zt();
      try {
        if (g) {
          var L = function() {
            throw Error();
          };
          if (Object.defineProperty(L.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(L, []);
            } catch (ue) {
              O = ue;
            }
            Reflect.construct(s, [], L);
          } else {
            try {
              L.call();
            } catch (ue) {
              O = ue;
            }
            s.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ue) {
            O = ue;
          }
          s();
        }
      } catch (ue) {
        if (ue && O && typeof ue.stack == "string") {
          for (var T = ue.stack.split(`
`), Z = O.stack.split(`
`), U = T.length - 1, z = Z.length - 1; U >= 1 && z >= 0 && T[U] !== Z[z]; )
            z--;
          for (; U >= 1 && z >= 0; U--, z--)
            if (T[U] !== Z[z]) {
              if (U !== 1 || z !== 1)
                do
                  if (U--, z--, z < 0 || T[U] !== Z[z]) {
                    var re = `
` + T[U].replace(" at new ", " at ");
                    return s.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", s.displayName)), typeof s == "function" && Fe.set(s, re), re;
                  }
                while (U >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        he = !1, ie.current = I, Te(), Error.prepareStackTrace = j;
      }
      var Ie = s ? s.displayName || s.name : "", Bn = Ie ? Le(Ie) : "";
      return typeof s == "function" && Fe.set(s, Bn), Bn;
    }
    function Wt(s, g, w) {
      return ft(s, !1);
    }
    function qt(s) {
      var g = s.prototype;
      return !!(g && g.isReactComponent);
    }
    function ce(s, g, w) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return ft(s, qt(s));
      if (typeof s == "string")
        return Le(s);
      switch (s) {
        case u:
          return Le("Suspense");
        case d:
          return Le("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case l:
            return Wt(s.render);
          case f:
            return ce(s.type, g, w);
          case v: {
            var O = s, j = O._payload, I = O._init;
            try {
              return ce(I(j), g, w);
            } catch {
            }
          }
        }
      return "";
    }
    var xe = Object.prototype.hasOwnProperty, dt = {}, pt = y.ReactDebugCurrentFrame;
    function De(s) {
      if (s) {
        var g = s._owner, w = ce(s.type, s._source, g ? g.type : null);
        pt.setExtraStackFrame(w);
      } else
        pt.setExtraStackFrame(null);
    }
    function Xt(s, g, w, O, j) {
      {
        var I = Function.call.bind(xe);
        for (var L in s)
          if (I(s, L)) {
            var T = void 0;
            try {
              if (typeof s[L] != "function") {
                var Z = Error((O || "React class") + ": " + w + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Z.name = "Invariant Violation", Z;
              }
              T = s[L](g, L, O, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (U) {
              T = U;
            }
            T && !(T instanceof Error) && (De(j), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", w, L, typeof T), De(null)), T instanceof Error && !(T.message in dt) && (dt[T.message] = !0, De(j), C("Failed %s type: %s", w, T.message), De(null));
          }
      }
    }
    var je = Array.isArray;
    function Yt(s) {
      return je(s);
    }
    function So(s) {
      {
        var g = typeof Symbol == "function" && Symbol.toStringTag, w = g && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return w;
      }
    }
    function To(s) {
      try {
        return Sn(s), !1;
      } catch {
        return !0;
      }
    }
    function Sn(s) {
      return "" + s;
    }
    function Tn(s) {
      if (To(s))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", So(s)), Sn(s);
    }
    var Je = y.ReactCurrentOwner, Ro = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Rn, Ln, Kt;
    Kt = {};
    function Lo(s) {
      if (xe.call(s, "ref")) {
        var g = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Fo(s) {
      if (xe.call(s, "key")) {
        var g = Object.getOwnPropertyDescriptor(s, "key").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Do(s, g) {
      if (typeof s.ref == "string" && Je.current && g && Je.current.stateNode !== g) {
        var w = k(Je.current.type);
        Kt[w] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(Je.current.type), s.ref), Kt[w] = !0);
      }
    }
    function jo(s, g) {
      {
        var w = function() {
          Rn || (Rn = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        w.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: w,
          configurable: !0
        });
      }
    }
    function Mo(s, g) {
      {
        var w = function() {
          Ln || (Ln = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        w.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: w,
          configurable: !0
        });
      }
    }
    var Io = function(s, g, w, O, j, I, L) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: s,
        key: g,
        ref: w,
        props: L,
        // Record the component responsible for creating this element.
        _owner: I
      };
      return T._store = {}, Object.defineProperty(T._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(T, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: O
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function No(s, g, w, O, j) {
      {
        var I, L = {}, T = null, Z = null;
        w !== void 0 && (Tn(w), T = "" + w), Fo(g) && (Tn(g.key), T = "" + g.key), Lo(g) && (Z = g.ref, Do(g, j));
        for (I in g)
          xe.call(g, I) && !Ro.hasOwnProperty(I) && (L[I] = g[I]);
        if (s && s.defaultProps) {
          var U = s.defaultProps;
          for (I in U)
            L[I] === void 0 && (L[I] = U[I]);
        }
        if (T || Z) {
          var z = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          T && jo(L, z), Z && Mo(L, z);
        }
        return Io(s, T, Z, j, O, Je.current, L);
      }
    }
    var Zt = y.ReactCurrentOwner, Fn = y.ReactDebugCurrentFrame;
    function Me(s) {
      if (s) {
        var g = s._owner, w = ce(s.type, s._source, g ? g.type : null);
        Fn.setExtraStackFrame(w);
      } else
        Fn.setExtraStackFrame(null);
    }
    var Qt;
    Qt = !1;
    function Jt(s) {
      return typeof s == "object" && s !== null && s.$$typeof === t;
    }
    function Dn() {
      {
        if (Zt.current) {
          var s = k(Zt.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function Bo(s) {
      {
        if (s !== void 0) {
          var g = s.fileName.replace(/^.*[\\\/]/, ""), w = s.lineNumber;
          return `

Check your code at ` + g + ":" + w + ".";
        }
        return "";
      }
    }
    var jn = {};
    function Vo(s) {
      {
        var g = Dn();
        if (!g) {
          var w = typeof s == "string" ? s : s.displayName || s.name;
          w && (g = `

Check the top-level render call using <` + w + ">.");
        }
        return g;
      }
    }
    function Mn(s, g) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var w = Vo(g);
        if (jn[w])
          return;
        jn[w] = !0;
        var O = "";
        s && s._owner && s._owner !== Zt.current && (O = " It was passed a child from " + k(s._owner.type) + "."), Me(s), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, O), Me(null);
      }
    }
    function In(s, g) {
      {
        if (typeof s != "object")
          return;
        if (Yt(s))
          for (var w = 0; w < s.length; w++) {
            var O = s[w];
            Jt(O) && Mn(O, g);
          }
        else if (Jt(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var j = b(s);
          if (typeof j == "function" && j !== s.entries)
            for (var I = j.call(s), L; !(L = I.next()).done; )
              Jt(L.value) && Mn(L.value, g);
        }
      }
    }
    function Ho(s) {
      {
        var g = s.type;
        if (g == null || typeof g == "string")
          return;
        var w;
        if (typeof g == "function")
          w = g.propTypes;
        else if (typeof g == "object" && (g.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        g.$$typeof === f))
          w = g.propTypes;
        else
          return;
        if (w) {
          var O = k(g);
          Xt(w, s.props, "prop", O, s);
        } else if (g.PropTypes !== void 0 && !Qt) {
          Qt = !0;
          var j = k(g);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof g.getDefaultProps == "function" && !g.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ko(s) {
      {
        for (var g = Object.keys(s.props), w = 0; w < g.length; w++) {
          var O = g[w];
          if (O !== "children" && O !== "key") {
            Me(s), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), Me(null);
            break;
          }
        }
        s.ref !== null && (Me(s), C("Invalid attribute `ref` supplied to `React.Fragment`."), Me(null));
      }
    }
    function Nn(s, g, w, O, j, I) {
      {
        var L = X(s);
        if (!L) {
          var T = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Z = Bo(j);
          Z ? T += Z : T += Dn();
          var U;
          s === null ? U = "null" : Yt(s) ? U = "array" : s !== void 0 && s.$$typeof === t ? (U = "<" + (k(s.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : U = typeof s, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, T);
        }
        var z = No(s, g, w, j, I);
        if (z == null)
          return z;
        if (L) {
          var re = g.children;
          if (re !== void 0)
            if (O)
              if (Yt(re)) {
                for (var Ie = 0; Ie < re.length; Ie++)
                  In(re[Ie], s);
                Object.freeze && Object.freeze(re);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              In(re, s);
        }
        return s === r ? ko(z) : Ho(z), z;
      }
    }
    function Uo(s, g, w) {
      return Nn(s, g, w, !0);
    }
    function zo(s, g, w) {
      return Nn(s, g, w, !1);
    }
    var Go = zo, Wo = Uo;
    tt.Fragment = r, tt.jsx = Go, tt.jsxs = Wo;
  }()), tt;
}
process.env.NODE_ENV === "production" ? ln.exports = Qo() : ln.exports = Jo();
var S = ln.exports;
function ea(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
var ta = ["color"], na = /* @__PURE__ */ Q(function(e, t) {
  var n = e.color, r = n === void 0 ? "currentColor" : n, o = ea(e, ta);
  return F("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), F("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: r,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
function W() {
  return W = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, W.apply(this, arguments);
}
function me(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function ra(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Sr(...e) {
  return (t) => e.forEach(
    (n) => ra(n, t)
  );
}
function Oe(...e) {
  return Ee(Sr(...e), e);
}
function Tr(e, t = []) {
  let n = [];
  function r(a, c) {
    const i = /* @__PURE__ */ Et(c), l = n.length;
    n = [
      ...n,
      c
    ];
    function u(f) {
      const { scope: v, children: p, ...m } = f, h = (v == null ? void 0 : v[e][l]) || i, b = Pt(
        () => m,
        Object.values(m)
      );
      return /* @__PURE__ */ F(h.Provider, {
        value: b
      }, p);
    }
    function d(f, v) {
      const p = (v == null ? void 0 : v[e][l]) || i, m = it(p);
      if (m)
        return m;
      if (c !== void 0)
        return c;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return u.displayName = a + "Provider", [
      u,
      d
    ];
  }
  const o = () => {
    const a = n.map((c) => /* @__PURE__ */ Et(c));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return Pt(
        () => ({
          [`__scope${e}`]: {
            ...i,
            [e]: l
          }
        }),
        [
          i,
          l
        ]
      );
    };
  };
  return o.scopeName = e, [
    r,
    oa(o, ...t)
  ];
}
function oa(...e) {
  const t = e[0];
  if (e.length === 1)
    return t;
  const n = () => {
    const r = e.map(
      (o) => ({
        useScope: o(),
        scopeName: o.scopeName
      })
    );
    return function(a) {
      const c = r.reduce((i, { useScope: l, scopeName: u }) => {
        const f = l(a)[`__scope${u}`];
        return {
          ...i,
          ...f
        };
      }, {});
      return Pt(
        () => ({
          [`__scope${t.scopeName}`]: c
        }),
        [
          c
        ]
      );
    };
  };
  return n.scopeName = t.scopeName, n;
}
const gn = /* @__PURE__ */ Q((e, t) => {
  const { children: n, ...r } = e, o = He.toArray(n), a = o.find(ia);
  if (a) {
    const c = a.props.children, i = o.map((l) => l === a ? He.count(c) > 1 ? He.only(null) : /* @__PURE__ */ Ot(c) ? c.props.children : null : l);
    return /* @__PURE__ */ F(un, W({}, r, {
      ref: t
    }), /* @__PURE__ */ Ot(c) ? /* @__PURE__ */ hn(c, void 0, i) : null);
  }
  return /* @__PURE__ */ F(un, W({}, r, {
    ref: t
  }), n);
});
gn.displayName = "Slot";
const un = /* @__PURE__ */ Q((e, t) => {
  const { children: n, ...r } = e;
  return /* @__PURE__ */ Ot(n) ? /* @__PURE__ */ hn(n, {
    ...ca(r, n.props),
    ref: t ? Sr(t, n.ref) : n.ref
  }) : He.count(n) > 1 ? He.only(null) : null;
});
un.displayName = "SlotClone";
const aa = ({ children: e }) => /* @__PURE__ */ F(qo, null, e);
function ia(e) {
  return /* @__PURE__ */ Ot(e) && e.type === aa;
}
function ca(e, t) {
  const n = {
    ...t
  };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      a(...i), o(...i);
    } : o && (n[r] = o) : r === "style" ? n[r] = {
      ...o,
      ...a
    } : r === "className" && (n[r] = [
      o,
      a
    ].filter(Boolean).join(" "));
  }
  return {
    ...e,
    ...n
  };
}
const sa = [
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
], $e = sa.reduce((e, t) => {
  const n = /* @__PURE__ */ Q((r, o) => {
    const { asChild: a, ...c } = r, i = a ? gn : t;
    return Y(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ F(i, W({}, c, {
      ref: o
    }));
  });
  return n.displayName = `Primitive.${t}`, {
    ...e,
    [t]: n
  };
}, {});
function la(e, t) {
  e && _r(
    () => e.dispatchEvent(t)
  );
}
function be(e) {
  const t = K(e);
  return Y(() => {
    t.current = e;
  }), Pt(
    () => (...n) => {
      var r;
      return (r = t.current) === null || r === void 0 ? void 0 : r.call(t, ...n);
    },
    []
  );
}
function ua(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = be(e);
  Y(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r), () => t.removeEventListener("keydown", r);
  }, [
    n,
    t
  ]);
}
const fn = "dismissableLayer.update", fa = "dismissableLayer.pointerDownOutside", da = "dismissableLayer.focusOutside";
let kn;
const pa = /* @__PURE__ */ Et({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), va = /* @__PURE__ */ Q((e, t) => {
  var n;
  const { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: o, onPointerDownOutside: a, onFocusOutside: c, onInteractOutside: i, onDismiss: l, ...u } = e, d = it(pa), [f, v] = ee(null), p = (n = f == null ? void 0 : f.ownerDocument) !== null && n !== void 0 ? n : globalThis == null ? void 0 : globalThis.document, [, m] = ee({}), h = Oe(
    t,
    ($) => v($)
  ), b = Array.from(d.layers), [y] = [
    ...d.layersWithOutsidePointerEventsDisabled
  ].slice(-1), C = b.indexOf(y), A = f ? b.indexOf(f) : -1, x = d.layersWithOutsidePointerEventsDisabled.size > 0, E = A >= C, _ = ha(($) => {
    const B = $.target, X = [
      ...d.branches
    ].some(
      (q) => q.contains(B)
    );
    !E || X || (a == null || a($), i == null || i($), $.defaultPrevented || l == null || l());
  }, p), R = ga(($) => {
    const B = $.target;
    [
      ...d.branches
    ].some(
      (q) => q.contains(B)
    ) || (c == null || c($), i == null || i($), $.defaultPrevented || l == null || l());
  }, p);
  return ua(($) => {
    A === d.layers.size - 1 && (o == null || o($), !$.defaultPrevented && l && ($.preventDefault(), l()));
  }, p), Y(() => {
    if (f)
      return r && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (kn = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), Un(), () => {
        r && d.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = kn);
      };
  }, [
    f,
    p,
    r,
    d
  ]), Y(() => () => {
    f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), Un());
  }, [
    f,
    d
  ]), Y(() => {
    const $ = () => m({});
    return document.addEventListener(fn, $), () => document.removeEventListener(fn, $);
  }, []), /* @__PURE__ */ F($e.div, W({}, u, {
    ref: h,
    style: {
      pointerEvents: x ? E ? "auto" : "none" : void 0,
      ...e.style
    },
    onFocusCapture: me(e.onFocusCapture, R.onFocusCapture),
    onBlurCapture: me(e.onBlurCapture, R.onBlurCapture),
    onPointerDownCapture: me(e.onPointerDownCapture, _.onPointerDownCapture)
  }));
});
function ha(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = be(e), r = K(!1), o = K(() => {
  });
  return Y(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let u = function() {
          Rr(fa, n, l, {
            discrete: !0
          });
        };
        const l = {
          originalEvent: i
        };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, {
          once: !0
        })) : u();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, c = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(c), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [
    t,
    n
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function ga(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = be(e), r = K(!1);
  return Y(() => {
    const o = (a) => {
      a.target && !r.current && Rr(da, n, {
        originalEvent: a
      }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [
    t,
    n
  ]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Un() {
  const e = new CustomEvent(fn);
  document.dispatchEvent(e);
}
function Rr(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, {
    once: !0
  }), r ? la(o, a) : o.dispatchEvent(a);
}
let en = 0;
function ma() {
  Y(() => {
    var e, t;
    const n = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", (e = n[0]) !== null && e !== void 0 ? e : zn()), document.body.insertAdjacentElement("beforeend", (t = n[1]) !== null && t !== void 0 ? t : zn()), en++, () => {
      en === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach(
        (r) => r.remove()
      ), en--;
    };
  }, []);
}
function zn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e;
}
const tn = "focusScope.autoFocusOnMount", nn = "focusScope.autoFocusOnUnmount", Gn = {
  bubbles: !1,
  cancelable: !0
}, ba = /* @__PURE__ */ Q((e, t) => {
  const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: a, ...c } = e, [i, l] = ee(null), u = be(o), d = be(a), f = K(null), v = Oe(
    t,
    (h) => l(h)
  ), p = K({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  Y(() => {
    if (r) {
      let h = function(A) {
        if (p.paused || !i)
          return;
        const x = A.target;
        i.contains(x) ? f.current = x : ge(f.current, {
          select: !0
        });
      }, b = function(A) {
        if (p.paused || !i)
          return;
        const x = A.relatedTarget;
        x !== null && (i.contains(x) || ge(f.current, {
          select: !0
        }));
      }, y = function(A) {
        if (document.activeElement === document.body)
          for (const E of A)
            E.removedNodes.length > 0 && ge(i);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", b);
      const C = new MutationObserver(y);
      return i && C.observe(i, {
        childList: !0,
        subtree: !0
      }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", b), C.disconnect();
      };
    }
  }, [
    r,
    i,
    p.paused
  ]), Y(() => {
    if (i) {
      qn.add(p);
      const h = document.activeElement;
      if (!i.contains(h)) {
        const y = new CustomEvent(tn, Gn);
        i.addEventListener(tn, u), i.dispatchEvent(y), y.defaultPrevented || (ya(Ea(Lr(i)), {
          select: !0
        }), document.activeElement === h && ge(i));
      }
      return () => {
        i.removeEventListener(tn, u), setTimeout(() => {
          const y = new CustomEvent(nn, Gn);
          i.addEventListener(nn, d), i.dispatchEvent(y), y.defaultPrevented || ge(h ?? document.body, {
            select: !0
          }), i.removeEventListener(nn, d), qn.remove(p);
        }, 0);
      };
    }
  }, [
    i,
    u,
    d,
    p
  ]);
  const m = Ee((h) => {
    if (!n && !r || p.paused)
      return;
    const b = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, y = document.activeElement;
    if (b && y) {
      const C = h.currentTarget, [A, x] = Ca(C);
      A && x ? !h.shiftKey && y === x ? (h.preventDefault(), n && ge(A, {
        select: !0
      })) : h.shiftKey && y === A && (h.preventDefault(), n && ge(x, {
        select: !0
      })) : y === C && h.preventDefault();
    }
  }, [
    n,
    r,
    p.paused
  ]);
  return /* @__PURE__ */ F($e.div, W({
    tabIndex: -1
  }, c, {
    ref: v,
    onKeyDown: m
  }));
});
function ya(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (ge(r, {
      select: t
    }), document.activeElement !== n)
      return;
}
function Ca(e) {
  const t = Lr(e), n = Wn(t, e), r = Wn(t.reverse(), e);
  return [
    n,
    r
  ];
}
function Lr(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}
function Wn(e, t) {
  for (const n of e)
    if (!wa(n, {
      upTo: t
    }))
      return n;
}
function wa(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function Aa(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ge(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({
      preventScroll: !0
    }), e !== n && Aa(e) && t && e.select();
  }
}
const qn = xa();
function xa() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Xn(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Xn(e, t), (n = e[0]) === null || n === void 0 || n.resume();
    }
  };
}
function Xn(e, t) {
  const n = [
    ...e
  ], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Ea(e) {
  return e.filter(
    (t) => t.tagName !== "A"
  );
}
const Ue = globalThis != null && globalThis.document ? $r : () => {
}, Pa = P.useId || (() => {
});
let Oa = 0;
function $a(e) {
  const [t, n] = P.useState(Pa());
  return Ue(() => {
    e || n(
      (r) => r ?? String(Oa++)
    );
  }, [
    e
  ]), e || (t ? `radix-${t}` : "");
}
const _a = ["top", "right", "bottom", "left"], ye = Math.min, J = Math.max, $t = Math.round, ht = Math.floor, Ce = (e) => ({
  x: e,
  y: e
}), Sa = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ta = {
  start: "end",
  end: "start"
};
function dn(e, t, n) {
  return J(e, ye(t, n));
}
function fe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function de(e) {
  return e.split("-")[0];
}
function Ge(e) {
  return e.split("-")[1];
}
function mn(e) {
  return e === "x" ? "y" : "x";
}
function bn(e) {
  return e === "y" ? "height" : "width";
}
function We(e) {
  return ["top", "bottom"].includes(de(e)) ? "y" : "x";
}
function yn(e) {
  return mn(We(e));
}
function Ra(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ge(e), o = yn(e), a = bn(o);
  let c = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (c = _t(c)), [c, _t(c)];
}
function La(e) {
  const t = _t(e);
  return [pn(e), t, pn(t)];
}
function pn(e) {
  return e.replace(/start|end/g, (t) => Ta[t]);
}
function Fa(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], c = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? a : c;
    default:
      return [];
  }
}
function Da(e, t, n, r) {
  const o = Ge(e);
  let a = Fa(de(e), n === "start", r);
  return o && (a = a.map((c) => c + "-" + o), t && (a = a.concat(a.map(pn)))), a;
}
function _t(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Sa[t]);
}
function ja(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Fr(e) {
  return typeof e != "number" ? ja(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function St(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Yn(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = We(t), c = yn(t), i = bn(c), l = de(t), u = a === "y", d = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, v = r[i] / 2 - o[i] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Ge(t)) {
    case "start":
      p[c] -= v * (n && u ? -1 : 1);
      break;
    case "end":
      p[c] += v * (n && u ? -1 : 1);
      break;
  }
  return p;
}
const Ma = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: c
  } = n, i = a.filter(Boolean), l = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let u = await c.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: f
  } = Yn(u, r, l), v = r, p = {}, m = 0;
  for (let h = 0; h < i.length; h++) {
    const {
      name: b,
      fn: y
    } = i[h], {
      x: C,
      y: A,
      data: x,
      reset: E
    } = await y({
      x: d,
      y: f,
      initialPlacement: r,
      placement: v,
      strategy: o,
      middlewareData: p,
      rects: u,
      platform: c,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (d = C ?? d, f = A ?? f, p = {
      ...p,
      [b]: {
        ...p[b],
        ...x
      }
    }, E && m <= 50) {
      m++, typeof E == "object" && (E.placement && (v = E.placement), E.rects && (u = E.rects === !0 ? await c.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : E.rects), {
        x: d,
        y: f
      } = Yn(u, v, l)), h = -1;
      continue;
    }
  }
  return {
    x: d,
    y: f,
    placement: v,
    strategy: o,
    middlewareData: p
  };
};
async function rt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: c,
    elements: i,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: v = !1,
    padding: p = 0
  } = fe(t, e), m = Fr(p), b = i[v ? f === "floating" ? "reference" : "floating" : f], y = St(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: l
  })), C = f === "floating" ? {
    ...c.floating,
    x: r,
    y: o
  } : c.reference, A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), x = await (a.isElement == null ? void 0 : a.isElement(A)) ? await (a.getScale == null ? void 0 : a.getScale(A)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = St(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: A,
    strategy: l
  }) : C);
  return {
    top: (y.top - E.top + m.top) / x.y,
    bottom: (E.bottom - y.bottom + m.bottom) / x.y,
    left: (y.left - E.left + m.left) / x.x,
    right: (E.right - y.right + m.right) / x.x
  };
}
const Ia = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: c,
      elements: i,
      middlewareData: l
    } = t, {
      element: u,
      padding: d = 0
    } = fe(e, t) || {};
    if (u == null)
      return {};
    const f = Fr(d), v = {
      x: n,
      y: r
    }, p = yn(o), m = bn(p), h = await c.getDimensions(u), b = p === "y", y = b ? "top" : "left", C = b ? "bottom" : "right", A = b ? "clientHeight" : "clientWidth", x = a.reference[m] + a.reference[p] - v[p] - a.floating[m], E = v[p] - a.reference[p], _ = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(u));
    let R = _ ? _[A] : 0;
    (!R || !await (c.isElement == null ? void 0 : c.isElement(_))) && (R = i.floating[A] || a.floating[m]);
    const $ = x / 2 - E / 2, B = R / 2 - h[m] / 2 - 1, X = ye(f[y], B), q = ye(f[C], B), V = X, k = R - h[m] - q, D = R / 2 - h[m] / 2 + $, N = dn(V, D, k), G = !l.arrow && Ge(o) != null && D != N && a.reference[m] / 2 - (D < V ? X : q) - h[m] / 2 < 0, M = G ? D < V ? D - V : D - k : 0;
    return {
      [p]: v[p] + M,
      data: {
        [p]: N,
        centerOffset: D - N - M,
        ...G && {
          alignmentOffset: M
        }
      },
      reset: G
    };
  }
}), Na = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: c,
        initialPlacement: i,
        platform: l,
        elements: u
      } = t, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: v,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: h = !0,
        ...b
      } = fe(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = de(o), C = de(i) === i, A = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), x = v || (C || !h ? [_t(i)] : La(i));
      !v && m !== "none" && x.push(...Da(i, h, m, A));
      const E = [i, ...x], _ = await rt(t, b), R = [];
      let $ = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && R.push(_[y]), f) {
        const V = Ra(o, c, A);
        R.push(_[V[0]], _[V[1]]);
      }
      if ($ = [...$, {
        placement: o,
        overflows: R
      }], !R.every((V) => V <= 0)) {
        var B, X;
        const V = (((B = a.flip) == null ? void 0 : B.index) || 0) + 1, k = E[V];
        if (k)
          return {
            data: {
              index: V,
              overflows: $
            },
            reset: {
              placement: k
            }
          };
        let D = (X = $.filter((N) => N.overflows[0] <= 0).sort((N, G) => N.overflows[1] - G.overflows[1])[0]) == null ? void 0 : X.placement;
        if (!D)
          switch (p) {
            case "bestFit": {
              var q;
              const N = (q = $.map((G) => [G.placement, G.overflows.filter((M) => M > 0).reduce((M, ae) => M + ae, 0)]).sort((G, M) => G[1] - M[1])[0]) == null ? void 0 : q[0];
              N && (D = N);
              break;
            }
            case "initialPlacement":
              D = i;
              break;
          }
        if (o !== D)
          return {
            reset: {
              placement: D
            }
          };
      }
      return {};
    }
  };
};
function Kn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Zn(e) {
  return _a.some((t) => e[t] >= 0);
}
const Ba = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = fe(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await rt(t, {
            ...o,
            elementContext: "reference"
          }), c = Kn(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Zn(c)
            }
          };
        }
        case "escaped": {
          const a = await rt(t, {
            ...o,
            altBoundary: !0
          }), c = Kn(a, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Zn(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Va(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), c = de(n), i = Ge(n), l = We(n) === "y", u = ["left", "top"].includes(c) ? -1 : 1, d = a && l ? -1 : 1, f = fe(t, e);
  let {
    mainAxis: v,
    crossAxis: p,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return i && typeof m == "number" && (p = i === "end" ? m * -1 : m), l ? {
    x: p * d,
    y: v * u
  } : {
    x: v * u,
    y: p * d
  };
}
const Ha = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: c,
        middlewareData: i
      } = t, l = await Va(t, e);
      return c === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: a + l.y,
        data: {
          ...l,
          placement: c
        }
      };
    }
  };
}, ka = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: c = !1,
        limiter: i = {
          fn: (b) => {
            let {
              x: y,
              y: C
            } = b;
            return {
              x: y,
              y: C
            };
          }
        },
        ...l
      } = fe(e, t), u = {
        x: n,
        y: r
      }, d = await rt(t, l), f = We(de(o)), v = mn(f);
      let p = u[v], m = u[f];
      if (a) {
        const b = v === "y" ? "top" : "left", y = v === "y" ? "bottom" : "right", C = p + d[b], A = p - d[y];
        p = dn(C, p, A);
      }
      if (c) {
        const b = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", C = m + d[b], A = m - d[y];
        m = dn(C, m, A);
      }
      const h = i.fn({
        ...t,
        [v]: p,
        [f]: m
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r
        }
      };
    }
  };
}, Ua = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: c
      } = t, {
        offset: i = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = fe(e, t), d = {
        x: n,
        y: r
      }, f = We(o), v = mn(f);
      let p = d[v], m = d[f];
      const h = fe(i, t), b = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (l) {
        const A = v === "y" ? "height" : "width", x = a.reference[v] - a.floating[A] + b.mainAxis, E = a.reference[v] + a.reference[A] - b.mainAxis;
        p < x ? p = x : p > E && (p = E);
      }
      if (u) {
        var y, C;
        const A = v === "y" ? "width" : "height", x = ["top", "left"].includes(de(o)), E = a.reference[f] - a.floating[A] + (x && ((y = c.offset) == null ? void 0 : y[f]) || 0) + (x ? 0 : b.crossAxis), _ = a.reference[f] + a.reference[A] + (x ? 0 : ((C = c.offset) == null ? void 0 : C[f]) || 0) - (x ? b.crossAxis : 0);
        m < E ? m = E : m > _ && (m = _);
      }
      return {
        [v]: p,
        [f]: m
      };
    }
  };
}, za = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: a
      } = t, {
        apply: c = () => {
        },
        ...i
      } = fe(e, t), l = await rt(t, i), u = de(n), d = Ge(n), f = We(n) === "y", {
        width: v,
        height: p
      } = r.floating;
      let m, h;
      u === "top" || u === "bottom" ? (m = u, h = d === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = u, m = d === "end" ? "top" : "bottom");
      const b = p - l[m], y = v - l[h], C = !t.middlewareData.shift;
      let A = b, x = y;
      if (f) {
        const _ = v - l.left - l.right;
        x = d || C ? ye(y, _) : _;
      } else {
        const _ = p - l.top - l.bottom;
        A = d || C ? ye(b, _) : _;
      }
      if (C && !d) {
        const _ = J(l.left, 0), R = J(l.right, 0), $ = J(l.top, 0), B = J(l.bottom, 0);
        f ? x = v - 2 * (_ !== 0 || R !== 0 ? _ + R : J(l.left, l.right)) : A = p - 2 * ($ !== 0 || B !== 0 ? $ + B : J(l.top, l.bottom));
      }
      await c({
        ...t,
        availableWidth: x,
        availableHeight: A
      });
      const E = await o.getDimensions(a.floating);
      return v !== E.width || p !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function we(e) {
  return Dr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ve(e) {
  var t;
  return (t = (Dr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Dr(e) {
  return e instanceof Node || e instanceof te(e).Node;
}
function pe(e) {
  return e instanceof Element || e instanceof te(e).Element;
}
function le(e) {
  return e instanceof HTMLElement || e instanceof te(e).HTMLElement;
}
function Qn(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof te(e).ShadowRoot;
}
function ct(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = oe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Ga(e) {
  return ["table", "td", "th"].includes(we(e));
}
function Cn(e) {
  const t = wn(), n = oe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Wa(e) {
  let t = ze(e);
  for (; le(t) && !Dt(t); ) {
    if (Cn(t))
      return t;
    t = ze(t);
  }
  return null;
}
function wn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Dt(e) {
  return ["html", "body", "#document"].includes(we(e));
}
function oe(e) {
  return te(e).getComputedStyle(e);
}
function jt(e) {
  return pe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function ze(e) {
  if (we(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Qn(e) && e.host || // Fallback.
    ve(e)
  );
  return Qn(t) ? t.host : t;
}
function jr(e) {
  const t = ze(e);
  return Dt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : le(t) && ct(t) ? t : jr(t);
}
function ot(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = jr(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), c = te(o);
  return a ? t.concat(c, c.visualViewport || [], ct(o) ? o : [], c.frameElement && n ? ot(c.frameElement) : []) : t.concat(o, ot(o, [], n));
}
function Mr(e) {
  const t = oe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = le(e), a = o ? e.offsetWidth : n, c = o ? e.offsetHeight : r, i = $t(n) !== a || $t(r) !== c;
  return i && (n = a, r = c), {
    width: n,
    height: r,
    $: i
  };
}
function An(e) {
  return pe(e) ? e : e.contextElement;
}
function ke(e) {
  const t = An(e);
  if (!le(t))
    return Ce(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Mr(t);
  let c = (a ? $t(n.width) : n.width) / r, i = (a ? $t(n.height) : n.height) / o;
  return (!c || !Number.isFinite(c)) && (c = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: c,
    y: i
  };
}
const qa = /* @__PURE__ */ Ce(0);
function Ir(e) {
  const t = te(e);
  return !wn() || !t.visualViewport ? qa : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Xa(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== te(e) ? !1 : t;
}
function Pe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = An(e);
  let c = Ce(1);
  t && (r ? pe(r) && (c = ke(r)) : c = ke(e));
  const i = Xa(a, n, r) ? Ir(a) : Ce(0);
  let l = (o.left + i.x) / c.x, u = (o.top + i.y) / c.y, d = o.width / c.x, f = o.height / c.y;
  if (a) {
    const v = te(a), p = r && pe(r) ? te(r) : r;
    let m = v.frameElement;
    for (; m && r && p !== v; ) {
      const h = ke(m), b = m.getBoundingClientRect(), y = oe(m), C = b.left + (m.clientLeft + parseFloat(y.paddingLeft)) * h.x, A = b.top + (m.clientTop + parseFloat(y.paddingTop)) * h.y;
      l *= h.x, u *= h.y, d *= h.x, f *= h.y, l += C, u += A, m = te(m).frameElement;
    }
  }
  return St({
    width: d,
    height: f,
    x: l,
    y: u
  });
}
function Ya(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const o = le(n), a = ve(n);
  if (n === a)
    return t;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = Ce(1);
  const l = Ce(0);
  if ((o || !o && r !== "fixed") && ((we(n) !== "body" || ct(a)) && (c = jt(n)), le(n))) {
    const u = Pe(n);
    i = ke(n), l.x = u.x + n.clientLeft, l.y = u.y + n.clientTop;
  }
  return {
    width: t.width * i.x,
    height: t.height * i.y,
    x: t.x * i.x - c.scrollLeft * i.x + l.x,
    y: t.y * i.y - c.scrollTop * i.y + l.y
  };
}
function Ka(e) {
  return Array.from(e.getClientRects());
}
function Nr(e) {
  return Pe(ve(e)).left + jt(e).scrollLeft;
}
function Za(e) {
  const t = ve(e), n = jt(e), r = e.ownerDocument.body, o = J(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = J(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let c = -n.scrollLeft + Nr(e);
  const i = -n.scrollTop;
  return oe(r).direction === "rtl" && (c += J(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: c,
    y: i
  };
}
function Qa(e, t) {
  const n = te(e), r = ve(e), o = n.visualViewport;
  let a = r.clientWidth, c = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, c = o.height;
    const u = wn();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: a,
    height: c,
    x: i,
    y: l
  };
}
function Ja(e, t) {
  const n = Pe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = le(e) ? ke(e) : Ce(1), c = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, u = r * a.y;
  return {
    width: c,
    height: i,
    x: l,
    y: u
  };
}
function Jn(e, t, n) {
  let r;
  if (t === "viewport")
    r = Qa(e, n);
  else if (t === "document")
    r = Za(ve(e));
  else if (pe(t))
    r = Ja(t, n);
  else {
    const o = Ir(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return St(r);
}
function Br(e, t) {
  const n = ze(e);
  return n === t || !pe(n) || Dt(n) ? !1 : oe(n).position === "fixed" || Br(n, t);
}
function ei(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ot(e, [], !1).filter((i) => pe(i) && we(i) !== "body"), o = null;
  const a = oe(e).position === "fixed";
  let c = a ? ze(e) : e;
  for (; pe(c) && !Dt(c); ) {
    const i = oe(c), l = Cn(c);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || ct(c) && !l && Br(e, c)) ? r = r.filter((d) => d !== c) : o = i, c = ze(c);
  }
  return t.set(e, r), r;
}
function ti(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const c = [...n === "clippingAncestors" ? ei(t, this._c) : [].concat(n), r], i = c[0], l = c.reduce((u, d) => {
    const f = Jn(t, d, o);
    return u.top = J(f.top, u.top), u.right = ye(f.right, u.right), u.bottom = ye(f.bottom, u.bottom), u.left = J(f.left, u.left), u;
  }, Jn(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function ni(e) {
  const {
    width: t,
    height: n
  } = Mr(e);
  return {
    width: t,
    height: n
  };
}
function ri(e, t, n) {
  const r = le(t), o = ve(t), a = n === "fixed", c = Pe(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ce(0);
  if (r || !r && !a)
    if ((we(t) !== "body" || ct(o)) && (i = jt(t)), r) {
      const u = Pe(t, !0, a, t);
      l.x = u.x + t.clientLeft, l.y = u.y + t.clientTop;
    } else
      o && (l.x = Nr(o));
  return {
    x: c.left + i.scrollLeft - l.x,
    y: c.top + i.scrollTop - l.y,
    width: c.width,
    height: c.height
  };
}
function er(e, t) {
  return !le(e) || oe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Vr(e, t) {
  const n = te(e);
  if (!le(e))
    return n;
  let r = er(e, t);
  for (; r && Ga(r) && oe(r).position === "static"; )
    r = er(r, t);
  return r && (we(r) === "html" || we(r) === "body" && oe(r).position === "static" && !Cn(r)) ? n : r || Wa(e) || n;
}
const oi = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || Vr, a = this.getDimensions;
  return {
    reference: ri(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function ai(e) {
  return oe(e).direction === "rtl";
}
const ii = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ya,
  getDocumentElement: ve,
  getClippingRect: ti,
  getOffsetParent: Vr,
  getElementRects: oi,
  getClientRects: Ka,
  getDimensions: ni,
  getScale: ke,
  isElement: pe,
  isRTL: ai
};
function ci(e, t) {
  let n = null, r;
  const o = ve(e);
  function a() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function c(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), a();
    const {
      left: u,
      top: d,
      width: f,
      height: v
    } = e.getBoundingClientRect();
    if (i || t(), !f || !v)
      return;
    const p = ht(d), m = ht(o.clientWidth - (u + f)), h = ht(o.clientHeight - (d + v)), b = ht(u), C = {
      rootMargin: -p + "px " + -m + "px " + -h + "px " + -b + "px",
      threshold: J(0, ye(1, l)) || 1
    };
    let A = !0;
    function x(E) {
      const _ = E[0].intersectionRatio;
      if (_ !== l) {
        if (!A)
          return c();
        _ ? c(!1, _) : r = setTimeout(() => {
          c(!1, 1e-7);
        }, 100);
      }
      A = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...C,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, C);
    }
    n.observe(e);
  }
  return c(!0), a;
}
function si(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: c = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = An(e), d = o || a ? [...u ? ot(u) : [], ...ot(t)] : [];
  d.forEach((y) => {
    o && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const f = u && i ? ci(u, n) : null;
  let v = -1, p = null;
  c && (p = new ResizeObserver((y) => {
    let [C] = y;
    C && C.target === u && p && (p.unobserve(t), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      p && p.observe(t);
    })), n();
  }), u && !l && p.observe(u), p.observe(t));
  let m, h = l ? Pe(e) : null;
  l && b();
  function b() {
    const y = Pe(e);
    h && (y.x !== h.x || y.y !== h.y || y.width !== h.width || y.height !== h.height) && n(), h = y, m = requestAnimationFrame(b);
  }
  return n(), () => {
    d.forEach((y) => {
      o && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), f && f(), p && p.disconnect(), p = null, l && cancelAnimationFrame(m);
  };
}
const li = ka, ui = Na, fi = za, di = Ba, tr = Ia, pi = Ua, vi = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: ii,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Ma(e, t, {
    ...o,
    platform: a
  });
}, hi = (e) => {
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
      return r && t(r) ? r.current != null ? tr({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? tr({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
};
var wt = typeof document < "u" ? $r : Y;
function Tt(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Tt(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !Tt(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Hr(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function nr(e, t) {
  const n = Hr(e);
  return Math.round(t * n) / n;
}
function rr(e) {
  const t = P.useRef(e);
  return wt(() => {
    t.current = e;
  }), t;
}
function gi(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: c
    } = {},
    transform: i = !0,
    whileElementsMounted: l,
    open: u
  } = e, [d, f] = P.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [v, p] = P.useState(r);
  Tt(v, r) || p(r);
  const [m, h] = P.useState(null), [b, y] = P.useState(null), C = P.useCallback((M) => {
    M !== _.current && (_.current = M, h(M));
  }, []), A = P.useCallback((M) => {
    M !== R.current && (R.current = M, y(M));
  }, []), x = a || m, E = c || b, _ = P.useRef(null), R = P.useRef(null), $ = P.useRef(d), B = l != null, X = rr(l), q = rr(o), V = P.useCallback(() => {
    if (!_.current || !R.current)
      return;
    const M = {
      placement: t,
      strategy: n,
      middleware: v
    };
    q.current && (M.platform = q.current), vi(_.current, R.current, M).then((ae) => {
      const ne = {
        ...ae,
        isPositioned: !0
      };
      k.current && !Tt($.current, ne) && ($.current = ne, Yo.flushSync(() => {
        f(ne);
      }));
    });
  }, [v, t, n, q]);
  wt(() => {
    u === !1 && $.current.isPositioned && ($.current.isPositioned = !1, f((M) => ({
      ...M,
      isPositioned: !1
    })));
  }, [u]);
  const k = P.useRef(!1);
  wt(() => (k.current = !0, () => {
    k.current = !1;
  }), []), wt(() => {
    if (x && (_.current = x), E && (R.current = E), x && E) {
      if (X.current)
        return X.current(x, E, V);
      V();
    }
  }, [x, E, V, X, B]);
  const D = P.useMemo(() => ({
    reference: _,
    floating: R,
    setReference: C,
    setFloating: A
  }), [C, A]), N = P.useMemo(() => ({
    reference: x,
    floating: E
  }), [x, E]), G = P.useMemo(() => {
    const M = {
      position: n,
      left: 0,
      top: 0
    };
    if (!N.floating)
      return M;
    const ae = nr(N.floating, d.x), ne = nr(N.floating, d.y);
    return i ? {
      ...M,
      transform: "translate(" + ae + "px, " + ne + "px)",
      ...Hr(N.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: ae,
      top: ne
    };
  }, [n, i, N.floating, d.x, d.y]);
  return P.useMemo(() => ({
    ...d,
    update: V,
    refs: D,
    elements: N,
    floatingStyles: G
  }), [d, V, D, N, G]);
}
function mi(e) {
  const [t, n] = ee(void 0);
  return Ue(() => {
    if (e) {
      n({
        width: e.offsetWidth,
        height: e.offsetHeight
      });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let c, i;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          c = u.inlineSize, i = u.blockSize;
        } else
          c = e.offsetWidth, i = e.offsetHeight;
        n({
          width: c,
          height: i
        });
      });
      return r.observe(e, {
        box: "border-box"
      }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [
    e
  ]), t;
}
const kr = "Popper", [Ur, zr] = Tr(kr), [bi, Gr] = Ur(kr), yi = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = ee(null);
  return /* @__PURE__ */ F(bi, {
    scope: t,
    anchor: r,
    onAnchorChange: o
  }, n);
}, Ci = "PopperAnchor", wi = /* @__PURE__ */ Q((e, t) => {
  const { __scopePopper: n, virtualRef: r, ...o } = e, a = Gr(Ci, n), c = K(null), i = Oe(t, c);
  return Y(() => {
    a.onAnchorChange((r == null ? void 0 : r.current) || c.current);
  }), r ? null : /* @__PURE__ */ F($e.div, W({}, o, {
    ref: i
  }));
}), Wr = "PopperContent", [Ai, Zd] = Ur(Wr), xi = /* @__PURE__ */ Q((e, t) => {
  var n, r, o, a, c, i, l, u;
  const { __scopePopper: d, side: f = "bottom", sideOffset: v = 0, align: p = "center", alignOffset: m = 0, arrowPadding: h = 0, avoidCollisions: b = !0, collisionBoundary: y = [], collisionPadding: C = 0, sticky: A = "partial", hideWhenDetached: x = !1, updatePositionStrategy: E = "optimized", onPlaced: _, ...R } = e, $ = Gr(Wr, d), [B, X] = ee(null), q = Oe(
    t,
    (ce) => X(ce)
  ), [V, k] = ee(null), D = mi(V), N = (n = D == null ? void 0 : D.width) !== null && n !== void 0 ? n : 0, G = (r = D == null ? void 0 : D.height) !== null && r !== void 0 ? r : 0, M = f + (p !== "center" ? "-" + p : ""), ae = typeof C == "number" ? C : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...C
  }, ne = Array.isArray(y) ? y : [
    y
  ], lt = ne.length > 0, Ae = {
    padding: ae,
    boundary: ne.filter(Ei),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: lt
  }, { refs: ut, floatingStyles: Qe, placement: zt, isPositioned: Te, middlewareData: ie } = gi({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: "fixed",
    placement: M,
    whileElementsMounted: (...ce) => si(...ce, {
      animationFrame: E === "always"
    }),
    elements: {
      reference: $.anchor
    },
    middleware: [
      Ha({
        mainAxis: v + G,
        alignmentAxis: m
      }),
      b && li({
        mainAxis: !0,
        crossAxis: !1,
        limiter: A === "partial" ? pi() : void 0,
        ...Ae
      }),
      b && ui({
        ...Ae
      }),
      fi({
        ...Ae,
        apply: ({ elements: ce, rects: xe, availableWidth: dt, availableHeight: pt }) => {
          const { width: De, height: Xt } = xe.reference, je = ce.floating.style;
          je.setProperty("--radix-popper-available-width", `${dt}px`), je.setProperty("--radix-popper-available-height", `${pt}px`), je.setProperty("--radix-popper-anchor-width", `${De}px`), je.setProperty("--radix-popper-anchor-height", `${Xt}px`);
        }
      }),
      V && hi({
        element: V,
        padding: h
      }),
      Pi({
        arrowWidth: N,
        arrowHeight: G
      }),
      x && di({
        strategy: "referenceHidden",
        ...Ae
      })
    ]
  }), [Re, Le] = qr(zt), he = be(_);
  Ue(() => {
    Te && (he == null || he());
  }, [
    Te,
    he
  ]);
  const Fe = (o = ie.arrow) === null || o === void 0 ? void 0 : o.x, Gt = (a = ie.arrow) === null || a === void 0 ? void 0 : a.y, ft = ((c = ie.arrow) === null || c === void 0 ? void 0 : c.centerOffset) !== 0, [Wt, qt] = ee();
  return Ue(() => {
    B && qt(window.getComputedStyle(B).zIndex);
  }, [
    B
  ]), /* @__PURE__ */ F("div", {
    ref: ut.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...Qe,
      transform: Te ? Qe.transform : "translate(0, -200%)",
      // keep off the page when measuring
      minWidth: "max-content",
      zIndex: Wt,
      "--radix-popper-transform-origin": [
        (i = ie.transformOrigin) === null || i === void 0 ? void 0 : i.x,
        (l = ie.transformOrigin) === null || l === void 0 ? void 0 : l.y
      ].join(" ")
    },
    dir: e.dir
  }, /* @__PURE__ */ F(Ai, {
    scope: d,
    placedSide: Re,
    onArrowChange: k,
    arrowX: Fe,
    arrowY: Gt,
    shouldHideArrow: ft
  }, /* @__PURE__ */ F($e.div, W({
    "data-side": Re,
    "data-align": Le
  }, R, {
    ref: q,
    style: {
      ...R.style,
      // if the PopperContent hasn't been placed yet (not all measurements done)
      // we prevent animations so that users's animation don't kick in too early referring wrong sides
      animation: Te ? void 0 : "none",
      // hide the content if using the hide middleware and should be hidden
      opacity: (u = ie.hide) !== null && u !== void 0 && u.referenceHidden ? 0 : void 0
    }
  }))));
});
function Ei(e) {
  return e !== null;
}
const Pi = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var n, r, o, a, c;
    const { placement: i, rects: l, middlewareData: u } = t, f = ((n = u.arrow) === null || n === void 0 ? void 0 : n.centerOffset) !== 0, v = f ? 0 : e.arrowWidth, p = f ? 0 : e.arrowHeight, [m, h] = qr(i), b = {
      start: "0%",
      center: "50%",
      end: "100%"
    }[h], y = ((r = (o = u.arrow) === null || o === void 0 ? void 0 : o.x) !== null && r !== void 0 ? r : 0) + v / 2, C = ((a = (c = u.arrow) === null || c === void 0 ? void 0 : c.y) !== null && a !== void 0 ? a : 0) + p / 2;
    let A = "", x = "";
    return m === "bottom" ? (A = f ? b : `${y}px`, x = `${-p}px`) : m === "top" ? (A = f ? b : `${y}px`, x = `${l.floating.height + p}px`) : m === "right" ? (A = `${-p}px`, x = f ? b : `${C}px`) : m === "left" && (A = `${l.floating.width + p}px`, x = f ? b : `${C}px`), {
      data: {
        x: A,
        y: x
      }
    };
  }
});
function qr(e) {
  const [t, n = "center"] = e.split("-");
  return [
    t,
    n
  ];
}
const Oi = yi, $i = wi, _i = xi, Si = /* @__PURE__ */ Q((e, t) => {
  var n;
  const { container: r = globalThis == null || (n = globalThis.document) === null || n === void 0 ? void 0 : n.body, ...o } = e;
  return r ? /* @__PURE__ */ Ko.createPortal(/* @__PURE__ */ F($e.div, W({}, o, {
    ref: t
  })), r) : null;
});
function Ti(e, t) {
  return Xo((n, r) => {
    const o = t[n][r];
    return o ?? n;
  }, e);
}
const xn = (e) => {
  const { present: t, children: n } = e, r = Ri(t), o = typeof n == "function" ? n({
    present: r.isPresent
  }) : He.only(n), a = Oe(r.ref, o.ref);
  return typeof n == "function" || r.isPresent ? /* @__PURE__ */ hn(o, {
    ref: a
  }) : null;
};
xn.displayName = "Presence";
function Ri(e) {
  const [t, n] = ee(), r = K({}), o = K(e), a = K("none"), c = e ? "mounted" : "unmounted", [i, l] = Ti(c, {
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
  return Y(() => {
    const u = gt(r.current);
    a.current = i === "mounted" ? u : "none";
  }, [
    i
  ]), Ue(() => {
    const u = r.current, d = o.current;
    if (d !== e) {
      const v = a.current, p = gt(u);
      e ? l("MOUNT") : p === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(d && v !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [
    e,
    l
  ]), Ue(() => {
    if (t) {
      const u = (f) => {
        const p = gt(r.current).includes(f.animationName);
        f.target === t && p && _r(
          () => l("ANIMATION_END")
        );
      }, d = (f) => {
        f.target === t && (a.current = gt(r.current));
      };
      return t.addEventListener("animationstart", d), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        t.removeEventListener("animationstart", d), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      l("ANIMATION_END");
  }, [
    t,
    l
  ]), {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(i),
    ref: Ee((u) => {
      u && (r.current = getComputedStyle(u)), n(u);
    }, [])
  };
}
function gt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Li({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [r, o] = Fi({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : r, i = be(n), l = Ee((u) => {
    if (a) {
      const f = typeof u == "function" ? u(e) : u;
      f !== e && i(f);
    } else
      o(u);
  }, [
    a,
    e,
    o,
    i
  ]);
  return [
    c,
    l
  ];
}
function Fi({ defaultProp: e, onChange: t }) {
  const n = ee(e), [r] = n, o = K(r), a = be(t);
  return Y(() => {
    o.current !== r && (a(r), o.current = r);
  }, [
    r,
    o,
    a
  ]), n;
}
var Di = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ne = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), bt = {}, rn = 0, Xr = function(e) {
  return e && (e.host || Xr(e.parentNode));
}, ji = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Xr(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Mi = function(e, t, n, r) {
  var o = ji(t, Array.isArray(e) ? e : [e]);
  bt[n] || (bt[n] = /* @__PURE__ */ new WeakMap());
  var a = bt[n], c = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(f) {
    !f || i.has(f) || (i.add(f), u(f.parentNode));
  };
  o.forEach(u);
  var d = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(v) {
      if (i.has(v))
        d(v);
      else {
        var p = v.getAttribute(r), m = p !== null && p !== "false", h = (Ne.get(v) || 0) + 1, b = (a.get(v) || 0) + 1;
        Ne.set(v, h), a.set(v, b), c.push(v), h === 1 && m && mt.set(v, !0), b === 1 && v.setAttribute(n, "true"), m || v.setAttribute(r, "true");
      }
    });
  };
  return d(t), i.clear(), rn++, function() {
    c.forEach(function(f) {
      var v = Ne.get(f) - 1, p = a.get(f) - 1;
      Ne.set(f, v), a.set(f, p), v || (mt.has(f) || f.removeAttribute(r), mt.delete(f)), p || f.removeAttribute(n);
    }), rn--, rn || (Ne = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), bt = {});
  };
}, Ii = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = t || Di(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Mi(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, se = function() {
  return se = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, se.apply(this, arguments);
};
function Yr(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ni(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, a; r < o; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var At = "right-scroll-bar-position", xt = "width-before-scroll-bar", Bi = "with-scroll-bars-hidden", Vi = "--removed-body-scroll-bar-size";
function on(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Hi(e, t) {
  var n = ee(function() {
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
var or = /* @__PURE__ */ new WeakMap();
function ki(e, t) {
  var n = Hi(t || null, function(r) {
    return e.forEach(function(o) {
      return on(o, r);
    });
  });
  return P.useLayoutEffect(function() {
    var r = or.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), c = n.current;
      o.forEach(function(i) {
        a.has(i) || on(i, null);
      }), a.forEach(function(i) {
        o.has(i) || on(i, c);
      });
    }
    or.set(n, e);
  }, [e]), n;
}
function Ui(e) {
  return e;
}
function zi(e, t) {
  t === void 0 && (t = Ui);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var c = t(a, r);
      return n.push(c), function() {
        n = n.filter(function(i) {
          return i !== c;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var c = n;
        n = [], c.forEach(a);
      }
      n = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var c = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(a), c = n;
      }
      var l = function() {
        var d = c;
        c = [], d.forEach(a);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), n = {
        push: function(d) {
          c.push(d), u();
        },
        filter: function(d) {
          return c = c.filter(d), n;
        }
      };
    }
  };
  return o;
}
function Gi(e) {
  e === void 0 && (e = {});
  var t = zi(null);
  return t.options = se({ async: !0, ssr: !1 }, e), t;
}
var Kr = function(e) {
  var t = e.sideCar, n = Yr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return P.createElement(r, se({}, n));
};
Kr.isSideCarExport = !0;
function Wi(e, t) {
  return e.useMedium(t), Kr;
}
var Zr = Gi(), an = function() {
}, Mt = P.forwardRef(function(e, t) {
  var n = P.useRef(null), r = P.useState({
    onScrollCapture: an,
    onWheelCapture: an,
    onTouchMoveCapture: an
  }), o = r[0], a = r[1], c = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, v = e.sideCar, p = e.noIsolation, m = e.inert, h = e.allowPinchZoom, b = e.as, y = b === void 0 ? "div" : b, C = Yr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]), A = v, x = ki([n, t]), E = se(se({}, C), o);
  return P.createElement(
    P.Fragment,
    null,
    d && P.createElement(A, { sideCar: Zr, removeScrollBar: u, shards: f, noIsolation: p, inert: m, setCallbacks: a, allowPinchZoom: !!h, lockRef: n }),
    c ? P.cloneElement(P.Children.only(i), se(se({}, E), { ref: x })) : P.createElement(y, se({}, E, { className: l, ref: x }), i)
  );
});
Mt.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Mt.classNames = {
  fullWidth: xt,
  zeroRight: At
};
var qi = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Xi() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = qi();
  return t && e.setAttribute("nonce", t), e;
}
function Yi(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ki(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Zi = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Xi()) && (Yi(t, n), Ki(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Qi = function() {
  var e = Zi();
  return function(t, n) {
    P.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Qr = function() {
  var e = Qi(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Ji = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, cn = function(e) {
  return parseInt(e || "", 10) || 0;
}, ec = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [cn(n), cn(r), cn(o)];
}, tc = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Ji;
  var t = ec(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, nc = Qr(), rc = function(e, t, n, r) {
  var o = e.left, a = e.top, c = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Bi, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(At, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(xt, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(At, " .").concat(At, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(xt, " .").concat(xt, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body {
    `).concat(Vi, ": ").concat(i, `px;
  }
`);
}, oc = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r, a = P.useMemo(function() {
    return tc(o);
  }, [o]);
  return P.createElement(nc, { styles: rc(a, !t, o, n ? "" : "!important") });
}, vn = !1;
if (typeof window < "u")
  try {
    var yt = Object.defineProperty({}, "passive", {
      get: function() {
        return vn = !0, !0;
      }
    });
    window.addEventListener("test", yt, yt), window.removeEventListener("test", yt, yt);
  } catch {
    vn = !1;
  }
var Be = vn ? { passive: !1 } : !1, ac = function(e) {
  return e.tagName === "TEXTAREA";
}, Jr = function(e, t) {
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ac(e) && n[t] === "visible")
  );
}, ic = function(e) {
  return Jr(e, "overflowY");
}, cc = function(e) {
  return Jr(e, "overflowX");
}, ar = function(e, t) {
  var n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var r = eo(e, n);
    if (r) {
      var o = to(e, n), a = o[1], c = o[2];
      if (a > c)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== document.body);
  return !1;
}, sc = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, lc = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, eo = function(e, t) {
  return e === "v" ? ic(t) : cc(t);
}, to = function(e, t) {
  return e === "v" ? sc(t) : lc(t);
}, uc = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, fc = function(e, t, n, r, o) {
  var a = uc(e, window.getComputedStyle(t).direction), c = a * r, i = n.target, l = t.contains(i), u = !1, d = c > 0, f = 0, v = 0;
  do {
    var p = to(e, i), m = p[0], h = p[1], b = p[2], y = h - b - a * m;
    (m || y) && eo(e, i) && (f += y, v += m), i = i.parentNode;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (d && (o && f === 0 || !o && c > f) || !d && (o && v === 0 || !o && -c > v)) && (u = !0), u;
}, Ct = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ir = function(e) {
  return [e.deltaX, e.deltaY];
}, cr = function(e) {
  return e && "current" in e ? e.current : e;
}, dc = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, pc = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, vc = 0, Ve = [];
function hc(e) {
  var t = P.useRef([]), n = P.useRef([0, 0]), r = P.useRef(), o = P.useState(vc++)[0], a = P.useState(function() {
    return Qr();
  })[0], c = P.useRef(e);
  P.useEffect(function() {
    c.current = e;
  }, [e]), P.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = Ni([e.lockRef.current], (e.shards || []).map(cr), !0).filter(Boolean);
      return h.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = P.useCallback(function(h, b) {
    if ("touches" in h && h.touches.length === 2)
      return !c.current.allowPinchZoom;
    var y = Ct(h), C = n.current, A = "deltaX" in h ? h.deltaX : C[0] - y[0], x = "deltaY" in h ? h.deltaY : C[1] - y[1], E, _ = h.target, R = Math.abs(A) > Math.abs(x) ? "h" : "v";
    if ("touches" in h && R === "h" && _.type === "range")
      return !1;
    var $ = ar(R, _);
    if (!$)
      return !0;
    if ($ ? E = R : (E = R === "v" ? "h" : "v", $ = ar(R, _)), !$)
      return !1;
    if (!r.current && "changedTouches" in h && (A || x) && (r.current = E), !E)
      return !0;
    var B = r.current || E;
    return fc(B, b, h, B === "h" ? A : x, !0);
  }, []), l = P.useCallback(function(h) {
    var b = h;
    if (!(!Ve.length || Ve[Ve.length - 1] !== a)) {
      var y = "deltaY" in b ? ir(b) : Ct(b), C = t.current.filter(function(E) {
        return E.name === b.type && E.target === b.target && dc(E.delta, y);
      })[0];
      if (C && C.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!C) {
        var A = (c.current.shards || []).map(cr).filter(Boolean).filter(function(E) {
          return E.contains(b.target);
        }), x = A.length > 0 ? i(b, A[0]) : !c.current.noIsolation;
        x && b.cancelable && b.preventDefault();
      }
    }
  }, []), u = P.useCallback(function(h, b, y, C) {
    var A = { name: h, delta: b, target: y, should: C };
    t.current.push(A), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== A;
      });
    }, 1);
  }, []), d = P.useCallback(function(h) {
    n.current = Ct(h), r.current = void 0;
  }, []), f = P.useCallback(function(h) {
    u(h.type, ir(h), h.target, i(h, e.lockRef.current));
  }, []), v = P.useCallback(function(h) {
    u(h.type, Ct(h), h.target, i(h, e.lockRef.current));
  }, []);
  P.useEffect(function() {
    return Ve.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: v
    }), document.addEventListener("wheel", l, Be), document.addEventListener("touchmove", l, Be), document.addEventListener("touchstart", d, Be), function() {
      Ve = Ve.filter(function(h) {
        return h !== a;
      }), document.removeEventListener("wheel", l, Be), document.removeEventListener("touchmove", l, Be), document.removeEventListener("touchstart", d, Be);
    };
  }, []);
  var p = e.removeScrollBar, m = e.inert;
  return P.createElement(
    P.Fragment,
    null,
    m ? P.createElement(a, { styles: pc(o) }) : null,
    p ? P.createElement(oc, { gapMode: "margin" }) : null
  );
}
const gc = Wi(Zr, hc);
var no = P.forwardRef(function(e, t) {
  return P.createElement(Mt, se({}, e, { ref: t, sideCar: gc }));
});
no.classNames = Mt.classNames;
const mc = no, ro = "Popover", [oo, Qd] = Tr(ro, [
  zr
]), En = zr(), [bc, _e] = oo(ro), yc = (e) => {
  const { __scopePopover: t, children: n, open: r, defaultOpen: o, onOpenChange: a, modal: c = !1 } = e, i = En(t), l = K(null), [u, d] = ee(!1), [f = !1, v] = Li({
    prop: r,
    defaultProp: o,
    onChange: a
  });
  return /* @__PURE__ */ F(Oi, i, /* @__PURE__ */ F(bc, {
    scope: t,
    contentId: $a(),
    triggerRef: l,
    open: f,
    onOpenChange: v,
    onOpenToggle: Ee(
      () => v(
        (p) => !p
      ),
      [
        v
      ]
    ),
    hasCustomAnchor: u,
    onCustomAnchorAdd: Ee(
      () => d(!0),
      []
    ),
    onCustomAnchorRemove: Ee(
      () => d(!1),
      []
    ),
    modal: c
  }, n));
}, Cc = "PopoverTrigger", wc = /* @__PURE__ */ Q((e, t) => {
  const { __scopePopover: n, ...r } = e, o = _e(Cc, n), a = En(n), c = Oe(t, o.triggerRef), i = /* @__PURE__ */ F($e.button, W({
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": o.open,
    "aria-controls": o.contentId,
    "data-state": co(o.open)
  }, r, {
    ref: c,
    onClick: me(e.onClick, o.onOpenToggle)
  }));
  return o.hasCustomAnchor ? i : /* @__PURE__ */ F($i, W({
    asChild: !0
  }, a), i);
}), ao = "PopoverPortal", [Ac, xc] = oo(ao, {
  forceMount: void 0
}), Ec = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = _e(ao, t);
  return /* @__PURE__ */ F(Ac, {
    scope: t,
    forceMount: n
  }, /* @__PURE__ */ F(xn, {
    present: n || a.open
  }, /* @__PURE__ */ F(Si, {
    asChild: !0,
    container: o
  }, r)));
}, at = "PopoverContent", Pc = /* @__PURE__ */ Q((e, t) => {
  const n = xc(at, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = _e(at, e.__scopePopover);
  return /* @__PURE__ */ F(xn, {
    present: r || a.open
  }, a.modal ? /* @__PURE__ */ F(Oc, W({}, o, {
    ref: t
  })) : /* @__PURE__ */ F($c, W({}, o, {
    ref: t
  })));
}), Oc = /* @__PURE__ */ Q((e, t) => {
  const n = _e(at, e.__scopePopover), r = K(null), o = Oe(t, r), a = K(!1);
  return Y(() => {
    const c = r.current;
    if (c)
      return Ii(c);
  }, []), /* @__PURE__ */ F(mc, {
    as: gn,
    allowPinchZoom: !0
  }, /* @__PURE__ */ F(io, W({}, e, {
    ref: o,
    trapFocus: n.open,
    disableOutsidePointerEvents: !0,
    onCloseAutoFocus: me(e.onCloseAutoFocus, (c) => {
      var i;
      c.preventDefault(), a.current || (i = n.triggerRef.current) === null || i === void 0 || i.focus();
    }),
    onPointerDownOutside: me(e.onPointerDownOutside, (c) => {
      const i = c.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, u = i.button === 2 || l;
      a.current = u;
    }, {
      checkForDefaultPrevented: !1
    }),
    onFocusOutside: me(
      e.onFocusOutside,
      (c) => c.preventDefault(),
      {
        checkForDefaultPrevented: !1
      }
    )
  })));
}), $c = /* @__PURE__ */ Q((e, t) => {
  const n = _e(at, e.__scopePopover), r = K(!1), o = K(!1);
  return /* @__PURE__ */ F(io, W({}, e, {
    ref: t,
    trapFocus: !1,
    disableOutsidePointerEvents: !1,
    onCloseAutoFocus: (a) => {
      var c;
      if ((c = e.onCloseAutoFocus) === null || c === void 0 || c.call(e, a), !a.defaultPrevented) {
        var i;
        r.current || (i = n.triggerRef.current) === null || i === void 0 || i.focus(), a.preventDefault();
      }
      r.current = !1, o.current = !1;
    },
    onInteractOutside: (a) => {
      var c, i;
      (c = e.onInteractOutside) === null || c === void 0 || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
      const l = a.target;
      ((i = n.triggerRef.current) === null || i === void 0 ? void 0 : i.contains(l)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
    }
  }));
}), io = /* @__PURE__ */ Q((e, t) => {
  const { __scopePopover: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, disableOutsidePointerEvents: c, onEscapeKeyDown: i, onPointerDownOutside: l, onFocusOutside: u, onInteractOutside: d, ...f } = e, v = _e(at, n), p = En(n);
  return ma(), /* @__PURE__ */ F(ba, {
    asChild: !0,
    loop: !0,
    trapped: r,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a
  }, /* @__PURE__ */ F(va, {
    asChild: !0,
    disableOutsidePointerEvents: c,
    onInteractOutside: d,
    onEscapeKeyDown: i,
    onPointerDownOutside: l,
    onFocusOutside: u,
    onDismiss: () => v.onOpenChange(!1)
  }, /* @__PURE__ */ F(_i, W({
    "data-state": co(v.open),
    role: "dialog",
    id: v.contentId
  }, p, f, {
    ref: t,
    style: {
      ...f.style,
      "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
      "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
      "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }))));
}), _c = "PopoverClose", Sc = /* @__PURE__ */ Q((e, t) => {
  const { __scopePopover: n, ...r } = e, o = _e(_c, n);
  return /* @__PURE__ */ F($e.button, W({
    type: "button"
  }, r, {
    ref: t,
    onClick: me(
      e.onClick,
      () => o.onOpenChange(!1)
    )
  }));
});
function co(e) {
  return e ? "open" : "closed";
}
const Tc = yc, Rc = wc, Lc = Ec, Fc = Pc, Dc = Sc, jc = "_overlay_11atf_5", Mc = "_PopoverTrigger_11atf_17", Ic = "_PopoverContent_11atf_21", Nc = "_PopoverClose_11atf_45", Bc = "_partners_11atf_59", Vc = "_partner__icon_11atf_66", Hc = "_partner__link_11atf_71", kc = "_footer__link_11atf_90", Uc = "_slideDownAndFade_11atf_1", zc = "_slideLeftAndFade_11atf_1", Gc = "_slideUpAndFade_11atf_1", Wc = "_slideRightAndFade_11atf_1", qc = {
  overlay: jc,
  PopoverTrigger: Mc,
  PopoverContent: Ic,
  PopoverClose: Nc,
  partners: Bc,
  partner__icon: Vc,
  partner__link: Hc,
  footer__link: kc,
  slideDownAndFade: Uc,
  slideLeftAndFade: zc,
  slideUpAndFade: Gc,
  slideRightAndFade: Wc
}, Xc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62289)'%3e%3cpath%20d='M20.1179%201.93738H19.9919C7.93051%2010.1437%208.15102%2020.5198%208.17859%2020.9136C8.17859%2017.7805%209.42321%2014.7757%2011.6386%2012.5603C13.8541%2010.3448%2016.8588%209.10021%2019.9919%209.10021C22.0259%209.11037%2024.0248%209.63043%2025.8059%2010.6128C27.5869%2011.5951%2029.0932%2013.0084%2030.1869%2014.7234C31.3401%2016.5877%2031.9497%2018.7371%2031.947%2020.9293V37.6728C31.9471%2037.8016%2031.989%2037.9269%2032.0664%2038.0299C32.1438%2038.1329%2032.2525%2038.2079%2032.3763%2038.2437L38.3459%2039.9882C38.4345%2040.0138%2038.5278%2040.0185%2038.6185%2040.0019C38.7092%2039.9853%2038.7948%2039.9478%2038.8685%2039.8924C38.9422%2039.837%2039.002%2039.7653%2039.0432%2039.6828C39.0844%2039.6003%2039.1059%2039.5094%2039.1059%2039.4172V20.9254C39.1059%2018.4318%2038.6148%2015.9627%2037.6606%2013.659C36.7063%2011.3552%2035.3077%209.26203%2033.5445%207.49883C31.7813%205.73563%2029.6881%204.33699%2027.3843%203.38275C25.0806%202.42852%2022.6115%201.93738%2020.1179%201.93738Z'%20fill='%2379A340'/%3e%3cpath%20d='M19.9919%2032.7545C16.8588%2032.7545%2013.8541%2031.5099%2011.6386%2029.2944C9.42319%2027.079%208.17858%2024.0742%208.17858%2020.9411C8.17858%2020.9411%207.70998%2010.3091%2019.9919%201.95316C14.9666%201.98%2010.1545%203.98685%206.59921%207.53848C3.0439%2011.0901%201.03206%2015.9001%201%2020.9254C9.35991%2033.2231%2019.9919%2032.7545%2019.9919%2032.7545Z'%20fill='url(%23paint0_linear_4867_62289)'/%3e%3cpath%20d='M39.0429%200.610346C39.0435%200.517815%2039.0225%200.426424%2038.9815%200.343444C38.9406%200.260465%2038.8808%200.188187%2038.8071%200.132362C38.7333%200.0765371%2038.6475%200.0387056%2038.5565%200.0218779C38.4655%200.00505019%2038.3718%200.00969081%2038.2829%200.0354303L32.3132%201.77199C32.1895%201.80782%2032.0808%201.88287%2032.0033%201.98585C31.9259%202.08882%2031.8841%202.21415%2031.884%202.34297L32.01%2020.7403C32.01%2020.7403%2032.3487%2031.4196%2020.0549%2039.7873C30.3759%2039.7873%2039.1729%2031.2266%2039.1729%2020.7403L39.0429%200.610346Z'%20fill='%238CC63F'/%3e%3cpath%20d='M1%2020.9254C1%2031.4156%209.56862%2039.7756%2020.0549%2039.7756C28.9149%2033.6877%2031.1989%2026.6234%2031.8053%2023.0557C31.2671%2025.7918%2029.7943%2028.2556%2027.6391%2030.0251C25.4839%2031.7945%2022.7804%2032.7594%2019.9919%2032.7545C19.9919%2032.7545%209.35991%2033.2231%201.00394%2020.9411'%20fill='url(%23paint1_linear_4867_62289)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_4867_62289'%20x1='10.5334'%20y1='12.9553'%20x2='10.8602'%20y2='26.8045'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.15'%20stop-color='%238CC63F'/%3e%3cstop%20offset='0.68'%20stop-color='%237EAD40'/%3e%3cstop%20offset='1'%20stop-color='%2379A340'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_4867_62289'%20x1='1'%20y1='30.3485'%20x2='31.7856'%20y2='30.3485'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.15'%20stop-color='%238CC63F'/%3e%3cstop%20offset='0.68'%20stop-color='%237EAD40'/%3e%3cstop%20offset='1'%20stop-color='%2379A340'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_4867_62289'%3e%3crect%20width='38.1689'%20height='40'%20fill='white'%20transform='translate(1)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Yc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20clip-path='url(%23clip0_4867_62297)'%3e%3crect%20width='40'%20height='40'%20fill='url(%23pattern0_4867_62297)'/%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0_4867_62297'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0_4867_62297'%20transform='scale(0.0125)'/%3e%3c/pattern%3e%3cclipPath%20id='clip0_4867_62297'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3cimage%20id='image0_4867_62297'%20width='80'%20height='80'%20xlink:href='data:image/png;base64,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'/%3e%3c/defs%3e%3c/svg%3e", Kc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62302)'%3e%3cmask%20id='mask0_4867_62302'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='40'%20height='40'%3e%3cpath%20d='M40%200H0V40H40V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_4867_62302)'%3e%3cmask%20id='mask1_4867_62302'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='-1'%20y='1'%20width='43'%20height='38'%3e%3cpath%20d='M41.4799%201.79779H-0.520142V38.7978H41.4799V1.79779Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_4867_62302)'%3e%3cpath%20d='M34.4807%2027.9425L41.4657%2018.8285H35.6447L30.3996%2025.6854H24.0206V13.4114C24.0288%2013.022%2023.9559%2012.635%2023.8065%2012.2752C23.657%2011.9154%2023.4343%2011.5906%2023.1527%2011.3215C22.8805%2011.0478%2022.5559%2010.8318%2022.1983%2010.6865C21.8408%2010.5411%2021.4576%2010.4694%2021.0717%2010.4755H3.89068V1.99545H-1.00032V27.2875C-1.00875%2027.6772%20-0.935926%2028.0644%20-0.786483%2028.4244C-0.63704%2028.7844%20-0.414254%2029.1093%20-0.13232%2029.3785C0.138743%2029.6545%200.46282%2029.8729%200.820436%2030.0205C1.17805%2030.1682%201.56182%2030.2419%201.94868%2030.2375H19.0787V38.5994H23.9677V30.3635H30.3137L36.2137%2038.5994H41.9547L34.4807%2027.9425ZM19.1316%2025.3605H3.89068V15.1395H19.1297V16.9395L19.1316%2025.3605Z'%20fill='%2317233E'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62302'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Zc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62355)'%3e%3cpath%20d='M6.04721%208.19188L6.05163%200.777857C6.05163%200.408853%206.35127%200.109222%206.72175%200.109222H10.6081C10.9771%200.109222%2011.2767%200.408853%2011.2782%200.777857L11.2841%203.3166C11.2871%204.22288%2010.9284%205.09225%2010.2878%205.73284L7.31067%208.71439C6.84278%209.18081%206.04721%208.85018%206.04721%208.19188ZM33.3904%2033.5793C33.3933%2034.7926%2032.9092%2035.9572%2032.0487%2036.8118L29.073%2039.7653C28.7144%2040.1225%2028.1033%2039.8657%2028.1048%2039.3594L28.121%2035.9852C25.8007%2037.8037%2022.8797%2038.8886%2019.7092%2038.8886C11.9572%2038.8886%205.69149%2032.3985%206.06197%2024.5668L6.04573%2016.8812C6.04278%2015.6679%206.52691%2014.5033%207.38743%2013.6487L10.3631%2010.6952C10.7217%2010.338%2011.3328%2010.5948%2011.3313%2011.1011L11.3151%2014.4635C13.3771%2012.8487%2015.907%2011.8096%2018.6538%2011.603C26.5623%2011.0052%2033.2059%2017.1867%2033.3682%2024.9343L33.3712%2024.9284V25.2236C33.3712%2025.2251%2033.3712%2025.2266%2033.3712%2025.228C33.3712%2025.2295%2033.3712%2025.2295%2033.3712%2025.231L33.3904%2033.5793ZM28.1328%2025.3314C28.1328%2020.6288%2024.307%2016.8029%2019.6044%2016.8029C14.9018%2016.8029%2011.076%2020.6288%2011.076%2025.3314C11.076%2030.0339%2014.9018%2033.8598%2019.6044%2033.8598C24.307%2033.8598%2028.1328%2030.0325%2028.1328%2025.3314Z'%20fill='url(%23paint0_linear_4867_62355)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_4867_62355'%20x1='6.04647'%20y1='20.0204'%20x2='33.3911'%20y2='20.0204'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF4713'/%3e%3cstop%20offset='0.5'%20stop-color='%23DB0032'/%3e%3cstop%20offset='1'%20stop-color='%23AE1164'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_4867_62355'%3e%3crect%20width='27.4539'%20height='40'%20fill='white'%20transform='translate(6)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Qc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20clip-path='url(%23clip0_4867_62334)'%3e%3crect%20width='40'%20height='40'%20fill='url(%23pattern0_4867_62334)'/%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0_4867_62334'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0_4867_62334'%20transform='scale(0.0125)'/%3e%3c/pattern%3e%3cclipPath%20id='clip0_4867_62334'%3e%3crect%20width='40'%20height='40'%20fill='white'/%3e%3c/clipPath%3e%3cimage%20id='image0_4867_62334'%20width='80'%20height='80'%20xlink:href='data:image/png;base64,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'/%3e%3c/defs%3e%3c/svg%3e", Jc = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62315)'%3e%3cpath%20d='M40%200C37.384%202.03569%2034.5932%203.83603%2031.66%205.38C30.44%206.04%2029.08%206.74%2027.66%207.38C21.9369%2010.0591%2015.8843%2011.969%209.66%2013.06C8.22%2013.3%206.72%2013.52%205.18%2013.68C3.64%2013.84%201.74%2014%200%2014C1.50896%2014.5515%203.07044%2014.9469%204.66%2015.18C4.36358%2016.4384%204.21591%2017.7272%204.22%2019.02C4.20736%2021.7907%204.86741%2024.5231%206.14346%2026.9826C7.41951%2029.442%209.27343%2031.555%2011.546%2033.14C13.8186%2034.7251%2016.442%2035.7349%2019.1908%2036.0827C21.9397%2036.4305%2024.7319%2036.1059%2027.3276%2035.1368C29.9234%2034.1677%2032.2451%2032.5831%2034.0935%2030.519C35.9419%2028.4549%2037.2617%2025.973%2037.9396%2023.2864C38.6174%2020.5999%2038.6331%2017.7889%2037.9852%2015.095C37.3373%2012.401%2036.0453%209.90457%2034.22%207.82C36.6342%205.6116%2038.5971%202.95589%2040%200ZM21.34%2018.76C22.0322%2018.76%2022.7089%2018.9653%2023.2845%2019.3499C23.8601%2019.7344%2024.3087%2020.2811%2024.5736%2020.9206C24.8385%2021.5601%2024.9078%2022.2639%2024.7727%2022.9428C24.6377%2023.6217%2024.3044%2024.2454%2023.8149%2024.7349C23.3254%2025.2244%2022.7017%2025.5577%2022.0228%2025.6927C21.3439%2025.8278%2020.6401%2025.7585%2020.0006%2025.4936C19.3611%2025.2287%2018.8144%2024.7801%2018.4299%2024.2045C18.0453%2023.6289%2017.84%2022.9522%2017.84%2022.26C17.84%2021.3317%2018.2087%2020.4415%2018.8651%2019.7851C19.5215%2019.1287%2020.4117%2018.76%2021.34%2018.76ZM34.54%2019.04C34.54%2022.5409%2033.1493%2025.8983%2030.6738%2028.3738C28.1983%2030.8493%2024.8409%2032.24%2021.34%2032.24C17.8391%2032.24%2014.4817%2030.8493%2012.0062%2028.3738C9.53071%2025.8983%208.14%2022.5409%208.14%2019.04C8.13289%2017.8775%208.28771%2016.7198%208.6%2015.6C10.2388%2015.69%2011.8812%2015.69%2013.52%2015.6C12.8819%2017.0475%2012.6574%2018.6435%2012.8714%2020.2108C13.0854%2021.7782%2013.7295%2023.2556%2014.7323%2024.479C15.735%2025.7025%2017.0572%2026.6242%2018.552%2027.1417C20.0468%2027.6593%2021.6558%2027.7525%2023.2004%2027.4111C24.745%2027.0696%2026.1648%2026.3068%2027.3022%2025.2073C28.4395%2024.1079%2029.2499%2022.7148%2029.6435%2021.1826C30.0371%2019.6505%2029.9984%2018.0392%2029.5318%2016.5277C29.0651%2015.0162%2028.1888%2013.6636%2027%2012.62C28.4731%2011.9664%2029.8853%2011.1833%2031.22%2010.28C33.3605%2012.6959%2034.5416%2015.8123%2034.54%2019.04Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62315'%3e%3crect%20width='40'%20height='36.16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", es = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4867_62322)'%3e%3cpath%20d='M4.57062%2012.026C2.55801%2011.5384%202.04783%2011.1347%202.04783%2010.1435C2.04783%209.18525%202.89412%208.46283%204.41766%208.46283C6.02775%208.46283%207.0421%209.35412%207.14373%2011.0168L8.78601%2010.765C8.75482%208.44484%207.0592%207%204.58773%207C1.99751%207%200.32101%208.26099%200.32101%2010.2974C0.32101%2012.1639%201.16731%2013.0711%204.45188%2013.7766C6.46448%2014.2312%207.17694%2014.6509%207.17694%2015.761C7.17694%2016.8711%206.14448%2017.4916%204.67125%2017.4916C2.91123%2017.4916%201.74392%2016.5494%201.64128%2014.9686L0%2015.2534C0.20126%2017.6075%202.06493%2018.9904%204.57062%2018.9904C7.16084%2018.9904%208.92086%2017.6914%208.92086%2015.6781C8.92086%2013.6227%207.90551%2012.8493%204.57062%2012.026Z'%20fill='%23FF5500'/%3e%3cpath%20d='M12.5332%2013.4988H18.4284V12.0111H12.5332V8.5667H18.7336V7.09592H10.8394V18.7986H18.801V17.3268H12.5332V13.4988Z'%20fill='%23FF5500'/%3e%3cpath%20d='M22.8927%2013.4988H28.7881V12.0111H22.8927V8.5667H29.0922V7.09592H21.199V18.7986H29.1607V17.3268H22.8927V13.4988Z'%20fill='%23FF5500'/%3e%3cpath%20d='M0%2023.1492H3.63979V33.3789H5.33239V23.1492H8.92086V21.6763H0V23.1492Z'%20fill='%23FF5500'/%3e%3cpath%20d='M17.1072%2026.6078H12.5332V21.6763H10.8394V33.3789H12.5332V28.0797H17.1072V33.3789H18.801V21.6763H17.1072V26.6078Z'%20fill='%23FF5500'/%3e%3cpath%20d='M24.3073%2021.6763H21.199V23.1492H24.3073V31.905H21.199V33.3789H24.3587H26.0524H29.1607V31.905H26.0524V23.1492H29.1607V21.6763H26.001H24.3073Z'%20fill='%23FF5500'/%3e%3cpath%20d='M32.8685%208.5667H38.1147V18.7986H39.7122V7.09592H38.5943H32.0883H31.271V18.7986H32.8685V8.5667Z'%20fill='%23FF5500'/%3e%3cpath%20d='M35.6498%2026.5113C33.6371%2026.0235%2033.127%2025.6198%2033.127%2024.6284C33.127%2023.67%2033.9733%2022.9475%2035.4968%2022.9475C37.1069%2022.9475%2038.1213%2023.8389%2038.2229%2025.5019L39.8652%2025.2501C39.83%2022.9295%2038.1374%2021.4844%2035.6659%2021.4844C33.0767%2021.4844%2031.4002%2022.7446%2031.4002%2024.7823C31.4002%2026.6491%2032.2465%2027.5565%2035.5311%2028.2622C37.5436%2028.7159%2038.2561%2029.1366%2038.2561%2030.2469C38.2561%2031.3571%2037.2236%2031.9788%2035.7504%2031.9788C33.9904%2031.9788%2032.823%2031.0363%2032.7204%2029.4553L31.0792%2029.7412C31.2804%2032.0957%2033.1441%2033.4748%2035.6498%2033.4748C38.24%2033.4748%2040%2032.1756%2040%2030.1619C40%2028.1082%2038.9836%2027.3347%2035.6498%2026.5113Z'%20fill='%23FF5500'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4867_62322'%3e%3crect%20width='40'%20height='26.4748'%20fill='white'%20transform='translate(0%207)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", ts = {
  Actito: {
    icon: Xc,
    link: "https://www.actito.com/"
  },
  Adnami: {
    icon: Yc,
    link: "https://www.adnami.io/"
  },
  Bizzkit: {
    icon: Kc,
    link: "https://bizzkit.com/"
  },
  Ibexa: {
    icon: Zc,
    link: "https://www.ibexa.co/"
  },
  Qualifio: {
    icon: Qc,
    link: "https://www.qualifio.com/"
  },
  Raptor: {
    icon: Jc,
    link: "https://www.raptorservices.com/"
  },
  Seenthis: {
    icon: es,
    link: "https://www.seenthis.co/"
  }
}, ns = ({ open: e, overlayColor: t }) => {
  const n = it(Ut);
  return /* @__PURE__ */ S.jsx(
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
}, rs = ({ icon: e, link: t, name: n }) => {
  const r = it(Ut);
  return /* @__PURE__ */ S.jsxs(
    "a",
    {
      className: r("partner__link"),
      "data-testid": "app-switcher-partner-link",
      href: t,
      rel: "noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ S.jsx("img", { src: e, alt: n, className: r("partner__icon") }),
        /* @__PURE__ */ S.jsx("span", { children: n })
      ]
    }
  );
}, os = () => {
  const e = it(Ut);
  return /* @__PURE__ */ S.jsxs(
    "a",
    {
      className: e("footer__link"),
      "data-testid": "qntm-ecosystem-link",
      href: "https://qntmgroup.com/solutions/",
      rel: "noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ S.jsx("span", { children: "Discover" }),
        /* @__PURE__ */ S.jsx(as, {}),
        /* @__PURE__ */ S.jsx("span", { children: "ecosystem" })
      ]
    }
  );
}, as = () => /* @__PURE__ */ S.jsxs("svg", { width: "53", height: "10", viewBox: "0 0 53 10", children: [
  /* @__PURE__ */ S.jsx("path", { d: "M27.7695 4.56776H29.3719V3.08609H37.3819V4.56776H38.9824V1.60614H27.7695V4.56776Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M34.1772 3.95056H32.5748V6.91391H30.9724V8.39558H35.7795V6.91391H34.1772V3.95056Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M53 1.60614H49.7971V3.08608H51.3995H53V1.60614Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M51.3995 3.08612L49.7971 4.56779V8.3956H53V6.91392H51.3995V4.56779V3.08612Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M15.3545 6.91392H13.7521V8.3956H16.955V4.56779L15.3545 3.08612V6.91392Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M22.9624 5.43221L24.5648 6.91389V3.08608H26.1672V1.60614H22.9624V5.43221Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M23.0803 6.7998L17.9067 2.01072C17.6318 1.75485 17.2579 1.61135 16.869 1.61135L13.7521 1.60443V3.08783H16.5399C16.6521 3.08783 16.7586 3.12933 16.839 3.20194L22.0108 7.99101C22.2856 8.24689 22.6596 8.38866 23.0485 8.38866L26.1654 8.39558V6.91391H23.3776C23.2654 6.91391 23.1588 6.87241 23.0784 6.7998H23.0803Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M42.1872 6.91392H40.5848V8.3956H43.7896V4.56779L42.1872 3.08612V6.91392Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M43.7017 1.61135L40.5848 1.60443V3.08783H43.3745C43.4867 3.08783 43.5933 3.12933 43.6737 3.20194L47.4693 6.722L48.6472 5.63279L44.7357 2.01245C44.4608 1.7583 44.0888 1.6148 43.6998 1.61308L43.7017 1.61135Z" }),
  /* @__PURE__ */ S.jsx("path", { d: "M10.8146 5C10.8146 2.23893 8.39332 0 5.40732 0C2.42133 0 0 2.23721 0 4.99827C0 7.75934 2.41946 9.99827 5.40545 9.99827V8.39384C3.37864 8.39384 1.73326 6.87414 1.73326 5C1.73326 3.12586 3.37677 1.60443 5.40358 1.60443C7.4304 1.60443 9.07578 3.12414 9.07578 4.99827C9.07578 5.63105 8.88506 6.25 8.5242 6.78769C8.48868 6.84129 8.41389 6.85857 8.35592 6.82573C8.35032 6.82227 8.34471 6.81881 8.3391 6.81362C8.33349 6.80844 8.32788 6.80325 8.32227 6.79806L6.0767 4.72165C5.80184 4.46577 5.42789 4.324 5.03898 4.324L3.38799 4.31708V5.79703H4.70617C4.81835 5.79703 4.9268 5.83852 5.00533 5.91113L7.24342 7.98236C7.51828 8.23824 7.89223 8.38001 8.28113 8.38001L12.1459 8.38693V6.9139H10.3996C10.6725 6.30705 10.8128 5.65526 10.8109 4.99654L10.8146 5Z" })
] });
function is() {
  this.__data__ = [], this.size = 0;
}
var cs = is;
function ss(e, t) {
  return e === t || e !== e && t !== t;
}
var It = ss, ls = It;
function us(e, t) {
  for (var n = e.length; n--; )
    if (ls(e[n][0], t))
      return n;
  return -1;
}
var Nt = us, fs = Nt, ds = Array.prototype, ps = ds.splice;
function vs(e) {
  var t = this.__data__, n = fs(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : ps.call(t, n, 1), --this.size, !0;
}
var hs = vs, gs = Nt;
function ms(e) {
  var t = this.__data__, n = gs(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var bs = ms, ys = Nt;
function Cs(e) {
  return ys(this.__data__, e) > -1;
}
var ws = Cs, As = Nt;
function xs(e, t) {
  var n = this.__data__, r = As(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var Es = xs, Ps = cs, Os = hs, $s = bs, _s = ws, Ss = Es;
function qe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
qe.prototype.clear = Ps;
qe.prototype.delete = Os;
qe.prototype.get = $s;
qe.prototype.has = _s;
qe.prototype.set = Ss;
var Bt = qe, Ts = Bt;
function Rs() {
  this.__data__ = new Ts(), this.size = 0;
}
var Ls = Rs;
function Fs(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var Ds = Fs;
function js(e) {
  return this.__data__.get(e);
}
var Ms = js;
function Is(e) {
  return this.__data__.has(e);
}
var Ns = Is, Bs = typeof vt == "object" && vt && vt.Object === Object && vt, so = Bs, Vs = so, Hs = typeof self == "object" && self && self.Object === Object && self, ks = Vs || Hs || Function("return this")(), Xe = ks, Us = Xe, zs = Us.Symbol, lo = zs, sr = lo, uo = Object.prototype, Gs = uo.hasOwnProperty, Ws = uo.toString, nt = sr ? sr.toStringTag : void 0;
function qs(e) {
  var t = Gs.call(e, nt), n = e[nt];
  try {
    e[nt] = void 0;
    var r = !0;
  } catch {
  }
  var o = Ws.call(e);
  return r && (t ? e[nt] = n : delete e[nt]), o;
}
var Xs = qs, Ys = Object.prototype, Ks = Ys.toString;
function Zs(e) {
  return Ks.call(e);
}
var Qs = Zs, lr = lo, Js = Xs, el = Qs, tl = "[object Null]", nl = "[object Undefined]", ur = lr ? lr.toStringTag : void 0;
function rl(e) {
  return e == null ? e === void 0 ? nl : tl : ur && ur in Object(e) ? Js(e) : el(e);
}
var Vt = rl;
function ol(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Se = ol, al = Vt, il = Se, cl = "[object AsyncFunction]", sl = "[object Function]", ll = "[object GeneratorFunction]", ul = "[object Proxy]";
function fl(e) {
  if (!il(e))
    return !1;
  var t = al(e);
  return t == sl || t == ll || t == cl || t == ul;
}
var Pn = fl, dl = Xe, pl = dl["__core-js_shared__"], vl = pl, sn = vl, fr = function() {
  var e = /[^.]+$/.exec(sn && sn.keys && sn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function hl(e) {
  return !!fr && fr in e;
}
var gl = hl, ml = Function.prototype, bl = ml.toString;
function yl(e) {
  if (e != null) {
    try {
      return bl.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Cl = yl, wl = Pn, Al = gl, xl = Se, El = Cl, Pl = /[\\^$.*+?()[\]{}|]/g, Ol = /^\[object .+?Constructor\]$/, $l = Function.prototype, _l = Object.prototype, Sl = $l.toString, Tl = _l.hasOwnProperty, Rl = RegExp(
  "^" + Sl.call(Tl).replace(Pl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ll(e) {
  if (!xl(e) || Al(e))
    return !1;
  var t = wl(e) ? Rl : Ol;
  return t.test(El(e));
}
var Fl = Ll;
function Dl(e, t) {
  return e == null ? void 0 : e[t];
}
var jl = Dl, Ml = Fl, Il = jl;
function Nl(e, t) {
  var n = Il(e, t);
  return Ml(n) ? n : void 0;
}
var On = Nl, Bl = On, Vl = Xe, Hl = Bl(Vl, "Map"), fo = Hl, kl = On, Ul = kl(Object, "create"), Ht = Ul, dr = Ht;
function zl() {
  this.__data__ = dr ? dr(null) : {}, this.size = 0;
}
var Gl = zl;
function Wl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ql = Wl, Xl = Ht, Yl = "__lodash_hash_undefined__", Kl = Object.prototype, Zl = Kl.hasOwnProperty;
function Ql(e) {
  var t = this.__data__;
  if (Xl) {
    var n = t[e];
    return n === Yl ? void 0 : n;
  }
  return Zl.call(t, e) ? t[e] : void 0;
}
var Jl = Ql, eu = Ht, tu = Object.prototype, nu = tu.hasOwnProperty;
function ru(e) {
  var t = this.__data__;
  return eu ? t[e] !== void 0 : nu.call(t, e);
}
var ou = ru, au = Ht, iu = "__lodash_hash_undefined__";
function cu(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = au && t === void 0 ? iu : t, this;
}
var su = cu, lu = Gl, uu = ql, fu = Jl, du = ou, pu = su;
function Ye(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ye.prototype.clear = lu;
Ye.prototype.delete = uu;
Ye.prototype.get = fu;
Ye.prototype.has = du;
Ye.prototype.set = pu;
var vu = Ye, pr = vu, hu = Bt, gu = fo;
function mu() {
  this.size = 0, this.__data__ = {
    hash: new pr(),
    map: new (gu || hu)(),
    string: new pr()
  };
}
var bu = mu;
function yu(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Cu = yu, wu = Cu;
function Au(e, t) {
  var n = e.__data__;
  return wu(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var kt = Au, xu = kt;
function Eu(e) {
  var t = xu(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Pu = Eu, Ou = kt;
function $u(e) {
  return Ou(this, e).get(e);
}
var _u = $u, Su = kt;
function Tu(e) {
  return Su(this, e).has(e);
}
var Ru = Tu, Lu = kt;
function Fu(e, t) {
  var n = Lu(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var Du = Fu, ju = bu, Mu = Pu, Iu = _u, Nu = Ru, Bu = Du;
function Ke(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ke.prototype.clear = ju;
Ke.prototype.delete = Mu;
Ke.prototype.get = Iu;
Ke.prototype.has = Nu;
Ke.prototype.set = Bu;
var Vu = Ke, Hu = Bt, ku = fo, Uu = Vu, zu = 200;
function Gu(e, t) {
  var n = this.__data__;
  if (n instanceof Hu) {
    var r = n.__data__;
    if (!ku || r.length < zu - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Uu(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var Wu = Gu, qu = Bt, Xu = Ls, Yu = Ds, Ku = Ms, Zu = Ns, Qu = Wu;
function Ze(e) {
  var t = this.__data__ = new qu(e);
  this.size = t.size;
}
Ze.prototype.clear = Xu;
Ze.prototype.delete = Yu;
Ze.prototype.get = Ku;
Ze.prototype.has = Zu;
Ze.prototype.set = Qu;
var Ju = Ze, e0 = On, t0 = function() {
  try {
    var e = e0(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), po = t0, vr = po;
function n0(e, t, n) {
  t == "__proto__" && vr ? vr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var $n = n0, r0 = $n, o0 = It;
function a0(e, t, n) {
  (n !== void 0 && !o0(e[t], n) || n === void 0 && !(t in e)) && r0(e, t, n);
}
var vo = a0;
function i0(e) {
  return function(t, n, r) {
    for (var o = -1, a = Object(t), c = r(t), i = c.length; i--; ) {
      var l = c[e ? i : ++o];
      if (n(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var c0 = i0, s0 = c0, l0 = s0(), u0 = l0, Rt = { exports: {} };
Rt.exports;
(function(e, t) {
  var n = Xe, r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, a = o && o.exports === r, c = a ? n.Buffer : void 0, i = c ? c.allocUnsafe : void 0;
  function l(u, d) {
    if (d)
      return u.slice();
    var f = u.length, v = i ? i(f) : new u.constructor(f);
    return u.copy(v), v;
  }
  e.exports = l;
})(Rt, Rt.exports);
var f0 = Rt.exports, d0 = Xe, p0 = d0.Uint8Array, v0 = p0, hr = v0;
function h0(e) {
  var t = new e.constructor(e.byteLength);
  return new hr(t).set(new hr(e)), t;
}
var g0 = h0, m0 = g0;
function b0(e, t) {
  var n = t ? m0(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var y0 = b0;
function C0(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var w0 = C0, A0 = Se, gr = Object.create, x0 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!A0(t))
      return {};
    if (gr)
      return gr(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), E0 = x0;
function P0(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var O0 = P0, $0 = O0, _0 = $0(Object.getPrototypeOf, Object), ho = _0, S0 = Object.prototype;
function T0(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || S0;
  return e === n;
}
var go = T0, R0 = E0, L0 = ho, F0 = go;
function D0(e) {
  return typeof e.constructor == "function" && !F0(e) ? R0(L0(e)) : {};
}
var j0 = D0;
function M0(e) {
  return e != null && typeof e == "object";
}
var st = M0, I0 = Vt, N0 = st, B0 = "[object Arguments]";
function V0(e) {
  return N0(e) && I0(e) == B0;
}
var H0 = V0, mr = H0, k0 = st, mo = Object.prototype, U0 = mo.hasOwnProperty, z0 = mo.propertyIsEnumerable, G0 = mr(/* @__PURE__ */ function() {
  return arguments;
}()) ? mr : function(e) {
  return k0(e) && U0.call(e, "callee") && !z0.call(e, "callee");
}, bo = G0, W0 = Array.isArray, yo = W0, q0 = 9007199254740991;
function X0(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= q0;
}
var Co = X0, Y0 = Pn, K0 = Co;
function Z0(e) {
  return e != null && K0(e.length) && !Y0(e);
}
var _n = Z0, Q0 = _n, J0 = st;
function e2(e) {
  return J0(e) && Q0(e);
}
var t2 = e2, Lt = { exports: {} };
function n2() {
  return !1;
}
var r2 = n2;
Lt.exports;
(function(e, t) {
  var n = Xe, r = r2, o = t && !t.nodeType && t, a = o && !0 && e && !e.nodeType && e, c = a && a.exports === o, i = c ? n.Buffer : void 0, l = i ? i.isBuffer : void 0, u = l || r;
  e.exports = u;
})(Lt, Lt.exports);
var wo = Lt.exports, o2 = Vt, a2 = ho, i2 = st, c2 = "[object Object]", s2 = Function.prototype, l2 = Object.prototype, Ao = s2.toString, u2 = l2.hasOwnProperty, f2 = Ao.call(Object);
function d2(e) {
  if (!i2(e) || o2(e) != c2)
    return !1;
  var t = a2(e);
  if (t === null)
    return !0;
  var n = u2.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Ao.call(n) == f2;
}
var p2 = d2, v2 = Vt, h2 = Co, g2 = st, m2 = "[object Arguments]", b2 = "[object Array]", y2 = "[object Boolean]", C2 = "[object Date]", w2 = "[object Error]", A2 = "[object Function]", x2 = "[object Map]", E2 = "[object Number]", P2 = "[object Object]", O2 = "[object RegExp]", $2 = "[object Set]", _2 = "[object String]", S2 = "[object WeakMap]", T2 = "[object ArrayBuffer]", R2 = "[object DataView]", L2 = "[object Float32Array]", F2 = "[object Float64Array]", D2 = "[object Int8Array]", j2 = "[object Int16Array]", M2 = "[object Int32Array]", I2 = "[object Uint8Array]", N2 = "[object Uint8ClampedArray]", B2 = "[object Uint16Array]", V2 = "[object Uint32Array]", H = {};
H[L2] = H[F2] = H[D2] = H[j2] = H[M2] = H[I2] = H[N2] = H[B2] = H[V2] = !0;
H[m2] = H[b2] = H[T2] = H[y2] = H[R2] = H[C2] = H[w2] = H[A2] = H[x2] = H[E2] = H[P2] = H[O2] = H[$2] = H[_2] = H[S2] = !1;
function H2(e) {
  return g2(e) && h2(e.length) && !!H[v2(e)];
}
var k2 = H2;
function U2(e) {
  return function(t) {
    return e(t);
  };
}
var z2 = U2, Ft = { exports: {} };
Ft.exports;
(function(e, t) {
  var n = so, r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, a = o && o.exports === r, c = a && n.process, i = function() {
    try {
      var l = o && o.require && o.require("util").types;
      return l || c && c.binding && c.binding("util");
    } catch {
    }
  }();
  e.exports = i;
})(Ft, Ft.exports);
var G2 = Ft.exports, W2 = k2, q2 = z2, br = G2, yr = br && br.isTypedArray, X2 = yr ? q2(yr) : W2, xo = X2;
function Y2(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Eo = Y2, K2 = $n, Z2 = It, Q2 = Object.prototype, J2 = Q2.hasOwnProperty;
function ef(e, t, n) {
  var r = e[t];
  (!(J2.call(e, t) && Z2(r, n)) || n === void 0 && !(t in e)) && K2(e, t, n);
}
var tf = ef, nf = tf, rf = $n;
function of(e, t, n, r) {
  var o = !n;
  n || (n = {});
  for (var a = -1, c = t.length; ++a < c; ) {
    var i = t[a], l = r ? r(n[i], e[i], i, n, e) : void 0;
    l === void 0 && (l = e[i]), o ? rf(n, i, l) : nf(n, i, l);
  }
  return n;
}
var af = of;
function cf(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var sf = cf, lf = 9007199254740991, uf = /^(?:0|[1-9]\d*)$/;
function ff(e, t) {
  var n = typeof e;
  return t = t ?? lf, !!t && (n == "number" || n != "symbol" && uf.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Po = ff, df = sf, pf = bo, vf = yo, hf = wo, gf = Po, mf = xo, bf = Object.prototype, yf = bf.hasOwnProperty;
function Cf(e, t) {
  var n = vf(e), r = !n && pf(e), o = !n && !r && hf(e), a = !n && !r && !o && mf(e), c = n || r || o || a, i = c ? df(e.length, String) : [], l = i.length;
  for (var u in e)
    (t || yf.call(e, u)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    gf(u, l))) && i.push(u);
  return i;
}
var wf = Cf;
function Af(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var xf = Af, Ef = Se, Pf = go, Of = xf, $f = Object.prototype, _f = $f.hasOwnProperty;
function Sf(e) {
  if (!Ef(e))
    return Of(e);
  var t = Pf(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !_f.call(e, r)) || n.push(r);
  return n;
}
var Tf = Sf, Rf = wf, Lf = Tf, Ff = _n;
function Df(e) {
  return Ff(e) ? Rf(e, !0) : Lf(e);
}
var Oo = Df, jf = af, Mf = Oo;
function If(e) {
  return jf(e, Mf(e));
}
var Nf = If, Cr = vo, Bf = f0, Vf = y0, Hf = w0, kf = j0, wr = bo, Ar = yo, Uf = t2, zf = wo, Gf = Pn, Wf = Se, qf = p2, Xf = xo, xr = Eo, Yf = Nf;
function Kf(e, t, n, r, o, a, c) {
  var i = xr(e, n), l = xr(t, n), u = c.get(l);
  if (u) {
    Cr(e, n, u);
    return;
  }
  var d = a ? a(i, l, n + "", e, t, c) : void 0, f = d === void 0;
  if (f) {
    var v = Ar(l), p = !v && zf(l), m = !v && !p && Xf(l);
    d = l, v || p || m ? Ar(i) ? d = i : Uf(i) ? d = Hf(i) : p ? (f = !1, d = Bf(l, !0)) : m ? (f = !1, d = Vf(l, !0)) : d = [] : qf(l) || wr(l) ? (d = i, wr(i) ? d = Yf(i) : (!Wf(i) || Gf(i)) && (d = kf(l))) : f = !1;
  }
  f && (c.set(l, d), o(d, l, r, a, c), c.delete(l)), Cr(e, n, d);
}
var Zf = Kf, Qf = Ju, Jf = vo, ed = u0, td = Zf, nd = Se, rd = Oo, od = Eo;
function $o(e, t, n, r, o) {
  e !== t && ed(t, function(a, c) {
    if (o || (o = new Qf()), nd(a))
      td(e, t, c, n, $o, r, o);
    else {
      var i = r ? r(od(e, c), a, c + "", e, t, o) : void 0;
      i === void 0 && (i = a), Jf(e, c, i);
    }
  }, rd);
}
var ad = $o;
function id(e) {
  return e;
}
var _o = id;
function cd(e, t, n) {
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
var sd = cd, ld = sd, Er = Math.max;
function ud(e, t, n) {
  return t = Er(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, a = Er(r.length - t, 0), c = Array(a); ++o < a; )
      c[o] = r[t + o];
    o = -1;
    for (var i = Array(t + 1); ++o < t; )
      i[o] = r[o];
    return i[t] = n(c), ld(e, this, i);
  };
}
var fd = ud;
function dd(e) {
  return function() {
    return e;
  };
}
var pd = dd, vd = pd, Pr = po, hd = _o, gd = Pr ? function(e, t) {
  return Pr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: vd(t),
    writable: !0
  });
} : hd, md = gd, bd = 800, yd = 16, Cd = Date.now;
function wd(e) {
  var t = 0, n = 0;
  return function() {
    var r = Cd(), o = yd - (r - n);
    if (n = r, o > 0) {
      if (++t >= bd)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Ad = wd, xd = md, Ed = Ad, Pd = Ed(xd), Od = Pd, $d = _o, _d = fd, Sd = Od;
function Td(e, t) {
  return Sd(_d(e, t, $d), e + "");
}
var Rd = Td, Ld = It, Fd = _n, Dd = Po, jd = Se;
function Md(e, t, n) {
  if (!jd(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? Fd(n) && Dd(t, n.length) : r == "string" && t in n) ? Ld(n[t], e) : !1;
}
var Id = Md, Nd = Rd, Bd = Id;
function Vd(e) {
  return Nd(function(t, n) {
    var r = -1, o = n.length, a = o > 1 ? n[o - 1] : void 0, c = o > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (o--, a) : void 0, c && Bd(n[0], n[1], c) && (a = o < 3 ? void 0 : a, o = 1), t = Object(t); ++r < o; ) {
      var i = n[r];
      i && e(t, i, r, a);
    }
    return t;
  });
}
var Hd = Vd, kd = ad, Ud = Hd, zd = Ud(function(e, t, n) {
  kd(e, t, n);
}), Gd = zd;
const Wd = /* @__PURE__ */ Zo(Gd), qd = /* @__PURE__ */ S.jsx(
  "svg",
  {
    "data-testid": "app-switcher-button",
    height: 16,
    viewBox: "0 0 16 16",
    width: 16,
    children: /* @__PURE__ */ S.jsx(
      "path",
      {
        d: "M4.57143 2.375C4.57143 2.97174 4.33061 3.54403 3.90196 3.96599C3.4733 4.38795 2.89192 4.625 2.28571 4.625C1.67951 4.625 1.09812 4.38795 0.66947 3.96599C0.240816 3.54403 0 2.97174 0 2.375C0 1.77826 0.240816 1.20597 0.66947 0.78401C1.09812 0.362053 1.67951 0.125 2.28571 0.125C2.89192 0.125 3.4733 0.362053 3.90196 0.78401C4.33061 1.20597 4.57143 1.77826 4.57143 2.375ZM4.57143 8C4.57143 8.59674 4.33061 9.16903 3.90196 9.59099C3.4733 10.0129 2.89192 10.25 2.28571 10.25C1.67951 10.25 1.09812 10.0129 0.66947 9.59099C0.240816 9.16903 0 8.59674 0 8C0 7.40326 0.240816 6.83097 0.66947 6.40901C1.09812 5.98705 1.67951 5.75 2.28571 5.75C2.89192 5.75 3.4733 5.98705 3.90196 6.40901C4.33061 6.83097 4.57143 7.40326 4.57143 8ZM2.28571 15.875C1.67951 15.875 1.09812 15.6379 0.66947 15.216C0.240816 14.794 0 14.2217 0 13.625C0 13.0283 0.240816 12.456 0.66947 12.034C1.09812 11.6121 1.67951 11.375 2.28571 11.375C2.89192 11.375 3.4733 11.6121 3.90196 12.034C4.33061 12.456 4.57143 13.0283 4.57143 13.625C4.57143 14.2217 4.33061 14.794 3.90196 15.216C3.4733 15.6379 2.89192 15.875 2.28571 15.875ZM10.2857 2.375C10.2857 2.97174 10.0449 3.54403 9.61624 3.96599C9.18759 4.38795 8.60621 4.625 8 4.625C7.39379 4.625 6.81241 4.38795 6.38376 3.96599C5.9551 3.54403 5.71429 2.97174 5.71429 2.375C5.71429 1.77826 5.9551 1.20597 6.38376 0.78401C6.81241 0.362053 7.39379 0.125 8 0.125C8.60621 0.125 9.18759 0.362053 9.61624 0.78401C10.0449 1.20597 10.2857 1.77826 10.2857 2.375ZM8 10.25C7.39379 10.25 6.81241 10.0129 6.38376 9.59099C5.9551 9.16903 5.71429 8.59674 5.71429 8C5.71429 7.40326 5.9551 6.83097 6.38376 6.40901C6.81241 5.98705 7.39379 5.75 8 5.75C8.60621 5.75 9.18759 5.98705 9.61624 6.40901C10.0449 6.83097 10.2857 7.40326 10.2857 8C10.2857 8.59674 10.0449 9.16903 9.61624 9.59099C9.18759 10.0129 8.60621 10.25 8 10.25ZM10.2857 13.625C10.2857 14.2217 10.0449 14.794 9.61624 15.216C9.18759 15.6379 8.60621 15.875 8 15.875C7.39379 15.875 6.81241 15.6379 6.38376 15.216C5.9551 14.794 5.71429 14.2217 5.71429 13.625C5.71429 13.0283 5.9551 12.456 6.38376 12.034C6.81241 11.6121 7.39379 11.375 8 11.375C8.60621 11.375 9.18759 11.6121 9.61624 12.034C10.0449 12.456 10.2857 13.0283 10.2857 13.625ZM13.7143 4.625C13.1081 4.625 12.5267 4.38795 12.098 3.96599C11.6694 3.54403 11.4286 2.97174 11.4286 2.375C11.4286 1.77826 11.6694 1.20597 12.098 0.78401C12.5267 0.362053 13.1081 0.125 13.7143 0.125C14.3205 0.125 14.9019 0.362053 15.3305 0.78401C15.7592 1.20597 16 1.77826 16 2.375C16 2.97174 15.7592 3.54403 15.3305 3.96599C14.9019 4.38795 14.3205 4.625 13.7143 4.625ZM16 8C16 8.59674 15.7592 9.16903 15.3305 9.59099C14.9019 10.0129 14.3205 10.25 13.7143 10.25C13.1081 10.25 12.5267 10.0129 12.098 9.59099C11.6694 9.16903 11.4286 8.59674 11.4286 8C11.4286 7.40326 11.6694 6.83097 12.098 6.40901C12.5267 5.98705 13.1081 5.75 13.7143 5.75C14.3205 5.75 14.9019 5.98705 15.3305 6.40901C15.7592 6.83097 16 7.40326 16 8ZM13.7143 15.875C13.1081 15.875 12.5267 15.6379 12.098 15.216C11.6694 14.794 11.4286 14.2217 11.4286 13.625C11.4286 13.0283 11.6694 12.456 12.098 12.034C12.5267 11.6121 13.1081 11.375 13.7143 11.375C14.3205 11.375 14.9019 11.6121 15.3305 12.034C15.7592 12.456 16 13.0283 16 13.625C16 14.2217 15.7592 14.794 15.3305 15.216C14.9019 15.6379 14.3205 15.875 13.7143 15.875Z",
        fill: "currentColor"
      }
    )
  }
), Ut = Et(() => ""), Jd = ({
  buttonUI: e = qd,
  hideCloseButton: t = !1,
  hideFooter: n = !1,
  overlayColor: r = "transparent",
  partnersConfig: o = {},
  customStyles: a = {}
}) => {
  const [c, i] = ee(!1), l = Wd(
    {},
    ts,
    o
  ), u = Object.entries(l).filter(
    ([, f]) => !f.shouldHide
  ), d = (f) => `${qc[f]} ${a[f] || ""}`.trim();
  return /* @__PURE__ */ S.jsx(Ut.Provider, { value: d, children: /* @__PURE__ */ S.jsxs(Tc, { onOpenChange: i, children: [
    /* @__PURE__ */ S.jsx(Rc, { className: d("PopoverTrigger"), asChild: !0, children: e }),
    /* @__PURE__ */ S.jsx(Lc, { children: /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ S.jsxs(
        Fc,
        {
          className: d("PopoverContent"),
          collisionPadding: 10,
          side: "bottom",
          sideOffset: 20,
          children: [
            /* @__PURE__ */ S.jsx("div", { className: d("partners"), children: u.map(([f, v]) => /* @__PURE__ */ S.jsx(
              rs,
              {
                icon: v.icon,
                link: v.link,
                name: f
              },
              f
            )) }),
            !n && /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsx("hr", {}),
              /* @__PURE__ */ S.jsx(os, {})
            ] }),
            !t && /* @__PURE__ */ S.jsx(
              Dc,
              {
                "aria-label": "Close",
                className: d("PopoverClose"),
                "data-testid": "app-switcher-close-button",
                children: /* @__PURE__ */ S.jsx(na, {})
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ S.jsx(ns, { open: c, overlayColor: r })
    ] }) })
  ] }) });
};
export {
  Jd as QntmAppSwitcher
};
