import { gql } from 'apollo-server-core';

// The GraphQL schema
const typeDefs = gql`
  scalar Date
  type Query {
    hello: String!
    getUser(id: ID!): User!
    getUsers(ids: [ID!]!): [User!]!
    characters(offset: Int!, limit: Int!): CharactersResponse!
    character(id: ID!): Character!
    gameCharacters(userId: ID!): [GameCharacter!]!
  }

  type Mutation {
    signup(userInput: UserInput!): UserWithToken!
    signin(userInput: UserInput!): UserWithToken!
  }

  type User {
    id: ID!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type UserWithToken {
    id: ID!
    email: String!
    createdAt: Date!
    updatedAt: Date!
    token: String!
  }

  input UserInput {
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

  type Stats {
    xp: Int!
    hp: Int!
    tire: Int!
  }

  type GameCharacter {
    id: ID!
    name: String!
    image: ImageResult!
    stats: Stats!
  }

  type CharactersResponse {
    characters: [Character!]!
    hasMore: Boolean!
  }
`;

export default typeDefs;
