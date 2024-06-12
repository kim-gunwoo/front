import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRef } from 'react';

export default function useTest(options?: Omit<UseQueryOptions<number, AxiosError>, 'queryKey'>) {
  const count = useRef(0);

  return useQuery({
    queryKey: [],
    queryFn: async () => {
      count.current++;
      const res = await axios.get('api/test', { params: { a: '1', b: '2' } });
      await axios.get('api/test/1231/1231', { params: { a: '1', b: '2' } });
      await axios.get('api/test/123', { params: { a: '1', b: '2' } });

      return res.data;
    },
    staleTime: 1000 * 2,
    // gcTime: 1000 * 10,
    // refetchInterval: 6000,
    refetchInterval: () => {
      return 1000 * count.current;
    },
    ...options,
  });
}
