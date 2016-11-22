# angular-io-datePicker

Customizable DatePicker component for Angular 2.

## Motivation

Existing DatePickers do not work as they should... So we have written another one 😏

## Installation

````shell
npm i angular-io-datepicker --save
````

## Code Example

#### [Demo](https://rd-dev-ukraine.github.io/angular-io-datepicker/)

You'll need to add `DatePickerModule` and `OverlayModule` to your application module. There is has to be `FormsModule`. If you use Model-Driven Form you'll need to add `ReactiveFormModule` too.

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormModule,
    OverlayModule,
    DatePickerModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

##### Template-Driven Form 

Simply add `date-picker` element with options to your form:

```html
<form #form="ngForm">
    <date-picker ngModel name="date"></date-picker>
</form>
```

##### Model-Driven Form

You'll need to add form initialization to your app-component at first:

```typescript
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
```

And then add `date-picker` element to your form:

```html
<form [formGroup]="form">
    <date-picker formControlName="date"></date-picker>
</form>
```

## API Reference

Options can be passed to an element via html attributes:

|Property         |Type   |Default                                                          |Description                                                                        |
| :-------------- | :---- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
|`mode`           |string |`date`                                                           |Changes view mode - date, datetime, time                                           |
|`disabled`       |boolean|`false`                                                          |Disables controls                                                                  |
|`showClearButton`|boolean|`true`                                                           |Show or not clear input button                                                     |
|`format`         |string | `defaultFormat = {"date": "LL","datetime": "LLL","time": "LT"};`|Changes view format that provides [moment](http://momentjs.com/docs/#/displaying/ )|


## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/rd-dev-ukraine/angular-io-datepicker/blob/master/LICENSE) file for more info.