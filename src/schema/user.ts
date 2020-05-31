import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
    hello: String
		user(email: String!): User
    allUsers: [User]
    me: User
	}

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      password2: String!
      name: String!
    ): User!
    
    signIn(email: String!, password: String!): Token!
  }

  type Token {
    id: String!
    name: String!
    email: String!
    token: String!
  }
  type User {
    name: String!
    email: String!
    date: String
  }
`;