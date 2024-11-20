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

    let newCapacity = 0;
    if (input.capacityToAdd) {
      newCapacity = roomSearched.capacity + input.capacityToAdd;
    } else {
      throw new Error('capacityToAdd not valid!');
    }

    if (newCapacity > roomSearched.maxCapacity)
      throw new Error('Invalid capacity to room!');

    roomSearched.capacity = newCapacity;

    await this.roomRepo.edit(roomSearched);
    return roomSearched;
  }
}
