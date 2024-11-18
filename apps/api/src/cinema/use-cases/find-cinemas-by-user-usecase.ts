import { Inject, Injectable } from '@nestjs/common';
import ICinemaRepository from '../cinema.repository';

@Injectable()
export class FindCinemasByUserUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute(userId: string) {
    return await this.cinemaRepo.getByUser(userId);
  }
}
