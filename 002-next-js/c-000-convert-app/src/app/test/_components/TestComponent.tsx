'use client';

import useTest from '../_queries/useTest';

interface IProps {
  ran: number;
}

export default function TestComponent({ ran }: IProps) {
  const data = useTest({
    // initialData: ran,
  });

  return (
    <div>
      <div>{ran}</div>
      <div>{data.data}</div>
    </div>
  );
}
