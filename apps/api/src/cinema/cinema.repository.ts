import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from './entities/cinema.entity';

export default interface ICinemaRepository {
  getAll(): Promise<Cinema[]>;
  get(id: string): Promise<Cinema | undefined>;
  getByUser(id: string): Promise<Cinema[] | []>;
  create(cinemaCreate: Cinema): Promise<Cinema>;
  edit(cinemaUpdate: Cinema): Promise<Cinema>;
  delete(cinemaDelete: Cinema): Promise<boolean>;
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
  async edit(cinemaUpdate: Cinema): Promise<Cinema> {
    return this.typeOrmRepo.save(cinemaUpdate);
  }
  async create(cinemaCreate: Cinema): Promise<Cinema> {
    return this.typeOrmRepo.save(cinemaCreate);
  }
  async delete(cinemaDelete: Cinema): Promise<boolean> {
    return (await this.typeOrmRepo.delete(cinemaDelete)).affected > 0;
  }
}
