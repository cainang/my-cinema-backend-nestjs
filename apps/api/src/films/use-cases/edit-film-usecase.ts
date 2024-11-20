import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../films.repository';
import { UpdateFilmDto } from '../dto/update-film.dto';

@Injectable()
export class EditFilmUseCase {
  constructor(
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute(id: string, input: UpdateFilmDto) {
    const filmSearched = await this.filmsRepo.get(id);

    if (!filmSearched) {
      throw new Error('Film not exists');
    }

    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.timeDuration))
      throw new Error('Invalid time duration hour');

    if (input.name) {
      filmSearched.name = input.name;
    }

    if (input.category) {
      filmSearched.category = input.category;
    }

    if (input.timeDuration) {
      filmSearched.timeDuration = input.timeDuration;
    }

    await this.filmsRepo.edit(filmSearched);
    return filmSearched;
  }
}
