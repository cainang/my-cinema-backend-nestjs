import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketUseCase } from './use-cases/create-ticket-usecase';
import { DeleteTicketUseCase } from './use-cases/delete-ticket-usecase';
import { FindAllTicketsUseCase } from './use-cases/find-all-tickets-usecase';
import { FindTicketsbySessionUseCase } from './use-cases/find-tickets-by-room-usecase';
import { SearchTicketUseCase } from './use-cases/search-ticket-usecase';

@Controller('tickets')
export class TicketsController {
  @Inject(CreateTicketUseCase)
  private readonly createTicketUseCase: CreateTicketUseCase;
  @Inject(DeleteTicketUseCase)
  private readonly deleteTicketUseCase: DeleteTicketUseCase;
  @Inject(FindAllTicketsUseCase)
  private readonly findAllTicketsUseCase: FindAllTicketsUseCase;
  @Inject(FindTicketsbySessionUseCase)
  private readonly findTicketsbySessionUseCase: FindTicketsbySessionUseCase;
  @Inject(SearchTicketUseCase)
  private readonly searchTicketUseCase: SearchTicketUseCase;

  @Inject(TicketsService)
  private readonly ticketsRabbitMqService: TicketsService;

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.createTicketUseCase.execute(createTicketDto);
  }

  @Get()
  findAll() {
    return this.findAllTicketsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchTicketUseCase.execute(id);
  }

  @Get('/session/:id')
  findBySession(@Param('id') id: string) {
    return this.findTicketsbySessionUseCase.execute(id);
  }

  @Post('/enter-session/:id')
  async enterInSession(@Param('id') id: string) {
    const ticket = await this.searchTicketUseCase.execute(id);

    return this.ticketsRabbitMqService.useTicket(ticket);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTicketUseCase.execute(id);
  }
}
