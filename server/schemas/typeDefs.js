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

  type Query{
  Recipe( Recipe)
  user: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(userData: UserInput!): Auth

  }
`;

module.exports = typeDefs;