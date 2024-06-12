import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: string | string[] }) {
  console.log('/api/test/[...slug]');
  // console.log(context.params);
  const url = new URL(request.url);
  // console.log(url.searchParams);

  return NextResponse.json({
    ran: Math.random(),
  });
}
