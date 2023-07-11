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
        uri
        label
        image
        recipeId
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
        uri
        label
        image
        recipeId
      }
    }
  }
`;