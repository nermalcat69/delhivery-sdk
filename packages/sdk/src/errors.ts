export class DelhiveryError extends Error {
  readonly statusCode: number;
  readonly raw: unknown;

  constructor(message: string, statusCode: number, raw?: unknown) {
    super(message);
    this.name = "DelhiveryError";
    this.statusCode = statusCode;
    this.raw = raw;
  }
}

export class DelhiveryAuthError extends DelhiveryError {
  constructor() {
    super("Invalid or missing API token.", 401);
    this.name = "DelhiveryAuthError";
  }
}

export class DelhiveryRateLimitError extends DelhiveryError {
  constructor() {
    super("Rate limit exceeded. Please slow down requests.", 429);
    this.name = "DelhiveryRateLimitError";
  }
}

export class DelhiveryNetworkError extends Error {
  readonly cause: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "DelhiveryNetworkError";
    this.cause = cause;
  }
}
