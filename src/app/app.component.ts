import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup;
  myDate1 = new Date();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      myDate: new FormControl(new Date()),
      myInput: new FormControl("33444")
    });
  }
}
