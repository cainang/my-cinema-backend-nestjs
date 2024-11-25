import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../config/config.module';
import User from '../users/entities/user.entity';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Room } from '../rooms/entities/room.entity';
import { Film } from '../films/entities/film.entity';
import { Session } from '../sessions/entities/session.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Configuration>) => ({
        type: configService.get('database.type', { infer: true }) as any,
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.username', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        synchronize: configService.get('database.synchronize', { infer: true }),
        entities: [User, Cinema, Room, Film, Session, Ticket],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
