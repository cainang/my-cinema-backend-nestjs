import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';

@Injectable()
export class DeleteRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string) {
    const room = await this.roomRepo.get(id);

    if (!room) {
      throw new Error('Room not exists');
    }
    const removeQuery = await this.roomRepo.delete(room);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'Room remove successful' };
    } else {
      data = { message: 'Room not removed' };
    }

    return data;
  }
}
