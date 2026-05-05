import type { HttpClient } from "../http.js";
import type { TrackingParams, TrackingResponse } from "../types/index.js";

export class TrackingResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Track one or more shipments by waybill or reference (client order ID).
   * Provide either `waybill` or `ref_ids` (comma-separated, max 10 each).
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/order-tracking
   */
  track(params: TrackingParams): Promise<TrackingResponse> {
    return this.http.get<TrackingResponse>("/api/v1/packages/json/", {
      ...(params.waybill && { waybill: params.waybill }),
      ...(params.ref_ids && { ref_ids: params.ref_ids }),
    });
  }

  /** Track a single waybill. */
  trackOne(waybill: string): Promise<TrackingResponse> {
    return this.track({ waybill });
  }

  /** Track multiple waybills (max 10). */
  trackMany(waybills: string[]): Promise<TrackingResponse> {
    return this.track({ waybill: waybills.join(",") });
  }
}
