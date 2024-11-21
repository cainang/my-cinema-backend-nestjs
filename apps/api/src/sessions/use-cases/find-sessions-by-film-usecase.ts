import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';

@Injectable()
export class FindSessionsByFilmUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(filmId: string) {
    return await this.sessionsRepo.getByFilm(filmId);
  }
}
