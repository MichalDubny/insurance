import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { CalculationRequest } from "../models/calculationRequest";

const CALCULATE_URL = 'https://zadanie.ready.aston.sk/calculate'

@Injectable()
export class CalculationInsuranceService {

  public calculatedInsuranceEvent = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {

  }



  public fetchCalculation(body: CalculationRequest): Observable<any> {
    return this.http.post<CalculationRequest>(CALCULATE_URL, body);
  }
}
