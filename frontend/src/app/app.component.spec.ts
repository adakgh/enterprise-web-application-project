import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";

describe('AppComponent', () => {
    let component: AppComponent;                     // The component also viewable as .ts file
    let componentHtml: HTMLElement;                  // The html file of the component
    let fixture: ComponentFixture<AppComponent>;     // The fixture

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [HttpClientModule, RouterTestingModule, CookieModule.forRoot()]
        }).compileComponents();
    }));

    // Initialize the attributes
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
