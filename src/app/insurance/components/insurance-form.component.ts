import { formatDate } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdditionalInsuranceType } from '../models/additionalInsuranceType';
import { CalculationRequest } from '../models/calculationRequest';
import { PackageType } from '../models/packageType';
import { TypeOfInsurance } from '../models/typeOfInsurance';
import { CalculationInsuranceService } from '../services/calculation-insurance.service';

@Component({
  selector: 'insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFromComponent implements OnDestroy {

  public readonly TYPE_OF_INSURANCE = TypeOfInsurance;
  public readonly PACKAGE_TYPE = PackageType;
  public readonly ADDITIONAL_INSURANCE = AdditionalInsuranceType;


  public selectedType: TypeOfInsurance = TypeOfInsurance.KCP;
  public selectedPackage: PackageType = PackageType.ZAKLADNY;
  public selectedAddInsurance: AdditionalInsuranceType[] = [AdditionalInsuranceType.SPORT];

  public isBusy: boolean= false;

  private subscriptions = new Subscription();

  public form!: FormGroup;

  constructor(private calculationInsuranceService: CalculationInsuranceService) {

  }


  ngOnInit() {
    const date = new Date();
    const nextDay = date.setDate(date.getDate() + 1);
    this.form = new FormGroup({
      dateFrom: new FormControl(formatDate(new Date().toISOString(), 'yyyy-MM-dd', 'en'), {
        validators: [Validators.required],
      }),
      dateTo: new FormControl(formatDate(nextDay, 'yyyy-MM-dd', 'en'), {
        validators: [Validators.required],
      }),
      numberPersons: new FormControl(1, {
        validators: [Validators.required, Validators.min(1), Validators.max(3)],
      })
    });
  }

  selectTypeOfInsutrence(selectedType: TypeOfInsurance) {
    this.selectedType = selectedType;
  }

  onSelectedPackageType(packageType: PackageType) {
    this.selectedPackage = packageType;
  }

  onSelectedAddInsuranceType(selected: AdditionalInsuranceType) {
    if (this.selectedAddInsurance.includes(selected)) {
      const index = this.selectedAddInsurance.indexOf(selected);
      this.selectedAddInsurance.splice(index, 1)
    } else {
      this.selectedAddInsurance.push(selected)
    }
  }

  onSubmitForm() {
    if (this.isValid()) {
      this.isBusy = true;
      const calculation: CalculationRequest = {
        variant: this.selectedType,
        zaciatokPoistenia: this.form.controls.dateFrom.value,
        koniecPoistenia: this.form.controls.dateTo.value || '',
        balik: this.selectedPackage,
        pocetOsob: this.form.controls.numberPersons.value,
        pripoistenia: this.selectedAddInsurance,
      };

      this.subscriptions.add(this.calculationInsuranceService.fetchCalculation(calculation)
        .subscribe((claculatedInsurance: string) => {
          this.calculationInsuranceService.calculatedInsuranceEvent.next(claculatedInsurance);
          this.isBusy = false;
        })
      )
    }
  }

  public isValid(): boolean {
    return (this.form.controls.dateFrom.valid &&
      (this.form.controls.dateTo.valid || TypeOfInsurance.CCP === this.selectedType) &&
      this.form.controls.numberPersons.valid
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
