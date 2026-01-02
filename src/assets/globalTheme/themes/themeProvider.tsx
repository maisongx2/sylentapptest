import React from 'react';

import { ThemeProvider } from 'styled-components/native';
import { theme } from './index';
import { useColorScheme } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export function Theme({ children }: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={isDarkMode ? theme.dark : theme.light}>
      {children}
    </ThemeProvider>
  );
}
