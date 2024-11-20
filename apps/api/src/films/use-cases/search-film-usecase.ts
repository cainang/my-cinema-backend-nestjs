import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../films.repository';

@Injectable()
export class SearchFilmUseCase {
  constructor(
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute(id: string) {
    return await this.filmsRepo.get(id);
  }
}
