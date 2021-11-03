import { userRepository } from '../data';
import { userService } from '../services';
import { marvelAPIService } from '../services';

const container = {
  userService: userService(userRepository),
  marvelAPIService: marvelAPIService()
};

export default container;
