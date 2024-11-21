import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';

@Injectable()
export class DeleteSessionUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(id: string) {
    const session = await this.sessionsRepo.get(id);

    if (!session) {
      throw new Error('Session not exists');
    }
    const removeQuery = await this.sessionsRepo.delete(session);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'Session remove successful' };
    } else {
      data = { message: 'Session not removed' };
    }

    return data;
  }
}
