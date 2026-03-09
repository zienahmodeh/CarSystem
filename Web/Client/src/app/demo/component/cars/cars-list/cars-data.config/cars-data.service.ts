import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Car, ICarFilter, ICarForm, ICarItemFilter } from './cars';

@Injectable({
  providedIn: 'root',
})
export class CarsDataService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  
  cars: Car[] = [];
  total: number = 0;


  public warehouseItems: any[] = [];

  totalwarehouseItems: number = 0;

  public warehouseForm: ICarForm = {
    id: null,
    name: '',
    address: '',
    city: '',
    countryId: null
  };

  warehouseFilter: ICarFilter = {
    keyword: '',
    direction: '',
    orderBy: '',
    pageIndex: 1,
    pageSize: 10
  }

  warehouseItemFilter: ICarItemFilter = {
    warehouseId: null,
    keyword: '',
    direction: '',
    orderBy: '',
    pageIndex: 1,
    pageSize: 10
  }

  constructor() { }

  GetWarehouseDataTable() {
    const requestBody = { ...this.warehouseFilter, pageIndex: this.warehouseFilter.pageIndex - 1 };
    this.http.post('Warehouse/GetWarehousesDataTable', requestBody).subscribe({
      next: (response: any) => {
        if (response) {
          this.cars = response.data;
          this.total = response.count;
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load warehouses', 'Error');
      }
    });
  }

  createWarehouse(warehouseData: ICarForm): Observable<any> {
    return this.http.post('Warehouse/SaveWarehouse', warehouseData);
  }


  deleteWarehouse(id: number): Observable<any> {
    return this.http.get('Warehouse/DeleteWarehouse', { params: { Id: id.toString() } });
  }

  getItemsByWarehouse(params: {
    warehouseId: string;
    keyword?: string;
    pageSize: number;
    pageIndex: number;
  }): Observable<any> {
    return this.http.post('Warehouse/GetWarehouseItemsByWarehouseDataTable', params);
  }

  GetWarehouseItemsByWarehouseDataTable(warehouseId: any) {
    const requestBody = {
      ...this.warehouseItemFilter,
      pageIndex: this.warehouseItemFilter.pageIndex - 1,
      warehouseId: warehouseId
    };

    this.http.post('Warehouse/GetWarehouseItemsByWarehouseDataTable', requestBody).subscribe({
      next: (response: any) => {
        if (response) {
          this.warehouseItems = response.result.data;
          this.totalwarehouseItems = response.result.count;
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load warehouse items', 'Error');
      }
    });
  }

}

