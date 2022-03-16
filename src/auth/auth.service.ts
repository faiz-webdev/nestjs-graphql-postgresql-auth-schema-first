import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { AuthResponse } from './dto/auth-response.type';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  async login(email: string): Promise<any> {
    const user = await this.authRepository.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const token = jwt.sign({ email }, 'secret');
    // console.log('token : ', token);
    return token;
  }

  async getUserProfile(email: string): Promise<User> {
    return await this.authRepository.findOne({ email: email });
  }

  async signIn(authInput: AuthInput): Promise<AuthResponse> {
    const user = await this.authRepository.findOne({ email: authInput.email });
    if (user && (await bcrypt.compare(authInput.password, user.password))) {
      const token = jwt.sign(
        { email: user.email, firstName: user.firstName },
        'secret',
      );
      const response: AuthResponse = {
        token: token,
        message: 'User logged-in successfully',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return response;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }

    //   if (!user) {
    //     throw new NotFoundException(`User not found`);
    //   }
    //   const token = jwt.sign(
    //     { email: user.email, firstName: user.firstName },
    //     'secret',
    //   );
    //   // console.log('token : ', token);
    //   const response: AuthResponse = {
    //     token: token,
    //     message: 'User logged-in successfully',
    //     email: user.email,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //   };
    //   return response;
  }
}
