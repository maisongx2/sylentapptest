// src/routes/SignUp/form/signUpSchema.ts
import * as yup from 'yup';
import { EProfileType } from '../types';
import { passwordRules } from './passwordRules';

const sanitizeInput = (value: string | undefined) => {
  if (!value) return value;
  return value
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 255);
};

export const signUpSchema = yup.object({
  profileType: yup
    .mixed<EProfileType>()
    .oneOf(Object.values(EProfileType))
    .required('Selecione um tipo de perfil.'),

  fullName: yup
    .string()
    .trim()
    .transform(sanitizeInput)
    .required('Informe seu nome completo.')
    .test('full-name', 'Informe nome e sobrenome.', value => {
      if (!value) return false;
      const names = value.trim().split(' ').filter(n => n.length > 0);
      return names.length >= 2;
    }),

  email: yup
    .string()
    .trim()
    .transform(sanitizeInput)
    .email('E-mail inválido.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'E-mail inválido.'
    )
    .required('Informe seu e-mail.'),

  phone: yup
    .string()
    .trim()
    .required('Informe seu telefone.')
    .test('valid-phone', 'Telefone inválido.', value => {
      if (!value) return false;
      const numbers = value.replace(/\D/g, '');
      return numbers.length >= 10 && numbers.length <= 13;
    }),

  password: yup
    .string()
    .required('Informe uma senha.')
    .test('password-rules', 'A senha não atende aos requisitos mínimos.', value => {
      const pwd = value ?? '';
      return passwordRules.every(rule => rule.test(pwd));
    }),

  confirmPassword: yup
    .string()
    .required('Confirme sua senha.')
    .oneOf([yup.ref('password')], 'As senhas não conferem.'),

  verificationCode: yup
    .string()
    .required('Código de verificação obrigatório.')
    .matches(/^[0-9]{6}$/, 'O código deve conter 6 números.'),

  acceptTerms: yup
    .boolean()
    .required()
    .oneOf([true], 'Você precisa aceitar os Termos de Uso.'),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
