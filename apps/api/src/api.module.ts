import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import User from './users/entities/user.entity';
import { Cinema } from './cinema/entities/cinema.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      entities: [User, Cinema],
      synchronize: true,
    }),
    UsersModule,
    TicketsModule,
    CinemaModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
