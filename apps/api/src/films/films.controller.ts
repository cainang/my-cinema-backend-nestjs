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
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CreateFilmUseCase } from './use-cases/create-film-usecase';
import { DeleteFilmUseCase } from './use-cases/delete-film-usecase';
import { EditFilmUseCase } from './use-cases/edit-film-usecase';
import { FindAllFilmsUseCase } from './use-cases/find-all-films-usecase';
import { SearchFilmUseCase } from './use-cases/search-film-usecase';

@Controller('films')
export class FilmsController {
  @Inject(CreateFilmUseCase)
  private readonly createFilmUseCase: CreateFilmUseCase;
  @Inject(DeleteFilmUseCase)
  private readonly deleteFilmUseCase: DeleteFilmUseCase;
  @Inject(EditFilmUseCase)
  private readonly editFilmUseCase: EditFilmUseCase;
  @Inject(FindAllFilmsUseCase)
  private readonly findAllFilmsUseCase: FindAllFilmsUseCase;
  @Inject(SearchFilmUseCase)
  private readonly searchFilmUseCase: SearchFilmUseCase;

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.createFilmUseCase.execute(createFilmDto);
  }

  @Get()
  findAll() {
    return this.findAllFilmsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchFilmUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.editFilmUseCase.execute(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteFilmUseCase.execute(id);
  }
}
