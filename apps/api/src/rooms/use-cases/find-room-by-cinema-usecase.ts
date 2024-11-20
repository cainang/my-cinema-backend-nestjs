import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';

@Injectable()
export class FindRoomsByCinemaUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(cinemaId: string) {
    return await this.roomRepo.getByCinema(cinemaId);
  }
}
