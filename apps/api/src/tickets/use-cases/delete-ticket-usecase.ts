import { Inject, Injectable } from '@nestjs/common';
import ITicketsRepository from '../tickets.repository';

@Injectable()
export class DeleteTicketUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
  ) {}

  async execute(id: string) {
    const ticket = await this.ticketsRepo.get(id);

    if (!ticket) {
      throw new Error('Ticket not exists');
    }
    const removeQuery = await this.ticketsRepo.delete(ticket);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'Ticket remove successful' };
    } else {
      data = { message: 'Ticket not removed' };
    }

    return data;
  }
}
