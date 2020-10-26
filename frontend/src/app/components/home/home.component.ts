import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  hasAdminRole = false;
  hasUserRole = false;
  userId = '';
  constructor() { }

  ngOnInit(): void {
      const sessionInfo = sessionStorage.getItem('currentUser');
      this.isLoggedIn = sessionInfo != null;
      if (sessionInfo) {
          this.hasAdminRole = JSON.parse(sessionInfo).role === 'ROLE_ADMIN';
          this.hasUserRole = JSON.parse(sessionInfo).role === 'ROLE_USER';
          this.userId = JSON.parse(sessionInfo).userId;
      }
  }
}
