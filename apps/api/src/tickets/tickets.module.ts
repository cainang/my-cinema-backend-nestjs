import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketsTypeOrmRepository } from './tickets.repository';
import { CreateTicketUseCase } from './use-cases/create-ticket-usecase';
import { DeleteTicketUseCase } from './use-cases/delete-ticket-usecase';
import { FindAllTicketsUseCase } from './use-cases/find-all-tickets-usecase';
import { FindTicketsbySessionUseCase } from './use-cases/find-tickets-by-room-usecase';
import { SearchTicketUseCase } from './use-cases/search-ticket-usecase';
import { SessionsTypeOrmRepository } from '../sessions/sessions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Session } from '../sessions/entities/session.entity';
import { RabbitMqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMqModule, TypeOrmModule.forFeature([Ticket, Session])],
  controllers: [TicketsController],
  providers: [
    CreateTicketUseCase,
    DeleteTicketUseCase,
    FindAllTicketsUseCase,
    FindTicketsbySessionUseCase,
    SearchTicketUseCase,
    TicketsTypeOrmRepository,
    {
      provide: 'ITicketsRepository',
      useExisting: TicketsTypeOrmRepository,
    },
    SessionsTypeOrmRepository,
    {
      provide: 'ISessionsRepository',
      useExisting: SessionsTypeOrmRepository,
    },
    TicketsService,
  ],
})
export class TicketsModule {}
