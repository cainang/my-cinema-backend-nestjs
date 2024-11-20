import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';
import { EnterRoomDto } from '../dto/enter-room.dto';

@Injectable()
export class EnterRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string, input: EnterRoomDto) {
    const roomSearched = await this.roomRepo.get(id);

    if (!roomSearched) {
      throw new Error('Room not exists');
    }

    if (input.capacity) {
      roomSearched.capacity = input.capacity;
    }

    await this.roomRepo.edit(roomSearched);
    return roomSearched;
  }
}
