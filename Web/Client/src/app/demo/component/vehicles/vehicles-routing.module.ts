import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vehicles-list',
        loadComponent: () => import('./vehicles-list/vehicles-list.component').then((c) => c.VehiclesListComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {}
