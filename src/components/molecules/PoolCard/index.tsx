import React from 'react';
import { Text } from '@components/atoms/Text';
import { IconSvg } from '@components/atoms/IconSvg';
import { Icon } from '@assets/icons';
import * as S from './styles';

type PoolCardProps = {
  name: string;
  onPress?: () => void;
  onAddData?: () => void;
};

export const PoolCard: React.FC<PoolCardProps> = ({
  name,
  onPress,
  onAddData,
}) => {
  return (
    <S.Container>
      <S.Header onPress={onPress}>
        <Text variant="headingMedium">{name}</Text>
        <IconSvg icon={Icon.chevronRight} height={24} width={24} />
      </S.Header>

      <S.AddButton onPress={onAddData}>
        <IconSvg icon={Icon.plus} height={20} width={20} color="#fff" />
        <Text variant="bodyMediumRegular" color="#fff" style={{ marginLeft: 8 }}>
          Add data
        </Text>
      </S.AddButton>
    </S.Container>
  );
};
