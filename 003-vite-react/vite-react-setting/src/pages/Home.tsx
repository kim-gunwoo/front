import Button from '@/components/Button';
import styled, { css } from 'styled-components';
// import { ReactComponent as Logo } from '@/assets/react.svg';
import Logo from '@/assets/react.svg';
import { useCallback, useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    let a = count * count;
    a = count + a;
    const b = a * a;
    console.log(a, b);
    setCount((prev) => prev + 1);
  }, [count]);

  return (
    <div>
      <CountDiv>{count}</CountDiv>
      <Logo />
      <CustomSvg />
      <Button role="add-count" onClick={onClick}>
        test
      </Button>
      <CustomButton>test</CustomButton>
      <CustomButton $isGreen>test</CustomButton>
    </div>
  );
}

const CountDiv = styled.div`
  color: white;
`;

const CustomButton = styled(Button)<{ $isGreen?: boolean }>`
  background: blue;

  ${({ $isGreen }) =>
    $isGreen &&
    css`
      background: green;
    `}
`;

const CustomSvg = styled(Logo)`
  path {
    fill: red;
  }
`;
