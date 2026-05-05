export interface DelhiveryClientOptions {
  /** Your Delhivery API token */
  token: string;
  /**
   * Base URL override. Defaults to the production endpoint.
   * Use `https://staging-express.delhivery.com` for sandbox.
   */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to 30_000. */
  timeout?: number;
}

export type PaymentMode = "Prepaid" | "COD" | "Pickup";

export type ProductType =
  | "E Dobba"
  | "Express Dobba"
  | "Very Fast"
  | "Air";

export interface Address {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
  email?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  raw?: unknown;
}
