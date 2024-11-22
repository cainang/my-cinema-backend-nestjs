import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { UseTicketDto } from './dto/use-ticket.dto';
import { UseTicketUseCase } from './use-cases/use-ticket-usecase';

@Controller()
export class TicketsController {
  @Inject(TicketsService)
  private readonly ticketsService: TicketsService;
  @Inject(UseTicketUseCase)
  private readonly useTicketUseCase: UseTicketUseCase;

  @MessagePattern('useTicket')
  async useTicket(
    @Payload() useTicketDto: UseTicketDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('Recebido:', useTicketDto);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (useTicketDto.used == false) {
      const changeTicketStatus =
        await this.useTicketUseCase.execute(useTicketDto);
      console.log(changeTicketStatus);

      if (changeTicketStatus.used) {
        channel.assertExchange('my-cinema', 'direct', {
          durable: true,
        });
        channel.publish(
          'my-cinema',
          'email-cinema',
          Buffer.from(
            JSON.stringify({
              email: changeTicketStatus.email,
              name: changeTicketStatus.name,
            }),
          ),
        );
        channel.ack(originalMsg);
      }
    } else {
      channel.ack(originalMsg);
    }
  }
}
