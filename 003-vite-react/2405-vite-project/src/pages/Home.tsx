import { authInstance, baseInstance } from '@/shared/api';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    loginCall();
    // apiTestCall(1);
    // apiTestCall(2);
    // apiTestCall(3);
    return () => {};
  }, []);

  return <div>home</div>;
}

async function loginCall() {
  const form = new FormData();
  form.append('login_id', 'paytalab@gmail.com');
  form.append('password', 'FLHgOsiKhkQ9KnnadJzhn93JUuUiUQU9vXW7SSZnWKs=');
  form.append('app_agent', '1');

  try {
    const result = await baseInstance.post('https://development.passorder.me:9999/v2/users/authentication', form, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, refresh_token } = result.data;

    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
  } catch (error) {
    console.log(error);
  }
}

async function apiTestCall(page?: number) {
  const result = await authInstance.get(
    `https://development.passorder.me:9999/v2/stores/services?query=&first_status=0&last_status=80&page=${page}&limit=10`,
  );
  console.log(result.data);
}
