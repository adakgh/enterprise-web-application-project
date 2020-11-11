import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    userId = '';
    username = '';

    constructor(private router: Router,
                public currentUserService: CurrentUserService,
                private authService: AuthService) {}

    ngOnInit(): void {
       this.isLoggedIn =  this.authService.isAuthenticated();
       this.username = this.currentUserService.getUsername();
    }

    logout(): void {
        this.router.navigate(['/logout']).then(() => {
            window.location.reload();
        });
    }
}
