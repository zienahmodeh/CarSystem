import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DashboardDataDTO } from './default';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  constructor() { }

  getDashboardData(): Observable<DashboardDataDTO> {
    return this.http.get<DashboardDataDTO>('Dashboards/GetDashboardData');
  }
}
