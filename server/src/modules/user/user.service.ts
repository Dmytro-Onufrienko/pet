import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { IUserEntity, UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<IUserEntity>,
  ) {}

  async createUser({ username, password }: CreateUserInput) {
    const registeredUser = await this.getUserByUsername(username);

    if (registeredUser) {
      throw new BadRequestException('User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<IUserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async getUserByUsername(username: string): Promise<IUserEntity> {
    return await this.userRepository.findOneBy({ username });
  }

  async getUserByUsernameWithPassword(username: string): Promise<IUserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }
}
