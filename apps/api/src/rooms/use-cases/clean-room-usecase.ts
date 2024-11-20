import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';

@Injectable()
export class CleanRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string) {
    const roomSearched = await this.roomRepo.get(id);

    if (!roomSearched) {
      throw new Error('Room not exists');
    }

    const newCapacity = 0;

    roomSearched.capacity = newCapacity;

    await this.roomRepo.edit(roomSearched);
    return roomSearched;
  }
}
