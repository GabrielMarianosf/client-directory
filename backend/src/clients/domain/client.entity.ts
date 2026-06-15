export class ClientEntity {
  constructor(
    public readonly id: number,
    public readonly fullName: string,
    public readonly title: string,
    public readonly gender: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly cell: string,
    public readonly address: {
      street: string;
      city: string;
      state: string;
      postcode: number;
      latitude: string;
      longitude: string;
      timezoneOffset: string;
      timezoneDescription: string;
    },
    public readonly picture: {
      large: string;
      medium: string;
      thumbnail: string;
    },
    public readonly birthDate: {
      date: string;
      age: number;
    },
    public readonly registered: {
      date: string;
      yearsRegistered: number;
    },
  ) {}
}
