import { LitElement, TemplateResult } from 'lit';
export declare const RECIPES_SEARCH_TAG = "hb-recipes-search";
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
export declare class RecipesSearch extends LitElement {
    readonly recipes: RecipePart[];
    query: string;
    private resultsState;
    private resultsVisibility;
    private selectedIndex?;
    static get styles(): import("lit").CSSResult;
    connectedCallback(): void;
    private onInputClick;
    private handleMsg;
    searchResults(): RecipePart[];
    private renderRecipe;
    private renderSearchResults;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        [RECIPES_SEARCH_TAG]: RecipesSearch;
    }
}
export {};
