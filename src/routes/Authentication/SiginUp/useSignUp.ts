// src/routes/SignUp/useSignUp.ts
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from './form/signUpSchema';
import { getPasswordRequirements } from './form/passwordRules';
import { EProfileType, SignUpFormData, PasswordStrength } from './types';
import { useDispatch } from 'react-redux';
import { registerActions } from '@store/modules/register/registerActions';
import { nav } from '@navigation/index';

export { EProfileType };

export const useSignUp = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      profileType: EProfileType.OWNER,
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
      acceptTerms: false,
    },
    resolver: yupResolver(signUpSchema),
  });

  const password = watch('password');
  const email = watch('email');

  // Calcula o score da senha (0-4)
  const passwordScore = useMemo(() => {
    if (!password) return 0;

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  // Define a força da senha
  const passwordStrength = useMemo<PasswordStrength>(() => {
    if (!password) return 'none';
    if (passwordScore <= 1) return 'weak';
    if (passwordScore === 2) return 'medium';
    return 'strong';
  }, [password, passwordScore]);

  // Label da força da senha
  const passwordStrengthLabel = useMemo(() => {
    if (!password) return '';
    if (passwordScore <= 1) return 'Fraca';
    if (passwordScore === 2) return 'Média';
    return 'Forte';
  }, [password, passwordScore]);

  // Progresso da barra (0-100)
  const passwordProgress = useMemo(
    () => (passwordScore / 4) * 100,
    [passwordScore],
  );

  // Requisitos da senha
  const passwordRequirements = useMemo(
    () => getPasswordRequirements(password ?? ''),
    [password],
  );

  const onSubmit = handleSubmit(data => {
    const form = {
      email: data.email,
      password: data.password,
      firstName: data.fullName,
      lastName: data.fullName,
      profileType: data.profileType,
      verificationCode: data.verificationCode,
      whatsapp: data.phone.match(/\d+/g)?.join('') ?? '',
    };
    dispatch(registerActions.registerRequest(form));
  });

  const handleGoBack = () => {
    nav.back();
  };

  return {
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
  };
};
