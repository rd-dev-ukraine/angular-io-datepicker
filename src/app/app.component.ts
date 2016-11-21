import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup;
  form3: FormGroup;
  adsf1 = new Date();


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      myDate: ['']
    });
    this.form3 = this.fb.group({
      myDate4: ['']
    });
  }
}
