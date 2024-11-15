import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from 'apps/my-cinema-backend/src/app.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'RABBIT_CONNECT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'mycinema',
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AppModule],
})
export class UsersModule {}
