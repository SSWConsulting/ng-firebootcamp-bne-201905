import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    console.log('calling httpclient');
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(catchError(this.errorHandler));
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`);
  }

  errorHandler(error: any): Observable<any> {
    console.error('COMPANY SERVICE ERROR:', error);
    return of({});
  }

}
