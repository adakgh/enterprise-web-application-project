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
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../../guards/unsaved-changes-guard.service';
import {Observable, of} from 'rxjs';
import {SupplierInfoService} from '../../../services/supplier-info.service';
import {SupplierInfoComponent} from "../supplier-info.component";

describe('SupplierInfoEditComponent', () => {
    let component: SupplierInfoEditComponent;
    let componentHtml: HTMLElement;
    let fixture: ComponentFixture<SupplierInfoEditComponent>;
    let router: Router;                                     // The supplierInfoComponent typscript file

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierInfoEditComponent],
            imports: [
                CookieModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                RouterModule,
                RouterTestingModule.withRoutes(
                    [{path: 'supplierinfo', component: SupplierInfoComponent}]
                )
            ],
            providers: [UnsavedChangesGuardService, DemoImage, {
                provide: SupplierInfoService,
                useClass: SupplierInfoServiceMock
            },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: {id: 1},
                    }
                }

                /*,
                {
                    provide: ActivatedRoute,
                    useValue: { // Mock
                        queryParams: of(
                            {
                                id: 1
                            }
                        )
                    }
                }*/],
        }).compileComponents();
    }));

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


    it('should have h5 tag with the titel', () => {
        const h5Element = componentHtml.querySelector('h5');
        // debugger;
        expect(h5Element.innerText).toContain('Wijzig Leverancier gegevens:');
    });

    it('Annuleer button should exist', () => {
        const annuleerButton: HTMLButtonElement = componentHtml.querySelector('#annuleerButton');
        // debugger;
        expect(annuleerButton).toBeTruthy();
    });

    it('When clicked on Annuleer button we should navigate back to supplier info component', () => {
        /*   const location = TestBed.get(Location);
           const annuleerButton: HTMLButtonElement = componentHtml.querySelector('#annuleerButton');
           annuleerButton.click();
           fixture.detectChanges();
           fixture.whenStable().then(() => {
               debugger;
               expect(location.path()).toBe('supplierinfo');
           });*/
        //
    });


    it('Get first supplier', fakeAsync(() => {

        /*router.navigate(['/1']);
         */

        /*    component.supplierId = 1;
            component.loadSupplierData(component.supplierId);
            tick(1500);*/

        console.log('Supplier id:');
        console.log(component.supplierId);
        expect(component).toBeTruthy();
    }));
});

class SupplierInfoServiceMock {
}
