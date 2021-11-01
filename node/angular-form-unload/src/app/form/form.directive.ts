import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from './form.service';

@Directive({
  selector: '[appForm]',
})
export class FormDirective implements OnInit, OnDestroy {
  @Input() public appForm!: FormGroup;
  public initialFormState = {};

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.shallowEqual(this.initialFormState, this.appForm.value)) {
      $event.returnValue = true;
    }
  }

  constructor(private formService: FormService) {}

  ngOnInit() {
    Object.assign(this.initialFormState, this.appForm.value);

    this.appForm.valueChanges.subscribe(() => {
      // debounce
      this.formService.setHasFormBeenChanged(
        !this.shallowEqual(this.initialFormState, this.appForm.value)
      );
    });
  }

  // Unsub
  ngOnDestroy() {
    this.formService.setHasFormBeenChanged(false);
  }

  // ramda equals
  shallowEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }
}
