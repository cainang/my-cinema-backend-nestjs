import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../films.repository';

@Injectable()
export class FindAllFilmsUseCase {
  constructor(
    @Inject('IFilmsRepository')
    private readonly filmsRepo: IFilmsRepository,
  ) {}

  async execute() {
    return await this.filmsRepo.getAll();
  }
}
