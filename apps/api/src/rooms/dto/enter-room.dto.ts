import { PartialType } from '@nestjs/mapped-types';

class _EnterRoomDto {
  capacityToAdd: number;
}

export class EnterRoomDto extends PartialType(_EnterRoomDto) {
  capacityToAdd?: number;
}
