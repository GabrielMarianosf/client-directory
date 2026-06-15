export interface IClientName {
  title: string;
  first: string;
  last: string;
}

export interface IClientLocation {
  street: string;
  city: string;
  state: string;
  postcode: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

export interface IClientPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IClient {
  gender: string;
  name: IClientName;
  location: IClientLocation;
  email: string;
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: IClientPicture;
}

export interface IClientsApiResponse {
  results: IClient[];
}
