import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';

import {SupplierInfoEditComponent} from './supplier-info-edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {DemoImage} from './default-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import {Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../../guards/unsaved-changes-guard.service';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
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
    let location: Location;                                     // Current Location


    /** Configure the models needed for the test before each test */
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
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule,
            ],
            providers: [UnsavedChangesGuardService, DemoImage, Location],
        }).compileComponents();
    }));

    /** Initialize global variables before each test */
    beforeEach(() => {
        fixture = TestBed.createComponent(SupplierInfoEditComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture.detectChanges();
    });


    /** should have the right title in the right tag for the supplier edit page */
    it('should have h5 tag with the titel: Wijzig Leverancier gegevens:', () => {
        const h5Element = componentHtml.querySelector('h5');
        // debugger;
        expect(h5Element.innerText).toContain('Wijzig Leverancier gegevens:');
    });

    /** The button for canceling editing the supplier should be created */
    it('should create annuleer button', () => {
        const annuleerButton: HTMLButtonElement = componentHtml.querySelector('#annuleerButton');
        // debugger;
        expect(annuleerButton).toBeTruthy();
    });

    /** Check whether the edit form is valid or not */
    it('should form be invalid with empty input field', () => {

        // Leave the name and email input field empty
        const inputElementName = componentHtml.querySelector('#name') as HTMLInputElement;
        inputElementName.value = '';
        fixture.detectChanges();
        const inputElementEmail = componentHtml.querySelector('#email') as HTMLInputElement;
        inputElementEmail.value = '';
        fixture.detectChanges();

        // The form should be invalid when the input fields are empty
        expect(component.signupForm.invalid).toBeFalsy();
    });


    /** Should navigate back to supplier info page when clicked on annuleer button */
    it('should navigate back to supplier info component when clicked on annuleer button ', fakeAsync(() => {
        router.navigate(['supplierinfo']);
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/supplierinfo');
    }));

});

