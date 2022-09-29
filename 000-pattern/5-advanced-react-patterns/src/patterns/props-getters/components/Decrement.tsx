import React from "react";
import { StyledButton } from "./styles";

interface IProps {
  onClick: () => void;
}

function Decrement({ onClick, ...props }: IProps) {
  return (
    <StyledButton onClick={onClick} {...props}>
      -
    </StyledButton>
  );
}

export { Decrement };
