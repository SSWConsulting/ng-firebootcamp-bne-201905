import { Injectable } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as companyActions from './company.actions';
import { switchMap, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class CompanyEffects {

  constructor(
    private companyService: CompanyService,
    private actions$: Actions
  ) {
  }

  // load companies via service and trigger COMPANIES_LOAD_SUCCESS
  @Effect() companiesLoad$ = this.actions$
    .pipe(
      ofType<companyActions.CompaniesLoad>(companyActions.COMPANIES_LOAD),
      mergeMap(action => this.companyService.loadCompanies()
        .pipe(map(c => new companyActions.CompaniesLoadSuccess(c)))
      )
    );

  // perform company delete and trigger COMPANY_DELETE_SUCCESS
  @Effect() deleteCompany$ = this.actions$
    .pipe(
      ofType<companyActions.CompanyDelete>(companyActions.COMPANY_DELETE),
      mergeMap(action => {
        return this.companyService.deleteCompanyFromServer(action.payload)
          .pipe(map(c2 => new companyActions.CompanyDeleteSuccess(c2)));
      })
    );


    // after a successful delete, we fire COMPANIES_LOAD to reload the state
    @Effect() deleteCompanySuccess$ = this.actions$
    .pipe(
      ofType<companyActions.CompanyDeleteSuccess>(companyActions.COMPANY_DELETE_SUCCESS),
      map(a => new companyActions.CompaniesLoad())
    );

}
