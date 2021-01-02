import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerifyUserComponent} from './verify-user.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CookieModule} from "ngx-cookie";

describe('VerifyUserComponent', () => {
    let component: VerifyUserComponent;                 // The component also viewable as .ts file
    let componentHtml: HTMLElement;                     // The html file of the component
    let fixture: ComponentFixture<VerifyUserComponent>; // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerifyUserComponent],
            imports: [HttpClientModule, RouterTestingModule, CookieModule.forRoot()]
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(VerifyUserComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
