import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequestproductComponent } from './addrequestproduct.component';

describe('RequestproductDetailComponent', () => {
  let component: AddrequestproductComponent;
  let fixture: ComponentFixture<AddrequestproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrequestproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrequestproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
