import { UserRepository } from '../data/userRepository';
import { toUser } from '../config/model/user';
import { UserInput } from '../graphql/generated/types';
import { UserService } from '../config/container';

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
    }
  };
}
