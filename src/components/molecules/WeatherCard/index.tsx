import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@components/atoms/Text';
import { IconSvg } from '@components/atoms/IconSvg';
import { weatherActions } from '@store/modules/weather/weatherActions';
import { weatherSelectors } from '@store/modules/weather/weatherSelectors';
import { getWeatherIcon } from './weatherIcons';
import * as S from './styles';

type WeatherCardProps = {
  latitude?: number;
  longitude?: number;
  city?: string;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  latitude,
  longitude,
  city,
}) => {
  const dispatch = useDispatch();

  // Conecta com Redux
  const weather = useSelector(weatherSelectors.getData);
  const loading = useSelector(weatherSelectors.getLoading);
  const error = useSelector(weatherSelectors.getError);

  // Busca clima ao montar o componente
  useEffect(() => {
    dispatch(
      weatherActions.fetchWeatherRequest({
        latitude,
        longitude,
        city,
      }),
    );
  }, [latitude, longitude, city, dispatch]);

  // Estado de loading
  if (loading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <ActivityIndicator size="large" color="#0891B2" />
          <Text variant="bodyMediumRegular" color="#666">
            Buscando clima...
          </Text>
        </S.LoadingContainer>
      </S.Container>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <Text variant="bodyMediumRegular" color="#EF4444">
            {error}
          </Text>
          <S.RetryButton
            onPress={() =>
              dispatch(
                weatherActions.fetchWeatherRequest({
                  latitude,
                  longitude,
                  city,
                }),
              )
            }
          >
            <Text variant="bodySmallRegular" color="#0891B2">
              Tentar novamente
            </Text>
          </S.RetryButton>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  // Sem dados
  if (!weather) {
    return null;
  }

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <S.Container>
      <S.LocationRow>
        <Text variant="bodyMediumRegular" color="#666">
          {weather.city}, {weather.state}
        </Text>
        <Text variant="bodySmallRegular" color="#999">
          Atualizado há {weather.lastUpdate}
        </Text>
      </S.LocationRow>

      <S.TemperatureRow>
        <S.TemperatureContainer>
          <Text variant="headingMedium">
            {Math.round(weather.temperature)}°
          </Text>
          <Text variant="bodyMediumRegular" color="#666">
            Umidade {weather.humidity}%
          </Text>
        </S.TemperatureContainer>

        <S.IconContainer>
          <IconSvg icon={WeatherIcon} height={64} width={64} />
        </S.IconContainer>
      </S.TemperatureRow>

      <S.DescriptionRow>
        <Text variant="bodyMediumRegular" color="#666">
          {weather.description}
        </Text>
      </S.DescriptionRow>
    </S.Container>
  );
};
