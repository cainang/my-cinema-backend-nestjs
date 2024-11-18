import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '../users.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute() {
    return await this.userRepo.getAll();
  }
}
