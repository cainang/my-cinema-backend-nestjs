import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() data: CreateUserDto, @Ctx() context: RmqContext) {
    console.log('Mensagem recebida:', data);
    return this.usersService.create(data);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
