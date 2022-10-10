module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Url
import Json.Decode exposing (Decoder, map4, field, int, string)
--NoRedInk/elm-json-decode-pipeline
import Json.Decode.Pipeline exposing (required)
--justinmimbs/date/4.0.1
import Date


-- MAIN
main: Program () Model Msg
main =
  Browser.application
  { init = init
  , view = view
  , update = update
  , subscriptions = subscriptions
  , onUrlChange = UrlChanged
  , onUrlRequest = LinkClicked
  }


-- HELPER FUNCTIONS [Q] Is this the right place for these?
viewLink : String -> Html msg
viewLink path =
  li [] [ a [ href path ] [ text path ] ]

-- MODEL

type alias Recipe =
  {
    id: Int,
    title: String,
    created_at: String,
    updated_at: String,
    description: Maybe String,
    prep_time: Maybe String,
    servings: Maybe String,
    introduction: Maybe String,
    variations: Maybe String,
    title_image: Maybe String,
    directions: Maybe String
  }

type RecipeResponse
  = Failure
  | Loading
  | Success (List Recipe)

{- [Q] What is Nav.Key? How does it get associated with certain navigation functions/urls? -}
type alias Model =
  { key : Nav.Key
  , url : Url.Url
  , recipes: RecipeResponse
  }

-- Initialize the model

-- Type annotation:
-- First, init will get a Url.Url and Nav.Key
-- Then, init will return a Model that returns a Cmd Msg
-- [Q] does () mean that extra, optional arguments can be given? (flags)
init : () -> Url.Url -> Nav.Key -> (Model, Cmd Msg)

-- Define the init function
-- arguments: optional flags (?), a url, and a key
-- return: a Model (with the url and key), that returns no command.
-- (This just constructs a model with a url and key)
init flags url key =
  ( Model key url Loading, Cmd.none )


-- UPDATE

type Msg
  = LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url -- [Q] When does this trigger? after nav.pushUrl?
  | GotRecipes (Result Http.Error (List Recipe))

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    -- If some one clicks a link,
    LinkClicked urlRequest ->
      case urlRequest of
        -- If it's an internal link,
        -- [Q] what happens?
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )

        -- If it's an external link,
        -- [Q] should we leave this out for now?
        Browser.External href ->
          ( model, Nav.load href )

    -- If a url has been changed ([Q] e.g., by Nav.pushUrl?),
    -- Then update the model to have the new url.
    UrlChanged url ->
      (  { model | url = url }
      , Cmd.none
      )

    GotRecipes recipeResult ->
      case recipeResult of
        Err error ->
          ( { model | recipes = Failure }, Cmd.none )

        Ok recipes ->
          ( { model | recipes = Success recipes }, Cmd.none )




-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg

-- The "_" is for javascript
subscriptions _ = Sub.none



-- VIEW
-- Define view (type annotation):
-- The model will return a full Browser.Application with its Msg
-- [Q] why not Browser.application?
view: Model -> Browser.Document Msg
view model =
  { title = "Url Interceptor"
  , body =
    [ text "The current URL is: "
    , b [] [ text (Url.toString model.url) ]
    , ul []
      [ viewLink "/"
      , viewLink "/recipes"
      , viewLink "/categories" ]
    ]
  }


rowItem: String -> Html Msg
rowItem id =
    div []
        [ text id ]

viewRecipes: Model -> Html Msg
viewRecipes model =
  case model.recipes of
    Failure ->
      div []
      [ text "No recipes could be loaded."]
    Loading ->
      div []
    Success recipes ->
      div []
      (List.map rowItem model.rows)

-- HTTP

getAllRecipes: Cmd Msg
getAllRecipes =
  Http.get
    { url = "localhost:8000/api/recipes/"
    , expect = Http.expectJson GotRecipes recipeDecoder
    }

dateDecoder : Json.Decode.Decoder Date.Date
dateDecoder =
  string
    |> Json.Decode.andThen ( \str ->
          case Date.fromIsoString str of
            Err err -> Json.Decode.fail err
            Ok date -> Json.Decode.succeed date )

recipeDecoder: Decoder Recipe
recipeDecoder =
  Decode Recipe
    |> required "id" int
    |> required "created_at" dateDecoder
    |> required "updated_at" dateDecoder
    |> optional "description" (nullable string)
    |> optional "servings" (nullable string)
    |> optional "directions" string
    |> optional "introduction" string
    |> optional "variations" string
    |> optional "cook_time" string
    -- |> optional "title_image" (nullable string)
