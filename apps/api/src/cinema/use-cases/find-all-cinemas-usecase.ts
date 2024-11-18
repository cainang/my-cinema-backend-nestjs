import { Inject, Injectable } from '@nestjs/common';
import ICinemaRepository from '../cinema.repository';

@Injectable()
export class FindAllCinemaUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute() {
    return await this.cinemaRepo.getAll();
  }
}
