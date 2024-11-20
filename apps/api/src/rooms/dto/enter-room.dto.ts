import { PartialType } from '@nestjs/mapped-types';

class _EnterRoomDto {
  capacity: number;
}

export class EnterRoomDto extends PartialType(_EnterRoomDto) {
  capacity?: number;
}
