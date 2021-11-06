import { userRepository } from '../data';
import { userService } from '../services';
import { marvelAPIService } from '../services';
import { User } from './model';
import { Character, UserInput } from '../graphql/generated/types';

interface MarvelAPIService {
  getCharacters: (offset?: number, limit?: number) => Promise<Character[]>;
  getCharacter: (id: string) => Promise<Character>;
}

interface UserService {
  getUser: (id: string) => Promise<User>;
  getUsers: (ids: string[]) => Promise<User[]>;
  addUser: (userInput: UserInput) => Promise<string>;
}
interface MyContainer {
  userService: UserService;
  marvelAPIService: MarvelAPIService;
}

const container = {
  userService: userService(userRepository),
  marvelAPIService: marvelAPIService()
} as const;

//const Container = typeof container;

export { container, MyContainer, MarvelAPIService, UserService };
