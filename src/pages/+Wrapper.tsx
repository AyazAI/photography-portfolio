import { Global } from '@emotion/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';

const theme = {
  primaryBlack: '#000',
  primaryYellow: '#FFD700',
};

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      {children}
    </ThemeProvider>
  );
};
