// src/routes/SignUp/index.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import * as S from './styles';
import { useSignUp, EProfileType } from './useSignUp';
import { formatPhone } from './utils/formatPhone';

import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';

import { IconButton } from '@components/molecules/IconButton';
import { EIconButtonType } from '@components/molecules/IconButton/types';
import { Icon } from '@assets/icons';

import { InputField } from '@components/organisms/InputField';
import { ProfileTypeCard } from '@components/molecules/ProfileTypeCard';

import { Button } from '@components/molecules/Button';
import { EButtonType } from '@components/molecules/Button/styles';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import TuyaService from '@native-modules/tuya/TuyaModule';
import { Alert } from 'react-native';

export const SignUp = () => {
  const {
    control,
    errors,
    isValid,
    isSubmitting,
    passwordStrength,
    passwordStrengthLabel,
    passwordProgress,
    passwordRequirements,
    email,
    onSubmit,
    handleGoBack,
  } = useSignUp();

  console.log('tuyaaa email??', email);

  const handleSendVerifyCode = async () => {
    try {
      //const email = getValues("email");

      if (!email) {
        //Alert.alert("Erro", "Informe o e-mail primeiro");
        return;
      }

      await TuyaService.sendVerifyCode(
        email,
        'BR', // region (hardcoded)
        '55', // countryCode (Brazil)
      );

      Alert.alert('Sucesso', 'Código de verificação enviado!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o código');
    }
  };

  return (

    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
  >
    <S.Container>
        <S.Scroll keyboardShouldPersistTaps="handled">
          <NavigationHeader headerText="CADASTRO" goBack={handleGoBack} />
          <S.Header>
            <S.Title variant="headingLarge">Crie sua conta</S.Title>
            <S.Description variant="bodyLargeRegular">
              Crie sua conta e conecte seus dispositivos em poucos minutos.
            </S.Description>
          </S.Header>

          {/* Social login */}
          <S.SocialMediaContainer>
            <IconButton
              icon={Icon.google}
              type={EIconButtonType.SECONDARY}
              iconHeight={20}
              iconWidth={20}
            />
            <IconButton
              icon={Icon.apple}
              type={EIconButtonType.SECONDARY}
              iconHeight={20}
              iconWidth={20}
            />
            <IconButton
              icon={Icon.facebook}
              type={EIconButtonType.SECONDARY}
              iconHeight={20}
              iconWidth={20}
            />
          </S.SocialMediaContainer>

          {/* Divider */}
          <S.DividerContainer>
            <S.DividerLine />
            <S.DividerLabel variant="bodyMediumRegular">ou</S.DividerLabel>
            <S.DividerLine />
          </S.DividerContainer>

          {/* Tipo de perfil */}
          <S.SectionLabel variant="bodyMediumBold">
            Tipo de perfil *
          </S.SectionLabel>

          <S.ProfileTypeContainer>
            <Controller
              control={control}
              name="profileType"
              render={({ field: { value, onChange } }) => (
                <>
                  <ProfileTypeCard
                    title="Proprietário"
                    description="Quero acompanhar e controlar meus equipamentos e seus parâmetros."
                    icon={Icon.home}
                    selected={value === EProfileType.OWNER}
                    onPress={() => onChange(EProfileType.OWNER)}
                  />
                  <ProfileTypeCard
                    title="Técnico"
                    description="Sou responsável por instalar, configurar ou dar suporte remoto a equipamentos."
                    icon={Icon.briefcase}
                    selected={value === EProfileType.TECHNICIAN}
                    onPress={() => onChange(EProfileType.TECHNICIAN)}
                  />
                </>
              )}
            />
          </S.ProfileTypeContainer>

          {/* Campos principais */}
          <S.InputContainer>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="Nome completo"
                  required={!!errors.fullName?.message}
                  value={value}
                  onChangeText={onChange}
                  placeholder="João Paulo de Souza"
                  type="text"
                  autoCapitalize="words"
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="E-mail"
                  required={!!errors.email?.message}
                  value={value}
                  onChangeText={onChange}
                  placeholder="joaopaulo@gmail.com"
                  type="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <S.VerifyButton onPress={handleSendVerifyCode}>
              <S.VerifyButtonText>Enviar código de verificação</S.VerifyButtonText>
            </S.VerifyButton>

            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="Telefone/WhatsApp"
                  required={!!errors.phone?.message}
                  value={value}
                  onChangeText={text => onChange(formatPhone(text))}
                  placeholder="+55 (51) 9 9580-3785"
                  type="tel"
                  keyboardType="phone-pad"
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </S.InputContainer>

          {/* Senha */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <InputField
                label="Senha"
                required={!!errors.password?.message}
                value={value}
                onChangeText={onChange}
                placeholder="••••••••"
                type={'password'}
                errorMessage={errors.password?.message}
              />
            )}
          />

          {/* Força da senha */}
          <S.PasswordSection>
            <S.PasswordStrengthLabelRow>
              <S.PasswordStrengthLabel variant="bodySmallBold">
                Força da senha
              </S.PasswordStrengthLabel>

              {!!passwordStrengthLabel && (
                <S.PasswordStrengthValue
                  variant="bodySmallBold"
                  strength={passwordStrength}
                >
                  {passwordStrengthLabel}
                </S.PasswordStrengthValue>
              )}
            </S.PasswordStrengthLabelRow>

            <S.PasswordStrengthBarBackground>
              <S.PasswordStrengthBarFill
                progress={passwordProgress}
                strength={passwordStrength}
              />
            </S.PasswordStrengthBarBackground>

            <S.PasswordRequirements>
              {passwordRequirements.map(item => (
                <S.RequirementItem
                  key={item.text}
                  variant="bodySmallRegular"
                  hasError={item.error}
                >
                  {item.error ? '• ' : '✓ '}
                  {item.text}
                </S.RequirementItem>
              ))}
            </S.PasswordRequirements>
          </S.PasswordSection>

          {/* Confirmar senha */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <InputField
                label="Confirmar senha"
                required={!!errors.confirmPassword?.message}
                value={value}
                onChangeText={onChange}
                placeholder="••••••••"
                type={'password'}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="verificationCode"
            rules={{
              required: "Código obrigatório",
              maxLength: {
                value: 6,
                message: "O código deve ter 6 dígitos",
              },
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Somente números (6 dígitos)",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <InputField
                label="Código de verificação"
                required={!!errors.verificationCode?.message}
                value={value}
                onChangeText={(text) => {
                  // keep only numbers and limit to 6 digits
                  const numeric = text.replace(/\D/g, "").slice(0, 6);
                  onChange(numeric);
                }}
                placeholder="123456"
                keyboardType="number-pad"
                errorMessage={errors.verificationCode?.message}
              />
            )}
          />

          {/* Termos */}
          <Controller
            control={control}
            name="acceptTerms"
            render={({ field: { value, onChange } }) => (
              <>
                <S.TermsRow onPress={() => onChange(!value)}>
                  <S.TermsCheckbox checked={value} />
                  <S.TermsText variant="bodySmallRegular">
                    Li e aceito os{' '}
                    <S.TermsLink variant="bodySmallRegular">
                      Termos de Uso
                    </S.TermsLink>{' '}
                    e{' '}
                    <S.TermsLink variant="bodySmallRegular">
                      Política de Privacidade
                    </S.TermsLink>
                  </S.TermsText>
                </S.TermsRow>

                {!!errors.acceptTerms?.message && (
                  <S.TermsError variant="bodySmallRegular">
                    {errors.acceptTerms.message}
                  </S.TermsError>
                )}
              </>
            )}
          />

          {/* Botão principal */}
          <S.Footer>
            <Button
              buttonType={EButtonType.PRIMARY}
              label="Criar conta"
              onPress={onSubmit}
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
            />
          </S.Footer>

          {/* Link para login */}
          <S.BottomText variant="bodyMediumRegular">
            Já tem uma conta?{' '}
            <S.BottomLink variant="bodyMediumBold">Faça login</S.BottomLink>
          </S.BottomText>
        </S.Scroll>
    </S.Container>

    </KeyboardAvoidingView>
  );
};
