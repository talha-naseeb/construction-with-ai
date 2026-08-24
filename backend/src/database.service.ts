import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

@Injectable()
export class DatabaseService {
  private database: NeonHttpDatabase<typeof schema> | null = null;

  constructor(private readonly config: ConfigService) {}

  get db() {
    if (!this.database) {
      this.database = drizzle(
        neon(this.config.getOrThrow<string>('DATABASE_URL')),
        { schema },
      );
    }

    return this.database;
  }

  async isReady() {
    try {
      await this.db.execute('select 1');
      return true;
    } catch {
      return false;
    }
  }
}
