import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { Film } from '../films/entities/film.entity';
import { RoomTypeOrmRepository } from '../rooms/rooms.repository';
import { FilmsTypeOrmRepository } from '../films/films.repository';
import { SessionsTypeOrmRepository } from './sessions.repository';
import { CreateSessionUseCase } from './use-cases/create-session-usecase';
import { DeleteSessionUseCase } from './use-cases/delete-session-usecase';
import { EditSessionUseCase } from './use-cases/edit-session-usecase';
import { FindAllSessionsUseCase } from './use-cases/find-all-sessions-usecase';
import { FindSessionsByFilmUseCase } from './use-cases/find-sessions-by-film-usecase';
import { FindSessionsByRoomsUseCase } from './use-cases/find-sessions-by-room-usecase';
import { SearchSessionUseCase } from './use-cases/search-session-usecase';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Room, Film])],
  controllers: [SessionsController],
  providers: [
    CreateSessionUseCase,
    DeleteSessionUseCase,
    EditSessionUseCase,
    FindAllSessionsUseCase,
    FindSessionsByFilmUseCase,
    FindSessionsByRoomsUseCase,
    SearchSessionUseCase,
    SessionsTypeOrmRepository,
    {
      provide: 'ISessionsRepository',
      useExisting: SessionsTypeOrmRepository,
    },
    RoomTypeOrmRepository,
    {
      provide: 'IRoomRepository',
      useExisting: RoomTypeOrmRepository,
    },
    FilmsTypeOrmRepository,
    {
      provide: 'IFilmsRepository',
      useExisting: FilmsTypeOrmRepository,
    },
    SessionsService,
  ],
})
export class SessionsModule {}
