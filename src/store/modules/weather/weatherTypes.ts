export enum EWeatherActionTypes {
  FETCH_WEATHER_REQUEST = '@weather/FETCH_WEATHER_REQUEST',
  FETCH_WEATHER_SUCCESS = '@weather/FETCH_WEATHER_SUCCESS',
  FETCH_WEATHER_FAILURE = '@weather/FETCH_WEATHER_FAILURE',
  CLEAR_WEATHER = '@weather/CLEAR_WEATHER',
}

export type WeatherData = {
  // Temperatura
  temperature: number; // Temperatura atual (°C)
  feelsLike: number; // Sensação térmica (°C)

  // Umidade e pressão
  humidity: number; // Umidade relativa (%)
  pressure: number; // Pressão atmosférica (hPa)

  // Vento
  windSpeed: number; // Velocidade do vento (km/h)

  // Descrição
  description: string; // Descrição em português (ex: "Céu limpo")
  condition: WeatherCondition; // Condição simplificada para ícone
  weatherCode: number; // Código WMO original (0-99)

  // Localização
  city: string; // Nome da cidade
  state?: string; // Estado/Província (ex: "São Paulo", "Rio de Janeiro") - NOVO! ✨
  country: string; // Código do país (ex: "BR")
  countryName?: string; // Nome do país (ex: "Brasil") - NOVO! ✨
  latitude: number; // Latitude
  longitude: number; // Longitude

  // Timestamp
  lastUpdate: string; // Última atualização (formato relativo)
  timestamp: number; // Timestamp Unix (para cache)
};

// Condições climáticas simplificadas
export type WeatherCondition =
  | 'clear' // Céu limpo
  | 'clouds' // Nublado
  | 'rain' // Chuva
  | 'drizzle' // Garoa
  | 'thunderstorm' // Tempestade
  | 'snow' // Neve
  | 'mist' // Névoa
  | 'fog'; // Neblina

export interface IWeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export type WeatherPayload = {
  data?: WeatherData;
  error?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
};

export type WeatherAction = {
  type: EWeatherActionTypes;
  payload?: WeatherPayload;
};

export type IWeatherReducer = (
  state: IWeatherState,
  action: WeatherAction,
) => IWeatherState;
