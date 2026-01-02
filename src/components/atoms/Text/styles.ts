import { ETextVariant } from '../../../../src/assets/globalTheme/themes/typography';
import styled, { css } from 'styled-components/native';

const mapFontWeight = (weight: string) => {
  switch (weight) {
    case 'regular':
      return '400';
    case 'medium':
      return '500';
    case 'semiBold':
      return '600';
    case 'bold':
      return '700';
    default:
      return '400';
  }
};

export const StyledText = styled.Text<{
  variant: ETextVariant;
  color?: string;
}>`
  ${({ theme, variant, color }) => {
    const t = theme.typography.variants[variant];
    return css`
      font-family: ${t.fontFamily};
      font-size: ${t.fontSize}px;
      line-height: ${t.lineHeight}px;
      font-weight: ${mapFontWeight(t.fontWeight)};
      color: ${color ?? theme.colors.neutrals.neutral900};
    `;
  }}
`;

export const Container = styled.View`
  ${({ theme }) => css``}
`;
