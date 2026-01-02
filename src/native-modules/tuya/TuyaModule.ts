import { NativeModules } from 'react-native';
import {
  CreateHomeResponse,
  GetHomeListResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  SendVerifyCodeResponse,
} from './types';

const { TuyaModule } = NativeModules;

export class TuyaServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: any,
  ) {
    super(message);
    this.name = 'TuyaServiceError';
  }
}

function validateTuyaModule(): void {
  if (!TuyaModule) {
    throw new TuyaServiceError(
      'TuyaModule não está disponível. Verifique se o módulo nativo foi instalado corretamente.',
      'MODULE_NOT_FOUND',
    );
  }
}

function validateMethod(methodName: string): void {
  validateTuyaModule();

  if (!TuyaModule[methodName]) {
    throw new TuyaServiceError(
      `Método ${methodName} não está disponível no TuyaModule.`,
      'METHOD_NOT_FOUND',
    );
  }
}

function validateEmail(email: string): void {
  if (!email || typeof email !== 'string') {
    throw new TuyaServiceError('Email é obrigatório', 'INVALID_EMAIL');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new TuyaServiceError('Email inválido', 'INVALID_EMAIL');
  }
}

export const TuyaService = {
  async sendVerifyCode(
    email: string,
    region: string = 'BR',
    countryCode: string = '55',
  ): Promise<SendVerifyCodeResponse> {
    validateMethod('sendVerifyCode');
    validateEmail(email);

    if (!region || typeof region !== 'string') {
      throw new TuyaServiceError('Region é obrigatória', 'INVALID_REGION');
    }

    if (!countryCode || typeof countryCode !== 'string') {
      throw new TuyaServiceError(
        'Country code é obrigatório',
        'INVALID_COUNTRY_CODE',
      );
    }

    try {
      console.log(`📧 [TuyaService] Enviando código para: ${email}`);

      const response = await TuyaModule.sendVerifyCode(
        email,
        region,
        countryCode,
      );

      console.log('✅ [TuyaService] Código enviado com sucesso');
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao enviar código:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao enviar código de verificação',
        error.code || 'SEND_CODE_ERROR',
        error,
      );
    }
  },

  async registerByEmail(
    countryCode: string,
    email: string,
    password: string,
    code: string,
  ): Promise<RegisterResponse> {
    validateMethod('registerByEmail');
    validateEmail(email);

    if (!countryCode || typeof countryCode !== 'string') {
      throw new TuyaServiceError(
        'Country code é obrigatório',
        'INVALID_COUNTRY_CODE',
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      throw new TuyaServiceError(
        'Senha deve ter no mínimo 6 caracteres',
        'INVALID_PASSWORD',
      );
    }

    if (!code || typeof code !== 'string') {
      throw new TuyaServiceError(
        'Código de verificação é obrigatório',
        'INVALID_CODE',
      );
    }

    try {
      console.log(`📝 [TuyaService] Registrando usuário: ${email}`);

      const response = await TuyaModule.registerByEmail(
        countryCode,
        email,
        password,
        code,
      );

      console.log('✅ [TuyaService] Usuário registrado com sucesso');
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao registrar:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao registrar usuário',
        error.code || 'REGISTER_ERROR',
        error,
      );
    }
  },

  async login(
    countryCode: string,
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    validateMethod('login');
    validateEmail(email);

    if (!countryCode || typeof countryCode !== 'string') {
      throw new TuyaServiceError(
        'Country code é obrigatório',
        'INVALID_COUNTRY_CODE',
      );
    }

    if (!password || typeof password !== 'string') {
      throw new TuyaServiceError('Senha é obrigatória', 'INVALID_PASSWORD');
    }

    try {
      console.log(`🔐 [TuyaService] Fazendo login: ${email}`);

      const response = await TuyaModule.login(countryCode, email, password);

      console.log('✅ [TuyaService] Login bem-sucedido');
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao fazer login:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao fazer login',
        error.code || 'LOGIN_ERROR',
        error,
      );
    }
  },

  async logout(): Promise<LogoutResponse> {
    validateMethod('logout');

    try {
      console.log('👋 [TuyaService] Fazendo logout');

      const response = await TuyaModule.logout();

      console.log('✅ [TuyaService] Logout bem-sucedido');
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao fazer logout:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao fazer logout',
        error.code || 'LOGOUT_ERROR',
        error,
      );
    }
  },

  async createHome(
    name: string,
    geoName: string,
    rooms: string[],
    lat: number,
    lng: number,
  ): Promise<CreateHomeResponse> {
    validateMethod('createHome');

    if (!name || typeof name !== 'string') {
      throw new TuyaServiceError('Nome da casa é obrigatório', 'INVALID_NAME');
    }

    if (!geoName || typeof geoName !== 'string') {
      throw new TuyaServiceError(
        'Localização é obrigatória',
        'INVALID_GEO_NAME',
      );
    }

    if (!Array.isArray(rooms)) {
      throw new TuyaServiceError('Rooms deve ser um array', 'INVALID_ROOMS');
    }

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      throw new TuyaServiceError(
        'Coordenadas inválidas',
        'INVALID_COORDINATES',
      );
    }

    try {
      console.log(`🏠 [TuyaService] Criando casa: ${name}`);

      const response = await TuyaModule.createHome(
        name,
        geoName,
        rooms,
        lat,
        lng,
      );

      console.log('✅ [TuyaService] Casa criada com sucesso');
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao criar casa:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao criar casa',
        error.code || 'CREATE_HOME_ERROR',
        error,
      );
    }
  },

  async getHomeList(): Promise<GetHomeListResponse> {
    validateMethod('getHomeList');

    try {
      console.log('🏘️ [TuyaService] Buscando lista de casas');

      const response = await TuyaModule.getHomeList();

      console.log(`✅ [TuyaService] ${response.length} casa(s) encontrada(s)`);
      return response;
    } catch (error: any) {
      console.error('❌ [TuyaService] Erro ao buscar casas:', error);
      throw new TuyaServiceError(
        error.message || 'Erro ao buscar lista de casas',
        error.code || 'GET_HOME_LIST_ERROR',
        error,
      );
    }
  },
};

if (__DEV__) {
  try {
    validateTuyaModule();
    console.log('✅ [TuyaService] Módulo inicializado com sucesso');
    console.log(
      '📋 [TuyaService] Métodos disponíveis:',
      Object.keys(TuyaModule),
    );
  } catch (error: any) {
    console.error('❌ [TuyaService] Erro ao inicializar:', error.message);
  }
}

export default TuyaService;
