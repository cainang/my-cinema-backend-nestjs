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
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateCinemaUseCase } from './use-cases/create-cinema-usecase';
import { DeleteCinemaUseCase } from './use-cases/delete-cinema-usecase';
import { EditCinemaUseCase } from './use-cases/edit-cinema-usecase';
import { FindAllCinemaUseCase } from './use-cases/find-all-cinemas-usecase';
import { SearchCinemaUseCase } from './use-cases/search-cinema-usecase';
import { FindCinemasByUserUseCase } from './use-cases/find-cinemas-by-user-usecase';

@Controller('cinema')
export class CinemaController {
  @Inject(CreateCinemaUseCase)
  private readonly createCinemaUseCase: CreateCinemaUseCase;
  @Inject(DeleteCinemaUseCase)
  private readonly deleteCinemaUseCase: DeleteCinemaUseCase;
  @Inject(EditCinemaUseCase)
  private readonly editCinemaUseCase: EditCinemaUseCase;
  @Inject(FindAllCinemaUseCase)
  private readonly findAllCinemaUseCase: FindAllCinemaUseCase;
  @Inject(SearchCinemaUseCase)
  private readonly searchCinemaUseCase: SearchCinemaUseCase;
  @Inject(FindCinemasByUserUseCase)
  private readonly findCinemasByUserUseCase: FindCinemasByUserUseCase;

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.createCinemaUseCase.execute(createCinemaDto);
  }

  @Get()
  findAll() {
    return this.findAllCinemaUseCase.execute();
  }

  @Get('/user/:userid')
  findByUser(@Param('userid') userId: string) {
    return this.findCinemasByUserUseCase.execute(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchCinemaUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.editCinemaUseCase.execute(id, updateCinemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCinemaUseCase.execute(id);
  }
}
