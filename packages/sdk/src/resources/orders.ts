import type { HttpClient } from "../http.js";
import type {
  CancelOrderResponse,
  CreateOrderResponse,
  EWaybillUpdateParams,
  EWaybillUpdateResponse,
  Shipment,
  UpdateShipment,
} from "../types/index.js";

export class OrdersResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create one or more shipments.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/order-creation
   */
  create(shipments: Shipment[]): Promise<CreateOrderResponse> {
    return this.http.postForm<CreateOrderResponse>("/api/cmu/create.json", {
      format: "json",
      data: JSON.stringify({ shipments }),
    });
  }

  /**
   * Update one or more existing shipments.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/order-updation
   */
  update(shipments: UpdateShipment[]): Promise<CreateOrderResponse> {
    return this.http.postForm<CreateOrderResponse>("/api/cmu/update.json", {
      format: "json",
      data: JSON.stringify({ shipments }),
    });
  }

  /**
   * Cancel one or more shipments by waybill.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/order-cancellation
   */
  cancel(waybills: string[]): Promise<CancelOrderResponse[]> {
    // The API expects repeated `ids` query params + a `cancellation` flag
    const qs = new URLSearchParams(
      waybills.map((w) => ["ids", w] as [string, string]),
    );
    qs.set("cancellation", "true");
    return this.http.request<CancelOrderResponse[]>(
      `/api/p/edit?${qs.toString()}`,
      { method: "POST" },
    );
  }

  /**
   * Update the e-waybill number on a shipment.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/ewaybill-update
   */
  updateEWaybill(params: EWaybillUpdateParams): Promise<EWaybillUpdateResponse> {
    return this.http.postForm<EWaybillUpdateResponse>("/api/p/edit", {
      waybill: params.waybill,
      e_way_bill_no: params.e_way_bill_no,
    });
  }
}
