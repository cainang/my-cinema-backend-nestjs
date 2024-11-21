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
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSessionUseCase } from './use-cases/create-session-usecase';
import { EditSessionUseCase } from './use-cases/edit-session-usecase';
import { FindAllSessionsUseCase } from './use-cases/find-all-sessions-usecase';
import { FindSessionsByFilmUseCase } from './use-cases/find-sessions-by-film-usecase';
import { FindSessionsByRoomsUseCase } from './use-cases/find-sessions-by-room-usecase';
import { SearchSessionUseCase } from './use-cases/search-session-usecase';
import { DeleteSessionUseCase } from './use-cases/delete-session-usecase';

@Controller('sessions')
export class SessionsController {
  @Inject(CreateSessionUseCase)
  private readonly createSessionUseCase: CreateSessionUseCase;
  @Inject(DeleteSessionUseCase)
  private readonly deleteSessionUseCase: DeleteSessionUseCase;
  @Inject(EditSessionUseCase)
  private readonly editSessionUseCase: EditSessionUseCase;
  @Inject(FindAllSessionsUseCase)
  private readonly findAllSessionsUseCase: FindAllSessionsUseCase;
  @Inject(FindSessionsByFilmUseCase)
  private readonly findSessionsByFilmUseCase: FindSessionsByFilmUseCase;
  @Inject(FindSessionsByRoomsUseCase)
  private readonly findSessionsByRoomsUseCase: FindSessionsByRoomsUseCase;
  @Inject(SearchSessionUseCase)
  private readonly searchSessionUseCase: SearchSessionUseCase;

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.createSessionUseCase.execute(createSessionDto);
  }

  @Get()
  findAll() {
    return this.findAllSessionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchSessionUseCase.execute(id);
  }

  @Get('/film/:filmId')
  findByFilm(@Param('filmId') id: string) {
    return this.findSessionsByFilmUseCase.execute(id);
  }

  @Get('/room/:roomId')
  findByRoom(@Param('roomId') id: string) {
    return this.findSessionsByRoomsUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.editSessionUseCase.execute(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteSessionUseCase.execute(id);
  }
}
