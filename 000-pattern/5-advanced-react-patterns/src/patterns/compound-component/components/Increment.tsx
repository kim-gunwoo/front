import React from "react";
import { StyledButton } from "./styles";
import { useCounterContext } from "../useCounterContext";

function Increment() {
  const { handleIncrement } = useCounterContext();
  return <StyledButton onClick={handleIncrement}> + </StyledButton>;
}

export { Increment };
