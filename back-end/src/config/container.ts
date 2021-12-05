import { UserRepository } from '../data';

import { marvelAPIService } from '../services';
import { MarvelAPIService } from '../services/marvelAPIService';

import { userService } from '../services';
import { UserService } from '../services/userService';

interface MyContainer {
  userService: UserService;
  marvelAPIService: MarvelAPIService;
}

const container = () =>
  ({
    userService: userService(new UserRepository()),
    marvelAPIService: marvelAPIService()
  } as MyContainer);

export { container, MyContainer, MarvelAPIService, UserService };
