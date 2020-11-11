import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestproductComponent } from './requestproduct.component';

describe('RequestproductComponent', () => {
  let component: RequestproductComponent;
  let fixture: ComponentFixture<RequestproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
