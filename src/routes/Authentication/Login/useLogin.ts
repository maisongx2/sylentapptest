import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@store/modules/auth/authActions';
import { authSelectors } from '@store/modules/auth/authSelectors';
import { authNav } from '@navigation/index';

export const useLogin = () => {
  const dispatch = useDispatch();

  const loading = useSelector(authSelectors.getLoading);
  const error = useSelector(authSelectors.getError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const validateEmail = useCallback((): boolean => {
    if (!email.trim()) {
      setEmailError('Por favor, informe seu email.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, informe um email válido.');
      return false;
    }

    setEmailError('');
    return true;
  }, [email]);

  const validatePassword = useCallback((): boolean => {
    if (!password.trim()) {
      setPasswordError('Por favor, informe sua senha.');
      return false;
    }

    if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres.');
      return false;
    }

    setPasswordError('');
    return true;
  }, [password]);

  const validateFields = useCallback((): boolean => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    return isEmailValid && isPasswordValid;
  }, [validateEmail, validatePassword]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
    if (error) dispatch(authActions.setError(null));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
    if (error) dispatch(authActions.setError(null));
  };

  const login = useCallback(() => {
    if (!validateFields()) {
      return;
    }

    clearErrors();

    dispatch(
      authActions.loginRequest({
        email,
        password,
      }),
    );
  }, [dispatch, email, password, validateFields]);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    clearErrors();
    dispatch(authActions.setError(null));
  };

  const goToSignUp = () => {
    authNav.toSignUp();
  };

  const goToForgotPassword = () => {
    authNav.toForgotPassword();
  };

  return {
    // Estados locais
    email,
    password,
    emailError,
    passwordError,

    // Estados do Redux
    loading,
    error,

    // Setters
    setEmail: handleEmailChange,
    setPassword: handlePasswordChange,

    // Actions
    login,
    clearFields,
    goToSignUp,
    goToForgotPassword,
  };
};
