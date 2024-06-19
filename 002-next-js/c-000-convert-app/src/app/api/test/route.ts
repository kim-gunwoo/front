import { getTestData } from '@/fetch-test';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: string | string[] }) {
  console.log('/api/test');
  // console.log(context.params);
  const url = new URL(request.url);
  // console.log(url.searchParams);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await getTestData();
  return NextResponse.json(data.ran);
}
