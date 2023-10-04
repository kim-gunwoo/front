import styled from 'styled-components';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <Container className={className} {...rest}>
      {children}
    </Container>
  );
}

const Container = styled.button`
  background: ${({ theme }) => theme.colors.primary};
`;
