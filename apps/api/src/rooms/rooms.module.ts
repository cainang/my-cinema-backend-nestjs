import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Room } from './entities/room.entity';
import { CinemaTypeOrmRepository } from '../cinema/cinema.repository';
import { RoomTypeOrmRepository } from './rooms.repository';
import { CreateRoomUseCase } from './use-cases/create-room-usecase';
import { DeleteRoomUseCase } from './use-cases/delete-room-usecase';
import { EditRoomUseCase } from './use-cases/edit-room-usecase';
import { EnterRoomUseCase } from './use-cases/enter-room-usecase';
import { FindAllRoomsUseCase } from './use-cases/find-all-rooms-usecase';
import { FindRoomsByCinemaUseCase } from './use-cases/find-room-by-cinema-usecase';
import { SearchRoomUseCase } from './use-cases/search-room-usecase';
import { CleanRoomUseCase } from './use-cases/clean-room-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema, Room])],
  controllers: [RoomsController],
  providers: [
    CreateRoomUseCase,
    DeleteRoomUseCase,
    EditRoomUseCase,
    EnterRoomUseCase,
    FindAllRoomsUseCase,
    FindRoomsByCinemaUseCase,
    SearchRoomUseCase,
    CleanRoomUseCase,
    RoomTypeOrmRepository,
    CinemaTypeOrmRepository,
    {
      provide: 'IRoomRepository',
      useExisting: RoomTypeOrmRepository,
    },
    {
      provide: 'ICinemaRepository',
      useExisting: CinemaTypeOrmRepository,
    },
    RoomsService,
  ],
})
export class RoomsModule {}
