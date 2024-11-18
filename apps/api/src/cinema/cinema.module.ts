import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { CinemaTypeOrmRepository } from './cinema.repository';
import { CreateCinemaUseCase } from './use-cases/create-cinema-usecase';
import { DeleteCinemaUseCase } from './use-cases/delete-cinema-usecase';
import { EditCinemaUseCase } from './use-cases/edit-cinema-usecase';
import { FindAllCinemaUseCase } from './use-cases/find-all-cinemas-usecase';
import { SearchCinemaUseCase } from './use-cases/search-cinema-usecase';
import { UserTypeOrmRepository } from '../users/users.repository';
import { Cinema } from './entities/cinema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { FindCinemasByUserUseCase } from './use-cases/find-cinemas-by-user-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema, User])],
  controllers: [CinemaController],
  providers: [
    CreateCinemaUseCase,
    DeleteCinemaUseCase,
    EditCinemaUseCase,
    FindAllCinemaUseCase,
    SearchCinemaUseCase,
    FindCinemasByUserUseCase,
    CinemaTypeOrmRepository,
    UserTypeOrmRepository,
    {
      provide: 'ICinemaRepository',
      useExisting: CinemaTypeOrmRepository,
    },
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
    CinemaService,
  ],
})
export class CinemaModule {}
