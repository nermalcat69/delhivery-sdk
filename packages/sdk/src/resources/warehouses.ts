import type { HttpClient } from "../http.js";
import type {
  CreateWarehouseParams,
  UpdateWarehouseParams,
  WarehouseResponse,
} from "../types/index.js";

export class WarehousesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new pickup/warehouse location.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/warehouse-creation
   */
  create(params: CreateWarehouseParams): Promise<WarehouseResponse> {
    return this.http.post<WarehouseResponse>(
      "/api/backend/clientwarehouse/create/",
      params as unknown as Record<string, unknown>,
    );
  }

  /**
   * Update an existing warehouse by name.
   *
   * @see https://one.delhivery.com/developer-portal/document/b2c/detail/warehouse-updation
   */
  update(params: UpdateWarehouseParams): Promise<WarehouseResponse> {
    return this.http.post<WarehouseResponse>(
      "/api/backend/clientwarehouse/edit/",
      params as unknown as Record<string, unknown>,
    );
  }
}
