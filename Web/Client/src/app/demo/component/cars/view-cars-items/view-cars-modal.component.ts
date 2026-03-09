import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/demo/shared.module';
import { CarsDataService } from '../cars-list/cars-data.config/cars-data.service';

@Component({
  selector: 'app-view-warehouse-items-modal',
  imports: [SharedModule],
  templateUrl: './view-warehouse-items-modal.component.html',
})
export class ViewWarehouseItemsComponent implements OnInit {
  @Input() warehouseId!: string;


  constructor(
    public activeModal: NgbActiveModal,
    public itemService: CarsDataService
  ) { }

  ngOnInit(): void {
    this.pageChange(this.itemService.warehouseItemFilter.pageIndex || 1);
  }

  loadItems() {
    this.itemService.GetWarehouseItemsByWarehouseDataTable(this.warehouseId);
  }

  trackByItemId(index: number, item: any): number {
    return item.id!;
  }

  onSearchChange() {
    this.itemService.warehouseItemFilter.pageIndex = 1;
    this.loadItems();
  }

  pageChange(page: number) {
    this.itemService.warehouseItemFilter.pageIndex = page;
    this.loadItems();
  }

  pageSizeChange(pageSize: number) {
    this.itemService.warehouseItemFilter.pageSize = pageSize;
    this.itemService.warehouseItemFilter.pageIndex = 1;
    this.loadItems();
  }
}
