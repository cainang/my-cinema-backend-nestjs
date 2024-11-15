import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppModule } from 'apps/my-cinema-backend/src/app.module';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, AppModule],
})
export class UsersModule {}
