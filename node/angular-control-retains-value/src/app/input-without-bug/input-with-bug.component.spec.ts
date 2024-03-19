import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Component, ElementRef, inject, viewChild} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {InputWithoutBugComponent} from "./input-without-bug.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputWithoutBugComponent,
  ],
  template: `
    <form [formGroup]="form">
      <app-input-without-bug #elementWithoutBug formControlName="nobug"></app-input-without-bug>
    </form>
  `,
})
export class TestComponent {
  nativeElement = viewChild<ElementRef>('input');
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
      nobug: [''],
    }
  )
}

describe('InputWithoutBugComponent', () => {
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

  it('value is set on input', () => {
    component.form.setValue({ nobug: 'hi' });
    const nativeElement = component.nativeElement()?.nativeElement;
    expect(nativeElement?.value).toEqual('hi')
  });
});
