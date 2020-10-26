import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInfoEditComponent } from './supplier-info-edit.component';

describe('SupplierInfoEditComponent', () => {
  let component: SupplierInfoEditComponent;
  let fixture: ComponentFixture<SupplierInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
