export interface TrackingParams {
  /** Comma-separated waybill numbers (max 10) */
  waybill?: string;
  /** Comma-separated client order IDs (max 10) */
  ref_ids?: string;
}

export interface TrackingScan {
  /** Scan date-time */
  "SL Date": string;
  /** City where scan happened */
  City: string;
  /** Scan location */
  Location: string;
  /** Scan type */
  "Scan Type": string;
  /** Scan status */
  "Scan": string;
  /** Additional instructions */
  Instructions: string;
}

export interface TrackingShipment {
  Status: string;
  "Status DateTime": string;
  "Origin City": string;
  "Destination City": string;
  "Pending Days"?: number;
  "Pickup Date"?: string;
  "Delivery Date"?: string;
  "Expected Delivery Date"?: string;
  "Customer Name": string;
  "Customer Pin": string;
  "Customer City": string;
  "Customer State": string;
  "Customer Email"?: string;
  "Customer Phone"?: string;
  "Client"?: string;
  "Waybill": string;
  "ReferenceNo"?: string;
  "Quantity"?: number;
  "Weight"?: number;
  "COD Amount"?: number;
  "Consignee Address 1"?: string;
  "Consignee Address 2"?: string;
  Scans: TrackingScan[];
}

export interface TrackingResponse {
  ShipmentData: Array<{ Shipment: TrackingShipment }>;
}
