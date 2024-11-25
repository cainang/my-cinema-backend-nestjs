import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);

  const enterTicketQueue =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: process.env.RABBITMQ_QUEUE,
        noAck: Boolean(process.env.RABBITMQ_NOACK),
        queueOptions: {
          durable: Boolean(process.env.RABBITMQ_DURABLE),
        },
      },
    });

  await enterTicketQueue.listen();
}
bootstrap();
