import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmsTypeOrmRepository } from './films.repository';
import { CreateFilmUseCase } from './use-cases/create-film-usecase';
import { DeleteFilmUseCase } from './use-cases/delete-film-usecase';
import { EditFilmUseCase } from './use-cases/edit-film-usecase';
import { FindAllFilmsUseCase } from './use-cases/find-all-films-usecase';
import { SearchFilmUseCase } from './use-cases/search-film-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [
    CreateFilmUseCase,
    DeleteFilmUseCase,
    EditFilmUseCase,
    FindAllFilmsUseCase,
    SearchFilmUseCase,
    FilmsTypeOrmRepository,
    {
      provide: 'IFilmsRepository',
      useExisting: FilmsTypeOrmRepository,
    },
    FilmsService,
  ],
})
export class FilmsModule {}
