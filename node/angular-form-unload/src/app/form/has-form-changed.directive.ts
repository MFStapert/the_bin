import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HasFormChangedService } from './has-form-changed.service';

@Directive({
  selector: '[hasFormChanged]',
})
export class HasFormChangedDirective implements OnInit, OnDestroy {
  @Input() public hasFormChanged!: AbstractControl;
  private formId = this.hasFormChangedService.registerNewForm();
  private subscription?: Subscription;

  constructor(private hasFormChangedService: HasFormChangedService) {}

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasFormChangedService.haveFormsBeenChanged()) {
      event.preventDefault();
      event.returnValue = false;
    }
  }

  @HostListener('submit')
  public onSubmit(): void {
    this.hasFormChangedService.clearForms();
  }

  // Not necesary
  // @HostListener('window:keydown', ['$event'])
  // public keyEvent(event: KeyboardEvent) {
  //   // stop enter from submitting forms
  //   //
  //   if (event.keyCode == 13) {
  //     event.preventDefault();
  //   }
  // }

  public ngOnInit(): void {
    this.hasFormChangedService.setFormState(
      this.formId,
      this.hasFormChanged.value
    );
    this.subscription = this.hasFormChanged.valueChanges
      .pipe(debounceTime(250))
      .subscribe((value) => {
        if (this.hasFormChanged.dirty) {
          this.hasFormChangedService.setCurrentFormState(this.formId, value);
          return;
        }
        // If we get valueChanges while the form is not dirty it usually means we are programmatically setting
        // the control, so we need to reset its state in order to check for changes from the user
        this.hasFormChangedService.setFormState(this.formId, value);
      });
  }

  public ngOnDestroy() {
    this.hasFormChangedService.removeForm(this.formId);
    this.subscription?.unsubscribe();
  }
}
