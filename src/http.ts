import {
  DelhiveryAuthError,
  DelhiveryError,
  DelhiveryNetworkError,
  DelhiveryRateLimitError,
} from "./errors.js";

export const DEFAULT_BASE_URL = "https://track.delhivery.com";
export const STAGING_BASE_URL = "https://staging-express.delhivery.com";

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number | boolean | undefined>;
  /** Pass a string for form-encoded, an object for JSON, or an ArrayBuffer/Uint8Array for raw bytes. */
  body?: Record<string, unknown> | string;
  headers?: Record<string, string>;
  /** Set to true for endpoints that return PDF/binary instead of JSON. */
  binary?: boolean;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly timeout: number;

  constructor(token: string, baseUrl: string, timeout: number) {
    this.token = token;
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.timeout = timeout;
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", params, body, headers = {}, binary = false } =
      options;

    const url = this.buildUrl(path, params);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    const requestHeaders: Record<string, string> = {
      Authorization: `Token ${this.token}`,
      Accept: binary ? "application/pdf" : "application/json",
      ...headers,
    };

    let bodyPayload: string | undefined;
    if (body !== undefined) {
      if (typeof body === "string") {
        bodyPayload = body;
        requestHeaders["Content-Type"] = "application/x-www-form-urlencoded";
      } else {
        bodyPayload = JSON.stringify(body);
        requestHeaders["Content-Type"] = "application/json";
      }
    }

    let response: Response;
    try {
      const fetchInit: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal,
      };
      if (bodyPayload !== undefined) {
        fetchInit.body = bodyPayload;
      }
      response = await fetch(url, fetchInit);
    } catch (err) {
      throw new DelhiveryNetworkError(
        `Network request failed: ${String(err)}`,
        err,
      );
    } finally {
      clearTimeout(timer);
    }

    if (response.status === 401 || response.status === 403) {
      throw new DelhiveryAuthError();
    }
    if (response.status === 429) {
      throw new DelhiveryRateLimitError();
    }

    if (!response.ok) {
      // Read body for error context without risking binary corruption
      const errBody = await response
        .text()
        .catch(() => `HTTP ${response.status}`);
      let parsed: unknown = errBody;
      try {
        parsed = JSON.parse(errBody);
      } catch {
        // leave as raw text
      }
      throw new DelhiveryError(
        `Request failed with status ${response.status}`,
        response.status,
        parsed,
      );
    }

    // Binary path — used for label/document downloads
    if (binary) {
      return response.arrayBuffer() as Promise<T>;
    }

    // JSON path — everything else
    const ct = response.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      return response.json() as Promise<T>;
    }
    return response.text() as Promise<T>;
  }

  get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const options: RequestOptions = { method: "GET" };
    if (params !== undefined) {
      options.params = params;
    }
    return this.request<T>(path, options);
  }

  post<T>(path: string, body: Record<string, unknown> | string): Promise<T> {
    return this.request<T>(path, { method: "POST", body });
  }

  postForm<T>(path: string, fields: Record<string, string>): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: new URLSearchParams(fields).toString(),
    });
  }

  getBinary(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<ArrayBuffer> {
    const options: RequestOptions = { method: "GET", binary: true };
    if (params !== undefined) {
      options.params = params;
    }
    return this.request<ArrayBuffer>(path, options);
  }
}
