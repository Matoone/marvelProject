//import { userRepository } from '../../data';
//import { userService } from '../../services';
import { ValidationError } from 'apollo-server-core';
import { GraphQLScalarType } from 'graphql';
import { Resolvers } from '../generated/types';
import { MyContainer } from '../../config/container';

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
    getUser: (_, { id }, ctx: MyContainer) => ctx.userService.getUser(id),
    getUsers: (_, { ids }, ctx: MyContainer) => ctx.userService.getUsers(ids),
    characters: (_, __, ctx: MyContainer) =>
      ctx.marvelAPIService.getCharacters(),
    character: (_, { id }, ctx: MyContainer) => {
      console.log('id', id);
      return ctx.marvelAPIService.getCharacter(id);
    }
  },
  Mutation: {
    addUser: (_, { userInput }, ctx: MyContainer) =>
      ctx.userService.addUser(userInput)
  }
  // Character: {
  //   comics: ({ id }, _, { marvelAPIService }) => marvelAPIService.getComics(id)
  // }
};

export default resolvers;
