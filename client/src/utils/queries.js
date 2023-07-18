// setup for React and Apollo Client
import { gql } from "@apollo/client";


// setup for User data and any saved recipes data
// loads in 'SavedRecipes.js'
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

export const GET_REVIEWS = gql`
  query GetReviews($idMeal: String!) {
    getReviews(idMeal: $idMeal) {
      _id
      idMeal
      username
      rating
      title
      comment
    }
  }
`;

