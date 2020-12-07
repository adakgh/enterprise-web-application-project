import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {InquiryService} from '../../services/inquiry.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    userId = '';
    username = '';
    inquiry: any[] = [];

    constructor(private router: Router,
                public currentUserService: CurrentUserService,
                private authService: AuthService,
                private requestsService: InquiryService) {}

    ngOnInit(): void {
       this.isLoggedIn =  this.authService.isAuthenticated();
       this.username = this.currentUserService.getUsername();

       this.requestsService.getAllInquries().subscribe( res => this.inquiry = res);
    }

    logout(): void {
        this.router.navigate(['/logout']).then(() => {
            window.location.reload();
        });
    }
}
