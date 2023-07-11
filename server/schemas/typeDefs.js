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
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
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
  }
`;
module.exports = typeDefs;
