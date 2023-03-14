const ie = window, Me = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ce = Symbol(), Pe = /* @__PURE__ */ new WeakMap();
let qe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ce)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Me && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const wt = (s) => new qe(typeof s == "string" ? s : s + "", void 0, Ce), et = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new qe(t, s, Ce);
}, Mt = (s, e) => {
  Me ? s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), r = ie.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  });
}, Ne = Me ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules)
    t += i.cssText;
  return wt(t);
})(s) : s;
var he;
const re = window, Le = re.trustedTypes, Ct = Le ? Le.emptyScript : "", Ue = re.reactiveElementPolyfillSupport, ye = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ct : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, tt = (s, e) => e !== s && (e == e || s == s), de = { attribute: !0, type: String, converter: ye, reflect: !1, hasChanged: tt };
let H = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, i) => {
      const r = this._$Ep(i, t);
      r !== void 0 && (this._$Ev.set(r, i), e.push(r));
    }), e;
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Object.defineProperty(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(r) {
      const n = this[e];
      this[t] = r, this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || de;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const r of i)
        this.createProperty(r, t[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i)
        t.unshift(Ne(r));
    } else
      e !== void 0 && t.push(Ne(e));
    return t;
  }
  static _$Ep(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Mt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$EO(e, t, i = de) {
    var r;
    const n = this.constructor._$Ep(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? i.converter : ye).toAttribute(t, i.type);
      this._$El = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i;
    const r = this.constructor, n = r._$Ev.get(e);
    if (n !== void 0 && this._$El !== n) {
      const o = r.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : ye;
      this._$El = n, this[n] = a.fromAttribute(t, o.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let r = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || tt)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, n) => this[n] = r), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
        var n;
        return (n = r.hostUpdate) === null || n === void 0 ? void 0 : n.call(r);
      }), this.update(i)) : this._$Ek();
    } catch (r) {
      throw t = !1, this._$Ek(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var r;
      return (r = i.hostUpdated) === null || r === void 0 ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
H.finalized = !0, H.elementProperties = /* @__PURE__ */ new Map(), H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, Ue == null || Ue({ ReactiveElement: H }), ((he = re.reactiveElementVersions) !== null && he !== void 0 ? he : re.reactiveElementVersions = []).push("1.5.0");
var ue;
const ne = window, D = ne.trustedTypes, He = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, S = `lit$${(Math.random() + "").slice(9)}$`, ke = "?" + S, kt = `<${ke}>`, B = document, Q = (s = "") => B.createComment(s), Y = (s) => s === null || typeof s != "object" && typeof s != "function", st = Array.isArray, it = (s) => st(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, ze = />/g, O = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Fe = /'/g, De = /"/g, rt = /^(?:script|style|textarea|title)$/i, Rt = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), j = Rt(1), k = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), z = B.createTreeWalker(B, 129, null, !1), nt = (s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : "", o = W;
  for (let c = 0; c < t; c++) {
    const l = s[c];
    let u, d, h = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, d = o.exec(l), d !== null); )
      p = o.lastIndex, o === W ? d[1] === "!--" ? o = je : d[1] !== void 0 ? o = ze : d[2] !== void 0 ? (rt.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = O) : d[3] !== void 0 && (o = O) : o === O ? d[0] === ">" ? (o = r ?? W, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, u = d[1], o = d[3] === void 0 ? O : d[3] === '"' ? De : Fe) : o === De || o === Fe ? o = O : o === je || o === ze ? o = W : (o = O, r = void 0);
    const g = o === O && s[c + 1].startsWith("/>") ? " " : "";
    n += o === W ? l + kt : h >= 0 ? (i.push(u), l.slice(0, h) + "$lit$" + l.slice(h) + S + g) : l + S + (h === -2 ? (i.push(void 0), c) : g);
  }
  const a = n + (s[t] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [He !== void 0 ? He.createHTML(a) : a, i];
};
class J {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, c = this.parts, [l, u] = nt(e, t);
    if (this.el = J.createElement(l, i), z.currentNode = this.el.content, t === 2) {
      const d = this.el.content, h = d.firstChild;
      h.remove(), d.append(...h.childNodes);
    }
    for (; (r = z.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const d = [];
          for (const h of r.getAttributeNames())
            if (h.endsWith("$lit$") || h.startsWith(S)) {
              const p = u[o++];
              if (d.push(h), p !== void 0) {
                const g = r.getAttribute(p.toLowerCase() + "$lit$").split(S), _ = /([.?@])?(.*)/.exec(p);
                c.push({ type: 1, index: n, name: _[2], strings: g, ctor: _[1] === "." ? ct : _[1] === "?" ? lt : _[1] === "@" ? at : X });
              } else
                c.push({ type: 6, index: n });
            }
          for (const h of d)
            r.removeAttribute(h);
        }
        if (rt.test(r.tagName)) {
          const d = r.textContent.split(S), h = d.length - 1;
          if (h > 0) {
            r.textContent = D ? D.emptyScript : "";
            for (let p = 0; p < h; p++)
              r.append(d[p], Q()), z.nextNode(), c.push({ type: 2, index: ++n });
            r.append(d[h], Q());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === ke)
          c.push({ type: 2, index: n });
        else {
          let d = -1;
          for (; (d = r.data.indexOf(S, d + 1)) !== -1; )
            c.push({ type: 7, index: n }), d += S.length - 1;
        }
      n++;
    }
  }
  static createElement(e, t) {
    const i = B.createElement("template");
    return i.innerHTML = e, i;
  }
}
function N(s, e, t = s, i) {
  var r, n, o, a;
  if (e === k)
    return e;
  let c = i !== void 0 ? (r = t._$Co) === null || r === void 0 ? void 0 : r[i] : t._$Cl;
  const l = Y(e) ? void 0 : e._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== l && ((n = c == null ? void 0 : c._$AO) === null || n === void 0 || n.call(c, !1), l === void 0 ? c = void 0 : (c = new l(s), c._$AT(s, t, i)), i !== void 0 ? ((o = (a = t)._$Co) !== null && o !== void 0 ? o : a._$Co = [])[i] = c : t._$Cl = c), c !== void 0 && (e = N(s, c._$AS(s, e.values), c, i)), e;
}
class ot {
  constructor(e, t) {
    this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(e) {
    var t;
    const { el: { content: i }, parts: r } = this._$AD, n = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : B).importNode(i, !0);
    z.currentNode = n;
    let o = z.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new K(o, o.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (u = new ht(o, this, e)), this.u.push(u), l = r[++c];
      }
      a !== (l == null ? void 0 : l.index) && (o = z.nextNode(), a++);
    }
    return n;
  }
  p(e) {
    let t = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class K {
  constructor(e, t, i, r) {
    var n;
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cm = (n = r == null ? void 0 : r.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cm;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = N(this, e, t), Y(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== k && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : it(e) ? this.k(e) : this.g(e);
  }
  O(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  g(e) {
    this._$AH !== $ && Y(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: i, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = J.createElement(r.h, this.options)), r);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === n)
      this._$AH.p(i);
    else {
      const o = new ot(n, this), a = o.v(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Be.get(e.strings);
    return t === void 0 && Be.set(e.strings, t = new J(e)), t;
  }
  k(e) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e)
      r === t.length ? t.push(i = new K(this.O(Q()), this.O(Q()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cm = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class X {
  constructor(e, t, i, r, n) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      e = N(this, e, t, 0), o = !Y(e) || e !== this._$AH && e !== k, o && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++)
        l = N(this, a[i + c], t, c), l === k && (l = this._$AH[c]), o || (o = !Y(l) || l !== this._$AH[c]), l === $ ? e = $ : e !== $ && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ct extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
const It = D ? D.emptyScript : "";
class lt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== $ ? this.element.setAttribute(this.name, It) : this.element.removeAttribute(this.name);
  }
}
class at extends X {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = N(this, e, t, 0)) !== null && i !== void 0 ? i : $) === k)
      return;
    const r = this._$AH, n = e === $ && r !== $ || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== $ && (r === $ || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class ht {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const Ot = { P: "$lit$", A: S, M: ke, C: 1, L: nt, R: ot, D: it, V: N, I: K, H: X, N: lt, U: at, B: ct, F: ht }, Ke = ne.litHtmlPolyfillSupport;
Ke == null || Ke(J, K), ((ue = ne.litHtmlVersions) !== null && ue !== void 0 ? ue : ne.litHtmlVersions = []).push("2.5.0");
const Tt = (s, e, t) => {
  var i, r;
  const n = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : e;
  let o = n._$litPart$;
  if (o === void 0) {
    const a = (r = t == null ? void 0 : t.renderBefore) !== null && r !== void 0 ? r : null;
    n._$litPart$ = o = new K(e.insertBefore(Q(), a), a, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
var pe, fe;
let F = class extends H {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, t;
    const i = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = i.firstChild), i;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Tt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return k;
  }
};
F.finalized = !0, F._$litElement$ = !0, (pe = globalThis.litElementHydrateSupport) === null || pe === void 0 || pe.call(globalThis, { LitElement: F });
const Ve = globalThis.litElementPolyfillSupport;
Ve == null || Ve({ LitElement: F });
((fe = globalThis.litElementVersions) !== null && fe !== void 0 ? fe : globalThis.litElementVersions = []).push("3.2.2");
const dt = (s) => (e) => typeof e == "function" ? ((t, i) => (customElements.define(t, i), i))(s, e) : ((t, i) => {
  const { kind: r, elements: n } = i;
  return { kind: r, elements: n, finisher(o) {
    customElements.define(t, o);
  } };
})(s, e);
const Pt = (s, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, s);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, s);
} };
function Z(s) {
  return (e, t) => t !== void 0 ? ((i, r, n) => {
    r.constructor.createProperty(n, i);
  })(s, e, t) : Pt(s, e);
}
function ut(s) {
  return Z({ ...s, state: !0 });
}
var ge;
((ge = window.HTMLSlotElement) === null || ge === void 0 ? void 0 : ge.prototype.assignedElements) != null;
var Nt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, Re = (s, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Lt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Nt(e, t, r), r;
};
const Ut = "my-element";
let oe = class extends F {
  constructor() {
    super(...arguments), this.version = "STARTING", this.example = "";
  }
  static get styles() {
    return et`
      .welcome {
        font-size: 36px;
      }
    `;
  }
  render() {
    return j`
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `;
  }
};
Re([
  Z()
], oe.prototype, "version", 2);
Re([
  Z()
], oe.prototype, "example", 2);
oe = Re([
  dt(Ut)
], oe);
const pt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ft = (s) => (...e) => ({ _$litDirective$: s, values: e });
class gt {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
const { I: Ht } = Ot, We = () => document.createComment(""), G = (s, e, t) => {
  var i;
  const r = s._$AA.parentNode, n = e === void 0 ? s._$AB : e._$AA;
  if (t === void 0) {
    const o = r.insertBefore(We(), n), a = r.insertBefore(We(), n);
    t = new Ht(o, a, s, s.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, c = a !== s;
    if (c) {
      let l;
      (i = t._$AQ) === null || i === void 0 || i.call(t, s), t._$AM = s, t._$AP !== void 0 && (l = s._$AU) !== a._$AU && t._$AP(l);
    }
    if (o !== n || c) {
      let l = t._$AA;
      for (; l !== o; ) {
        const u = l.nextSibling;
        r.insertBefore(l, n), l = u;
      }
    }
  }
  return t;
}, T = (s, e, t = s) => (s._$AI(e, t), s), jt = {}, zt = (s, e = jt) => s._$AH = e, Ft = (s) => s._$AH, _e = (s) => {
  var e;
  (e = s._$AP) === null || e === void 0 || e.call(s, !1, !0);
  let t = s._$AA;
  const i = s._$AB.nextSibling;
  for (; t !== i; ) {
    const r = t.nextSibling;
    t.remove(), t = r;
  }
};
const Ge = (s, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++)
    i.set(s[r], r);
  return i;
}, Dt = ft(class extends gt {
  constructor(s) {
    if (super(s), s.type !== pt.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  ht(s, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], n = [];
    let o = 0;
    for (const a of s)
      r[o] = i ? i(a, o) : o, n[o] = t(a, o), o++;
    return { values: n, keys: r };
  }
  render(s, e, t) {
    return this.ht(s, e, t).values;
  }
  update(s, [e, t, i]) {
    var r;
    const n = Ft(s), { values: o, keys: a } = this.ht(e, t, i);
    if (!Array.isArray(n))
      return this.ut = a, o;
    const c = (r = this.ut) !== null && r !== void 0 ? r : this.ut = [], l = [];
    let u, d, h = 0, p = n.length - 1, g = 0, _ = o.length - 1;
    for (; h <= p && g <= _; )
      if (n[h] === null)
        h++;
      else if (n[p] === null)
        p--;
      else if (c[h] === a[g])
        l[g] = T(n[h], o[g]), h++, g++;
      else if (c[p] === a[_])
        l[_] = T(n[p], o[_]), p--, _--;
      else if (c[h] === a[_])
        l[_] = T(n[h], o[_]), G(s, l[_ + 1], n[h]), h++, _--;
      else if (c[p] === a[g])
        l[g] = T(n[p], o[g]), G(s, n[h], n[p]), p--, g++;
      else if (u === void 0 && (u = Ge(a, g, _), d = Ge(c, h, p)), u.has(c[h]))
        if (u.has(c[p])) {
          const v = d.get(a[g]), m = v !== void 0 ? n[v] : null;
          if (m === null) {
            const x = G(s, n[h]);
            T(x, o[g]), l[g] = x;
          } else
            l[g] = T(m, o[g]), G(s, n[h], m), n[v] = null;
          g++;
        } else
          _e(n[p]), p--;
      else
        _e(n[h]), h++;
    for (; g <= _; ) {
      const v = G(s, l[_ + 1]);
      T(v, o[g]), l[g++] = v;
    }
    for (; h <= p; ) {
      const v = n[h++];
      v !== null && _e(v);
    }
    return this.ut = a, zt(s, l), k;
  }
});
const Bt = ft(class extends gt {
  constructor(s) {
    var e;
    if (super(s), s.type !== pt.ATTRIBUTE || s.name !== "class" || ((e = s.strings) === null || e === void 0 ? void 0 : e.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((e) => s[e]).join(" ") + " ";
  }
  update(s, [e]) {
    var t, i;
    if (this.nt === void 0) {
      this.nt = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.st = new Set(s.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in e)
        e[n] && !(!((t = this.st) === null || t === void 0) && t.has(n)) && this.nt.add(n);
      return this.render(e);
    }
    const r = s.element.classList;
    this.nt.forEach((n) => {
      n in e || (r.remove(n), this.nt.delete(n));
    });
    for (const n in e) {
      const o = !!e[n];
      o === this.nt.has(n) || ((i = this.st) === null || i === void 0 ? void 0 : i.has(n)) || (o ? (r.add(n), this.nt.add(n)) : (r.remove(n), this.nt.delete(n)));
    }
    return k;
  }
}), Kt = et`
:host {
  display: flex;
  align-items: center;
  /* Trying to control width of search bar: */
  width: 100%;
}

:root {
  /* [Q] Why are new variables defined here not used? */
  /* [A]: put them in host when in a component! */
  /* --background: #FFFFeb; */
  /* --background_dark: #F2F2DE; */
  /* --trans-black: #000000; */
  /* --foreground: #111111; */
  /* --dark-gray: #111111; */
  /* --light-gray: #404040; */
  /* --lighter-gray: #646464; */
  /* --dark-red: #660000; */
  /* --light-red: #b30000; */
  /* --site-name: "honeybit.cooking" */
}

.recipes-search {
  /* border: 2px solid green; */
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  box-sizing: border-box;
  width: 100%;
  /* box-shadow: -8px 0px 8px -8px rgba(0,0,0,0.2); */
}
.recipes-search__input {
  height: 2rem;
}

.recipes-search__input[type="text"] {
  /* [Q] Where is the color of the placeholder text set? */
  /* Margin above search box: */
  float: left;
  display: flex;
  flex-direction: row;
  border: 0px;
  border-radius: 0px;
  outline: 0;
  background-color: #F2F2DE;
  /* font-size: 14px; */
  font-family: "Sans";
  font-size: 12px;
  /* why does "--light-gray" look lighter here than on the border? */
  color: var(--light-gray);
  /* Padding around input text: */
  padding-top: .618rem;
  padding-bottom: .618rem;
  /* padding-left: .618rem; */
  box-sizing: border-box;
  width: 100%;
  z-index: 2;
}

.recipes-search__input[type="submit"] {
  /* font-family: "Material Symbols Outlined"; */
  -webkit-appearance: none;
  border-radius: 0;
  font-family: "Stix";
  font-size: 12px;
  border: 0 none;
  /* border:1px solid black; */
  background: #F2F2DE;
  /* background: #F2F2DE url(https://img.icons8.com/material-outlined/256/search--v1.png); */
  /* background-size: 1rem; */
  /* background-repeat: no-repeat; */
  /* background-position: right; */
  box-sizing: border-box;
  color: #909090;
  text-align: center;
  padding-right: 0rem;
  font-family: "Sans";
  /* height: 2.618rem; */
  width: 30px;
}



.recipes-search__results {
  /* border: 1px solid #404040; */
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  /* margin: -6px; */
  width: 100%;
  /* [Q] Is this the best way to set a minimum width? How to prevent x overflow? */
  /* min-width: 300px; */
  background-color: rgb(255, 255, 235, 1);
  box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.2);
  z-index: 1;
  box-sizing: border-box;
  /* TODO: fix scrollbar glitch (unwanted margin on bottom of dropdown) */
  overflow: hidden;
  max-height: 80dvh;
}

.recipes-search__results--hidden {
  display: none;
}

.recipe-search-result-container {
  display: inline-block;
  width: 100%;
  /* color: black; */
  /* border: 2px solid red; */
}

.recipe-search-result-container:hover {
  /* color: black; */
  background: rgb(179, 0, 0, .15);
}

a {
  text-decoration: none;
}

.recipe-search-result-content {
  /* display: inline-block; */
  /* font-size: 1rem; */
  color: black;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: .618rem;
  padding-bottom: .618rem;
  /* border: 2px solid green; */
}

.recipe-result__title {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.recipe-result__description p {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

`;
function w(s) {
  return Array.isArray ? Array.isArray(s) : vt(s) === "[object Array]";
}
const Vt = 1 / 0;
function Wt(s) {
  if (typeof s == "string")
    return s;
  let e = s + "";
  return e == "0" && 1 / s == -Vt ? "-0" : e;
}
function Gt(s) {
  return s == null ? "" : Wt(s);
}
function E(s) {
  return typeof s == "string";
}
function _t(s) {
  return typeof s == "number";
}
function Qt(s) {
  return s === !0 || s === !1 || Yt(s) && vt(s) == "[object Boolean]";
}
function $t(s) {
  return typeof s == "object";
}
function Yt(s) {
  return $t(s) && s !== null;
}
function y(s) {
  return s != null;
}
function $e(s) {
  return !s.trim().length;
}
function vt(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Jt = "Incorrect 'index' type", Xt = (s) => `Invalid value for key ${s}`, Zt = (s) => `Pattern length exceeds max of ${s}.`, qt = (s) => `Missing ${s} property in key`, es = (s) => `Property 'weight' in key '${s}' must be a positive integer`, Qe = Object.prototype.hasOwnProperty;
class ts {
  constructor(e) {
    this._keys = [], this._keyMap = {};
    let t = 0;
    e.forEach((i) => {
      let r = mt(i);
      t += r.weight, this._keys.push(r), this._keyMap[r.id] = r, t += r.weight;
    }), this._keys.forEach((i) => {
      i.weight /= t;
    });
  }
  get(e) {
    return this._keyMap[e];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function mt(s) {
  let e = null, t = null, i = null, r = 1, n = null;
  if (E(s) || w(s))
    i = s, e = Ye(s), t = Ae(s);
  else {
    if (!Qe.call(s, "name"))
      throw new Error(qt("name"));
    const o = s.name;
    if (i = o, Qe.call(s, "weight") && (r = s.weight, r <= 0))
      throw new Error(es(o));
    e = Ye(o), t = Ae(o), n = s.getFn;
  }
  return { path: e, id: t, weight: r, src: i, getFn: n };
}
function Ye(s) {
  return w(s) ? s : s.split(".");
}
function Ae(s) {
  return w(s) ? s.join(".") : s;
}
function ss(s, e) {
  let t = [], i = !1;
  const r = (n, o, a) => {
    if (!!y(n))
      if (!o[a])
        t.push(n);
      else {
        let c = o[a];
        const l = n[c];
        if (!y(l))
          return;
        if (a === o.length - 1 && (E(l) || _t(l) || Qt(l)))
          t.push(Gt(l));
        else if (w(l)) {
          i = !0;
          for (let u = 0, d = l.length; u < d; u += 1)
            r(l[u], o, a + 1);
        } else
          o.length && r(l, o, a + 1);
      }
  };
  return r(s, E(e) ? e.split(".") : e, 0), i ? t : t[0];
}
const is = {
  includeMatches: !1,
  findAllMatches: !1,
  minMatchCharLength: 1
}, rs = {
  isCaseSensitive: !1,
  includeScore: !1,
  keys: [],
  shouldSort: !0,
  sortFn: (s, e) => s.score === e.score ? s.idx < e.idx ? -1 : 1 : s.score < e.score ? -1 : 1
}, ns = {
  location: 0,
  threshold: 0.6,
  distance: 100
}, os = {
  useExtendedSearch: !1,
  getFn: ss,
  ignoreLocation: !1,
  ignoreFieldNorm: !1,
  fieldNormWeight: 1
};
var f = {
  ...rs,
  ...is,
  ...ns,
  ...os
};
const cs = /[^ ]+/g;
function ls(s = 1, e = 3) {
  const t = /* @__PURE__ */ new Map(), i = Math.pow(10, e);
  return {
    get(r) {
      const n = r.match(cs).length;
      if (t.has(n))
        return t.get(n);
      const o = 1 / Math.pow(n, 0.5 * s), a = parseFloat(Math.round(o * i) / i);
      return t.set(n, a), a;
    },
    clear() {
      t.clear();
    }
  };
}
class Ie {
  constructor({
    getFn: e = f.getFn,
    fieldNormWeight: t = f.fieldNormWeight
  } = {}) {
    this.norm = ls(t, 3), this.getFn = e, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(e = []) {
    this.docs = e;
  }
  setIndexRecords(e = []) {
    this.records = e;
  }
  setKeys(e = []) {
    this.keys = e, this._keysMap = {}, e.forEach((t, i) => {
      this._keysMap[t.id] = i;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, E(this.docs[0]) ? this.docs.forEach((e, t) => {
      this._addString(e, t);
    }) : this.docs.forEach((e, t) => {
      this._addObject(e, t);
    }), this.norm.clear());
  }
  add(e) {
    const t = this.size();
    E(e) ? this._addString(e, t) : this._addObject(e, t);
  }
  removeAt(e) {
    this.records.splice(e, 1);
    for (let t = e, i = this.size(); t < i; t += 1)
      this.records[t].i -= 1;
  }
  getValueForItemAtKeyId(e, t) {
    return e[this._keysMap[t]];
  }
  size() {
    return this.records.length;
  }
  _addString(e, t) {
    if (!y(e) || $e(e))
      return;
    let i = {
      v: e,
      i: t,
      n: this.norm.get(e)
    };
    this.records.push(i);
  }
  _addObject(e, t) {
    let i = { i: t, $: {} };
    this.keys.forEach((r, n) => {
      let o = r.getFn ? r.getFn(e) : this.getFn(e, r.path);
      if (!!y(o)) {
        if (w(o)) {
          let a = [];
          const c = [{ nestedArrIndex: -1, value: o }];
          for (; c.length; ) {
            const { nestedArrIndex: l, value: u } = c.pop();
            if (!!y(u))
              if (E(u) && !$e(u)) {
                let d = {
                  v: u,
                  i: l,
                  n: this.norm.get(u)
                };
                a.push(d);
              } else
                w(u) && u.forEach((d, h) => {
                  c.push({
                    nestedArrIndex: h,
                    value: d
                  });
                });
          }
          i.$[n] = a;
        } else if (E(o) && !$e(o)) {
          let a = {
            v: o,
            n: this.norm.get(o)
          };
          i.$[n] = a;
        }
      }
    }), this.records.push(i);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function yt(s, e, { getFn: t = f.getFn, fieldNormWeight: i = f.fieldNormWeight } = {}) {
  const r = new Ie({ getFn: t, fieldNormWeight: i });
  return r.setKeys(s.map(mt)), r.setSources(e), r.create(), r;
}
function as(s, { getFn: e = f.getFn, fieldNormWeight: t = f.fieldNormWeight } = {}) {
  const { keys: i, records: r } = s, n = new Ie({ getFn: e, fieldNormWeight: t });
  return n.setKeys(i), n.setIndexRecords(r), n;
}
function se(s, {
  errors: e = 0,
  currentLocation: t = 0,
  expectedLocation: i = 0,
  distance: r = f.distance,
  ignoreLocation: n = f.ignoreLocation
} = {}) {
  const o = e / s.length;
  if (n)
    return o;
  const a = Math.abs(i - t);
  return r ? o + a / r : a ? 1 : o;
}
function hs(s = [], e = f.minMatchCharLength) {
  let t = [], i = -1, r = -1, n = 0;
  for (let o = s.length; n < o; n += 1) {
    let a = s[n];
    a && i === -1 ? i = n : !a && i !== -1 && (r = n - 1, r - i + 1 >= e && t.push([i, r]), i = -1);
  }
  return s[n - 1] && n - i >= e && t.push([i, n - 1]), t;
}
const P = 32;
function ds(s, e, t, {
  location: i = f.location,
  distance: r = f.distance,
  threshold: n = f.threshold,
  findAllMatches: o = f.findAllMatches,
  minMatchCharLength: a = f.minMatchCharLength,
  includeMatches: c = f.includeMatches,
  ignoreLocation: l = f.ignoreLocation
} = {}) {
  if (e.length > P)
    throw new Error(Zt(P));
  const u = e.length, d = s.length, h = Math.max(0, Math.min(i, d));
  let p = n, g = h;
  const _ = a > 1 || c, v = _ ? Array(d) : [];
  let m;
  for (; (m = s.indexOf(e, g)) > -1; ) {
    let A = se(e, {
      currentLocation: m,
      expectedLocation: h,
      distance: r,
      ignoreLocation: l
    });
    if (p = Math.min(A, p), g = m + u, _) {
      let M = 0;
      for (; M < u; )
        v[m + M] = 1, M += 1;
    }
  }
  g = -1;
  let x = [], I = 1, ee = u + d;
  const St = 1 << u - 1;
  for (let A = 0; A < u; A += 1) {
    let M = 0, C = ee;
    for (; M < C; )
      se(e, {
        errors: A,
        currentLocation: h + C,
        expectedLocation: h,
        distance: r,
        ignoreLocation: l
      }) <= p ? M = C : ee = C, C = Math.floor((ee - M) / 2 + M);
    ee = C;
    let Oe = Math.max(1, h - C + 1), ae = o ? d : Math.min(h + C, d) + u, U = Array(ae + 2);
    U[ae + 1] = (1 << A) - 1;
    for (let b = ae; b >= Oe; b -= 1) {
      let te = b - 1, Te = t[s.charAt(te)];
      if (_ && (v[te] = +!!Te), U[b] = (U[b + 1] << 1 | 1) & Te, A && (U[b] |= (x[b + 1] | x[b]) << 1 | 1 | x[b + 1]), U[b] & St && (I = se(e, {
        errors: A,
        currentLocation: te,
        expectedLocation: h,
        distance: r,
        ignoreLocation: l
      }), I <= p)) {
        if (p = I, g = te, g <= h)
          break;
        Oe = Math.max(1, 2 * h - g);
      }
    }
    if (se(e, {
      errors: A + 1,
      currentLocation: h,
      expectedLocation: h,
      distance: r,
      ignoreLocation: l
    }) > p)
      break;
    x = U;
  }
  const le = {
    isMatch: g >= 0,
    score: Math.max(1e-3, I)
  };
  if (_) {
    const A = hs(v, a);
    A.length ? c && (le.indices = A) : le.isMatch = !1;
  }
  return le;
}
function us(s) {
  let e = {};
  for (let t = 0, i = s.length; t < i; t += 1) {
    const r = s.charAt(t);
    e[r] = (e[r] || 0) | 1 << i - t - 1;
  }
  return e;
}
class At {
  constructor(e, {
    location: t = f.location,
    threshold: i = f.threshold,
    distance: r = f.distance,
    includeMatches: n = f.includeMatches,
    findAllMatches: o = f.findAllMatches,
    minMatchCharLength: a = f.minMatchCharLength,
    isCaseSensitive: c = f.isCaseSensitive,
    ignoreLocation: l = f.ignoreLocation
  } = {}) {
    if (this.options = {
      location: t,
      threshold: i,
      distance: r,
      includeMatches: n,
      findAllMatches: o,
      minMatchCharLength: a,
      isCaseSensitive: c,
      ignoreLocation: l
    }, this.pattern = c ? e : e.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const u = (h, p) => {
      this.chunks.push({
        pattern: h,
        alphabet: us(h),
        startIndex: p
      });
    }, d = this.pattern.length;
    if (d > P) {
      let h = 0;
      const p = d % P, g = d - p;
      for (; h < g; )
        u(this.pattern.substr(h, P), h), h += P;
      if (p) {
        const _ = d - P;
        u(this.pattern.substr(_), _);
      }
    } else
      u(this.pattern, 0);
  }
  searchIn(e) {
    const { isCaseSensitive: t, includeMatches: i } = this.options;
    if (t || (e = e.toLowerCase()), this.pattern === e) {
      let g = {
        isMatch: !0,
        score: 0
      };
      return i && (g.indices = [[0, e.length - 1]]), g;
    }
    const {
      location: r,
      distance: n,
      threshold: o,
      findAllMatches: a,
      minMatchCharLength: c,
      ignoreLocation: l
    } = this.options;
    let u = [], d = 0, h = !1;
    this.chunks.forEach(({ pattern: g, alphabet: _, startIndex: v }) => {
      const { isMatch: m, score: x, indices: I } = ds(e, g, _, {
        location: r + v,
        distance: n,
        threshold: o,
        findAllMatches: a,
        minMatchCharLength: c,
        includeMatches: i,
        ignoreLocation: l
      });
      m && (h = !0), d += x, m && I && (u = [...u, ...I]);
    });
    let p = {
      isMatch: h,
      score: h ? d / this.chunks.length : 1
    };
    return h && i && (p.indices = u), p;
  }
}
class R {
  constructor(e) {
    this.pattern = e;
  }
  static isMultiMatch(e) {
    return Je(e, this.multiRegex);
  }
  static isSingleMatch(e) {
    return Je(e, this.singleRegex);
  }
  search() {
  }
}
function Je(s, e) {
  const t = s.match(e);
  return t ? t[1] : null;
}
class ps extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(e) {
    const t = e === this.pattern;
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class fs extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(e) {
    const i = e.indexOf(this.pattern) === -1;
    return {
      isMatch: i,
      score: i ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class gs extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(e) {
    const t = e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class _s extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(e) {
    const t = !e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class $s extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(e) {
    const t = e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [e.length - this.pattern.length, e.length - 1]
    };
  }
}
class vs extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(e) {
    const t = !e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class bt extends R {
  constructor(e, {
    location: t = f.location,
    threshold: i = f.threshold,
    distance: r = f.distance,
    includeMatches: n = f.includeMatches,
    findAllMatches: o = f.findAllMatches,
    minMatchCharLength: a = f.minMatchCharLength,
    isCaseSensitive: c = f.isCaseSensitive,
    ignoreLocation: l = f.ignoreLocation
  } = {}) {
    super(e), this._bitapSearch = new At(e, {
      location: t,
      threshold: i,
      distance: r,
      includeMatches: n,
      findAllMatches: o,
      minMatchCharLength: a,
      isCaseSensitive: c,
      ignoreLocation: l
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(e) {
    return this._bitapSearch.searchIn(e);
  }
}
class Et extends R {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(e) {
    let t = 0, i;
    const r = [], n = this.pattern.length;
    for (; (i = e.indexOf(this.pattern, t)) > -1; )
      t = i + n, r.push([i, t - 1]);
    const o = !!r.length;
    return {
      isMatch: o,
      score: o ? 0 : 1,
      indices: r
    };
  }
}
const be = [
  ps,
  Et,
  gs,
  _s,
  vs,
  $s,
  fs,
  bt
], Xe = be.length, ms = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, ys = "|";
function As(s, e = {}) {
  return s.split(ys).map((t) => {
    let i = t.trim().split(ms).filter((n) => n && !!n.trim()), r = [];
    for (let n = 0, o = i.length; n < o; n += 1) {
      const a = i[n];
      let c = !1, l = -1;
      for (; !c && ++l < Xe; ) {
        const u = be[l];
        let d = u.isMultiMatch(a);
        d && (r.push(new u(d, e)), c = !0);
      }
      if (!c)
        for (l = -1; ++l < Xe; ) {
          const u = be[l];
          let d = u.isSingleMatch(a);
          if (d) {
            r.push(new u(d, e));
            break;
          }
        }
    }
    return r;
  });
}
const bs = /* @__PURE__ */ new Set([bt.type, Et.type]);
class Es {
  constructor(e, {
    isCaseSensitive: t = f.isCaseSensitive,
    includeMatches: i = f.includeMatches,
    minMatchCharLength: r = f.minMatchCharLength,
    ignoreLocation: n = f.ignoreLocation,
    findAllMatches: o = f.findAllMatches,
    location: a = f.location,
    threshold: c = f.threshold,
    distance: l = f.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: t,
      includeMatches: i,
      minMatchCharLength: r,
      findAllMatches: o,
      ignoreLocation: n,
      location: a,
      threshold: c,
      distance: l
    }, this.pattern = t ? e : e.toLowerCase(), this.query = As(this.pattern, this.options);
  }
  static condition(e, t) {
    return t.useExtendedSearch;
  }
  searchIn(e) {
    const t = this.query;
    if (!t)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: i, isCaseSensitive: r } = this.options;
    e = r ? e : e.toLowerCase();
    let n = 0, o = [], a = 0;
    for (let c = 0, l = t.length; c < l; c += 1) {
      const u = t[c];
      o.length = 0, n = 0;
      for (let d = 0, h = u.length; d < h; d += 1) {
        const p = u[d], { isMatch: g, indices: _, score: v } = p.search(e);
        if (g) {
          if (n += 1, a += v, i) {
            const m = p.constructor.type;
            bs.has(m) ? o = [...o, ..._] : o.push(_);
          }
        } else {
          a = 0, n = 0, o.length = 0;
          break;
        }
      }
      if (n) {
        let d = {
          isMatch: !0,
          score: a / n
        };
        return i && (d.indices = o), d;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const Ee = [];
function xs(...s) {
  Ee.push(...s);
}
function xe(s, e) {
  for (let t = 0, i = Ee.length; t < i; t += 1) {
    let r = Ee[t];
    if (r.condition(s, e))
      return new r(s, e);
  }
  return new At(s, e);
}
const ce = {
  AND: "$and",
  OR: "$or"
}, Se = {
  PATH: "$path",
  PATTERN: "$val"
}, we = (s) => !!(s[ce.AND] || s[ce.OR]), Ss = (s) => !!s[Se.PATH], ws = (s) => !w(s) && $t(s) && !we(s), Ze = (s) => ({
  [ce.AND]: Object.keys(s).map((e) => ({
    [e]: s[e]
  }))
});
function xt(s, e, { auto: t = !0 } = {}) {
  const i = (r) => {
    let n = Object.keys(r);
    const o = Ss(r);
    if (!o && n.length > 1 && !we(r))
      return i(Ze(r));
    if (ws(r)) {
      const c = o ? r[Se.PATH] : n[0], l = o ? r[Se.PATTERN] : r[c];
      if (!E(l))
        throw new Error(Xt(c));
      const u = {
        keyId: Ae(c),
        pattern: l
      };
      return t && (u.searcher = xe(l, e)), u;
    }
    let a = {
      children: [],
      operator: n[0]
    };
    return n.forEach((c) => {
      const l = r[c];
      w(l) && l.forEach((u) => {
        a.children.push(i(u));
      });
    }), a;
  };
  return we(s) || (s = Ze(s)), i(s);
}
function Ms(s, { ignoreFieldNorm: e = f.ignoreFieldNorm }) {
  s.forEach((t) => {
    let i = 1;
    t.matches.forEach(({ key: r, norm: n, score: o }) => {
      const a = r ? r.weight : null;
      i *= Math.pow(
        o === 0 && a ? Number.EPSILON : o,
        (a || 1) * (e ? 1 : n)
      );
    }), t.score = i;
  });
}
function Cs(s, e) {
  const t = s.matches;
  e.matches = [], y(t) && t.forEach((i) => {
    if (!y(i.indices) || !i.indices.length)
      return;
    const { indices: r, value: n } = i;
    let o = {
      indices: r,
      value: n
    };
    i.key && (o.key = i.key.src), i.idx > -1 && (o.refIndex = i.idx), e.matches.push(o);
  });
}
function ks(s, e) {
  e.score = s.score;
}
function Rs(s, e, {
  includeMatches: t = f.includeMatches,
  includeScore: i = f.includeScore
} = {}) {
  const r = [];
  return t && r.push(Cs), i && r.push(ks), s.map((n) => {
    const { idx: o } = n, a = {
      item: e[o],
      refIndex: o
    };
    return r.length && r.forEach((c) => {
      c(n, a);
    }), a;
  });
}
class V {
  constructor(e, t = {}, i) {
    this.options = { ...f, ...t }, this.options.useExtendedSearch, this._keyStore = new ts(this.options.keys), this.setCollection(e, i);
  }
  setCollection(e, t) {
    if (this._docs = e, t && !(t instanceof Ie))
      throw new Error(Jt);
    this._myIndex = t || yt(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(e) {
    !y(e) || (this._docs.push(e), this._myIndex.add(e));
  }
  remove(e = () => !1) {
    const t = [];
    for (let i = 0, r = this._docs.length; i < r; i += 1) {
      const n = this._docs[i];
      e(n, i) && (this.removeAt(i), i -= 1, r -= 1, t.push(n));
    }
    return t;
  }
  removeAt(e) {
    this._docs.splice(e, 1), this._myIndex.removeAt(e);
  }
  getIndex() {
    return this._myIndex;
  }
  search(e, { limit: t = -1 } = {}) {
    const {
      includeMatches: i,
      includeScore: r,
      shouldSort: n,
      sortFn: o,
      ignoreFieldNorm: a
    } = this.options;
    let c = E(e) ? E(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
    return Ms(c, { ignoreFieldNorm: a }), n && c.sort(o), _t(t) && t > -1 && (c = c.slice(0, t)), Rs(c, this._docs, {
      includeMatches: i,
      includeScore: r
    });
  }
  _searchStringList(e) {
    const t = xe(e, this.options), { records: i } = this._myIndex, r = [];
    return i.forEach(({ v: n, i: o, n: a }) => {
      if (!y(n))
        return;
      const { isMatch: c, score: l, indices: u } = t.searchIn(n);
      c && r.push({
        item: n,
        idx: o,
        matches: [{ score: l, value: n, norm: a, indices: u }]
      });
    }), r;
  }
  _searchLogical(e) {
    const t = xt(e, this.options), i = (a, c, l) => {
      if (!a.children) {
        const { keyId: d, searcher: h } = a, p = this._findMatches({
          key: this._keyStore.get(d),
          value: this._myIndex.getValueForItemAtKeyId(c, d),
          searcher: h
        });
        return p && p.length ? [
          {
            idx: l,
            item: c,
            matches: p
          }
        ] : [];
      }
      const u = [];
      for (let d = 0, h = a.children.length; d < h; d += 1) {
        const p = a.children[d], g = i(p, c, l);
        if (g.length)
          u.push(...g);
        else if (a.operator === ce.AND)
          return [];
      }
      return u;
    }, r = this._myIndex.records, n = {}, o = [];
    return r.forEach(({ $: a, i: c }) => {
      if (y(a)) {
        let l = i(t, a, c);
        l.length && (n[c] || (n[c] = { idx: c, item: a, matches: [] }, o.push(n[c])), l.forEach(({ matches: u }) => {
          n[c].matches.push(...u);
        }));
      }
    }), o;
  }
  _searchObjectList(e) {
    const t = xe(e, this.options), { keys: i, records: r } = this._myIndex, n = [];
    return r.forEach(({ $: o, i: a }) => {
      if (!y(o))
        return;
      let c = [];
      i.forEach((l, u) => {
        c.push(
          ...this._findMatches({
            key: l,
            value: o[u],
            searcher: t
          })
        );
      }), c.length && n.push({
        idx: a,
        item: o,
        matches: c
      });
    }), n;
  }
  _findMatches({ key: e, value: t, searcher: i }) {
    if (!y(t))
      return [];
    let r = [];
    if (w(t))
      t.forEach(({ v: n, i: o, n: a }) => {
        if (!y(n))
          return;
        const { isMatch: c, score: l, indices: u } = i.searchIn(n);
        c && r.push({
          score: l,
          key: e,
          value: n,
          idx: o,
          norm: a,
          indices: u
        });
      });
    else {
      const { v: n, n: o } = t, { isMatch: a, score: c, indices: l } = i.searchIn(n);
      a && r.push({ score: c, key: e, value: n, norm: o, indices: l });
    }
    return r;
  }
}
V.version = "6.6.2";
V.createIndex = yt;
V.parseIndex = as;
V.config = f;
V.parseQuery = xt;
xs(Es);
var Is = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, q = (s, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Os(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Is(e, t, r), r;
};
const Ts = "hb-recipes-search", Ps = (s) => ({
  action: 0,
  value: s
}), ve = (s) => ({
  action: 1,
  value: s
}), me = (s) => ({
  action: 2,
  value: s
});
let L = class extends F {
  constructor() {
    super(...arguments), this.recipes = [], this.query = "", this.resultsState = 0, this.resultsVisibility = 1;
  }
  static get styles() {
    return Kt;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("click", (s) => {
      this.resultsState !== 0 && (Array.from(s.composedPath()).some((e) => e instanceof L) || this.handleMsg(me(1)));
    }), window.addEventListener("keydown", (s) => {
      switch (s.key) {
        case "Escape": {
          !(s.ctrlKey || s.altKey || s.shiftKey) && this.handleMsg(me(1));
          break;
        }
      }
    });
  }
  onInputClick() {
    this.handleMsg(me(0));
  }
  handleMsg(s) {
    switch (s.action) {
      case 0: {
        if (this.query = s.value, !this.query) {
          this.handleMsg(ve(0));
          break;
        }
        if (!this.searchResults().length) {
          this.handleMsg(ve(2));
          break;
        }
        this.handleMsg(ve(1));
        break;
      }
      case 1: {
        this.resultsState = s.value;
        break;
      }
      case 2: {
        this.resultsVisibility = s.value;
        break;
      }
      default:
        const e = s.action;
        throw Error(`Unhandled case: ${e}`);
    }
  }
  searchResults() {
    if (!this.query.length)
      return [];
    const s = {
      minMatchCharLength: 1,
      ignoreLocation: !0,
      distance: 0,
      keys: [
        "fields.title",
        "fields.description"
      ]
    };
    return new V(this.recipes, s).search(this.query).map((i) => i.item).slice(0, 5);
  }
  renderRecipe(s) {
    const e = `/recipes/${s.pk}`;
    return j`
      <a
        tabindex="0"
        class="recipe-search-result-container"
        .href=${e}
      >
        <div class="recipe-search-result-content">
            <div class="recipe-result__title">
              <strong>${s.fields.title}</strong>
            </div>
            <div class="recipe-result__description">
              <p>
                <em>${s.fields.description}</em>
              </p>
            </div>
        </div>
      </a>
    `;
  }
  renderSearchResults() {
    const s = (e) => j`
      <div
        class="recipes-search__results ${Bt({
      "recipes-search__results--hidden": this.resultsVisibility === 1 || this.resultsState === 0
    })}"
        id="search_dropdown">
        ${e}
      </div>
    `;
    switch (this.resultsState) {
      case 2:
        return s(j`
            <div class="recipe-search-result-content">
              <p>
                <em>Found no recipes matching '${this.query}'.</em>
              </p>
            </div>
        `);
      case 0:
        return $;
      case 1:
        return s(j`
          ${Dt(
          this.searchResults(),
          (e) => e.fields.title,
          this.renderRecipe
        )}
        `);
    }
  }
  render() {
    return j`
      <div class="recipes-search">
          <input
            class="recipes-search__input material-symbols-outlined",
            type="submit",
            value=🔎︎>
          <input
            class="recipes-search__input"
            type="text"
            placeholder="Search all recipes"
            .value=${this.query}
            @click=${() => {
      this.onInputClick();
    }}
            @input=${(s) => {
      const e = s.target.value || "";
      this.handleMsg(Ps(e));
    }}
          />
          ${this.renderSearchResults()}
      </div>
    `;
  }
};
q([
  Z({ type: Array })
], L.prototype, "recipes", 2);
q([
  Z()
], L.prototype, "query", 2);
q([
  ut()
], L.prototype, "resultsState", 2);
q([
  ut()
], L.prototype, "resultsVisibility", 2);
L = q([
  dt(Ts)
], L);
