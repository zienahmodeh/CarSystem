import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import {
  CloseOutline,
  DeleteOutline,
  EditOutline,
  EyeOutline,
  PlusOutline,
  ReloadOutline,
  SearchOutline,
  InboxOutline,
  InfoCircleOutline,
  DownOutline
} from '@ant-design/icons-angular/icons';

import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/demo/shared.module';
import { VehiclesDataService } from './vehicles-data.config/vehicles-data.service';
import { Make, ModelByYear, VehicleFilter, VehicleType } from './vehicles-data.config/vehicles';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, IconDirective],
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
  providers: [VehiclesDataService, DecimalPipe],
})
export class VehiclesListComponent implements OnInit {
  public service = inject(VehiclesDataService);
  private iconService = inject(IconService);
  private toastr = inject(ToastrService);

  makes: Make[] = [];
  types: VehicleType[] = []; 
  models: ModelByYear[] = []; 
  years: number[] = [];

  filter: VehicleFilter = {
    makeId: 0,
    year: new Date().getFullYear(),
    vehicleType: '',
    modelId: 0
  };

  isLoading = false;

  constructor() {
    this.iconService.addIcon(
      CloseOutline, DeleteOutline, EditOutline, EyeOutline, 
      PlusOutline, ReloadOutline, SearchOutline, InboxOutline, 
      InfoCircleOutline, DownOutline
    );

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 2010; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.loadMakes();
  }


  loadMakes() {
    this.service.getMakes().subscribe({
      next: (res) => {
        if (res.isSuccessfull) {
          this.makes = res.result;
        } else {
          this.toastr.error('Failed to load manufacturers');
        }
      },
      error: () => this.toastr.error('Server error while loading makes')
    });
  }

  onMakeChange() {
    debugger;

    this.filter.vehicleType = '';
    this.filter.modelId = 0;
    this.types = [];
    this.models = [];

    if (this.filter.makeId && this.filter.makeId > 0) {
      this.isLoading = true;
      this.service.getVehicleTypes(this.filter.makeId).subscribe({
        next: (res) => {
          debugger;
          if (res.isSuccessfull) {
            this.types = res.result;
          }
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Error fetching models for this manufacturer');
        }
      });
    }
  }

  search() {
    if (!this.filter.makeId || this.filter.makeId === 0) {
      this.toastr.warning('Please select a Vehicle Make first');
      return;
    }

    this.isLoading = true;
    this.service.getModels(this.filter).subscribe({
      next: (res) => {
        if (res.isSuccessfull) {
          this.models = res.result;
          if (this.models.length === 0) {
            this.toastr.info('No results found for these filters');
          }
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error occurred while searching');
      }
    });
  }

  resetFilters() {
    this.filter = {
      makeId: 0,
      year: this.years[0],
      vehicleType: '',
      modelId: 0
    };
    this.models = [];
    this.types = [];
    this.toastr.info('Filters have been reset');
  }
}