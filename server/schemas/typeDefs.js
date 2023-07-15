const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    recipeCount: Int
    avatar: String
    savedRecipes: [Recipe]
    weekPlan: [WeekPlanDay]
  }

  type WeekPlanDay {
    day: String!
    recipeData: [Recipe!]!
  }

  type Recipe {
    idMeal: String
    strMeal: String
    strMealThumb: String
  }

  input RecipeInput {
    idMeal: String
    strMeal: String
    strMealThumb: String
  }

  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    avatar: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    addUser(userData: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    saveRecipe(recipeData: RecipeInput!): User
    removeRecipe(recipeId: String!): User
    updateUser(userData: UserInput!): User
    addToWeekPlan(day: String!, recipeData: RecipeInput!): User
    removeMealFromWeekPlan(idMeal: ID!): User
  }
`;
module.exports = typeDefs;
