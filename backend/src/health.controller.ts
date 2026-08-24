import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async status() {
    if (!(await this.database.isReady())) {
      throw new ServiceUnavailableException({
        status: 'degraded',
        database: 'unavailable',
      });
    }

    return { status: 'ok', database: 'connected' };
  }
}
