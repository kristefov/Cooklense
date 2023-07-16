import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      avatar
      savedRecipes {
        idMeal
        strMeal
        strMealThumb
      }
      shoppingList
      weekPlan {
        day
        recipeData {
          _id
          idMeal
          strMeal
          strMealThumb
        }
      }
    }
  }
`;
