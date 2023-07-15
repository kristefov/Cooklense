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
      _id
      username
      savedRecipes {
        _id
        idMeal
        strMeal
        strMealThumb
      }
    }
  }
`;
export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: String!) {
    removeRecipe(recipeId: $recipeId) {
      username
      recipeCount
      savedRecipes {
        _id
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
  mutation removeMealFromWeekPlan($idMeal: ID!) {
    mutationName(idMeal: $idMeal) {
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