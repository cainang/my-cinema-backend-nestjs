import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  name?: string;
  category?: string;
  timeDuration?: string;
}
