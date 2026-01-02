import React from 'react';
import * as S from './styles';
import { useHouseList } from './useHouseList';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import { HouseCard } from '@components/molecules/HouseCard';
import { HouseManagement } from '../HouseManagement';

export const HouseList = () => {
  const { houseCards } = useHouseList();

  if (!houseCards.length) return <HouseManagement />;

  return (
    <S.Container>
      <NavigationHeader headerText={'Gerenciar casas'} />

      <S.Content
        data={houseCards}
        renderItem={({ item }) => <HouseCard {...item} />}
        keyExtractor={item => `houseCard-${item.id}`}
      />
    </S.Container>
  );
};
