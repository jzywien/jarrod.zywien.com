
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

  private url: string = 'api';

  constructor(private http: HttpClient) { }

  get(): Promise<any> {
    return this.http
      .get<any>(`${this.url}`)
      .toPromise();
  }
}