import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div
      css={css`
        background: gray;
      `}
    >
      test
      <Sd>test</Sd>
      <div>aaa</div>
    </div>
  );
};

const Sd = styled.div`
  background: ${props => props.theme.color.ORANGE};
`;

export default Home;
