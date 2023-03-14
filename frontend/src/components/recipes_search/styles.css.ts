import {css} from 'lit';

/** Styles for recipes search. */
export const styles = css`
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
  -webkit-appearance: none;
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
