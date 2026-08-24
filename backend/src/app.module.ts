import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { DatabaseService } from './database.service';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../.env.local', '.env'] })], controllers: [HealthController], providers: [DatabaseService] })
export class AppModule {}
