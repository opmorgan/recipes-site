import {LitElement, html, css, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
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
    author: string;
  };
};

type RecipePart = {
  fields: Pick<RecipeQueryObject['fields'], 'title' | 'description'>;
};

enum RecipeSearchResultsState {
  NO_QUERY,
  HAS_RESULTS,
  NO_RESULTS,
}

enum Action {
  UPDATE_QUERY,
  UPDATE_RESULTS_STATE,
}

type MsgVariant<V> = {
  action: Action;
  value: V;
};

type Msg =
  | MsgVariant<string>
  | MsgVariant<RecipeSearchResultsState>;

const UpdateQuery = (value: string): MsgVariant<string> => ({
  action: Action.UPDATE_QUERY,
  value,
});

const UpdateResultsState =
  (value: RecipeSearchResultsState): MsgVariant<RecipeSearchResultsState> => ({
    action: Action.UPDATE_RESULTS_STATE,
    value,
  });


@customElement(RECIPES_SEARCH_TAG)
export class RecipesSearch extends LitElement {
  // (Q) what does "static styles = css`...`;" (from lit tutorial) do?
  @property({type: Array})
  readonly recipes: RecipePart[] = [];

  @property()
  // Query is changed on user input, as set in the render function
  query = '';

  @state()
  private resultsState: RecipeSearchResultsState = RecipeSearchResultsState.NO_QUERY;


  static get styles() {
    return styles;
  }

  // connectedCallback() {
  //   window.addEventListner('click', (event: Event) => {
  //     if (this.resultsState === RecipeSearchResultsState.NO_QUERY) return;
  //     // Check to see if a user clicked the box or not.
  //     // if (no) this.handleMsg(UpdateResultsState.HIDDEN);
  //   });
  // }

  private handleMsg(msg: Msg) {
    switch (msg.action) {
      case Action.UPDATE_QUERY: {
        this.query = msg.value;

        if (!this.query) {
          this.handleMsg(UpdateResultsState(RecipeSearchResultsState.NO_QUERY));
          break;
        }

        if (!this.searchResults().length) {
          this.handleMsg(UpdateResultsState(RecipeSearchResultsState.NO_RESULTS));
          break;
        }

        this.handleMsg(UpdateResultsState(RecipeSearchResultsState.HAS_RESULTS));
        break;
      }

      case Action.UPDATE_RESULTS_STATE: {
        this.resultsState = msg.value;
        break;
      }

      default:
        const exhaustive: never = msg.action;
        throw Error(`Unhandled case: ${exhaustive}`);
    }
  }

  searchResults(): RecipePart[] {
    if (!this.query.length) return [];

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

  private renderSearchResults() {
   const resultsWrapper = (markup: TemplateResult) => html`
      <div class="recipes-search__results">
        ${markup}
      </div>
    `;

    switch (this.resultsState) {
      case RecipeSearchResultsState.NO_RESULTS:
        return resultsWrapper(html`
            <strong>There are no recipes matching '${this.query}'.</strong>
        `);
      case RecipeSearchResultsState.NO_QUERY:
        return nothing;
      case RecipeSearchResultsState.HAS_RESULTS:
        return resultsWrapper(html`
          ${repeat(
            this.searchResults(),
            element => element.fields.title,
            this.renderRecipe
          )}
        `);
    }
  }

  render() {
    return html`
      <div class="recipes-search">
        <input
          class="recipes-search__input"
          type="text"
          placeholder="Search all recipes"
          .value=${this.query}
          @input=${(e: Event) => {
            const query = (e.target as HTMLInputElement).value || '';
            this.handleMsg(UpdateQuery(query));
          }}
        />
        ${this.renderSearchResults()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [RECIPES_SEARCH_TAG]: RecipesSearch
  }
}
