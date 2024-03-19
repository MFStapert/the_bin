import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithBugComponent } from './input-with-bug.component';
import {Component, ElementRef, inject, viewChild} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {InputWithoutBugComponent} from "../input-without-bug/input-without-bug.component";
import {JsonPipe} from "@angular/common";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputWithBugComponent,
  ],
  template: `
    <form [formGroup]="form">
      <app-input-with-bug #elementWithBug formControlName="bug"></app-input-with-bug>
    </form>
  `,
})
export class TestComponent {
  elementWithBug = viewChild<InputWithBugComponent>('elementWithBug');
  nativeElement = viewChild<ElementRef>('input');
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
      bug: [''],
    }
  )
}

describe('InputWithBugComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('value is not set on native element, even though property is bound to input', () => {
    component.form.setValue({ bug: 'hi' });
    fixture.detectChanges()

    // value is set on component
    const elementWithBug = component.elementWithBug();
    expect(elementWithBug?.value).toEqual('hi')

    // native input element does not have it's value changed
    const nativeElement = component.nativeElement()?.nativeElement;
    expect(nativeElement?.value).toEqual('hi')
  });
});
