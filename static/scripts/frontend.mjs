const H = window, V = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), K = /* @__PURE__ */ new WeakMap();
let nt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== W)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (n) => new nt(typeof n == "string" ? n : n + "", void 0, W), ct = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new nt(e, n, W);
}, ut = (n, t) => {
  V ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  });
}, Z = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return dt(e);
})(n) : n;
var k;
const O = window, G = O.trustedTypes, pt = G ? G.emptyScript : "", J = O.reactiveElementPolyfillSupport, B = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? pt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, ot = (n, t) => t !== n && (t == t || n == n), z = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: ot };
let f = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, s) => {
      const i = this._$Ep(s, e);
      i !== void 0 && (this._$Ev.set(i, s), t.push(i));
    }), t;
  }
  static createProperty(t, e = z) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = typeof t == "symbol" ? Symbol() : "__" + t, i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return { get() {
      return this[e];
    }, set(i) {
      const r = this[t];
      this[e] = i, this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || z;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, s = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(Z(i));
    } else
      t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ut(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = z) {
    var i;
    const r = this.constructor._$Ep(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (((i = s.converter) === null || i === void 0 ? void 0 : i.toAttribute) !== void 0 ? s.converter : B).toAttribute(e, s.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var s;
    const i = this.constructor, r = i._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = i.getPropertyOptions(r), d = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? o.converter : B;
      this._$El = r, this[r] = d.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    t !== void 0 && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || ot)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, s))) : i = !1), !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((i, r) => this[r] = i), this._$Ei = void 0);
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
        var r;
        return (r = i.hostUpdate) === null || r === void 0 ? void 0 : r.call(i);
      }), this.update(s)) : this._$Ek();
    } catch (i) {
      throw e = !1, this._$Ek(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) === null || i === void 0 ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
f.finalized = !0, f.elementProperties = /* @__PURE__ */ new Map(), f.elementStyles = [], f.shadowRootOptions = { mode: "open" }, J == null || J({ ReactiveElement: f }), ((k = O.reactiveElementVersions) !== null && k !== void 0 ? k : O.reactiveElementVersions = []).push("1.5.0");
var L;
const N = window, m = N.trustedTypes, Y = m ? m.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, v = `lit$${(Math.random() + "").slice(9)}$`, rt = "?" + v, $t = `<${rt}>`, y = document, w = (n = "") => y.createComment(n), C = (n) => n === null || typeof n != "object" && typeof n != "function", lt = Array.isArray, vt = (n) => lt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, F = /-->/g, Q = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), X = /'/g, tt = /"/g, ht = /^(?:script|style|textarea|title)$/i, _t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), ft = _t(1), g = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), A = y.createTreeWalker(y, 129, null, !1), At = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : "", o = S;
  for (let l = 0; l < e; l++) {
    const h = n[l];
    let $, a, c = -1, p = 0;
    for (; p < h.length && (o.lastIndex = p, a = o.exec(h), a !== null); )
      p = o.lastIndex, o === S ? a[1] === "!--" ? o = F : a[1] !== void 0 ? o = Q : a[2] !== void 0 ? (ht.test(a[2]) && (i = RegExp("</" + a[2], "g")), o = _) : a[3] !== void 0 && (o = _) : o === _ ? a[0] === ">" ? (o = i ?? S, c = -1) : a[1] === void 0 ? c = -2 : (c = o.lastIndex - a[2].length, $ = a[1], o = a[3] === void 0 ? _ : a[3] === '"' ? tt : X) : o === tt || o === X ? o = _ : o === F || o === Q ? o = S : (o = _, i = void 0);
    const T = o === _ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === S ? h + $t : c >= 0 ? (s.push($), h.slice(0, c) + "$lit$" + h.slice(c) + v + T) : h + v + (c === -2 ? (s.push(void 0), l) : T);
  }
  const d = r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Y !== void 0 ? Y.createHTML(d) : d, s];
};
class x {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, l = this.parts, [h, $] = At(t, e);
    if (this.el = x.createElement(h, s), A.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (i = A.nextNode()) !== null && l.length < d; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const a = [];
          for (const c of i.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(v)) {
              const p = $[o++];
              if (a.push(c), p !== void 0) {
                const T = i.getAttribute(p.toLowerCase() + "$lit$").split(v), U = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: U[2], strings: T, ctor: U[1] === "." ? yt : U[1] === "?" ? Et : U[1] === "@" ? St : R });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of a)
            i.removeAttribute(c);
        }
        if (ht.test(i.tagName)) {
          const a = i.textContent.split(v), c = a.length - 1;
          if (c > 0) {
            i.textContent = m ? m.emptyScript : "";
            for (let p = 0; p < c; p++)
              i.append(a[p], w()), A.nextNode(), l.push({ type: 2, index: ++r });
            i.append(a[c], w());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === rt)
          l.push({ type: 2, index: r });
        else {
          let a = -1;
          for (; (a = i.data.indexOf(v, a + 1)) !== -1; )
            l.push({ type: 7, index: r }), a += v.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(n, t, e = n, s) {
  var i, r, o, d;
  if (t === g)
    return t;
  let l = s !== void 0 ? (i = e._$Co) === null || i === void 0 ? void 0 : i[s] : e._$Cl;
  const h = C(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), h === void 0 ? l = void 0 : (l = new h(n), l._$AT(n, e, s)), s !== void 0 ? ((o = (d = e)._$Co) !== null && o !== void 0 ? o : d._$Co = [])[s] = l : e._$Cl = l), l !== void 0 && (t = E(n, l._$AS(n, t.values), l, s)), t;
}
class mt {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: s }, parts: i } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(s, !0);
    A.currentNode = r;
    let o = A.nextNode(), d = 0, l = 0, h = i[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let $;
        h.type === 2 ? $ = new P(o, o.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && ($ = new bt(o, this, t)), this.u.push($), h = i[++l];
      }
      d !== (h == null ? void 0 : h.index) && (o = A.nextNode(), d++);
    }
    return r;
  }
  p(t) {
    let e = 0;
    for (const s of this.u)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class P {
  constructor(t, e, s, i) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cm = (r = i == null ? void 0 : i.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), C(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== g && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vt(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== u && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = x.createElement(i.h, this.options)), i);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.p(s);
    else {
      const o = new mt(r, this), d = o.v(this.options);
      o.p(s), this.T(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new x(t)), e;
  }
  k(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t)
      i === e.length ? e.push(s = new P(this.O(w()), this.O(w()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class R {
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = E(this, t, e, 0), o = !C(t) || t !== this._$AH && t !== g, o && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = E(this, d[s + l], e, l), h === g && (h = this._$AH[l]), o || (o = !C(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const gt = m ? m.emptyScript : "";
class Et extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, gt) : this.element.removeAttribute(this.name);
  }
}
class St extends R {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = E(this, t, e, 0)) !== null && s !== void 0 ? s : u) === g)
      return;
    const i = this._$AH, r = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class bt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const st = N.litHtmlPolyfillSupport;
st == null || st(x, P), ((L = N.litHtmlVersions) !== null && L !== void 0 ? L : N.litHtmlVersions = []).push("2.5.0");
const wt = (n, t, e) => {
  var s, i;
  const r = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const d = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : null;
    r._$litPart$ = o = new P(t.insertBefore(w(), d), d, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
var j, D;
class b extends f {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = s.firstChild), s;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = wt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return g;
  }
}
b.finalized = !0, b._$litElement$ = !0, (j = globalThis.litElementHydrateSupport) === null || j === void 0 || j.call(globalThis, { LitElement: b });
const it = globalThis.litElementPolyfillSupport;
it == null || it({ LitElement: b });
((D = globalThis.litElementVersions) !== null && D !== void 0 ? D : globalThis.litElementVersions = []).push("3.2.2");
const Ct = (n) => (t) => typeof t == "function" ? ((e, s) => (customElements.define(e, s), s))(n, t) : ((e, s) => {
  const { kind: i, elements: r } = s;
  return { kind: i, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(n, t);
const xt = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function at(n) {
  return (t, e) => e !== void 0 ? ((s, i, r) => {
    i.constructor.createProperty(r, s);
  })(n, t, e) : xt(n, t);
}
var I;
((I = window.HTMLSlotElement) === null || I === void 0 ? void 0 : I.prototype.assignedElements) != null;
var Pt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, q = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Tt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Pt(t, e, i), i;
};
const Ut = "my-element";
let M = class extends b {
  constructor() {
    super(...arguments), this.version = "STARTING", this.example = "";
  }
  static get styles() {
    return ct`
      .welcome {
        font-size: 36px;
      }
    `;
  }
  render() {
    return ft`
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `;
  }
};
q([
  at()
], M.prototype, "version", 2);
q([
  at()
], M.prototype, "example", 2);
M = q([
  Ct(Ut)
], M);
console.log("Howdy");
