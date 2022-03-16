import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseModel } from './user-response.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserResponseModel> {
    const findUser = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (findUser) {
      throw new BadRequestException(`User already exists`);
      // throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    const password = createUserInput.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userRepository.create({
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      email: createUserInput.email,
      role: createUserInput.role,
      exampleField: createUserInput.exampleField,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<UserResponseModel> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async update(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserResponseModel> {
    const user = await this.userRepository.preload({
      userId: userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  // async remove(userId: string): Promise<UserResponseModel> {
  //   const user = await this.findOne(userId);
  //   await this.userRepository.remove(user);

  //   return {
  //     userId: userId,
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     role: '',
  //     exampleField: 0,
  //   };
  // }

  async remove(userId: string): Promise<UserResponseModel> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    await this.userRepository.delete(user);

    return {
      userId: userId,
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      exampleField: 0,
    };
  }
}
