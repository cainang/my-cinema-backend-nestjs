import { Inject, Injectable } from '@nestjs/common';
import ITicketsRepository from '../tickets.repository';

@Injectable()
export class FindTicketsbySessionUseCase {
  constructor(
    @Inject('ITicketsRepository')
    private readonly ticketsRepo: ITicketsRepository,
  ) {}

  async execute(sessionId: string) {
    return await this.ticketsRepo.getBySession(sessionId);
  }
}
