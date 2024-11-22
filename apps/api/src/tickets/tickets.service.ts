import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UseTicketDto } from './dto/use-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(@Inject('RABBIT_CONNECT') private rabbitmqService: ClientProxy) {}

  async useTicket(ticket: UseTicketDto) {
    console.log(ticket);

    try {
      this.rabbitmqService.emit('useTicket', ticket);
      return { message: 'Mensagem Enviada' };
    } catch (error) {
      return error;
    }
  }
}
