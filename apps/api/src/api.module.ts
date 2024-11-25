import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { CinemaModule } from './cinema/cinema.module';
import { RoomsModule } from './rooms/rooms.module';
import { FilmsModule } from './films/films.module';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    /* TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      entities: [User, Cinema, Room, Film, Session, Ticket],
      synchronize: true,
    }), */
    ConfigModule.forRoot(),
    DatabaseModule,
    RabbitMqModule,
    UsersModule,
    TicketsModule,
    CinemaModule,
    RoomsModule,
    FilmsModule,
    SessionsModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
