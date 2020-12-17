import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierInfoEditComponent} from './supplier-info-edit.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {DemoImage} from "./default-image";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {RouterModule} from "@angular/router";
import {UnsavedChangesGuardService} from "../../../guards/unsaved-changes-guard.service";

describe('SupplierInfoEditComponent', () => {
    let component: SupplierInfoEditComponent;
    let componentHtml: HTMLElement;
    let fixture: ComponentFixture<SupplierInfoEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierInfoEditComponent],
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

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplierInfoEditComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
