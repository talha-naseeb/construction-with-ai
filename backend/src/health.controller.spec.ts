import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DatabaseService } from './database.service';

describe('HealthController', () => {
  const database = {
    isReady: jest.fn(),
  } as unknown as DatabaseService;

  const controller = new HealthController(database);

  beforeEach(() => jest.clearAllMocks());

  it('reports a healthy connected database', async () => {
    jest.spyOn(database, 'isReady').mockResolvedValue(true);

    await expect(controller.status()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
    });
  });

  it('returns service unavailable when the database cannot be reached', async () => {
    jest.spyOn(database, 'isReady').mockResolvedValue(false);

    await expect(controller.status()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
