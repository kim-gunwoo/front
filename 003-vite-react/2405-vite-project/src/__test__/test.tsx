import { baseInstance } from '@/shared/api';
import { useEffect, useState } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const call = async () => {
      const response = await loginCall();
      setAccessToken(response);
    };
    call();
    loginCall().then((token: string) => {
      setAccessToken(token);
    });
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((p) => p + 1)}>add</button>
      {accessToken}
    </div>
  );
}

async function loginCall() {
  const form = new FormData();
  form.append('login_id', 'paytalab@gmail.com');
  form.append('password', 'FLHgOsiKhkQ9KnnadJzhn93JUuUiUQU9vXW7SSZnWKs=');
  form.append('app_agent', '1');

  try {
    const result = await baseInstance.post(`${import.meta.env.VITE_API_BASE_URL}/v2/users/authentication`, form, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, refresh_token } = result.data;

    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
    return access_token;
  } catch (error) {
    console.log(error);
  }
}
