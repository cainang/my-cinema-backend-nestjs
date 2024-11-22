import { Injectable } from '@nestjs/common';
import { UseTicketDto } from './dto/use-ticket.dto';

@Injectable()
export class TicketsService {
  useTicket(useTicketDto: UseTicketDto) {
    console.log(useTicketDto);

    return 'This action adds a new ticket';
  }
}
