import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';

export const theme = {
  light: {
    colors: colors.light,
    typography,
    spacing,
    radii,
    shadows,
  },
  dark: {
    colors: colors.dark,
    typography,
    spacing,
    radii,
    shadows,
  },
};

export type ThemeType = typeof theme.light;
