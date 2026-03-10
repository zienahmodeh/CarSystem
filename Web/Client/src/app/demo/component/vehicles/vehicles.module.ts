import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehicles-routing.module';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

@NgModule({
  imports: [
    CommonModule, 
    VehicleRoutingModule,
    VehiclesListComponent 
  ]
})
export class VehicleModule {}