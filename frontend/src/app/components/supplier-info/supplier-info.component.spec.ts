import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SupplierInfoComponent} from './supplier-info.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {DemoImage} from './supplier-info-edit/default-image';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../guards/unsaved-changes-guard.service';
import {of} from 'rxjs';

describe('SupplierInfoComponent', () => {
    let fixture: ComponentFixture<SupplierInfoComponent>;   // The supplierInfoComponent
    let component: SupplierInfoComponent;                   // The supplierInfoComponent typescript file
    let componentHtml: HTMLElement;                         // The supplierInfoComponent template HTML file
    let router: Router;                                     // The Router

    /** Configure the moduels needed for the test before each test */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierInfoComponent],
            imports: [
                CookieModule.forRoot(),
                BrowserModule,
                AppRoutingModule,
                RouterTestingModule,
                HttpClientModule,
                RouterModule,
            ],
            providers: [UnsavedChangesGuardService, DemoImage]
        }).compileComponents();
    }));

    /** Initialize global variables before each test */
    beforeEach(() => {
            fixture = TestBed.createComponent(SupplierInfoComponent);
            component = fixture.componentInstance;
            componentHtml = fixture.debugElement.nativeElement;
            router = TestBed.get(Router);
            fixture.detectChanges();
        }
    );


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to edit page', () => {
        router.navigate(['edit'], {queryParams: {id: 1}});
        // debugger;
    });

});
