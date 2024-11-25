import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../config/config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBIT_MODULE',
        useFactory: (configService: ConfigService<Configuration>) => ({
          name: 'RABBIT_CONNECT',
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get('rabbitmq.uri', { infer: true }).toString(),
            ],
            queue: configService.get('rabbitmq.queue', { infer: true }),
            noAck: configService.get('rabbitmq.noack', { infer: true }),
            queueOptions: {
              durable: configService.get('rabbitmq.durable', { infer: true }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {}
