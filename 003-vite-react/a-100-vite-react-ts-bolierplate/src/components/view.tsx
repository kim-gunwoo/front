import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IProps {
  /**
   * backgorund
   */
  backgroundColor?: string;
  /**
   * test color
   */
  color?: string;

  /**
   *ㅇㅇㅇㅇ
   */
  text?: string;
}

const StyleDiv = styled.div<{ back: string }>`
  background-color: ${(props) => props.back || 'blue'};
  color: red;
`;
// export default function View({backgroundColor}:IProps) {
//     return <StyleDiv back={backgroundColor}>view</StyleDiv>
// }

const divCss = ({ backgroundColor }: IProps) => css`
  background-color: ${backgroundColor || 'red'};
`;
export default function View({ backgroundColor, text, color = 'aaaaaaa' }: IProps) {
  // console.log(text,color )
  return <div css={divCss({ backgroundColor })}>view</div>;
}

View.defaultProps = {
  text: 'world',
};
