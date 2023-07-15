import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation addUser($userData: UserInput!) {
    addUser(userData: $userData) {
      token
      user {
        _id
        username
        firstName
        lastName
        avatar
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($userData: UserInput!) {
    updateUser(userData: $userData) {
      _id
      username
      firstName
      lastName
      avatar
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        firstName
        lastName
        avatar
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeData: RecipeInput!) {
    saveRecipe(recipeData: $recipeData) {
      username
      _id
      savedRecipes {
        idMeal
        strMeal
        strMealThumb
      }
    }
  }
`;
export const REMOVE_RECIPE = gql`
  mutation removeRecipe($idMeal: String!) {
    removeRecipe(idMeal: $idMeal) {
      username
      _id
      savedRecipes {
        idMeal
        strMeal
        strMealThumb
      }
    }
  }
`;

export const ADD_TO_WEEKPLAN = gql`
  mutation AddToWeekPlan($day: String!, $recipeData: RecipeInput!) {
    addToWeekPlan(day: $day, recipeData: $recipeData) {
      username
      weekPlan {
        day
        recipeData {
          idMeal
          strMeal
          strMealThumb
        }
      }
    }
  }
`;

export const REMOVE_MEAL_FROM_WEEKPLAN = gql`
  mutation removeMealFromWeekPlan($idMeal: String) {
    removeMealFromWeekPlan(idMeal: $idMeal) {
      username
      weekPlan {
        day
        recipeData {
          idMeal
          strMeal
          strMealThumb
        }
      }
    }
  }
`;

export const ADD_TO_SHOPPING_LIST = gql`
  mutation addToShoppingList($ingredients: [String!]!) {
    addToShoppingList(ingredients: $ingredients) {
      _id
      username
      shoppingList
    }
  }
`;

export const REMOVE_INGREDIENT_FROM_SHOPPING_LIST = gql`
  mutation removeIngredientFromShoppingList($ingredient: String!) {
    removeIngredientFromShoppingList(ingredient: $ingredient) {
      _id
      shoppingList
    }
  }
`;
