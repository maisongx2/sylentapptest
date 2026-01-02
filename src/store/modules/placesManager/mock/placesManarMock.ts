import { IHome, IRoom, IDevice, EDeviceType } from '../placesManagerTypes';

export const devicesMock: IDevice[] = [
  {
    id: 'device-1',
    name: 'Bomba Principal',
    type: EDeviceType.PUMP,
    roomId: 'room-1',
    status: 'online',
    metadata: {
      power: '1.5HP',
      voltage: '220V',
    },
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: 'device-2',
    name: 'Sensor de pH',
    type: EDeviceType.SENSOR,
    roomId: 'room-1',
    status: 'online',
    metadata: {
      currentPH: 7.2,
      minPH: 7.0,
      maxPH: 7.6,
    },
    createdAt: '2025-01-01T10:05:00Z',
  },
  {
    id: 'device-3',
    name: 'Aquecedor Solar',
    type: EDeviceType.HEATER,
    roomId: 'room-1',
    status: 'offline',
    metadata: {
      targetTemp: 28,
      currentTemp: 25,
    },
    createdAt: '2025-01-01T10:10:00Z',
  },
  {
    id: 'device-4',
    name: 'Iluminação LED',
    type: EDeviceType.LIGHT,
    roomId: 'room-2',
    status: 'online',
    metadata: {
      color: 'RGB',
      brightness: 80,
    },
    createdAt: '2025-01-01T10:15:00Z',
  },
  {
    id: 'device-5',
    name: 'Sensor de Temperatura',
    type: EDeviceType.SENSOR,
    roomId: 'room-3',
    status: 'online',
    metadata: {
      currentTemp: 26.5,
      humidity: 65,
    },
    createdAt: '2025-01-01T10:20:00Z',
  },
  {
    id: 'device-6',
    name: 'Bomba de Cloro',
    type: EDeviceType.PUMP,
    roomId: 'room-3',
    status: 'online',
    metadata: {
      chlorineLevel: 1.5,
    },
    createdAt: '2025-01-01T10:25:00Z',
  },
];

export const roomsMock: IRoom[] = [
  {
    roomId: 'room-1',
    icon: 'WavesLadder',
    name: 'Área da Piscina Principal',
    homeId: 'home-1',
    devices: [devicesMock[0], devicesMock[1], devicesMock[2]],
    createdAt: '2025-01-01T09:00:00Z',
  },
  {
    roomId: 'room-2',
    icon: 'CookingPot',
    name: 'Área Gourmet',
    homeId: 'home-1',
    devices: [devicesMock[3]],
    createdAt: '2025-01-01T09:05:00Z',
  },
  {
    roomId: 'room-3',
    icon: 'WavesLadder',
    name: 'Piscina Infantil',
    homeId: 'home-2',
    devices: [devicesMock[4], devicesMock[5]],
    createdAt: '2025-01-01T09:10:00Z',
  },
  {
    roomId: 'room-4',
    icon: 'ThermometerSun',
    name: 'Sauna',
    homeId: 'home-2',
    devices: [],
    createdAt: '2025-01-01T09:15:00Z',
  },
  {
    roomId: 'room-5',
    icon: 'WavesLadder',
    name: 'Piscina Olímpica',
    homeId: 'home-3',
    devices: [],
    createdAt: '2025-01-01T09:20:00Z',
  },
];

export const homesMock: IHome[] = [
  {
    homeId: 'home-1',
    name: 'Clube Recreativo São Paulo',
    rooms: [roomsMock[0], roomsMock[1]],
    createdAt: '2025-01-01T08:00:00Z',
  },
  {
    homeId: 'home-2',
    name: 'Sítio Recanto Verde',
    rooms: [roomsMock[2], roomsMock[3]],
    createdAt: '2025-01-01T08:05:00Z',
  },
  {
    homeId: 'home-3',
    name: 'Hotel Fazenda Águas Claras',
    rooms: [roomsMock[4]],
    createdAt: '2025-01-01T08:10:00Z',
  },
  {
    homeId: 'home-4',
    name: 'Casa de Praia - Guarujá',
    rooms: [],
    createdAt: '2025-01-01T08:15:00Z',
  },
];

export const placesManagerDataMock = {
  homes: homesMock,
  selectedHome: homesMock[0],
};
