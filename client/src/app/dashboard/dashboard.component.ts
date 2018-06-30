import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private dasboardService: DashboardService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  async fetchData() {
    const response = await this.dasboardService.get();
  }

}
