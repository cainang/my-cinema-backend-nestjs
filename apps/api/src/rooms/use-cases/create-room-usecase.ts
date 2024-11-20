import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';
import { CreateRoomDto } from '../dto/create-room.dto';
import { Room } from '../entities/room.entity';
import ICinemaRepository from '../../cinema/cinema.repository';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
    @Inject('ICinemaRepository')
    private readonly cinemaRepo: ICinemaRepository,
  ) {}

  async execute(input: CreateRoomDto) {
    const cinemaSearched = await this.cinemaRepo.get(input.cinemaId);
    if (!cinemaSearched) {
      throw new Error('Cinema not exist');
    }
    const room = new Room(input);
    room.cinema = cinemaSearched;
    await this.roomRepo.create(room);
    return room;
  }
}
