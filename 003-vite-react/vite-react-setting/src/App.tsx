import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  console.log(import.meta.env);
  console.log(import.meta.env.BASE_URL); // 기본으로 제공하는 항목
  console.log(import.meta.env.KEY); // env 에 존재하더라도 불러오지 못함
  console.log(import.meta.env.VITE_KEY); // VITE prefix가 있어서 호출 가능

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
