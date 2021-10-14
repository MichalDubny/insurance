import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PackageType } from '../../../insurance/models/packageType';
import { AdditionalInsuranceType } from '../../../insurance/models/additionalInsuranceType';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css'],
  providers: [CurrencyPipe]
})
export class AppCardComponent {
  @Input() label: string = ''
  @Input() amount: number = 0;
  @Input() cardText: string = ''
  @Input() isPerDay: boolean = true;
  @Input() selected: PackageType | AdditionalInsuranceType | undefined;
  @Input() isSelected: boolean =false;
  @Input() type: PackageType | AdditionalInsuranceType | undefined;
  @Input() isUnselectable: boolean = false;


  @Output() selectedEvent = new EventEmitter<any>();

  onSelected() {
    if(this.isUnselectable && this.selected === this.type){
          return this.selectedEvent.emit(null);
    }
    this.selectedEvent.emit(this.type);
  }
}
