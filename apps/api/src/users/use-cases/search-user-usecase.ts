import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '../users.repository';

@Injectable()
export class SearchUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string) {
    return await this.userRepo.get(id);
  }
}
