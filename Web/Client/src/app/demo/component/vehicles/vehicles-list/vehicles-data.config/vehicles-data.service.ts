import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  ModelByYear,
  VehicleFilter,
  ServiceOperationResult,
  Make,
  VehicleType
} from './vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDataService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  private readonly baseUrl = 'http://localhost:61111/api/cars';

  public models: ModelByYear[] = [];
  public total: number = 0;

  constructor() { }

  getMakes(): Observable<ServiceOperationResult<Make[]>> {
    return this.http.get<ServiceOperationResult<Make[]>>(`${this.baseUrl}/makes`);
  }

  getVehicleTypes(makeId: number): Observable<ServiceOperationResult<VehicleType[]>> {
    return this.http.get<ServiceOperationResult<VehicleType[]>>(`${this.baseUrl}/types/${makeId}`);
  }


  getModels(filter: VehicleFilter): Observable<ServiceOperationResult<ModelByYear[]>> {
    let params = new HttpParams()
      .set('makeId', filter.makeId.toString())
      .set('year', filter.year.toString());

    if (filter.modelId && filter.modelId > 0) {
      params = params.set('modelId', filter.modelId.toString());
    }

    if (filter.vehicleType) {
      params = params.set('vehicleType', filter.vehicleType);
    } else {
      params = params.set('vehicleType', ''); 
    }

    return this.http.get<ServiceOperationResult<ModelByYear[]>>(
      `${this.baseUrl}/models`,
      { params }
    );
  }


  loadModelsDataTable(filter: VehicleFilter) {
    this.getModels(filter).subscribe({
      next: (response) => {
        if (response.isSuccessfull) {
          this.models = response.result;
          this.total = response.result.length;
        } else {
          this.toastr.error('Operation failed on server');
        }
      },
      error: () => this.toastr.error('Failed to connect to the server', 'Connection Error')
    });
  }
}