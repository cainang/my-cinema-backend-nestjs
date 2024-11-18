import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';

export default interface IUserRepository {
  getAll(): Promise<User[]>;
  get(id: string): Promise<User | undefined>;
  create(userCreate: User): Promise<User>;
  edit(userUpdate: User): Promise<User>;
  delete(userDelete: User): Promise<boolean>;
}

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  async edit(userUpdate: User): Promise<User> {
    return this.typeOrmRepo.save(userUpdate);
  }
  async get(id: string): Promise<User | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getAll(): Promise<User[]> {
    return this.typeOrmRepo.find();
  }
  async create(userCreate: User): Promise<User> {
    return this.typeOrmRepo.save(userCreate);
  }

  async delete(userDelete: User): Promise<boolean> {
    return (await this.typeOrmRepo.delete(userDelete)).affected > 0;
  }
}
