import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TicketsService {
  constructor(@Inject('RABBIT_CONNECT') private rabbitmqService: ClientProxy) {}

  async create(createTicketDto: CreateTicketDto) {
    console.log(createTicketDto);

    const data = { pattern: 'createUser', data: createTicketDto };
    this.rabbitmqService.emit('createUser', createTicketDto);
    return createTicketDto;
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
