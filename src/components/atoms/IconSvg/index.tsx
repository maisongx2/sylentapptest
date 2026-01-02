import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from '@assets/icons';

export type IconSvgProps = {
  icon: Icon;
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  strokeColor?: string;
};

export const IconSvg = ({
  icon,
  width = 25,
  height = 25,
  color,
  opacity,
  strokeColor,
}: IconSvgProps) => {
  return (
    <SvgXml
      xml={icon}
      width={width}
      height={height}
      fill={color}
      opacity={opacity}
      stroke={strokeColor}
    />
  );
};
