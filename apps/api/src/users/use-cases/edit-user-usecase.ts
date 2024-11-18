import { Inject, Injectable } from '@nestjs/common';
import IUserRepository from '../users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class EditUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string, input: UpdateUserDto) {
    const userSearched = await this.userRepo.get(id);

    if (!userSearched) {
      throw new Error('User not exists');
    }

    if (input.name) {
      userSearched.name = input.name;
    }

    if (input.email) {
      userSearched.email = input.email;
    }

    if (input.password) {
      userSearched.password = input.password;
    }

    await this.userRepo.edit(userSearched);
    return userSearched;
  }
}
