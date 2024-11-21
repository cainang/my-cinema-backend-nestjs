import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UseTicketDto } from './dto/use-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(@Inject('RABBIT_CONNECT') private rabbitmqService: ClientProxy) {}

  async useTicket(ticket: UseTicketDto) {
    console.log(ticket);

    try {
      const data = { pattern: 'useTicket', data: ticket };
      this.rabbitmqService.emit('useTicket', ticket);
      return { message: 'Mensagem Enviada' };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
