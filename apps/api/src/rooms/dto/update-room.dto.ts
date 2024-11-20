import { PartialType } from '@nestjs/mapped-types';

class _UpdateRoomDto {
  name: string;
  maxCapacity: number;
}

export class UpdateRoomDto extends PartialType(_UpdateRoomDto) {
  name?: string;
  maxCapacity?: number;
}
