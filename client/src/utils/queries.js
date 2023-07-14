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
    }
  }
`;
