import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('RABBIT_CONNECT') private rabbitmqService: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    const data = { pattern: 'createUser', data: createUserDto };
    this.rabbitmqService.emit('createUser', createUserDto);
    return createUserDto;
  }

  async findAll() {
    const data = { pattern: 'findAllUsers', data: {} };

    return this.rabbitmqService
      .emit(data.pattern, data.data)
      .pipe(timeout(5000));
  }

  async findOne(id: number) {
    const data = { pattern: 'findOneUsers', data: id };
    this.rabbitmqService.emit(data.pattern, data.data);
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = { pattern: 'updateUser', data: updateUserDto };
    this.rabbitmqService.emit(data.pattern, data.data);
    return `Usuário com o id #${id} foi atualizado!`;
  }

  async remove(id: number) {
    const data = { pattern: 'removeUser', data: id };
    this.rabbitmqService.emit(data.pattern, data.data);
    return `Usuário com o id #${id} foi removido`;
  }
}
