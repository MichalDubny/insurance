import { AdditionalInsuranceType } from "./additionalInsuranceType"
import { PackageType } from "./packageType"
import { TypeOfInsurance } from "./typeOfInsurance"

export interface CalculationRequest {
  variant: TypeOfInsurance;
  zaciatokPoistenia?: string;
  koniecPoistenia?: string;
  balik: PackageType;
  pocetOsob: number;
  pripoistenia: AdditionalInsuranceType[];
}
