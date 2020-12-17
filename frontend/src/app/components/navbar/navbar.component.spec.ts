import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CookieModule} from "ngx-cookie";

describe('NavbarComponent', () => {
    let component: NavbarComponent;                     // The component also viewable as .ts file
    let componentHtml: HTMLElement;                     // The html file of the component
    let fixture: ComponentFixture<NavbarComponent>;     // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [HttpClientModule, RouterTestingModule, CookieModule.forRoot()]
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
