import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppCardComponent } from "./app-card/app-card.component";

@NgModule({
  declarations: [
    AppCardComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppCardComponent,
  ]
})
export class SharedModule { }
