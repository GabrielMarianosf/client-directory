import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IClientsApiResponse } from './interfaces/client.interface';
import { ClientEntity } from './domain/client.entity';
import { ClientMapper } from './mappers/client.mapper';
import { QueryClientsDto } from './dto/query-clients.dto';
import { UF_TO_STATE } from './mappers/uf.map';

@Injectable()
export class ClientsService implements OnModuleInit {
  private clients: ClientEntity[] = [];
  private readonly PAGINATION_DEFAULT_PAGE: number;
  private readonly PAGINATION_DEFAULT_LIMIT: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.PAGINATION_DEFAULT_PAGE = this.configService.getOrThrow<number>(
      'PAGINATION_DEFAULT_PAGE',
    );
    this.PAGINATION_DEFAULT_LIMIT = this.configService.getOrThrow<number>(
      'PAGINATION_DEFAULT_LIMIT',
    );
  }

  async onModuleInit() {
    await this.loadClients();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async loadClients() {
    const url = this.configService.get<string>('CLIENTS_API_URL');

    if (!url) {
      console.error(
        '[ClientsService] CLIENTS_API_URL is not defined in environment variables.',
      );
      return;
    }

    const response = await firstValueFrom(
      this.httpService.get<IClientsApiResponse>(url),
    );

    this.clients = response.data.results.map((raw, index) =>
      ClientMapper.toDomain(raw, index),
    );

    console.log(`[ClientsService] ${this.clients.length} clients loaded.`);
  }

  findAll(query: QueryClientsDto) {
    const {
      page = this.PAGINATION_DEFAULT_PAGE,
      limit = this.PAGINATION_DEFAULT_LIMIT,
      state,
      name,
      sortBy = 'name',
      sortOrder = 'asc',
    } = query;

    let filtered = this.clients;

    if (state) {
      const normalized =
        UF_TO_STATE[state.toUpperCase()] ?? state.toLowerCase();
      filtered = filtered.filter((c) =>
        c.address.state.toLowerCase().includes(normalized),
      );
    }

    if (name) {
      filtered = filtered.filter((c) =>
        c.fullName.toLowerCase().includes(name.toLowerCase()),
      );
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.fullName.localeCompare(b.fullName, 'pt-BR');
      } else if (sortBy === 'registeredAt') {
        comparison =
          new Date(a.registered.date).getTime() -
          new Date(b.registered.date).getTime();
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);

    return { total, page, limit, data };
  }

  getStates(): string[] {
    const states = [...new Set(this.clients.map((c) => c.address.state))];
    return states.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  findOne(id: number) {
    const client = this.clients.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client #${id} not found`);
    return client;
  }
}
