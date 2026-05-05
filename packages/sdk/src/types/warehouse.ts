export interface CreateWarehouseParams {
  /** Warehouse name (must be unique per client) */
  name: string;
  /** Address line 1 */
  address: string;
  /** Address line 2 */
  address2?: string;
  /** City */
  city: string;
  /** State */
  state: string;
  /** Country */
  country: string;
  /** Pincode */
  pin: string;
  /** Phone number */
  phone: string;
  /** Email */
  email?: string;
  /** Registered name */
  registered_name?: string;
  /** Return address line 1 (if different from pickup) */
  return_address?: string;
  /** Return address line 2 */
  return_address2?: string;
  /** Return city */
  return_city?: string;
  /** Return state */
  return_state?: string;
  /** Return pincode */
  return_pin?: string;
  /** Return country */
  return_country?: string;
  /** GST number */
  gst_no?: string;
  /** E-way bill applicable */
  eway_applicable?: boolean;
}

export interface WarehouseResponse {
  data: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
    email?: string;
  };
  messages?: {
    name?: string[];
    pin?: string[];
  };
  status: "success" | "error";
}

export type UpdateWarehouseParams = Partial<CreateWarehouseParams> & {
  name: string;
};
