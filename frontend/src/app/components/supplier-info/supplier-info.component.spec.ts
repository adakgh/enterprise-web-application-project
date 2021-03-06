import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SupplierInfoComponent} from './supplier-info.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {DemoImage} from './supplier-info-edit/default-image';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../guards/unsaved-changes-guard.service';
import {Location} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { routes } from '../../app-routing.module';

describe('SupplierInfoComponent', () => {
    let fixture: ComponentFixture<SupplierInfoComponent>;   // The supplierInfoComponent
    let component: SupplierInfoComponent;                   // The supplierInfoComponent typescript file
    let componentHtml: HTMLElement;                         // The supplierInfoComponent template HTML file
    let router: Router;                                     // The Router
    let location: Location;                                 // Current Location

    /** Configure the modules needed for the test before each test */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierInfoComponent],
            imports: [
                CookieModule.forRoot(),
                BrowserModule,
                RouterTestingModule.withRoutes(routes),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
            ],
            providers: [UnsavedChangesGuardService, DemoImage, Location]
        }).compileComponents();
    }));

    /** Initialize global variables before each test */
    beforeEach(() => {
            fixture = TestBed.createComponent(SupplierInfoComponent);
            component = fixture.componentInstance;
            componentHtml = fixture.debugElement.nativeElement;
            router = TestBed.get(Router);
            location = TestBed.get(Location);
            fixture.detectChanges();
        }
    );

    /** Should navigate the user when clicked on 'Wijzigen' link to the supplier edit page the wijzigen click is faked */
    it('should navigate to "supplierinfo/edit" page', fakeAsync(() => {
        router.navigate(['supplierinfo/edit']);
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/supplierinfo/edit');
    }));

});
