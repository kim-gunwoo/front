import React from "react";
import { StyledButton } from "./styles";

interface IProps {
  onClick: () => void;
  disabled: boolean;
}

function Decrement({ onClick, disabled }: IProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      -
    </StyledButton>
  );
}

export { Decrement };
