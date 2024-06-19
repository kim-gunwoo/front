'use client';

import { useEffect, useRef } from 'react';
import { todosState } from '../domain/Todo';
import styles from './CreateTodo.module.scss';

interface FormInterface {
  todo: { value: string };
}

export default function CreateTodo() {
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormInterface;
    todosState.addTodo({
      content: target.todo.value,
    });
    target.todo.value = '';
  };

  const click = (e: MouseEvent) => {
    if (ref.current && !ref?.current.contains(e.target as Node)) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current?.click();
    }, 1000);
  }, []);

  useEffect(() => {
    document.addEventListener('click', click);
    return () => {
      document.removeEventListener('click', click);
    };
  }, []);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <label htmlFor="todo">Todo</label>
      <input id="todo" type="text" name="todo" autoFocus ref={ref} />
      <button type="submit">add</button>
    </form>
  );
}
