import {css} from 'lit';

/** Styles for recipes search. */
export const styles = css`
  :host {
    width: 100%;
    display: block;
    display: flex;
    align-items: center;
  }

  .recipes-search {
    // border: 2px solid green;
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 0 100%;
  }

  .recipes-search__input {
    margin-top: 1rem;
    border: 2px solid red;
    border-radius; 6px;
    outline: 0;
    background: transparent;
    font-size: 16px;
    padding: 8px 12px;
    box-sizing: border-box;
  }

  .recipes-search__results {
    border: 2px solid black;
    // position: absolute;
    top: 40px;
    width: 100%;
    background: transparent;
    padding: 8px 12px;
    // box-sizing: border-box;
  }
`;
