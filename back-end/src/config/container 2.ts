import { userRepository } from '../data';
import { userService } from '../services';

const container = {
  userService: userService(userRepository),
};

export default container;
