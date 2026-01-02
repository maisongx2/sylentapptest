import React from 'react';
import * as S from './styles';
import { useLogin } from './useLogin';
import { IconButton } from '@components/molecules/IconButton';
import { Icon } from '@assets/icons';
import { EIconButtonType } from '@components/molecules/IconButton/types';
import { Button } from '@components/molecules/Button';
import { EButtonType } from '@components/molecules/Button/styles';
import { InputField } from '@components/organisms/InputField';

export const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    login,
    loading,
    error,
    emailError,
    passwordError,
    goToSignUp,
    goToForgotPassword,
  } = useLogin();

  return (
    <S.Container>
      <S.FormContainer>
        <S.Title variant="headingLarge">Entre na sua conta</S.Title>
        <S.Description variant="bodyLargeRegular">
          Administre seus dispositivos com mais facilidade e segurança.
        </S.Description>

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

        <S.DividerContainer>
          <S.DividerLine />
          <S.DividerLabel variant="bodyMediumRegular">ou</S.DividerLabel>
          <S.DividerLine />
        </S.DividerContainer>

        <S.InputContainer>
          <InputField
            label="Email"
            value={email}            
            required={!!emailError || !!emailError }
            onChangeText={setEmail}
            placeholder="exemplo@email.com"
            type="email"
            errorMessage={emailError}
          />

          <InputField
            label="Senha"
            required={!!passwordError || !!error }
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            type="password"
            errorMessage={passwordError || error || undefined}
          />
        </S.InputContainer>

        <S.ForgotPasswordButton onPress={goToForgotPassword}>
          <S.ForgotPasswordLabel variant="bodyMediumRegular">
            Esqueceu a senha?
          </S.ForgotPasswordLabel>
        </S.ForgotPasswordButton>

        <Button
          buttonType={EButtonType.PRIMARY}
          label="Entrar"
          onPress={login}
          isLoading={loading}
        />
      </S.FormContainer>

      <S.SiginUpButton onPress={goToSignUp}>
        <S.SiginUpLabel variant="bodyMediumRegular">
          Não tem conta?{' '}
        </S.SiginUpLabel>
        <S.SiginBoldLabel variant="bodyMediumRegular">
            Cadastre-se
        </S.SiginBoldLabel>
      </S.SiginUpButton>
    </S.Container>
  );
};
