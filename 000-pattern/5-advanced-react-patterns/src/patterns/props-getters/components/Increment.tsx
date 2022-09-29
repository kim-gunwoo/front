import React from "react";

import { StyledButton } from "./styles.js";

interface IProps {
  onClick: () => void;
}

function Increment({ onClick, ...props }: IProps) {
  return (
    <StyledButton onClick={onClick} {...props}>
      +
    </StyledButton>
  );
}

export { Increment };
