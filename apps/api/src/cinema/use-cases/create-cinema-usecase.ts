import { Inject, Injectable } from '@nestjs/common';
import ICinemaRepository from '../cinema.repository';
import { CreateCinemaDto } from '../dto/create-cinema.dto';
import { Cinema } from '../entities/cinema.entity';
import IUserRepository from '../../users/users.repository';

@Injectable()
export class CreateCinemaUseCase {
  constructor(
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: CreateCinemaDto) {
    const userSearched = await this.userRepo.get(input.userId);
    if (!userSearched) {
      throw new Error('User not exist');
    }
    const cinema = new Cinema(input);
    cinema.user = userSearched;
    await this.cinemaRepo.create(cinema);
    return cinema;
  }
}
