import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../films.repository';

@Injectable()
export class DeleteFilmUseCase {
  constructor(
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute(id: string) {
    const film = await this.filmsRepo.get(id);

    if (!film) {
      throw new Error('Film not exists');
    }
    const removeQuery = await this.filmsRepo.delete(film);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'Film remove successful' };
    } else {
      data = { message: 'Film not removed' };
    }

    return data;
  }
}
