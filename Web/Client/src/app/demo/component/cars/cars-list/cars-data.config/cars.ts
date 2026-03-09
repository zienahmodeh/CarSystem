export interface Car {
  id: any;
  name: string;
  address: string;
  city: string;
  country: any;
  countryId: any;
}
export interface ICarForm {
  id: any;
  name: string;
  address: string;
  city: string;
  countryId: any;
};
export interface ICarFilter {
  keyword: string,
  direction: string,
  orderBy: string,
  pageSize: number,
  pageIndex: number;
}
export interface ICarItemFilter {
  warehouseId: any,
  keyword: string,
  direction: string,
  orderBy: string,
  pageSize: number,
  pageIndex: number;
}
