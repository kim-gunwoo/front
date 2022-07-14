import React from "react";
import { StyledButton } from "./styles";
import { useCounterContext } from "../useCounterContext";

function Decrement() {
  const { handleDecrement } = useCounterContext();
  return <StyledButton onClick={handleDecrement}> - </StyledButton>;
}

export { Decrement };
