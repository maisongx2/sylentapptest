import React from 'react';
import * as S from './styles';
import { ProfileTypeCardProps } from './types';
import { useProfileTypeCard } from './useProfileTypeCard';
import { IconSvg } from '@components/atoms/IconSvg';

export const ProfileTypeCard = ({
  title,
  description,
  icon,
  selected,
  onPress,
  disabled,
}: ProfileTypeCardProps) => {
  const { handlePress } = useProfileTypeCard({ disabled, onPress });

  return (
    <S.Container
      activeOpacity={0.8}
      onPress={handlePress}
      selected={selected}
      disabled={disabled}
    >
      <S.IconWrapper>
        <IconSvg icon={icon}/>
      </S.IconWrapper>

      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Content>

      <S.RadioOuter selected={selected}>
        <S.RadioInner selected={selected} />
      </S.RadioOuter>
    </S.Container>
  );
};
