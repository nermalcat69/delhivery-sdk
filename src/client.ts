import { DEFAULT_BASE_URL, HttpClient } from "./http.js";
import { DocumentsResource } from "./resources/documents.js";
import { NDRResource } from "./resources/ndr.js";
import { OrdersResource } from "./resources/orders.js";
import { ServiceabilityResource } from "./resources/serviceability.js";
import { ShippingResource } from "./resources/shipping.js";
import { TrackingResource } from "./resources/tracking.js";
import { WarehousesResource } from "./resources/warehouses.js";
import type { DelhiveryClientOptions } from "./types/index.js";

export class DelhiveryClient {
  /** Pincode serviceability and expected TAT */
  readonly serviceability: ServiceabilityResource;
  /** Order creation, update, cancellation, and e-waybill update */
  readonly orders: OrdersResource;
  /** Shipment tracking */
  readonly tracking: TrackingResource;
  /** Shipping cost calculator, waybill fetch, label generation, pickup scheduling */
  readonly shipping: ShippingResource;
  /** Warehouse creation and management */
  readonly warehouses: WarehousesResource;
  /** NDR actions and reverse pickup QC */
  readonly ndr: NDRResource;
  /** Document downloads (label, invoice, manifest, POD) */
  readonly documents: DocumentsResource;

  constructor(options: DelhiveryClientOptions) {
    if (!options.token) {
      throw new Error("Delhivery API token is required.");
    }

    const http = new HttpClient(
      options.token,
      options.baseUrl ?? DEFAULT_BASE_URL,
      options.timeout ?? 30_000,
    );

    this.serviceability = new ServiceabilityResource(http);
    this.orders = new OrdersResource(http);
    this.tracking = new TrackingResource(http);
    this.shipping = new ShippingResource(http);
    this.warehouses = new WarehousesResource(http);
    this.ndr = new NDRResource(http);
    this.documents = new DocumentsResource(http);
  }
}
