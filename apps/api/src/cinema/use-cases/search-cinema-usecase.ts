import { Inject, Injectable } from '@nestjs/common';
import ICinemaRepository from '../cinema.repository';

@Injectable()
export class SearchCinemaUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute(id: string) {
    return await this.cinemaRepo.get(id);
  }
}
