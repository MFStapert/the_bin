import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form/form.service';

@Component({
  selector: 'app-about',
  template: `
    <h1>about</h1>
    <form [formGroup]="form" [appForm]="form">
      <input formControlName="input" />
    </form>
  `,
})
export class AboutComponent implements OnInit {
  public form = new FormGroup({
    input: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}
}
