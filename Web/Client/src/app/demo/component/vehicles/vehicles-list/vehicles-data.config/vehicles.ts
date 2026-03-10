export interface ServiceOperationResult<T> {
  isSuccessfull: boolean;
  result: T;
  errorCodes: any[];
  errors: string[];
}

export interface Make {
  make_ID: number;
  make_Name: string;
}

export interface VehicleType {
  make_ID: number;    
  make_Name: string;   
  model_ID: number;   
  model_Name: string;
}

export interface ModelByYear {
  make_ID: number;
  make_Name: string;
  model_ID: number;
  model_Name: string;
}

export interface VehicleFilter {
  makeId: number;
  year: number;
  vehicleType?: string;
  modelId?: number;
}