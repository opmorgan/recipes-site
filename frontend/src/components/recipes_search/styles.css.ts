import {css} from 'lit';

/** Styles for recipes search. */
export const styles = css`
:host {
  display: flex;
  align-items: center;
}

:root {
  /* [Q] Why are new variables defined here not used? */
  --background: #FFFFeb;
  --trans-black: #000000;
  --foreground: #111111;
  --dark-gray: #111111;
  --light-gray: #404040;
  --lighter-gray: #646464;
  --dark-red: #660000;
  --light-red: #b30000;
  --site-name: "honeybit.cooking"
}


.recipes-search {
  /* border: 2px solid green; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
}

.recipes-search__input {
  /* [Q] Where is the color of the placeholder text set? */
  /* Margin above search box: */
  /* margin-top: 1rem; */
  border: 2px solid #404040;
  border-radius; 6px;
  outline: 0;
  background: transparent;
  font-size: 16px;
  /* why does "--light-gray" look lighter here than on the border? */
  color: var(--light-gray);
  /* Padding around input text: */
  padding-top: .5rem;
  padding-bottom: .5rem;
  padding-left: 1rem;
  box-sizing: border-box;
  z-index: 2;
}


/* [Q] How to format both hover and focus? */
.recipes-search__input:focus {
  border: 2px solid var(--light-red);
  box-shadow: 0 0 2px var(--light-red);
}

.recipes-search__input:hover {
  /* border: 2px solid black; */
  /* box-shadow: 0 0 2px black; */
}

.recipes-search__results {
  border: 1px solid #404040;
  position: absolute;
  top: 3rem;
  margin: -6px;
  width: 50%;
  /* [Q] Is this the best way to set a minimum width? How to prevent x overflow? */
  min-width: 300px;
  background-color: rgb(255, 255, 235, .85);
  box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.2);
  z-index: 1;
  /* padding-top: 1rem; */
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  max-height: 500px;
}


a {
  text-decoration: none;
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

.recipe-search-result-content {
  /* display: inline-block; */
  font-size: .9rem;
  color: black;
  padding-left: 1rem;
  padding-right: 1rem;
  /* border: 2px solid green; */
}

`;
