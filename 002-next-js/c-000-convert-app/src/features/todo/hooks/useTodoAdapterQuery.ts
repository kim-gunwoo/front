import { QueryKeys } from '@/constant/QueryKeys';
import { UndefinedInitialDataInfiniteOptions, UseQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TodoAdapter } from '../adapter/TodoAdapter';
import { Todo } from '../domain/Todo';

export default function useTodosAdapterQuery(
  options?: Omit<UndefinedInitialDataInfiniteOptions<Todo[]>, 'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'>,
) {
  return useInfiniteQuery({
    queryKey: QueryKeys.Todos(),
    queryFn: ({ pageParam }) => {
      return new TodoAdapter().getAll(pageParam);
    },
    initialPageParam: 1,
    ...options,
    getNextPageParam: () => {
      return undefined;
    },
    getPreviousPageParam: () => {
      return undefined;
    },
  });
}

function useTodoAdapterQuery(options?: Omit<UseQueryOptions<Todo[], AxiosError>, 'queryKey'>) {
  return useQuery({
    queryKey: QueryKeys.Todos(),
    queryFn: () => new TodoAdapter().getAll(),
    ...options,
  });
}
