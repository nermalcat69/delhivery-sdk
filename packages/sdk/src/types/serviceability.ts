export interface PincodeServiceabilityParams {
  /** Origin pincode */
  origin_pin: string;
  /** Destination pincode */
  destination_pin: string;
  /** Payment mode */
  payment_mode: "Prepaid" | "COD";
  /** Shipment weight in kg */
  weight: number;
}

export interface ServiceabilityResult {
  /** Whether the destination pincode is serviceable */
  destination_sensitive: boolean;
  /** COD eligibility */
  cod: boolean;
  /** Pickup availability */
  pickup: boolean;
  /** Delivery serviceability */
  delivery: boolean;
  /** Origin city */
  origin_city: string;
  /** Destination city */
  destination_city: string;
}

export type PincodeServiceabilityResponse = ServiceabilityResult[];

export interface TATParams {
  /** Origin pincode */
  origin_pin: string;
  /** Destination pincode */
  destination_pin: string;
  /** Payment mode */
  payment_mode?: "Prepaid" | "COD";
}

export interface TATResponse {
  /** Estimated delivery date (YYYY-MM-DD) */
  estimated_date: string;
  /** Origin city name */
  origin: string;
  /** Destination city name */
  destination: string;
  /** Expected TAT in days */
  tat?: number;
}
