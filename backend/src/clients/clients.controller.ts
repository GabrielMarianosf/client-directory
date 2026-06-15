import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { QueryClientsDto } from './dto/query-clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(@Query() query: QueryClientsDto) {
    return this.clientsService.findAll(query);
  }

  @Get('states')
  getStates() {
    return this.clientsService.getStates();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(Number(id));
  }
}
