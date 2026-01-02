import React from 'react';
import * as S from './styles';
import { useButton } from './useButton';

export type ButtonProps = {
  buttonType: S.EButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export const Button = ({
  buttonType = S.EButtonType.TEXT,
  isLoading,
  disabled = false,
  label,
  onPress,
  ...rest
}: ButtonProps) => {
  const { isPressed, setIsPressed } = useButton();
  return (
    <S.Container
      buttonType={buttonType}
      isPressed={isPressed}
      disabled={disabled}
      onPress={() => (disabled ? false : onPress())}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...rest}
    >
      {isLoading ? (
        <S.Loader buttonType={buttonType} height={19} width={19} />
      ) : (
        <S.Label
          variant="bodySmallBold"
          buttonType={buttonType}
          disabled={disabled}
          isPressed={isPressed}
        >
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};
