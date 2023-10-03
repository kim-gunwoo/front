import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ className, children }: ButtonProps) {
  return <Container className={className}>{children}</Container>;
}

const Container = styled.button`
  background: ${({ theme }) => theme.colors.primary};
`;
