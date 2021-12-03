import { KnexRepository } from '../config/buildingBlocks/baseRepository';
import knexInstance from '../config/db/knexInstance';
import { toUser, toUserData, User, UserData } from '../model';

export class UserRepository extends KnexRepository<User> {
  constructor() {
    super('users', toUser, toUserData);
  }
  async getByEmail(email: string): Promise<User> {
    const data: UserData = await knexInstance('users')
      .select('*')
      .where({ email })
      .first();
    if (!data)
      throw new Error(`This user with email ${email} does not exists.`);
    return {
      ...toUser(data),
      password: data.password
    };
  }
}
