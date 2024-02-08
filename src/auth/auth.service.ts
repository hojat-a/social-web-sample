import * as bcrypt from 'bcrypt';
import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashingConstants } from './constants';
import { SignInDto, SignUpDto } from './dto';
import { randomUUID } from 'crypto';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) { }

  async signUp(user: SignUpDto) {
    const saltOrRounds = hashingConstants.saltOrRounds;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    try {
      await this.userRepository.createUser({
        username: user.username,
        hash: hashedPassword,
        fname: user.firstname,
        lname: user.lastname,
        age: user.age
      });
      return {
        message: 'User account created successfully.',
      };
    }
    catch (error) {
      throw error;
    }
  }

  async signIn(user: SignInDto) {
    try {
      const userData = await this.userRepository.fetchUserByUsername(user.username);
      //check user existance
      if (!userData) {
        throw { type: 'Unauthorized' };
      }
      //password match
      const isMatch = await bcrypt.compare(user?.password, userData.hash);
      if (!isMatch) {
        throw { type: 'Unauthorized' };
      }
      const tokenId = this.generateTokenId();

      const token = await this.getTokens(userData.id, userData.role, tokenId);

      return token;
    }
    catch (error) {
      throw error;
    }

  }

  private async getTokens(userId: number, role: string, tokenId: string) {
    try {
      const At = await this.jwtService.signAsync(
        {
          sub: userId,
          role,
          jti: tokenId
        })
      return {
        accessToken: At
      }
    } catch (error) {
      throw error;
    }

  }

  private generateTokenId() {
    const tokenId = randomUUID();
    return tokenId;
  }
}
