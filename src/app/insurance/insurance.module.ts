import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/components/shared.module';
import { InsuranceFromComponent } from './components/insurance-form.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';


@NgModule({
  declarations: [
    InsuranceComponent,
    InsuranceFromComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    InsuranceRoutingModule,
  ],
  providers: [],
  bootstrap: [InsuranceComponent]
})
export class InsuranceModule { }
