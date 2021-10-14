import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalculationInsuranceService } from './services/calculation-insurance.service';

@Component({
  selector: 'insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  providers: [CalculationInsuranceService]
})
export class InsuranceComponent implements OnInit, OnDestroy{
  public claculatedInsurance: string = '';


  private subscription = new Subscription();

  constructor(public calculationInsuranceService: CalculationInsuranceService) {

  }

  ngOnInit() {
    this.subscription = this.calculationInsuranceService.calculatedInsuranceEvent
      .subscribe((amount: string) => {
        this.claculatedInsurance = amount;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
