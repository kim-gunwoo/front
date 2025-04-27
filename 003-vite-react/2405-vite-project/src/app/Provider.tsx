import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const isDevEnvironment = import.meta.env.DEV;

export default function Provider() {
  return (
    <QueryClientProvider client={queryClient}>
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
