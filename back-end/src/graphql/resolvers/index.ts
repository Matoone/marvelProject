//import { userRepository } from '../../data';
//import { userService } from '../../services';
import { ValidationError } from 'apollo-server-core';
import { GraphQLScalarType } from 'graphql';
import { Resolvers } from '../generated/types';
import marvelAPIService from '../../services/marvelAPIService';

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Représente une date au format ISO',
    parseValue: (value) => {
      const date = new Date(value);

      if (!isFinite(date.getTime())) {
        throw new ValidationError('Date non valide');
      }

      return date;
    },
    serialize: (value: Date) => value.toISOString()
  }),
  Query: {
    hello: () => 'world',
    getUser: (_, { id }, { userService }) => userService.getUser(id),
    getUsers: (_, { ids }, { userService }) => userService.getUsers(ids),
    characters: (_, __, { marvelAPIService }) =>
      marvelAPIService.getCharacters(),
    character: (_, { id }, { marvelAPIService }) => {
      console.log('id', id);
      return marvelAPIService.getCharacter(id);
    }
  },
  Mutation: {
    addUser: (_, { userInput }, { userService }) =>
      userService.addUser(userInput)
  },
  Character: {
    comics: ({ id }, _, { marvelAPIService }) => marvelAPIService.getComics(id)
  }
};

export default resolvers;
