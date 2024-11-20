import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

export default interface IRoomRepository {
  getAll(): Promise<Room[]>;
  get(id: string): Promise<Room | undefined>;
  getByCinema(id: string): Promise<Room[] | []>;
  create(roomCreate: Room): Promise<Room>;
  edit(roomUpdate: Room): Promise<Room>;
  delete(roomDelete: Room): Promise<boolean>;
}

export class RoomTypeOrmRepository implements IRoomRepository {
  constructor(
    @InjectRepository(Room)
    private typeOrmRepo: Repository<Room>,
  ) {}

  async get(id: string): Promise<Room | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getByCinema(id: string): Promise<Room[] | []> {
    return this.typeOrmRepo.find({ where: { cinema: { id } } });
  }
  async getAll(): Promise<Room[]> {
    return this.typeOrmRepo.find();
  }
  async edit(roomUpdate: Room): Promise<Room> {
    return this.typeOrmRepo.save(roomUpdate);
  }
  async create(roomCreate: Room): Promise<Room> {
    return this.typeOrmRepo.save(roomCreate);
  }
  async delete(roomDelete: Room): Promise<boolean> {
    return (await this.typeOrmRepo.delete(roomDelete)).affected > 0;
  }
}
