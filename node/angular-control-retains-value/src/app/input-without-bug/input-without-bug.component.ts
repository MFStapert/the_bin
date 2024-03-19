import {Component, ElementRef, forwardRef, input, viewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-without-bug',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWithoutBugComponent),
      multi: true,
    },
  ],
  template: `
    <input
      #inputRef
      [placeholder]="placeholder()"
      [disabled]="isDisabled"
      (input)="onChange($event)"
      (blur)="touched()"
    />`,
})
export class InputWithoutBugComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  inputRef = viewChild<ElementRef>('inputRef');
  isDisabled: boolean = false;
  changed!: (value: any) => void;
  touched!: () => void;

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  writeValue(value: string): void {
    const ref = this.inputRef();
    ref && (ref.nativeElement.value = value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }
}
