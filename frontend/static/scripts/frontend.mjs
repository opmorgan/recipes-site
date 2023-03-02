import { LitElement as c, css as h, html as a } from "lit";
import { property as i, customElement as u } from "lit/decorators.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, m = (n, t, o, r) => {
  for (var e = r > 1 ? void 0 : r ? f(t, o) : t, p = n.length - 1, l; p >= 0; p--)
    (l = n[p]) && (e = (r ? l(t, o, e) : l(e)) || e);
  return r && e && v(t, o, e), e;
};
const _ = "my-element";
let s = class extends c {
  constructor() {
    super(...arguments), this.version = "STARTING", this.example = "";
  }
  static get styles() {
    return h`
      .welcome {
        font-size: 36px;
      }
    `;
  }
  render() {
    return a`
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `;
  }
};
m([
  i()
], s.prototype, "version", 2);
m([
  i()
], s.prototype, "example", 2);
s = m([
  u(_)
], s);
console.log("Howdy");
