import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  tableName = "Table1";

  @Input()
  companies: Company[];

  @Output()
  companyDeleted: EventEmitter<Company> = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  deleteCompanyChild(company: Company) {
    this.companyDeleted.emit(company);
  }

  changes() {
    console.log('CHANGE DETECTED!');
  }

}
