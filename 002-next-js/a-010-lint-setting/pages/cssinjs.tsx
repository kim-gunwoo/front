import type { NextPage } from 'next';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Page: NextPage = () => {
  return (
    <div css={divStyle}>
      <Title>Learn React</Title>
      Hover to change color.
    </div>
  );
};

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const divStyle = css`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;

  &:hover {
    color: white;
  }
`;

export default Page;
