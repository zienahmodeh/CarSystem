import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { IconService } from '@ant-design/icons-angular';
import {
  CloseOutline,
  DeleteOutline,
  EditOutline,
  EyeOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/demo/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarsDataService } from './cars-data.config/cars-data.service';
import { ICarForm } from './cars-data.config/cars';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  providers: [CarsDataService, DecimalPipe],
})
export class CarsListComponent {
  service = inject(CarsDataService);
  private iconService = inject(IconService);
  private toastr = inject(ToastrService);

  touchedCountry: boolean = false;

  editWarehouse: ICarForm = {
    id: null,
    name: '',
    address: '',
    city: '',
    countryId: null
  };
  isEditing = false;

  constructor(private modalService: NgbModal) {
    this.iconService.addIcon(CloseOutline, DeleteOutline, EditOutline, EyeOutline, PlusOutline );
  }

  ngOnInit() {
    this.pageChange(this.service.warehouseFilter.pageIndex || 1);
  }

  // openItemModal(warehouseId: string) {
  //   const modalRef = this.modalService.open(ViewWarehouseItemsComponent, { size: 'lg' });
  //   modalRef.componentInstance.warehouseId = warehouseId;
  //   modalRef.result.then(result => {
  //   }, reason => {
  //   });
  // }

  loadWarehouses() {
    this.service.GetWarehouseDataTable();
  }

  trackByWarehouseId(index: number, warehouse: any): number {
    return warehouse.id!;
  }

  onSearchChange() {
    this.service.warehouseFilter.pageIndex = 1;
    this.loadWarehouses();
  }

  pageChange(page: number) {
    this.service.warehouseFilter.pageIndex = page;
    this.loadWarehouses();
  }

  pageSizeChange(pageSize: number) {
    this.service.warehouseFilter.pageSize = pageSize;
    this.service.warehouseFilter.pageIndex = 1;
    this.loadWarehouses();
  }

  resetForm() {
    this.editWarehouse = { id: null, name: '', address: '', city: '', countryId: null };
    this.isEditing = false;
  }

  updateWarehouse(warehouse: any) {
    this.editWarehouse = { ...warehouse };
    this.isEditing = true;
  }

  saveWarehouse(form: NgForm) {
    if (!form.valid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.toastr.warning('Please fill in all required fields.', 'Validation');
      return;
    }
    this.service.createWarehouse(this.editWarehouse).subscribe(response => {
      if (response.isSuccessfull) {
        if (this.editWarehouse.id) {
          this.service.cars = this.service.cars.map(warehouse => warehouse.id === response.result.id ? response.result : warehouse);
          this.toastr.success('Updated successfully');
        } else {
          this.service.cars.unshift(response.result);
          this.service.total++;
          this.toastr.success('Created successfully');
        }
        this.resetForm();
      } else {
        response.errors.forEach(error => {
          this.toastr.error(error, 'Error');
        });
      }
    });
  }

  deleteWarehouse(id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete the warehouse?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteWarehouse(id).subscribe({
          next: () => {
            this.service.cars = this.service.cars.filter(car => car.id !== id);
            this.toastr.success('Deleted successfully', 'Success');
          },
          error: (err) => {
            this.toastr.error('Failed to delete warehouse', 'Error');
          }
        });
      }
    });
  }
}
