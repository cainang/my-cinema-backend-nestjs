import { Inject, Injectable } from '@nestjs/common';
import IRoomRepository from '../rooms.repository';

@Injectable()
export class FindAllRoomsUseCase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute() {
    return await this.roomRepo.getAll();
  }
}
