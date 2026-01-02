import { Icon } from '@assets/icons';

/**
 * Mapeia condições climáticas para ícones
 * Adapte os nomes dos ícones aos disponíveis no seu projeto
 */
export const getWeatherIcon = (condition: string): any => {
  const iconMap: { [key: string]: any } = {
    clear: Icon.sun || Icon.sunny,
    clouds: Icon.cloud || Icon.cloudy,
    rain: Icon.rain || Icon.rainy,
    drizzle: Icon.drizzle || Icon.rain,
    thunderstorm: Icon.thunderstorm || Icon.storm,
    snow: Icon.snow || Icon.snowy,
    mist: Icon.mist || Icon.fog,
    fog: Icon.fog || Icon.mist,
  };

  // Fallback para ícone padrão se não encontrar
  return iconMap[condition] || Icon.cloud || Icon.google;
};

/**
 * Retorna descrição amigável da condição
 */
export const getWeatherDescription = (condition: string): string => {
  const descriptions: { [key: string]: string } = {
    clear: 'Céu limpo',
    clouds: 'Nublado',
    rain: 'Chuva',
    drizzle: 'Garoa',
    thunderstorm: 'Tempestade',
    snow: 'Neve',
    mist: 'Neblina',
    fog: 'Névoa',
  };

  return descriptions[condition] || 'Tempo bom';
};
