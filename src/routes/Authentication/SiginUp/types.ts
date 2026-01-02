// src/routes/SignUp/types.ts
export enum EProfileType {
  OWNER = 'owner',
  TECHNICIAN = 'technician',
}

export type SignUpFormData = {
  profileType: EProfileType;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  acceptTerms: boolean;
};

export type PasswordRequirement = {
  text: string;
  error: boolean;
};

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'none';
