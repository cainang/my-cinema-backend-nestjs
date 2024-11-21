import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';

@Injectable()
export class FindAllSessionsUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute() {
    return await this.sessionsRepo.getAll();
  }
}
