import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {styles} from './styles.css'; // (Q) Why not "./syles.css.ts"?
import Fuse from 'fuse.js'; // Fzf search library

export const RECIPES_SEARCH_TAG = 'hb-recipes-search';

type RecipeQueryObject = {
  fields: {
    title: string;
    description: string;
    created_at: Date;
    updated_at?; Date;
    prep_time: string;
    cook_time: string;
    servings: number;
  };
};

type RecipePart = {
  fields: Pick<RecipeQueryObject['fields'], 'title' | 'description'>;
};

@customElement(RECIPES_SEARCH_TAG)
export class RecipesSearch extends LitElement {
  // (Q) what does "static styles = css`...`;" do?
  @property({type: Array})
  recipes: RecipePart[] = [];

  @property()
  // Query is changed on user input, as set in the render function
  query = '';

  static get styles() {
    return styles;
  }

  searchResults(): RecipePart[] {
    if (!this.query.length) return [];
    console.log(this.recipes, typeof this.recipes);

    const fuseOptions = {
      minMatchCharLength: 1,
      ignoreLocation: true,
      distance: 0,
      keys: [
        "fields.title",
        "fields.description"
      ]
    };

    const fuse = new Fuse(this.recipes, fuseOptions)
    const fuseResults = fuse.search(this.query)

    return fuseResults
      .map(result => result.item)
      .slice(0, 5);
  }

  private renderRecipe(recipe: RecipePart) {
    return html`
      <div class="recipe-search-result">
        <h5>${recipe.fields.title}</h5>
        <p>${recipe.fields.description}</p>
      </div>
    `;
  }

  render() {
    return html`
      <div class="recipes-search">
        <input
          class="recipes-search__input"
          type="text"
          placeholder="Search"
          .value=${this.query}
          @input=${(e: Event) => {
            this.query = (e.target as HTMLInputElement).value || '';
          }}
        />
        <div class="recipes-search__results">
          ${repeat(
            this.searchResults(),
            element => element.fields.title,
            this.renderRecipe
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [RECIPES_SEARCH_TAG]: RecipesSearch
  }
}
