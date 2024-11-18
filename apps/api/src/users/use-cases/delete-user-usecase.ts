import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '../users.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.get(id);

    if (!user) {
      throw new Error('User not exists');
    }
    const removeQuery = await this.userRepo.delete(user);

    let data: { message: string };
    if (removeQuery) {
      data = { message: 'User remove successful' };
    } else {
      data = { message: 'User not removed' };
    }

    return data;
  }
}
