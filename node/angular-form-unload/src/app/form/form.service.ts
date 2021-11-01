import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // add keys
  private hasFormBeenChanged: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  getHasFormBeenChanged(): boolean {
    return this.hasFormBeenChanged.getValue();
  }

  setHasFormBeenChanged(val: boolean): void {
    this.hasFormBeenChanged.next(val);
  }
}
