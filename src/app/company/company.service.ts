import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import * as companyActions from '../reducers/company.actions';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}

  init() {
    this.store.dispatch(new companyActions.CompaniesLoad());
  }

  API_BASE = environment.API_BASE;

  loadCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(catchError(this.errorHandler));
  }

  getCompanies(): Observable<Company[]> {
    return this.store.select(s => s.companies);
  }

  deleteCompany(company: Company) {
    this.store.dispatch(new companyActions.CompanyDelete(company));
  }

  deleteCompanyFromServer(company: Company): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`);
  }

  addCompany(company: Company)  {
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(catchError(this.errorHandler))
    .subscribe(c => this.store.dispatch(new companyActions.CompaniesLoad()));
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  saveCompany(company: Company) {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(catchError(this.errorHandler))
    .subscribe(c => this.store.dispatch(new companyActions.CompaniesLoad()));
  }

  errorHandler(error: any): Observable<any> {
    console.error('COMPANY SERVICE ERROR:', error);
    return of({});
  }

}
