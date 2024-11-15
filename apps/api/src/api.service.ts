import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor() {}
  getHello(): string {
    return 'Hello World';
  }
}
