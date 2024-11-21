import { Inject, Injectable } from '@nestjs/common';
import ITicketsRepository from '../tickets.repository';

@Injectable()
export class SearchTicketUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
  ) {}

  async execute(id: string) {
    return await this.ticketsRepo.get(id);
  }
}
