import { QueryKeys } from '@/constant/QueryKeys';
import { TodoResponseInterface } from '@/types/Todo.types';
import Link from 'next/link';
import getQueryClient from '../getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import TodoMainPage from '@/features/todo/presentation/TodoMainPage';

// export async function getTodos() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//   const todos = (await response.json()) as TodoResponseInterface[];
//   // const todos = TodoApi.getAll();
//   return todos;
// }

export default async function TodoPage() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({ queryKey: QueryKeys.Todos(), queryFn: getTodos });
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: QueryKeys.Todos(),
  //   queryFn: getTodos,
  //   initialPageParam: 1,
  //   getNextPageParam: () => undefined,
  // });
  // const dehydratedState = dehydrate(queryClient);

  // const todos: TodoInterface[] = [
  //   { id: '1', content: 'content-1' },
  //   { id: '2', content: 'content-2' },
  //   { id: '3', content: 'content-3' },
  // ];
  // const todos = await TodoApi.getAll();

  return (
    // <HydrationBoundary state={dehydratedState}>
    <div>
      <Link href="/"></Link>
      <TodoMainPage />
    </div>
    // </HydrationBoundary>
  );
}
