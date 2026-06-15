export interface IClientAddress {
  street: string
  city: string
  state: string
  postcode: number
  latitude: string
  longitude: string
  timezoneOffset: string
  timezoneDescription: string
}

export interface IClientPicture {
  large: string
  medium: string
  thumbnail: string
}

export interface IClientBirthDate {
  date: string
  age: number
}

export interface IClientRegistered {
  date: string
  yearsRegistered: number
}

export interface IClient {
  id: number
  fullName: string
  title: string
  gender: string
  email: string
  phone: string
  cell: string
  address: IClientAddress
  picture: IClientPicture
  birthDate: IClientBirthDate
  registered: IClientRegistered
}

export interface IClientsResponse {
  total: number
  page: number
  limit: number
  data: IClient[]
}

export interface IClientsQuery {
  page?: number
  limit?: number
  state?: string
  name?: string
  sortBy?: 'name' | 'registeredAt'
  sortOrder?: 'asc' | 'desc'
}
