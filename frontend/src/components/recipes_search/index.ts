import {LitElement, html, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {classMap} from 'lit/directives/class-map.js';
import {styles} from './styles.css'; // (Q) Why not "./syles.css.ts"?
import Fuse from 'fuse.js'; // Fzf search library

export const RECIPES_SEARCH_TAG = 'hb-recipes-search';


// Parse data from server
type RecipeQueryObject = {
  pk: number;
  fields: {
    title: string;
    description: string;
    created_at: Date;
    updated_at?: Date;
    prep_time: string;
    cook_time: string;
    servings: number;
    author: string;
    url: string;
  };
};

type RecipePart = {
  pk: RecipeQueryObject['pk'];
  fields: Pick<RecipeQueryObject['fields'], 'title' | 'description'>;
};

// MODEL
// (Q) What does this enum correspond to in the Elm architecture?
// Model possible states of search component
enum RecipeSearchResultsState {
  NO_QUERY,
  HAS_RESULTS,
  NO_RESULTS,
  // HIDDEN,
}

enum RecipeSearchResultsVisibility {
  VISIBLE,
  HIDDEN
}


//// UPDATE
// Implement a "Msg" type like Elm's
// Specify all possible message "actions" - signals that can lead to a change in state
// In elm, these would be defined in "type Msg = A | B | C"
enum Action {
  UPDATE_QUERY,
  UPDATE_RESULTS_STATE,
  UPDATE_RESULTS_VISIBILITY,
}
// Each message will have an action (possible signal to change state)
// and a "value" with content (e.g., the relevant search query or reuslts?)
// (Q) is this correct? What is "value" and how is it used?
// There is a variant of message for each "action."
type MsgVariant<V> = {
  action: Action;
  value: V;
};
type Msg =
  | MsgVariant<string>
  | MsgVariant<RecipeSearchResultsState>
  | MsgVariant<RecipeSearchResultsVisibility>;

// Define Msg variant for UPDATE_QUERY
// This will have a "value" of a string -- this is what the user types
// This value is the content that will be used when the query is updated.
const UpdateQuery = (value: string): MsgVariant<string> => ({
  action: Action.UPDATE_QUERY,
  value,
});
// Define Msg variant for UPDATE_RESULTS_STATE
const UpdateResultsState =
  (value: RecipeSearchResultsState): MsgVariant<RecipeSearchResultsState> => ({
    action: Action.UPDATE_RESULTS_STATE,
    value,
  });


const UpdateResultsVisibility =
  (value: RecipeSearchResultsVisibility): MsgVariant<RecipeSearchResultsVisibility> => ({
    action: Action.UPDATE_RESULTS_VISIBILITY,
    value,
  });


@customElement(RECIPES_SEARCH_TAG)
export class RecipesSearch extends LitElement {
  // Lit.js component boilerplate
  // (Q) what does "static styles = css`...`;" (from lit tutorial) do?
  @property({type: Array})
  readonly recipes: RecipePart[] = [];

  @property()
  // Query is changed on user input, as set in the render function
  query = '';

  // Define starting state (like Elm's initial MODEL)
  // Possible values of results state are enumerated in RecipeSearchResultsState's definition
  @state()
  private resultsState: RecipeSearchResultsState = RecipeSearchResultsState.NO_QUERY;

  // Possible values of results state are enumerated in RecipeSearchResultsVisibility's definition
  @state()
  private resultsVisibility: RecipeSearchResultsVisibility = RecipeSearchResultsVisibility.HIDDEN;

  // @state()
  // private selectedIndex?: number | null = null;

  static get styles() {
    return styles;
  }

  // TODO: make search results display when you click on the search bar, after clicking away from it.
  // (Q) How to do this??
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', (e: Event) => {
      if (this.resultsState === RecipeSearchResultsState.NO_QUERY) return;

      if (Array.from(e.composedPath()).some(element => element instanceof RecipesSearch)) {
        return;
      }

      // this.handleMsg(UpdateResultsState(RecipeSearchResultsState.HIDDEN))
      this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.HIDDEN))
    });

    // Hide search results if escape is pressed
   window.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'Escape': {
             //if esc key was not pressed in combination with ctrl or alt or shift
              const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
              if (isNotCombinedKey) {
                  // this.handleMsg(UpdateResultsState(RecipeSearchResultsState.HIDDEN))
                  this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.HIDDEN))
              }
              break;
            }

            // TODO: arrow keys!
            // case 'ArrowUp': {
            //   this.selectedIndex ??= 0;
            //   break;
            // }
            //
            // case 'ArrowDown': {
            // }
          }
      });
  }

  private onInputClick() {
    this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.VISIBLE))
  }


  //// HANDLE UPDATE MESSAGES - how should state be changed for each Msg action?
  // There are two possible update message actions: UPDATE_QUERY and UPDATE_RESULTS_STATE
  // Possible actions are enumerated in the UPDATE section.
  private handleMsg(msg: Msg) {
    switch (msg.action) {
      case Action.UPDATE_QUERY: {
        // Get the value of the query, sent in the msg
        // For the update action, the msg's value is user input -- what they type in the search box
        // I think this error is because msg.value isn't always a string: in principle, it could be a RecipeSearchResultsState
        // So, let's check is msg.value is a string, and assign it only if so -- if it's not, throw an error.
        this.query = msg.value as string;

        // Set the model's state depending on the consequences of the query
        // There are three possible states that depend on the possible values of query:
        // NO_QUERY, NO_RESULTS, and HAS_RESULTS
        // These were enumerated in the MODEL section (Q) is this the right way to think of that enum?
        // (Q) is that correct?

        // If there is no query, state is NO_QUERY
        if (!this.query) {
          this.handleMsg(UpdateResultsState(RecipeSearchResultsState.NO_QUERY));
          break;
        }

        // If the query led to no search results, set state to NO_RESULTS
        // (The helper function defined in our lit component will automatically
        // update the search results whenever there is a query)
        // (Q) Is that correct?
        if (!this.searchResults().length) {
          this.handleMsg(UpdateResultsState(RecipeSearchResultsState.NO_RESULTS));
          break;
        }

        // If the query led to search results, set state to HAS_RESULTS
        this.handleMsg(UpdateResultsState(RecipeSearchResultsState.HAS_RESULTS));
        break;
      }

      // Handle the action UPDATE_RESULTS_STATE
      case Action.UPDATE_RESULTS_STATE: {
        // Set the results state to the one set when there is a new query
        // (This msg will be sent after a query is updated: after an UPDATE_QUERY)
        this.resultsState = msg.value as RecipeSearchResultsState;
        break;
      }

      // Handle the action UPDATE_RESULTS_VISIBILITY
      case Action.UPDATE_RESULTS_VISIBILITY: {
        // Set the results state to the one set when there is a new query
        // (This msg will be sent after a query is updated: after an UPDATE_QUERY)
        this.resultsVisibility = msg.value as RecipeSearchResultsVisibility;
        break;
      }

      // Make typescript throw an error unless all arms of Msg/Action are covered
      default:
        const exhaustive: never = msg.action;
        throw Error(`Unhandled case: ${exhaustive}`);
    }
  }


  //// HELPER FUNCTIONS
  // Given a query, return search results
  // (Q) does this function notation set the output type of searchResults to RecipePart?
  searchResults(): RecipePart[] {
    if (!this.query.length) return [];

    // Usre fuse.js to search recipes (by title and description)
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

  // helper VIEW functions
  private renderRecipe(recipe: RecipePart) {
    const url = `/recipes/${recipe.pk}`;

    // let description_formatted: string;
    // if (recipe.fields.description) {
    //   description_formatted = ` — ` + `${recipe.fields.description}`
    // } else {
    //   description_formatted = ``
    // }

    return html`
      <a
        tabindex="0"
        class="recipe-search-result-container"
        .href=${url}
      >
        <div class="recipe-search-result-content">
            <div class="recipe-result__title">
              ${recipe.fields.title}
            </div>
            <div class="recipe-result__description">
              <p>
                <em>${recipe.fields.description}</em>
              </p>
            </div>
        </div>
      </a>
    `;
  }

  private renderSearchResults() {
    // (Q) What is going on in this function?
    // How do templates work? Where does it get its content?
   const resultsWrapper = (markup: TemplateResult) => html`
      <div
        class="recipes-search__results ${classMap({
          'recipes-search__results--hidden':
            this.resultsVisibility === RecipeSearchResultsVisibility.HIDDEN ||
            this.resultsState === RecipeSearchResultsState.NO_QUERY,
        })}"
        id="search_dropdown">
        ${markup}
      </div>
    `;

    // Render search results depending on the results state
    // this.resultsState is like a global model state:
    // It is defined in @state, and its possible values are enumerated in the RecipeSearchResultsState type
    // It can be NO_QUERY, NO_RESULTS, or HAS_RESULTS
    switch (this.resultsState) {
      case RecipeSearchResultsState.NO_RESULTS:
        return resultsWrapper(html`
            <div class="recipe-search-result-content">
              <p>
                <em>Found no recipes matching '${this.query}'.</em>
              </p>
            </div>
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
        // (Q) Can we put a "default:" statement in here
        // to throw an error if all switch arms are not covered?
    }
  }


  //// VIEW

  render() {
    return html`
      <div class="recipes-search">
          <input
            class="recipes-search__input material-symbols-outlined",
            type="submit",
            value=🔎︎>
          <input
            class="recipes-search__input"
            type="text"
            placeholder="Search all recipes"
            .value=${this.query}
            @click=${() => {
              this.onInputClick();
            }}
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
