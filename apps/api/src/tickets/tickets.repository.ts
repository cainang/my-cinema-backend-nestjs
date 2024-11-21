import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

export default interface ITicketsRepository {
  getAll(): Promise<Ticket[]>;
  get(id: string): Promise<Ticket | undefined>;
  getBySession(id: string): Promise<Ticket[] | []>;
  create(ticketCreate: Ticket): Promise<Ticket>;
  delete(ticketDelete: Ticket): Promise<boolean>;
}

export class TicketsTypeOrmRepository implements ITicketsRepository {
  constructor(
    @InjectRepository(Ticket)
    private typeOrmRepo: Repository<Ticket>,
  ) {}

  async get(id: string): Promise<Ticket | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getBySession(id: string): Promise<Ticket[] | []> {
    return this.typeOrmRepo.find({ where: { session: { id } } });
  }
  async getAll(): Promise<Ticket[]> {
    return this.typeOrmRepo.find();
  }
  async create(ticketCreate: Ticket): Promise<Ticket> {
    return this.typeOrmRepo.save(ticketCreate);
  }
  async delete(ticketDelete: Ticket): Promise<boolean> {
    return (await this.typeOrmRepo.delete(ticketDelete)).affected > 0;
  }
}
