import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [UsersModule, TicketsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
