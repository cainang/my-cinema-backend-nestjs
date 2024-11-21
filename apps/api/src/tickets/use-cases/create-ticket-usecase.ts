import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../entities/ticket.entity';
import ITicketsRepository from '../tickets.repository';
import ISessionsRepository from '../../sessions/sessions.repository';

@Injectable()
export class CreateTicketUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(input: CreateTicketDto) {
    const sessionSearched = await this.sessionsRepo.get(input.sessionId);
    if (!sessionSearched) {
      throw new Error('Session not exist');
    }

    const ticket = new Ticket(input);
    ticket.session = sessionSearched;
    await this.ticketsRepo.create(ticket);
    return ticket;
  }
}
