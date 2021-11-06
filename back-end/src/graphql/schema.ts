import { gql } from 'apollo-server-core';

// The GraphQL schema
const typeDefs = gql`
  scalar Date
  type Query {
    hello: String!
    getUser(id: ID!): User!
    getUsers(ids: [ID!]!): [User!]!
    characters: [Character!]!
    character(id: ID!): Character!
  }

  type Mutation {
    addUser(userInput: UserInput!): ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Character {
    id: ID!
    name: String!
    image: ImageResult!
    comics: ComicsData
    description: String
  }

  type ComicsData {
    appearances: Int
    items: [Comic!]
  }

  type Comic {
    name: String!
  }

  type ImageResult {
    url: String!
    extension: String!
  }
`;

export default typeDefs;
