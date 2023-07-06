const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    savedRecipes: [Recipe]
  }

  type Recipe {
    _id: ID!
    recipeId: ID!
    label: String!
    uri: [String]
    image: String
  }
  input RecipeInput {
    uri: [String]
    label: String!
    image: String
    recipeId: ID!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    addUser(userData: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveRecipe(recipeData: RecipeInput!): User
    removeRecipe(recipeId: String!): User
  }
`;
module.exports = typeDefs;
