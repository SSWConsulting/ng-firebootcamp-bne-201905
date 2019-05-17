import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  company: Company;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.isNewCompany = !this.activatedRoute.snapshot.params['id'];
    this.buildForm();

  }

  buildForm() {
    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: [''],
        phone: ['']
      }
    );
  }

  saveCompany() {
    this.companyService.addCompany(this.companyForm.value)
    .subscribe(c => {
      this.router.navigateByUrl('/company/list');
    });
  }

}
