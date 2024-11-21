import { Inject, Injectable } from '@nestjs/common';
import ITicketsRepository from '../tickets.repository';

@Injectable()
export class FindAllTicketsUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
  ) {}

  async execute() {
    return await this.ticketsRepo.getAll();
  }
}
