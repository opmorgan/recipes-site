var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RecipesSearch_1;
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styles } from './styles.css';
import Fuse from 'fuse.js';
export const RECIPES_SEARCH_TAG = 'hb-recipes-search';
var RecipeSearchResultsState;
(function (RecipeSearchResultsState) {
    RecipeSearchResultsState[RecipeSearchResultsState["NO_QUERY"] = 0] = "NO_QUERY";
    RecipeSearchResultsState[RecipeSearchResultsState["HAS_RESULTS"] = 1] = "HAS_RESULTS";
    RecipeSearchResultsState[RecipeSearchResultsState["NO_RESULTS"] = 2] = "NO_RESULTS";
})(RecipeSearchResultsState || (RecipeSearchResultsState = {}));
var RecipeSearchResultsVisibility;
(function (RecipeSearchResultsVisibility) {
    RecipeSearchResultsVisibility[RecipeSearchResultsVisibility["VISIBLE"] = 0] = "VISIBLE";
    RecipeSearchResultsVisibility[RecipeSearchResultsVisibility["HIDDEN"] = 1] = "HIDDEN";
})(RecipeSearchResultsVisibility || (RecipeSearchResultsVisibility = {}));
var Action;
(function (Action) {
    Action[Action["UPDATE_QUERY"] = 0] = "UPDATE_QUERY";
    Action[Action["UPDATE_RESULTS_STATE"] = 1] = "UPDATE_RESULTS_STATE";
    Action[Action["UPDATE_RESULTS_VISIBILITY"] = 2] = "UPDATE_RESULTS_VISIBILITY";
})(Action || (Action = {}));
const UpdateQuery = (value) => ({
    action: Action.UPDATE_QUERY,
    value,
});
const UpdateResultsState = (value) => ({
    action: Action.UPDATE_RESULTS_STATE,
    value,
});
const UpdateResultsVisibility = (value) => ({
    action: Action.UPDATE_RESULTS_VISIBILITY,
    value,
});
let RecipesSearch = RecipesSearch_1 = class RecipesSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.recipes = [];
        this.query = '';
        this.resultsState = RecipeSearchResultsState.NO_QUERY;
        this.resultsVisibility = RecipeSearchResultsVisibility.HIDDEN;
        this.selectedIndex = null;
    }
    static get styles() {
        return styles;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', (e) => {
            if (this.resultsState === RecipeSearchResultsState.NO_QUERY)
                return;
            if (Array.from(e.composedPath()).some(element => element instanceof RecipesSearch_1)) {
                return;
            }
            this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.HIDDEN));
        });
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape': {
                    const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
                    if (isNotCombinedKey) {
                        this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.HIDDEN));
                    }
                    break;
                }
            }
        });
    }
    onInputClick() {
        this.handleMsg(UpdateResultsVisibility(RecipeSearchResultsVisibility.VISIBLE));
    }
    handleMsg(msg) {
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
            case Action.UPDATE_RESULTS_VISIBILITY: {
                this.resultsVisibility = msg.value;
                break;
            }
            default:
                const exhaustive = msg.action;
                throw Error(`Unhandled case: ${exhaustive}`);
        }
    }
    searchResults() {
        if (!this.query.length)
            return [];
        const fuseOptions = {
            minMatchCharLength: 1,
            ignoreLocation: true,
            distance: 0,
            keys: [
                "fields.title",
                "fields.description"
            ]
        };
        const fuse = new Fuse(this.recipes, fuseOptions);
        const fuseResults = fuse.search(this.query);
        return fuseResults
            .map(result => result.item)
            .slice(0, 5);
    }
    renderRecipe(recipe) {
        const url = `/recipes/${recipe.pk}`;
        return html `
      <a
        tabindex="0"
        class="recipe-search-result-container"
        .href=${url}
      >
        <div class="recipe-search-result-content">
            <div class="recipe-result__title">
              <strong>${recipe.fields.title}</strong>
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
    renderSearchResults() {
        const resultsWrapper = (markup) => html `
      <div
        class="recipes-search__results ${classMap({
            'recipes-search__results--hidden': this.resultsVisibility === RecipeSearchResultsVisibility.HIDDEN ||
                this.resultsState === RecipeSearchResultsState.NO_QUERY,
        })}"
        id="search_dropdown">
        ${markup}
      </div>
    `;
        switch (this.resultsState) {
            case RecipeSearchResultsState.NO_RESULTS:
                return resultsWrapper(html `
            <div class="recipe-search-result-content">
              <p>
                <em>Found no recipes matching '${this.query}'.</em>
              </p>
            </div>
        `);
            case RecipeSearchResultsState.NO_QUERY:
                return nothing;
            case RecipeSearchResultsState.HAS_RESULTS:
                return resultsWrapper(html `
          ${repeat(this.searchResults(), element => element.fields.title, this.renderRecipe)}
        `);
        }
    }
    render() {
        return html `
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
            @click=${(e) => {
            this.onInputClick();
        }}
            @input=${(e) => {
            const query = e.target.value || '';
            this.handleMsg(UpdateQuery(query));
        }}
          />
          ${this.renderSearchResults()}
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], RecipesSearch.prototype, "recipes", void 0);
__decorate([
    property()
], RecipesSearch.prototype, "query", void 0);
__decorate([
    state()
], RecipesSearch.prototype, "resultsState", void 0);
__decorate([
    state()
], RecipesSearch.prototype, "resultsVisibility", void 0);
__decorate([
    state()
], RecipesSearch.prototype, "selectedIndex", void 0);
RecipesSearch = RecipesSearch_1 = __decorate([
    customElement(RECIPES_SEARCH_TAG)
], RecipesSearch);
export { RecipesSearch };
//# sourceMappingURL=index.js.map