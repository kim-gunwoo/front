import { useReducer } from "react";

interface internalReducerIncrementProps {
  type: "increment";
  payload: {
    max: number;
  };
}

interface internalReducerDecrementProps {
  type: "decrement";
}

export type internalReducerProps =
  | internalReducerIncrementProps
  | internalReducerDecrementProps;

const internalReducer = (
  { count }: { count: number },
  action: internalReducerProps
) => {
  switch (action.type) {
    case "increment":
      return {
        count: Math.min(count + 1, action.payload.max),
      };
    case "decrement":
      return {
        count: Math.max(0, count - 1),
      };
    default:
      throw new Error(`Unhandled action action: ${action}`);
  }
};

interface useCounterProps {
  initial: number;
  max: number;
}

function useCounter(
  { initial, max }: useCounterProps,
  reducer = internalReducer
) {
  const [{ count }, dispatch] = useReducer(reducer, { count: initial });

  const handleIncrement = () => {
    dispatch({ type: "increment", payload: { max } });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  return {
    count,
    handleIncrement,
    handleDecrement,
  };
}

useCounter.reducer = internalReducer;
useCounter.types = {
  increment: "increment",
  decrement: "decrement",
};

export { useCounter };
