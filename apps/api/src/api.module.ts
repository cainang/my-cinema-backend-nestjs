import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
