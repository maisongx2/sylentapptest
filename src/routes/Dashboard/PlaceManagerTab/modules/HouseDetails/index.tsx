import React from 'react';
import * as S from './styles';
import { useHouseDetails } from './useHouseDetails';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import { RoomCard } from '@components/molecules/RoomCard';
import { Text } from '@components/atoms/Text';

export const HouseDetails = () => {
  const { houseName, rooms, handleGoBack, handleAddRoom, handleRoomPress } =
    useHouseDetails();

  return (
    <S.Container>
      <NavigationHeader
        headerText={`${houseName}`}
        goBack={handleGoBack}
        rightAction={{
          icon: { name: 'Plus' },
          onPress: handleAddRoom,
        }}
      />

      <S.Content>
        <S.SectionHeader>
          <Text variant="bodyMediumBold">Cômodo(s)</Text>
        </S.SectionHeader>

        <S.RoomList>
          {rooms?.map(room => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              icon={room.icon}
              devicesCount={room.devicesCount}
              onPress={() => handleRoomPress(room.id)}
              showChevron={room.devicesCount > 0}
              dropDownMenuActions={room.dropDownMenuActions}
            />
          ))}
        </S.RoomList>
      </S.Content>
    </S.Container>
  );
};
