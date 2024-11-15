import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from 'apps/my-cinema-backend/src/app.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitmqModule],
  controllers: [UsersController],
  providers: [UsersService, AppModule],
})
export class UsersModule {}
