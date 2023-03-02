import {CSSResult} from 'lit';

declare module '*.css' {
  const css: CSSResult;
  export default css
}
