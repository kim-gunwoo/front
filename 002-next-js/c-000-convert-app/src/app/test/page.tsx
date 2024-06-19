import { getTestData } from '@/fetch-test';
import TestComponent from './_components/TestComponent';

export default async function Page() {
  const initData = await getTestData();

  return (
    <div>
      {initData.ran}
      <TestComponent ran={initData.ran} />
    </div>
  );
}
