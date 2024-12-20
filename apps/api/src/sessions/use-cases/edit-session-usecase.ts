import { Inject, Injectable } from '@nestjs/common';
import ISessionsRepository from '../sessions.repository';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Injectable()
export class EditSessionUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepo: ISessionsRepository,
  ) {}

  async execute(id: string, input: UpdateSessionDto) {
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.openHour))
      throw new Error('Invalid open hour');
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(input.closeHour))
      throw new Error('Invalid close hour');

    const sessionsSearched = await this.sessionsRepo.get(id);

    if (!sessionsSearched) {
      throw new Error('Session not exists');
    }

    if (input.openHour) {
      sessionsSearched.openHour = input.openHour;
    }

    if (input.closeHour) {
      sessionsSearched.closeHour = input.closeHour;
    }

    if (input.date) {
      sessionsSearched.date = input.date;
    }

    if (input.price) {
      sessionsSearched.price = input.price;
    }

    await this.sessionsRepo.edit(sessionsSearched);
    return sessionsSearched;
  }
}
