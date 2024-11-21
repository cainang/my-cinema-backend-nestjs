import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';

@Injectable()
export class SearchSessionUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(id: string) {
    return await this.sessionsRepo.get(id);
  }
}
