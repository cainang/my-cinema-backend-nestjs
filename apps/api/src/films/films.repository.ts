import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';

export default interface IFilmsRepository {
  getAll(): Promise<Film[] | []>;
  get(id: string): Promise<Film | undefined>;
  create(filmCreate: Film): Promise<Film>;
  edit(filmUpdate: Film): Promise<Film>;
  delete(filmDelete: Film): Promise<boolean>;
}

export class FilmsTypeOrmRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private typeOrmRepo: Repository<Film>,
  ) {}

  async get(id: string): Promise<Film | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getAll(): Promise<Film[]> {
    return this.typeOrmRepo.find();
  }
  async edit(filmUpdate: Film): Promise<Film> {
    return this.typeOrmRepo.save(filmUpdate);
  }
  async create(filmCreate: Film): Promise<Film> {
    return this.typeOrmRepo.save(filmCreate);
  }
  async delete(filmDelete: Film): Promise<boolean> {
    return (await this.typeOrmRepo.delete(filmDelete)).affected > 0;
  }
}
