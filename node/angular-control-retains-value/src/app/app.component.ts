import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {InputWithBugComponent} from "./input-with-bug/input-with-bug.component";
import {InputWithoutBugComponent} from "./input-without-bug/input-without-bug.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    InputWithBugComponent,
    InputWithoutBugComponent,
    JsonPipe
  ],
  template: `
    <form [formGroup]="form">
      <input formControlName="nativeElement" placeholder="Native" />
      <br>
      <br>
      <app-input-with-bug formControlName="withBug" placeholder="Bug"></app-input-with-bug>
      <br>
      <br>
      <app-input-without-bug formControlName="withoutBug" placeholder="Fixed"></app-input-without-bug>
      <br>
      <br>
      <button (click)="form.reset()">Clear Input</button>
      <pre>{{ form.value | json }}</pre>
    </form>
  `,
  styles: `
    form {
      width: 50%;
      margin: 32px auto;
    }
  `
})
export class AppComponent {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
      nativeElement: [''],
      withBug: [''],
      withoutBug: [''],
    }
  )
}
