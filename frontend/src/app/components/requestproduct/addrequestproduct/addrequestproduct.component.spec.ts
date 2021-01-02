import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddrequestproductComponent} from './addrequestproduct.component';
import {RequestproductComponent} from "../requestproduct.component";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {RouterModule} from "@angular/router";

describe('AddrequestproductComponent', () => {
    let component: AddrequestproductComponent;                     // The component also viewable as .ts file
    let componentHtml: HTMLElement;                                // The html file of the component
    let fixture: ComponentFixture<AddrequestproductComponent>;     // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddrequestproductComponent],
            imports: [
                CookieModule.forRoot(),
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                RouterModule,
                ReactiveFormsModule,
            ],
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(AddrequestproductComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
