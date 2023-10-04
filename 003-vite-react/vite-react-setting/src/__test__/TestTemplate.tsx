import { theme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TestTemplate = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default TestTemplate;
