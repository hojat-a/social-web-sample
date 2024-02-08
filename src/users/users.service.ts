import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { QueryDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userRepository.fetchUserByUsername(username);
      if (!user) {
        return {}
      }
      return {
        id: user.id,
        username: user.username,
        firstname: user.fname,
        lastname: user.lname,
        age: user.age,
        avatar: user.avatar
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserById(userId) {
    try {
      const user = await this.userRepository.fetchUserByID(userId);
      return {
        username: user.username,
        firstname: user.fname,
        lastname: user.lname,
        age: user.age,
        avatar: user.avatar
      } || {};
    } catch (error) {
      throw error
    }
  }

  async findUsers({ firstname, lastname, age, page = 1, pageSize = 10, maxAge, minAge }: QueryDto) {
    try {
      return await this.userRepository.fetchUsers({ firstname, lastname, age, maxAge, minAge, page, pageSize });
    } catch (error) {
      throw error;
    }
  }
}
