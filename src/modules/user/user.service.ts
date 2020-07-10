import { Injectable } from '@nestjs/common';
import User from '../../entities/User';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  public createUser(userData: User | Record<string, unknown>): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, userData);

    return newUser.save();
  }

  public async getUserByLogin(login: string): Promise<User> {
    return User.findOne({
      where: {
        [Op.or]: {
          phone: {
            [Op.eq]: login,
          },
          mail: {
            [Op.eq]: login,
          },
        },
      },
    });
  }
}
