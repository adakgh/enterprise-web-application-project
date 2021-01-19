import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UnsavedChangesGuardService} from '../../guards/unsaved-changes-guard.service';
import {Location} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routes} from '../../app-routing.module';
import {SuppliersListComponent} from './suppliers-list.component';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';

describe('SuppliersListComponent', () => {
    let fixture: ComponentFixture<SuppliersListComponent>;      // The supplierInfoComponent
    let component: SuppliersListComponent;                      // The supplierInfoComponent typescript file
    let componentHtml: HTMLElement;                             // The supplierInfoComponent template HTML file
    let router: Router;                                         // The Router
    let location: Location;

    /** Configure the modules needed for the test before each test */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuppliersListComponent],
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
            fixture = TestBed.createComponent(SuppliersListComponent);
            component = fixture.componentInstance;
            componentHtml = fixture.debugElement.nativeElement;
            router = TestBed.get(Router);
            location = TestBed.get(Location);
            fixture.detectChanges();
        }
    );

    /** The description of the page should be rendered correctly */
    it('should render description of the page in a p tag', async(() => {
        expect(componentHtml.querySelector('p').textContent).toContain('Hier zijn alle geregistreerde leverancier te zien.');
    }));

    /** Should navigate the user to supplierinfo page 'when clicked' on 'zie volledige leverancier pagina' the click is faked */
    it('should navigate to supplier', fakeAsync(() => {
        router.navigate(['/supplierinfo'], {queryParams: {id: 1}});
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/supplierinfo?id=1');
    }));

});
