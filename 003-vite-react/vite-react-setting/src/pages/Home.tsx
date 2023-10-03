import Button from '@/components/Button';
import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from '@/assets/react.svg';

export default function Home() {
  return (
    <div>
      <CustomSvg />
      <Button>test</Button>
      <CustomButton>test</CustomButton>
      <CustomButton isGreen>test</CustomButton>
    </div>
  );
}

const CustomButton = styled(Button)<{ isGreen?: boolean }>`
  background: blue;

  ${({ isGreen }) =>
    isGreen &&
    css`
      background: green;
    `}
`;

const CustomSvg = styled(Logo)`
  path {
    fill: red;
  }
`;
