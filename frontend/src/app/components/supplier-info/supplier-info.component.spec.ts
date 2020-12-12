import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SupplierInfoComponent} from './supplier-info.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from "ngx-cookie";
import {DemoImage} from './supplier-info-edit/default-image';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {UnsavedChangesGuardService} from "../../guards/unsaved-changes-guard.service";
import {of} from "rxjs";
import {Component, NgZone} from '@angular/core';

describe('SupplierInfoComponent', () => {
    let component: SupplierInfoComponent;
    let componentHtml: HTMLElement;
    let fixture: ComponentFixture<SupplierInfoComponent>;
    let mockActiveRoute;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierInfoComponent],
            imports: [
                CookieModule.forRoot(),
                BrowserModule,
                AppRoutingModule,
                RouterTestingModule,
                HttpClientModule,
                FormsModule,
                RouterModule,
                ReactiveFormsModule,
            ],
            providers: [UnsavedChangesGuardService, DemoImage
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
            fixture = TestBed.createComponent(SupplierInfoComponent);
            component = fixture.componentInstance;
            componentHtml = fixture.debugElement.nativeElement;
            mockActiveRoute = {
                snapshot: {
                    queryParams: {
                        id: 1,
                    }
                }
            };
            router = TestBed.get(Router);
            fixture.detectChanges();
        }
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Get first supplier', fakeAsync(() => {
        router.navigate(['/1']);
        tick();
        expect(component).toBeTruthy();
    }));
});
