import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  template: `
    <h1>about</h1>
    <form [formGroup]="form" [hasFormChanged]="form">
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
