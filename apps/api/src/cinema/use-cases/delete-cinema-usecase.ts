import { Inject, Injectable } from '@nestjs/common';
import ICinemaRepository from '../cinema.repository';

@Injectable()
export class DeleteCinemaUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute(id: string) {
    const cinema = await this.cinemaRepo.get(id);

    if (!cinema) {
      throw new Error('Cinema not exists');
    }
    const removeQuery = await this.cinemaRepo.delete(cinema);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'Cinema remove successful' };
    } else {
      data = { message: 'Cinema not removed' };
    }

    return data;
  }
}
