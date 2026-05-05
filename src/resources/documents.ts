import type { HttpClient } from "../http.js";

export type DocumentType = "invoice" | "label" | "manifest" | "pod";

export interface DocumentDownloadParams {
  /** Waybill number */
  waybill: string;
  /** Document type to download */
  type: DocumentType;
}

export class DocumentsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Download a document (label, invoice, manifest, or POD) for a shipment.
   * Returns the raw PDF as an ArrayBuffer.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/document/download
   */
  download(params: DocumentDownloadParams): Promise<ArrayBuffer> {
    return this.http.getBinary("/api/p/documents/download/", {
      waybill: params.waybill,
      type: params.type,
    });
  }
}
