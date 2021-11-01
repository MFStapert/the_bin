import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<any> {
  constructor(private formService: FormService) {}

  public canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (this.formService.getHasFormBeenChanged()) {
      return confirm(
        'You have unsaved changes! If you leave, your changes will be lost.'
      );
    }
    return true;
  }
}
