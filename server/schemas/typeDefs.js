const {gql} = require('apollo-server-express')

const  typeDefs = gql`
  type Recipe{
    _id: ID
    uri:String
    label:String
    image: String

  }

  type User {
    _id: ID
    usename: String
    email: String
    password: String
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
  me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email String!, password: String!): Auth
    saveRecipe(recipeData) Recipe
    removeBook( recipeId:ID) Recipe
  }
`;

module.exports = typeDefs;