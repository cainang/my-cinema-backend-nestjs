import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Session]),
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'RABBIT_CONNECT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'enterTicket',
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
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
