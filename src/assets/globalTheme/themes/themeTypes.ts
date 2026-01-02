import { ThemeType } from '.';

/**
 * GRUPOS DE CORES
 * Ex: "primary" | "secondary" | "neutrals" | "semantic" ...
 */
export type ThemeColorGroup = keyof ThemeType['colors'];

/**
 * CHAVES INTERNAS DE UM GRUPO
 * Ex: ThemeColorKey<'primary'> → "base" | "light" | "dark" ...
 */
export type ThemeColorKey<G extends ThemeColorGroup> =
  keyof ThemeType['colors'][G];

/**
 * TODAS AS CORES FLATTEN
 * Ex: "base" | "light" | "neutral50" | "error" | ...
 */
export type ThemeColor = {
  [Group in ThemeColorGroup]: keyof ThemeType['colors'][Group];
}[ThemeColorGroup];

/**
 * TIPOS ESPECÍFICOS POR GRUPO
 * Ajuste os nomes dos grupos conforme seu tema
 */
export type ThemePrimaryColor = keyof ThemeType['colors']['primary'];
export type ThemeSecondaryColor = keyof ThemeType['colors']['secondary'];
export type ThemeNeutralColor = keyof ThemeType['colors']['neutrals'];
export type ThemeSemanticColor = keyof ThemeType['colors']['semantic'];

/**
 * SPACING
 * Ex: "xs" | "sm" | "md" | "lg" | ...
 */
export type ThemeSpacing = keyof ThemeType['spacing'];

/**
 * RADII
 * Ex: "xs" | "sm" | "md" | "lg" | "pill" ...
 */
export type ThemeRadius = keyof ThemeType['radii'];

/**
 * SHADOWS
 * Ex: "sm" | "md" | "lg" ...
 */
export type ThemeShadow = keyof ThemeType['shadows'];

export type ThemeTypographyVariant = keyof ThemeType['typography']['variants'];

export type ThemeTypographyToken<V extends ThemeTypographyVariant> =
  ThemeType['typography']['variants'][V];

/**
 * Fonte de uma variant específica
 */
export type ThemeFontFamily<V extends ThemeTypographyVariant> =
  ThemeType['typography']['variants'][V]['fontFamily'];

export type ThemeFontWeight<V extends ThemeTypographyVariant> =
  ThemeType['typography']['variants'][V]['fontWeight'];

export type ThemeFontSize<V extends ThemeTypographyVariant> =
  ThemeType['typography']['variants'][V]['fontSize'];

export type ThemeLineHeight<V extends ThemeTypographyVariant> =
  ThemeType['typography']['variants'][V]['lineHeight'];
