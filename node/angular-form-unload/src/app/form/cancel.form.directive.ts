import { Directive, HostListener } from '@angular/core';
import { HasFormChangedService } from './has-form-changed.service';

@Directive({
  selector: '[cancelForm]',
})
export class CancelFormDirective {
  constructor(private hasFormChangedService: HasFormChangedService) {}

  @HostListener('click', ['$event'])
  public onClick(): void {
    this.hasFormChangedService.clearForms();
  }
}
