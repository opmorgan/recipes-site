import { LitElement } from 'lit';
export declare const MY_ELEMENT_TAG = "my-element";
export declare class MyElement extends LitElement {
    version: string;
    example: string;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        [MY_ELEMENT_TAG]: MyElement;
    }
}
