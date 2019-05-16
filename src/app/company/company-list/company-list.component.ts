import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor() { }

  companies: Company[] = [
    { name: 'Company A', email: 'companyA@ssw.com.au', phone: 12345 },
    { name: 'Company B', email: 'companyB@ssw.com.au', phone: 54321 },
    { name: 'Company C', email: 'companyC@ssw.com.au', phone: 67889 },
    { name: 'Company D', email: 'companyD@ssw.com.au', phone: 99999 },
  ];

  ngOnInit() {
  }

  getCompanies() {
    return this.companies;
  }

}
