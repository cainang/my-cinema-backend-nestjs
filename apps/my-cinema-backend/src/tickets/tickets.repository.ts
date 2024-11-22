import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

export default interface ITicketsRepository {
  get(id: string): Promise<Ticket | undefined>;
  useTicket(ticketDelete: Ticket): Promise<Ticket>;
}

export class TicketsTypeOrmRepository implements ITicketsRepository {
  constructor(
    @InjectRepository(Ticket)
    private typeOrmRepo: Repository<Ticket>,
  ) {}

  async get(id: string): Promise<Ticket> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }

  async useTicket(ticket: Ticket): Promise<Ticket> {
    return this.typeOrmRepo.save(ticket);
  }
}
