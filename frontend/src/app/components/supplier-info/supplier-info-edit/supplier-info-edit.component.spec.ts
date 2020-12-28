import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';

import {SupplierInfoEditComponent} from './supplier-info-edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {DemoImage} from './default-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import {ActivatedRoute, NavigationExtras, Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../../guards/unsaved-changes-guard.service';
import {Observable, of} from 'rxjs';
import {SupplierInfoService} from '../../../services/supplier-info.service';

/**
 * @author Omer Citik
 * Testing the SupplierInfoEditComponent
 */
describe('SupplierInfoEditComponent', () => {
    let component: SupplierInfoEditComponent;                   // The supplierInfoEditComponent typescript class
    let componentHtml: HTMLElement;                             // The supplierInfoEditComponent HTML template
    let fixture: ComponentFixture<SupplierInfoEditComponent>;   // The supplierInfoEditComponent
    let router: Router;                                         // Router
    let supplierServiceMock: any;                               // Jasmine fake service shizzle

    /** Configure the moduels needed for the test before each test */
    beforeEach(async(() => {

        supplierServiceMock = jasmine.createSpyObj('SupplierInfoService', ['getSupplier']);
        supplierServiceMock.getSupplier.and.returnValue(of([]));

        // Configuring the modules/imports/providers needed
        TestBed.configureTestingModule({
            declarations: [SupplierInfoEditComponent],
            imports: [
                CookieModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [UnsavedChangesGuardService, DemoImage,
                {
                    provide: SupplierInfoService,
                    useValue: supplierServiceMock
                }
            ],
        }).compileComponents();
    }));

    /** Initialize global variables before each test */
    beforeEach(() => {
        fixture = TestBed.createComponent(SupplierInfoEditComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        router = TestBed.get(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have h5 tag with the titel: Wijzig Leverancier gegevens:', () => {
        const h5Element = componentHtml.querySelector('h5');
        // debugger;
        expect(h5Element.innerText).toContain('Wijzig Leverancier gegevens:');
    });

    it('should create annuleer button', () => {
        const annuleerButton: HTMLButtonElement = componentHtml.querySelector('#annuleerButton');
        // debugger;
        expect(annuleerButton).toBeTruthy();
    });



    it('should navigate back to supplier info component when clicked on annuleer button ', () => {
        spyOn(router, 'navigateByUrl');
        const annuleerButton: HTMLButtonElement = componentHtml.querySelector('#annuleerButton');
        annuleerButton.click();
        fixture.whenStable().then(() => {
            expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/supplierinfo'], {queryParams: {id: 1}}), {
                skipLocationChange: false,
                replaceUrl: false
            });
        });
    });

    it('Get first supplier', fakeAsync(() => {


    }));
});

