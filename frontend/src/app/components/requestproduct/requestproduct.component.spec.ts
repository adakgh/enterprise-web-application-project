import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestproductComponent} from './requestproduct.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CookieModule} from "ngx-cookie";

describe('RequestproductComponent', () => {
    let component: RequestproductComponent;                     // The component also viewable as .ts file
    let componentHtml: HTMLElement;                             // The html file of the component
    let fixture: ComponentFixture<RequestproductComponent>;     // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RequestproductComponent],
            imports: [HttpClientModule, RouterTestingModule, CookieModule.forRoot()]
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(RequestproductComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
