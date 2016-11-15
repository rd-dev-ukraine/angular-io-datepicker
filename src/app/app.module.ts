import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePickerModule } from './datepicker/datepicker.module';
import { OverlayModule } from './overlay/overlay.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    OverlayModule,
    DatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
