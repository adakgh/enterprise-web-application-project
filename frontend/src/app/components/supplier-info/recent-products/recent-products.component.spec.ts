import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { RecentProductsComponent } from './recent-products.component';
import {AddrequestproductComponent} from "../../requestproduct/addrequestproduct/addrequestproduct.component";
import {RequestproductComponent} from "../../requestproduct/requestproduct.component";
import {CookieModule} from "ngx-cookie";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UnsavedChangesGuardService} from "../../../guards/unsaved-changes-guard.service";
import {DemoImage} from "../supplier-info-edit/default-image";

describe('RecentProductsComponent', () => {
    let component: RecentProductsComponent;                     // The component also viewable as .ts file
    let componentHtml: HTMLElement;                                // The html file of the component
    let fixture: ComponentFixture<RecentProductsComponent>;     // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecentProductsComponent],
            imports: [
                CookieModule.forRoot(),
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                RouterModule,
                ReactiveFormsModule,
            ],
            providers: [UnsavedChangesGuardService, DemoImage],
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(RecentProductsComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
