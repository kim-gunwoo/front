/* eslint-disable react-refresh/only-export-components */
import { theme } from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </QueryClientProvider>
);

const renderWithStyledComponent = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithStyledComponent as render };
