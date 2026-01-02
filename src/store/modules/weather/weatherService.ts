import axios from 'axios';
import { WeatherCondition, WeatherData } from './weatherTypes';

// Open-Meteo API (apenas clima)
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Converte timestamp em "há X minutos"
 */
const getRelativeTime = (): string => {
  return 'agora';
};

/**
 * Mapeia código WMO para condições simplificadas
 * https://open-meteo.com/en/docs
 */
const mapWeatherCondition = (wmoCode: number): WeatherCondition => {
  if (wmoCode === 0) return 'clear';
  if (wmoCode >= 1 && wmoCode <= 3) return 'clouds';
  if (wmoCode >= 45 && wmoCode <= 48) return 'mist';
  if (wmoCode >= 51 && wmoCode <= 57) return 'drizzle';
  if (wmoCode >= 61 && wmoCode <= 67) return 'rain';
  if (wmoCode >= 71 && wmoCode <= 77) return 'snow';
  if (wmoCode >= 80 && wmoCode <= 82) return 'rain';
  if (wmoCode >= 85 && wmoCode <= 86) return 'snow';
  if (wmoCode >= 95 && wmoCode <= 99) return 'thunderstorm';
  return 'clear'; // Fallback
};

/**
 * Mapeia código WMO para descrição em português
 */
const getWeatherDescription = (wmoCode: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Névoa',
    48: 'Névoa com geada',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa intensa',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva intensa',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve intensa',
    80: 'Pancadas de chuva leve',
    81: 'Pancadas de chuva moderada',
    82: 'Pancadas de chuva intensa',
    95: 'Tempestade',
    96: 'Tempestade com granizo leve',
    99: 'Tempestade com granizo intenso',
  };

  return descriptions[wmoCode] || 'Tempo bom';
};

/**
 * ✨ Busca clima por coordenadas
 *
 * IMPORTANTE: Esta função NÃO faz reverse geocoding!
 * O nome da cidade/estado vem do Geocoder nativo na Saga.
 */
const getWeatherByCoords = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  console.log(`🌐 [SERVICE] Buscando clima para: ${lat}, ${lon}`);

  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'weather_code',
        'surface_pressure',
        'wind_speed_10m',
      ].join(','),
      timezone: 'auto',
    },
    timeout: 10000,
  });

  const current = response.data.current;

  console.log(`✅ [SERVICE] Clima obtido:`, {
    temp: current.temperature_2m,
    condition: mapWeatherCondition(current.weather_code),
  });

  // ⚠️ city/state serão sobrescritos pela Saga com dados do Geocoder
  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.surface_pressure),
    windSpeed: Math.round(current.wind_speed_10m),
    description: getWeatherDescription(current.weather_code),
    condition: mapWeatherCondition(current.weather_code),
    city: '', // Será preenchido pela Saga
    state: '', // Será preenchido pela Saga
    country: 'BR', // Padrão Brasil
    latitude: lat,
    longitude: lon,
    lastUpdate: getRelativeTime(),
  };
};

export const weatherService = {
  getWeatherByCoords,
};
