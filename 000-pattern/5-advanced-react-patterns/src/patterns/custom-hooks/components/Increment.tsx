import React from "react";
import { StyledButton } from "./styles";

interface IProps {
  onClick: () => void;
  disabled: boolean;
}

function Increment({ onClick, disabled }: IProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      +
    </StyledButton>
  );
}

export { Increment };
