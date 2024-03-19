import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {InputRetainsComponent} from "./input-retains/input-retains.component";
import {InputFixedComponent} from "./input-fixed/input-fixed.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    InputRetainsComponent,
    InputFixedComponent,
    JsonPipe
  ],
  template: `
    <form [formGroup]="form">
      <input formControlName="native" placeholder="Native" />
      <br>
      <br>
      <app-input-retains formControlName="retains" placeholder="Retains"></app-input-retains>
      <br>
      <br>
      <app-input-fixed formControlName="fixed" placeholder="Fixed"></app-input-fixed>
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
      native: [''],
      retains: [''],
      fixed: [''],
    }
  )
}
