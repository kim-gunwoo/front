import { TodoApi } from '@/api';
import { Todo } from '../domain/Todo';

interface TodoAdapterInterface {
  getAll(params: any): Promise<Todo[]>;
}

export class TodoAdapter implements TodoAdapterInterface {
  async getAll(params?: any): Promise<Todo[]> {
    const todos = await TodoApi.getAll(params);
    return todos.map((todo) => new Todo(todo));
  }
}
