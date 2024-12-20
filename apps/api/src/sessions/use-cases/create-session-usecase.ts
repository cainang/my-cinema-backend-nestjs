import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';
import { CreateSessionDto } from '../dto/create-session.dto';
import { Session } from '../entities/session.entity';
import IRoomRepository from '../../rooms/rooms.repository';
import IFilmsRepository from '../../films/films.repository';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute(input: CreateSessionDto) {
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.openHour))
      throw new Error('Invalid open hour');
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.closeHour))
      throw new Error('Invalid close hour');

    const roomSearched = await this.roomRepo.get(input.roomId);
    if (!roomSearched) {
      throw new Error('Room not exist');
    }
    const filmSearched = await this.filmsRepo.get(input.filmId);
    if (!filmSearched) {
      throw new Error('Film not exist');
    }

    const session = new Session(input);
    session.room = roomSearched;
    session.film = filmSearched;
    await this.sessionsRepo.create(session);
    return session;
  }
}
