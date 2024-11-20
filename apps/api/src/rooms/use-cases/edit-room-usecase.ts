import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';
import { UpdateRoomDto } from '../dto/update-room.dto';

@Injectable()
export class EditRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string, input: UpdateRoomDto) {
    const roomSearched = await this.roomRepo.get(id);

    if (!roomSearched) {
      throw new Error('Room not exists');
    }

    if (input.name) {
      roomSearched.name = input.name;
    }

    if (input.maxCapacity) {
      roomSearched.maxCapacity = input.maxCapacity;
    }

    await this.roomRepo.edit(roomSearched);
    return roomSearched;
  }
}
