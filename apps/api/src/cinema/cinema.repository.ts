import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from './entities/cinema.entity';

export default interface ICinemaRepository {
  getAll(): Promise<Cinema[]>;
  get(id: string): Promise<Cinema | undefined>;
  getByUser(id: string): Promise<Cinema[] | []>;
  create(userCreate: Cinema): Promise<Cinema>;
  edit(userUpdate: Cinema): Promise<Cinema>;
  delete(userDelete: Cinema): Promise<boolean>;
}

export class CinemaTypeOrmRepository implements ICinemaRepository {
  constructor(
    @InjectRepository(Cinema)
    private typeOrmRepo: Repository<Cinema>,
  ) {}

  async get(id: string): Promise<Cinema | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getByUser(id: string): Promise<Cinema[] | []> {
    return this.typeOrmRepo.find({ where: { user: { id } } });
  }
  async getAll(): Promise<Cinema[]> {
    return this.typeOrmRepo.find();
  }
  async edit(userUpdate: Cinema): Promise<Cinema> {
    return this.typeOrmRepo.save(userUpdate);
  }
  async create(userCreate: Cinema): Promise<Cinema> {
    return this.typeOrmRepo.save(userCreate);
  }
  async delete(userDelete: Cinema): Promise<boolean> {
    return (await this.typeOrmRepo.delete(userDelete)).affected > 0;
  }
}
