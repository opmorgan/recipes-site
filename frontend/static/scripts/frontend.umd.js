(function(e,t){typeof exports=="object"&&typeof module<"u"?t(require("lit"),require("lit/decorators.js")):typeof define=="function"&&define.amd?define(["lit","lit/decorators.js"],t):(e=typeof globalThis<"u"?globalThis:e||self,t(e.lit,e.decorators_js))})(this,function(e,t){"use strict";var f=Object.defineProperty,m=Object.getOwnPropertyDescriptor,n=(u,r,p,i)=>{for(var s=i>1?void 0:i?m(r,p):r,l=u.length-1,c;l>=0;l--)(c=u[l])&&(s=(i?c(r,p,s):c(s))||s);return i&&s&&f(r,p,s),s};const h="my-element";let o=class extends e.LitElement{constructor(){super(...arguments),this.version="STARTING",this.example=""}static get styles(){return e.css`
      .welcome {
        font-size: 36px;
      }
    `}render(){return e.html`
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `}};n([t.property()],o.prototype,"version",2),n([t.property()],o.prototype,"example",2),o=n([t.customElement(h)],o),console.log("Howdy")});
