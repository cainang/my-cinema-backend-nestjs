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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomUseCase } from './use-cases/create-room-usecase';
import { DeleteRoomUseCase } from './use-cases/delete-room-usecase';
import { EditRoomUseCase } from './use-cases/edit-room-usecase';
import { FindAllRoomsUseCase } from './use-cases/find-all-rooms-usecase';
import { FindRoomsByCinemaUseCase } from './use-cases/find-room-by-cinema-usecase';
import { SearchRoomUseCase } from './use-cases/search-room-usecase';
import { EnterRoomUseCase } from './use-cases/enter-room-usecase';
import { EnterRoomDto } from './dto/enter-room.dto';
import { CleanRoomUseCase } from './use-cases/clean-room-usecase';

@Controller('rooms')
export class RoomsController {
  @Inject(CreateRoomUseCase)
  private readonly createRoomUseCase: CreateRoomUseCase;
  @Inject(DeleteRoomUseCase)
  private readonly deleteRoomUseCase: DeleteRoomUseCase;
  @Inject(EditRoomUseCase)
  private readonly editRoomUseCase: EditRoomUseCase;
  @Inject(EnterRoomUseCase)
  private readonly enterRoomUseCase: EnterRoomUseCase;
  @Inject(FindAllRoomsUseCase)
  private readonly findAllRoomsUseCase: FindAllRoomsUseCase;
  @Inject(FindRoomsByCinemaUseCase)
  private readonly findRoomsByCinemaUseCase: FindRoomsByCinemaUseCase;
  @Inject(SearchRoomUseCase)
  private readonly searchRoomUseCase: SearchRoomUseCase;
  @Inject(CleanRoomUseCase)
  private readonly cleanRoomUseCase: CleanRoomUseCase;

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.createRoomUseCase.execute(createRoomDto);
  }

  @Get()
  findAll() {
    return this.findAllRoomsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchRoomUseCase.execute(id);
  }

  @Get('/cinema/:cinemaid')
  findByCinema(@Param('cinemaid') cinemaId: string) {
    return this.findRoomsByCinemaUseCase.execute(cinemaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.editRoomUseCase.execute(id, updateRoomDto);
  }

  @Patch('/enter/:id')
  enterRoom(@Param('id') id: string, @Body() enterRoomDto: EnterRoomDto) {
    return this.enterRoomUseCase.execute(id, enterRoomDto);
  }

  @Patch('/clean/:id')
  cleanRoom(@Param('id') id: string) {
    return this.cleanRoomUseCase.execute(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteRoomUseCase.execute(id);
  }
}
