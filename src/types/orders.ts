import type { PaymentMode } from "./common.js";

export interface ShipmentItem {
  /** Product name */
  name: string;
  /** Number of units */
  units: number;
  /** Price per unit */
  selling_price: string;
  /** Discount amount */
  discount?: string;
  /** Tax percentage */
  tax?: string;
  /** HSN code */
  hsn?: string;
  /** SKU code */
  sku?: string;
}

export interface Shipment {
  /** Waybill number (leave empty for auto-assignment) */
  waybill?: string;
  /** Client-generated order ID (must be unique) */
  client_order_id: string;
  /** Order date (YYYY-MM-DD) */
  order: string;
  /** Pickup date (YYYY-MM-DD) */
  pickup_date?: string;
  /** Pickup location (warehouse name) */
  pickup_location: string;
  /** Payment mode */
  payment_mode: PaymentMode;
  /** COD amount (required when payment_mode is COD) */
  cod_amount?: number;
  /** Total invoice value */
  total_amount: number;
  /** Shipment weight in kg */
  weight: number;
  /** Length in cm */
  length?: number;
  /** Breadth in cm */
  breadth?: number;
  /** Height in cm */
  height?: number;
  /** Number of pieces */
  pieces?: number;
  /** Customer name */
  name: string;
  /** Customer phone */
  phone: string;
  /** Customer alternate phone */
  phone2?: string;
  /** Customer email */
  email?: string;
  /** Delivery address line 1 */
  add: string;
  /** Delivery address line 2 */
  address2?: string;
  /** Delivery city */
  city: string;
  /** Delivery state */
  state: string;
  /** Delivery country */
  country: string;
  /** Delivery pincode */
  pin: string;
  /** Return name */
  return_name?: string;
  /** Return phone */
  return_phone?: string;
  /** Return address */
  return_add?: string;
  /** Return city */
  return_city?: string;
  /** Return state */
  return_state?: string;
  /** Return pincode */
  return_pin?: string;
  /** Return country */
  return_country?: string;
  /** Invoice number */
  invoice?: string;
  /** E-waybill number */
  e_way_bill_no?: string;
  /** Seller ID */
  seller_tin?: string;
  /** Product details */
  products_desc?: string;
  /** GST number */
  gst_tin?: string;
  /** Items in the shipment */
  shipment_items?: ShipmentItem[];
}

export interface CreateOrderShipmentResult {
  waybill: string;
  client_order_id: string;
  remarks: string | null;
  status: "Success" | "Error";
  cod_amount?: string;
  refnum?: string;
}

export interface CreateOrderResponse {
  packages: CreateOrderShipmentResult[];
  cash_pickups?: number;
  prepaid_pickups?: number;
  cash_pickups_count?: number;
  prepaid_pickups_count?: number;
  pickup_scheduled_date?: string | null;
  pickup_tentative_date?: string | null;
  upload_wbn?: string | null;
  success?: boolean;
  rmk?: string | null;
}

export interface UpdateShipment {
  waybill: string;
  /** Updated fields — all optional */
  status?: string;
  name?: string;
  phone?: string;
  add?: string;
  city?: string;
  state?: string;
  pin?: string;
  country?: string;
  weight?: number;
  length?: number;
  breadth?: number;
  height?: number;
  payment_mode?: PaymentMode;
  cod_amount?: number;
}

export interface CancelOrderResponse {
  waybill: string;
  client_order_id?: string;
  remarks: string;
  status: "Success" | "Error";
}

export interface EWaybillUpdateParams {
  waybill: string;
  e_way_bill_no: string;
}

export interface EWaybillUpdateResponse {
  waybill: string;
  status: "Success" | "Error";
  message?: string;
}
