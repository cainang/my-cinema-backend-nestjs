import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../config/config.module';
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
        synchronize: false,
        entities: [Ticket],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
