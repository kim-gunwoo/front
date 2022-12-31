import React from "react";
import styled from "styled-components";
import { useCounterContext } from "../useCounterContext";

interface IProps {
  max?: number;
}

function Count({ max }: IProps) {
  const { count } = useCounterContext();

  const hasError = max ? count >= max : false;

  return <StyledCount hasError={hasError}>{count}</StyledCount>;
}

const StyledCount = styled.div<{ hasError: boolean }>`
  background-color: ${({ hasError }) => (hasError ? "#bd2130" : "#17a2b8")};
  color: white;
  padding: 5px 7px;
`;

export { Count };
