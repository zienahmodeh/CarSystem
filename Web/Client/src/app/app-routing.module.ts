import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesListComponent } from './demo/component/vehicles/vehicles-list/vehicles-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesListComponent 
  },
  {
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }