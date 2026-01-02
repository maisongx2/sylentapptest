import React from 'react';
import { Modal, FlatList } from 'react-native';
import { Text } from '@components/atoms/Text';
import { Icon } from '@components/atoms/Icon';
import { useDropdown } from './useDropdown';
import * as S from './styles';
import { IconProps } from '../Icon/types';

export type DropdownOption = {
  id: string;
  label: string;
  icon?: IconProps;
  onPress?: () => void;
  disabled?: boolean;
};

type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange?: (option: DropdownOption) => void;
  placeholder?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Selecione',
}) => {
  const { visible, buttonRef, dropdownTop, toggleDropdown, handleSelect } =
    useDropdown(onChange);

  const renderOption = ({ item }: { item: DropdownOption }) => (
    <S.OptionItem onPress={() => handleSelect(item)} disabled={item.disabled}>
      {item.icon && (
        <S.OptionIconContainer>
          <Icon {...item.icon} size={20} />
        </S.OptionIconContainer>
      )}
      <Text variant="bodyMediumRegular">{item.label}</Text>
    </S.OptionItem>
  );

  return (
    <S.Container>
      <S.Button ref={buttonRef} onPress={toggleDropdown}>
        <S.HouseLabel variant="headingMedium">
          {value || placeholder}
        </S.HouseLabel>
        <Icon name={visible ? 'ChevronUp' : 'ChevronDown'} size={20} />
      </S.Button>

      <Modal visible={visible} transparent animationType="none">
        <S.Overlay onPress={() => toggleDropdown()}>
          <S.DropdownContainer style={{ top: dropdownTop }}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item, index) =>
                `dropdownOption${index}-${item.id}`
              }
            />
          </S.DropdownContainer>
        </S.Overlay>
      </Modal>
    </S.Container>
  );
};
