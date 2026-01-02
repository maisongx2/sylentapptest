// src/routes/SignUp/form/passwordRules.ts
export const passwordRules = [
  {
    key: 'length',
    text: 'Mínimo 8 caracteres',
    test: (value: string) => value.length >= 8,
  },
  {
    key: 'uppercase',
    text: 'Pelo menos 1 letra maiúscula',
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    key: 'number',
    text: 'Pelo menos 1 número',
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    key: 'special',
    text: 'Pelo menos 1 caractere especial',
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
] as const;

export const getPasswordRequirements = (password: string) =>
  passwordRules.map(rule => ({
    text: rule.text,
    error: !rule.test(password),
  }));
