import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: string | string[] }) {
  console.log('/api/test/[id]');
  // console.log(context.params);

  return NextResponse.json('test');
}
