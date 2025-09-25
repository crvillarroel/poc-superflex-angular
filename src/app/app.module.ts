import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { AbsenceSummaryComponent } from './absence-summary/absence-summary.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { AddComputerComponent } from './add-computer/add-computer.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ShippingInformationComponent,
    AbsenceSummaryComponent,
    AddObjectComponent,
    AddComputerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
