import {ChangeDetectorRef, Component, forwardRef, inject, input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-with-bug',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWithBugComponent),
      multi: true,
    },
  ],
  template: `
    <input
      [placeholder]="placeholder()"
      [disabled]="isDisabled"
      [value]="value"
      (input)="onChange($event)"
      (blur)="touched()"
    />`,
})
export class InputWithBugComponent implements ControlValueAccessor   {
  placeholder = input<string>('');
  changeDetectorRef = inject(ChangeDetectorRef);

  value: string = '';
  isDisabled: boolean = false;
  changed!: (value: any) => void;
  touched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }
}
