import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class UsersService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async create(createUserDto: CreateUserDto) {
    await this.rabbitmqService.start();
    console.log(createUserDto);

    const data = { pattern: 'createUser', data: createUserDto };
    await this.rabbitmqService.publishInExchange(
      'my-cinema',
      'rk-cinema',
      JSON.stringify(data),
    );
    return createUserDto;
  }

  async findAll() {
    await this.rabbitmqService.start();
    const data = { pattern: 'findAllUsers', data: {} };
    let res: any;
    await this.rabbitmqService.consume('mycinema', (message) => {
      res = message.content;
    });
    return res;
  }

  async findOne(id: number) {
    await this.rabbitmqService.start();
    const data = { pattern: 'findOneUsers', data: id };
    await this.rabbitmqService.publishInExchange(
      'my-cinema',
      'rk-cinema',
      JSON.stringify(data),
    );
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.rabbitmqService.start();
    const data = { pattern: 'updateUser', data: updateUserDto };
    await this.rabbitmqService.publishInExchange(
      'my-cinema',
      'rk-cinema',
      JSON.stringify(data),
    );
    return `Usuário com o id #${id} foi atualizado!`;
  }

  async remove(id: number) {
    await this.rabbitmqService.start();
    const data = { pattern: 'removeUser', data: id };
    await this.rabbitmqService.publishInExchange(
      'my-cinema',
      'rk-cinema',
      JSON.stringify(data),
    );
    return `Usuário com o id #${id} foi removido`;
  }
}
