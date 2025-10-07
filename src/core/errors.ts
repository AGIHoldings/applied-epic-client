export class ApiError extends Error {
  constructor(
    public status: number,
    public payload?: unknown,
    public statusText?: string,
  ) {
    super(`API error ${status}${statusText ? `: ${statusText}` : ''}`);
    this.name = 'ApiError';
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }
}

export class TimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Request timed out after ${timeoutMs}ms`);
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public cause?: Error) {
    super(`Network error: ${message}`);
    this.name = 'NetworkError';
  }
}
