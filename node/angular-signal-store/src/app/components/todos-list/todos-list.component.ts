import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { Component, effect, inject, viewChild } from '@angular/core';
import { TodoStore } from '../../store/todo.store';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    NgStyle,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButtonToggleModule,
    MatListModule,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  store = inject(TodoStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, $event: MouseEvent) {
    $event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos($event: MatButtonToggleChange) {
    this.store.updateFilter($event.value);
  }
}
