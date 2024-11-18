import { Inject, Injectable } from '@nestjs/common';
import { UpdateCinemaDto } from '../dto/update-cinema.dto';
import ICinemaRepository from '../cinema.repository';

@Injectable()
export class EditCinemaUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute(id: string, input: UpdateCinemaDto) {
    const cinemaSearched = await this.cinemaRepo.get(id);

    if (!cinemaSearched) {
      throw new Error('Cinema not exists');
    }

    if (input.name) {
      cinemaSearched.name = input.name;
    }

    if (input.location) {
      cinemaSearched.location = input.location;
    }

    await this.cinemaRepo.edit(cinemaSearched);
    return cinemaSearched;
  }
}
