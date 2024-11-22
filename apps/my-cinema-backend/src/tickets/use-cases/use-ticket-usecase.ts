import { Inject, Injectable } from '@nestjs/common';
import ITicketsRepository from '../tickets.repository';
import { UseTicketDto } from '../dto/use-ticket.dto';

@Injectable()
export class UseTicketUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
  ) {}

  async execute(input: UseTicketDto) {
    const ticketSearched = await this.ticketsRepo.get(input.id);

    if (!ticketSearched) {
      throw new Error('Ticket not exists');
    }

    ticketSearched.used = true;

    await this.ticketsRepo.useTicket(ticketSearched);
    return ticketSearched;
  }
}
