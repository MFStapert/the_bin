import { Injectable } from '@angular/core';
import { equals } from 'ramda';
import { v4 as uuid } from 'uuid';

interface FormStates {
  initialState: unknown;
  currentState: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class HasFormChangedService {
  private formStates: Record<string, FormStates> = {};
  public static ERROR_MSG = 'Form id is not present HasFormChangedService';

  public haveFormsBeenChanged(): boolean {
    return Object.values(this.formStates).some(
      (state) => !equals(state.initialState, state.currentState)
    );
  }

  public registerNewForm(state?: unknown): string {
    const id = uuid();
    this.formStates[id] = { initialState: state, currentState: state };
    return id;
  }

  public setFormState(id: string, state?: unknown): void {
    if (this.isFormIdNotPresent(id)) {
      throw Error(HasFormChangedService.ERROR_MSG);
    }
    this.formStates[id] = { initialState: state, currentState: state };
  }

  public setCurrentFormState(id: string, currentState?: unknown): void {
    if (this.isFormIdNotPresent(id)) {
      throw Error(HasFormChangedService.ERROR_MSG);
    }
    this.formStates[id].currentState = currentState;
  }

  public removeForm(id: string): void {
    if (this.isFormIdNotPresent(id)) {
      throw Error(HasFormChangedService.ERROR_MSG);
    }
    delete this.formStates[id];
  }

  public clearForms(): void {
    Object.keys(this.formStates).forEach((key) => {
      this.formStates[key] = { initialState: null, currentState: null };
    });
  }

  private isFormIdNotPresent(id: string): boolean {
    return !(id in this.formStates);
  }
}
