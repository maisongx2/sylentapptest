import React from 'react';
import * as S from './styles';
import { Modal } from 'react-native';
import { DropDownMenuProps } from './types';
import { useDropDownMenu } from './useDropDownMenu';

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  visible,
  onClose,
  actions,
  buttonPosition,
}) => {
  const { handleActionPress, width, setWidth } = useDropDownMenu({
    visible,
    onClose,
    actions,
    buttonPosition,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <S.Overlay onPress={onClose}>
        <S.MenuContainer
          buttonPosition={buttonPosition}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
          width={width}
        >
          {actions.map((action, index) => {
            const isDestructive = action.variant === 'destructive';
            const showDivider = index < actions.length - 1;

            return (
              <React.Fragment key={`${index}-DropDownMenu-${action.label}`}>
                <S.MenuItem onPress={() => handleActionPress(action)}>
                  <S.IconWrapper variant={action.variant}>
                    <S.IconOption
                      {...action.icon}
                      isDestructive={isDestructive}
                    />
                  </S.IconWrapper>
                  <S.TextOption isDestructive={isDestructive}>
                    {action.label}
                  </S.TextOption>
                </S.MenuItem>
                {showDivider && <S.Divider />}
              </React.Fragment>
            );
          })}
        </S.MenuContainer>
      </S.Overlay>
    </Modal>
  );
};
