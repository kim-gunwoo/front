import { DefaultTheme } from 'styled-components';

const colors = {
  primary: 'red',
  secondary: 'blue',
  black: '#000000',
  white: '#ffffff',
};

export type ColorsType = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
