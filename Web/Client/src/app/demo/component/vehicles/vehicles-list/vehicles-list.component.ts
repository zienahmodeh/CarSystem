import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import {
  CloseOutline, DeleteOutline, EditOutline, EyeOutline,
  PlusOutline, ReloadOutline, SearchOutline, InboxOutline,
  InfoCircleOutline, DownOutline
} from '@ant-design/icons-angular/icons';

import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/demo/shared.module';
import { VehiclesDataService } from './vehicles-data.config/vehicles-data.service';
import { Make, ModelByYear, VehicleFilter, VehicleType } from './vehicles-data.config/vehicles';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, IconDirective, NgSelectModule],
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
  providers: [VehiclesDataService, DecimalPipe],
})
export class VehiclesListComponent implements OnInit {
  isMakesLoading = false;
  isModelsLoading = false;
  isSearching = false;

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
    this.isMakesLoading = true;
    this.service.getMakes().subscribe({
      next: (res) => {
        if (res.isSuccessfull) {
          this.makes = res.result;
        } else {
          this.toastr.error('Failed to load manufacturers');
        }
        this.isMakesLoading = false;
      },
      error: () => {
        this.isMakesLoading = false;
        this.toastr.error('Server error while loading makes');
      }
    });
  }

  onMakeChange() {
    this.filter.modelId = 0;
    this.filter.vehicleType = '';
    this.types = [];

    if (this.filter.makeId > 0) {
      this.isModelsLoading = true;
      this.service.getVehicleTypes(this.filter.makeId).subscribe({
        next: (res) => {
          if (res.isSuccessfull) {
            this.types = res.result;
          }
          this.isModelsLoading = false;
        },
        error: () => {
          this.isModelsLoading = false;
          this.toastr.error('Error fetching models');
        }
      });
    }
  }

  search() {
    if (!this.filter.makeId) {
      this.toastr.warning('Please select a manufacturer');
      return;
    }

    const selectedType = this.types.find(t => t.model_ID === this.filter.modelId);
    this.filter.vehicleType = selectedType ? selectedType.model_Name : '';

    this.isSearching = true;
    this.service.getModels(this.filter).subscribe({
      next: (res) => {
        if (res.isSuccessfull) {
          this.models = res.result;
        }
        this.isSearching = false;
      },
      error: () => {
        this.isSearching = false;
        this.toastr.error('Error fetching search results');
      }
    });
  }

  resetFilters() {
    this.filter = {
      makeId: 0,
      year: new Date().getFullYear(),
      vehicleType: '',
      modelId: 0
    };
    this.models = [];
    this.types = [];
    this.toastr.info('Filters have been reset');
  }
}