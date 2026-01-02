type FontWeightName = 'regular' | 'medium' | 'semiBold' | 'bold';

/** Variantes tipográficas do Design System */
export const TextVariant = {
  /** Display Extra Large — 48px SemiBold */
  displayExtraLarge: 'displayExtraLarge',

  /** Display Large — 40px SemiBold */
  displayLarge: 'displayLarge',

  /** Heading Extra Large — 32px SemiBold */
  headingExtraLarge: 'headingExtraLarge',

  /** Heading Large — 28px SemiBold */
  headingLarge: 'headingLarge',

  /** Heading Medium — 24px SemiBold */
  headingMedium: 'headingMedium',

  /** Heading Small — 20px Medium */
  headingSmall: 'headingSmall',

  /** Body Large Bold — 18px Bold */
  bodyLargeBold: 'bodyLargeBold',

  /** Body Large Regular — 18px Regular */
  bodyLargeRegular: 'bodyLargeRegular',

  /** Body Medium Bold — 16px Bold */
  bodyMediumBold: 'bodyMediumBold',

  /** Body Medium Regular — 16px Regular */
  bodyMediumRegular: 'bodyMediumRegular',

  /** Body Small Bold — 14px Bold */
  bodySmallBold: 'bodySmallBold',

  /** Body Small Regular — 14px Regular */
  bodySmallRegular: 'bodySmallRegular',

  /** Body Extra Small Bold — 12px Bold */
  bodyExtraSmallBold: 'bodyExtraSmallBold',

  /** Body Extra Small Regular — 12px Regular */
  bodyExtraSmallRegular: 'bodyExtraSmallRegular',
} as const;

/** Tipo das variantes */
export type ETextVariant = (typeof TextVariant)[keyof typeof TextVariant];

type TextStyleToken = {
  fontFamily: string;
  fontWeight: FontWeightName;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export const typography = {
  family: {
    primary: 'Inter',
    secondary: 'Inter',
  },

  variants: {
    /**
     * Display Extra Large — 48px / 58px — SemiBold
     * Uso: títulos principais, heros, chamadas fortes.
     */
    displayExtraLarge: {
      fontFamily: 'Inter',
      fontWeight: 'semiBold',
      fontSize: 48,
      lineHeight: 58,
      letterSpacing: 0,
    },

    /**
     * Display Large — 40px / 48px — SemiBold
     * Uso: títulos grandes e destaques de seção.
     */
    displayLarge: {
      fontFamily: 'Inter',
      fontWeight: 'semiBold',
      fontSize: 40,
      lineHeight: 48,
      letterSpacing: 0,
    },

    /**
     * Heading Extra Large — 32px / 42px — SemiBold
     * Uso: subtítulos fortes, headers de tela.
     */
    headingExtraLarge: {
      fontFamily: 'Inter',
      fontWeight: 'semiBold',
      fontSize: 32,
      lineHeight: 42,
      letterSpacing: 0,
    },

    /**
     * Heading Large — 28px / 36px — SemiBold
     * Uso: títulos médios e seções importantes.
     */
    headingLarge: {
      fontFamily: 'Inter',
      fontWeight: 'semiBold',
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
    },

    /**
     * Heading Medium — 24px / 31px — SemiBold
     * Uso: subtítulos, blocos de conteúdo.
     */
    headingMedium: {
      fontFamily: 'Inter',
      fontWeight: 'semiBold',
      fontSize: 24,
      lineHeight: 31,
      letterSpacing: 0,
    },

    /**
     * Heading Small — 20px / 26px — Medium
     * Uso: seções internas, títulos pequenos.
     */
    headingSmall: {
      fontFamily: 'Inter',
      fontWeight: 'medium',
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: 0,
    },

    /**
     * Body Large Bold — 18px / 25px — Bold
     * Uso: destaques dentro de textos grandes.
     */
    bodyLargeBold: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: 0,
    },

    /**
     * Body Large Regular — 18px / 25px — Regular
     * Uso: textos grandes e leitura confortável.
     */
    bodyLargeRegular: {
      fontFamily: 'Inter',
      fontWeight: 'regular',
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: 0,
    },

    /**
     * Body Medium Bold — 16px / 22px — Bold
     * Uso: enfatizar trechos em texto médio.
     */
    bodyMediumBold: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 22,
      letterSpacing: 0,
    },

    /**
     * Body Medium Regular — 16px / 22px — Regular
     * Uso: texto padrão de corpo.
     */
    bodyMediumRegular: {
      fontFamily: 'Inter',
      fontWeight: 'regular',
      fontSize: 16,
      lineHeight: 22,
      letterSpacing: 0,
    },

    /**
     * Body Small Bold — 14px / 20px — Bold
     * Uso: labels pequenas com destaque.
     */
    bodySmallBold: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },

    /**
     * Body Small Regular — 14px / 20px — Regular
     * Uso: textos pequenos e descrições.
     */
    bodySmallRegular: {
      fontFamily: 'Inter',
      fontWeight: 'regular',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },

    /**
     * Body Extra Small Bold — 12px / 17px — Bold
     * Uso: indicações pequenas e microinformações que precisam de destaque.
     */
    bodyExtraSmallBold: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 12,
      lineHeight: 17,
      letterSpacing: 0,
    },

    /**
     * Body Extra Small Regular — 12px / 17px — Regular
     * Uso: textos auxiliares, legendas e suportes.
     */
    bodyExtraSmallRegular: {
      fontFamily: 'Inter',
      fontWeight: 'regular',
      fontSize: 12,
      lineHeight: 17,
      letterSpacing: 0,
    },
  } satisfies Record<ETextVariant, TextStyleToken>,
};
