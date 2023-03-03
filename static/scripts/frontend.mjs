const it = window, Mt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let qt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ct)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Mt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const we = (s) => new qt(typeof s == "string" ? s : s + "", void 0, Ct), te = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new qt(e, s, Ct);
}, Me = (s, t) => {
  Mt ? s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), r = it.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  });
}, Nt = Mt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return we(e);
})(s) : s;
var at;
const rt = window, Lt = rt.trustedTypes, Ce = Lt ? Lt.emptyScript : "", Ut = rt.reactiveElementPolyfillSupport, yt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ce : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, ee = (s, t) => t !== s && (t == t || s == s), dt = { attribute: !0, type: String, converter: yt, reflect: !1, hasChanged: ee };
let H = class extends HTMLElement {
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
    return this.elementProperties.forEach((e, i) => {
      const r = this._$Ep(i, e);
      r !== void 0 && (this._$Ev.set(r, i), t.push(r));
    }), t;
  }
  static createProperty(t, e = dt) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(r) {
      const n = this[t];
      this[e] = r, this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || dt;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const r of i)
        this.createProperty(r, e[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i)
        e.unshift(Nt(r));
    } else
      t !== void 0 && e.push(Nt(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
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
    return Me(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = dt) {
    var r;
    const n = this.constructor._$Ep(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? i.converter : yt).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const r = this.constructor, n = r._$Ev.get(t);
    if (n !== void 0 && this._$El !== n) {
      const o = r.getPropertyOptions(n), h = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : yt;
      this._$El = n, this[n] = h.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let r = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ee)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, n) => this[n] = r), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
        var n;
        return (n = r.hostUpdate) === null || n === void 0 ? void 0 : n.call(r);
      }), this.update(i)) : this._$Ek();
    } catch (r) {
      throw e = !1, this._$Ek(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) === null || r === void 0 ? void 0 : r.call(i);
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
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
H.finalized = !0, H.elementProperties = /* @__PURE__ */ new Map(), H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, Ut == null || Ut({ ReactiveElement: H }), ((at = rt.reactiveElementVersions) !== null && at !== void 0 ? at : rt.reactiveElementVersions = []).push("1.5.0");
var ut;
const nt = window, D = nt.trustedTypes, Ht = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, S = `lit$${(Math.random() + "").slice(9)}$`, kt = "?" + S, ke = `<${kt}>`, B = document, Q = (s = "") => B.createComment(s), Y = (s) => s === null || typeof s != "object" && typeof s != "function", se = Array.isArray, ie = (s) => se(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, zt = />/g, O = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Dt = /"/g, re = /^(?:script|style|textarea|title)$/i, Re = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), j = Re(1), k = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), z = B.createTreeWalker(B, 129, null, !1), ne = (s, t) => {
  const e = s.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : "", o = W;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let u, d, a = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, d = o.exec(l), d !== null); )
      p = o.lastIndex, o === W ? d[1] === "!--" ? o = jt : d[1] !== void 0 ? o = zt : d[2] !== void 0 ? (re.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = O) : d[3] !== void 0 && (o = O) : o === O ? d[0] === ">" ? (o = r ?? W, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, u = d[1], o = d[3] === void 0 ? O : d[3] === '"' ? Dt : Ft) : o === Dt || o === Ft ? o = O : o === jt || o === zt ? o = W : (o = O, r = void 0);
    const g = o === O && s[c + 1].startsWith("/>") ? " " : "";
    n += o === W ? l + ke : a >= 0 ? (i.push(u), l.slice(0, a) + "$lit$" + l.slice(a) + S + g) : l + S + (a === -2 ? (i.push(void 0), c) : g);
  }
  const h = n + (s[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Ht !== void 0 ? Ht.createHTML(h) : h, i];
};
class J {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, c = this.parts, [l, u] = ne(t, e);
    if (this.el = J.createElement(l, i), z.currentNode = this.el.content, e === 2) {
      const d = this.el.content, a = d.firstChild;
      a.remove(), d.append(...a.childNodes);
    }
    for (; (r = z.nextNode()) !== null && c.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const d = [];
          for (const a of r.getAttributeNames())
            if (a.endsWith("$lit$") || a.startsWith(S)) {
              const p = u[o++];
              if (d.push(a), p !== void 0) {
                const g = r.getAttribute(p.toLowerCase() + "$lit$").split(S), _ = /([.?@])?(.*)/.exec(p);
                c.push({ type: 1, index: n, name: _[2], strings: g, ctor: _[1] === "." ? ce : _[1] === "?" ? le : _[1] === "@" ? he : X });
              } else
                c.push({ type: 6, index: n });
            }
          for (const a of d)
            r.removeAttribute(a);
        }
        if (re.test(r.tagName)) {
          const d = r.textContent.split(S), a = d.length - 1;
          if (a > 0) {
            r.textContent = D ? D.emptyScript : "";
            for (let p = 0; p < a; p++)
              r.append(d[p], Q()), z.nextNode(), c.push({ type: 2, index: ++n });
            r.append(d[a], Q());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === kt)
          c.push({ type: 2, index: n });
        else {
          let d = -1;
          for (; (d = r.data.indexOf(S, d + 1)) !== -1; )
            c.push({ type: 7, index: n }), d += S.length - 1;
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = B.createElement("template");
    return i.innerHTML = t, i;
  }
}
function N(s, t, e = s, i) {
  var r, n, o, h;
  if (t === k)
    return t;
  let c = i !== void 0 ? (r = e._$Co) === null || r === void 0 ? void 0 : r[i] : e._$Cl;
  const l = Y(t) ? void 0 : t._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== l && ((n = c == null ? void 0 : c._$AO) === null || n === void 0 || n.call(c, !1), l === void 0 ? c = void 0 : (c = new l(s), c._$AT(s, e, i)), i !== void 0 ? ((o = (h = e)._$Co) !== null && o !== void 0 ? o : h._$Co = [])[i] = c : e._$Cl = c), c !== void 0 && (t = N(s, c._$AS(s, t.values), c, i)), t;
}
class oe {
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
    const { el: { content: i }, parts: r } = this._$AD, n = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : B).importNode(i, !0);
    z.currentNode = n;
    let o = z.nextNode(), h = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (h === l.index) {
        let u;
        l.type === 2 ? u = new K(o, o.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (u = new ae(o, this, t)), this.u.push(u), l = r[++c];
      }
      h !== (l == null ? void 0 : l.index) && (o = z.nextNode(), h++);
    }
    return n;
  }
  p(t) {
    let e = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class K {
  constructor(t, e, i, r) {
    var n;
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cm = (n = r == null ? void 0 : r.isConnected) === null || n === void 0 || n;
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
    t = N(this, t, e), Y(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== k && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== $ && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.T(B.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = J.createElement(r.h, this.options)), r);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === n)
      this._$AH.p(i);
    else {
      const o = new oe(n, this), h = o.v(this.options);
      o.p(i), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Bt.get(t.strings);
    return e === void 0 && Bt.set(t.strings, e = new J(t)), e;
  }
  k(t) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t)
      r === e.length ? e.push(i = new K(this.O(Q()), this.O(Q()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class X {
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      t = N(this, t, e, 0), o = !Y(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const h = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++)
        l = N(this, h[i + c], e, c), l === k && (l = this._$AH[c]), o || (o = !Y(l) || l !== this._$AH[c]), l === $ ? t = $ : t !== $ && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ce extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
const Ie = D ? D.emptyScript : "";
class le extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== $ ? this.element.setAttribute(this.name, Ie) : this.element.removeAttribute(this.name);
  }
}
class he extends X {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = N(this, t, e, 0)) !== null && i !== void 0 ? i : $) === k)
      return;
    const r = this._$AH, n = t === $ && r !== $ || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== $ && (r === $ || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ae {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const Oe = { P: "$lit$", A: S, M: kt, C: 1, L: ne, R: oe, D: ie, V: N, I: K, H: X, N: le, U: he, B: ce, F: ae }, Kt = nt.litHtmlPolyfillSupport;
Kt == null || Kt(J, K), ((ut = nt.litHtmlVersions) !== null && ut !== void 0 ? ut : nt.litHtmlVersions = []).push("2.5.0");
const Te = (s, t, e) => {
  var i, r;
  const n = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = n._$litPart$;
  if (o === void 0) {
    const h = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : null;
    n._$litPart$ = o = new K(t.insertBefore(Q(), h), h, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
var pt, ft;
let F = class extends H {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Te(e, this.renderRoot, this.renderOptions);
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
    return k;
  }
};
F.finalized = !0, F._$litElement$ = !0, (pt = globalThis.litElementHydrateSupport) === null || pt === void 0 || pt.call(globalThis, { LitElement: F });
const Vt = globalThis.litElementPolyfillSupport;
Vt == null || Vt({ LitElement: F });
((ft = globalThis.litElementVersions) !== null && ft !== void 0 ? ft : globalThis.litElementVersions = []).push("3.2.2");
const de = (s) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(s, t) : ((e, i) => {
  const { kind: r, elements: n } = i;
  return { kind: r, elements: n, finisher(o) {
    customElements.define(e, o);
  } };
})(s, t);
const Pe = (s, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, s);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, s);
} };
function Z(s) {
  return (t, e) => e !== void 0 ? ((i, r, n) => {
    r.constructor.createProperty(n, i);
  })(s, t, e) : Pe(s, t);
}
function ue(s) {
  return Z({ ...s, state: !0 });
}
var gt;
((gt = window.HTMLSlotElement) === null || gt === void 0 ? void 0 : gt.prototype.assignedElements) != null;
var Ne = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, Rt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Le(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && Ne(t, e, r), r;
};
const Ue = "my-element";
let ot = class extends F {
  constructor() {
    super(...arguments), this.version = "STARTING", this.example = "";
  }
  static get styles() {
    return te`
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
Rt([
  Z()
], ot.prototype, "version", 2);
Rt([
  Z()
], ot.prototype, "example", 2);
ot = Rt([
  de(Ue)
], ot);
const pe = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, fe = (s) => (...t) => ({ _$litDirective$: s, values: t });
class ge {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
const { I: He } = Oe, Wt = () => document.createComment(""), G = (s, t, e) => {
  var i;
  const r = s._$AA.parentNode, n = t === void 0 ? s._$AB : t._$AA;
  if (e === void 0) {
    const o = r.insertBefore(Wt(), n), h = r.insertBefore(Wt(), n);
    e = new He(o, h, s, s.options);
  } else {
    const o = e._$AB.nextSibling, h = e._$AM, c = h !== s;
    if (c) {
      let l;
      (i = e._$AQ) === null || i === void 0 || i.call(e, s), e._$AM = s, e._$AP !== void 0 && (l = s._$AU) !== h._$AU && e._$AP(l);
    }
    if (o !== n || c) {
      let l = e._$AA;
      for (; l !== o; ) {
        const u = l.nextSibling;
        r.insertBefore(l, n), l = u;
      }
    }
  }
  return e;
}, T = (s, t, e = s) => (s._$AI(t, e), s), je = {}, ze = (s, t = je) => s._$AH = t, Fe = (s) => s._$AH, _t = (s) => {
  var t;
  (t = s._$AP) === null || t === void 0 || t.call(s, !1, !0);
  let e = s._$AA;
  const i = s._$AB.nextSibling;
  for (; e !== i; ) {
    const r = e.nextSibling;
    e.remove(), e = r;
  }
};
const Gt = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = t; r <= e; r++)
    i.set(s[r], r);
  return i;
}, De = fe(class extends ge {
  constructor(s) {
    if (super(s), s.type !== pe.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  ht(s, t, e) {
    let i;
    e === void 0 ? e = t : t !== void 0 && (i = t);
    const r = [], n = [];
    let o = 0;
    for (const h of s)
      r[o] = i ? i(h, o) : o, n[o] = e(h, o), o++;
    return { values: n, keys: r };
  }
  render(s, t, e) {
    return this.ht(s, t, e).values;
  }
  update(s, [t, e, i]) {
    var r;
    const n = Fe(s), { values: o, keys: h } = this.ht(t, e, i);
    if (!Array.isArray(n))
      return this.ut = h, o;
    const c = (r = this.ut) !== null && r !== void 0 ? r : this.ut = [], l = [];
    let u, d, a = 0, p = n.length - 1, g = 0, _ = o.length - 1;
    for (; a <= p && g <= _; )
      if (n[a] === null)
        a++;
      else if (n[p] === null)
        p--;
      else if (c[a] === h[g])
        l[g] = T(n[a], o[g]), a++, g++;
      else if (c[p] === h[_])
        l[_] = T(n[p], o[_]), p--, _--;
      else if (c[a] === h[_])
        l[_] = T(n[a], o[_]), G(s, l[_ + 1], n[a]), a++, _--;
      else if (c[p] === h[g])
        l[g] = T(n[p], o[g]), G(s, n[a], n[p]), p--, g++;
      else if (u === void 0 && (u = Gt(h, g, _), d = Gt(c, a, p)), u.has(c[a]))
        if (u.has(c[p])) {
          const v = d.get(h[g]), m = v !== void 0 ? n[v] : null;
          if (m === null) {
            const x = G(s, n[a]);
            T(x, o[g]), l[g] = x;
          } else
            l[g] = T(m, o[g]), G(s, n[a], m), n[v] = null;
          g++;
        } else
          _t(n[p]), p--;
      else
        _t(n[a]), a++;
    for (; g <= _; ) {
      const v = G(s, l[_ + 1]);
      T(v, o[g]), l[g++] = v;
    }
    for (; a <= p; ) {
      const v = n[a++];
      v !== null && _t(v);
    }
    return this.ut = h, ze(s, l), k;
  }
});
const Be = fe(class extends ge {
  constructor(s) {
    var t;
    if (super(s), s.type !== pe.ATTRIBUTE || s.name !== "class" || ((t = s.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((t) => s[t]).join(" ") + " ";
  }
  update(s, [t]) {
    var e, i;
    if (this.nt === void 0) {
      this.nt = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.st = new Set(s.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t)
        t[n] && !(!((e = this.st) === null || e === void 0) && e.has(n)) && this.nt.add(n);
      return this.render(t);
    }
    const r = s.element.classList;
    this.nt.forEach((n) => {
      n in t || (r.remove(n), this.nt.delete(n));
    });
    for (const n in t) {
      const o = !!t[n];
      o === this.nt.has(n) || ((i = this.st) === null || i === void 0 ? void 0 : i.has(n)) || (o ? (r.add(n), this.nt.add(n)) : (r.remove(n), this.nt.delete(n)));
    }
    return k;
  }
}), Ke = te`
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
  return Array.isArray ? Array.isArray(s) : ve(s) === "[object Array]";
}
const Ve = 1 / 0;
function We(s) {
  if (typeof s == "string")
    return s;
  let t = s + "";
  return t == "0" && 1 / s == -Ve ? "-0" : t;
}
function Ge(s) {
  return s == null ? "" : We(s);
}
function E(s) {
  return typeof s == "string";
}
function _e(s) {
  return typeof s == "number";
}
function Qe(s) {
  return s === !0 || s === !1 || Ye(s) && ve(s) == "[object Boolean]";
}
function $e(s) {
  return typeof s == "object";
}
function Ye(s) {
  return $e(s) && s !== null;
}
function y(s) {
  return s != null;
}
function $t(s) {
  return !s.trim().length;
}
function ve(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Je = "Incorrect 'index' type", Xe = (s) => `Invalid value for key ${s}`, Ze = (s) => `Pattern length exceeds max of ${s}.`, qe = (s) => `Missing ${s} property in key`, ts = (s) => `Property 'weight' in key '${s}' must be a positive integer`, Qt = Object.prototype.hasOwnProperty;
class es {
  constructor(t) {
    this._keys = [], this._keyMap = {};
    let e = 0;
    t.forEach((i) => {
      let r = me(i);
      e += r.weight, this._keys.push(r), this._keyMap[r.id] = r, e += r.weight;
    }), this._keys.forEach((i) => {
      i.weight /= e;
    });
  }
  get(t) {
    return this._keyMap[t];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function me(s) {
  let t = null, e = null, i = null, r = 1, n = null;
  if (E(s) || w(s))
    i = s, t = Yt(s), e = At(s);
  else {
    if (!Qt.call(s, "name"))
      throw new Error(qe("name"));
    const o = s.name;
    if (i = o, Qt.call(s, "weight") && (r = s.weight, r <= 0))
      throw new Error(ts(o));
    t = Yt(o), e = At(o), n = s.getFn;
  }
  return { path: t, id: e, weight: r, src: i, getFn: n };
}
function Yt(s) {
  return w(s) ? s : s.split(".");
}
function At(s) {
  return w(s) ? s.join(".") : s;
}
function ss(s, t) {
  let e = [], i = !1;
  const r = (n, o, h) => {
    if (!!y(n))
      if (!o[h])
        e.push(n);
      else {
        let c = o[h];
        const l = n[c];
        if (!y(l))
          return;
        if (h === o.length - 1 && (E(l) || _e(l) || Qe(l)))
          e.push(Ge(l));
        else if (w(l)) {
          i = !0;
          for (let u = 0, d = l.length; u < d; u += 1)
            r(l[u], o, h + 1);
        } else
          o.length && r(l, o, h + 1);
      }
  };
  return r(s, E(t) ? t.split(".") : t, 0), i ? e : e[0];
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
  sortFn: (s, t) => s.score === t.score ? s.idx < t.idx ? -1 : 1 : s.score < t.score ? -1 : 1
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
function ls(s = 1, t = 3) {
  const e = /* @__PURE__ */ new Map(), i = Math.pow(10, t);
  return {
    get(r) {
      const n = r.match(cs).length;
      if (e.has(n))
        return e.get(n);
      const o = 1 / Math.pow(n, 0.5 * s), h = parseFloat(Math.round(o * i) / i);
      return e.set(n, h), h;
    },
    clear() {
      e.clear();
    }
  };
}
class It {
  constructor({
    getFn: t = f.getFn,
    fieldNormWeight: e = f.fieldNormWeight
  } = {}) {
    this.norm = ls(e, 3), this.getFn = t, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(t = []) {
    this.docs = t;
  }
  setIndexRecords(t = []) {
    this.records = t;
  }
  setKeys(t = []) {
    this.keys = t, this._keysMap = {}, t.forEach((e, i) => {
      this._keysMap[e.id] = i;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, E(this.docs[0]) ? this.docs.forEach((t, e) => {
      this._addString(t, e);
    }) : this.docs.forEach((t, e) => {
      this._addObject(t, e);
    }), this.norm.clear());
  }
  add(t) {
    const e = this.size();
    E(t) ? this._addString(t, e) : this._addObject(t, e);
  }
  removeAt(t) {
    this.records.splice(t, 1);
    for (let e = t, i = this.size(); e < i; e += 1)
      this.records[e].i -= 1;
  }
  getValueForItemAtKeyId(t, e) {
    return t[this._keysMap[e]];
  }
  size() {
    return this.records.length;
  }
  _addString(t, e) {
    if (!y(t) || $t(t))
      return;
    let i = {
      v: t,
      i: e,
      n: this.norm.get(t)
    };
    this.records.push(i);
  }
  _addObject(t, e) {
    let i = { i: e, $: {} };
    this.keys.forEach((r, n) => {
      let o = r.getFn ? r.getFn(t) : this.getFn(t, r.path);
      if (!!y(o)) {
        if (w(o)) {
          let h = [];
          const c = [{ nestedArrIndex: -1, value: o }];
          for (; c.length; ) {
            const { nestedArrIndex: l, value: u } = c.pop();
            if (!!y(u))
              if (E(u) && !$t(u)) {
                let d = {
                  v: u,
                  i: l,
                  n: this.norm.get(u)
                };
                h.push(d);
              } else
                w(u) && u.forEach((d, a) => {
                  c.push({
                    nestedArrIndex: a,
                    value: d
                  });
                });
          }
          i.$[n] = h;
        } else if (E(o) && !$t(o)) {
          let h = {
            v: o,
            n: this.norm.get(o)
          };
          i.$[n] = h;
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
function ye(s, t, { getFn: e = f.getFn, fieldNormWeight: i = f.fieldNormWeight } = {}) {
  const r = new It({ getFn: e, fieldNormWeight: i });
  return r.setKeys(s.map(me)), r.setSources(t), r.create(), r;
}
function hs(s, { getFn: t = f.getFn, fieldNormWeight: e = f.fieldNormWeight } = {}) {
  const { keys: i, records: r } = s, n = new It({ getFn: t, fieldNormWeight: e });
  return n.setKeys(i), n.setIndexRecords(r), n;
}
function st(s, {
  errors: t = 0,
  currentLocation: e = 0,
  expectedLocation: i = 0,
  distance: r = f.distance,
  ignoreLocation: n = f.ignoreLocation
} = {}) {
  const o = t / s.length;
  if (n)
    return o;
  const h = Math.abs(i - e);
  return r ? o + h / r : h ? 1 : o;
}
function as(s = [], t = f.minMatchCharLength) {
  let e = [], i = -1, r = -1, n = 0;
  for (let o = s.length; n < o; n += 1) {
    let h = s[n];
    h && i === -1 ? i = n : !h && i !== -1 && (r = n - 1, r - i + 1 >= t && e.push([i, r]), i = -1);
  }
  return s[n - 1] && n - i >= t && e.push([i, n - 1]), e;
}
const P = 32;
function ds(s, t, e, {
  location: i = f.location,
  distance: r = f.distance,
  threshold: n = f.threshold,
  findAllMatches: o = f.findAllMatches,
  minMatchCharLength: h = f.minMatchCharLength,
  includeMatches: c = f.includeMatches,
  ignoreLocation: l = f.ignoreLocation
} = {}) {
  if (t.length > P)
    throw new Error(Ze(P));
  const u = t.length, d = s.length, a = Math.max(0, Math.min(i, d));
  let p = n, g = a;
  const _ = h > 1 || c, v = _ ? Array(d) : [];
  let m;
  for (; (m = s.indexOf(t, g)) > -1; ) {
    let A = st(t, {
      currentLocation: m,
      expectedLocation: a,
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
  let x = [], I = 1, tt = u + d;
  const Se = 1 << u - 1;
  for (let A = 0; A < u; A += 1) {
    let M = 0, C = tt;
    for (; M < C; )
      st(t, {
        errors: A,
        currentLocation: a + C,
        expectedLocation: a,
        distance: r,
        ignoreLocation: l
      }) <= p ? M = C : tt = C, C = Math.floor((tt - M) / 2 + M);
    tt = C;
    let Ot = Math.max(1, a - C + 1), ht = o ? d : Math.min(a + C, d) + u, U = Array(ht + 2);
    U[ht + 1] = (1 << A) - 1;
    for (let b = ht; b >= Ot; b -= 1) {
      let et = b - 1, Tt = e[s.charAt(et)];
      if (_ && (v[et] = +!!Tt), U[b] = (U[b + 1] << 1 | 1) & Tt, A && (U[b] |= (x[b + 1] | x[b]) << 1 | 1 | x[b + 1]), U[b] & Se && (I = st(t, {
        errors: A,
        currentLocation: et,
        expectedLocation: a,
        distance: r,
        ignoreLocation: l
      }), I <= p)) {
        if (p = I, g = et, g <= a)
          break;
        Ot = Math.max(1, 2 * a - g);
      }
    }
    if (st(t, {
      errors: A + 1,
      currentLocation: a,
      expectedLocation: a,
      distance: r,
      ignoreLocation: l
    }) > p)
      break;
    x = U;
  }
  const lt = {
    isMatch: g >= 0,
    score: Math.max(1e-3, I)
  };
  if (_) {
    const A = as(v, h);
    A.length ? c && (lt.indices = A) : lt.isMatch = !1;
  }
  return lt;
}
function us(s) {
  let t = {};
  for (let e = 0, i = s.length; e < i; e += 1) {
    const r = s.charAt(e);
    t[r] = (t[r] || 0) | 1 << i - e - 1;
  }
  return t;
}
class Ae {
  constructor(t, {
    location: e = f.location,
    threshold: i = f.threshold,
    distance: r = f.distance,
    includeMatches: n = f.includeMatches,
    findAllMatches: o = f.findAllMatches,
    minMatchCharLength: h = f.minMatchCharLength,
    isCaseSensitive: c = f.isCaseSensitive,
    ignoreLocation: l = f.ignoreLocation
  } = {}) {
    if (this.options = {
      location: e,
      threshold: i,
      distance: r,
      includeMatches: n,
      findAllMatches: o,
      minMatchCharLength: h,
      isCaseSensitive: c,
      ignoreLocation: l
    }, this.pattern = c ? t : t.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const u = (a, p) => {
      this.chunks.push({
        pattern: a,
        alphabet: us(a),
        startIndex: p
      });
    }, d = this.pattern.length;
    if (d > P) {
      let a = 0;
      const p = d % P, g = d - p;
      for (; a < g; )
        u(this.pattern.substr(a, P), a), a += P;
      if (p) {
        const _ = d - P;
        u(this.pattern.substr(_), _);
      }
    } else
      u(this.pattern, 0);
  }
  searchIn(t) {
    const { isCaseSensitive: e, includeMatches: i } = this.options;
    if (e || (t = t.toLowerCase()), this.pattern === t) {
      let g = {
        isMatch: !0,
        score: 0
      };
      return i && (g.indices = [[0, t.length - 1]]), g;
    }
    const {
      location: r,
      distance: n,
      threshold: o,
      findAllMatches: h,
      minMatchCharLength: c,
      ignoreLocation: l
    } = this.options;
    let u = [], d = 0, a = !1;
    this.chunks.forEach(({ pattern: g, alphabet: _, startIndex: v }) => {
      const { isMatch: m, score: x, indices: I } = ds(t, g, _, {
        location: r + v,
        distance: n,
        threshold: o,
        findAllMatches: h,
        minMatchCharLength: c,
        includeMatches: i,
        ignoreLocation: l
      });
      m && (a = !0), d += x, m && I && (u = [...u, ...I]);
    });
    let p = {
      isMatch: a,
      score: a ? d / this.chunks.length : 1
    };
    return a && i && (p.indices = u), p;
  }
}
class R {
  constructor(t) {
    this.pattern = t;
  }
  static isMultiMatch(t) {
    return Jt(t, this.multiRegex);
  }
  static isSingleMatch(t) {
    return Jt(t, this.singleRegex);
  }
  search() {
  }
}
function Jt(s, t) {
  const e = s.match(t);
  return e ? e[1] : null;
}
class ps extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const e = t === this.pattern;
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class fs extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const i = t.indexOf(this.pattern) === -1;
    return {
      isMatch: i,
      score: i ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class gs extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const e = t.startsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class _s extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const e = !t.startsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class $s extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const e = t.endsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [t.length - this.pattern.length, t.length - 1]
    };
  }
}
class vs extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    const e = !t.endsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class be extends R {
  constructor(t, {
    location: e = f.location,
    threshold: i = f.threshold,
    distance: r = f.distance,
    includeMatches: n = f.includeMatches,
    findAllMatches: o = f.findAllMatches,
    minMatchCharLength: h = f.minMatchCharLength,
    isCaseSensitive: c = f.isCaseSensitive,
    ignoreLocation: l = f.ignoreLocation
  } = {}) {
    super(t), this._bitapSearch = new Ae(t, {
      location: e,
      threshold: i,
      distance: r,
      includeMatches: n,
      findAllMatches: o,
      minMatchCharLength: h,
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
  search(t) {
    return this._bitapSearch.searchIn(t);
  }
}
class Ee extends R {
  constructor(t) {
    super(t);
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
  search(t) {
    let e = 0, i;
    const r = [], n = this.pattern.length;
    for (; (i = t.indexOf(this.pattern, e)) > -1; )
      e = i + n, r.push([i, e - 1]);
    const o = !!r.length;
    return {
      isMatch: o,
      score: o ? 0 : 1,
      indices: r
    };
  }
}
const bt = [
  ps,
  Ee,
  gs,
  _s,
  vs,
  $s,
  fs,
  be
], Xt = bt.length, ms = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, ys = "|";
function As(s, t = {}) {
  return s.split(ys).map((e) => {
    let i = e.trim().split(ms).filter((n) => n && !!n.trim()), r = [];
    for (let n = 0, o = i.length; n < o; n += 1) {
      const h = i[n];
      let c = !1, l = -1;
      for (; !c && ++l < Xt; ) {
        const u = bt[l];
        let d = u.isMultiMatch(h);
        d && (r.push(new u(d, t)), c = !0);
      }
      if (!c)
        for (l = -1; ++l < Xt; ) {
          const u = bt[l];
          let d = u.isSingleMatch(h);
          if (d) {
            r.push(new u(d, t));
            break;
          }
        }
    }
    return r;
  });
}
const bs = /* @__PURE__ */ new Set([be.type, Ee.type]);
class Es {
  constructor(t, {
    isCaseSensitive: e = f.isCaseSensitive,
    includeMatches: i = f.includeMatches,
    minMatchCharLength: r = f.minMatchCharLength,
    ignoreLocation: n = f.ignoreLocation,
    findAllMatches: o = f.findAllMatches,
    location: h = f.location,
    threshold: c = f.threshold,
    distance: l = f.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: e,
      includeMatches: i,
      minMatchCharLength: r,
      findAllMatches: o,
      ignoreLocation: n,
      location: h,
      threshold: c,
      distance: l
    }, this.pattern = e ? t : t.toLowerCase(), this.query = As(this.pattern, this.options);
  }
  static condition(t, e) {
    return e.useExtendedSearch;
  }
  searchIn(t) {
    const e = this.query;
    if (!e)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: i, isCaseSensitive: r } = this.options;
    t = r ? t : t.toLowerCase();
    let n = 0, o = [], h = 0;
    for (let c = 0, l = e.length; c < l; c += 1) {
      const u = e[c];
      o.length = 0, n = 0;
      for (let d = 0, a = u.length; d < a; d += 1) {
        const p = u[d], { isMatch: g, indices: _, score: v } = p.search(t);
        if (g) {
          if (n += 1, h += v, i) {
            const m = p.constructor.type;
            bs.has(m) ? o = [...o, ..._] : o.push(_);
          }
        } else {
          h = 0, n = 0, o.length = 0;
          break;
        }
      }
      if (n) {
        let d = {
          isMatch: !0,
          score: h / n
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
const Et = [];
function xs(...s) {
  Et.push(...s);
}
function xt(s, t) {
  for (let e = 0, i = Et.length; e < i; e += 1) {
    let r = Et[e];
    if (r.condition(s, t))
      return new r(s, t);
  }
  return new Ae(s, t);
}
const ct = {
  AND: "$and",
  OR: "$or"
}, St = {
  PATH: "$path",
  PATTERN: "$val"
}, wt = (s) => !!(s[ct.AND] || s[ct.OR]), Ss = (s) => !!s[St.PATH], ws = (s) => !w(s) && $e(s) && !wt(s), Zt = (s) => ({
  [ct.AND]: Object.keys(s).map((t) => ({
    [t]: s[t]
  }))
});
function xe(s, t, { auto: e = !0 } = {}) {
  const i = (r) => {
    let n = Object.keys(r);
    const o = Ss(r);
    if (!o && n.length > 1 && !wt(r))
      return i(Zt(r));
    if (ws(r)) {
      const c = o ? r[St.PATH] : n[0], l = o ? r[St.PATTERN] : r[c];
      if (!E(l))
        throw new Error(Xe(c));
      const u = {
        keyId: At(c),
        pattern: l
      };
      return e && (u.searcher = xt(l, t)), u;
    }
    let h = {
      children: [],
      operator: n[0]
    };
    return n.forEach((c) => {
      const l = r[c];
      w(l) && l.forEach((u) => {
        h.children.push(i(u));
      });
    }), h;
  };
  return wt(s) || (s = Zt(s)), i(s);
}
function Ms(s, { ignoreFieldNorm: t = f.ignoreFieldNorm }) {
  s.forEach((e) => {
    let i = 1;
    e.matches.forEach(({ key: r, norm: n, score: o }) => {
      const h = r ? r.weight : null;
      i *= Math.pow(
        o === 0 && h ? Number.EPSILON : o,
        (h || 1) * (t ? 1 : n)
      );
    }), e.score = i;
  });
}
function Cs(s, t) {
  const e = s.matches;
  t.matches = [], y(e) && e.forEach((i) => {
    if (!y(i.indices) || !i.indices.length)
      return;
    const { indices: r, value: n } = i;
    let o = {
      indices: r,
      value: n
    };
    i.key && (o.key = i.key.src), i.idx > -1 && (o.refIndex = i.idx), t.matches.push(o);
  });
}
function ks(s, t) {
  t.score = s.score;
}
function Rs(s, t, {
  includeMatches: e = f.includeMatches,
  includeScore: i = f.includeScore
} = {}) {
  const r = [];
  return e && r.push(Cs), i && r.push(ks), s.map((n) => {
    const { idx: o } = n, h = {
      item: t[o],
      refIndex: o
    };
    return r.length && r.forEach((c) => {
      c(n, h);
    }), h;
  });
}
class V {
  constructor(t, e = {}, i) {
    this.options = { ...f, ...e }, this.options.useExtendedSearch, this._keyStore = new es(this.options.keys), this.setCollection(t, i);
  }
  setCollection(t, e) {
    if (this._docs = t, e && !(e instanceof It))
      throw new Error(Je);
    this._myIndex = e || ye(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(t) {
    !y(t) || (this._docs.push(t), this._myIndex.add(t));
  }
  remove(t = () => !1) {
    const e = [];
    for (let i = 0, r = this._docs.length; i < r; i += 1) {
      const n = this._docs[i];
      t(n, i) && (this.removeAt(i), i -= 1, r -= 1, e.push(n));
    }
    return e;
  }
  removeAt(t) {
    this._docs.splice(t, 1), this._myIndex.removeAt(t);
  }
  getIndex() {
    return this._myIndex;
  }
  search(t, { limit: e = -1 } = {}) {
    const {
      includeMatches: i,
      includeScore: r,
      shouldSort: n,
      sortFn: o,
      ignoreFieldNorm: h
    } = this.options;
    let c = E(t) ? E(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t) : this._searchLogical(t);
    return Ms(c, { ignoreFieldNorm: h }), n && c.sort(o), _e(e) && e > -1 && (c = c.slice(0, e)), Rs(c, this._docs, {
      includeMatches: i,
      includeScore: r
    });
  }
  _searchStringList(t) {
    const e = xt(t, this.options), { records: i } = this._myIndex, r = [];
    return i.forEach(({ v: n, i: o, n: h }) => {
      if (!y(n))
        return;
      const { isMatch: c, score: l, indices: u } = e.searchIn(n);
      c && r.push({
        item: n,
        idx: o,
        matches: [{ score: l, value: n, norm: h, indices: u }]
      });
    }), r;
  }
  _searchLogical(t) {
    const e = xe(t, this.options), i = (h, c, l) => {
      if (!h.children) {
        const { keyId: d, searcher: a } = h, p = this._findMatches({
          key: this._keyStore.get(d),
          value: this._myIndex.getValueForItemAtKeyId(c, d),
          searcher: a
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
      for (let d = 0, a = h.children.length; d < a; d += 1) {
        const p = h.children[d], g = i(p, c, l);
        if (g.length)
          u.push(...g);
        else if (h.operator === ct.AND)
          return [];
      }
      return u;
    }, r = this._myIndex.records, n = {}, o = [];
    return r.forEach(({ $: h, i: c }) => {
      if (y(h)) {
        let l = i(e, h, c);
        l.length && (n[c] || (n[c] = { idx: c, item: h, matches: [] }, o.push(n[c])), l.forEach(({ matches: u }) => {
          n[c].matches.push(...u);
        }));
      }
    }), o;
  }
  _searchObjectList(t) {
    const e = xt(t, this.options), { keys: i, records: r } = this._myIndex, n = [];
    return r.forEach(({ $: o, i: h }) => {
      if (!y(o))
        return;
      let c = [];
      i.forEach((l, u) => {
        c.push(
          ...this._findMatches({
            key: l,
            value: o[u],
            searcher: e
          })
        );
      }), c.length && n.push({
        idx: h,
        item: o,
        matches: c
      });
    }), n;
  }
  _findMatches({ key: t, value: e, searcher: i }) {
    if (!y(e))
      return [];
    let r = [];
    if (w(e))
      e.forEach(({ v: n, i: o, n: h }) => {
        if (!y(n))
          return;
        const { isMatch: c, score: l, indices: u } = i.searchIn(n);
        c && r.push({
          score: l,
          key: t,
          value: n,
          idx: o,
          norm: h,
          indices: u
        });
      });
    else {
      const { v: n, n: o } = e, { isMatch: h, score: c, indices: l } = i.searchIn(n);
      h && r.push({ score: c, key: t, value: n, norm: o, indices: l });
    }
    return r;
  }
}
V.version = "6.6.2";
V.createIndex = ye;
V.parseIndex = hs;
V.config = f;
V.parseQuery = xe;
xs(Es);
var Is = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, q = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Os(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && Is(t, e, r), r;
};
const Ts = "hb-recipes-search", Ps = (s) => ({
  action: 0,
  value: s
}), vt = (s) => ({
  action: 1,
  value: s
}), mt = (s) => ({
  action: 2,
  value: s
});
let L = class extends F {
  constructor() {
    super(...arguments), this.recipes = [], this.query = "", this.resultsState = 0, this.resultsVisibility = 1;
  }
  static get styles() {
    return Ke;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("click", (s) => {
      this.resultsState !== 0 && (Array.from(s.composedPath()).some((t) => t instanceof L) || this.handleMsg(mt(1)));
    }), window.addEventListener("keydown", (s) => {
      switch (s.key) {
        case "Escape": {
          !(s.ctrlKey || s.altKey || s.shiftKey) && this.handleMsg(mt(1));
          break;
        }
      }
    });
  }
  onInputClick() {
    this.handleMsg(mt(0));
  }
  handleMsg(s) {
    switch (s.action) {
      case 0: {
        if (this.query = s.value, !this.query) {
          this.handleMsg(vt(0));
          break;
        }
        if (!this.searchResults().length) {
          this.handleMsg(vt(2));
          break;
        }
        this.handleMsg(vt(1));
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
        const t = s.action;
        throw Error(`Unhandled case: ${t}`);
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
    const t = `/recipes/${s.pk}`;
    return j`
      <a
        tabindex="0"
        class="recipe-search-result-container"
        .href=${t}
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
    const s = (t) => j`
      <div
        class="recipes-search__results ${Be({
      "recipes-search__results--hidden": this.resultsVisibility === 1 || this.resultsState === 0
    })}"
        id="search_dropdown">
        ${t}
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
          ${De(
          this.searchResults(),
          (t) => t.fields.title,
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
      const t = s.target.value || "";
      this.handleMsg(Ps(t));
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
  ue()
], L.prototype, "resultsState", 2);
q([
  ue()
], L.prototype, "resultsVisibility", 2);
L = q([
  de(Ts)
], L);
