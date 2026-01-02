import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@components/atoms/Text';
import { Dropdown, DropdownOption } from '@components/atoms/Dropdown';
import { BannerCarousel } from '@components/molecules/BannerCarousel';
import { WeatherCard } from '@components/molecules/WeatherCard';
import { PoolCard } from '@components/molecules/PoolCard';
import { IconSvg } from '@components/atoms/IconSvg';
import { Icon } from '@assets/icons';
import * as S from './styles';
import { useHomeTab } from './useHomeTab';
import { TuyaService } from '@services/TuyaService';
import { IHome } from '@store/modules/placesManager/placesManagerTypes';
import { useDispatch } from 'react-redux';
import { placesManagerActions } from '@store/modules/placesManager/placesManagerActions';
import { useHouseDetails } from '../PlaceManagerTab/modules/HouseDetails/useHouseDetails';

export const HomeTab = () => {
  const {
    setSelectedHome,
    showAddMenu,
    setShowAddMenu,
    banners,
    homeOptions,
    addOptions,
  } = useHomeTab();


  const { houseName, rooms} = useHouseDetails();
  const dispatch = useDispatch();
  // TODO to pass the function below into one of the workers

  useEffect(() => {
    const loadTuyaHomes = async () => {
      try {
        const tuyaHomes = await TuyaService.getHomeList();
  
        console.log("tuya homes list", tuyaHomes)
        if (!tuyaHomes || tuyaHomes.length === 0) {
          console.log('No Tuya homes found');
          return;
        }
  
        console.log('WILL GO find homes found');
        const homes: IHome[] = tuyaHomes.map((home: any) => ({
          homeId: String(home.homeId),
          name: home.name,
          rooms: [],
          createdAt: new Date().toISOString(),
        }));
  
        dispatch(
          placesManagerActions.setData({
            homes,
            selectedHome: homes[0],
          }),
        );
      } catch (error) {
        console.error('Failed to load Tuya homes', error);
      }
    };
  
    loadTuyaHomes();
  }, [dispatch]);

  return (
    <S.Container>
      <S.Header>
        <Dropdown
          value={houseName ?? 'Minhas casas'} 
          options={homeOptions}
          onSelect={option => setSelectedHome(option.label)}
        />

        <S.AddButton onPress={() => setShowAddMenu(!showAddMenu)}>
          <IconSvg icon={Icon.plus} height={24} width={24} />
        </S.AddButton>

        {showAddMenu && (
          <S.AddMenuContainer>
            {addOptions.map((option: DropdownOption) => (
              <S.AddMenuItem
                key={option.id}
                onPress={() => {
                  option.onPress?.();
                  setShowAddMenu(false);
                }}
              >
                {option.icon && (
                  <S.AddMenuIconContainer>
                    <IconSvg icon={option.icon} height={20} width={20} />
                  </S.AddMenuIconContainer>
                )}
                <Text variant="bodyMediumRegular">{option.label}</Text>
              </S.AddMenuItem>
            ))}
          </S.AddMenuContainer>
        )}
      </S.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BannerCarousel banners={banners} />

        <S.Section>
          <S.SectionHeader>
            <Text variant="headingLarge">Dashboard</Text>
            <S.EditButton>
              <Text variant="bodyMediumRegular" color="#0891B2">
                Editar
              </Text>
            </S.EditButton>
          </S.SectionHeader>

          <WeatherCard />

          <PoolCard
            name="Minha piscina A"
            onPress={() => console.log('Ver detalhes')}
            onAddData={() => console.log('Adicionar dados')}
          />
        </S.Section>
      </ScrollView>
    </S.Container>
  );
};
