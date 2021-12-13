import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HasFormChangedService } from './has-form-changed.service';

@Injectable({
  providedIn: 'root',
})
export class HasFormChangedGuard implements CanDeactivate<unknown> {
  constructor(private formChangesService: HasFormChangedService) {}

  public canDeactivate(): boolean {
    return this.formChangesService.haveFormsBeenChanged()
      ? confirm(environment.hasFormChangedMessage)
      : true;
  }
}
