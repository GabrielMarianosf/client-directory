import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Cron jobs
    ScheduleModule.forRoot(),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
