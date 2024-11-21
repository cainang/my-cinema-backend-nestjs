import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';

@Injectable()
export class FindSessionsByRoomsUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(roomId: string) {
    return await this.sessionsRepo.getByRoom(roomId);
  }
}
