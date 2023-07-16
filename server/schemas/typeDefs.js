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
    shoppingList: [String]
  }

  type WeekPlanDay {
    day: String!
    recipeData: [Recipe]
  }

  type Recipe {
    _id: ID!
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

  type Review {
    _id: ID
    idMeal: String
    username: String
    rating: Int
    title: String
    comment: String
  }

  input ReviewInput {
    idMeal: String
    username: String
    rating: Int
    title: String
    comment: String
  }

  type Query {
    me: User!
  }

  type Query {
    getReview(idMeal: String!): Review
  }

  type Mutation {
    addUser(userData: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    saveRecipe(recipeData: RecipeInput!): User
    removeRecipe(idMeal: String!): User
    updateUser(userData: UserInput!): User
    addToWeekPlan(day: String!, recipeData: RecipeInput!): User
    removeMealFromWeekPlan(_id: ID): User
    addToShoppingList(ingredients: [String!]!): User
    removeIngredientFromShoppingList(ingredient: String!): User
    createReview(reviewData: ReviewInput!): Review
  }
`;
module.exports = typeDefs;
