import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';

@Injectable()
export class SearchRoomUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string) {
    return await this.roomRepo.get(id);
  }
}
