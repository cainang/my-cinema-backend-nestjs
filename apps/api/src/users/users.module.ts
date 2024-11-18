import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppModule } from 'apps/my-cinema-backend/src/app.module';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './use-cases/create-user-usecase';
import { UserTypeOrmRepository } from './users.repository';
import { DeleteUserUseCase } from './use-cases/delete-user-usecase';
import { EditUserUseCase } from './use-cases/edit-user-usecase';
import { FindAllUsersUseCase } from './use-cases/find-all-users-usecase';
import { SearchUserUseCase } from './use-cases/search-user-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    FindAllUsersUseCase,
    SearchUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
    AppModule,
  ],
})
export class UsersModule {}
