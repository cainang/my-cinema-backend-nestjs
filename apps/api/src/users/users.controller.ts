import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user-usecase';
import { DeleteUserUseCase } from './use-cases/delete-user-usecase';
import { EditUserUseCase } from './use-cases/edit-user-usecase';
import { FindAllUsersUseCase } from './use-cases/find-all-users-usecase';
import { SearchUserUseCase } from './use-cases/search-user-usecase';

@Controller('users')
export class UsersController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;
  @Inject(DeleteUserUseCase)
  private readonly deleteUserUseCase: DeleteUserUseCase;
  @Inject(EditUserUseCase)
  private readonly editUserUseCase: EditUserUseCase;
  @Inject(FindAllUsersUseCase)
  private readonly findAllUsersUseCase: FindAllUsersUseCase;
  @Inject(SearchUserUseCase)
  private readonly searchUserUseCase: SearchUserUseCase;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchUserUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.editUserUseCase.execute(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
