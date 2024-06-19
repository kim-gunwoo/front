import { GuestApi, BASE_URL, guestApi } from '@/api';
import { BASE_APP_DOMAIN } from '@/constant/globals';
import { Notice } from '@/types/Notice.types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default async function Home() {
  // export default function Home() {
  // const result = await getData();

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <br />
      <Link href="/todos">todos</Link>
      <br />
      <Link href="/notices">notices</Link>
      <br />
      <Link href={`${BASE_APP_DOMAIN}`}>app</Link>
      <br />
      <Link href={'/test'}>test</Link>
      <br />
      <Link href={'/lottie-test'}>lottie-test</Link>
    </div>
  );
}

// async function getData() {
//   const res = await fetch(BASE_URL + guestApi.login(), { method: 'POST' });
//   return res.json();
// }
