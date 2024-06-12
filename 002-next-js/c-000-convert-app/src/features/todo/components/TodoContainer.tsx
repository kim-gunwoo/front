'use client';

import CreateMemo from './CreateTodo';
import TodoList from './TodoList';
import { todosState } from '../domain/Todo';
import useTodosQuery from '@/features/todo/hooks/useTodosQuery';
import { useSnapshot } from 'valtio';
import useTodosAdapterQuery from '../hooks/useTodoAdapterQuery';

export default function TodoContainer() {
  // const { data: todos } = useTodosQuery();
  // const { data } = useTodosQuery();
  // const todos = data?.pages.flatMap((page) => page);
  // console.log(data?.pages);

  // const todosStore = useSnapshot(todosState);

  // const { data } = useTodosAdapterQuery();
  // const todos = data?.pages.flatMap((page) => page);

  return (
    <div>
      <CreateMemo />
      {/* <TodoList todos={todosStore.getTodos()} /> */}
      <TodoList />
    </div>
  );
}
