import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: ''
    });
  }
}
