import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = new User(createUserDto);

    return this.userRepo.save(newUser);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    return this.userRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id } });

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneOrFail({ where: { id } });
    return this.userRepo.delete(user);
  }
}
