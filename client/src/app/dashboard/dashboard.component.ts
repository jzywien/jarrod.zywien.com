import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private dasboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }

  get loggedIn() {
    return this.auth.loggedIn;
  }

  async fetchData() {
    const response = await this.dasboardService.get();
    console.log(response);
  }

}
