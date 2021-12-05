import { UserRepository } from '../data/userRepository';
import { toUser, User } from '../model/user';
import { UserInput, UserWithToken } from '../graphql/generated/types';
import { comparePasswords, encrypt, signToken } from '../utils/auth';
import { NotFound } from '../config/buildingBlocks/errors';

export interface UserService {
  getUser: (id: string) => Promise<User>;
  getUsers: (ids: string[]) => Promise<User[]>;
  addUser: (userInput: UserInput) => Promise<string>;
  signin: (userInput: UserInput) => Promise<UserWithToken>;
  signup: (userInput: UserInput) => Promise<UserWithToken>;
}

export default function userService(
  userRepository: UserRepository
): UserService {
  return {
    getUser: (id: string) => {
      return userRepository.getById(id);
    },

    getUsers: (ids: string[]) => {
      return userRepository.getByIds(...ids);
    },

    addUser: async (userInput: UserInput) => {
      console.log('service', userInput);
      const ids = await userRepository.add(toUser(userInput));

      return ids[0];
    },

    // TODO: plug with future verification email service.
    signup: async (userInput: UserInput): Promise<UserWithToken> => {
      const hashedPassword = await encrypt(userInput.password);
      const user = toUser({ ...userInput, password: hashedPassword });
      await userRepository.add(user);
      const token = signToken(user.id);

      return { ...user, token } as UserWithToken;
    },

    signin: async (userInput: UserInput): Promise<UserWithToken> => {
      const user = await userRepository.getByEmail(userInput.email);
      if (!user?.password) {
        throw new NotFound("Erreur: l'utilisateur n'existe pas.");
      }
      await comparePasswords(userInput.password, user.password);
      const token = signToken(user.id);

      return { ...user, token } as UserWithToken;
    }
  };
}
