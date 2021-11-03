import {
  KnexRepository
} from '../config/buildingBlocks/baseRepository';
import { toUser, toUserData, User } from '../config/model/';

export class UserRepository extends KnexRepository<User> {
  constructor() {
    super('users', toUser, toUserData);
  }
}

const userRepository = new UserRepository();

export default userRepository;
