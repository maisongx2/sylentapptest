import React from 'react';
import * as S from './styles';
import { useAddRoom } from './useAddRoom';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import { Text } from '@components/atoms/Text';
import { Dropdown } from '@components/atoms/Dropdown';
import { Button } from '@components/molecules/Button';
import { Icon } from '@components/atoms/Icon';
import { Controller } from 'react-hook-form';
import { EButtonType } from '@components/molecules/Button/styles';
import { InputField } from '@components/organisms/InputField';

export const AddRoom = () => {
  const {
    control,
    errors,
    isSubmitting,
    isValid,
    currentIcon,
    roomTypes,
    handleGoBack,
    handleCancel,
    onSubmit,
  } = useAddRoom();

  return (
    <S.Container>
      <NavigationHeader headerText="CADASTRO DE CÔMODO" goBack={handleGoBack} />

      <S.Content>
        <S.Header>
          <Text variant="bodyLargeBold">Cadastrar novo cômodo</Text>
          <Text variant="bodySmallRegular" color="neutral600">
            Defina o nome e as informações do cômodo para adicioná-lo a sua
            casa.
          </Text>
        </S.Header>

        <S.Form>
          {/* Nome do cômodo */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Nome do cômodo"
                value={value}
                onChangeText={onChange}
                placeholder="Sala de estar"
                required
                errorMessage={errors.name?.message}
              />
            )}
          />

          <S.Field>
            <S.Label>
              <Text variant="bodySmallBold">Tipo do cômodo</Text>
              <S.RequiredMark>*</S.RequiredMark>
            </S.Label>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  value={value}
                  options={roomTypes}
                  onChange={option => onChange(option.label)}
                  placeholder="Sala"
                />
              )}
            />
            {errors.type?.message && (
              <S.ErrorText>{errors.type.message}</S.ErrorText>
            )}
          </S.Field>

          <S.Field>
            <S.Label>
              <Text variant="bodySmallBold">Preview do ícone</Text>
            </S.Label>
            <S.IconPreview>
              <S.IconPreviewContainer>
                <Icon name={currentIcon} size={24} />
              </S.IconPreviewContainer>
              <Controller
                control={control}
                name="type"
                render={({ field: { value } }) => (
                  <Text variant="bodySmallRegular" color="neutral600">
                    {value || 'Sala'}
                  </Text>
                )}
              />
            </S.IconPreview>
          </S.Field>

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Descrição do cômodo"
                value={value}
                onChangeText={onChange}
                placeholder="Sala de estar, andar inferior."
                required
                multiline
                numberOfLines={3}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </S.Form>

        <S.Actions>
          <Button
            label="Salvar"
            onPress={onSubmit}
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
            buttonType={EButtonType.PRIMARY}
          />
          <Button
            label="Cancelar"
            onPress={handleCancel}
            buttonType={EButtonType.SECONDARY}
          />
        </S.Actions>
      </S.Content>
    </S.Container>
  );
};
