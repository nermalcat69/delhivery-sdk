import type { HttpClient } from "../http.js";
import type {
  NDRUpdateParams,
  NDRUpdateResponse,
  RVPQCParams,
  RVPQCResponse,
} from "../types/index.js";

export class NDRResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Submit an action on a Non-Delivery Report (NDR) shipment.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/ndr-api
   */
  update(params: NDRUpdateParams): Promise<NDRUpdateResponse> {
    return this.http.post<NDRUpdateResponse>(
      "/api/p/edit",
      params as unknown as Record<string, unknown>,
    );
  }

  /**
   * Submit QC for a reverse pickup (RVP) shipment.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/rvp_qc
   */
  rvpQC(params: RVPQCParams): Promise<RVPQCResponse> {
    return this.http.post<RVPQCResponse>(
      "/api/p/rvp-qc",
      params as unknown as Record<string, unknown>,
    );
  }
}
