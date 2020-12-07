import {Component, OnInit} from '@angular/core';
import {VerifyUserService} from '../../services/verify-user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-verify-user',
    templateUrl: './verify-user.component.html',
    styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

    constructor(private verifyUserService: VerifyUserService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParams.token;
        this.verifyUser(token);
    }

    verifyUser(token: string): void {
        this.verifyUserService.verifyRegister(token).subscribe(res => {
                setTimeout(() => {
                    this.router.navigate(['/login']).then(() => {
                        window.location.reload();
                    });
                }, 3000);
            },
            err => {
                console.log('error:', err.message);
            });
    }

}
