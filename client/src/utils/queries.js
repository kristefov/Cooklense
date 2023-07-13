import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            firstName
            lastName
            avatar
            savedRecipes {
                idMeal
                strMeal
                strMealThumb
            }
        }
    }
`;