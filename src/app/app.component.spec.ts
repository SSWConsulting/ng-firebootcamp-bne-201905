import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { setDefaultService } from 'selenium-webdriver/opera';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from './company/company.service';
import { DebugElement } from '@angular/core';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe(`Component: App Component`, () => {
  let companyService;

  beforeEach(() => {
    companyService = {
      getCompanies: () =>
        of([
          {
            name: 'TestCorp',
            email: 'fds@setDefaultService.com',
            phone: 3456346
          }
        ])
    };
  });

  it('can add 1+1', () => {
    expect(1 + 1).toEqual(2);
  });

  it(`title equals 'Angular Superpowers'`, () => {
    const component = new AppComponent(null);
    expect(component.title).toEqual('firebootcamp-crm');
  });

  it('should get company count onInit', () => {
    // arrange
    let component = new AppComponent(companyService);
    // act
    component.ngOnInit();
    // assert
    component.companiesCount$.subscribe(c => {
      expect(c).toBe(1);
    });
  });

  it('should get company count of 2', () => {
    spyOn(companyService, 'getCompanies').and.returnValue(
      of([
        {
          name: 'TestCorp',
          email: 'fds@setDefaultService.com',
          phone: 3456346
        },
        {
          name: 'TestCorp2',
          email: 'fds@setDefaultService.com',
          phone: 3456346
        }
      ])
    );
    let component = new AppComponent(companyService);
    component.ngOnInit();
    component.companiesCount$.subscribe(c => {
      expect(c).toBe(2);
    });
  });
});



describe('TestBed Tests', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  });


  it(`companyCount = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      }
    ]));
    fixture.detectChanges();

    expect(component.companiesCount$.subscribe(c => {
      expect(c).toEqual(1);
    }));
  });


  it(`CompanyCount HTML should update`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      }
    ]));
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');
  });


});
