import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [HttpModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
