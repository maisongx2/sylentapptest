// src/routes/SignUp/utils/formatPhone.ts

/**
 * Formata o número de telefone conforme o usuário digita
 * Suporta formatos:
 * - (11) 98888-8888 (celular)
 * - (11) 3888-8888 (fixo)
 * - +55 (11) 9 8888-8888 (celular com código país)
 */
export const formatPhone = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Sem números
  if (!numbers) return '';

  // Apenas DDD: (11
  if (numbers.length <= 2) {
    return `(${numbers}`;
  }

  // DDD + início: (11) 9
  if (numbers.length <= 3) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  // DDD + primeiros dígitos: (11) 9888
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  // Telefone completo sem código de país
  if (numbers.length <= 11) {
    // Celular (9 dígitos): (11) 98888-8888
    if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    // Fixo (8 dígitos): (11) 3888-8888
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  }

  // Com código de país: +55 (11) 9 8888-8888
  if (numbers.length <= 13) {
    return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 5)} ${numbers.slice(5, 9)}-${numbers.slice(9, 13)}`;
  }

  // Limita ao máximo permitido
  return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 5)} ${numbers.slice(5, 9)}-${numbers.slice(9, 13)}`;
};

/**
 * Remove a formatação do telefone, deixando apenas números
 */
export const unformatPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};
