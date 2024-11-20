import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../films.repository';
import { CreateFilmDto } from '../dto/create-film.dto';
import { Film } from '../entities/film.entity';

@Injectable()
export class CreateFilmUseCase {
  constructor(
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute(input: CreateFilmDto) {
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.timeDuration))
      throw new Error('Invalid time duration hour');

    const film = new Film(input);
    await this.filmsRepo.create(film);
    return film;
  }
}
