import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    public form: FormGroup;
    public customClass: string = "test-input-class";

    public constructor(private fb: FormBuilder) {
    }

    public ngOnInit(): void {
        this.form = this.fb.group({date: ""});
    }
}
