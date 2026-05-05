import type { PaymentMode } from "./common.js";

export interface ShippingCostParams {
  /** Origin pincode */
  origin_pin: string;
  /** Destination pincode */
  destination_pin: string;
  /** Payment mode */
  payment_mode: PaymentMode;
  /** Weight in kg */
  weight: number;
  /** Breadth in cm */
  breadth?: number;
  /** Length in cm */
  length?: number;
  /** Height in cm */
  height?: number;
  /** COD amount (required if payment_mode is COD) */
  cod_amount?: number;
}

export interface ShippingCostResponse {
  /** Estimated total charge */
  total_amount?: number;
  /** Freight charge */
  freight_charge?: number;
  /** COD charge */
  cod_charge?: number;
  /** Handling charge */
  handling_charge?: number;
  /** Insurance charge */
  insurance?: number;
  /** Fuel surcharge */
  fuel_surcharge?: number;
  /** Green tax */
  green_tax?: number;
  /** Service tax */
  service_tax?: number;
  /** Forward charge */
  forward_charge?: number;
  gross_amount?: number;
  sub_total?: number;
  tax?: number;
}

export interface WaybillFetchResponse {
  waybill_list: string[];
}

export interface LabelGenerateParams {
  /** Comma-separated waybill numbers */
  waybill: string;
}

export interface PickupScheduleParams {
  /** Pickup time slot (YYYY-MM-DD) */
  pickup_date: string;
  /** Expected number of packages */
  expected_package_quantity: number;
  /** Client waybill numbers (optional) */
  waybill_list?: string[];
  /** Pickup location/warehouse name */
  client_warehouse_code?: string;
}

export interface PickupScheduleResponse {
  pickup_id?: string;
  registered?: boolean;
  confirmed?: string;
  registered_pickup_date?: string;
  pickup_succ_list?: string[];
  pickup_already_exists_list?: string[];
  pickup_failure_list?: string[];
}
