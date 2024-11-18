import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import User from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: CreateUserDto) {
    const user = new User(input);
    await this.userRepo.create(user);
    return user;
  }
}
