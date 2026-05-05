import type { HttpClient } from "../http.js";
import type {
  LabelGenerateParams,
  PickupScheduleParams,
  PickupScheduleResponse,
  ShippingCostParams,
  ShippingCostResponse,
  WaybillFetchResponse,
} from "../types/index.js";

export class ShippingResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Calculate the estimated shipping cost between two pincodes.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/calculate-shipping-cost
   */
  calculateCost(params: ShippingCostParams): Promise<ShippingCostResponse> {
    return this.http.get<ShippingCostResponse>(
      "/api/kinesis/calculate-shipping/",
      {
        origin_pin: params.origin_pin,
        destination_pin: params.destination_pin,
        payment_mode: params.payment_mode,
        weight: params.weight,
        breadth: params.breadth,
        length: params.length,
        height: params.height,
        cod_amount: params.cod_amount,
      },
    );
  }

  /**
   * Fetch a batch of pre-assigned waybill numbers.
   * `count` must be between 1 and 100.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/fetch-waybill
   */
  fetchWaybills(count: number): Promise<WaybillFetchResponse> {
    return this.http.get<WaybillFetchResponse>("/api/p/register", {
      format: "json",
      count,
    });
  }

  /**
   * Generate a shipping label (PDF) for one or more waybill numbers.
   * Returns the raw PDF buffer — write to a file or stream it.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/generate-shipping-label
   */
  generateLabel(params: LabelGenerateParams): Promise<ArrayBuffer> {
    return this.http.getBinary("/api/p/packing_slip", {
      waybill: params.waybill,
      pdf: 1,
    });
  }

  /**
   * Schedule a courier pickup from a warehouse.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/pickup-scheduling
   */
  schedulePickup(params: PickupScheduleParams): Promise<PickupScheduleResponse> {
    return this.http.post<PickupScheduleResponse>("/fm/request/new/", {
      pickup_date: params.pickup_date,
      expected_package_quantity: params.expected_package_quantity,
      ...(params.waybill_list && { waybill_list: params.waybill_list }),
      ...(params.client_warehouse_code && {
        client_warehouse_code: params.client_warehouse_code,
      }),
    });
  }
}
