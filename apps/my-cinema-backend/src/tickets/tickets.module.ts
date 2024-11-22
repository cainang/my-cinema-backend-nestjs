import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsTypeOrmRepository } from './tickets.repository';
import { UseTicketUseCase } from './use-cases/use-ticket-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [
    UseTicketUseCase,
    TicketsTypeOrmRepository,
    {
      provide: 'ITicketsRepository',
      useExisting: TicketsTypeOrmRepository,
    },
    TicketsService,
  ],
})
export class TicketsModule {}
