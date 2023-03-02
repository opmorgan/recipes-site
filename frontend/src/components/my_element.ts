import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';


export const MY_ELEMENT_TAG = 'my-element';

@customElement(MY_ELEMENT_TAG)
export class MyElement extends LitElement {
  @property()
  version = 'STARTING';

  @property()
  example = '';

  static get styles() {
    return css`
      .welcome {
        font-size: 36px;
      }
    `;
  }

  render() {
    return html`
    <p class="welcome">Welcome to the Lit tutorial!!!</p>
    <p>This is the ${this.version} code.</p>
    <h1>
    ${this.example}
    </h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [MY_ELEMENT_TAG]: MyElement
  }
}
