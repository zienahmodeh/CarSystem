export interface ItemData {
  itemName: string;
  qty: number;
}

export interface WarehouseStatus {
  name: string;
  totalItems: number;
}

export interface DashboardDataDTO {
  topHighItems: ItemData[];
  topLowItems: ItemData[];
  warehouseStatus: WarehouseStatus[];
}
