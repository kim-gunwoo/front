import { proxy } from 'valtio';

export interface TodoInterface {
  id: string;
  content: string;
}

export class Todo {
  id: string;
  content: string;

  constructor(todo: TodoInterface) {
    this.id = todo.id;
    this.content = todo.content;
  }

  hasContent() {
    return !!this.content;
  }
}

interface CreateTodoInterface {
  content: string;
}

interface TodoListInterface {
  addTodo(todo: CreateTodoInterface): void;
  getTodos(): Todo[];
}

class TodoList implements TodoListInterface {
  private todos: Todo[] = [];

  get getNextId() {
    return (this.getTodos().length + 1).toString();
  }

  addTodo(todoEntity: CreateTodoInterface) {
    const todo = new Todo({
      id: this.getNextId,
      ...todoEntity,
    });
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }
}

export const todosState = proxy<TodoList>(new TodoList());
