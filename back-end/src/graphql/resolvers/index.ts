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
    getUser: (_, { id }, { ctx }: { ctx: MyContainer }) =>
      ctx.userService.getUser(id),
    getUsers: (_, { ids }, { ctx }: { ctx: MyContainer }) =>
      ctx.userService.getUsers(ids),
    characters: (_, { offset, limit, name }, { ctx }: { ctx: MyContainer }) =>
      ctx.marvelAPIService.getCharacters(offset, limit, name ?? undefined),
    character: (_, { id }, { ctx }: { ctx: MyContainer }) => {
      return ctx.marvelAPIService.getCharacter(id);
    },
    gameCharacters: (_, __, ___) => {
      throw new Error('Not yet implemented');
    }
  },
  Mutation: {
    signup: (_, { userInput }, { ctx }: { ctx: MyContainer }) =>
      ctx.userService.signup(userInput),
    signin: (_, { userInput }, { ctx }: { ctx: MyContainer }) =>
      ctx.userService.signin(userInput)
  }
};

export default resolvers;
