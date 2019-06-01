import { Action } from '@ngrx/store';
import { Company } from '../company/company';

export const COMPANIES_LOAD = '[COMPANIES] COMPANIES_LOAD';
export const COMPANIES_LOAD_SUCCESS = '[COMPANIES] COMPANIES_LOAD_SUCCESS';
export const COMPANY_DELETE = '[COMPANIES] COMPANY_DELETE';
export const COMPANY_DELETE_SUCCESS = '[COMPANIES] COMPANY_DELETE_SUCCESS';


export class CompaniesLoad implements Action {
  readonly type = COMPANIES_LOAD;
  constructor() { }
}

export class CompaniesLoadSuccess implements Action {
  readonly type = COMPANIES_LOAD_SUCCESS;
  constructor(public payload: Company[]) { }
}

export class CompanyDelete implements Action {
  readonly type = COMPANY_DELETE;
  constructor(public payload: Company) { }
}

export class CompanyDeleteSuccess implements Action {
  readonly type = COMPANY_DELETE_SUCCESS;
  constructor(public payload: Company) { }
}

export type All
  = CompaniesLoad
  | CompaniesLoadSuccess
  | CompanyDelete
  | CompanyDeleteSuccess;
