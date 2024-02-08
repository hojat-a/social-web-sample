import { Injectable } from "@nestjs/common";
import { PgProvider } from "src/database/pg/pg.provider";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserRepository {
  constructor(private readonly pg: PgProvider) { }
  async createUser(createUserDto) {
    try {
      const newUser = await this.pg.user.create({
        data: createUserDto
      })
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw { type: 'duplicated' }
      }
      throw error;
    }

  }
  async fetchUserByUsername(username: string) {
    const user = await this.pg.user.findUnique({
      where: {
        username
      }
    });
    return user;
  }

  async fetchUserByID(userId: number) {
    try {
      const user = this.pg.user.findUnique({
        where: {
          id: userId
        }
      })
      return user;
    } catch (error) {
      throw error;
    }
  }

  async fetchUsers({ firstname, lastname, age, maxAge, minAge, page, pageSize }) {
    try {
      const skip = (page - 1) * pageSize;
      const searchQuery = {}
      if (firstname) {
        searchQuery['fname'] = firstname
      }
      if (lastname) {
        searchQuery['lname'] = lastname
      }
      if (age || maxAge || minAge) {
        searchQuery['age'] = {};
        if (age)
          searchQuery['age']['equals'] = +age;
        else if (minAge) {
          searchQuery['age']['gte'] = +minAge
        }
        else if (maxAge) {
          searchQuery['age']['lte'] = +maxAge
        }
      }

      const users = await this.pg.user.findMany({
        where: searchQuery,
        skip,
        take: pageSize,
        select: {
          username: true,
          fname: true,
          lname: true,
          age: true,
          avatar: true,
        }
      })
      return users;
    } catch (error) {
      throw error;
    }
  }
}