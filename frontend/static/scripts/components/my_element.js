var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export const MY_ELEMENT_TAG = 'my-element';
let MyElement = class MyElement extends LitElement {
    constructor() {
        super(...arguments);
        this.version = 'STARTING';
        this.example = '';
    }
    static get styles() {
        return css `
      .welcome {
        font-size: 36px;
      }
    `;
    }
    render() {
        return html `
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `;
    }
};
__decorate([
    property()
], MyElement.prototype, "version", void 0);
__decorate([
    property()
], MyElement.prototype, "example", void 0);
MyElement = __decorate([
    customElement(MY_ELEMENT_TAG)
], MyElement);
export { MyElement };
//# sourceMappingURL=my_element.js.map