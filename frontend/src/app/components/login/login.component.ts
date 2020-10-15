import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  errMsg = '';

  constructor(private apiService: ApiService, private router: Router) {
    // test values for the input fields
    this.model.username = 'user@gmail.com';
    this.model.password = 5678;
  }

  ngOnInit(): void {
    // remove token --> logout
    sessionStorage.removeItem('currentUser');
  }

  login(): void {
    this.apiService.post('/login', this.model).subscribe(
      resp => {
        if (resp.token == null) {
          this.errMsg = 'Username or password incorrect';
          return;
        }
        // save responseInfo (token, role, ...) for client-side routes
        sessionStorage.setItem('currentUser', JSON.stringify(resp));
        this.router.navigate(['/']);
      }, errResp => {
        this.errMsg = errResp.status;
      }
    );
  }
}
