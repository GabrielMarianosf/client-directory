import { IClient } from '../interfaces/client.interface';
import { ClientEntity } from '../domain/client.entity';

export class ClientMapper {
  static toDomain(raw: IClient, index: number): ClientEntity {
    return new ClientEntity(
      index + 1,
      `${raw.name.first} ${raw.name.last}`,
      raw.name.title,
      raw.gender,
      raw.email,
      raw.phone,
      raw.cell,
      {
        street: raw.location.street,
        city: raw.location.city,
        state: raw.location.state,
        postcode: raw.location.postcode,
        latitude: raw.location.coordinates.latitude,
        longitude: raw.location.coordinates.longitude,
        timezoneOffset: raw.location.timezone.offset,
        timezoneDescription: raw.location.timezone.description,
      },
      raw.picture,
      {
        date: raw.dob.date,
        age: raw.dob.age,
      },
      {
        date: raw.registered.date,
        yearsRegistered: raw.registered.age,
      },
    );
  }
}
