import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';
import { computed, inject } from '@angular/core';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { loading: false, todos: todos });
    },
    async addTodo(title: string) {
      const todo = await todosService.addTodo({
        title: title,
        completed: false,
      });
      patchState(store, (state) => ({
        todos: [...state.todos, todo],
      }));
    },
    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    },
    async updateTodo(id: string, completed: boolean) {
      await todosService.updateTodo(id, completed);
      patchState(store, (state) => ({
        todos: state.todos.map((t) => (t.id === id ? { ...t, completed } : t)),
      }));
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case 'pending':
          return todos.filter((t) => !t.completed);
        case 'completed':
          return todos.filter((t) => t.completed);
        case 'all':
          return todos;
      }
    }),
  }))
);
