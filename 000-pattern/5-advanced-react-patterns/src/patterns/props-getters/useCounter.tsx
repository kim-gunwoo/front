import { useState } from "react";
import { FalseyValue } from "styled-components";

//Function which concat all functions together
const callFnsInSequence =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args));

interface IProps {
  initial: number;
  max: number;
}

function useCounter({ initial, max }: IProps) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    setCount((prevCount: number) => Math.min(prevCount + 1, max));
  };

  const handleDecrement = () => {
    setCount((prevCount: number) => Math.max(0, prevCount - 1));
  };

  //props getter for 'Counter'
  const getCounterProps = ({ ...otherProps } = {}) => ({
    value: count,
    "aria-valuemax": max,
    "aria-valuemin": 0,
    "aria-valuenow": count,
    ...otherProps,
  });

  //props getter for 'Decrement'
  const getDecrementProps = ({ onClick, ...otherProps }: any = {}) => ({
    onClick: callFnsInSequence(handleDecrement, onClick),
    disabled: count === 0,
    ...otherProps,
  });

  //props getter for 'Increment'
  const getIncrementProps = ({ onClick, ...otherProps }: any = {}) => ({
    onClick: callFnsInSequence(handleIncrement, onClick),
    disabled: count === max,
    ...otherProps,
  });

  return {
    count,
    handleIncrement,
    handleDecrement,
    getCounterProps,
    getDecrementProps,
    getIncrementProps,
  };
}

export { useCounter };
