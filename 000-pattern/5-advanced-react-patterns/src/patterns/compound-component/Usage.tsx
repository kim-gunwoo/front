import React from "react";
import { Counter } from "./Counter";

function Usage() {
  const handleChangeCounter = (count: number) => {
    console.log("count", count);
  };

  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment />
    </Counter>
  );
}

export { Usage };
