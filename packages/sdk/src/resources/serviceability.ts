import type { HttpClient } from "../http.js";
import type {
  PincodeServiceabilityParams,
  PincodeServiceabilityResponse,
  TATParams,
  TATResponse,
} from "../types/index.js";

export class ServiceabilityResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Check if a destination pincode is serviceable from an origin pincode.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/pincode-serviceability
   */
  check(params: PincodeServiceabilityParams): Promise<PincodeServiceabilityResponse> {
    return this.http.get<PincodeServiceabilityResponse>(
      "/c/api/pin-codes/json/",
      {
        filter_codes: params.destination_pin,
        type: params.payment_mode === "COD" ? "cod" : "prepaid",
        origin_pin: params.origin_pin,
        weight: params.weight,
      },
    );
  }

  /**
   * Get the expected TAT (Turn-Around Time) between two pincodes.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/expected-tat-api
   */
  expectedTAT(params: TATParams): Promise<TATResponse> {
    return this.http.get<TATResponse>(
      "/api/kinesis/last-miles/latencies/",
      {
        origin_pin: params.origin_pin,
        destination_pin: params.destination_pin,
        ...(params.payment_mode && { payment_mode: params.payment_mode }),
      },
    );
  }
}
