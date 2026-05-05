export type NDRAction =
  | "re-attempt"
  | "return"
  | "confirm"
  | "address-update"
  | "phone-update"
  | "reschedule";

export interface NDRUpdateParams {
  /** Waybill number */
  waybill: string;
  /** Action to take on the NDR */
  action: NDRAction;
  /** Scheduled re-attempt date (YYYY-MM-DD), required for re-attempt/reschedule */
  reattempt_date?: string;
  /** Updated delivery address, required for address-update */
  updated_address?: string;
  /** Updated phone, required for phone-update */
  updated_contact?: string;
  /** Remarks from the seller */
  seller_note?: string;
  /** OTP for QC (reverse pickup QC flow) */
  otp?: string;
}

export interface NDRUpdateResponse {
  waybill: string;
  status: "Success" | "Error";
  message?: string;
}

export interface RVPQCParams {
  /** Waybill number for reverse pickup */
  waybill: string;
  /** QC status */
  qc_status: "Pass" | "Fail";
  /** Remarks */
  remarks?: string;
  /** OTP for QC verification */
  otp?: string;
}

export interface RVPQCResponse {
  waybill: string;
  status: "Success" | "Error";
  message?: string;
}

export interface WebhookEvent {
  /** Shipment waybill */
  waybill: string;
  /** Current scan status */
  status: string;
  /** Status date-time */
  "Status DateTime": string;
  /** City of scan */
  "City": string;
  /** Scan type */
  "Scan Type": string;
  /** Scan details */
  "Scan": string;
  /** Client order ID */
  "ReferenceNo"?: string;
  /** Instructions */
  "Instructions"?: string;
}
