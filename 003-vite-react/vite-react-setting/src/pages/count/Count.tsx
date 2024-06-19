import { useCallback, useState } from 'react';

// render test
export default function CounterPage() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((p) => p + 1);
  };

  const decrease = useCallback(() => {
    setCount((p) => p - 1);
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={increase}>add</button>
      <button onClick={decrease}>minus</button>
    </div>
  );
}
